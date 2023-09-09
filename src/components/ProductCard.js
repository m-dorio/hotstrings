import { Card, Button, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import formatCurrency from './FormatCurrency';
import UserContext from '../UserContext';
import { useContext } from 'react';
import '../App.css';

const ProductComponent = ({productProp}) => {
  const user = useContext(UserContext);
  const { name, _id, productImg, quantity, description } = productProp;

  return (
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
  );
};


export default ProductComponent;
