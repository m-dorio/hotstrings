import { useState } from 'react'
import {Container, Row, Col, Card, Button}  from 'react-bootstrap'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import formatCurrency from './FormatCurrency';
import UserContext from '../UserContext';
import {useContext } from 'react';
import '../App.css';

export default function ProductCard({productProp}) {
    const { _id, name, description, price, quantity, productImg} = productProp;

    const { user, setUser} = useContext(UserContext);
    const [items, setCart] = useState(0);
    const [inventory, setInventory] = useState(5);
    const subtotal = price * items;

    function add() {
        if (inventory > 0) {
          setCart((prevItems) => prevItems + 1);
          setInventory((prevInventory) => prevInventory - 1);
        } else {
          return;
        }

      }
      
      function remove() {
        if (items > 0) {
          setCart((prevItems) => prevItems - 1);
          setInventory((prevInventory) => prevInventory + 1);
        } else {
          return;
        }

      }

    return(
          <>
        <Col md={4}>
            <Card data-bs-theme="dark" border="secondary" id='productComponent1' className='text-white productHighlight'>
                <Card.Body>
                    <Card.Title className='text-center text-primary pb-1' >
                    {name}
                    </Card.Title>
                    
                    <Link to={`/products/${_id}`}>
                        <Card.Img variant="top" className='object-fit-cover border rounded mb-2' src={productImg} />
                    </Link>
                    <Card.Title><span className="text-warning h3">Available:</span> <span className="text-white h3">{quantity}</span></Card.Title>
                    <Card.Title><span className="text-warning">Description:</span></Card.Title>
                    <Card.Text className='desc ellipsis'>{description}</Card.Text>

                </Card.Body>

                <Card.Footer className='d-flex align-items-center justify-content-between'>
                   
                    {user.id !== null ? (
                    <>
                    <Card.Text className='h5 text-warning'>
                    Price: {formatCurrency(price)}
                    </Card.Text>
                    <Link className="my-2 btn btn-primary" to={`/products/${_id}`}>Details</Link>
                
                    </>
                  ) : (
                    <>
                   
                    <Link className="btn btn-danger" to="/users/login">
                      Log in to order
                    </Link>
                    <Link className="my-2 btn btn-primary" to={`/products/${_id}`}>Details</Link>
                
                    </>
                  )}
                </Card.Footer>
            </Card>
      
            </Col>
            </>
        )
    }


//Check if the ProductCard component us getting the correct prop type
ProductCard.propTypes = {
    product: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    }),
  };


