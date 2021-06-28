import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Alert } from 'react-bootstrap';
import {useSelector} from 'react-redux'

export default function CommonModal(props) {

    
    const [folderTree, setFolderTree] = useState({});
    const [nameChunk, setNameChunk] = useState("");
    const [userList, setUserList] = useState([])
    const [selectedUsers, setSelectedUsers] = useState([])

    const createFolder = useSelector(state => state.files.createFolder)
    const renameFile = useSelector(state => state.files.renameFile)
    const deleteFile = useSelector(state => state.files.deleteFile)

    const [selectedFolder, setSelectedFolder] = useState("");

    useEffect(() => {
      let user = JSON.parse(localStorage.getItem("user"));
      fetch("http://localhost:8082/folder/tree", {headers: new Headers({Authorization: "Bearer " + user.token})})
      .then(res => res.json().then(data => {
        console.log(data);
        setFolderTree(data);
      })).catch(err => console.log(err));
      
    }, [])

    const submitMove = () => {
      props.moveFile(selectedFolder)
    }
    
    const handleChange = e => {
      setNameChunk(e.target.value);
      getUserList(e.target.value);
    }

    const addToSelectedUsers = (id) => {
      setSelectedUsers([...selectedUsers, id])
    }

    const submitShare = () => {
      props.submitShare(selectedUsers);
      
    }

    const getUserList = name => {
      let user = JSON.parse(localStorage.getItem("user"));
      fetch("http://localhost:8082/user/search/" + name, {headers: new Headers({Authorization: "Bearer " + user.token})})
      .then(res => res.json().then(data => {
        console.log(data);
        setUserList(data);
      })).catch(err => console.log(err));
    }
    
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
                  <p>Are you sure to delete this file?</p> <b>{props.fileName && props.fileName}</b>
                  </div>
            case "move":
                return <div>
                  <h3>Select Folder to move</h3>
                    <h6 className="d-flex">
                      <Form.Check checked={selectedFolder === folderTree.id} onChange={() => setSelectedFolder(folderTree.id)}/>{folderTree.name}</h6>
                    <div className="ml-3">
                    {folderTree.subnodes.map((f,i) => 
                          <div key={i}>
                              <h6 className="d-flex"><Form.Check checked={selectedFolder === f.id} onChange={()=> setSelectedFolder(f.id)}/>{f.name}</h6>
                              <div className="ml-3">
                                  {f.subnodes.map((ff,i) => 
                                    <div key={i}>
                                      <h6 className="d-flex"><Form.Check checked={selectedFolder === ff.id} onChange={()=> setSelectedFolder(ff.id)}/>{ff.name}</h6>
                                      <div className="ml-3">
                                        {ff.subnodes.map((fff,i) => 
                                          <div key={i}>
                                            <div className="ml-3">
                                              <h6 className="d-flex"><Form.Check checked={selectedFolder === fff.id} onChange={()=> setSelectedFolder(fff.id)}/>{fff.name}</h6>
                                              <div className="ml-3">
                                                {fff.subnodes.map((ffff,i) => 
                                                  <div key={i}>
                                                    <h6 className="d-flex"><Form.Check checked={selectedFolder === ffff.id} onChange={()=> setSelectedFolder(ffff.id)}/>{ffff.name}</h6>
                                                  </div>)}
                                              </div>
                                            </div>
                                          </div>)}
                                      </div>
                                    </div>)}
                              </div>
                          </div>
                      )}
                    </div>
                    <div className="text-right">
                      <Button variant="primary" onClick={submitMove}>
                        Move
                      </Button>
                    </div>
                  </div>;
            case "share":
                return <Form>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Select Users</Form.Label>
                    <Form.Control type="text" value={nameChunk} onKeyUp={(event) => handleChange(event)} onChange={e => setNameChunk(e.target.value)}/>
                </Form.Group>
                {userList.map(u => 
                  <div>
                    <h6 className="d-flex"><Form.Check checked={selectedUsers.includes(u.username)} onChange={()=> addToSelectedUsers(u.username)}/>{u.username}</h6>
                  </div>
                )}
            </Form>;
            case "details":
              return <div>
                {props.fileDetails &&
                <div>
                  <h3 className="text-center">File Details</h3>
                  <table  className="table">
                    <tbody>
                      <tr><td><b>Name</b></td><td>{props.fileDetails.name}</td></tr>
                      <tr><td><b>Size</b></td><td>{props.fileDetails.size}</td></tr>
                      <tr><td><b>Extension</b></td><td>{props.fileDetails.ext}</td></tr>
                      <tr><td><b>Owner</b></td><td>{props.fileDetails.owner.username}</td></tr>
                      <tr><td><b>Created</b></td><td>{props.fileDetails.createdAt}</td></tr>
                      <tr><td><b>Updated</b></td><td>{props.fileDetails.updatedAt}</td></tr>
                    </tbody>
                  </table>
                </div>
                }
              </div>;
            default:
                return <h1>Modal</h1>;
        }
    }
    return (
      <>
        <Modal show={props.show} onHide={() => props.handleClose()}>
          {/* <Modal.Header closeButton>
            <Modal.Title></Modal.Title>
          </Modal.Header> */}
          <Modal.Body>
            {defineBody()}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => props.handleClose()}>
              Close
            </Button>
            {props.modalFor==="share" ? 
            <Button variant="primary" onClick={submitShare}>Submit</Button>
            : (props.modalFor !== "details" && props.modalFor !== "move") && 
                <Button variant="primary" onClick={() => props.modalSubmit()}>
                  {props.modalFor=== "delete" ? "Confirm Delete" : "Submit"}
              </Button>
            }
          </Modal.Footer>
        </Modal>
      </>
    );
  }
