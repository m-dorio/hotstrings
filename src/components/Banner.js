import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Link } from 'react-router-dom';

export default function Banner({title,subtitle,buttonText,linkTo,btnVariant}) {

	return (
		<Row>
			<Col>
				<h1 >{title}</h1>
				<p className='text-warning'>{subtitle}</p>
				<Link to={linkTo}>
					<Button variant={btnVariant}>{buttonText}</Button>
                </Link>
			</Col>
		</Row>
	)
}


