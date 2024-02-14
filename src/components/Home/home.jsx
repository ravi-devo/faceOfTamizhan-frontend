import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../slices/authSlice";
const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logOutHandler = () => {
        try {
            dispatch(logOut());
            navigate('/');
        } catch (error) {
            console.log(`Error: ${error}`)
        }
    }
    return (
        <div>
            <h1>Welcome to home screen, you are now logged in.</h1>
            <Button onClick={logOutHandler}>Log out</Button>
        </div>
    )
}

export default Home;