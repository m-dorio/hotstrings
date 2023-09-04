import {useState,useEffect, useContext} from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';
import Footer from '../components/Footer'

export default function AddProduct(){

    const navigate = useNavigate();

    const {user} = useContext(UserContext);

    //input states
    const [name,setName] = useState("");
    const [description,setDescription] = useState("");
    const [price,setPrice] = useState("");

    function createProduct(e){

        //prevent submit event's default behavior
        e.preventDefault();

        let token = localStorage.getItem('token');
        console.log(token);

        fetch(`${process.env.REACT_APP_API_URL}/products/`,{

            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({

                name: name,
                description: description,
                price: price

            })
        })
        .then(res => res.json())
        .then(data => {

            //data is the response of the api/server after it's been process as JS object through our res.json() method.
            console.log(data);

            if(data){
                Swal.fire({

                    icon:"success",
                    title: "Product Added"

                })

                navigate("/products");
            } else {
                Swal.fire({

                    icon: "error",
                    title: "Unsuccessful Product Creation",
                    text: data.message

                })
            }

        })

        setName("")
        setDescription("")
        setPrice(0);
    }

    return (

            (user.isAdmin === true)
            ?
            <>
              <div id="add-product" className='text-white'>
            <Row className="mt-3 mb-3 d-flex justify-content-center">
                <Col xs={12} md={6} lg={4} xl={3}>
              
                    <h1 className="my-5 text-white text-center">Add Product</h1>
                    <Form onSubmit={e => createProduct(e)}>
                        <Form.Group>
                            <Form.Label>Name:</Form.Label>
                            <Form.Control type="text" placeholder="Enter Name" required value={name} onChange={e => {setName(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description:</Form.Label>
                            <Form.Control type="text" placeholder="Enter Description" required value={description} onChange={e => {setDescription(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Price:</Form.Label>
                            <Form.Control type="number" placeholder="Enter Price" required value={price} onChange={e => {setPrice(e.target.value)}}/>
                        </Form.Group>
                        <Button variant="warning" type="submit" className="my-5">Submit</Button>
                    </Form>     
                 
                </Col>
            </Row>
            </div>  
            <Footer />
           </>
            :
            <Navigate to="/products" />

    )


}