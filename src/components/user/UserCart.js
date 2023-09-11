import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Tab, Tabs, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FormatCurrency from '../FormatCurrency';
import EditUserCart from './EditUserCart'
import { Navigate } from 'react-router-dom'
import Banner from '../../components/Banner'
import Swal from 'sweetalert2';

export default function UserCart({ productId, status, fetchData, endpoint }) {

    const [myCart, setCart] = useState([]);
    const [myOrders, setOrders] = useState([]);
    const [cartCount, setCount] = useState(0); // Initialize cartCount with 0

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
                setCount(data.totalProducts.length); 
               
            }
        })
        .catch(error => {
          console.error('Error fetching cart data:', error);
        });
    }, [myCart]); 
    
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
				
                fetchData();
			}else{
				Swal.fire({
					title:'Error!',
					icon:'error',
					text:'Please try again'
				})
                fetchData();
			}

            console.log('data:', data);
		})

	}

    const checkout = (e)=>{

		e.preventDefault();

		fetch(`${process.env.REACT_APP_API_URL}/cart/checkout`,{

			method:'GET',
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
					text:'Thank you! Checkout successfully!',
				})
			
                fetchData();
			}else{
				Swal.fire({
					title:'Error!',
					icon:'error',
					text:'Please try again'
				})
                fetchData();
			}

            console.log('data:', data);
		})

	}

  return (
    // (myCart === !undefined) ? 
    <>
     <Container id="userview" className='fluid mb-5'>
        <Row>
            <Col md={12}>
                <Container className='dflex text-warning'>
                        <Row className=' align-items-center'>   
                            <Col sm={{ span: 10, offset: 1 }} md={{ span: 4}}>
                                <h2 className="text-center text-white my-4">{status} ({cartCount})</h2>
                            </Col>

                            <Col sm={{ span: 10, offset: 1 }} lg={{ span: 4}}>
                                <Row>
                                <Col>
                                <Link className='my-2 btn btn-success d-block' size="sm" onClick={e=>checkout(e,productId)}>Checkout</Link>
                                </Col>
                                <Col>
                                <Link className='my-2 btn btn-danger d-block' size="sm" onClick={e=>clearCart(e,productId)}>Clear Cart</Link>
   
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
              <Tab eventKey="featured" title="In the Cart">
      
                <div className="d-flex flex-wrap justify-content-center">
                 {myCart.reduce((uniqueProducts, product) => {
                     // Check if the product already exists in uniqueProducts array
                     const existingProduct = uniqueProducts.find((p) =>
                      p._id === product._id || product.isActive === false);
 
                     if (existingProduct) {
                     // If the product exists, increment its count
                     existingProduct.count += 1;
                     } else {
                     // If it doesn't exist, add it to the uniqueProducts array
                     uniqueProducts.push({ ...product, count: 1 });
                     }
 
                     // const newProduct = uniqueProducts.find((p) => product.isActive === true)
                     
                     return (uniqueProducts);
 
                    }, [myCart]).filter((product)=> product.count > 0) .map((product) => (
                     
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
                     <Col>

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

              <Tab eventKey="likes" title="My Likes ❤️">
              <div className="d-flex flex-wrap justify-content-center">        
              {myCart
              .reduce((uniqueProducts, product) => {
                    // Check if the product already exists in uniqueProducts array
                    const existingProduct = uniqueProducts.find((p) =>
                     p._id === product._id || product.isActive === true);

                    if (existingProduct) {
                    // If the product exists, increment its count
                    existingProduct.count += 1;
                    } else {
                    // If it doesn't exist, add it to the uniqueProducts array
                    uniqueProducts.push({ ...product, count: 1 });
                    }

                    // const newProduct = uniqueProducts.find((p) => product.isActive === false)
                    
                    return (uniqueProducts);

                    }, [myCart]).filter((product)=> product.count > 0) .map((product) => (
                     
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
                     <Col>
                    
                     {/* {console.log(`endpoint=${endpoint} product=${product._id} isActive=${product.isActive}`)} */}
                     
                     {/* {console.log(`endpoint: ${endpoint}${product._id}`)} */}
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

              <Tab eventKey="Orders" title="Orders">
                <div className="d-flex flex-wrap justify-content-center">
   
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
