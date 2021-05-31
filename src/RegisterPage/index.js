import React,{ Component } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { connect } from "react-redux";

import { register } from "../_actions";

class RegisterPage extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            username : '',
            email : '',
            password : ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name] : event.target.value,
        })
    }

    handleSubmit(event) {
        this.props.register(this.state)
        event.preventDefault();
    }
    
    render() {
        return (
            <div className="container">
                <h2 className="text-center">Register</h2>
                <Form  onSubmit={this.handleSubmit} className="w-50 mx-auto">
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="email" value={this.state.email} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" name="username" value={this.state.username} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"  name="password" value={this.state.password} onChange={this.handleChange}  />
                    </Form.Group>
                    <Button variant="outline-primary" type="submit" className="float-right">
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
        register: (registerData) => dispatch(register(registerData))
    };
}

export default connect(mapStateToProps, mapDispatchToProps) (RegisterPage);