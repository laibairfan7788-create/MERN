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

// export default Settings  // ✅ must have
import React, { useState } from 'react'
import { Card, Form, Button } from 'react-bootstrap'
import { useNotification } from '../../context/NotificationContext'

const Settings = () => {
  const [siteName, setSiteName] = useState('GARS Industries')
  const { notify } = useNotification()

  const handleSave = () => {
    // Simulate save
    notify('Settings saved successfully', 'success')
  }

  return (
    <>
      <h4 className="mb-4">Settings</h4>
      <Card>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Site Name</Form.Label>
              <Form.Control
                type="text"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleSave}>
              Save Settings
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  )
}

export default Settings  // ✅ MUST HAVE