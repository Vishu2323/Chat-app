import { useContext } from "react";
import { Container, Nav , Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthContext from "../context/authContext";
const NavBar = () => {
    const {user,logoutUser} = useContext(AuthContext)
    return (
        <Navbar bg="dark" height="3.75rem">
            <Container>
                <h2>
                    <Link to="/" className="link-light text-decoration-none">ChatIT</Link>
                </h2>
                {user && <span className="text-warning">Logged in as {user?.name}</span>}
                <Nav>
                    <Stack direction="horizontal" gap="5">
                        {
                            user && (<>
                                <Link to="/login" onClick={()=>{logoutUser()}}className="link-light text-decoration-none">LogOut</Link>
                            </>)
                        }
                        {!user && <>
                         <Link to="/login" className="link-light text-decoration-none">Login</Link>
                        <Link to="/register" className="link-light text-decoration-none">Register</Link>
                        </>}
                    </Stack>
                </Nav>
            </Container>
        </Navbar>
    );
}
 
export default NavBar;