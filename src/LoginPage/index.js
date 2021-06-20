import React,{ Component } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import { connect } from "react-redux";

import { loginAsync } from "../_actions";
import { userConstants } from "../_constants/auth.constants";

// import "./Login.css";

class LoginPage extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            username : '',
            password : ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if(localStorage.getItem("user")) {
            this.props.auth.authState = userConstants.LOGIN_SUCCESS
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name] : event.target.value,
        })
    }

    handleSubmit(event) {
        this.props.login(this.state)
        event.preventDefault();
    }
    
    render() {

        let authState;
        switch (this.props.auth.userAuthState) {
            case userConstants.LOGIN_SUCCESS : 
                authState = <Alert variant="success">You are already logged in</Alert>;
                break;
            case userConstants.LOGIN_REQUEST: 
                authState = <Alert variant="info">Wait for loggin to complete</Alert>;
                break;
            default: 
                authState = <Alert variant="warning">You are not logged in</Alert>;
        }

        return (
            <div className="container">
                {authState}<br />
                <Form  onSubmit={this.handleSubmit} className="w-50 mx-auto">
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" name="username" value={this.state.username} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"  name="password" value={this.state.password} onChange={this.handleChange}  />
                    </Form.Group>
                    <Button variant="outline-primary" type="submit" className="float-right">
                        Login
                    </Button>
                    <Button variant="outline-secondary" type="button" className="float-right mx-2" href="/register">
                        Register
                    </Button>
                </Form>
            </div>
        );

    }
}

const mapStateToProps = (state) => {
    return {
        auth : state.auth
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (loginData) => dispatch(loginAsync(loginData))
    };
}

export default connect(mapStateToProps, mapDispatchToProps) (LoginPage);
