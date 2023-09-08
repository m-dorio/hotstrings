import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { Col, Row, Container, Button, Modal, Form } from 'react-bootstrap';
import FormatCurrency from './FormatCurrency';
import { Link } from 'react-router-dom';

const ProductSearch = () => {
  // State variables
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [minPrice, setMinPrice] = useState(1);
  const [maxPrice, setMaxPrice] = useState(999);
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
      setSearchResults(data);

    } catch (error) {
      console.error('Error searching for products by name:', error);
    }
  };
  
  const searchByPrice = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ minPrice, maxPrice }),
    };
  
    fetch(`${process.env.REACT_APP_API_URL}/products/searchByPrice`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
        console.log(data.products);

      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  
  useEffect(() => {
    searchByName();
    searchByPrice();
  }, [searchQuery, maxPrice]);

  const handleChange = (event) => {
    setMinPrice(1);
    setMaxPrice(event.target.value);
  };


  return (
    <>
   
  <Container>
    <Row>
      <Col className='text-white my-5 px-5'>
       
        <Container>
          <Row>
            <Col>         
              <h3>List By Price:</h3>
                    <input
                      type="range"
                      id="price"
                      className="form-range"
                      min={1}
                      max={999}
                      value={maxPrice}
                      onChange={handleChange}
                    />
                    <h3>{FormatCurrency(maxPrice)}</h3>
                {products.map((product) => (
                
                <div className='p-1' key={product.id}>
                <li className="my-1">
                  <Link className='btn btn-success text-white' to={`/products/${product._id}`}> {product.name} - {FormatCurrency(product.price)}</Link>
                </li>
                </div>
              ))}
            </Col>

            <Col>
              <Form.Group>
              <h3>Product Search</h3>

            <label htmlFor="productName">Product Name:</label>
              <input
              type="text"
              id="productName"
              className="form-control"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              />

             
              </Form.Group>
            </Col>
          </Row>
        </Container>
       
      </Col>
    </Row>
    <Row>
      {searchResults.map((product) => (
        <ProductCard key={product._id} productProp={product} />
      ))}
    </Row>
  </Container>

  </>
  );
};

export default ProductSearch;
