import React, { useState, useCallback } from 'react'
import { Button, Modal, Form, Spinner, Badge, Dropdown } from 'react-bootstrap'
import DataTable from './DataTable'
import { useNotification } from '../../context/NotificationContext'
import { updateUser, deleteUser } from '../../api/adminApi'

const UserTable = ({ users = [], loading = false, onRefresh }) => {
  const { notify } = useNotification()
  const [showModal, setShowModal] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user',
    status: 'active'
  })
  const [submitting, setSubmitting] = useState(false)

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      role: 'user',
      status: 'active'
    })
    setEditingUser(null)
  }

  // Open modal for edit
  const openEditModal = (user) => {
    setEditingUser(user)
    setFormData({
      name: user.name || '',
      email: user.email || '',
      role: user.role || 'user',
      status: user.status || 'active'
    })
    setShowModal(true)
  }

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Handle form submit (update user)
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email) {
      notify('Name and email are required', 'error')
      return
    }

    try {
      setSubmitting(true)
      await updateUser(editingUser.id, formData)
      notify('User updated successfully', 'success')
      setShowModal(false)
      resetForm()
      if (onRefresh) onRefresh()
    } catch (err) {
      notify(err.response?.data?.message || 'Failed to update user', 'error')
    } finally {
      setSubmitting(false)
    }
  }, [formData, editingUser, notify, onRefresh])

  // Handle user deletion
  const handleDelete = useCallback(async (user) => {
    if (!window.confirm(`Delete user "${user.name}"? This action cannot be undone.`)) return
    
    try {
      await deleteUser(user.id)
      notify('User deleted successfully', 'success')
      if (onRefresh) onRefresh()
    } catch (err) {
      notify(err.response?.data?.message || 'Failed to delete user', 'error')
    }
  }, [notify, onRefresh])

  // Get role badge
  const getRoleBadge = (role) => {
    const roleMap = {
      admin: { bg: 'danger', label: 'Admin' },
      user: { bg: 'primary', label: 'User' },
      manager: { bg: 'warning', label: 'Manager' },
      editor: { bg: 'info', label: 'Editor' }
    }
    const r = roleMap[role?.toLowerCase()] || { bg: 'secondary', label: role || 'User' }
    return <Badge bg={r.bg}>{r.label}</Badge>
  }

  // Get status badge
  const getStatusBadge = (status) => {
    const statusMap = {
      active: { bg: 'success', label: 'Active' },
      inactive: { bg: 'secondary', label: 'Inactive' },
      suspended: { bg: 'warning', label: 'Suspended' },
      banned: { bg: 'danger', label: 'Banned' }
    }
    const s = statusMap[status?.toLowerCase()] || { bg: 'secondary', label: status || 'Active' }
    return <Badge bg={s.bg}>{s.label}</Badge>
  }

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '-'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  // Define columns
  const columns = [
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true
    },
    {
      name: 'Role',
      cell: row => getRoleBadge(row.role),
      sortable: true,
      width: '120px'
    },
    {
      name: 'Status',
      cell: row => getStatusBadge(row.status),
      sortable: true,
      width: '120px'
    },
    {
      name: 'Joined',
      selector: row => formatDate(row.createdAt),
      sortable: true,
      width: '120px'
    },
    {
      name: 'Actions',
      cell: row => (
        <div className="d-flex gap-2">
          <Button variant="outline-primary" size="sm" onClick={() => openEditModal(row)}>
            <i className="fas fa-edit"></i>
          </Button>
          <Button variant="outline-danger" size="sm" onClick={() => handleDelete(row)}>
            <i className="fas fa-trash"></i>
          </Button>
        </div>
      ),
      width: '120px'
    }
  ]

  return (
    <>
      <DataTable
        columns={columns}
        data={users}
        title="Users"
        pagination
        progressPending={loading}
        noDataComponent={
          <div className="text-center py-4 text-muted">
            <i className="fas fa-users fa-2x mb-2" style={{ opacity: 0.3 }}></i>
            <p>No users found</p>
          </div>
        }
        subHeader
        subHeaderComponent={
          <div className="d-flex gap-2">
            <Button variant="outline-secondary" size="sm" onClick={onRefresh}>
              <i className="fas fa-sync me-1"></i> Refresh
            </Button>
            <span className="text-muted small align-self-center">
              {users.length} user(s)
            </span>
          </div>
        }
      />

      {/* Edit User Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="editor">Editor</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
                <option value="banned">Banned</option>
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={submitting}>
              {submitting ? (
                <>
                  <Spinner size="sm" animation="border" className="me-2" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}

// ✅ default export – essential
export default UserTable