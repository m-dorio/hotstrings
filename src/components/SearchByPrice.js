import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { Col, Row, Container, Button, Modal, Form } from 'react-bootstrap';
import FormatCurrency from './FormatCurrency';
import { Link } from 'react-router-dom';

const SearchByPrice = () => {
  
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [products, setProducts] = useState([]);

  const handleChange = (event) => {
    setMinPrice(1);
    setMaxPrice(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ minPrice, maxPrice }),
    };

    fetch(`${process.env.REACT_APP_API_URL}/products/searchByPrice`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <Container fluid>
      <Row className="justify-content-center text-white">
        <Col sm={12} md={8} lg={6} className="p-2">
          <h2>
            Search <i className="bowl-rice fa-solid fa-bowl-rice"></i> by Price Range
          </h2>
          <form onSubmit={handleSubmit}>
            <input
              type="range"
              id="price"
              className="form-range"
              min={1}
              max={999}
              value={maxPrice}
              onChange={handleChange}
            />
            <div className="d-grid gap-2 py-3">
              <Button type="submit" variant="primary" size="lg">
                {FormatCurrency(maxPrice)} Search
              </Button>
            </div>
          </form>
        </Col>
      </Row>
      <Row className="justify-content-center">
        {products.map((product) => (
          <Col key={product._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Link className="btn btn-dark text-white" to={`/products/${product._id}`}>
                {product.name}
              <img className="img-fluid border rounded mb-2" src={product.productImg} alt={product.name} />
              <i className="bowl-rice fa-solid fa-bowl-rice"></i> - {FormatCurrency(product.price)}
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default SearchByPrice;