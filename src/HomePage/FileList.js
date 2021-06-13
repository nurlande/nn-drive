import React from 'react';
import FileItem from './FileItem';
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
// import {Link} from 'react-router-dom'

import { connect } from "react-redux";

import { deleteItem, downloadItem, getAllAsync, searchByName, renameItem, createFolder } from "../_actions";
import { filesConstants } from "../_constants/files.constants";
import {history} from './../_helpers';
import CommonModal from './CommonModal';
import Alert from 'react-bootstrap/Alert';
import UploadForm from '../AdminPage/UploadForm';

class FileList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
            uploadModalShow: false,
            modalFor: null,
            selectedFileName: undefined,
            selectedFileId: undefined,
            showChecks: false,
            selectedIds: [],
            fileDetails: null
        }
    }


    //lifecycles
    componentDidMount() {
        if(!this.props.searchKey) {
            this.props.getAll(this.props.folderId);
        } else {
            this.props.searchByName(this.props.searchKey);
        }
    }

    shouldComponentRender = () => {
        return this.props.files.fetchFilesState === filesConstants.FETCH_FILES_SUCCESS ? true : false; 
    }

    //main actions

    createFolder = () => {
        this.setState({
            modalShow: true,
            modalFor: "createFolder",
            selectedFileName: ""
        })
    }
    delete = (id) => {
        this.setState({
            modalShow: true,
            modalFor: "delete",
            selectedFileId: id
        })
    }
    rename = (file) => {
        this.setState({
            modalShow: true,
            modalFor: "rename",
            selectedFileName: file.name,
            selectedFileId: file.id
        })
    }
    details = (file) => {
        this.setState({
            modalShow: true,
            modalFor: "details",
            selectedFileId: file.id,
            selectedFileName: file.name
        })
        let user = JSON.parse(localStorage.getItem("user"));
          fetch("http://localhost:8082/file/details/" + file.id, {headers: new Headers({Authorization: "Bearer " + user.token})})
          .then(res => res.json().then(data => {
              this.setState({
                  fileDetails: data
              })
          })).catch(err => console.log(err))
    }
    download = (file) => {
        if(file.type === "FILE") {
            this.props.downloadItem(file);
        } else {
            console.log("it's folder")
        }
    }

    // modal closer
    handleCloseModal = () => {
        this.setState({modalShow: false, uploadModalShow: false})
    }

    //input handler
    handleFileNameChange = (event) => {
        this.setState({selectedFileName: event.target.value})
    }

    //modal submitter
    modalSubmit = () => {
        switch(this.state.modalFor) {
            case "createFolder":
                return this.createFolderSubmit();
            case "rename" :
                return this.renameSubmit();
            case "delete":
                return this.submitDelete();
            case "move":
                return console.log("move");
            case "share":
                return console.log("share");
            default:
                return;
        }
    }
    submitDelete = () => {
        this.props.deleteItem(this.state.selectedFileId)
        this.props.getAll(this.props.folderId);
    }
    createFolderSubmit = () => {
        this.props.createFolderAction(this.state.selectedFileName, this.props.fileId);
        this.props.getAll(this.props.folderId);
    }
    renameSubmit = () => {
        this.props.renameItem(this.state.selectedFileId, this.state.selectedFileName);
        this.props.getAll(this.props.folderId);
    }

    // serveIn folder
    openFolder = (folderId) => {
        history.push("/folder/" + folderId);
        this.props.getAll(folderId);
        this.setState({
            showChecks: false,
            selectedIds: []
        })
    }

    // checkbox to collect multiple files
    showCheckboxes = () => {
        this.setState({showChecks: !this.state.showChecks})
    }
    handleCheck = (event) => {
        let id = event.target.name;
        let checked = event.target.checked;
        this.setState({selectedIds: checked ? [...this.state.selectedIds].concat(id) : [...this.state.selectedIds].filter(i => i !== id)});
    }


    // advanced actions
    moveFiles = () => {
        this.setState({
            modalShow: true,
            modalFor: "move"
        })
    }
    shareFiles = () => {
        this.setState({
            modalShow: true,
            modalFor: "share"
        })
    }


    // Presentational part of component
    render() {
        return (
            <div>
                {
                <Button variant="outline-primary" size="sm" onClick={this.showCheckboxes} className="mr-1">Select</Button>
                }
                {/* <Link to="/admin"> */}
                    <Button variant="outline-primary" size="sm" className="mr-1" onClick={() => this.setState({uploadModalShow: true})}>
                        Show Upload File
                    </Button>
                {/* </Link> */}
                <Button variant="outline-primary" size="sm" onClick={this.createFolder} className="mr-1">Create Folder</Button>
                
                {this.state.selectedIds.length > 0 &&
                    <>
                        <Button variant="outline-primary" className="float-right ml-2" size="sm" onClick={this.moveFiles}>Move</Button>
                        <Button variant="outline-primary" className="float-right ml-2" size="sm" onClick={this.shareFiles}>Share</Button>
                    </>
                }
                
                <UploadForm handleClose={this.handleCloseModal} show={this.state.uploadModalShow} folderId={this.props.folderId}/>
                <hr />
                <ListGroup variant="flush">
                    {this.props.files.fetchFilesState === filesConstants.FETCH_FILES_SUCCESS ? 
                        this.props.files.data.content.map((f,i) => 
                        <FileItem key={i} file={f} 
                        rename={this.rename} 
                        delete={this.delete} 
                        download={this.download}
                        openFolder={() => this.openFolder(f.id)}
                        showChecks={this.state.showChecks}
                        details={this.details}
                        handleCheck={this.handleCheck}/>) : <Alert variant="warning">Something went wrong...</Alert>
                    }
                    <CommonModal show={this.state.modalShow} 
                            handleClose={this.handleCloseModal} 
                            fileName={this.state.selectedFileName}
                            modalSubmit={this.modalSubmit}
                            handleChange={this.handleFileNameChange}
                            files={this.props.files.data}
                            modalFor={this.state.modalFor}
                            fileDetails={this.state.fileDetails}/>
                </ListGroup>
            </div>
        )
    }
}



// redux connection
const mapStateToProps = (state) => {
    return {
        files : state.files
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAll: (folderId) => dispatch(getAllAsync(folderId)),
        searchByName: (searchKey) => dispatch(searchByName(searchKey)),
        deleteItem: (id) => dispatch(deleteItem(id)),
        downloadItem: (id) => dispatch(downloadItem(id)),
        renameItem: (id, newName) => dispatch(renameItem(id, newName)),
        createFolderAction: (folderName, parentId) => dispatch(createFolder(folderName, parentId))
    };
}

export default connect(mapStateToProps, mapDispatchToProps) (FileList);