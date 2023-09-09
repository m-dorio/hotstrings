import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Tab, Tabs } from 'react-bootstrap';
import ProductCard from './ProductCard';
import ProductSearch from './ProductSearch';
import SearchByPrice from './SearchByPrice';
import { Link } from 'react-router-dom';
import FormatCurrency from './FormatCurrency';

export default function UserView({ productsData}) {
  // Initialize the products state
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Filter and map the active products
    const activeProducts = productsData
      .filter((product) => product.isActive === true)
      .map((product) => (
        <>
        <ProductCard productProp={product} key={product._id} />
        </>
      ));

    // Set the products state
    setProducts(activeProducts);
  }, [productsData]);

  return (
    <Container fluid id="userview">
      <Row>
        <Col>
          <h2 className="text-center text-white mt-5">Available Products</h2>
        </Col>
      </Row>

      <Row>
        <Col>
          <Tabs
            defaultActiveKey="featured"
            id="fill-tab-example"
            className="mb-3"
            fill
          >
            <Tab eventKey="featured" title="All">
              <Container>
                <Row>
                {products.map((product) => (
                  <Col key={product._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                    <Link className='btn btn-dark text-white' to={`/products/${product._id}`}>
                    {product.name}
                      <img className='img-fluid border rounded mb-2' src={product.productImg} alt={product.name} />
                      <i className="bowl-rice fa-solid fa-bowl-rice"></i> - {FormatCurrency(product.price)}
                    </Link>
                  </Col>
                ))}
                </Row>
              </Container>
            </Tab>
            <Tab eventKey="name" title="Search By Name">
              <ProductSearch />
            </Tab>
            <Tab eventKey="price" title="Search By Price">
              <SearchByPrice />
            </Tab>
            <Tab eventKey="contact" title="Contact" disabled></Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
}
