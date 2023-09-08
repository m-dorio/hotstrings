import React, { useState, useEffect, useContext } from "react";
import { Container, Card, Button, Row, Col, ButtonGroup, Pagination } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import Swal from 'sweetalert2';
import UserContext from "../UserContext";
import formatCurrency from '../components/FormatCurrency';
import ProductCard from '../components/ProductCard'
import FeaturedProducts from '../components/FeaturedProducts'
import EditProduct from '../components/EditProduct';
import ArchiveProduct from '../components/ArchiveProduct'

export default function ProductView({ productsData, fetchData }) {
    const { user } = useContext(UserContext);
    const { productId } = useParams();

    const [id, setProductId] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [img, setImage] = useState("");
    const [itemsToBuy, setItemsToBuy] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [inventory, setInventory] = useState(0);
    let [item, setItem] = useState(0);
    const subtotal = formatCurrency(price * quantity);

    let active = 1;
    let items = [];
    for (let number = 1; number <= 5; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active}>
                {number}
            </Pagination.Item>,
        );
    }

    const updateProduct = () => {
        fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                productId: productId,
                quantity: quantity - itemsToBuy
            })
        })
        console.log("Im here!")
        reset();
    }

    const addToCart = () => {
        fetch(`${process.env.REACT_APP_API_URL}/cart/add`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                productId: productId,
                quantity: itemsToBuy
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.message === 'Added to Cart Successfully.') {
                    Swal.fire({
                        title: "Successfully added.",
                        icon: 'success',
                        text: "You have successfully added the product."
                    });
                    updateProduct();
                } else {
                    Swal.fire({
                        title: "Something went wrong",
                        icon: 'error',
                        text: "Please try again."
                    })
                }
            })
    }

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
            .then(res => res.json())
            .then(data => {
                setName(data.name);
                setDescription(data.description);
                setPrice(data.price);
                setImage(data.productImg);
                setItemsToBuy(itemsToBuy);
                setInventory(data.quantity - itemsToBuy);
                setQuantity(data.quantity);
            })
    }, [productId])

    function add() {
        if (inventory > 0) {
            setItemsToBuy(prevItems => prevItems + 1);
            setInventory(prevInventory => prevInventory - 1);
        }
    }

    function remove() {
        if (itemsToBuy > 0) {
            setItemsToBuy(prevItems => prevItems - 1);
            setInventory(prevInventory => prevInventory + 1);
        }
    }

    function reset() {

        setItemsToBuy(0);
        setItem(item);
        setInventory(quantity);
    }

    return (
        <>
  <div id="product-view">
  <Container>
  <Row>
      <Col xs={12} lg={{ span: 6 }} className="pt-5">
          <Card.Header>
              
          </Card.Header>
      </Col>
  </Row>
  <Row>
      <Col xs={12} lg={{ span: 6 }}>
          <Card className='bg-dark text-white productHighlight'>
              <Card.Body className="text-white">
                  <Card.Title><h1 className="text-warning">{name}</h1></Card.Title>
                  <Card.Img variant="top" className='my-3 object-fit-cover border rounded' src={img} />
                  
                  <Card.Title><span className="text-warning h3">Available:</span> <span className="text-white h3">{quantity}</span></Card.Title>
                  <Card.Title><span className="text-warning">Description:</span></Card.Title>
                  <Card.Text>{description}</Card.Text>
              </Card.Body>
              <Card.Footer className='d-flex align-items-center justify-content-between'>
                  <Card.Text className='h4 text-white'>Price: {formatCurrency(price)}</Card.Text>
                  <Card.Text className='h4 text-warning'>Total: {subtotal}</Card.Text>
              </Card.Footer>
          </Card>
      </Col>
                    
<Col xs={12} lg={{ span: 6 }}>
    <Row>
        <Col>
            <Card className='bg-dark text-white productHighlight'>
                <Card.Body className="text-white">
                    <Card.Text><span className="h4 text-warning">Must try:</span></Card.Text>
                    <FeaturedProducts breakpoint={4} />
                </Card.Body>
            </Card>
        </Col>
    </Row>

    <Row>
        <Col>
            <Card className='bg-dark text-white productHighlight'>
                <Card.Body>
                    <Card.Subtitle><span className="h4 text-warning">Ratings:</span> <span>8/10</span> </Card.Subtitle>
                    <Card.Text>{description}</Card.Text>
                    <Pagination>{items}</Pagination>
                </Card.Body>
                <Card.Footer>
                <Row>
                  <Col className='d-flex align-items-center justify-content-between'>
                  {user.id !== null ? (
                  <>
                      <ButtonGroup aria-label="Basic example">
                          <Button className='m-1 px-3' variant="danger" onClick={remove}>-</Button>
                          <Card.Text className='m-1 px-1 h3'>{itemsToBuy}</Card.Text>
                          <Button className='m-1 px-3' variant="warning" onClick={add}>+</Button>
                      </ButtonGroup>
                     
                      <Button variant="success" onClick={() => addToCart(productId)}>
                          Add to Cart
                      </Button>
                      
                      <Link className="btn btn-danger d-block" onClick={() => reset()}>
                          Reset
                      </Link>
                   
                    </>
                ) : (
                    <>
                        <ButtonGroup aria-label="Basic example">
                            <Button className='m-1 px-3' variant="danger" onClick={remove}>-</Button>
                            <Card.Text className='m-1 px-1 h3'>{itemsToBuy}</Card.Text>
                            <Button className='m-1 px-3' variant="warning" onClick={add}>+</Button>
                        </ButtonGroup>

                        <Card.Text className='h5 text-warning'>
                            Total: {subtotal}
                        </Card.Text>

                        <Link className="btn btn-danger d-block" to="/users/login">
                            Log in to order
                        </Link>
                    </>
                    )}
                    </Col>
                    </Row>
                </Card.Footer>
              </Card>
          </Col>
          </Row>
        </Col>
      </Row>
    </Container>
    </div>
  
    </>
  );
}