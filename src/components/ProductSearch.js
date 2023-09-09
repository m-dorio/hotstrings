import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { Col, Row, Container, Button, Modal, Form } from 'react-bootstrap';
import FormatCurrency from './FormatCurrency';
import { Link } from 'react-router-dom';

const ProductSearch = () => {
  // State variables
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [products, setProducts] = useState([]);

  const searchByName = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/products/searchByName`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productName: searchQuery })
      });
      const data = await response.json();
      setProducts(data);

    } catch (error) {
      console.error('Error searching for products by name:', error);
    }
  };
  
  useEffect(() => {
    searchByName();
}, [searchQuery]);


  return (
    <Container fluid>
    <Row className="justify-content-center text-white">
      <Col sm={12} md={8} lg={6} className="p-2">
        <Form.Group>
          <h3><i className="bowl-rice fa-solid fa-bowl-rice"></i> Search</h3>
          <input
            type="text"
            id="productName"
            className="form-control"
            value={searchQuery}
            placeholder='Search by name'
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </Form.Group>
      </Col>
    </Row>
    <Row className="justify-content-center">
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
  );
};

export default ProductSearch;
