import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';


export default function EditProduct({product,fetchData}){

	const [productId, setProductId] = useState('');
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0);
	const [productImg, setProductImg] = useState('');
	const [quantity, setQuantity] = useState(0);
	const [showEdit, setShowEdit] = useState(false);
	const [ratings, setRating] = useState([]);

	const openEdit = (productId) =>{

		fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
		.then(res=>res.json())
		.then(data=>{

			setProductId(data._id);
			setName(data.name);
			setDescription(data.description);
			setPrice(data.price);
			setProductImg(data.productImg);
			setQuantity(data.quantity);
			setRating(data.ratings);
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
		setRating([]);
	}

	const editProduct = (e, productId)=>{

		e.preventDefault();

		fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`,{

			method:'PUT',
			headers:{
				'Content-Type':'application/json',
				'Authorization':`Bearer ${localStorage.getItem('token')}`
			},
			body:JSON.stringify({
				name: name,
                description: description,
                price: price,
                productImg : productImg,
                quantity : quantity,
				ratings : ratings
			})
		})
		.then(res=>res.json())
		.then(data=>{
			console.log(data)

			if(data === true){
				Swal.fire({
					title:'Success!',
					icon:'success',
					text:'Product Successfully Updated'
				})
				closeEdit();
                fetchData();
			}else{
				Swal.fire({
					title:'Error!',
					icon:'error',
					text:'Please try again'
				})
				closeEdit();
                fetchData();
			}
		})

	}

	return(

		<>

			<Button variant="primary" block size="sm" onClick={()=>openEdit(product)}>Edit</Button>

			<Modal show={showEdit} onHide={closeEdit}>
				<Form onSubmit={e=>editProduct(e,productId)}>

					<Modal.Header closeButton>
						<Modal.Title>Edit Product</Modal.Title>
					</Modal.Header>

					<Modal.Body>

						<Form.Group controlId="productName">
							<Form.Label>Name</Form.Label>
							<Form.Control
								type="text"
								value={name}
								onChange={e=>setName(e.target.value)}
								required/>
						</Form.Group>

						<Form.Group controlId="productDescription">
							<Form.Label>Description</Form.Label>
							<Form.Control
								type="text"
								value={description}
								onChange={e=>setDescription(e.target.value)}
								required/>
						</Form.Group>

						<Form.Group controlId="productPrice">
							<Form.Label>Price</Form.Label>
							<Form.Control
								type="number"
								value={price}
								onChange={e=>setPrice(e.target.value)}
								required/>
						</Form.Group>

						<Form.Group controlId="setProductImg">
							<Form.Label>Img Url</Form.Label>
							<Form.Control
								type="text"
								value={productImg}
								onChange={e=>setProductImg(e.target.value)}
								required/>
						</Form.Group>

						<Form.Group controlId="productRating">
							<Form.Label>Ratings:</Form.Label>
							<Form.Control
								type="text"
								value={ratings}
								onChange={e=>setRating(e.target.value)}
								disabled/>
						</Form.Group>

						<Form.Group controlId="productQuantity">
							<Form.Label>Quantity</Form.Label>
							<Form.Control
								type="number"
								value={quantity}
								onChange={e=>setQuantity(e.target.value)}
								required/>
						</Form.Group>

					</Modal.Body>

					<Modal.Footer>
						<Button variant="secondary" onClick={closeEdit}>Close</Button>
						<Button variant="success" type="submit">Submit</Button>
					</Modal.Footer>

				</Form>
			</Modal>

		</>

	)


}
