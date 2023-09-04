import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import Footer from './Footer';

export default function UserView({productsData}) {

    const [products, setProducts] = useState([])

    useEffect(() => {
        const productsArr = productsData.map(product => {

            //only render the active products since the route used is /all from Course.js page
            if(product.isActive === true) {
                return (
          <>
            <ProductCard productProp={product} key={product._id}/>
          </>
        )
            } else {
                return null;
            }
        })

        //set the products state to the result of our map function, to bring our returned product component outside of the scope of our useEffect where our return statement below can see.
        setProducts(productsArr)

    }, [productsData])

    return(
        <>
        <Container fluid>
            <Row className='pb-5'>
            <h2 className="text-center text-white mt-5">Available Products</h2>
                { products }
            </Row>
        </Container>
        <Footer />
        </>
        )
}