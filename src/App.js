import Products from './pages/Products';
import ProductView from './pages/ProductView';
import Cart from './pages/Cart';
import Container from 'react-bootstrap/Container'
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AppNavbar from './components/AppNavbar'
import AddProduct from './components/AddProduct'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login';
import Logout from './pages/Logout';
import Profile from './pages/Profile';
import Error from './pages/Error';

import './App.css';
import { UserProvider } from './UserContext';

function App() {

  const [user, setUser] = useState({
    //token: localStorage.getItem('token')
    id: null,
    isAdmin: null
  })

  const unsetUser = () => {
    localStorage.clear();
  }

  // Used to check if the user information is properly stored upon login and the localStorage information is cleared upon logout
  useEffect(() => {
    //console.log(user);
    //console.log(localStorage);
    fetch(`${process.env.REACT_APP_API_URL}/users/details`,{
      headers: {
        Authorization: `Bearer ${ localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then(data => {
      // console.log(data)
      // console.log("App.js")
      // Set the user state values with the user details upon successful login.
      if (typeof data._id !== "undefined") {
        setUser({
          id: data._id,
          isAdmin: data.isAdmin
        })
      }
      else{
        setUser({
          id: null,
          isAdmin: null
        })
      } 
    })
  }, [user])

  return (
    // React Fragments <></>
    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
        <Container fluid id="_body" className='mt-5'>
          <AppNavbar/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route exact="true" path="/products" element={<Products/>}/>
            <Route path ="/products/add" element={<AddProduct/>}/>
            <Route path="/products/:productId" element={<ProductView/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/users/register" element={<Register/>}/>
            <Route path="/users/login" element={<Login/>}/>
            <Route path="/logout" element={<Logout/>}/>
            <Route path="*" element={<Error/>} />
          </Routes>
        </Container>
      </Router> 
    </UserProvider>
  );
}

export default App;
