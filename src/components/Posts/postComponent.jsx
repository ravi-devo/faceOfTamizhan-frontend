import { Card } from "react-bootstrap";
import { AiFillLike } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import PropTypes from 'prop-types';
import { useState } from "react";
import { useLikeMutation, useDislikeMutation } from "../../slices/postApiSlice";
import { useSelector, useDispatch } from "react-redux";
import { dislikePost, likePost } from "../../slices/postSlice";

const PostComponent = ({ post }) => {

    const { userInfo } = useSelector((state) => state.auth);
    const currentUserId = userInfo.data._id;
    const [liked, setLiked] = useState(post.likes.includes(currentUserId));
    const [likeAPI] = useLikeMutation();
    const [disLikeAPI] = useDislikeMutation();
    const dispatch = useDispatch();

    const handleLike = async () => {
        if (liked) {
            const res = await disLikeAPI(post._id).unwrap();
            if (res.message === 'Post disliked successfully') {
                dispatch(dislikePost({ postId: post._id, userId: currentUserId }));
            }
        } else {
            const res = await likeAPI(post._id).unwrap();
            if (res.message === 'Post liked successfully') {
                dispatch(likePost({ postId: post._id, userId: currentUserId }));
            }
        }
        setLiked(!liked);
    }
    return (
        <Card className="postSpace mt-3">
            <Card.Body>
                <div className="d-flex align-items-center">
                    <div className="circular-avatar mr-2">
                        <p>{post.author.initial}</p>
                    </div>
                    <div className="px-2">
                        <h6 className="m-0">{post.author.name}</h6>
                        <span>{post.author.place}</span>
                    </div>
                </div>
                <Card.Text className="my-3">
                    {post.content}
                </Card.Text>
            </Card.Body>
            <Card.Footer className="d-flex justify-content-between">
                <div><AiFillLike onClick={handleLike} color={liked ? 'blue' : 'white'} size={20} /><span className="mx-1">{post.likes.length} Likes</span></div>
                <div><FaRegCommentAlt /><span className="mx-2">Comment</span></div>
                <div><MdDeleteOutline size={22} /><span className="mx-1">Delete</span></div>
            </Card.Footer>
        </Card>
    )
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