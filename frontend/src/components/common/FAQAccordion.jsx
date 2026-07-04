import React from 'react'
import { Accordion } from 'react-bootstrap'

const FAQAccordion = ({ items }) => {
  return (
    <Accordion defaultActiveKey="0">
      {items.map((item, idx) => (
        <Accordion.Item eventKey={String(idx)} key={idx}>
          <Accordion.Header>{item.question}</Accordion.Header>
          <Accordion.Body>{item.answer}</Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  )
}

export default FAQAccordion