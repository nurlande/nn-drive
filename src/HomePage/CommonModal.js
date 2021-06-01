import React, { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Alert, ListGroup } from 'react-bootstrap';
import {useSelector} from 'react-redux'

export default function CommonModal(props) {

    const createFolder = useSelector(state => state.files.createFolder)
    const renameFile = useSelector(state => state.files.renameFile)
    const deleteFile = useSelector(state => state.files.deleteFile)

    useEffect(() => {
      if(props.modalFor === "details") {
        console.log("modal for details");
        
      }
      // needs to download folders from back and make availible for select folder to move file
    })

    const defineBody = () => {
        switch (props.modalFor) {
            case "createFolder":
                return <Form>
                  {createFolder && 
                  <div>
                    {
                      createFolder === "success" ?
                      <Alert variant="success">Folder created</Alert> :
                      <Alert variant="success">Folder create failed... Try again</Alert>
                    }
                  </div> 
                  } { createFolder !== "success" &&
                      <Form.Group controlId="exampleForm.ControlInput1">
                      <Form.Label>File Name</Form.Label>
                      <Form.Control type="text" value={props.fileName ? props.fileName : ""} onChange={(event) => props.handleChange(event)}/>
                      </Form.Group>
                  } 
                </Form>;
            case "rename":
                return <Form>
                  {renameFile &&
                  <div>
                    {
                      renameFile === "success" ?
                      <Alert variant="success">File renamed</Alert> :
                      <Alert variant="success">File rename failed... Try again</Alert>
                    }
                  </div> 
                  } { renameFile !== "success" &&
                    <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>File Name</Form.Label>
                    <Form.Control type="text" value={props.fileName ? props.fileName : ""} onChange={(event) => props.handleChange(event)}/>
                    </Form.Group>
                  }
                </Form>;
            case "delete":
              
                return <div>
                    {deleteFile &&
                    <div>
                      {
                        deleteFile === "success" ?
                        <Alert variant="success">File deleted</Alert> :
                        <Alert variant="success">File delete failed... Try again</Alert>
                      }
                    </div> 
                  } 
                  <p>Are you sure to delete this file?</p>;
                  </div>
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
            case "details":
              return <div>
                <h3>{props.fileName && props.fileName}</h3>
              </div>;
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
            { props.modalFor !== "details" && 
                <Button variant="primary" onClick={() => props.modalSubmit()}>
                  {props.modalFor=== "delete" ? "Confirm Delete" : "Submit"}
              </Button>
            }
          </Modal.Footer>
        </Modal>
      </>
    );
  }