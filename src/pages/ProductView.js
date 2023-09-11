import React, { useState, useEffect, useContext } from "react";
import { Container, Card, Button, Row, Col, ButtonGroup, Pagination} from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import Swal from 'sweetalert2';
import UserContext from "../UserContext";
import formatCurrency from '../components/FormatCurrency';
import ProductCard from '../components/ProductCard'
import FeaturedProducts from '../components/FeaturedProducts'
import ProductRating from "../components/ProductRating";
import ArchiveProduct from '../components/ArchiveProduct'

export default function ProductView({ productsData, fetchData }) {
  // Context and Params
  const { user } = useContext(UserContext);
  const { productId } = useParams();


  // State
  const [id, setProductId] = useState("");
  const [itemId, setItemId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [img, setImage] = useState("");
  const [itemsToBuy, setItemsToBuy]= useState(0);
  //User input for quantity
  const [quantity, setQuantity] = useState(0);
  //User display available items (stocks)
  // const [cartItem, setCartItem] = useState(0);

  const [ratings, setRatings] = useState([]);

  const subtotal = formatCurrency(price * itemsToBuy);

  // Pagination
  let active = 1;
  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>,
    );
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
    })
  })
    .then((res) => res.json())
    .then((data) => {

      if (data) {
        Swal.fire({
          title: "Successfully added.",
          icon: 'success',
          text: "You have successfully added the product."
        });
 
      } else {
        Swal.fire({
          title: "Something went wrong",
          icon: 'error',
          text: "Please try again."
        })
      }
      
      console.log(data);

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
        setItemsToBuy(itemsToBuy); // Is this intended? It doesn't seem to be used.
        setQuantity(data.quantity);
        setRatings(data.ratings);
        setProductId(productId);
  })

}, [productId])

function add() {
  if (quantity > 0) {
    setItemsToBuy(prevItems => prevItems + 1);
    setQuantity(prevInventory => prevInventory - 1);
  }
}

  function remove() {
    if (itemsToBuy > 0) {
      setItemsToBuy(prevItems => prevItems - 1);
      setQuantity(prevInventory => prevInventory + 1);
    }
  }

  function reset() {
    fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
      .then(res => res.json())
      .then(data => {
    setItemsToBuy(0);
    setQuantity(data.quantity);})
  }

  return (
    <div className="product-view">
        <Container>
            <Row>
                <Col xs={12} lg={6} className="pt-5">
                   <h1 className="text-white">Item: {name}</h1>
                </Col>
            </Row>
            <Row>
                <Col xs={12} lg={6}>
                    <Card className='bg-dark text-white productHighlight'>
                        <Card.Body className="text-white">
                            {/* <Card.Title><h1 className="text-warning">{name}</h1></Card.Title> */}
                            <Card.Img variant="top" className='my-3 object-fit-cover border rounded' src={img} />
                            <Card.Title><span className="text-warning h3">Available:</span> <span className="text-white h3">{quantity}</span></Card.Title>
                            <Card.Title><span className="text-warning">Description:</span></Card.Title>
                            <Card.Text>{description}</Card.Text>
                            <Row>
                                        <Col className='d-flex align-items-center justify-content-between'>
                                            {user.id !== null ? (
                                                 <>
                                                    <ButtonGroup aria-label="Basic example">
                                                        <Button className='m-1 px-3' variant="danger" onClick={remove}>-</Button>
                                                        <Card.Text className='m-1 px-1 h3'>{itemsToBuy}</Card.Text>
                                                        <Button className='m-1 px-3' variant="warning" onClick={add}>+</Button>
                                                    </ButtonGroup>
                                                    <Card.Text className='h4 text-warning'>Total: {subtotal}</Card.Text>

                                                    <>
                                                      {itemsToBuy > 0 ? (
                                                        <Button variant="success" onClick={() => addToCart(productId)}>
                                                          Add to Cart
                                                        </Button>
                                                      ) : (
                                                        <Button variant="success" disabled onClick={() => addToCart(productId)}>
                                                        Add to Cart
                                                        </Button>
                                                      )}
                                                    </>

                                                    <Link className="btn btn-danger d-block" onClick={() => reset()}>
                                                        Reset
                                                    </Link>
                                                    </>
                                            ) : (
                                                <>
                                                    <Link className="btn btn-danger d-block" to="/users/login">
                                                        Log in to order
                                                    </Link>    
                                                </>
                                            )}

                                        </Col>
                                    </Row>
                        </Card.Body>
                        <Card.Footer className='d-flex align-items-center justify-content-between'>
                            <Card.Text className='h4 text-white'>Price: {formatCurrency(price)}</Card.Text>
                        </Card.Footer>
                    </Card>
                </Col>
                <Col xs={12} lg={6}>
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
                                <Pagination>{items}</Pagination>
                            </Card.Body>
                                <Card.Footer>
                                <Card.Subtitle className="h4 text-warning">Ratings:</Card.Subtitle>
                                <div className='py-2'>
                                    <ul>
                                    {ratings.map((rating, id) => (
                                    <li  key={id + 1} >Rating {id + 1}: {rating}</li>
                                    ))}
                                    </ul>
                                </div>
                                    <ProductRating />
                                </Card.Footer>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    </div>
);
}
  