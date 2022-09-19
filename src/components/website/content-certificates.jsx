import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Helmet } from "react-helmet";
import Card from 'react-bootstrap/Card';

function Certificates() {

    const lang = localStorage.getItem('lang');

    const getHeading = (lang) => {
        let heading = [];
        if (lang === 'en') {
            heading.push('Certificates');
        }

        if (lang === 'fa') {
            heading.push('گواهی ها');
        }

        if (lang === 'fr') {
            heading.push('Certificats');
        }

        if (lang === 'ar') {
            heading.push('الشهادات');
        }
        return heading;
    }

    return (
        <div className="p-0 m-0">
            <Helmet>
                <title>Teachers</title>
                <meta name="description" content='h' />
                <meta name="keywords" cpntent="private, teacher, online, french, class, in 8 month, tefaq, tcf, B2, C1 , french exams" />
            </Helmet>
            <Container fluid dir={lang === 'fa' || lang === 'ar' ? 'rtl' : 'ltr'}>
                <Row className="mb-4">
                    <Col xs="12" className="m-0 p-0">
                        <Row>
                            <Col xs="12" className={lang === "fa" || lang === 'ar' ? "text-right m-0 p-2" : "m-0 p-2"}>
                                <strong className={lang === "fa" || lang === 'ar' ? "text-right text-primary h5" : "text-primary h5"}>{getHeading(lang)[0]}</strong>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12" className={lang === "fa" || lang === 'ar' ? "text-right m-0 p-2 text-center" : "m-0 p-2 text-center"}
                                style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", alignItems: "stretch", alignContent: "stretch" }}
                            >
                                {/* <Card style={{ width: '25rem' }}>
                                    <Card.Img src="main-images/Certificates.jpeg" />
                                </Card>
                                <Card style={{ width: '25rem' }}>
                                    <Card.Img src="main-images/Certificates1.jpg" />
                                </Card> */}
                                <Card style={{ width: '25rem' }}>
                                    <Card.Img src="main-images/Certificates2.jpg" />
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Certificates;