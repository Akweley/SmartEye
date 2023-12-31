import React, { useState } from 'react'
// import { Form } from 'react-router-dom'
import {Form, Button} from "react-bootstrap"


const LoginForm = () => {
    const [email, setEmail] = useState("")


  return (
    <div className='row'>
      <div className='col-md-5 justify-content-center'>
         <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
      </div>
      <div>

      </div>
   
    </div>
  )
}

export default LoginForm