import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';


export default function EditProfile({user,fetchData}){

    // const { userId, setUser} = useContext(UserContext);
	const [userId, setUserId] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [mobileNo, setMobileNo] = useState(0);
	const [userImg, setUserImg] = useState('');

	const [showEdit, setShowEdit] = useState(false);


	const openEdit = () =>{

		fetch(`${process.env.REACT_APP_API_URL}/users/details`,{
			method: 'GET',
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${ localStorage.getItem('token')}`
			},

		})
		.then(res=>res.json())
		.then(data=>{

			setUserId(data.userId); 
			setFirstName(data.firstName);
			setLastName(data.lastName);
			setEmail(data.email);
			setMobileNo(data.mobileNo);
			setUserImg(data.userImg);
		})

			setShowEdit(true);

	}

	
	const closeEdit = () =>{

		setShowEdit(false);
		setFirstName("");
		setLastName("");
		setEmail("");
		setMobileNo("");
		setUserImg("");
	}

	const editUser = (e)=>{

		e.preventDefault();

		if (typeof fetchData === 'function') {
			fetch(`${process.env.REACT_APP_API_URL}/users/profile`, {
			  method: 'PUT',
			  headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem('token')}`
			  },
			body:JSON.stringify({
				userId: userId,
				firstName: firstName,
				lastName:lastName,
                mobileNo: mobileNo,
                email: email,
                userImg : userImg,
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
		});
	} else {
		console.error('fetchData is not a function');
	  }
	}


	return(

		<>
		<Button variant="primary" size="sm" onClick={()=>openEdit(user)}>Edit</Button>
		<>
		<Modal show={showEdit} onHide={closeEdit}>
				<Form onSubmit={e=>editUser(e,userId)}>

					<Modal.Header closeButton>
						<Modal.Title>Edit User</Modal.Title>
					</Modal.Header>

					<Modal.Body>

						<Form.Group controlId="lastName">
							<Form.Label>Last Name</Form.Label>
							<Form.Control
								type="text"
								value={lastName}
								onChange={e=>setLastName(e.target.value)}
								required/>
						</Form.Group>

						<Form.Group controlId="firstName">
							<Form.Label>First Name</Form.Label>
							<Form.Control
								type="text"
								value={firstName}
								onChange={e=>setFirstName(e.target.value)}
								required/>
						</Form.Group>

						<Form.Group controlId="mobileNo">
							<Form.Label>Mobile No</Form.Label>
							<Form.Control
								type="text"
								value={mobileNo}
								onChange={e=>setMobileNo(e.target.value)}
								required/>
						</Form.Group>

						<Form.Group controlId="email">
							<Form.Label>Email</Form.Label>
							<Form.Control
								type="text"
								value={email}
								onChange={e=>setEmail(e.target.value)}
								required/>
						</Form.Group>

						<Form.Group controlId="userImg">
							<Form.Label>User Image</Form.Label>
							<Form.Control
								type="text"
								value={userImg}
								onChange={e=>setUserImg(e.target.value)}
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
			
			
		</>

	)


}
