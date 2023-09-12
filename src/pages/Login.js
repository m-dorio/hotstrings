import { useState, useEffect, useContext } from 'react';
import { Row, Col, Form, Button, Container } from 'react-bootstrap';
import FeaturedProducts from '../components/product/FeaturedProducts';
import { Navigate } from 'react-router-dom'
import UserContext from '../UserContext';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

export default function Login() {

    // Allow us to continue the User context object and it's properties to
    const {user, setUser} = useContext(UserContext);

    // State hooks to store the values of the input fields
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // State to determine whether submit button is enabled or not
    const [isActive, setIsActive] = useState(true);

    function authenticate(e) {

    // Prevents page redirection via form submission
    e.preventDefault();
    
    const authData = {
        email: email,
        password: password
    };

    fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(authData)
    })

    .then(res => res.json())
    .then(data => {

    if(typeof data.access !== "undefined"){
        localStorage.setItem('token', data.access);
        // localStorage.setItem('email',email);
        retrieveUserDetails(data.access); //

        setUser({
            access : localStorage.getItem('token'),
            // email : localStorage.getItem('email')
    });  

        Swal.fire({
            title: "Login successful",
            icon: "success",
            text: "Welcome to HotStrings!"
        })
        // alert(`You are now logged in`);


    } else {

        Swal.fire({
            title: "Authentication Failed.",
            icon: "error",
            text: "Check your login details and try again."
        })
        // alert(`${email} does not exist`)
  
    }
})
    // Clear input fields after submission
    setEmail('');
    setPassword('');
    //SetConfirmPassword('');
}

    const retrieveUserDetails = (token) => {
      
        fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
            method: 'GET',
            headers: {
                Authorization : `Bearer ${ token }`
            }
        })
        .then(res => res.json())
        .then(data => {
                  
            setUser ({
                id: data._id,
                isAdmin: data.isAdmin
            })
        })
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
            <>
              {user.id !== null ? (
                <>
                  <Navigate to="/" />
                </>
              ) : (
                <>
                  <section id="banner">
                    <div className="d-flex justify-content-center align-content-center">
                      <div className="d-flex d-block d-sm-block d-md-none align-items-center">
                        <p className="banner textfxa text-center mt-5">
                          HOT<Link className="mt-5 textfxb" to="./">
                            /STRINGS
                          </Link>
                        </p>
                      </div>
                      <div className="d-flex d-none d-sm-none d-md-block align-items-center">
                        <p className="banner textfxa text-center mt-5">
                          HOT<Link className="mt-5 textfxb" to="./">
                            /STRINGS&nbsp;<i className="bowl-rice fa-solid fa-bowl-rice"></i>
                          </Link>
                        </p>
                      </div>
                    </div>
                  </section>
          
                  <Row id="landing" className="mt-3 mb-3 text-white d-flex justify-content-center">
                    <Col xs={12} md={6} lg={6} xl={4}>
                      <Form onSubmit={(e) => authenticate(e)}>
                        <h1 className="my-5 text-center">Login</h1>
                        <Form.Group controlId="userEmail">
                          <Form.Label>Email address</Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email} // Bind to email state
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </Form.Group>
          
                        <Form.Group className="mt-3" controlId="password">
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password} // Bind to password state
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </Form.Group>
          
                        {isActive ? (
                          <Button className="my-3" variant="primary" type="submit" id="submitBtn">
                            Submit
                          </Button>
                        ) : (
                          <Button className="my-3" variant="danger" type="submit" id="submitBtn" disabled>
                            Submit
                          </Button>
                        )}
                      </Form>

                      <h2 className="text-center text-white mt-5">Featured Products</h2>
                        <Container>
                            <Row className='d-flex justify-content-center align-content-center mb-5'>
                                <FeaturedProducts />
                            </Row>
                        </Container>

                    </Col>
                  </Row>
                </>
              )}
            </>
          );
}