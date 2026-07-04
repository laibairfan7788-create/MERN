import React, { useState, useEffect, useCallback } from 'react'
import { Button, Spinner } from 'react-bootstrap'
import { getUsers, deleteUser } from '../../api/adminApi'
import { useNotification } from '../../context/NotificationContext'
import DataTable from 'react-data-table-component'

const Users = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const { notify } = useNotification()

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true)
      const res = await getUsers()
      setUsers(Array.isArray(res.data) ? res.data : [])
    } catch (err) {
      notify('Failed to load users', 'error')
    } finally {
      setLoading(false)
    }
  }, [notify])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const handleDelete = useCallback(async (id) => {
    if (!window.confirm('Delete this user?')) return
    try {
      await deleteUser(id)
      setUsers(prev => prev.filter(u => u.id !== id))
      notify('User deleted successfully', 'success')
    } catch (err) {
      notify('Failed to delete user', 'error')
    }
  }, [notify])

  const columns = [
    { name: 'Name', selector: row => row.name, sortable: true },
    { name: 'Email', selector: row => row.email, sortable: true },
    { name: 'Role', selector: row => row.role },
    {
      name: 'Actions',
      cell: row => (
        <Button variant="danger" size="sm" onClick={() => handleDelete(row.id)}>
          Delete
        </Button>
      )
    }
  ]

  return (
    <DataTable
      columns={columns}
      data={users}
      pagination
      title="Users"
      progressPending={loading}
      progressComponent={<Spinner animation="border" variant="success" />}
      noDataComponent="No users found"
    />
  )
}

export default Users  // ✅ MUST HAVE