import { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLoginMutation } from '../../slices/usersApiSlice';
import { setCredential } from '../../slices/authSlice';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/home');

    }
  }, [navigate, userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredential({ ...res }));
      navigate('/home');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
      //console.log(err?.data?.message || err.error);
    }

  };

  return (
    <div className="justify-content-center vh-100">
      <Container style={{ backgroundColor: 'yellow', padding: '20px' }}>
        <Form onSubmit={handleSubmit}>
          <Form.Group className='my-2' controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className='my-2' controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
        <Row className='py-3'>
          <Col>
            New Customer? <Link to='/register'>Register</Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
