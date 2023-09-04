import { useState } from 'react'
import {Col, Card, Button}  from 'react-bootstrap'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import formatCurrency from './FormatCurrency';
import '../App.css';

export default function ProductCard({productProp}) {
    // const formatCurrency = (amount) => {
    //     return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'PHP' }).format(amount);
    //   }

    // const { _id, name, description, price, productImg} = productProp;
    const { _id, name, description, price, productImg} = productProp;

    const [items, setCart] = useState(0);
    const [inventory, setInventory] = useState(5);
    const subtotal = formatCurrency(price * items);

    function addToCart() {
        if (inventory > 0) {
          setCart((prevItems) => prevItems + 1);
          setInventory((prevInventory) => prevInventory - 1);
        } else {
          return;
        }

      }
      
      function removeFromCart() {
        if (items > 0) {
          setCart((prevItems) => prevItems - 1);
          setInventory((prevInventory) => prevInventory + 1);
        } else {
          return;
        }

      }

    return(
        <Col xs={12} md={6} lg={4} xl={3} className='my-3'>  
            <Card border="secondary" id='productComponent1' className='bg-dark text-white productHighlight'>
                <Card.Body>
                    <Link to={`/products/${_id}`}>
                        <Card.Img variant="top" className='object-fit-cover border rounded' src={productImg} />
                    </Link>
                    <Card.Title className='text-center pt-3' >{name}</Card.Title>
                    <Card.Subtitle>Description:</Card.Subtitle>
                    <Card.Text className='desc ellipsis'>{description}</Card.Text>
                    <Link className='btn btn-primary' to={`/products/${_id}`}>More Details</Link>
                    <Card.Text>Available: {inventory} </Card.Text>
                    <Card.Subtitle>Price: {formatCurrency(price)}</Card.Subtitle>                              
                </Card.Body>

                <Card.Footer className='d-flex align-items-center'>
                    <ButtonGroup aria-label="Basic example">
                        <Button className='m-1 px-3' variant="danger" onClick={removeFromCart}>-</Button>
                        <Card.Text className='m-1 px-1 h3'>{items}</Card.Text>
                        <Button className='m-1 px-3' variant="warning" onClick={addToCart}>+</Button>
                    </ButtonGroup>
                    <Card.Text className='mx-1 px-1 h3 text-warning'>Total: {subtotal}</Card.Text>
                </Card.Footer>
            </Card>
        </Col>
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


