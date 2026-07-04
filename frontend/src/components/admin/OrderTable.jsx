import React, { useState, useCallback } from 'react'
import { Button, Badge, Dropdown, Spinner, Modal, Form } from 'react-bootstrap'
import DataTable from './DataTable'
import { useNotification } from '../../context/NotificationContext'
import { updateOrderStatus, deleteOrder } from '../../api/adminApi'

const OrderTable = ({ orders = [], loading = false, onRefresh }) => {
  const { notify } = useNotification()
  const [showStatusModal, setShowStatusModal] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [newStatus, setNewStatus] = useState('')
  const [updating, setUpdating] = useState(false)

  // Status badge colors
  const getStatusBadge = (status) => {
    const statusMap = {
      pending: 'warning',
      processing: 'info',
      shipped: 'primary',
      completed: 'success',
      cancelled: 'danger',
      refunded: 'secondary'
    }
    return statusMap[status?.toLowerCase()] || 'secondary'
  }

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '-'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Format currency
  const formatCurrency = (amount) => {
    if (!amount) return '$0.00'
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  // Handle status update
  const handleUpdateStatus = useCallback(async () => {
    if (!selectedOrder || !newStatus) return
    
    try {
      setUpdating(true)
      await updateOrderStatus(selectedOrder.id, newStatus)
      notify('Order status updated successfully', 'success')
      setShowStatusModal(false)
      setSelectedOrder(null)
      setNewStatus('')
      if (onRefresh) onRefresh()
    } catch (err) {
      notify(err.response?.data?.message || 'Failed to update status', 'error')
    } finally {
      setUpdating(false)
    }
  }, [selectedOrder, newStatus, notify, onRefresh])

  // Handle order deletion
  const handleDelete = useCallback(async (order) => {
    if (!window.confirm(`Delete order #${order.id}? This action cannot be undone.`)) return
    
    try {
      await deleteOrder(order.id)
      notify('Order deleted successfully', 'success')
      if (onRefresh) onRefresh()
    } catch (err) {
      notify(err.response?.data?.message || 'Failed to delete order', 'error')
    }
  }, [notify, onRefresh])

  // Open status modal
  const openStatusModal = (order) => {
    setSelectedOrder(order)
    setNewStatus(order.status || 'pending')
    setShowStatusModal(true)
  }

  // Define columns for the data table
  const columns = [
    {
      name: 'Order ID',
      selector: row => `#${row.id}`,
      sortable: true,
      width: '100px'
    },
    {
      name: 'Customer',
      selector: row => row.customerName || row.customer?.name || 'N/A',
      sortable: true
    },
    {
      name: 'Email',
      selector: row => row.customerEmail || row.customer?.email || 'N/A',
    },
    {
      name: 'Total',
      selector: row => formatCurrency(row.total),
      sortable: true,
      width: '120px'
    },
    {
      name: 'Status',
      cell: row => (
        <Badge bg={getStatusBadge(row.status)} pill>
          {row.status || 'Pending'}
        </Badge>
      ),
      sortable: true,
      width: '120px'
    },
    {
      name: 'Date',
      selector: row => formatDate(row.createdAt),
      sortable: true,
      width: '160px'
    },
    {
      name: 'Actions',
      cell: row => (
        <Dropdown align="end">
          <Dropdown.Toggle variant="light" size="sm" className="border-0">
            <i className="fas fa-ellipsis-v"></i>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => openStatusModal(row)}>
              <i className="fas fa-edit me-2"></i> Update Status
            </Dropdown.Item>
            <Dropdown.Item href={`/admin/orders/${row.id}`} target="_blank">
              <i className="fas fa-eye me-2"></i> View Details
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item 
              className="text-danger" 
              onClick={() => handleDelete(row)}
            >
              <i className="fas fa-trash me-2"></i> Delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ),
      width: '80px',
      allowOverflow: true
    }
  ]

  return (
    <>
      <DataTable
        columns={columns}
        data={orders}
        title="Orders"
        pagination
        progressPending={loading}
        noDataComponent={
          <div className="text-center py-4 text-muted">
            <i className="fas fa-shopping-cart fa-2x mb-2" style={{ opacity: 0.3 }}></i>
            <p>No orders found</p>
          </div>
        }
        subHeader
        subHeaderComponent={
          <div className="d-flex gap-2">
            <Button variant="outline-secondary" size="sm" onClick={onRefresh}>
              <i className="fas fa-sync me-1"></i> Refresh
            </Button>
            <span className="text-muted small align-self-center">
              {orders.length} order(s)
            </span>
          </div>
        }
      />

      {/* Status Update Modal */}
      <Modal show={showStatusModal} onHide={() => setShowStatusModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Order Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Order #:</strong> {selectedOrder?.id}
            <br />
            <strong>Customer:</strong> {selectedOrder?.customerName || selectedOrder?.customer?.name}
          </p>
          <Form>
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Select 
                value={newStatus} 
                onChange={(e) => setNewStatus(e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
                <option value="refunded">Refunded</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowStatusModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleUpdateStatus} 
            disabled={updating}
          >
            {updating ? (
              <>
                <Spinner size="sm" animation="border" className="me-2" />
                Updating...
              </>
            ) : (
              'Update Status'
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

// ✅ default export – essential
export default OrderTable