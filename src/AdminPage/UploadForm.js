import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { connect } from "react-redux";
import { uploadItem} from "../_actions";
import { filesConstants } from "../_constants/files.constants";

class UploadForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: ""
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let file = {id: 5, fileName: this.state.file[0].name, type: "file"}
        this.props.uploadItem(file);
    }

    handleFileChange = (event) => {
        this.setState({
            [event.target.name]: event.target.files
        })
    }
    shouldComponentRender = () => {
        return this.props.files.fetchFilesState === filesConstants.FETCH_FILES_SUCCESS ? true : false; 
    }

    render() {
        console.log(this.props.files.data)
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.File id="custom-file" label="Custom file input" multiple custom onChange={this.handleFileChange} name="file"/>
                    </Form.Group>
                    <Button type="submit" variant="outline-success" className="float-right">Upload</Button>
                </Form>
            </div>
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