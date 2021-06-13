import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal';

import { connect } from "react-redux";
import { uploadItem} from "../_actions";
import { filesConstants } from "../_constants/files.constants";
import {xhrCreator} from './../_services/fetchServices'
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


    componentDidMount() {

    // fetch('http://localhost:8082/folder/nurlan/content',
    //     {
    //         method: "get",
    //         header: 
    //             new Headers({
    //                 "postman-token": "318500c9-3d57-65ad-0648-ba67cfbdc4d5",
    //                 'cache-control': 'no-cache',
    //                 'authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJudXJsYW4iLCJleHAiOjE2MjE5NjYyMDEsImlhdCI6MTYyMTk0NDYwMX0.7TI9LM_ZE6UO-vg5Nt32Xn8YXAKn83a7zNmjgitl4wg'
    //             }),
    //         credentials: 'include', // include, *same-origin, omit
    // })
}

// .then(res => console.log(res)).catch(err => console.log(err));


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
        let user = JSON.parse(localStorage.getItem("user"));
        let folderId = this.props.folderId || user.username;
        let url = "http://localhost:8082/folder/"+folderId + "/upload";

        let xhr = xhrCreator(url, "post");
        let formD = new FormData();
        [...this.state.file].forEach(file => formD.append("files", file));
        
        xhr.send(formD);
        const self = this;
        xhr.addEventListener("readystatechange", function () {  
            if (this.readyState === 4) {
                let resp = JSON.parse(this.responseText)
                console.log(resp);
                if(this.status === 200) {
                    self.setState({uploadResponse: "success"})
                } else {
                    self.setState({uploadResponse: "error"})
                }
            }
        });

    }
    // uploadFile = () => {
    //     let user = JSON.parse(localStorage.getItem("user"));
    //     let folderId = this.props.folderId || user.username;
    //     let url = "http://localhost:8082/folder/"+folderId + "/upload";

    //     let formD = new FormData();
    //     [...this.state.file].forEach(file => formD.append("files", file));

    //     axios({
    //         url: url,
    //         method: "POST",
    //         headers: new Headers({"Authorization" : "Bearer " + user.token}),
    //         data: formD,
    //     }).then(res => {
    //             console.log(res);
    //             if(res.ok) {
    //                 this.setState({uploadResponse: "success"})
    //             } else {
    //                 this.setState({uploadResponse: "error"})
    //             }
    //         })
    // }

    render() {
        return (
        <Modal show={this.props.show} onHide={() => this.props.handleClose()}>
          <Modal.Header closeButton>
            <Modal.Title>File Upload</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              {this.state.uploadResponse ?
                <div>
                  {
                      this.state.uploadResponse === "success" ? 
                      <Alert variant="success">
                        File(s) uploaded successfully
                      </Alert> : 
                      <Alert variant="warning">
                        Something went wrong... Try again!
                      </Alert>
                  }
                </div> :
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.File id="custom-file" label="Custom file input" multiple custom onChange={this.handleFileChange} name="file"/>
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
