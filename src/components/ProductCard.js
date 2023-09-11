import { Card, Button, Col, Row } from 'react-bootstrap';

import { Link } from 'react-router-dom';

import '../App.css';
import PlaceholderLoading from 'react-placeholder-loading'
import React, { useState, useEffect } from 'react';

function ProductCard({ _id, name, productImg, description, user }) {

  const [loading, setLoading] = useState(true);

	useEffect(() => {
	  const t = setTimeout(() => {
		setLoading(false); // Set loading to false after 3000ms
	  }, 1500);
  
	  return () => {
		clearTimeout(t); // Cleanup the timeout on unmount
	  };
	}, []);

  return (
    <>
      {loading ? (
        <PlaceholderLoading
          colorStart="#313131"
          colorEnd="#1e1e1e"
          shape="circle"
          width={100}
          height={100}
        />
      ) : (
        <Col sm={6} md={4} lg={3} className='my-3'>
          <Card data-bs-theme="dark" border="secondary" id={`productComponent${_id}`} className="text-white productHighlight">
            <Card.Body>
              <Card.Title className='text-center text-primary pb-1'>{name}</Card.Title>

              <Link to={`/products/${_id}`}>
                <Card.Img variant="top" className='img-fluid border rounded mb-2' src={productImg} />
              </Link>
              
              <Card.Title><span className="text-warning">Description:</span></Card.Title>
              <Card.Text className='desc ellipsis'>{description}</Card.Text>

            </Card.Body>

            <Card.Footer className=''>
              <Link className="btn btn-primary d-block" to={`/products/${_id}`}>
                Details
              </Link>

              {user.id ? (
                <Link className="btn btn-danger" to="/users/login">
                  Log in to order
                </Link>
              ) : null}
            </Card.Footer>
          </Card>
        </Col>
      )}
    </>
  );
}

