import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { getDatetime } from './../../utils/datetime';
import SimpleReactValidator from 'simple-react-validator';
class DashboardContact extends Component {
    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator();
        this.state = {
            contactObject: {
                ContactId: "",
                Title: "",
                TitleFr: "",
                TitleFa: "",
                Description: "",
                DescriptionFr: "",
                DescriptionFa: "",
                Email: "",
                Phone: "",
                Instagram: "",
                Telegram: "",
                YouTube: "",
                Address: "",
                Modifier: "Nasrin Daftarchi",
                ModificationDate: getDatetime(),
                IsDeleted: false,
            },
            apiEndPoint: process.env.REACT_APP_APIEndPoint,
        }
    }
    getContact = async () => {
        await axios.get(this.state.apiEndPoint + 'Contact/Get').then(response => {
            this.setState({ contactObject: response.data });
        });
    }
    componentDidMount() {
        this.getContact();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.contactObject !== this.state.contactObject) {
        }
    }
    handleChange = e => {
        e.persist();
        let contactObject = { ...this.state.contactObject };
        contactObject[e.currentTarget.name] = e.target.value;
        this.setState({ contactObject });
    }
    setCurrentTime = () => {
        let contactObject = { ...this.state.contactObject };
        contactObject.ModificationDate = getDatetime();
        this.setState({ contactObject });
    }
    handelSubmit = () => {
        if (this.validator.allValid()) {
            this.setCurrentTime();
            axios.post(this.state.apiEndPoint + 'Contact/Add', this.state.contactObject, {})
                .then(response => {
                    alert('You submitted the form and stuff!');
                    this.validator.hideMessages();
                    this.getContact();
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
            Title, TitleFr, TitleFa,
            Description, DescriptionFr, DescriptionFa,
            Email,
            Phone,
            Instagram,
            Telegram,
            YouTube,
            Address, } = this.state.contactObject;
        return (<div>
            <Container fluid className="table">
                <Row className="mb-2">
                    <Col xs="12" className="text-left text-dark p-0" >
                        <h3 className="text-primary"> Contact</h3>
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col sm="12" md="12" className="text-left border border-primary p-3 rounded">
                        <div>
                            <Form onSubmit={this.handelSubmit}>
                                <Row>
                                    <Col sm="12" md="6">
                                        <Form.Group>
                                            <Form.Label htmlFor="englishTitle"><h6 className="text-primary mb-0 ml-1" >Contact Title (English):</h6></Form.Label>
                                            <Form.Control id="englishTitle" name="Title" type="text" placeholder="English Title" value={Title} onChange={this.handleChange} />
                                            {this.validator.message('english title', Title, 'required|max:180', { className: 'alert alert-danger' })}
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label htmlFor="englishDescription"><h6 className="text-primary mb-0 ml-1" >Contact Description (English):</h6></Form.Label>
                                            <Form.Control id="englishDescription" name="Description" as="textarea" placeholder="Enter Contact Description" rows={4} value={Description} onChange={this.handleChange} />
                                            {this.validator.message('english description', Description, 'required|max:3800', { className: 'alert alert-danger' })}
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label htmlFor="frenchTitle"><h6 className="text-primary mb-0 ml-1" >Contact Title (French):</h6></Form.Label>
                                            <Form.Control id="frenchTitle" name="TitleFr" type="text" placeholder="French Title" value={TitleFr} onChange={this.handleChange} />
                                            {this.validator.message('french title', TitleFr, 'required|max:180', { className: 'alert alert-danger' })}
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label htmlFor="frenchDescription"><h6 className="text-primary mb-0 ml-1" >Contact Description:</h6></Form.Label>
                                            <Form.Control id="frenchDescription" name="DescriptionFr" as="textarea" placeholder="French Description" rows={4} value={DescriptionFr} onChange={this.handleChange} />
                                            {this.validator.message('french description', DescriptionFr, 'required|max:3800', { className: 'alert alert-danger' })}
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label htmlFor="farsiTitle"><h6 className="text-primary mb-0 ml-1" >Contact Title (Farsi):</h6></Form.Label>
                                            <Form.Control id="FarsiTitle" name="TitleFa" type="text" dir="rtl" placeholder="عنوان فارسی" value={TitleFa} onChange={this.handleChange} />
                                            {this.validator.message('farsi title', TitleFa, 'required|max:180', { className: 'alert alert-danger' })}
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label htmlFor="description"><h6 className="text-primary mb-0 ml-1" >Contact Description (Farsi):</h6></Form.Label>
                                            <Form.Control id="description" name="DescriptionFa" as="textarea" dir="rtl" placeholder="توضیحات فارسی" rows={4} value={DescriptionFa} onChange={this.handleChange} />
                                            {this.validator.message('description', DescriptionFa, 'required|max:3800', { className: 'alert alert-danger' })}
                                        </Form.Group>

                                    </Col>
                                    <Col sm="12" md="6">
                                        <Form.Group>
                                            <Form.Label htmlFor="Email"><h6 className="text-primary mb-0 ml-1" >Email:</h6></Form.Label>
                                            <Form.Control id="Email" name="Email" type="text" placeholder="Enter Email" value={Email} onChange={this.handleChange} />
                                            {this.validator.message('email', Email, 'required|email', { className: 'alert alert-danger' })}
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label htmlFor="Phone"><h6 className="text-primary mb-0 ml-1" >Phone:</h6></Form.Label>
                                            <Form.Control id="Phone" name="Phone" type="text" placeholder="Enter Phone" value={Phone} onChange={this.handleChange} />
                                            {this.validator.message('Phone', Phone, 'required', { className: 'alert alert-danger' })}
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label htmlFor="Instagram"><h6 className="text-primary mb-0 ml-1" >Instagram:</h6></Form.Label>
                                            <Form.Control id="Instagram" name="Instagram" type="text" placeholder="Enter Instagram" value={Instagram} onChange={this.handleChange} />
                                            {this.validator.message('Instagram', Instagram, 'required', { className: 'alert alert-danger' })}
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label htmlFor="Telegram"><h6 className="text-primary mb-0 ml-1" >Telegram:</h6></Form.Label>
                                            <Form.Control id="Telegram" name="Telegram" type="text" placeholder="Enter Telegram" value={Telegram} onChange={this.handleChange} />
                                            {this.validator.message('Telegram', Telegram, 'required', { className: 'alert alert-danger' })}
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label htmlFor="YouTube"><h6 className="text-primary mb-0 ml-1" >YouTube:</h6></Form.Label>
                                            <Form.Control id="YouTube" name="YouTube" type="text" placeholder="Enter YouTube" value={YouTube} onChange={this.handleChange} />
                                            {this.validator.message('YouTube', YouTube, 'required', { className: 'alert alert-danger' })}
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label htmlFor="Address"><h6 className="text-primary mb-0 ml-1" >Contact Address:</h6></Form.Label>
                                            <Form.Control id="Address" name="Address" type="text" placeholder="Enter Contact Address" value={Address} onChange={this.handleChange} />
                                            {this.validator.message('address', Address, 'required|max:100', { className: 'alert alert-danger' })}
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Form>
                            <Button className="btn btn-sm float-right" onClick={this.handelSubmit} >
                                Submit Contact
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>);
    }
}
export default DashboardContact;
