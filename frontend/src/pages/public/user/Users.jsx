import React, { useState, useEffect } from 'react'
import { Table, Button } from 'react-bootstrap'
import { getUsers, deleteUser } from '../../api/adminApi'
import { useNotification } from '../../context/NotificationContext'
import DataTable from 'react-data-table-component'

const Users = () => {
  const [users, setUsers] = useState([])
  const { notify } = useNotification()

  useEffect(() => {
    getUsers().then(res => setUsers(res.data)).catch(err => notify('Failed to load users', 'error'))
  }, [])

  const columns = [
    { name: 'Name', selector: row => row.name, sortable: true },
    { name: 'Email', selector: row => row.email, sortable: true },
    { name: 'Role', selector: row => row.role },
    { name: 'Actions', cell: row => <Button variant="danger" size="sm" onClick={() => handleDelete(row.id)}>Delete</Button> }
  ]

  const handleDelete = async (id) => {
    if (window.confirm('Delete this user?')) {
      await deleteUser(id)
      setUsers(users.filter(u => u.id !== id))
      notify('User deleted', 'success')
    }
  }

  return <DataTable columns={columns} data={users} pagination title="Users" />
}
export default Users
