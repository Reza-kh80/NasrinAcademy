import React, { Component } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { Container, Row, Col, Button } from 'reactstrap';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { getDatetime } from './../../utils/datetime';
class DashboardRegister extends Component {
    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator();
        this.state = {
            registerObject: {
                RegisterId: "",
                Title1: "",
                Title1Fr: "",
                Title1Fa: "",
                Description1: "",
                Description1Fr: "",
                Description1Fa: "",
                Title2: "",
                Title2Fr: "",
                Title2Fa: "",
                Description2: "",
                Description2Fr: "",
                Description2Fa: "",
                Title3: "",
                Title3Fr: "",
                Title3Fa: "",
                Description3: "",
                Description3Fr: "",
                Description3Fa: "",
                Email: "",
                Phone: "",
                Modifier: "Nasrin Daftarchi",
                ModificationDate: getDatetime(),
                IsDeleted: false,
            },
            apiEndPoint: process.env.REACT_APP_APIEndPoint,
        }
    }
    getRegister = async () => {
        await axios.get(this.state.apiEndPoint + 'Register/Get').then(response => {
            this.setState({ registerObject: response.data });
        });
    }
    componentDidMount() {
        this.getRegister();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.registerObject !== this.state.registerObject) {
        }
    }
    handleChange = e => {
        e.persist();
        let registerObject = { ...this.state.registerObject };
        registerObject[e.currentTarget.name] = e.target.value;
        this.setState({ registerObject });
    }
    setCurrentTime = () => {
        let registerObject = { ...this.state.registerObject };
        registerObject.ModificationDate = getDatetime();
        this.setState({ registerObject });
    }
    handelSubmit = () => {
        if (this.validator.allValid()) {
            this.setCurrentTime();
            axios.post(this.state.apiEndPoint + 'Register/Add', this.state.registerObject, {})
                .then(response => {
                    alert('You submitted the form and stuff!');
                    this.validator.hideMessages();
                    this.getRegister();
                })
                .catch(function (error) {
                    alert('Something went wrong!');
                })
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }
    render() {
        const {
            Title1,
            Title1Fr,
            Title1Fa,
            Description1,
            Description1Fr,
            Description1Fa,
            Title2,
            Title2Fr,
            Title2Fa,
            Description2,
            Description2Fr,
            Description2Fa,
            Title3,
            Title3Fr,
            Title3Fa,
            Description3,
            Description3Fr,
            Description3Fa,
            Email,
            Phone,
        } = this.state.registerObject;
        return (<div>
            <Container fluid className="table">
                <Row className="mb-2">
                    <Col xs="12" className="text-left text-dark p-0" >
                        <h3 className="text-primary"> Register</h3>
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col sm="12" md="12" className="text-left border border-primary p-3 rounded">
                        <div>
                            <Form onSubmit={this.handelSubmit}>
                                <Row>
                                    <Col sm="12" md="4" >
                                        <Form.Group>
                                            <Form.Label htmlFor="email"><h6 className="text-primary mb-0 ml-1" >Register Email:</h6></Form.Label>
                                            <Form.Control id="email" name="Email" type="text" placeholder="Enter Register Email" value={Email} onChange={this.handleChange} />
                                            {this.validator.message('email', Email, 'required|email', { className: 'alert alert-danger' })}
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label htmlFor="phone"><h6 className="text-primary mb-0 ml-1" >Register Phone:</h6></Form.Label>
                                            <Form.Control id="phone" name="Phone" type="text" placeholder="Enter Register Phone" value={Phone} onChange={this.handleChange} />
                                            {this.validator.message('phone', Phone, 'required', { className: 'alert alert-danger' })}
                                        </Form.Group>

                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="12" md="4">
                                        <Form.Group>
                                            <Form.Label htmlFor="title1"><h6 className="text-primary mb-0 ml-1" >Register Title 1 (English):</h6></Form.Label>
                                            <Form.Control id="title1" name="Title1" type="text" placeholder="Title 1 (English)" value={Title1} onChange={this.handleChange} />
                                            {this.validator.message('title 1', Title1, 'required|max:290', { className: 'alert alert-danger' })}
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label htmlFor="description1"><h6 className="text-primary mb-0 ml-1" >Register Description 1 (English):</h6></Form.Label>
                                            <Form.Control id="description1" name="Description1" as="textarea" className="wrap" placeholder="Description 1 (English)" rows={15} value={Description1} onChange={this.handleChange} />
                                            {this.validator.message('description 1', Description1, 'required|max:8000', { className: 'alert alert-danger' })}
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label htmlFor="title2"><h6 className="text-primary mb-0 ml-1" >Register Title 2 (English):</h6></Form.Label>
                                            <Form.Control id="title2" name="Title2" type="text" placeholder="Title 2 (English)" value={Title2} onChange={this.handleChange} />
                                            {this.validator.message('title 2', Title2, 'required|max:290', { className: 'alert alert-danger' })}
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label htmlFor="description2"><h6 className="text-primary mb-0 ml-1" >Register Description 2 (English):</h6></Form.Label>
                                            <Form.Control id="description2" name="Description2" as="textarea" className="wrap" placeholder="Description 2 (English)" rows={15} value={Description2} onChange={this.handleChange} />
                                            {this.validator.message('description 2', Description2, 'required|max:8000', { className: 'alert alert-danger' })}
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label htmlFor="title3"><h6 className="text-primary mb-0 ml-1" >Register Title 3 (English):</h6></Form.Label>
                                            <Form.Control id="title3" name="Title3" type="text" placeholder="Title 3 (English)" value={Title3} onChange={this.handleChange} />
                                            {this.validator.message('title 3', Title3, 'required|max:290', { className: 'alert alert-danger' })}
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label htmlFor="description3"><h6 className="text-primary mb-0 ml-1" >Register Description 3 (English):</h6></Form.Label>
                                            <Form.Control id="description3" name="Description3" as="textarea" className="wrap" placeholder="Description 3 (English)" rows={15} value={Description3} onChange={this.handleChange} />
                                            {this.validator.message('description 3', Description3, 'required|max:8000', { className: 'alert alert-danger' })}
                                        </Form.Group>
                                    </Col>
                                    <Col sm="12" md="4">
                                        <Form.Group>
                                            <Form.Label htmlFor="title1fr"><h6 className="text-primary mb-0 ml-1" >Register Title 1 (French):</h6></Form.Label>
                                            <Form.Control id="title1fr" name="Title1Fr" type="text" placeholder="Title 1 (French)" value={Title1Fr} onChange={this.handleChange} />
                                            {this.validator.message('title 1 French', Title1Fr, 'required|max:290', { className: 'alert alert-danger' })}
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label htmlFor="description1fr"><h6 className="text-primary mb-0 ml-1" >Register Description 1 (French):</h6></Form.Label>
                                            <Form.Control id="description1fr" name="Description1Fr" as="textarea" className="wrap" placeholder="Description 1 (French)" rows={15} value={Description1Fr} onChange={this.handleChange} />
                                            {this.validator.message('description 1 french', Description1Fr, 'required|max:8000', { className: 'alert alert-danger' })}
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label htmlFor="title2fr"><h6 className="text-primary mb-0 ml-1" >Register Title 2 (French):</h6></Form.Label>
                                            <Form.Control id="title2fr" name="Title2Fr" type="text" placeholder="Title 2 (French)" value={Title2Fr} onChange={this.handleChange} />
                                            {this.validator.message('title 2 French', Title2Fr, 'required|max:290', { className: 'alert alert-danger' })}
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label htmlFor="description2fr"><h6 className="text-primary mb-0 ml-1" >Register Description 2 (French):</h6></Form.Label>
                                            <Form.Control id="description2fr" name="Description2Fr" as="textarea" className="wrap" placeholder="Description 2 (French)" rows={15} value={Description2Fr} onChange={this.handleChange} />
                                            {this.validator.message('description 2 french', Description2Fr, 'required|max:8000', { className: 'alert alert-danger' })}
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label htmlFor="title3fr"><h6 className="text-primary mb-0 ml-1" >Register Title 3 (French):</h6></Form.Label>
                                            <Form.Control id="title3fr" name="Title3Fr" type="text" placeholder="Title 3 (French)" value={Title3Fr} onChange={this.handleChange} />
                                            {this.validator.message('title 3 French', Title3Fr, 'required|max:290', { className: 'alert alert-danger' })}
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label htmlFor="description3fr"><h6 className="text-primary mb-0 ml-1" >Register Description 3 (French):</h6></Form.Label>
                                            <Form.Control id="description3fr" name="Description3Fr" as="textarea" className="wrap" placeholder="Description 3 (French)" rows={15} value={Description3Fr} onChange={this.handleChange} />
                                            {this.validator.message('description 3 french', Description3Fr, 'required|max:8000', { className: 'alert alert-danger' })}
                                        </Form.Group>
                                    </Col>
                                    <Col sm="12" md="4">
                                        <Form.Group>
                                            <Form.Label htmlFor="title1fa"><h6 className="text-primary mb-0 ml-1" >Register Title 1 (Farsi):</h6></Form.Label>
                                            <Form.Control id="title1fa" name="Title1Fa" type="text" dir="rtl" placeholder="عنوان فارسی 1" value={Title1Fa} onChange={this.handleChange} />
                                            {this.validator.message('title 1 Farsi', Title1Fa, 'required|max:290', { className: 'alert alert-danger' })}
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label htmlFor="description1fa"><h6 className="text-primary mb-0 ml-1" >Register Description 1 (Farsi):</h6></Form.Label>
                                            <Form.Control id="description1fa" name="Description1Fa" as="textarea" className="wrap" dir="rtl" placeholder="توضیحات فارسی 1" rows={15} value={Description1Fa} onChange={this.handleChange} />
                                            {this.validator.message('description 1 farsi', Description1Fa, 'required|max:8000', { className: 'alert alert-danger' })}
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label htmlFor="title2fa"><h6 className="text-primary mb-0 ml-1" >Register Title 2 (Farsi):</h6></Form.Label>
                                            <Form.Control id="title2fa" name="Title2Fa" type="text" dir="rtl" placeholder="عنوان فارسی 2" value={Title2Fa} onChange={this.handleChange} />
                                            {this.validator.message('title 2 Farsi', Title2Fa, 'required|max:290', { className: 'alert alert-danger' })}
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label htmlFor="description2fa"><h6 className="text-primary mb-0 ml-1" >Register Description 2 (Farsi):</h6></Form.Label>
                                            <Form.Control id="description2fa" name="Description2Fa" as="textarea" className="wrap" dir="rtl" placeholder="توضیحات فارسی 2" rows={15} value={Description2Fa} onChange={this.handleChange} />
                                            {this.validator.message('description 2 farsi', Description2Fa, 'required|max:8000', { className: 'alert alert-danger' })}
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label htmlFor="title3fa"><h6 className="text-primary mb-0 ml-1" >Register Title 3 (Farsi):</h6></Form.Label>
                                            <Form.Control id="title3fa" name="Title3Fa" type="text" dir="rtl" placeholder="عنوان فارسی 3" value={Title3Fa} onChange={this.handleChange} />
                                            {this.validator.message('title 3 Farsi', Title3Fa, 'required|max:290', { className: 'alert alert-danger' })}
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label htmlFor="description3fa"><h6 className="text-primary mb-0 ml-1" >Register Description 3 (Farsi):</h6></Form.Label>
                                            <Form.Control id="description3fa" name="Description3Fa" as="textarea" className="wrap" dir="rtl" placeholder="توضیحات فارسی 3" rows={15} value={Description3Fa} onChange={this.handleChange} />
                                            {this.validator.message('description 3 farsi', Description3Fa, 'required|max:8000', { className: 'alert alert-danger' })}
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Form>
                            <Button className="btn btn-sm float-right" onClick={this.handelSubmit} >
                                Submit Register
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>);
    }
}
export default DashboardRegister;
