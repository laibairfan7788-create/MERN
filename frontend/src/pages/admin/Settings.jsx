
// import React, { useState } from 'react'
// import { Card, Form, Button } from 'react-bootstrap'
// import { useNotification } from '../../context/NotificationContext'

// const Settings = () => {
//   const [siteName, setSiteName] = useState('GARS Industries')
//   const { notify } = useNotification()

//   const handleSave = () => {
//     // Simulate save
//     notify('Settings saved successfully', 'success')
//   }

//   return (
//     <>
//       <h4 className="mb-4">Settings</h4>
//       <Card>
//         <Card.Body>
//           <Form>
//             <Form.Group className="mb-3">
//               <Form.Label>Site Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={siteName}
//                 onChange={(e) => setSiteName(e.target.value)}
//               />
//             </Form.Group>
//             <Button variant="primary" onClick={handleSave}>
//               Save Settings
//             </Button>
//           </Form>
//         </Card.Body>
//       </Card>
//     </>
//   )
// }

// export default Settings  // ✅ MUST HAVE
import React, { useState } from 'react'
import { Card, Form, Button } from 'react-bootstrap'
import { useNotification } from '../../context/NotificationContext'

const Settings = () => {
  const { notify } = useNotification()
  const [siteName, setSiteName] = useState('GARS Industries')
  const [email, setEmail] = useState('garspakistan@gmail.com')
  const [phone, setPhone] = useState('+92 309 7770664')
  const [loading, setLoading] = useState(false)

  const handleSave = async (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      notify('Settings saved successfully', 'success')
      setLoading(false)
    }, 1000)
  }

  return (
    <>
      <h4 className="fw-bold mb-4">Settings</h4>
      <Card>
        <Card.Body>
          <Form onSubmit={handleSave}>
            <Form.Group className="mb-3">
              <Form.Label>Site Name</Form.Label>
              <Form.Control
                type="text"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contact Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save Settings'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  )
}

export default Settings