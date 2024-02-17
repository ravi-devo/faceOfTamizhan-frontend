import { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLoginMutation } from '../../slices/usersApiSlice';
import { setCredential } from '../../slices/authSlice';
import { toast } from 'react-toastify';
import Loader from '../loader';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

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
      if (res.message === 'User authenticated successfully') {
        dispatch(setCredential({ ...res }));
        navigate('/home');
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
      //console.log(err?.data?.message || err.error);
    }

  };

  return (

    <Container>
      <h3 className='my-3'>Face-Of-Tamizhan</h3>
      <div className='p-2 my-5'>
        <h2 className='my-4'>Login to your account</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className='my-2 col-md-5' controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className='my-2 col-md-5' controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Row className='py-1'>
            <Col>
              New here? <Link to='/register'>Register</Link>
            </Col>
          </Row>
          <Button className='px-5 mt-3' disabled={isLoading} variant="primary" type="submit">
            Login
          </Button>
        </Form>
        {isLoading && <Loader />}
      </div>


    </Container>

  );
};

export default Login;
