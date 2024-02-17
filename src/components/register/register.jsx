import { useState } from "react"
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { useRegisterMutation } from "../../slices/usersApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { setCredential } from "../../slices/authSlice";
import Loader from "../loader";

const Register = () => {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('')

    const [Register, {isLoading}] = useRegisterMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log('Submitted:', { email, password });
        try {
            if (!firstName) return toast.error("Firstname is required");
            if (!lastName) return toast.error("Lastname is required");
            if (!email) return toast.error("Email is required");
            if (!password) return toast.error("password is required");
            if (!confirmPassword) return toast.error("confirmPassword is required");
            if (password !== confirmPassword) return toast.error("Password and confirm password doesn't match.");
            const res = await Register({ email, firstName, lastName, password, city, country }).unwrap();
            if (res.message === 'User registered successfully') {
                dispatch(setCredential({ ...res }));
                navigate('/home');
            }
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    }
    return (
        <Container>
            <h3 className='my-3'>Face-Of-Tamizhan</h3>
            <div className='p-2 my-5'>
                <h2 className='my-4'>Register With Us</h2>
                <Form onSubmit={submitHandler}>
                    <Row>
                        <Col>
                            <Form.Group className="my-2 col-md-10" controlId="firstNameControlId">
                                <Form.Label>
                                    First Name
                                </Form.Label>
                                <Form.Control value={firstName} placeholder="Enter your first name" onChange={(e) => setFirstName(e.target.value)} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="my-2 col-md-10" controlId="lastNameControlId">
                                <Form.Label>
                                    Last Name
                                </Form.Label>
                                <Form.Control value={lastName} placeholder="Enter your last name" onChange={(e) => setLastName(e.target.value)} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group className="my-2 col-md-5" controlId="emailControlId">
                        <Form.Label>
                            Email Address
                        </Form.Label>
                        <Form.Control value={email} type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="my-2 col-md-5" controlId="passwordControlId">
                        <Form.Label>
                            Password
                        </Form.Label>
                        <Form.Control value={password} type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <Form.Group className='my-2 col-md-5' controlId="confirmPasswordControlId">
                        <Form.Label>
                            Confirm password
                        </Form.Label>
                        <Form.Control value={confirmPassword} type="password" placeholder="Confirm password" onChange={(e) => setConfirmPassword(e.target.value)} />
                    </Form.Group>
                    <Row>
                        <Col>
                            <Form.Group className="my-2 col-md-10" controlId="cityControlId">
                                <Form.Label>
                                    City
                                </Form.Label>
                                <Form.Control value={city} placeholder="Enter your city" onChange={(e) => setCity(e.target.value)} />
                            </Form.Group>
                        </Col>
                        {isLoading && <Loader />}
                        <Col>
                            <Form.Group className="my-2 col-md-10" controlId="countryControlId">
                                <Form.Label>
                                    Country
                                </Form.Label>
                                <Form.Control value={country} placeholder="Enter your country" onChange={(e) => setCountry(e.target.value)} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className='py-1'>
                        <Col>
                            Already Registered? <Link to='/'>Login</Link>
                        </Col>
                    </Row>
                    <Button className='px-5 mt-3' disabled={isLoading} type="submit">Sign Up</Button>
                </Form>
            </div>


        </Container>
    )
}

export default Register;