import React, { useState } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import { history } from '../_helpers'

import { connect } from "react-redux";

import {logout, searchByName} from "../_actions";

function Header(props) {

    const [key, setKey] = useState("");
    const handleChange = (e) => setKey(e.target.value);
    const submitSearch = (e) => {
        e.preventDefault();
        history.push('/search/' + key);
        props.searchByName(key);
    };
    
    return (
        <Navbar bg="light" variant="light">
            <Navbar.Brand href="/">Drive</Navbar.Brand>
            <Nav className="mr-auto">
                {/* <Nav.Link href="#home">Home</Nav.Link> */}
                {/* <Nav.Link href="/admin">Upload File</Nav.Link> */}
            </Nav>
            <Form inline onSubmit={submitSearch}>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" value={key} onChange={handleChange}/>
                <Button variant="outline-info" type="submit">Search</Button>
            </Form>
            <Nav className="ml-auto">
                <Nav.Link onClick={props.logout}>Logout</Nav.Link>
            </Nav>
        </Navbar>
    )
}
const mapStateToProps = (state) => {
    return {
        files : state.files
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        searchByName: (searchKey) => dispatch(searchByName(searchKey)),
        logout: () => dispatch(logout())
    };
}

export default connect(mapStateToProps, mapDispatchToProps) (Header);