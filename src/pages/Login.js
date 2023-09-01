import { useState, useEffect } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';

export default function Login(props) {

    // State hooks to store the values of the input fields
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // State to determine whether submit button is enabled or not
    const [isActive, setIsActive] = useState(true);

    function authenticate(e) {

    // Prevents page redirection via form submission
    e.preventDefault();
    fetch('http://localhost:4000/users/login',{

    method: 'POST',
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({

        email: email,
        password: password

    })
})
.then(res => res.json())
.then(data => {

    console.log(data.access)

    if(data.access){
        localStorage.setItem('token', data.access);
        alert(`You are now logged in`);
        
    } else {

        alert(`${email} does not exist`)
    }
})
// Clear input fields after submission
setEmail('');
setPassword('');


}

    useEffect(() => {

        // Validation to enable submit button when all fields are populated and both passwords match
            if(email !== '' && password !== ''){
                setIsActive(true);
            }else{
                setIsActive(false);
            }

        }, [email, password]);

return (   
     
    <div className=" text-warning vh-100">
         <Row className='mt-3 mb-3 d-flex justify-content-center'>
            <Col xs={12} md={6} lg={4} xl={3}>
            <Form onSubmit={(e)=>authenticate(e)}>
                <h1 className="my-5 text-center text-warning">Login</h1>
                <Form.Group controlId="userEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>

                { isActive ? 
                    <Button className='my-3' variant="primary" type="submit" id="submitBtn">
                        Submit
                    </Button>
                    : 
                    <Button className='my-3' variant="danger" type="submit" id="submitBtn" disabled>
                        Submit
                    </Button>
                }
            </Form> 
            </Col> 
        </Row>
    </div>     
)
}
