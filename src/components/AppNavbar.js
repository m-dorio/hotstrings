import {Link, NavLink} from 'react-router-dom';
import {useContext } from 'react'
import UserContext from '../UserContext';
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import '../App.css';

export default function AppNavbar() {

    const { user } = useContext(UserContext);

    return (
        <Navbar sticky='top' bg="dark" data-bs-theme="dark" expand="lg">
            <Container fluid>
 
                <Navbar.Brand as={Link} to="./">
                    <span className="textfx">H</span><span className="logo">/S&nbsp;<i className="bowl-rice fa-solid fa-bowl-rice"></i></span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto align-items-center">
                        <Nav.Link className='mx-3' as={ NavLink } to="./" exact="true" >Home</Nav.Link>
                      
                       
                        {(user.id !==null)?

                        user.isAdmin 
                        ?
                        <>
                            <Nav.Link className='mx-3' as={ NavLink } to="/products" exact="true">Manage Products</Nav.Link>
                            <Nav.Link className='mx-3' as={ NavLink } to="/cart/all">Manage Orders</Nav.Link>
                            <Nav.Link className='mx-3' as={ NavLink } to="/logout">Logout</Nav.Link>
                        </>
                        :
                        <>
                            <Nav.Link className='mx-3' as={ NavLink } to="./products" exact="true">Products </Nav.Link>
                            <Nav.Link className='mx-3' as={ NavLink } to="/cart" exact="true">Cart</Nav.Link>
                            <Nav.Link className='mx-3' as={ NavLink } to="./profile" exact="true">Profile</Nav.Link>
                            <Nav.Link className='mx-3' as={ NavLink } to="/logout" exact="true">Logout</Nav.Link>
                           
                        </>
                        :
                        <>
                            <Nav.Link className='mx-3' as={ NavLink } to="/products" exact="true">Products</Nav.Link>
                            <Nav.Link className='mx-3' as={ NavLink } to="/users/login" exact="true">Login</Nav.Link>
                            <Nav.Link className='mx-3' as={ NavLink } to="/users/register" exact="true">Register</Nav.Link>
                        </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    )
}