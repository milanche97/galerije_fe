import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectActiveUser, selectIsAuthenticated } from "../store/auth";
import { logout } from "../store/auth/slice";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

export default function MainNavbar(){
  const dispatch = useDispatch();
  const activeUser = useSelector(selectActiveUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  function handleLogout(){
      dispatch(logout());
  }

return (
  <Navbar bg="white" color="dark">
    <Container>
        <Navbar.Brand>Galleries</Navbar.Brand>
        <Nav className="me-auto">
        <Nav.Link href="/galleries">All galleries</Nav.Link>
        {!isAuthenticated && (<Nav.Link href="/login">Login</Nav.Link>)}
        {isAuthenticated && (<Nav.Link  href="/my-galleries">My galleries</Nav.Link >)}
        {isAuthenticated && (<Nav.Link href="/create">Create new gallery</Nav.Link>)}
        {!isAuthenticated && (<Nav.Link href="/register">Register</Nav.Link>)}
        {isAuthenticated && (<Button variant="outline-danger" type="submit" onClick={handleLogout}>Logout</Button>)}
        </Nav>
    </Container>
    </Navbar>
    )
}


