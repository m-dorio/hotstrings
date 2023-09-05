import React from 'react';
import { Col , Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import formatCurrency from './FormatCurrency';

export default function Product(props){

	//props is used here to get the data and breakPoint from the FeaturedCourses.js
	const { breakPoint, data } = props

	const { _id, name, description, price, productImg } = data

	return(
		<Col xs={12} sm={12} md={6} lg={6} xl={breakPoint} className='mb-5'>
			<Card data-bs-theme="dark" className = "productHighlight mx-2">
				<Card.Body>
				<Card.Img variant="top" src={`${productImg}`} />
					<Card.Title className ="ellipsis text-center pt-3">
						<Link to={`/products/${_id}`}>{name}</Link>
					</Card.Title>
					<Card.Text className='desc ellipsis'>{description}</Card.Text>
				</Card.Body>
				<Card.Footer>
					<h5 className='h4 text-warning text-center'>{formatCurrency(price)}</h5>

					<Link className="my-2 btn btn-primary d-block" to={`/products/${_id}`}>Details</Link>

				</Card.Footer>
			</Card>
		</Col>
	)

}