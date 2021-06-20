import React from 'react';
import FileItem from './FileItem';
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
// import {Link} from 'react-router-dom'

import { connect } from "react-redux";

import { deleteItem, downloadItem, getAllAsync, searchByName, renameItem, createFolder, serveInFolder, moveFile, downloadMulti } from "../_actions";
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
        console.log("didMount")
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.specificProperty !== this.props.specificProperty) {
            // Do whatever you want
            console.log("updated?")
        }
    }
    shouldComponentRender = () => {
        console.log("should")
        this.props.getAll(this.props.folderId);
        return (this.props.files.fetchFilesState === filesConstants.FETCH_FILES_SUCCESS) ? true : false; 
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
            this.props.downloadMulti([file.id]);
        }
    }

    downloadZip = () => {
        this.props.downloadMulti(this.state.selectedIds)
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
        this.props.createFolderAction(this.state.selectedFileName, this.props.folderId);
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

    serveInFolder = (file) => {
        console.log("serve in ", file);
        this.props.serveInFolder(file.id)
    }

    submitMoveFile = (destId) => {
        console.log("destID", destId);
        console.log("parentId", this.props.folderId);
        console.log("selectedFiles", this.state.selectedIds);
        this.props.moveFile(destId, this.props.folderId, this.state.selectedIds)
    }

    deleteFiles = () => {
        this.props.deleteItem(this.state.selectedIds);
    }


    // Presentational part of component
    render() {
        return (
            <div>
                {
                <Button variant="outline-primary" size="sm" onClick={this.showCheckboxes} className="mr-1">Select</Button>
                }
                <Button variant="outline-primary" size="sm" className="mr-1" onClick={() => this.setState({uploadModalShow: true})}>
                    Show Upload File
                </Button>
                <Button variant="outline-primary" size="sm" onClick={this.createFolder} className="mr-1">Create Folder</Button>
                
                {this.state.selectedIds.length > 0 &&
                    <>
                        <Button variant="outline-primary" className="float-right ml-2" size="sm" onClick={this.downloadZip}>Download</Button>
                        <Button variant="outline-primary" className="float-right ml-2" size="sm" onClick={this.shareFiles}>Share</Button>
                        <Button variant="outline-primary" className="float-right ml-2" size="sm" onClick={this.deleteFiles}>Delete</Button>
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
                        handleCheck={this.handleCheck}
                        serveInFolder={this.serveInFolder}/>) : <Alert variant="warning">Something went wrong...</Alert>
                    }
                    <CommonModal show={this.state.modalShow} 
                            handleClose={this.handleCloseModal} 
                            fileName={this.state.selectedFileName}
                            modalSubmit={this.modalSubmit}
                            handleChange={this.handleFileNameChange}
                            files={this.props.files.data}
                            modalFor={this.state.modalFor}
                            fileDetails={this.state.fileDetails}
                            moveFile={this.submitMoveFile}/>
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
        createFolderAction: (folderName, parentId) => dispatch(createFolder(folderName, parentId)),
        serveInFolder: (id) => dispatch(serveInFolder(id)),
        moveFile: (destId, parentId, selectedFileIds) => dispatch(moveFile(destId, parentId, selectedFileIds)),
        downloadMulti: (ids) => dispatch(downloadMulti(ids))
    };
}

export default connect(mapStateToProps, mapDispatchToProps) (FileList);