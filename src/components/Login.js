import { Fragment, useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const history = useHistory();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      setError('');
      setLoading(true);
      await login(email, password);
      return history.push('/');
    } catch {
      setError('Failed to sign In');
    }

    setLoading(false);
  }

  return (
    <Fragment>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
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

            <Button disabled={loading} className="w-100" type="submit">Login In</Button>

          </Form>
        </Card.Body>
      </Card>

      <div className="w-100 text-center mt-2">
        No account yet? <Link to="/signup">Sign Up</Link>
      </div>

    </Fragment>
  )
}

export default Login
