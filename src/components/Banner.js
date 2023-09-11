import Button from 'react-bootstrap/Button';
import {Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom';

export default function Banner({data}) {

	const {title,subtitle,buttonText,linkTo,variant} = data;

	return (

	<Row>
		<Col>
			<h1>{title}</h1>
			<p>{subtitle}</p>
			<Link className='btn btn-danger' to={linkTo}>{buttonText}</Link>
		</Col>
	</Row>

	)
}


