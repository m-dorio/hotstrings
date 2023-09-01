import {Link, NavLink} from 'react-router-dom';
import { useState } from 'react'

import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

export default function AppNavbar() {

    const [user, SetUser] = useState(localStorage.getItem("token"));
    console.log(user); //check if we receive the token

    return (
        <Navbar fixed="top"bg="dark" data-bs-theme="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand as={Link} to="/">
                <div className='text-white'>HOT/STRINGS</div>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={ NavLink } to="/" exact>Home</Nav.Link>
                        <Nav.Link as={ NavLink } to="/products" exact>Products</Nav.Link>

                        {(user !== null)?
                            <Nav.Link as={ NavLink } to="/logout" exact>Logout</Nav.Link>:
                        <>
                            <Nav.Link as={ NavLink } to="/login" exact>Login</Nav.Link>
                            <Nav.Link as={ NavLink } to="/register" exact>Register</Nav.Link>
                        </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    )
}