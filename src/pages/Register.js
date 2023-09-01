import { useState, useEffect } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';


export default function Register(){

	//State hooks to store the values of the input fields
	const [ firstName, setFirstName ] = useState("");
	//(5 mins) add state hooks for lastName, email, mobileNo, password, confirmPassword, isActive(button)
	const [lastName,setLastName] = useState("");
    const [email,setEmail] = useState("");
    const [mobileNo,setMobileNo] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");	

	//State to determine whether submit button is enabled or not
    const [isActive, setIsActive] = useState(false);

    //check if values are successfully binded
    console.log(firstName);
    console.log(lastName);
    console.log(email);
    console.log(mobileNo);
    console.log(password);
    console.log(confirmPassword);

    //fetch

    function registerUser(e){
    	//prevent page redirection via form submission
    	e.preventDefault();

    	fetch('http://localhost:4000/users/register',{
    		method: 'POST',
    		headers:{
    			"Content-Type":"application/json"
    		},
    		body: JSON.stringify({

    			firstName: firstName,
    			lastName: lastName,
    			email: email,
    			mobileNo: mobileNo,
    			password: password

    		})
    	})
    	.then(res=>res.json())
    	.then(data=>{

    		console.log(data)
    		if(data){

    			setFirstName('');
    			setLastName('');
    			setEmail('');
    			setMobileNo('');
    			setPassword('');
    			setConfirmPassword('')

    			alert("Thank you for registering!")

    		}else{
    			alert("Please try again")
    		}
    	})
    }



    //useEffect() has 2 arguments
    	//function - side effect you want to perform
    	//dependency - optional array, the effect will run when there are changes in the component's dependency

    useEffect(()=>{

    	if((firstName !== "" && lastName !== "" && email !=="" && mobileNo !== "" && password !=="" && confirmPassword !== "") && (password === confirmPassword) && (mobileNo.length === 11)){

    		setIsActive(true)

    	}else{
    		setIsActive(false)
    	}

    },[firstName,lastName,email,mobileNo,password,confirmPassword])

	return(
        <div className="text-warning vh-100">
        <Row className='mt-3 mb-3 d-flex justify-content-center'>
            <Col xs={12} md={6} lg={4} xl={3}>
                <Form onSubmit={(e)=>registerUser(e)}>
                <h1 className="my-5 text-center text-warning">Register</h1>

                <Form.Group>
                    <Form.Label>First Name:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter First Name"
                        required
                        value={firstName}
                        onChange={e=>{setFirstName(e.target.value)}}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Last Name:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Last Name"
                        required
                        value={lastName}
                        onChange={e=>{setLastName(e.target.value)}}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter Email"
                        required
                        value={email}
                        onChange={e=>{setEmail(e.target.value)}}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Mobile No:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter 11-digit No."
                        required
                        value={mobileNo}
                        onChange={e=>{setMobileNo(e.target.value)}}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Password: </Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter Password"
                        required
                        value={password}
                        onChange={e=>{setPassword(e.target.value)}}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Confirm Password: </Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        required
                        value={confirmPassword}
                        onChange={e=>{setConfirmPassword(e.target.value)}}
                    />
                </Form.Group>

                {
                    isActive ?
                    <Button className='my-3' variant="primary" type="submit" id="submitBtn">Submit</Button>
                    :
                    <Button className='my-3' variant="danger" type="submit" id="submitBtn" disabled>Submit</Button>
                }

            </Form>
            </Col>
        </Row>
        </div>
	)
}
