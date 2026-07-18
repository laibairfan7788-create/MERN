

// import React, { useState, useEffect } from 'react'
// import { Button, Card, Table, Spinner } from 'react-bootstrap'
// import { getProducts, deleteProduct } from '../../api/adminApi'
// import { useNotification } from '../../context/NotificationContext'

// const Products = () => {
//   const [products, setProducts] = useState([])
//   const [loading, setLoading] = useState(true)
//   const { notify } = useNotification()

//   useEffect(() => {
//     getProducts()
//       .then(res => setProducts(Array.isArray(res.data) ? res.data : []))
//       .catch(() => notify('Failed to load products', 'error'))
//       .finally(() => setLoading(false))
//   }, [notify])

//   const handleDelete = async (id) => {
//     if (!window.confirm('Delete this product?')) return
//     try {
//       await deleteProduct(id)
//       setProducts(prev => prev.filter(p => p.id !== id))
//       notify('Product deleted', 'success')
//     } catch (err) {
//       notify('Failed to delete product', 'error')
//     }
//   }

//   if (loading) return <Spinner animation="border" variant="success" />

//   return (
//     <>
//       <h4 className="mb-4">Products</h4>
//       <Card>
//         <Card.Body>
//           <Table striped bordered hover responsive>
//             <thead>
//               <tr><th>ID</th><th>Name</th><th>Price</th><th>Actions</th></tr>
//             </thead>
//             <tbody>
//               {products.map(p => (
//                 <tr key={p.id}>
//                   <td>{p.id}</td>
//                   <td>{p.name}</td>
//                   <td>${p.price}</td>
//                   <td>
//                     <Button variant="danger" size="sm" onClick={() => handleDelete(p.id)}>Delete</Button>
//                   </td>
//                 </tr>
//               ))}
//               {products.length === 0 && <tr><td colSpan="4" className="text-center">No products</td></tr>}
//             </tbody>
//           </Table>
//         </Card.Body>
//       </Card>
//     </>
//   )
// }

// export default Products  // ✅ MUST HAVE
import React, { useState, useEffect, useCallback } from 'react'
import { Button, Spinner, Card } from 'react-bootstrap'
import { getProducts, deleteProduct } from '../../api/adminApi'
import { useNotification } from '../../context/NotificationContext'
import DataTable from 'react-data-table-component'

const Products = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const { notify } = useNotification()

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true)
      const res = await getProducts()
      setProducts(Array.isArray(res.data) ? res.data : [])
    } catch {
      notify('Failed to load products', 'error')
    } finally {
      setLoading(false)
    }
  }, [notify])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return
    try {
      await deleteProduct(id)
      setProducts(prev => prev.filter(p => p.id !== id))
      notify('Product deleted', 'success')
    } catch {
      notify('Failed to delete product', 'error')
    }
  }

  const columns = [
    { name: 'ID', selector: row => row.id, sortable: true },
    { name: 'Name', selector: row => row.name, sortable: true },
    { name: 'Category', selector: row => row.category || 'Uncategorized' },
    { name: 'Price', selector: row => `$${row.price?.toFixed(2)}`, sortable: true },
    {
      name: 'Actions',
      cell: row => (
        <Button variant="danger" size="sm" onClick={() => handleDelete(row.id)}>
          <i className="fas fa-trash me-1"></i> Delete
        </Button>
      ),
    },
  ]

  return (
    <>
      <h4 className="fw-bold mb-4">Products</h4>
      <Card>
        <Card.Body>
          <DataTable
            columns={columns}
            data={products}
            progressPending={loading}
            pagination
            title=""
          />
        </Card.Body>
      </Card>
    </>
  )
}

export default Products