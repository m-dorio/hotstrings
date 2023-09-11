import React, { useEffect, useState, useContext } from 'react';
import { Container, Row, Col, CardGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom'
import UserContext from '../UserContext';
import UserCart from '../components/user/UserCart';
import AdminView from '../components/user/AdminView';
import Banner from '../components/Banner';

export default function Products() {
  const { user } = useContext(UserContext);
  const [userCart, setProducts] = useState([]);


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
    fetchData();
  }, []);

  return (
    <div id="cart">
      {(!fetchData || fetchData === null) ? (
        <>
        <Container>
            <Row>
                <Col>
                <h1>title="404 - Not found"</h1>
                </Col>
            </Row>
        </Container>
        </>
      ) : (
        <>
          {user.isAdmin ? (
            <>
              <Container>
                <Row>
                  <Col>
                    <AdminView productsData={userCart} fetchData={fetchData}/>
                  </Col>
                </Row>
              </Container>
            </>
          ) : (
            <>
              <Container>
                <Row>
                  <Col>
                    <UserCart fetchData={fetchData} endpoint={`./cart/`} status={"My Cart"} />
                  </Col>
                </Row>
              </Container>
            </>
          )}
        </>
      )}
    </div>
  )
}
