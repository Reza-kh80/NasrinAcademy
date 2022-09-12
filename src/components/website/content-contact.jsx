import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { Helmet } from "react-helmet";
import SimpleReactValidator from 'simple-react-validator';

class Contacts extends Component {
    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator();
        this.state = {
            contactObject: [],
            apiEndPoint: process.env.REACT_APP_APIEndPoint,
            mediaEndMoint: process.env.REACT_APP_MediaEndPoint,
            emailObject: {
                fullName: "",
                sender: "",
                subject: "",
                message: ""
            },
            description: "",

        }
    }
    getcontact = async () => {
        await axios.get(this.state.apiEndPoint + 'Contact/Display').then(response => {
            this.setState({ contactObject: response.data });
            this.setState({ description: response.data.Description });

        });
    }
    componentDidMount() {
        this.getcontact();
    }
    handelChange = e => {
        e.persist();
        let emailObject = { ...this.state.emailObject };
        emailObject[e.currentTarget.name] = e.target.value;
        this.setState({ emailObject });
    }
    handelSubmit = () => {
        if (this.validator.allValid()) {
            axios.post(this.state.apiEndPoint + 'Contact/SendEmail', this.state.emailObject, {})
                .then(response => {
                    alert(response.data);
                    this.validator.hideMessages();
                    this.getcontact();
                })
                .catch(function (error) {
                    alert(error);
                })
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }
    getHeading = (lang, item) => {
        let heading = []
        if (lang === 'en') {
            heading.push(item.Title)
            heading.push(item.Description)
            heading.push("Full Name")
            heading.push("Contact Details")
            heading.push("Send Email")
            heading.push("Your Email Address")
            heading.push("Subject")
            heading.push("Message")
            heading.push("Send Email")
        }
        else if (lang === 'fr') {
            heading.push(item.TitleFr)
            heading.push(item.DescriptionFr)
            heading.push("Contactez les moyens")
            heading.push("Nom Complet")
            heading.push("Envoyer Email")
            heading.push("Votre Adresse Email")
            heading.push("Matière")
            heading.push("Message")
            heading.push("Envoyer Email")
        }
        else if (lang === 'fa') {
            heading.push(item.TitleFa)
            heading.push(item.DescriptionFa)
            heading.push("راههای تماس")
            heading.push("ارسال ایمیل")
            heading.push("نام و نام خانوادگی")
            heading.push("آدرس آیمیل حود را وارد نمایید")
            heading.push("عنوان ایمیل")
            heading.push("پیام خود را وارد نمایید")
            heading.push("ارسال")
        }
        else {
            heading.push(item.TitleFa)
            heading.push(item.DescriptionFa)
            heading.push("الاسم الكامل")
            heading.push("بيانات المتصل")
            heading.push("ارسل بريد الكتروني")
            heading.push("عنوان بريدك  الإلكتروني")
            heading.push("موضوعات")
            heading.push("رسالة")
            heading.push("ارسل بريد الكتروني")
        }
        return heading
    }
    render() {
        const { contactObject, emailObject, description } = this.state;
        const lang = localStorage.getItem('lang');
        return (
            <div className="p-0 m-0" >
                <Helmet>
                    <title>Contact Us</title>
                    <meta name="description" content={description.slice(0, 120)} />
                    <meta name="keywords" cpntent="private, teacher, online, french, class, in 8 month, tefaq, tcf, B2, C1 , french exams" />
                </Helmet>
                <Container fluid dir={lang === 'fa' || lang === 'ar' ? 'rtl' : 'ltr'}>
                    <Row className="mb-4">
                        <Col xs="12" className="m-0 p-0">
                            <Row>
                                <Col xs="12" className={lang === "fa" || lang === 'ar' ? "text-right m-0 p-2" : "m-0 p-2"}>
                                    <strong className={lang === "fa" || lang === 'ar' ? "text-right text-primary h5" : "text-primary h5"}>{this.getHeading(lang, contactObject)[0]}</strong>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="12" className={lang === "fa" || lang === 'ar' ? "text-right m-0 p-2" : "m-0 p-2"}>
                                    <p>{this.getHeading(lang, contactObject)[1]}</p>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row >
                    </Row>
                    <Row className="mb-4">
                        <Col xs="12" lg="4" className={lang === "fa" || lang === 'ar' ? "text-right m-0 p-0" : "m-0 p-0"}>
                            <strong className={lang === "fa" ? "text-right text-primary h5" : "text-primary h5"}>{this.getHeading(lang, contactObject)[2]}</strong>
                            <h6 className="p-1 text-black-50 mt-2"><span className="fa fa-envelope fa-lg" aria-hidden="true"> </span> <strong>{contactObject.Email}</strong> </h6>
                            <h6 className="p-1 text-black-50"><span className="fa fa-whatsapp fa-lg" aria-hidden="true"> </span> <strong>{contactObject.Phone}</strong> </h6>
                            <h6 className="p-1 text-black-50"><span className="fa fa-instagram fa-lg" aria-hidden="true"> </span> <strong>{contactObject.Instagram}</strong> </h6>
                            <h6 className="p-1 text-black-50"><span className="fa fa-telegram fa-lg" aria-hidden="true"> </span> <strong><a href={"https://t.me/french_professor"}>{contactObject.Telegram}</a></strong></h6>
                            <h6 className="p-1 text-black-50"><span className="fa fa-youtube fa-lg"></span> <strong>{contactObject.YouTube}</strong></h6>
                            <h6 className="p-1 text-black-50"><span className="fa fa-address-card fa-lg"></span> <strong>{contactObject.Address}</strong></h6>
                            <a href={"https://instagram.com/nasrin.academy"}><i className="bi bi-instagram mr-3" style={{ fontSize: '2rem' }}></i></a>
                            <a href={"https://t.me/french_professor"}><i className="bi bi-telegram mr-3" style={{ fontSize: '2rem' }}></i></a>
                            <a href={"https://wa.me/+989371073665"}><i className="bi bi-whatsapp mr-3" style={{ fontSize: '2rem' }}></i></a>
                            <a href={"https://youtube.com/nasrin.academy"}><i className="bi bi-youtube mr-3" style={{ fontSize: '2rem' }}></i></a>
                        </Col>
                        <Col xs="12" lg="8" className={lang === "fa" || lang === 'ar' ? "text-right m-0 p-0" : "m-0 p-0"}>
                            <strong className={lang === "fa" ? "text-right text-primary h5" : "text-primary h5"}>{this.getHeading(lang, contactObject)[3]}</strong>
                            <Form className="border rounded p-2 mt-2">
                                <Form.Group>
                                    <Form.Label htmlFor="fullname"><h6 className="text-primary mb-0 ml-1 mt-3" >{this.getHeading(lang, contactObject)[4]}:</h6></Form.Label>
                                    <Form.Control id="fullname" name="fullName" type="text" placeholder={this.getHeading(lang, contactObject)[4]} value={emailObject.fullName} onChange={this.handelChange} />
                                    {this.validator.message('full name', emailObject.fullName, 'required|max:50', { className: 'alert alert-danger' })}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor="sender"><h6 className="text-primary mb-0 ml-1" >{this.getHeading(lang, contactObject)[5]}:</h6></Form.Label>
                                    <Form.Control id="sender" name="sender" type="text" placeholder={this.getHeading(lang, contactObject)[5]} value={emailObject.sender} onChange={this.handelChange} />
                                    {this.validator.message('email', emailObject.sender, 'required|email', { className: 'alert alert-danger' })}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor="subject"><h6 className="text-primary mb-0 ml-1" >{this.getHeading(lang, contactObject)[6]}:</h6></Form.Label>
                                    <Form.Control id="subject" name="subject" type="text" placeholder={this.getHeading(lang, contactObject)[6]} value={emailObject.subject} onChange={this.handelChange} />
                                    {this.validator.message('subject', emailObject.subject, 'required|max:100', { className: 'alert alert-danger' })}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor="message"><h6 className="text-primary mb-0 ml-1" >{this.getHeading(lang, contactObject)[7]}:</h6></Form.Label>
                                    <Form.Control id="message" name="message" as="textarea" placeholder={this.getHeading(lang, contactObject)[7]} rows={8} value={emailObject.message} onChange={this.handelChange} />
                                    {this.validator.message('message', emailObject.message, 'required|max:1000', { className: 'alert alert-danger' })}
                                </Form.Group>
                                <div className={lang === "fa" ? "text-left m-0 p-0" : "text-right m-0 p-0"}>
                                    <Button className="btn btn-xs" onClick={this.handelSubmit} >{this.getHeading(lang, contactObject)[8]}</Button>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>

        );
    }
}
export default Contacts;

// {lang === "fa" ? "btn btn-xs align-self-start" : "btn btn-xs align-self-start"}