import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import EditProduct from './EditProduct';
import ArchiveProduct from './ArchiveProduct'

export default function AdminView({productsData, fetchData }) {

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
                    <td>{product.quantity}</td>
                    <td>{product.ratings}</td>
                    <td>
                    <EditProduct product={product._id} fetchData={fetchData}/>
                    </td> 
                    
                    <td>
                    <ArchiveProduct product={product._id} fetchData={fetchData} isActive={product.isActive}/>
                    </td>     
                </tr>
                )
        })

        setProducts(productsArr)

    }, [productsData])


    return(
        <>
        <div id="admin-dashboard">
      
            <Table striped bordered hover responsive>
                <thead>
                    <tr className="text-center">
                        <th>ID</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Availability</th>
                        <th>Quantity</th>
                        <th>Ratings</th>
                        <th colSpan="2">Actions</th>
                    </tr>
                </thead>

                <tbody>
                     {/* from the products page */}
                    {products}
                </tbody>
            </Table>   
        </div>
        
        </>
        )
}
