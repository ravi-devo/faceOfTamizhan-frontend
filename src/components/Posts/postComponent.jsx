import { Card } from "react-bootstrap";
import { AiFillLike } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import PropTypes from 'prop-types';
import { useState } from "react";

const PostComponent = ({ post }) => {
    const [liked, setLiked] = useState(false);
    const handleLike = () => {
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
                <div><AiFillLike onClick={handleLike} color={liked ? 'blue' : 'white'} size={20} /><span className="mx-1">{liked ? 'Liked' : 'Like'}</span></div>
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