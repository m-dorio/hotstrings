import Button from 'react-bootstrap/Button';
import {Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom';

export default function Banner({title,subtitle,buttonText,linkTo,btnVariant}) {

	return (

	<Row>
		<Col>
			<h1>{title}</h1>
			<p>{subtitle}</p>
			<Link to={linkTo}>
				<Button variant="primary">{buttonText}</Button>
			</Link>
		</Col>
	</Row>

	)
}


