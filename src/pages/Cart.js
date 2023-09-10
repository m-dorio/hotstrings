import React, { useEffect, useState, useContext } from 'react';
import { Container, Row, Col, CardGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import UserContext from '../UserContext';
import UserCart from '../components/user/UserCart';
import AdminView from '../components/user/AdminView';

export default function Products() {
  const { user } = useContext(UserContext);
  const [userCart, setProducts] = useState([]);

  const fetchData = () => {
    fetch(`${process.env.REACT_APP_API_URL}/cart/`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }
  useEffect(() => {
    fetchData();
  }, []);

  const renderView = () => {
    if (user.isAdmin) {

      return (
        <Container>
          <Row>
            <Col>
              <AdminView productsData={userCart} fetchData={fetchData}/>
            </Col>
          </Row>
        </Container>
      );
      
    } else {
      return (
        <Container>
          <Row>
            <Col>
              <UserCart product={userCart._id}  fetchData={fetchData}  isActive={userCart.isActive} endpoint={`./cart/`} status={"My Cart"} />
            </Col>
          </Row>
        </Container>
      );
    }

  }

console.log(userCart._id);

  return (
    <>
      {renderView()}
    </>
)

}
