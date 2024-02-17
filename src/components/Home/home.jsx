import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import Header from "../NavBar/navbar";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const postItems = useSelector((state) => state.post.postItems);

    const navigateToPost = () => {
        navigate('/post');
    }

    return (
        <div>
            <Header />
            <h1>Welcome to home screen, you are now logged in.</h1>
            <Button className="mx-2" onClick={navigateToPost}>Post Page</Button>
            {/* Render fetched posts */}
            <div>
                {!postItems.length ? <h6>No Post</h6> : postItems.map(post => (
                    <div key={post.id}>
                        <h2>{post.author.name}</h2>
                        <p>{post.content}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home;