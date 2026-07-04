import React from 'react'
import styled from 'styled-components'

const Float = styled.a`
  position: fixed;
  bottom: 28px;
  right: 26px;
  z-index: 999;
  width: 58px;
  height: 58px;
  background: #25D366;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 28px rgba(37,211,102,.45);
  transition: transform .2s;
  text-decoration: none;
  &:hover {
    transform: scale(1.1);
  }
  i {
    color: #fff;
    font-size: 1.7rem;
  }
`

const WhatsAppFloat = () => {
  return (
    <Float href="https://wa.me/923097770663" target="_blank">
      <i className="fab fa-whatsapp"></i>
    </Float>
  )
}

export default WhatsAppFloat