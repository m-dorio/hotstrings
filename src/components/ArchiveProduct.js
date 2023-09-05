
import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';



export default function ArchiveProduct({product, fetchData, isActive}){

	const archiveToggle = (e, product)=>{

		e.preventDefault();

		fetch(`${process.env.REACT_APP_API_URL}/products/${product}/archive`,{

			method:'PUT',
			headers:{
				'Content-Type':'application/json',
				'Authorization':`Bearer ${localStorage.getItem('token')}`
			}
			
		})
		.then(res=>res.json())
		.then(data=>{
			console.log(data)

			if(data === true){
				Swal.fire({
					title:'Success!',
					icon:'success',
					text:'Product Successfully Archived'
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

	}

	const activateToggle = (e, product)=>{

		e.preventDefault();

		fetch(`${process.env.REACT_APP_API_URL}/products/${product}/activate`,{

			method:'PUT',
			headers:{
				'Content-Type':'application/json',
				'Authorization':`Bearer ${localStorage.getItem('token')}`
			}
			
		})
		.then(res=>res.json())
		.then(data=>{
			console.log(data)

			if(data === true){
				Swal.fire({
					title:'Success!',
					icon:'success',
					text:'Product Successfully Activated'
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

	}

	return (
		<>

		{isActive ? 
			<Button variant="danger" size="sm" onClick={e=>archiveToggle(e,product)}>Archive</Button>
			:
			<Button variant="success" size="sm" onClick={e=>activateToggle(e,product)}>Activate</Button>	            
		}

		</>


	)
}