import { Fragment, useRef } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  return (
    <Fragment>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          <Form>
            <Form.Group id="email">
              <Form.Label className="Label">Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required></Form.Control>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label className="Label">Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required></Form.Control>
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label className="Label">Confirm Password</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required></Form.Control>
            </Form.Group>
            <Button className="w-100" type="submit">Sign Up</Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? Log In
      </div>
    </Fragment>
  )
}

export default Signup