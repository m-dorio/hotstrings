import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Tab, Tabs, Button, Table} from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import { Link } from 'react-router-dom';
import FormatCurrency from '../FormatCurrency';
import EditUserCart from './EditUserCart'
import { Navigate } from 'react-router-dom'
import Banner from '../Banner';
import Swal from 'sweetalert2';

export default function UserCart({ productId, status, fetchData, endpoint }) {

    const [myCart, setCart] = useState([]);
    const [myOrders, setOrders] = useState([]);
    const [ordersCount, setOrdersCount] = useState([]);
    const [cartCount, setCartCount] = useState(0); // Initialize cartCount with 0
    const [likesCount, setLikesCount] = useState(0); // Initialize likesCount with 0

    useEffect(() => {
      fetch(`${process.env.REACT_APP_API_URL}/cart`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(res => res.json())
      .then(data => {
        if (data !== undefined) {
          setCart(data);
          const activeItems = data.filter(item => item.isActive);
          const inactiveItems = data.filter(item => !item.isActive);
          setCartCount(activeItems.length);
          setLikesCount(inactiveItems.length);
        } else { 
          setCart([]);
          setCartCount(0);
          setLikesCount(0);
        }
      })
      .catch(error => {
        console.error('Error fetching cart data:', error);
      });
    }, [myCart]);
  

    useEffect(() => {
      fetch(`${process.env.REACT_APP_API_URL}/cart/orders`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(data => {
          if (data !== undefined) {
             setOrders(data);
             setOrdersCount(myOrders.map((product)=> product.isOrdered).length);
          }
          else{           
            setCart([]);
            setCartCount(0);
            setLikesCount(0);
          }
      })
      .catch(error => {
        console.error('Error fetching cart data:', error);
      });
  }, [myOrders]); 


    const clearCart = (e)=>{

		e.preventDefault();

		fetch(`${process.env.REACT_APP_API_URL}/cart/clear`,{

			method:'PUT',
			headers:{
				'Content-Type':'application/json',
				'Authorization':`Bearer ${localStorage.getItem('token')}`
			}
		})
		.then(res=>res.json())
		.then(data=>{

			if(data){
				Swal.fire({
					title:'Success!',
					icon:'success',
					text:'Cart is Empty.'
				})
				
        setCart([]);
        setCartCount(0);
        setLikesCount(0);
			}else{
				Swal.fire({
					title:'Error!',
					icon:'error',
					text:'Please try again'
				})

			}

            console.log('data:', data);
		})

	}

  const checkout = (e) => {
    e.preventDefault();
  
    fetch(`${process.env.REACT_APP_API_URL}/cart/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          Swal.fire({
            title: 'Success!',
            icon: 'success',
            text: 'Thank you! Checkout successfully!',
          });

          setCart([]);
          setCartCount(0);
          setLikesCount(0);

        } else {
          Swal.fire({
            title: 'Error!',
            icon: 'error',
            text: 'Please try again',
          });

        }
      })
      .catch((error) => {
        console.error('Error during checkout:', error);
        Swal.fire({
          title: 'Error!',
          icon: 'error',
          text: 'An error occurred during checkout. Please try again later.',
        });

      },[]);
  };
  

  return (

    <>
     <Container id="userview" className='fluid mb-5'>
     <Row>
        <Col md={12}>
            <Container className='dflex text-warning'>
                <Row className='align-items-center'>
                    <Col sm={{ span: 10, offset: 1 }} md={{ span: 4 }}>
                        <h2 className="text-center text-white my-4">{status}</h2>
                    </Col>
                    <Col sm={{ span: 10, offset: 1 }} lg={{ span: 4 }}>
                        <Row>
                            <Col>
                                <Link className='my-2 btn btn-success d-block' size="sm" onClick={e => checkout(e, productId)}>Checkout</Link>
                            </Col>
                            <Col>
                                <Link className='my-2 btn btn-danger d-block' size="sm" onClick={e => clearCart(e, productId)}>Clear Cart</Link>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </Col>
    </Row>


        <Row>
          <Col id="tabs">
            <Tabs defaultActiveKey="featured" id="fill-tab-example" className="mb-3" fill>
              <Tab eventKey="featured" title={`In the Cart (${cartCount})`}>

              <div className="d-flex flex-wrap justify-content-center">
                  {myCart.reduce((uniqueProducts, product) => {
                    // Check if the product already exists in uniqueProducts array
                    const existingProduct = uniqueProducts.find((p) => p._id === product._id);

                    if (existingProduct) {
                      // If the product exists, increment its count
                      existingProduct.count += 1;
                    } else {
                      // If it doesn't exist, add it to the uniqueProducts array
                      uniqueProducts.push({ ...product, count: 1 });
                    }

                    // const newProduct = uniqueProducts.find((p) => product.isActive === true)

                    return uniqueProducts; // Return the updated uniqueProducts array

                  }, [myCart]).filter((product) => product.count > 0 && product.isActive === true && product.isOrdered === false).map((product) => (
                    <Col key={product._id} xs={12} sm={6} md={4} lg={3} className="my-1 text-white">
                      <Card className='bg-dark text-white productHighlight mx-1'>
                        <Card.Header>
                          <Card.Text> <li>Item: {product._id}</li></Card.Text>
                        </Card.Header>
                        <Card.Body>
                          <Container>
                            <Row>
                              <Col>
                                <img className="img-fluid border rounded mb-3" src={product.productImg} alt={`Product ${product._id}`} />
                                <Card.Text>
                                  <li>User: {product.userId}</li>
                                  <li>Added On: {product.addedOn}</li>
                                  <li>Cart: {product._id}</li>
                                </Card.Text>
                              </Col>
                              <Col>
                                <Card.Text>
                                  <li>Subtotal: {FormatCurrency(product.subtotal)}</li>
                                  <li>On Cart: {`${product.isActive}`}</li>
                                </Card.Text>
                              </Col>
                              <Col>
                                <Card.Text>
                                  <li>Price: {FormatCurrency(product.price)}</li>
                                  <li>Quantity: {product.quantity}</li>
                                </Card.Text>
                              </Col>
                              <Col></Col>
                            </Row>
                          </Container>
                        </Card.Body>
                        <Card.Footer>
                          <EditUserCart endpoint={endpoint} productId={product._id} fetchData={fetchData} isActive={product.isActive} />
                        </Card.Footer>
                      </Card>
                    </Col>
                  ))}
                </div>


              </Tab>

              <Tab eventKey="likes" title={`My Likes ❤️ (${likesCount})`}>
              <div className="d-flex flex-wrap justify-content-center">        
              {myCart
              .reduce((uniqueProducts, product) => {
                    // Check if the product already exists in uniqueProducts array
                    const existingProduct = uniqueProducts.find((p) =>
                     p._id === product._id);

                    if (existingProduct) {
                    // If the product exists, increment its count
                    existingProduct.count += 1;
                    } else {
                    // If it doesn't exist, add it to the uniqueProducts array
                    uniqueProducts.push({ ...product, count: 1 });
                    }

                    // const newProduct = uniqueProducts.find((p) => product.isActive === false)
                    
                    return (uniqueProducts);

                    }, [myCart]).filter((product)=> product.count > 0 && product.isActive === false && product.isOrdered === false).map((product) => (
                     
                     <Col key={product._id + 1} xs={12} sm={6} md={4} lg={3} className="my-1 text-white">
                     <Card className='bg-dark text-white productHighlight mx-1'>
                     <Card.Header>
                     <Card.Text> <li>Item: {product._id}</li></Card.Text>
                     </Card.Header>
                     <Card.Body>
                     <Container>
                     <Row>
                     <Col>
                     <img className="img-fluid border rounded mb-3" src={product.productImg} alt={`Product ${product._id}`} />
                     
                     <Card.Text>
                     <li>User: {product.userId}</li>
                     <li>Added On: {product.addedOn}</li>
                     <li>Cart: {product._id}</li>
                     </Card.Text>
                     </Col>
                     <Col>
                         <Card.Text>
                         <li>Subtotal:{FormatCurrency(product.subtotal)}</li>
                         <li>On Cart: {`${product.isActive}`}</li>
                         </Card.Text>
                     </Col>
                     <Col>
                         <Card.Text>
                         <li>Price: {FormatCurrency(product.price)}</li>
                         <li>Quantity: {product.quantity}</li>
                         </Card.Text>
                     </Col>

                     </Row>
                     </Container>
                     
             
                     </Card.Body>
                     <Card.Footer>
                     <EditUserCart endpoint={endpoint} productId={product._id} fetchData={fetchData} isActive={product.isActive}/>
                     </Card.Footer>
                     </Card>
                     </Col>
                 ))}       
                </div>
              </Tab>

              <Tab eventKey="Orders" title={`Orders (${ordersCount})`}>
           
              <div className="d-flex flex-wrap justify-content-center">        
                  {myOrders
                  .reduce((uniqueOrders, orders) => {
                        // Check if the order already exists in uniqueOrders array
                        const existingOrder = uniqueOrders.find((p) =>
                        p._id === orders._id);

                        if (existingOrder) {
                        // If the order exists, increment its count
                        existingOrder.count += 1;
                        } else {
                        // If it doesn't exist, add it to the uniqueOrders array
                        uniqueOrders.push({ ...orders, count: 1 });
                        }

                        // const newOrders = uniqueOrders.find((p) => order.isActive === false)
                        
                        return (uniqueOrders);

                        }, [myOrders]).filter((order)=> order.count > 0 && order.isActive === true ).map((order) => (
                        
                        <Col key={order._id + 1} xs={12} sm={6} md={4} lg={3} className="my-2 py-2 text-white">
                        <Card className='d-flex bg-dark productHighlight align-self-start text-white mx-1'>
                        <Card.Header>
                        <Container>
                          <Row>
                            <Col>
                              <h3>Order Info:</h3>
                              <h6>Ref: {order.referenceId}</h6>
                            </Col>
                          </Row>
                          <Row>
                            <Col>Order Date: {order.orderDate}</Col>
                          
                          </Row>
                          </Container>
                    
                        </Card.Header>

                        <Card.Body>
                          <Container>
                            <Row>
                                <Col>Name: {order.fullName}</Col>
                              </Row>
                              <Row>
                                <Col>Mobile: {order.mobileNo}</Col>
                              </Row>
                              <Row>
                                <Col>Address: {order.address}</Col>
                              </Row>
                            </Container>

                            <Container>
                              <Col>Total Amount: {FormatCurrency(order.totalAmount)}</Col>
                            </Container>

                          <Container className='py-3'>
                          {order.products.map((product, index) => (
                           <Accordion>
                           <Accordion.Item key={index} eventKey={index}>
                            <Accordion.Header>
                              {product.name}
                            </Accordion.Header>
                            <Accordion.Body>
                            <Row><Col><img className='img-fluid' src={product.productImg} alt={product.name} /></Col></Row>
                                <Row><Col>Product ID: {product.productId}</Col> </Row>
                                <Row><Col>Price: ${product.price}</Col> </Row>
                                <Row><Col>Quantity: {product.quantity}</Col> </Row>
                                <Row><Col>Subtotal: ${product.subtotal}</Col> </Row>
                                <Row><Col>Is Ordered: {product.isOrdered ? 'Yes' : 'No'}</Col> </Row>
                              </Accordion.Body>
                            </Accordion.Item>
                          </Accordion>
                          ))}
                        </Container>
                        </Card.Body>
                      
                          <Card.Footer>
                          <Col>Total Items: {order.totalItems}</Col>
                        </Card.Footer>
                        </Card>
                        </Col>
                    ))}       
              </div>
            
                  
              </Tab>

            </Tabs>
          </Col>
        </Row>
      </Container>
    </>
    // :
    // (myCart === [{}])
  );
}
