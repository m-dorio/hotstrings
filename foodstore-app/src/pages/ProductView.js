import { useState, useEffect, useContext } from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { useParams, useNavigate, Link } from "react-router-dom";
import Swal from 'sweetalert2';
import UserContext from "../UserContext";
import Footer from '../components/Footer'
import ButtonGroup from 'react-bootstrap/ButtonGroup';

export default function ProductView(){

    const { user } = useContext(UserContext)
    // The "useParams" hook allows us to retieve the productId passed via the URL

    const navigate = useNavigate();

    const{ productId} = useParams();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [img, setImage] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [items, setCart] = useState(0);
    
    const addToCart = (productId) => {
        fetch(`${process.env.REACT_APP_API_URL}/cart/add`,{
            method: 'POST',
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('token')}`},
            body: JSON.stringify({
                productId: productId,
                quantity: items
            }),
        })
        .then((res) => res.json())
        .then((data) => {
                console.log(data)

                if (data.message = 'Added to Cart Successfully.'){
                    Swal.fire({
                        title: "Successfully added.",
                        icon: 'success',
                        text: "You have successfully added the product."
                    });
                }
                else{
                    Swal.fire({
                        title: "Something went wrong",
                        icon: 'error',
                        text: "Please try again."
                    })
                }
            })
    }

    useEffect(() => {
        console.log(productId);
        fetch(`${process.env.REACT_APP_API_URL }/products/${productId}`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        setName(data.name);
        setDescription(data.description);
        setPrice(data.price);
        setImage(data.productImg);
        setQuantity(data.quantity);
   
    })
}, [productId])

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'PHP' }).format(amount);
}

const [inventory, setInventory] = useState(5);
const subtotal = formatCurrency(price * items);

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

return (
  <>
  <div id="product-view" >
    <Container className="">
      <Row>
        <Col lg={{ span: 6, offset: 3 }}>
          <Card  className='bg-dark text-white productHighlight'>
          <Card.Body className="text-white">
            <Card.Title><h1>{name}</h1></Card.Title>
            <Card.Img variant="top" className='my-3 object-fit-cover border rounded' src={img}/>
          
            <Card.Subtitle>Price: {price}</Card.Subtitle>
            <Card.Title>Description</Card.Title>
            <Card.Text>{description}</Card.Text>

            <Card.Footer className='d-flex align-items-center'>
              <ButtonGroup aria-label="Basic example">
                  <Button className='m-1 px-3' variant="danger" onClick={remove}>-</Button>
                  <Card.Text className='m-1 px-1 h3'>{items}</Card.Text>
                  <Button className='m-1 px-3' variant="warning" onClick={add}>+</Button>
              </ButtonGroup>
              <Card.Text className='mx-1 px-1 h3 text-warning'>Total: {subtotal}</Card.Text>
            </Card.Footer>

            {user.id !== null ? (
              <Button variant="primary" onClick={() => addToCart(productId)}>
                add to Cart
              </Button>
            ) : (
              <Link className="btn btn-danger btn-block" to="/users/login">
                Log in to view
              </Link>
            )}
          </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </div>
    <Footer />
    </>
  );
}