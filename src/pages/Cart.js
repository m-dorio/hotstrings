import React, { useEffect, useState, useContext } from 'react';
import { Container, Row, Col, CardGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom'
import UserContext from '../UserContext';
import UserCart from '../components/user/UserCart';
import AdminView from '../components/user/AdminView';
import Banner from '../components/Banner';
import PlaceholderLoading from 'react-placeholder-loading'

export default function Products() {
  const { user } = useContext(UserContext);
  const [userCart, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    fetch(`${process.env.REACT_APP_API_URL}/cart/`,{
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${localStorage.getItem('token')}`
        }
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }

  useEffect(() => {

	  const t = setTimeout(() => {
		setLoading(false); // Set loading to false after 3000ms
	  }, 600);
  
	  return () => {
		clearTimeout(t); // Cleanup the timeout on unmount
	  };
    fetchData();
  }, []);

  return (
    <div className='h-100' id="cart">
      {!fetchData ? (
        <Container>
          <Row>
            <Col>
              <h1>404 - Not found</h1>
            </Col>
          </Row>
        </Container>
      ) : (
        <>
          {user.isAdmin ? (
            <Container>
              <Row>
                <Col>
                  
                    <AdminView productsData={userCart} fetchData={fetchData} />
   
                </Col>
              </Row>
            </Container>
          ) : (
            <Container>
              <Row>
                <Col>
 
                    <UserCart fetchData={fetchData} endpoint="" status="Cart Items" />
        
                </Col>
              </Row>
            </Container>
          )}
        </>
      )}
    </div>
  );
}  