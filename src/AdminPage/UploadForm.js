import React, {useState} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal';

import { useDispatch, useSelector} from "react-redux";
import { uploadItem} from "../_actions";
import { useParams } from 'react-router-dom';

function UploadForm (props) {

    const [file, setFile] = useState("");

    const {folderId} = useParams();
    console.log(folderId)

    const handleSubmit = (event) => {
        event.preventDefault();
        submitFile();
    }

    const handleFileChange = (event) => {
        setFile(event.target.files)
    }
    const dispatch = useDispatch();

    const submitFile = () => {
        dispatch(uploadItem([...file], folderId));
    }

    const uploadFile = useSelector(state => state.files.uploadFile)

        return (
        <Modal show={props.show} onHide={() => props.handleClose()}>
          <Modal.Header closeButton>
            <Modal.Title>File Upload</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              {uploadFile === "error" && <div>Something wrong... Try again!</div>}
              {uploadFile === "success" ?
                      window.location.reload() 
                      : 
                <Form onSubmit={(e) => handleSubmit(e)}>
                    <Form.Group>
                        <Form.File id="custom-file" label={file ? file[0].name : "Choose file"} multiple custom onChange={e => handleFileChange(e)} name="file"/>
                    </Form.Group>
                    <Button type="submit" variant="outline-success" className="float-right">Upload</Button>
                </Form>
              }
          </Modal.Body>
        </Modal>
        )
}
export default UploadForm;