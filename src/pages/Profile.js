// import { Navigate } from "react-router-dom";
import UserContext from '../UserContext';
import {Row, Col, Container, Card} from 'react-bootstrap';
import {useEffect, useContext } from 'react';


export default function Profile(){

    const { user, setUser} = useContext(UserContext);
	//State hooks to store the values of the input fields

	useEffect(() => {
        setUser({
            access: localStorage.getItem('token'),
        })},[])

    return(
        (user.id !== null)?
        <>
        <Container>
        <Row>
        <Col  id="profile" xs={12} md={{ span: 8, offset: 2 }} xl={{ span: 8, offset: 2 }} className='my-3' lg={{ span: 8, offset: 2 }}>
        <Container>
            <Row>
                <Col>
                <Card data-bs-theme="dark">
                <Card.Img id="profile_id" variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkcGuCqZ2u6Titq_adqM1ceg5r7JoOc-_tjhCYvmg&s" />
                    <Card.Title><h4 className='p-2'>Juan Delacruz</h4></Card.Title>
                    <Card.Body>         
                        <Card.Title>Contacts</Card.Title>
                        <Card.Text>Mobile No: +631234567890</Card.Text>
                    </Card.Body>
                </Card>
                </Col> 
            </Row>
            <Row>
                <Col>
                <Card data-bs-theme="dark">
                <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkcGuCqZ2u6Titq_adqM1ceg5r7JoOc-_tjhCYvmg&s" />
                    <Card.Body> 
                    <Card.Title><h4 className='p-2'>Orders Detail</h4></Card.Title>        
                        <Card.Title>Product</Card.Title>
                        <Card.Text>Product List . . .</Card.Text>
                    </Card.Body>
                </Card>               
                </Col>

                <Col>
                <Card data-bs-theme="dark">
                <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkcGuCqZ2u6Titq_adqM1ceg5r7JoOc-_tjhCYvmg&s" />
                    <Card.Body> 
                    <Card.Title><h4 className='p-2'>Orders Detail</h4></Card.Title>        
                        <Card.Title>Product</Card.Title>
                        <Card.Text>Product List . . .</Card.Text>
                    </Card.Body>
                </Card>               
                </Col>  
    
                   
            </Row>
            </Container>   
        </Col>
        </Row>
        </Container>
       </>
		:
		<>
            <div className="text-center">
                <h1>Page is not accessible.</h1>
            </div>

        </>
        
    )
}