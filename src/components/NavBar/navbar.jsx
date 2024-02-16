import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useSelector, useDispatch } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useLogoutMutation } from '../../slices/usersApiSlice';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../slices/authSlice';
import { toast } from 'react-toastify';

const Header = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [LogoutAPI] = useLogoutMutation();
    const {userInfo} = useSelector((state) => state.auth);

    const logoutHandler = async () => {
        try {
            const res = await LogoutAPI().unwrap();
            if (res.message === "Logout successful.") {
                console.log(`Came in`)
                dispatch(logOut());
                navigate('/');
            } else {
                toast.error(`Cannot log you out.`)
            }
        } catch (error) {
            toast.error(`Error: ${error}`)
        }
    }
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Face Of Tamizhan</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-end" style={{ width: "100%" }}>
            <NavDropdown title={`Signed in as: ${userInfo.data.name}`} id="basic-nav-dropdown">
                <LinkContainer to='/'>
                      <NavDropdown.Item>My Post</NavDropdown.Item>
                    </LinkContainer>
              <NavDropdown.Item onClick={logoutHandler}>
                Log Out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;