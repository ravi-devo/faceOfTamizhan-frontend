import { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLoginMutation } from '../slices/userSlices/usersApiSlice';
import { setCredential } from '../slices/userSlices/authSlice';
import { toast } from 'react-toastify';
import Loader from '../components/loader';
import { BsEye, BsEyeSlash } from 'react-icons/bs';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    //If the user logged in already it will navigate the user to login page, so that he don't have to login again.
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
    }

  };

  return (

    <Container>
      <h3 className='my-3 app-brand'>Face-Of-Tamizhan</h3>
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
            <InputGroup>
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputGroup.Text onClick={handleTogglePasswordVisibility}>
                {showPassword ? <BsEyeSlash /> : <BsEye />}
              </InputGroup.Text>
            </InputGroup>
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
