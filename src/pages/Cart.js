import React, { useContext } from 'react';
import { Row, Container } from 'react-bootstrap';
import Footer from '../components/Footer'
import UserContext from '../UserContext';

export default function Profile(){

    const {user, setUser} = useContext(UserContext);


    return (
        <>
        <Container id="cart">
        <Row>
            <h1 className='mt-5 text-center text-warning'>Cart</h1>
        
        </Row>
        </Container>
        <Footer />
        </>
      );
}