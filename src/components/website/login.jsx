import React, { Component } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Button, Row, Col } from 'reactstrap';
import SimpleReactValidator from 'simple-react-validator';
class Login extends Component {
    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator();
        this.state = {
            contactObject: [],
            apiEndPoint: process.env.REACT_APP_APIEndPoint,
            userObject: {
                Email: '',
                Password: "",
            },
            // token: "",
            errorMessage: ""
        }
    }
    componentDidMount() {
        // localStorage.setItem('token', '')
        this.setState({ errorMessage: "" })
    }
    componentDidUpdate(prevState) {
        if (prevState.token !== this.state.token) {
        }
    }
    handleLogin = (user, token) => {
        if (user.IsAuthorized === true && user.RoleName === 'Admin') {
            localStorage.setItem('token', token)
            this.props.onHide();
            window.location = "#/dashboard";
        }
        else if (user.IsAuthorized === true && user.RoleName === 'Dean') {
            localStorage.setItem('token', token)
            this.props.onHide();
            window.location = "#/dean";
        }
        else if (user.IsAuthorized === true && user.RoleName === 'Teacher') {
            localStorage.setItem('token', token)
            this.props.onHide();
            window.location = "#/teacher";
        }
        else if (user.IsAuthorized === true && user.RoleName === 'Student') {
            localStorage.setItem('token', token)
            this.props.onHide();
            window.location = "#/student";
        }
        else {
            this.setState({ errorMessage: "Sorry, information does not mach your profile" })
        }
    }
    handelChange = e => {
        e.persist();
        let userObject = { ...this.state.userObject };
        userObject[e.currentTarget.name] = e.currentTarget.name === "Password" ? e.target.value : e.target.value.toLowerCase();
        this.setState({ userObject });
        this.setState({ errorMessage: "" })
    }
    handleSubmit = () => {
        const { apiEndPoint, userObject } = this.state;
        if (this.validator.allValid()) {
            axios({
                method: 'post',
                url: apiEndPoint + 'User/Login',
                data: {
                    Username: userObject.Email,
                    Password: userObject.Password
                }
            }).then(response => {
                const user = jwt_decode(response.data)
                this.handleLogin(user, response.data)
            }
            )
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }
    render() {
        const { userObject, errorMessage } = this.state;
        return (
            <div >
                <Modal
                    {...this.props}
                    size="lg"
                    // show={show}
                    // onHide={onHide}
                    backdrop="static"
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                    <Modal.Header closeButton className="loginHeader">
                        <Row className="align-items-center">
                            <Col xs="2" className="text-center">
                                <img src="main-images/logo-circle.webp" width="100%" height="100%" alt="logo" />
                            </Col>
                            <Col xs="10" className="text-left m-0 p-0 ">
                                <Modal.Title id="example-modal-sizes-title-lg" className="h4 font-weight-bold text-white">Login to Portals</Modal.Title>
                            </Col>
                        </Row>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            {errorMessage !== '' && <div className="alert alert-danger">{errorMessage}</div>}
                            <Form.Group>
                                <Form.Label htmlFor="email"><h6 className="text-primary mb-0 ml-1" >Username: (Email)</h6></Form.Label>
                                <Form.Control id="email" name="Email" type="text" placeholder="Enter your email address" value={userObject.Email} onChange={this.handelChange} />
                                {this.validator.message('email', userObject.Email, 'required|email', { className: 'alert alert-danger' })}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label htmlFor="password"><h6 className="text-primary mb-0 ml-1" >Password:</h6></Form.Label>
                                <Form.Control id="password" name="Password" type="password" placeholder="Enter your password" value={userObject.Password} onChange={this.handelChange} />
                                {this.validator.message('password', userObject.Password, 'required', { className: 'alert alert-danger' })}
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.onHide}>Close</Button>
                        <Button type="submit" onClick={this.handleSubmit}  >Login</Button>
                    </Modal.Footer>
                </Modal>
            </div>

        );
    }
}
export default Login;