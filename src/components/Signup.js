import { Fragment, useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup, currentUser } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const passwordConfirm = passwordConfirmRef.current.value;

    if(password !== passwordConfirm ) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      await signup(email, password);
    } catch {
      setError('Failed to create an account');
    }

    setLoading(false);
  }

  return (
    <Fragment>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {JSON.stringify(currentUser.email)}
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>

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

            <Button disabled={loading} className="w-100" type="submit">Sign Up</Button>

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
