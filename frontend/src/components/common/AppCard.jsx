import React from 'react'
import styled from 'styled-components'

const Card = styled.div`
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  img {
    width: 100%;
    display: block;
    aspect-ratio: 4/3;
    object-fit: cover;
    transition: transform .4s;
  }
  &:hover img {
    transform: scale(1.06);
  }
  .app-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(10,42,16,.82) 0%, transparent 60%);
    display: flex;
    align-items: flex-end;
    padding: 1.4rem 1.2rem;
    opacity: 0;
    transition: opacity .3s;
    span {
      color: #fff;
      font-weight: 700;
      font-size: 1rem;
      font-family: 'Montserrat', sans-serif;
    }
  }
  &:hover .app-overlay {
    opacity: 1;
  }
`

const AppCard = ({ image, title }) => {
  return (
    <Card>
      <img src={image} alt={title} />
      <div className="app-overlay"><span>{title}</span></div>
    </Card>
  )
}

export default AppCard