import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal';

import { connect } from "react-redux";
import { uploadItem} from "../_actions";
import { filesConstants } from "../_constants/files.constants";
import { Alert } from 'react-bootstrap';

// import axios from "axios";

class UploadForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: "",
            uploadResponse: null
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.submitFile();
    }

    handleFileChange = (event) => {
        this.setState({
            [event.target.name]: event.target.files
        })
    }
    shouldComponentRender = () => {
        return this.props.files.fetchFilesState === filesConstants.FETCH_FILES_SUCCESS ? true : false; 
    }

    submitFile = () => {
        this.props.uploadItem([...this.state.file], this.props.folderId)

    }

    render() {
        return (
        <Modal show={this.props.show} onHide={() => this.props.handleClose()}>
          <Modal.Header closeButton>
            <Modal.Title>File Upload</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              {this.props.files.uploadFile ?
                <div>
                  {
                      this.props.files.uploadFile === "success" ? 
                      window.location.reload() : 
                      <Alert variant="warning">
                        Something went wrong... Try again!
                      </Alert>
                  }
                </div> :
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.File id="custom-file" label={this.state.file ? this.state.file[0].name : "Choose file"} multiple custom onChange={this.handleFileChange} name="file"/>
                    </Form.Group>
                    <Button type="submit" variant="outline-success" className="float-right">Upload</Button>
                </Form>
              }
          </Modal.Body>
        </Modal>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        files : state.files
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        uploadItem: (file) => dispatch(uploadItem(file))
    };
}

export default connect(mapStateToProps, mapDispatchToProps) (UploadForm);
