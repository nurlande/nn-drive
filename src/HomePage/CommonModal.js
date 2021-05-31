import React, { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ListGroup } from 'react-bootstrap';

export default function CommonModal(props) {

    useEffect(() => {
      // needs to download folders from back and make availible for select folder to move file
    })

    const defineBody = () => {
        switch (props.modalFor) {
            case "createFolder":
                return <Form>
                    <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>File Name</Form.Label>
                    <Form.Control type="text" value={props.fileName ? props.fileName : ""} onChange={(event) => props.handleChange(event)}/>
                    </Form.Group>
                </Form>;
            case "rename":
                return <Form>
                    <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>File Name</Form.Label>
                    <Form.Control type="text" value={props.fileName ? props.fileName : ""} onChange={(event) => props.handleChange(event)}/>
                    </Form.Group>
                </Form>;
            case "delete":
                return <p>Are you sure to delete this file?</p>;
            case "move":
                return <ListGroup>
                    {props.folders && props.folders.content.filter((a,b) => a.type !== "FILE").map((f,i) => 
                        <ListGroup.Item key={i}>
                            <i className="fa fa-plus mr-2"></i>
                            {f.fileName}
                        </ListGroup.Item>
                    )}
                </ListGroup>;
            case "share":
                return <Form>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Select Users</Form.Label>
                    <Form.Control type="text"/>
                </Form.Group>
            </Form>;
            default:
                return <h1>Modal</h1>;
        }
    }
    return (
      <>
        <Modal show={props.show} onHide={() => props.handleClose()}>
          <Modal.Header closeButton>
            <Modal.Title></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {defineBody()}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => props.handleClose()}>
              Close
            </Button>
            <Button variant="primary" onClick={() => props.modalSubmit()}>
              {props.modalFor=== "delete" ? "Confirm Delete" : "Submit"}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }