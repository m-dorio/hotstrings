import { useState, useEffect, useContext } from 'react';
import UserContext from '../UserContext';
import { Navigate } from 'react-router-dom';
import { Row, Col, Form, Button } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Register() {

	const { user, setUser} = useContext(UserContext);
    const navigate = useNavigate();
	const [ firstName, setFirstName ] = useState("");
	//(5 mins) add state hooks for lastName, email, mobileNo, password, confirmPassword, isActive(button)
	const [lastName,setLastName] = useState("");
    const [email,setEmail] = useState("");
    const [mobileNo,setMobileNo] = useState("");
    const [address,setAddress] = useState("");
    const [userImg,setUserImg] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");	
	//State to determine whether submit button is enabled or not
    const [isActive, setIsActive] = useState(false);
    //fetch
    function registerUser(e){
    	//prevent page redirection via form submission
    	e.preventDefault();

    	fetch(`${process.env.REACT_APP_API_URL}/users/register`,{
    		method: 'POST',
    		headers:{
    			"Content-Type":"application/json"
    		},
    		body: JSON.stringify({

    			firstName: firstName,
    			lastName: lastName,
    			email: email,
    			mobileNo: mobileNo,
                address: address,
    			password: password,
                userImg: userImg
    		})
    	})
    	.then(res=>res.json())
    	.then(data=>{

    		if(data){
    			setFirstName('');
    			setLastName('');
    			setEmail('');
    			setMobileNo('');
                setAddress('');
    			setPassword('');
                setUserImg('')
    			setConfirmPassword('')
    		
                Swal.fire({
                    title: "Registration successfull",
                    icon: "success",
                    text: "Welcome to HotStrings!"
                })

                navigate('/users/login'); // Redirect to login page     
            } else {
        
                Swal.fire({
                    title: "Authentication Failed.",
                    icon: "error",
                    text: "Check your login details and try again."
                })
          
            }
    	}, [])
    }


    useEffect(()=>{

    	if((firstName !== "" && lastName !== "" && email !=="" && mobileNo !== "" && password !=="" && confirmPassword !== "") && (password === confirmPassword) && (mobileNo.length === 11)){

    		setIsActive(true)

    	}else{
    		setIsActive(false)
    	}

    },[firstName,lastName,email,mobileNo,password,confirmPassword])

	return(

        (user.id !==null)?
        <Navigate to="/users/login" />
		:
		<>

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

                <Form.Group className='mt-3'>
                    <Form.Label>Last Name:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Last Name"
                        required
                        value={lastName}
                        onChange={e=>{setLastName(e.target.value)}}
                    />
                </Form.Group>


                <Form.Group className='mt-3'>
                    <Form.Label>Mobile No:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter 11-digit No."
                        required
                        value={mobileNo}
                        onChange={e=>{setMobileNo(e.target.value)}}
                    />
                </Form.Group>

                
                <Form.Group className='mt-3'>
                    <Form.Label>Home/Office Address:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Billing/Home Address"
                        required
                        value={address}
                        onChange={e=>{setAddress(e.target.value)}}
                    />
                </Form.Group>


                <Form.Group className='mt-3'>
                    <Form.Label>Profile Picture:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Image URL [optional]"
                        value={userImg}
                        onChange={e=>{setUserImg(e.target.value)}}
                    />
                </Form.Group>


                <Form.Group className='mt-3'>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter Email"
                        required
                        value={email}
                        onChange={e=>{setEmail(e.target.value)}}
                    />
                </Form.Group>

                <Form.Group className='mt-3'>
                    <Form.Label>Password: </Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter Password"
                        required
                        value={password}
                        onChange={e=>{setPassword(e.target.value)}}
                    />
                </Form.Group>

                <Form.Group className='mt-3'>
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

    </>
	)
}
