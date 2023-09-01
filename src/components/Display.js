import {Row, Col, Card} from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';

export default function Display() {
    return (
        <Row className='mt-3 mb-3 d-flex justify-content-center'>
            <Col xs={12} md={6} lg={4} className='my-3'>  
                <Card data-bs-theme="dark" >
                    <Card.Img variant="top" src="https://m-dorio.github.io/foodstore/images/img-1.jpg" />
                    <Card.Body>
                        <Card.Title>Ramen (Japan)</Card.Title>
                        <Card.Text>
                        Ramen is a Japanese noodle soup dish with Chinese origins. It typically consists of wheat noodles served in a flavorful broth, topped with various ingredients like sliced pork, soft-boiled egg, seaweed, and green onions.
                        </Card.Text>
                    </Card.Body>

                        <ListGroup className="list-group-flush">
                            <ListGroup.Item>Cras justo odio</ListGroup.Item>
                            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                        </ListGroup>

                    <Card.Body>
                        <Card.Link href="#">Card Link</Card.Link>
                        <Card.Link href="#">Another Link</Card.Link>
                    </Card.Body>
                </Card>
            </Col>
            <Col xs={12} md={6} lg={4} className='my-3'>  
                <Card data-bs-theme="dark" >
                    <Card.Img variant="top" src="https://m-dorio.github.io/foodstore/images/img-2.jpg" />
                    <Card.Body>
                        <Card.Title>Pad Thai (Thailand)</Card.Title>
                        <Card.Text>
                        Pad Thai is a popular Thai noodle dish made with stir-fried rice noodles, eggs, tofu or shrimp, bean sprouts, crushed peanuts, and tamarind-based sauce. It offers a perfect balance of sweet, sour, and savory flavors.
                        </Card.Text>
                    </Card.Body>

                        <ListGroup className="list-group-flush">
                            <ListGroup.Item>Cras justo odio</ListGroup.Item>
                            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                        </ListGroup>

                    <Card.Body>
                        <Card.Link href="#">Card Link</Card.Link>
                        <Card.Link href="#">Another Link</Card.Link>
                    </Card.Body>
                </Card>
            </Col>
            <Col xs={12} md={6} lg={4} className='my-3'>
                <Card  data-bs-theme="dark" >
                    <Card.Img variant="top" src="https://m-dorio.github.io/foodstore/images/img-3.jpg" />
                    <Card.Body>
                        <Card.Title>Pho (Vietnam)</Card.Title>
                        <Card.Text>
                        Pho is a Vietnamese noodle soup made with rice noodles and usually served with beef or chicken. The broth is rich and aromatic, flavored with herbs and spices like cinnamon, star anise, and ginger.
                        </Card.Text>
                    </Card.Body>

                        <ListGroup className="list-group-flush">
                            <ListGroup.Item>Cras justo odio</ListGroup.Item>
                            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                        </ListGroup>

                    <Card.Body>
                        <Card.Link href="#">Card Link</Card.Link>
                        <Card.Link href="#">Another Link</Card.Link>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}