import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function RenameModal(props) {
    return (
      <>
        <Modal show={props.show} onHide={() => props.handleClose()}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>File Name</Form.Label>
              <Form.Control type="text" value={props.fileName && props.fileName} onChange={(event) => props.handleChange(event)}/>
            </Form.Group>
          </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => props.handleClose()}>
              Close
            </Button>
            <Button variant="primary" onClick={() => props.renameSubmit()}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  