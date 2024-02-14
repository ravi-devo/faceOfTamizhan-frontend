import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../slices/authSlice";
import { useLogoutMutation } from "../../slices/usersApiSlice";
import { toast } from 'react-toastify';

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ LogoutAPI ] = useLogoutMutation();

    const logOutHandler = async () => {
        try {
            const res = await LogoutAPI().unwrap();
            if(res.message === "Logout successful.") {
                console.log(`Came in`)
                dispatch(logOut());
                navigate('/');
            }else{
                toast.error(`Cannot log you out.`)
            }
        } catch (error) {
            toast.error(`Error: ${error}`)
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