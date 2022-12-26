import React from 'react'
import Form from 'react-bootstrap/Form';

const Password = () => {
  return (
    <Form>
    <Form.Group className="mb-3" >
        <Form.Label>Current Password</Form.Label>
        <Form.Control type='text'  />
    </Form.Group>

    <Form.Group className="mb-3" >
        <Form.Label>New Password</Form.Label>
        <Form.Control type="text"/>
    </Form.Group>

    <Form.Group className="mb-3" >
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="email"/>
    </Form.Group>

  
    
   
  
</Form>
  )
}

export default Password