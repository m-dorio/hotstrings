import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

const ResetPassword = () => {

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [userData, setUserData] = useState({
    password: '',
    confirmPassword: '',

  });

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/reset-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newPassword: password }),
      });

      if (response.ok) {
        Swal.fire({
          title: 'Success!',
          icon: 'success',
          text: 'Profile Successfully Updated'
        });
        setMessage('Profile Successfully Updated');
        closeEdit();
      } else {
        Swal.fire({
          title: 'Error!',
          icon: 'error',
          text: 'Please try again'
        });
        setMessage('Please try again');
        closeEdit();
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      console.error(error);
    }
  };

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
        });
        
    }
  }, [showEdit]);


  const openEdit = () => {
    setMessage('');
    setPassword('')
    setConfirmPassword('')
    setShowEdit(true);
  };

  const closeEdit = () => {
    setMessage('');
    setPassword('')
    setConfirmPassword('')
    setShowEdit(false);
  };

  return (
    <>
    <Button variant="primary" size="sm" onClick={openEdit}>Change Password</Button>
    <Modal show={showEdit} onHide={closeEdit}>
      <Form  onSubmit={handleResetPassword}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group>
            <Form.Label htmlFor="password" className="form-label">New Password</Form.Label>
            <Form.Control
             type="password"
             className="form-control"
             id="password"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
             required
           />
            <Form.Label htmlFor="password" className="form-label">Confirm Password</Form.Label>
            <Form.Control
             type="password"
             className="form-control"
             id="confirmPassword"
             value={confirmPassword}
             onChange={(e) => setConfirmPassword(e.target.value)}
             required
           />
    </Form.Group>
        </Modal.Body>

        <Modal.Footer>
        {message && <div className="alert alert-danger">{message}</div>}
          <Button variant="secondary" onClick={closeEdit}>
            Close
          </Button>
          <Button variant="success" onClick={handleResetPassword}>
            Update Password
          </Button>
        </Modal.Footer>
        
      </Form>
    </Modal>
</>
   
  );
};

export default ResetPassword;

