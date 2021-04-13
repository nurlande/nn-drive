import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';

export default function FileItem (props) {

    const linked = {
        cursor: "pointer"
    }
    return (
        <ListGroup.Item>
            {props.showChecks && <Form.Check className="d-inline mr-2" type="checkbox"/> }
            <i className={props.file.type === "folder" ? "fa fa-1x mr-3 fa-folder text-primary" 
            : "fa fa-1x mr-3 fa-file text-primary"}></i>
                <span onClick={() => props.openFolder(props.file.fileName)} style={linked}>{props.file.fileName}</span> 
            <i className="fa fa-1x fa-trash text-danger float-right ml-3" style={linked} 
                onClick={() => props.delete(props.file.id)}></i>
            <i className="fa fa-1x fa-pen text-primary float-right ml-3" style={linked} 
                onClick={() => props.rename(props.file)}></i>
            <i className="fa fa-1x fa-download text-success float-right ml-3" style={linked} 
                onClick={()=> props.download(props.file.id)}></i>
        </ListGroup.Item>
    )
}