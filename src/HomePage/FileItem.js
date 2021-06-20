import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

export default function FileItem (props) {

    const linked = {
        cursor: "pointer"
    }

    const {key} = useParams();

    return (
        <ListGroup.Item>
            {props.showChecks && <Form.Check className="d-inline mr-2" type="checkbox" name={props.file.id} onClick={props.handleCheck}/> }
            <i className={props.file.type !== "FILE" ? "fa fa-1x mr-3 fa-folder text-primary" 
            : "fa fa-1x mr-3 fa-file text-primary"}></i>
                <span onClick={() => props.file.type !== "FILE" && props.openFolder(props.file.id)} style={linked}>{props.file.name}</span> 
{key ? 
<Button className="btn-sm btn-outline-white float-right ml-3" onClick={() => props.serveInFolder(props.file)}>Open in Folder</Button>
:
<span>
    <Button className="btn-sm btn-outline-white float-right ml-3" onClick={() => props.details(props.file)}>Details</Button>
    <i className="fa fa-1x fa-trash text-danger float-right ml-3" style={linked} 
        onClick={() => props.delete(props.file.id)}></i>

    <i className="fa fa-1x fa-pen text-primary float-right ml-3" style={linked} 
        onClick={() => props.rename(props.file)}></i>

    <i className="fa fa-1x fa-download text-success float-right ml-3" style={linked} 
        onClick={()=> props.download(props.file)}></i>
</span>

}
        </ListGroup.Item>
    )
}