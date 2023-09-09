import React from 'react';
import { Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Product({ breakPoint, productData }) {
  const { _id, name, description, price, productImg } = productData;

  return (
    <Col xs={12} sm={12} md={6} lg={6} xl={breakPoint} className="mb-1">
		
      <Card className="product-card mx-2 bg-dark text-warning">
		<Card.Header>
		<Link to={`/products/${_id}`}>
            <Card.Img variant="top" src={productImg} />
          </Link>
		</Card.Header>
        <Card.Body>
        
          <Card.Title className="ellipsis text-center">
            <Link className='text-white' to={`/products/${_id}`}>{name}</Link>
          </Card.Title>
          <Card.Text className="desc ellipsis">{description}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <Link className="my-2 btn btn-primary d-block" to={`/products/${_id}`}>
            Details
          </Link>
        </Card.Footer>
      </Card>
    </Col>
  );
}