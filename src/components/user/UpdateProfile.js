import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

function UpdateProfile() {
  const [userData, setUserData] = useState({
    userId: '',
    firstName: '',
    lastName: '',
    email: '',
    mobileNo: '',
    userImg: '',
  });
  const [message, setMessage] = useState('');
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    if (showEdit) {
      fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then((res) => res.json())
        .then((data) => {
          setUserData(data);
          //console.log(data)
        });

    }

  


  }, [showEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handleUpdateProfile = async () => {
    const apiUrl = `${process.env.REACT_APP_API_URL}/users/profile`;

    try {
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          firstName: userData.firstName,
          lastName: userData.lastName,
          mobileNo: userData.mobileNo,
        //   email: userData.email,
          userImg: userData.userImg,
        })
      });

      if (response.ok) {
        Swal.fire({
          title: 'Success!',
          icon: 'success',
          text: 'Profile Successfully Updated'
        });
        setMessage('Profile Successfully Updated');
        // closeEdit();
      } else {
        Swal.fire({
          title: 'Error!',
          icon: 'error',
          text: 'Please try again'
        });
        closeEdit();
      }
    } catch (error) {
      console.error('Error:', error);

    }
  };

  const openEdit = () => {
    setMessage('');
    setShowEdit(true);
  };

  const closeEdit = () => {
    setMessage('');
    setShowEdit(false);
  };

  return (
    <>
    <Button variant="primary" size="sm" onClick={openEdit}>Edit Profile</Button>
      <Modal show={showEdit} onHide={closeEdit}>
        <Form>
          <Modal.Header closeButton>
            <Modal.Title>Edit User</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Group controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={userData.lastName}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={userData.firstName}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="mobileNo">
              <Form.Label>Mobile No</Form.Label>
              <Form.Control
                type="text"
                name="mobileNo"
                value={userData.mobileNo}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                name="email"
                value={userData.email}
                disabled
              />
            </Form.Group>

            <Form.Group controlId="userImg">
              <Form.Label>User Image</Form.Label>
              <Form.Control
                type="text"
                name="userImg"
                value={userData.userImg}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
    
          </Modal.Body>

          <Modal.Footer>
            {message && <div className="alert alert-danger">{message}</div>}
            <Button variant="secondary" onClick={closeEdit}>
              Close
            </Button>
            <Button variant="success" onClick={handleUpdateProfile}>
              Update Profile
            </Button>
          </Modal.Footer>
          
        </Form>
      </Modal>
    </>
  );
}

export default UpdateProfile;
