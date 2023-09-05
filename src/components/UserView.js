import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { Container, Row, Col} from "react-bootstrap";


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
        <div id="userview">
        <Container>
            <h2 className="text-center text-white mt-5">Available Products</h2>
            <Row className='pb-5'>
                { products }
            </Row>
        </Container>

        </div>
        )
}