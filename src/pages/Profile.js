import {useState, useEffect } from 'react';
import {Row, Col, Container, Card, Button} from 'react-bootstrap';
import ResetPassword from '../components/ResetPassword';
import UpdateProfile from '../components/UpdateProfile'

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
            if(typeof data.id !== undefined){
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

        {/* <Button variant="primary" size="sm" onClick={openEdit}>Edit</Button> */}
        <Col xs={12} md={{ span: 8, offset: 2 }} xl={{ span: 8, offset: 2 }} className='my-3' lg={{ span: 8, offset: 2 }}>
        <Card data-bs-theme="dark">
        {/* <EditProfile user={user} fetchData={fetchData} /> */}
     
        <Card.Img id="profile_img" className='object-fit-cover' src={details.userImg} />
        <Card.Title><h1 className='p-2 text-center'>{details.firstName} {details.lastName}</h1></Card.Title>
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