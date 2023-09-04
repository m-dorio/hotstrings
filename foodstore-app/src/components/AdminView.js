import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

export default function AdminView({ productsData }) {

    // b. Add state to store all products 
    const [products, setProducts] = useState([])


    //Getting the productsData from the products page
    useEffect(() => {
        const productsArr = productsData.map(product => {
            return (
                <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.productImg}</td>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    <td className={product.isActive ? "text-success" : "text-danger"}>
                        {product.isActive ? "Available" : "Unavailable"}
                    </td>
                    <td><button className="btn btn-primary ">Edit</button></td> 
                    <td><button className="btn btn-danger">Archive</button></td>    
                </tr>
                )
        })

        setProducts(productsArr)

    }, [productsData])


    return(
        <>
        <div id="admin-dashboard">
        <h1 className="text-center text-white my-4"> Admin Dashboard</h1>
            <div>
            <Table striped bordered hover responsive>
                <thead>
                    <tr className="text-center">
                        <th>ID</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Availability</th>
                        <th colSpan="2">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {products}
                </tbody>
            </Table>   
            </div> 
        </div>
        </>
        )
}
