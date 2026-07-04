import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import styled from 'styled-components'

const StatsWrapper = styled.div`
  background: var(--green-dark);
  padding: 2.2rem 0;
  .stat-item {
    text-align: center;
  }
  .stat-num {
    font-family: 'Montserrat', sans-serif;
    font-size: 2.6rem;
    font-weight: 900;
    color: #f5a623;
    line-height: 1;
  }
  .stat-label {
    color: rgba(255,255,255,.75);
    font-size: .82rem;
    letter-spacing: .08em;
    text-transform: uppercase;
    margin-top: .3rem;
  }
`

const Stats = () => {
  const stats = [
    { num: '500+', label: 'Projects Completed' },
    { num: '#1', label: 'In Pakistan' },
    { num: '3 Yr', label: 'Warranty' },
    { num: '100%', label: 'Eco Friendly' },
  ]
  return (
    <StatsWrapper>
      <Container>
        <Row className="g-4 justify-content-center">
          {stats.map((s, i) => (
            <Col key={i} xs={6} md={3} className="fade-up">
              <div className="stat-item">
                <div className="stat-num">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </StatsWrapper>
  )
}

export default Stats