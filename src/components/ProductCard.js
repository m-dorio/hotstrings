import { useState } from 'react'
import {Col, Card, Button}  from 'react-bootstrap'
import PropTypes from 'prop-types'
import ButtonGroup from 'react-bootstrap/ButtonGroup';

export default function ProductCard({productProp}) {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'PHP' }).format(amount);
      }

    const {name, description, price, productImg} = productProp;

    const [items, setCart] = useState(0);
    const [inventory, setInventory] = useState(5);
    const subtotal = formatCurrency(price * items);

    console.log(useState(0))

    function addToCart(){

        if (inventory > 0) {
            setCart(items + 1);
            setInventory(inventory - 1);
        } else {
            return
            // alert("No more items available.")
        }
        console.log('Item in cart: ' + items)
        console.log("Inventory: "+ inventory);
    }

    function removeFromCart(){

        if (items > 0) {
            setCart(items - 1);
            setInventory(inventory + 1);
        } else {
            return
            // alert("Please add some item in the cart.")
        }
        console.log('Item in cart: ' + items)
        console.log("Inventory: "+ inventory);
    }


    return(
        <Col xs={12} md={6} lg={4} xl={3} className='my-3 '>  
            <Card border="secondary" id='productComponent1' className='bg-dark text-white cardHighlight'>
                <Card.Body>
                    <Card.Img variant="top" className='object-fit-cover border rounded' src={productImg} />
                    <Card.Title className='text-center pt-3' >{name}</Card.Title>
                    <Card.Subtitle>Description:</Card.Subtitle>
                    <Card.Text>{description}</Card.Text>
                    <Card.Text>Available: {inventory} </Card.Text>
                    <Card.Subtitle>Price: {formatCurrency(price)}</Card.Subtitle>
                </Card.Body>
                
                <div className='d-flex justify-content-around align-items-center'>
                    <div>  
                    <Card.Text className='mx-1 px-1 h3 text-warning'>Subtotal: {subtotal}</Card.Text>
                    </div>
                    <div>
                        <ButtonGroup aria-label="Basic example">
                            <Button className='m-1 px-3' variant="danger" onClick={removeFromCart}>-</Button>
                            <Card.Text className='m-1 px-1 h3'>{items}</Card.Text>
                            <Button className='m-1 px-3' variant="warning" onClick={addToCart}>+</Button>
                        </ButtonGroup>
                    </div>
                </div>
            </Card>
        </Col>
    )}



//Check if the ProductCard component us getting the correct prop type
ProductCard.propTypes ={
    product: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired

    })
}


