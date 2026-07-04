import React from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import styled from 'styled-components'

const StyledCard = styled(Card)`
  border-left: 4px solid ${props => props.borderColor || '#2e8b47'};
  box-shadow: 0 2px 10px rgba(0,0,0,.05);
  transition: transform .2s;
  &:hover {
    transform: translateY(-3px);
  }
  .stat-icon {
    font-size: 2.2rem;
    color: ${props => props.iconColor || '#2e8b47'};
    opacity: .7;
  }
  .stat-label {
    font-size: .85rem;
    color: #6b7c6d;
    text-transform: uppercase;
    letter-spacing: .05em;
    font-weight: 600;
  }
  .stat-value {
    font-size: 1.8rem;
    font-weight: 900;
    color: #111b13;
    margin: .2rem 0 0;
  }
`

const DashboardStats = ({ stats = [] }) => {
  return (
    <Row className="g-4">
      {stats.map((stat, idx) => (
        <Col key={idx} md={3} sm={6}>
          <StyledCard borderColor={stat.borderColor} iconColor={stat.iconColor}>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="stat-label">{stat.label}</div>
                  <div className="stat-value">{stat.value}</div>
                </div>
                <i className={`fas ${stat.icon} stat-icon`}></i>
              </div>
              {stat.change && (
                <div style={{ fontSize: '.8rem', color: '#4caf50', marginTop: '.5rem' }}>
                  <i className="fas fa-arrow-up"></i> {stat.change}% from last month
                </div>
              )}
            </Card.Body>
          </StyledCard>
        </Col>
      ))}
    </Row>
  )
}

export default DashboardStats