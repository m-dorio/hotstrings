import { useState, useEffect } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import EditProduct from '../product/EditProduct';
import ArchiveProduct from '../product/ArchiveProduct'
import AddProduct from '../product/AddProduct';

export default function AdminView({productsData, fetchData, endpoint }) {

    // b. Add state to store all products 
    const [products, setProducts] = useState([])

    //Getting the productsData from the products page
    useEffect(() => {
      
        const productsArr = productsData.map(product => {

            return (

                <tr key={product._id}>

                    <td>
                        <Table borderless responsive size="sm" variant="dark">
                            <tr>
                            <td>Name: {product.name}</td>
                            </tr>
                            <tr>
                                <td>{product.description}</td>
                            </tr>
                            <tr>
                            <td className='text-warning'>Image Source: {product.productImg}</td>
                            </tr>
                        </Table>
                    </td>

                    <td>
                        <Table striped bordered hover responsive size="sm" variant="dark">
                        <tr>
                            <td>ID: </td>
                            <td>{product._id}</td>
                            </tr>
                            <tr>
                            <td>Price: </td>
                            <td>{product.price}</td>
                            </tr>
                            <tr>
                            <td>Quantity: </td>
                            <td>{product.quantity}</td>
                            </tr>
                            <tr>
                            <td>Ratings: </td>
                            <td>{product.ratings}</td>
                            </tr>
                            <tr>
                            <td>Availability: </td>
                            <td className={product.isActive ? "text-success" : "text-danger"}>
                                {product.isActive ? "Available" : "Unavailable"}
                            </td>
                        </tr>
                        </Table>
                    </td>

                    <td>
                        <Table hover responsive size="sm">
                        <div className="d-grid gap-3">
                            <ArchiveProduct endpoint={endpoint} product={product._id} fetchData={fetchData} isActive={product.isActive}/> 
                            <EditProduct product={product._id} fetchData={fetchData}/>
                        </div>
                        </Table>
                    </td>
                    
                </tr>
              
                )
        })

        setProducts(productsArr)

    }, [productsData])


    return(
        <>
            <Container className='my-5' id="admin-dashboard">
            <Row>
                <Col className='align-items-center'>
                    <h1 className="text-warning text-center"> Admin Dashboard</h1>
                </Col>
         
                <Col className='align-items-center'>
                <Container>
                    <Row>
                        <Col>
                            <AddProduct product={products._id} fetchData={fetchData}/>
                        </Col>
                   
                        <Col>
                            <AddProduct product={products._id} fetchData={fetchData}/>
                        </Col>
                   
                        <Col>
                            <AddProduct product={products._id} fetchData={fetchData}/>
                        </Col>
                    </Row>
                    </Container>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table striped bordered hover responsive size="sm" variant="dark">
                    <thead>
                        <tr className="text-center ">
                            <th>Product:</th>
                            <th>Description</th>
                            <th colSpan="2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products}
                    </tbody>
                    </Table>  
                </Col>
            </Row>
            </Container>              
        </>
        )
}
