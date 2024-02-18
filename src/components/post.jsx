import { Card, Form, Button, Row, Col } from "react-bootstrap";
import { AiFillLike } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import PropTypes from 'prop-types';
import { useState, useMemo, useEffect } from "react";
import {
    useLikeMutation,
    useDislikeMutation,
    useAddCommentMutation,
    useDeletePostMutation
} from "../slices/postSlices/postApiSlice";
import { useSelector, useDispatch } from "react-redux";
import { dislikePost, likePost, addComment, deletePost } from "../slices/postSlices/postSlice";
import { toast } from 'react-toastify';
import Avatar from "./avatar";
import CommentsComponent from "./comment";
import Loader from "./loader";
import '../styles/posts.css';

const PostComponent = ({ post }) => {
    const { userInfo } = useSelector((state) => state.auth);
    const currentUserId = userInfo.data._id;
    const postId = post._id;
    const commentsArray = post.comments;
    const [liked, setLiked] = useState(post.likes.includes(currentUserId));
    const [likeAPI] = useLikeMutation();
    const [disLikeAPI] = useDislikeMutation();
    const [addCommentAPI, { isLoading }] = useAddCommentMutation();
    const [deletePostAPI] = useDeletePostMutation();
    const dispatch = useDispatch();
    const [comment, setComment] = useState('');
    const [joinedTime, setJoinedTime] = useState('');
    const [commentExpanded, setCommentExpanded] = useState(false);

    const handleLike = async () => {
        if (liked) {
            const res = await disLikeAPI(post._id).unwrap();
            if (res.message === 'Post disliked successfully') {
                dispatch(dislikePost({ postId, userId: currentUserId }));
            }
        } else {
            const res = await likeAPI(post._id).unwrap();
            if (res.message === 'Post liked successfully') {
                dispatch(likePost({ postId, userId: currentUserId }));
            }
        }
        setLiked(!liked);
    }

    const addCommentHandler = async () => {
        if (comment.trim() !== '') {
            const res = await addCommentAPI({ postId, text: { text: comment } }).unwrap();
            if (res.message === 'Comment added successfully') {
                dispatch(addComment({ postId, comment: res.data }));
                setComment('');
            } else {
                toast.error(`Error in adding comment.`)
            }
        } else {
            toast.error(`Comment cannot be empty`)
        }
    }

    const deletePostHandler = async () => {
        const res = await deletePostAPI(postId).unwrap();
        if (res.message === 'Post deleted successfully') {
            dispatch(deletePost(postId));
        } else {
            toast.error(`Error in deleting post.`)
        }
    }

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
        const timeSinceJoined = calculateTimeSinceJoined(post.createdAt);
        setJoinedTime(timeSinceJoined);
    }, [post.createdAt])

    //This helps in calling the postComponent only whenever the state update in postItems.
    const memoizedCommentsComponents = useMemo(() => {
        const sortedComments = [...post.comments].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return sortedComments.map(comment => (
            <CommentsComponent postId={postId} comment={comment} key={comment._id} />
        ));
    }, [postId]);

    return (
        <Card className="postSpace mt-3">
            <Card.Body>
                <div className="d-flex justify-content-between">
                    <div className="d-flex align-items-center">
                        <Avatar initial={post.author.initial} />
                        <div className="px-2">
                            <h6 className="m-0">{post.author.name}</h6>
                            <span>{post.author.place}</span>
                        </div>
                    </div>
                    <div>
                        <div>
                            {joinedTime}
                        </div>
                    </div>
                </div>

                <Card.Text className="my-3">
                    {post.content}
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <div className="d-flex justify-content-between pb-2">
                    <div className="like-class" onClick={handleLike}>
                        <AiFillLike color={liked ? 'blue' : 'white'} size={20} />
                        <span className="mx-1">{post.likes.length} Likes</span>
                    </div>
                    <div className="comment-class" onClick={() => setCommentExpanded(!commentExpanded)}>
                        <FaRegCommentAlt />
                        <span className="mx-2">{post.comments.length} Comments</span>
                    </div>
                    {post.author._id.toString() == currentUserId && <div className="delete-class" onClick={deletePostHandler}>
                        <MdDeleteOutline size={22} />
                        <span className="mx-1">Delete</span>
                    </div>}
                </div>
                {commentExpanded && (
                    <div className="commentExpand">
                        <Row className="d-flex justify-content-between px-2 py-3">
                            <Col className="col-10">
                                <Form.Control
                                    as="textarea"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Write your comment..."
                                />
                            </Col>
                            <Col className="col-2">
                                <Button disabled={isLoading} onClick={addCommentHandler}>Post</Button>
                            </Col>
                        </Row>
                        {isLoading && <Loader />}
                        {commentsArray.length ? memoizedCommentsComponents : <p className="p-2">Be the first one to comment</p>}
                    </div>

                )}

            </Card.Footer>
        </Card>
    );
}

PostComponent.propTypes = {
    post: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        author: PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            initial: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
            place: PropTypes.string.isRequired
        }).isRequired,
        likes: PropTypes.array.isRequired,
        comments: PropTypes.array.isRequired,
        createdAt: PropTypes.string.isRequired,
        updatedAt: PropTypes.string.isRequired,
        __v: PropTypes.number.isRequired
    }).isRequired
};

export default PostComponent;