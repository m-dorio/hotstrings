import React from 'react';
import { Col , Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Product(props){

	//props is used here to get the data and breakPoint from the FeaturedCourses.js
	const { breakPoint, data } = props

	const { _id, name, description, price, productImg } = data

	return(
		<Col xs={12} sm={12} md={12} lg={12} xl={breakPoint} className='mb-1'>
			<Card data-bs-theme="dark" className = "productHighlight mx-2">
				<Card.Body>
				<Link to={`/products/${_id}`}>
				<Card.Img variant="top" src={`${productImg}`} /></Link>
					<Card.Title className ="ellipsis text-center pt-1">
					<Link to={`/products/${_id}`}>{name}</Link>
					</Card.Title>
					<Card.Text className='desc ellipsis'>{description}</Card.Text>
				</Card.Body>
				<Card.Footer>
					<Link className="my-2 btn btn-primary d-block" to={`/products/${_id}`}>Details</Link>
				</Card.Footer>
			</Card>
		</Col>
	)

}