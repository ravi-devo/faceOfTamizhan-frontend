import { useState } from "react"
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { useRegisterMutation } from "../../slices/usersApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const Register = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [Register] = useRegisterMutation();
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log('Submitted:', { name, email, password });
        try {
            if (!email) return toast.error("Email is required");
            if (!name) return toast.error("name is required");
            if (!password) return toast.error("password is required");
            if (!confirmPassword) return toast.error("confirmPassword is required");
            if (password !== confirmPassword) return toast.error("Password and confirm password doesn't match.");
            await Register({ email, name, password }).unwrap();
            navigate('/home');
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
                    <Form.Group className="my-2 col-md-5">
                        <Form.Label>
                            Name
                        </Form.Label>
                        <Form.Control value={name} placeholder="Enter your name" onChange={(e) => setName(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="my-2 col-md-5">
                        <Form.Label>
                            Email Address
                        </Form.Label>
                        <Form.Control value={email} placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="my-2 col-md-5">
                        <Form.Label>
                            Password
                        </Form.Label>
                        <Form.Control value={password} placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <Form.Group className='my-2 col-md-5'>
                        <Form.Label>
                            Confirm password
                        </Form.Label>
                        <Form.Control value={confirmPassword} placeholder="Confirm password" onChange={(e) => setConfirmPassword(e.target.value)} />
                    </Form.Group>
                    <Row className='py-1'>
                        <Col>
                            Already Registered? <Link to='/'>Login</Link>
                        </Col>
                    </Row>
                    <Button className='px-5 mt-3' type="submit">Sign Up</Button>
                </Form>
            </div>


        </Container>
    )
}

export default Register;