
import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

export default function EditUserCart({ productId, fetchData, isActive}){

	const moveToLikes = (e, productId)=>{

		e.preventDefault();

		fetch(`${process.env.REACT_APP_API_URL}/cart/${productId}/archive`,{

			method:'PUT',
			headers:{
				'Content-Type':'application/json',
				'Authorization':`Bearer ${localStorage.getItem('token')}`
			}
			
		})
		.then(res=>res.json())
		.then(data=>{

			{console.log(`Product ID: ${productId}`)}

			if(data === true){
				Swal.fire({
					title:'Success!',
					icon:'success',
					text:'Product Moved to Likes ❤️ Successfully!'
				})
				
                fetchData();
			}else{
				Swal.fire({
					title:'Error!',
					icon:'error',
					text:'Please try again'
				})
				
                fetchData();
			}
		})

		{console.log(`${productId} ${isActive}`)}

	}

	// {console.log(`${product}`)}
	// {console.log(`${process.env.REACT_APP_API_URL}/cart/${productId}/archive`)}

	const moveToOrder = (e, productId)=>{

		e.preventDefault();

		fetch(`${process.env.REACT_APP_API_URL}/cart/${productId}/activate`,{

			method:'PUT',
			headers:{
				'Content-Type':'application/json',
				'Authorization':`Bearer ${localStorage.getItem('token')}`
			}
			
		})
		.then(res=>res.json())
		.then(data=>{

			{console.log(`Product ID: ${productId}`)}

			if(data === true){
				Swal.fire({
					title:'Success!',
					icon:'success',
					text:'Product Moved to Cart Successfully'
				})
				
                fetchData();
			}else{
				Swal.fire({
					title:'Error!',
					icon:'error',
					text:'Please try again'
				})
				
                fetchData();
			}
		})

		{console.log(`${productId} ${isActive}`)}

	}

	
	return (
		<>

		{isActive ? 
			<Link className='btn btn-warning d-block' size="sm" onClick={e=>moveToLikes(e,productId)}>Move to Likes ❤️</Link>
			:
			<Link className='btn btn-info d-block' size="sm" onClick={e=>moveToOrder(e,productId)}>Move to Cart</Link>	            
		}
		</>

	)
}