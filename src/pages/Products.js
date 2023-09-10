import React, { useEffect, useState, useContext } from 'react';
import { Container, Row, Col, CardGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import UserContext from '../UserContext';
import UserView from '../components/user/UserView';
import AdminView from '../components/user/AdminView';

export default function Products() {
  const { user } = useContext(UserContext);
  const [products, setProducts] = useState([]);

  const fetchData = () => {
    fetch(`${process.env.REACT_APP_API_URL}/products/all`)
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
      return <AdminView productsData={products} fetchData={fetchData} />;
    } else {
      return (
        <Container>
          <Row>
            <Col>
              <UserView endpoint={`./`} status={"Available Products"} />
            </Col>
          </Row>
        </Container>
      );
    }
  }

  return (
    <>
      {renderView()}
    </>
)

}
