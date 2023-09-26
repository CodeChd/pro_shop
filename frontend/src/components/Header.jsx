import { Navbar, Nav, Container, Badge, NavDropdown } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "../assets/logo.png";
import { LinkContainer } from "react-router-bootstrap";
//Select a state so we can use it in our App
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logoutCredentials } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const { cartItems } = useSelector((state) => state.cart);

  const { userInfo } = useSelector((state) => state.auth);

  

  const logoutHandler = async(e) => {
    try {
     await logoutApiCall().unwrap();
      dispatch(logoutCredentials());
      navigate("/");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img src={logo} alt="" />
              ProShop
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <FaShoppingCart /> Cart
                  {cartItems.length > 0 && (
                    <Badge pill bg="success ms-2">
                      {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name.split(" ")[0]} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <FaUser className="" /> Sign-In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};
