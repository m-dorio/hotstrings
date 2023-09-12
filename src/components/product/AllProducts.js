import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Tab, Tabs, Button, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FormatCurrency from '../FormatCurrency';
import Swal from 'sweetalert2';

export default function AllProducts({status,endpoint}) {
    // Initialize the products state

const [products, setProducts] = useState([]);

const fetchData = () => {
  fetch(`${process.env.REACT_APP_API_URL}/products/${endpoint}`)
    .then((res) => res.json())
    .then((data) => {
      setProducts(data);
    });
}

useEffect(() => {
    fetchData();
}, []);

//  console.log("allproducts endpoint: " + endpoint)

    return (
        <>
        <Row className="justify-content-center">
            
        {products.map((product) => (
          <Col key={product._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            {(!product.isActive ? 
                <>
                  <Link className="btn btn-secondary text-white" to={`./#`}>
                  {product.name}
                  <img className="img-fluid border rounded mb-2" src={product.productImg} alt={product.name} />
                  <i className="bowl-rice fa-solid fa-bowl-rice"></i> - {FormatCurrency(product.price)}
                  </Link>
                  </>
                  : 
                  <>
                  <Link className="btn btn-dark text-white" to={`./${product._id}`}>
                  {product.name}
                  <img className="img-fluid border rounded mb-2" src={product.productImg} alt={product.name} />
                  <i className="bowl-rice fa-solid fa-bowl-rice"></i> - {FormatCurrency(product.price)}
                  </Link>
                  
                  </>
                  )}
          </Col>
     
        ))}
        </Row>
    </>
    )
}
