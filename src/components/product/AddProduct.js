import {useState, useContext} from 'react';
import { Row, Col, Form, Button, Modal } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../../UserContext';


export default function AddProduct({product,fetchData}){

    const navigate = useNavigate();
    const {user} = useContext(UserContext);
    //input states
    const [name,setName] = useState("");
    const [description,setDescription] = useState("");
    const [price,setPrice] = useState("");
    const [productImg,setProductImg] = useState("");
    const [quantity,setQuantity] = useState("");
	const [showEdit, setShowEdit] = useState(false);

    const openEdit = (productId) =>{

		fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
		.then(res=>res.json())
		.then(data=>{


			setName(data.name);
			setDescription(data.description);
			setPrice(data.price);
			setProductImg(data.productImg);
			setQuantity(data.quantity);

		})

			setShowEdit(true);

	}


    
	const closeEdit = () =>{

		setShowEdit(false);
		setName('');
		setDescription('');
		setProductImg('');
		setPrice(0);
		setQuantity(0);

	}

    function createProduct(e){

        //prevent submit event's default behavior
        e.preventDefault();

        let token = localStorage.getItem('token');
        console.log(token);

        fetch(`${process.env.REACT_APP_API_URL}/products/add`,{

            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({

                name: name,
                description: description,
                price: price,
                productImg : productImg,
                quantity : quantity
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
        setProductImg("")
        setQuantity(0);
        setPrice(0);
    }

    return (

        (user.isAdmin === true)
        ?
        <>
        <div>
            <Button variant="warning" block size="md" onClick={()=>openEdit(product)}>Add New Product</Button>
        </div>
        <Modal show={showEdit} onHide={closeEdit}>
            <Modal.Header closeButton>
                <Modal.Title>Product Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={e => createProduct(e)}>
                    <div id="add-product" className='text-white'>
                    <Row className="mt-3 mb-3 d-flex justify-content-center">
                        <Col xs={12} md={6} lg={4} xl={3}>
                            <h1 className="my-5 text-white text-center">Add Product</h1>
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
                            <Form.Group>
                                <Form.Label>Image:</Form.Label>
                                <Form.Control type="text" placeholder="Enter image URL" required value={productImg} onChange={e => {setProductImg(e.target.value)}}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Quantity:</Form.Label>
                                <Form.Control type="number" placeholder="Enter quantity" required value={quantity} onChange={e => {setQuantity(e.target.value)}}/>
                            </Form.Group>
                            <Button variant="warning" type="submit" className="my-5">Submit</Button>
                        </Col>
                    </Row>
                    </div>  
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeEdit}>Close</Button>
                <Button variant="success" type="submit">Submit</Button>
            </Modal.Footer>
        </Modal>
        </>
        :
        <Navigate to="/products/all" />
    )
}