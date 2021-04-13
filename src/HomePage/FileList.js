import React from 'react';
import FileItem from './FileItem';
import ListGroup from 'react-bootstrap/ListGroup'

import { connect } from "react-redux";

import { deleteItem, downloadItem, getAllAsync, searchByName, renameItem } from "../_actions";
import { filesConstants } from "../_constants/files.constants";
import RenameModal from './RenameModal';
import {history} from './../_helpers';

class FileList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
            selectedFileName: undefined,
            selectedFileId: undefined,
            showChecks: false
        }
    }

    componentDidMount() {
        if(!this.props.searchKey) {
            this.props.getAll(this.props.folderName);
        } else {
            this.props.searchByName(this.props.searchKey);   
        }
    }
    shouldComponentRender = () => {
        return this.props.files.fetchFilesState === filesConstants.FETCH_FILES_SUCCESS ? true : false; 
    }

    delete = (id) => {
        this.props.deleteItem(id);
    }
    rename = (file) => {
        this.setState({
            modalShow: true,
            selectedFileName: file.fileName,
            selectedFileId: file.id
        })
    }
    download = (id) => {
        this.props.downloadItem(id);
    }

    handleCloseModal = () => {
        this.setState({modalShow: false})
    }
    handleFileNameChange = (event) => {
        this.setState({selectedFileName: event.target.value})
    }

    renameSubmit = () => {
        this.props.renameItem(this.state.selectedFileId, this.state.selectedFileName);
        this.setState({modalShow: false})
    }

    openFolder = (folderName) => {
        history.push("/folder/" + folderName);
        this.props.getAll(folderName);
    }
    showCheckboxes = () => {
        this.setState({
            showChecks: !this.state.showChecks
        })
    }

    render() {
        return (
            <div>
                <button className="btn btn-primary" onClick={this.showCheckboxes}>select</button>
                <ListGroup variant="flush">
                    {this.props.files.fetchFilesState === filesConstants.FETCH_FILES_SUCCESS && 
                        this.props.files.data.map((f,i) => 
                        <FileItem key={i} file={f} 
                        rename={this.rename} 
                        delete={this.delete} 
                        download={this.download}
                        openFolder={this.openFolder}
                        showChecks={this.state.showChecks}/>)
                    }
                    <RenameModal show={this.state.modalShow} 
                            handleClose={this.handleCloseModal} 
                            fileName={this.state.selectedFileName}
                            renameSubmit={this.renameSubmit}
                            handleChange={this.handleFileNameChange}/>
                </ListGroup>
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
        getAll: (folderName) => dispatch(getAllAsync(folderName)),
        searchByName: (searchKey) => dispatch(searchByName(searchKey)),
        deleteItem: (id) => dispatch(deleteItem(id)),
        downloadItem: (id) => dispatch(downloadItem(id)),
        renameItem: (id, newName) => dispatch(renameItem(id, newName))
    };
}

export default connect(mapStateToProps, mapDispatchToProps) (FileList);