import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';
import { Helmet } from "react-helmet";
class RegisterProcedure extends Component {
    constructor(props) {
        super(props);
        this.state = {
            registerObject: [],
            apiEndPoint: process.env.REACT_APP_APIEndPoint,
            mediaEndMoint: process.env.REACT_APP_MediaEndPoint,
            description: "",
        }

    }
    getRegister = async () => {
        await axios.get(this.state.apiEndPoint + 'Register/Display').then(response => {
            this.setState({ registerObject: response.data });
            this.setState({ description: response.data.Description1 });
        });
    }
    componentDidMount() {
        this.getRegister();
    }
    getHeading = (lang, item) => {
        let heading = []
        if (lang === 'en') {
            heading.push(item.Title1)
            heading.push(item.Description1)
            heading.push(item.Title2)
            heading.push(item.Description2)
            heading.push(item.Title3)
            heading.push(item.Description3)

        }
        else if (lang === 'fr') {
            heading.push(item.Title1Fr)
            heading.push(item.Description1Fr)
            heading.push(item.Title2Fr)
            heading.push(item.Description2Fr)
            heading.push(item.Title3Fr)
            heading.push(item.Description3Fr)
        }
        else if (lang === 'fa') {
            heading.push(item.Title1Fa)
            heading.push(item.Description1Fa)
            heading.push(item.Title2Fa)
            heading.push(item.Description2Fa)
            heading.push(item.Title3Fa)
            heading.push(item.Description3Fa)
        } 
        return heading
    }
    render() {
        const { registerObject, description } = this.state;
        const lang = localStorage.getItem('lang');
        return (
            <div className="p-0 m-0">
                <Helmet>
                    <title>Register</title>
                    <meta name="description" content={description.slice(0, 120)} />
                    <meta name="keywords" cpntent="private, teacher, online, french, class, in 8 month, tefaq, tcf, B2, C1 , french exams" />
                </Helmet>
                <Container fluid dir={lang === 'fa' ? 'rtl' : 'ltr'}>
                    <Row className="mb-4">
                        <Col xs="12" className={lang === "fa" ? "text-right m-0 p-0" : "m-0 p-0"}>
                            <strong className={lang === "fa" ? "text-right text-primary h5" : "text-primary h5"}>{this.getHeading(lang, registerObject)[0]}</strong>
                            <p>{this.getHeading(lang, registerObject)[1]}</p>
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col xs="12" dir={lang === "fa" ? "rtl" : "ltr"} className={lang === "fa" ? "text-right text-primary h5" : "text-primary h5"}>
                            <span className="fa fa-whatsapp fa-sm"></span> <h6 className="font-weight-bold text-primary d-inline">{registerObject.Phone}</h6>
                        </Col>
                        <Col xs="12" dir={lang === "fa" ? "rtl" : "ltr"} className={lang === "fa" ? "text-right text-primary h5" : "text-primary h5"}>
                            <span className="fa fa-envelope fa-sm"></span> <h6 className="font-weight-bold text-primary d-inline">{registerObject.Email}</h6>
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col xs="12" className={lang === "fa" ? "text-right m-0 p-0" : "m-0 p-0"}>
                            <strong className={lang === "fa" ? "text-right text-primary h5" : "text-primary h5"}>{this.getHeading(lang, registerObject)[2]}</strong>
                            <p>{this.getHeading(lang, registerObject)[3]}</p>
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col xs="12" className={lang === "fa" ? "text-right m-0 p-0" : "m-0 p-0"}>
                            <strong className={lang === "fa" ? "text-right text-primary h5" : "text-primary h5"}>{this.getHeading(lang, registerObject)[4]}</strong>
                            <p>{this.getHeading(lang, registerObject)[5]}</p>
                        </Col>
                    </Row>
                </Container>
            </div>

        );
    }
}
export default RegisterProcedure;