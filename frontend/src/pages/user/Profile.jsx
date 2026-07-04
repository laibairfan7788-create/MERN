// import React from "react";
// import MainLayout from "../../components/layout/MainLayout";

// export default function Profile() {
//   return (
//     <MainLayout>
//       <div className="container py-4">
//         <h1 className="h3 mb-3">User Profile</h1>
//       </div>
//     </MainLayout>
//   );
// }

import React, { useState, useEffect } from 'react'
import { Card, Form, Button, Row, Col, Spinner, Alert } from 'react-bootstrap'
import { useAuth } from '../../context/AuthContext'
import { useNotification } from '../../context/NotificationContext'
import { getUserProfile, updateUserProfile } from '../../api/userApi'
import styled from 'styled-components'

const ProfileWrapper = styled.div`
  padding: 2rem 0;

  h4 {
    font-weight: 700;
    color: var(--dark);
  }

  .profile-card {
    border: none;
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  }

  .profile-avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: var(--green-pale);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    color: var(--green-mid);
    margin: 0 auto 1rem;
  }

  .field-label {
    font-weight: 600;
    color: var(--muted);
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
  .field-value {
    font-size: 1rem;
    color: var(--dark);
  }
`

const Profile = () => {
  const { user } = useAuth()
  const { notify } = useNotification()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getUserProfile()
        setProfile(res.data)
        setFormData({ name: res.data.name, email: res.data.email, phone: res.data.phone || '' })
      } catch {
        // fallback: use auth user data
        setProfile(user)
        setFormData({ name: user?.name || '', email: user?.email || '', phone: user?.phone || '' })
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [user])

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setSaving(true)
      await updateUserProfile(formData)
      setProfile(prev => ({ ...prev, ...formData }))
      notify('Profile updated successfully', 'success')
      setEditing(false)
    } catch {
      notify('Failed to update profile', 'error')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="success" />
        <p className="mt-2 text-muted">Loading profile…</p>
      </div>
    )
  }

  return (
    <ProfileWrapper>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>My Profile</h4>
        {!editing && (
          <Button variant="outline-primary" size="sm" onClick={() => setEditing(true)}>
            <i className="fas fa-edit me-1"></i> Edit Profile
          </Button>
        )}
      </div>

      <Row>
        <Col lg={4}>
          <Card className="profile-card">
            <Card.Body className="text-center">
              <div className="profile-avatar">
                <i className="fas fa-user"></i>
              </div>
              <h5 className="fw-bold">{profile?.name || 'User'}</h5>
              <p className="text-muted small">{profile?.email}</p>
              <p className="text-muted small"><i className="fas fa-tag me-1"></i>{profile?.role || 'User'}</p>
              <hr />
              <div className="text-start">
                <div className="mb-2">
                  <div className="field-label">Member Since</div>
                  <div className="field-value">{profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : 'N/A'}</div>
                </div>
                <div>
                  <div className="field-label">Total Orders</div>
                  <div className="field-value">{profile?.totalOrders || 0}</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={8}>
          <Card className="profile-card">
            <Card.Body>
              <h5 className="fw-bold mb-3">{editing ? 'Edit Profile' : 'Profile Information'}</h5>

              {editing ? (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled
                    />
                    <Form.Text className="text-muted">Email cannot be changed</Form.Text>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+92 xxx xxxxxxx"
                    />
                  </Form.Group>
                  <div className="d-flex gap-2">
                    <Button type="submit" variant="primary" disabled={saving}>
                      {saving ? 'Saving…' : 'Save Changes'}
                    </Button>
                    <Button variant="secondary" onClick={() => setEditing(false)}>
                      Cancel
                    </Button>
                  </div>
                </Form>
              ) : (
                <div>
                  <div className="mb-3">
                    <div className="field-label">Name</div>
                    <div className="field-value">{profile?.name}</div>
                  </div>
                  <div className="mb-3">
                    <div className="field-label">Email</div>
                    <div className="field-value">{profile?.email}</div>
                  </div>
                  <div className="mb-3">
                    <div className="field-label">Phone</div>
                    <div className="field-value">{profile?.phone || 'Not provided'}</div>
                  </div>
                  <div className="mb-3">
                    <div className="field-label">Role</div>
                    <div className="field-value">{profile?.role || 'User'}</div>
                  </div>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </ProfileWrapper>
  )
}

export default Profile