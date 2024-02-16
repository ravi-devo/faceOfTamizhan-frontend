import Header from "../NavBar/navbar";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import './posts.css';
import { CiLocationOn } from "react-icons/ci";
import { GoBriefcase } from "react-icons/go";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import PostComponent from "./postComponent";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createPost, setInitialPost } from "../../slices/postSlice";
import {toast} from 'react-toastify';
import { useCreatePostMutation, useGetPostMutation } from "../../slices/postApiSlice";

const Post = () => {

    const [ post, setPost ] = useState('');
    const dispatch = useDispatch();
    const [CreatePostAPI] = useCreatePostMutation();
    const [GetPost] = useGetPostMutation();

    const createPostHandler = async () => {
        try {
            const res = await CreatePostAPI({ title: "Original Post", content: post }).unwrap();
            console.log(`Response ${JSON.stringify(res)}`)
            if (res.message === 'Post Created successfully') {
                console.log(`Post created successfully`)
                dispatch(createPost(res.data));
                setPost('');
            }
        } catch (error) {
            toast.error(`Internal server error ${JSON.stringify(error)}`)
        }
    }

    useEffect(() => {
        const getPostHandler = async () => {
            try {
                const res = await GetPost().unwrap();
                if (res.message === 'Posts fetched successfully') {
                    dispatch(setInitialPost(res.data));
                }
            } catch (error) {
                toast.error(`Couldn't get post`);
                console.log(`Error ${error}`)
            }
        }
        getPostHandler();
    }, []);

    return (
        <div>
            <Header />
            <Row className="d-flex justify-content-around">
                <Col md={3} className="p-3 mt-3 class-1">
                    <div className="circular-avatar">
                        <p>RV</p>
                    </div>
                    <span className="mx-1">Ravichandran Venkatesan</span>
                    <div className="divider"></div>
                    <div className="m-1 px-1"><span>Joined</span></div>
                    <div className="m-1"><CiLocationOn size={25} /> <span>Chennai, India</span></div>
                    <div className="m-1 px-1"><GoBriefcase size={20} /> <span>Software Engineer</span></div>
                    <div className="divider my-3"></div>
                    <div className="px-1">
                        <p className="m-1 px-1" style={{ fontWeight: 'bold' }}>Social Profiles</p>
                        <div className="px-1"><FaInstagram color="white" size={20} /> <span>Instagram</span></div>
                        <div className="px-1"><FaTwitter color="white" size={20} /> <span>Twitter</span></div>
                        <div className="px-1 mb-4"><FaFacebook color="white" size={20} /> <span>Facebook</span></div>
                    </div>

                </Col>
                <Col md={5} className="class-2 mt-3">
                    <div className="createPost-space">
                        <div className="p-2 d-flex align-items-center">
                            <div className="circular-avatar mr-2">
                                <p>RV</p>
                            </div>
                            <Form className="flex-grow-1 px-2">
                                <Form.Group className="mb-0">
                                    <Form.Control 
                                    style={{ height: 'auto' }} 
                                    as="textarea" value={post} 
                                    onChange={(e) => setPost(e.target.value)} 
                                    placeholder="What's on your mind..." />
                                </Form.Group>
                            </Form>
                        </div>
                        <div className="d-flex justify-content-end mt-1 mb-3 px-3">
                            <Button onClick={createPostHandler} className="px-3" variant="primary">
                                Post
                            </Button>
                        </div>
                    </div>
                    <PostComponent />
                    <PostComponent />
                    <PostComponent />
                    
                </Col>

                <Col md={3} className="class-3 my-3 pb-3">
                    <Card style={{ color: "white", backgroundColor: "grey", border: "none" }}>
                        <Card.Body>
                            <Card.Title>
                                About Us
                            </Card.Title>
                            <Card.Text>
                                This app is mainly for people of TamilNadu, in our community people shares the culture, tradions and many occasions which we celebrate locally.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className="px-3" style={{ color: "white", backgroundColor: "grey", border: "none" }}>
                        <Card.Title>
                            Contact Us
                        </Card.Title>
                        <Card.Text>
                            You can contact us through this email: faceOfTamizhan@gmail.com. Also you can know about to us in <a href="https://google.com/" target="_blank">www.faceOfTamizhan.com</a>
                        </Card.Text>
                    </Card>
                </Col>
            </Row>

        </div>
    )
}

export default Post;