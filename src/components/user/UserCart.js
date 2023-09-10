import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Tab, Tabs, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FormatCurrency from '../FormatCurrency';
import EditUserCart from './EditUserCart'

export default function UserCart({product, status, isActive, fetchData, endpoint }) {
    
  const [myCart, setCart] = useState([]);
  const [setItems, setCartItems] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data !== undefined) {
            setCart(data.totalProducts);
        }
      })
      .catch(error => {
        console.error('Error fetching cart data:', error);
      });
  }, []); // Added endpoint as a dependency to re-fetch when it changes


  
  return (
    <>
     <Container id="userview" className='fluid mb-5'>
        
        <Row>
          <Col>
            <h2 className="text-center text-white my-4">{status} ({myCart.length})</h2>
          </Col>
        </Row>

        <Row>
          <Col id="tabs">
            <Tabs defaultActiveKey="featured" id="fill-tab-example" className="mb-3" fill>
              <Tab eventKey="featured" title="In the Cart">
                <Container className='dflex text-warning'>
                    <Row>
                        <Col sm={6}>
                        <ul>
                            <li>Items in the Cart: ({myCart.length})</li>
                            <li>Total Items in the Record: ({myCart.reduce((total, item) => total + item.quantity, 0)})</li>
                        </ul> 
                        </Col>   
                 
                        <Col md={3}>
                        <Link className='my-2 btn d-block btn btn-success'>Check Out</Link>
        
                        </Col>
                        <Col md={3}>

                        <Link className='my-2 btn d-block btn btn-danger'>Clear All</Link>     
                        </Col>
                    </Row>
                    
                </Container>

                <div className="d-flex flex-wrap justify-content-between">
                 
                {myCart.reduce((uniqueProducts, product) => {
                    // Check if the product already exists in uniqueProducts array
                    const existingProduct = uniqueProducts.find((p) => p.productId === product.productId);

                    if (existingProduct) {
                    // If the product exists, increment its count
                    existingProduct.count += 1;
                    } else {
                    // If it doesn't exist, add it to the uniqueProducts array
                    uniqueProducts.push({ ...product, count: 1 });
                    }
                    return (uniqueProducts);

                }, []).map((product) => (
                    
                    <Col key={product._id} xs={12} sm={6} md={4} lg={3} className="my-1 text-white">
                    <Card className='bg-dark text-white productHighlight mx-1'>
                    <Card.Header>
                    <Card.Text> <li>Item: {product._id}</li></Card.Text>
                    </Card.Header>
                    <Card.Body>
                  
                    <img className="img-fluid border rounded mb-3" src={product.productImg} alt={`Product ${product._id}`} />
                    
                    <Card.Text>
                    <li>User: {product.userId}</li>
                    <li>Added On: {product.addedOn}</li>
                    <li>Cart: {product.productId}</li>
                    </Card.Text>
            
                    </Card.Body>
                    <Card.Footer>
                    <Container>
                    <Row>
                    <Col>
                        <Card.Text>Subtotal:{FormatCurrency(product.subtotal)}</Card.Text>
                    </Col>
                    <Col>
                        <Card.Text>
                        <li>Price: {FormatCurrency(product.price)}</li>
                        <li>Quantity: {product.quantity}</li>
                        </Card.Text>
                    </Col>
                    <Col>
                    <EditUserCart endpoint={endpoint} product={product._id} fetchData={fetchData} isActive={product.isActive}/>
                    {/* {console.log(endpoint)} */}
                    </Col>
                    </Row>
                    </Container>
                    
                    </Card.Footer>
                    </Card>
                    </Col>
                ))}
                </div>
              </Tab>

              <Tab eventKey="unavailable" title="Out Of Order">
    
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    </>
  );
}
