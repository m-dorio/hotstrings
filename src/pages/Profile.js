import {useState, useEffect } from 'react';
import {Row, Col, Container, Card, Button} from 'react-bootstrap';
import ResetPassword from '../components/user/ResetPassword';
import UpdateProfile from '../components/user/UpdateProfile'

export default function Profile(){

    const [ details, setDetails ] = useState({})

    useEffect(()=>{

        fetch(`${process.env.REACT_APP_API_URL}/users/details`,{
            headers:{
                Authorization: `Bearer ${ localStorage.getItem('token')}`
            }
        })
        .then(res=>res.json())
        .then(data=>{
            // console.log(data)
            if(data.id !== undefined){
                setDetails(data);
            }
        })
    },[details])

    if (details.userImg == "")
    {details.userImg="https://cdn.dribbble.com/users/9685/screenshots/997495/avatarzzz.gif"}

    return (

        (details.id !== null)?
        <div id="profile">
        <Container>
        <Row>

        <Col xs={12} sm={12} md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }} xl={{ span: 6, offset: 3 }} className='my-3' >
        <Card data-bs-theme="dark">
 
        <Card.Img id="profile_img" className='img-fluid' src={details.userImg} />
        <Card.Title><h1 className='text-center'>{details.firstName} {details.lastName}</h1></Card.Title>
            <Card.Body>         
                <Card.Title>Contacts</Card.Title>
                <Card.Text>Mobile Number: {details.mobileNo}</Card.Text>
                <Card.Text>Email: {details.email}</Card.Text>
            </Card.Body>
            <Card.Footer>         
                <div className='d-flex align-items-center justify-content-between'>
                <UpdateProfile/>
                <ResetPassword />
                </div>
            </Card.Footer>         
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