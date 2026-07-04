import React from 'react'
import styled from 'styled-components'

const Card = styled.div`
  background: var(--off-white);
  border-radius: 10px;
  padding: 2rem 1.6rem;
  height: 100%;
  border: 1px solid rgba(46,139,71,.1);
  transition: transform .25s, box-shadow .25s, border-color .25s;
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 48px rgba(46,139,71,.14);
    border-color: #4caf50;
  }
  .feature-icon {
    width: 58px;
    height: 58px;
    background: var(--green-pale);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.1rem;
    i {
      font-size: 1.45rem;
      color: var(--green-mid);
    }
  }
  h5 {
    font-size: 1.02rem;
    font-weight: 700;
    margin-bottom: .55rem;
  }
  p {
    font-size: .9rem;
    color: var(--muted);
    line-height: 1.65;
  }
`

const FeatureCard = ({ icon, title, description }) => {
  return (
    <Card>
      <div className="feature-icon"><i className={`fas ${icon}`}></i></div>
      <h5>{title}</h5>
      <p>{description}</p>
    </Card>
  )
}

export default FeatureCard