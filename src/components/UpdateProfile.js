import { Fragment, useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const UpdateProfile = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updatePassword, updateEmail } = useAuth();
  const history = useHistory();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const passwordConfirm = passwordConfirmRef.current.value;

    if(password !== passwordConfirm ) {
      return setError('Passwords do not match');
    }

    const promises = [];
    setError('');
    setLoading(true);
    if(email !== currentUser.email) {
      promises.push(updateEmail(email));
    }

    if(password) {
      promises.push(updatePassword(password));
    }

    Promise.all(promises).then(() => {
      history.push('/');
    }).catch(() => {
      setError('Failed to Update account');
    }).finally(() => {
      setLoading(false)
    });
  }

  return (
    <Fragment>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Poofile</h2>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>

            <Form.Group id="email">
              <Form.Label className="Label">Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required defaultValue={currentUser.email}></Form.Control>
            </Form.Group>

            <Form.Group id="password">
              <Form.Label className="Label">Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} placeholder="Leave blank to keep the same"></Form.Control>
            </Form.Group>

            <Form.Group id="password-confirm">
              <Form.Label className="Label">Confirm Password</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} placeholder="Leave blank to keep the same"></Form.Control>
            </Form.Group>

            <Button disabled={loading} className="w-100" type="submit">Update</Button>

          </Form>
        </Card.Body>
      </Card>

      <div className="w-100 text-center mt-2">
        <Link to="/">Cancel</Link>
      </div>

    </Fragment>
  )
}

export default UpdateProfile

