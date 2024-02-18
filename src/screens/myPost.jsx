import Header from "../components/navbar";
import { Row, Col, Card } from "react-bootstrap";
import '../styles/posts.css';
import { CiLocationOn } from "react-icons/ci";
import { GoBriefcase } from "react-icons/go";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import PostComponent from "../components/post";
import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyPost } from "../slices/postSlices/postSlice";
import { toast } from 'react-toastify';
import { useGetMyPostMutation } from "../slices/postSlices/postApiSlice";
import Avatar from "../components/avatar";
import Loader from "../components/loader";

const MyPost = () => {

    const [joinedTime, setJoinedTime] = useState('');
    const dispatch = useDispatch();
    const [GetMyPost, { isLoading }] = useGetMyPostMutation();
    const { postItems } = useSelector((state) => state.post);
    const { userInfo } = useSelector((state) => state.auth);

    const calculateTimeSinceJoined = (createdAt) => {
        const joinedDate = new Date(createdAt);
        const currentDate = new Date();

        const diffInMilliseconds = Math.abs(currentDate - joinedDate);
        const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
        const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
        const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
        const diffInMonths = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24 * 30));

        if (diffInMonths > 0) {
            return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
        } else if (diffInDays > 0) {
            return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
        } else if (diffInHours > 0) {
            return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
        } else if (diffInMinutes > 0) {
            return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
        } else {
            return 'Just now';
        }
    }

    useEffect(() => {
        const getMyPostHandler = async () => {
            try {
                const res = await GetMyPost().unwrap();
                if (res.message === 'Your posts fetched successfully') {
                    dispatch(getMyPost(res.data));
                }
            } catch (error) {
                toast.error(`Couldn't get post`);
                console.log(`Error ${error}`)
            }
        }
        getMyPostHandler();

        //Calculation of joined time
        const timeSinceJoined = calculateTimeSinceJoined(userInfo.data.createdAt);
        setJoinedTime(timeSinceJoined);
    }, []);

    //This helps in calling the postComponent only whenever the state update in postItems.
    const memoizedPostComponents = useMemo(() => {
        return postItems.map(post => (
            <PostComponent post={post} key={post._id} />
        ));
    }, [postItems]);

    return (
        <div>
            <Header />
            <Row className="d-flex justify-content-around">
                <Col md={3} className="p-3 mt-3 class-1">
                    <Avatar initial={userInfo.data.initial} />
                    <span className="mx-1">{userInfo.data.name}</span>
                    <div className="divider"></div>
                    <Row className="d-flex px-2 justify-content-between"><Col>Joined</Col><Col>{joinedTime}</Col></Row>
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
                    {isLoading && <Loader />}
                    {!postItems.length ? <div className="d-flex justify-content-center p-5"> <h6>You have not posted any</h6> </div> : memoizedPostComponents}
                </Col>
                <Col md={3} className="class-3 my-3 pb-3">
                    <Card className="class-3-Card1">
                        <Card.Body>
                            <h4 className="mb-3 app-brand">Face Of Tamizhan</h4>
                            <Card.Title>
                                About Us
                            </Card.Title>
                            <Card.Text>
                                This app is mainly for people of TamilNadu, in our community people shares the culture, tradions and many occasions which we celebrate locally.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className="px-3 class-3-Card2">
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

export default MyPost;