// import { Navigate } from "react-router-dom";
import UserContext from '../UserContext';
import {Row, Col, Container, Card} from 'react-bootstrap';

import { useState } from 'react';
import EditProfile from '../components/EditProfile';

export default function Profile({usersData, fetchData }){


    const [user, setUsers] = useState([])
	const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
	const [mobileNo, setMobileNo] = useState('');
	const [email, setEmail] = useState(0);
	const [userImg, setUserImg] = useState('');
	const [showEdit, setShowEdit] = useState(false);


    fetch(`${process.env.REACT_APP_API_URL}/users/details`,{
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${localStorage.getItem('token')}`
        },
    })
    .then(res=>res.json())
    .then(data=>{

        setUsers(data._id);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setMobileNo(data.mobileNo);
        setEmail(data.email);
        setUserImg(data.userImg);

    },[usersData])



    return(
        (user.id !== null)?
        <div  id="profile">
        <Container>
        <Row>
        <Col xs={12} md={{ span: 8, offset: 2 }} xl={{ span: 8, offset: 2 }} className='my-3' lg={{ span: 8, offset: 2 }}>
      
        <Card data-bs-theme="dark">
        <EditProfile user={user} fetchData={fetchData} />
        {/* <Card.Title><h6 className='p-2 text-center'>User: {userId}</h6></Card.Title> */}
        <Card.Img id="profile_img" className='object-fit-cover' src={userImg} />
        <Card.Title><h1 className='p-2 text-center'>{firstName} {lastName}</h1></Card.Title>
            <Card.Body>         
                <Card.Title>Contacts</Card.Title>
                <Card.Text>Mobile Number: {mobileNo}</Card.Text>
                <Card.Text>Email: {email}</Card.Text>
            </Card.Body>
        </Card>
        </Col> 
        </Row>

        </Container>
       </div>
		:
		<>
            <div className="text-center">
                <h1>Page is not accessible.</h1>
            </div>

        </>
        
    )
}