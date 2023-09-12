import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

function UpdateRating({ product, fetchData }) {
  const [productId, setProductId] = useState('');
  const [name, setName] = useState('');
  const [ratings, setRatings] = useState([]);
  const [message, setMessage] = useState('');
  const [showEdit, setShowEdit] = useState(false);

  
  const handleUpdate = () => {
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ratings }),
    };

    fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`, requestOptions)
      .then(response => response.json())
      .then(data => {

        setProductId(data._id);
        setName(data.name);
        setRatings(data.ratings);
        setShowEdit(data.true);

        setMessage('Rating updated successfully');
        fetchData(); // Assuming fetchData is a function to refetch the product data
      })
      .catch(error => {
        setMessage('Error updating rating');
        console.error('Error:', error);
      });
  };

  const openEdit = () => {
    setMessage('');
    setProductId(productId);
    setName(name);
    setRatings(ratings);
    setShowEdit(true);
  };

  const closeEdit = () => {
    setMessage('');
    setShowEdit(false);
  };


  return (
    <>
      <Button variant="primary" size="sm" onClick={openEdit}>
        Rate
      </Button>
      <Modal show={showEdit} onHide={closeEdit}>
        <Form>
          <Modal.Header closeButton>
            <Modal.Title>Edit Rating</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Group controlId="productId">
              <Form.Label>Product Id</Form.Label>
              <Form.Control type="text" name="productId" value={productId} readOnly />
            </Form.Group>

            <Form.Group controlId="name">
              <Form.Label>Product Name</Form.Label>
              <Form.Control type="text" name="name" value={name} readOnly />
            </Form.Group>

            <Form.Group controlId="ratings">
              <Form.Label>Ratings</Form.Label>
              <Form.Control
                type="text"
                name="ratings"
                value={ratings}
                onChange={(e) => setRatings(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            {message && <div className="alert alert-danger">{message}</div>}
            <Button variant="secondary" onClick={closeEdit}>
              Close
            </Button>
            <Button variant="success" onClick={handleUpdate}>
              Update Rating
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default UpdateRating;
