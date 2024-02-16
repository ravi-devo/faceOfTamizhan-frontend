import { Card } from "react-bootstrap";
import { BiLike } from "react-icons/bi";
import { FaRegCommentAlt } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const PostComponent = () => {
    return (
        <Card className="postSpace mt-3">
                        <Card.Body>
                            <div className="d-flex align-items-center">
                                <div className="circular-avatar mr-2">
                                    <p>RV</p>
                                </div>
                                <div className="px-2">
                                    <h6 className="m-0">Ravichandran Venkatesan</h6>
                                    <span>Mumbai, India</span>
                                </div>
                            </div>
                            <Card.Text className="my-3">
                                This app is mainly for people of TamilNadu, in our community people shares the culture, tradions and many occasions which we celebrate locally.
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="d-flex justify-content-between">
                            <div><BiLike /><span className="mx-1">Like</span></div>
                            <div><FaRegCommentAlt /><span className="mx-2">Comment</span></div>
                            <div><MdDeleteOutline size={22} /><span className="mx-1">Delete</span></div>
                        </Card.Footer>
                    </Card>
    )
}

export default PostComponent;