import { Card } from "react-bootstrap";
import { MdDeleteOutline } from "react-icons/md";
import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import './comment.css';
import { useDispatch } from "react-redux";
import { useDeleteCommentMutation } from "../slices/postApiSlice";
import { deleteComment } from "../slices/postSlice";

const CommentsComponent = (props) => {
    const { postId, comment } = props;
    const [joinedTime, setJoinedTime] = useState('');
    const dispatch = useDispatch();
    const [deleteCommentAPI] = useDeleteCommentMutation();

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
        //Calculation of joined time
        const timeSinceJoined = calculateTimeSinceJoined(comment.createdAt);
        setJoinedTime(timeSinceJoined);
    }, [comment.createdAt]);

    const deleteCommentHandler = async () => {
        const res = await deleteCommentAPI({postId, commentId: comment._id}).unwrap();
        if (res.message === 'Comment deleted successfully') {
            dispatch(deleteComment({postId, commentId: comment._id}));
            console.log(`Called in`)
        }
    }

    return (
        <Card className="mb-2 comment-card">
            <Card.Body>
                <div className="d-flex justify-content-between">
                    <div className="d-flex justify-content-between">
                        <div className="comment-avatar">
                            <p>{comment.author.initial}</p>
                        </div>
                        <div className="px-2">
                            <h6 className="m-0 title">{comment.author.name}</h6>
                            <span className="subtitle">{joinedTime}</span>
                        </div>
                    </div>
                    <div onClick={deleteCommentHandler}>
                        <MdDeleteOutline size={18} />
                        <span className="mx-1 title">Delete</span>
                    </div>
                </div>
                <Card.Text className="my-3 title">
                    {comment.text}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

CommentsComponent.propTypes = {
    postId: PropTypes.string.isRequired,
    comment: PropTypes.shape({
        text: PropTypes.string.isRequired,
        author: PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            initial: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
            place: PropTypes.string.isRequired
        }).isRequired,
        createdAt: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired
    }).isRequired
};

export default CommentsComponent;