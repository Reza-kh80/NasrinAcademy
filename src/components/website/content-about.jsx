import React, { Component } from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
import axios from 'axios';
import { Helmet } from "react-helmet";
class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mediaEndMoint: process.env.REACT_APP_MediaEndPoint,
            aboutList: [],
            apiEndPoint: process.env.REACT_APP_APIEndPoint,
            description: "",
        }
    }
    getAbout = async () => {
        await axios.get(this.state.apiEndPoint + 'About/DisplayAll').then(response => {
            this.setState({ aboutList: response.data });
            this.setState({ description: response.data[0].Description });
        });
    }
    componentDidMount() {
        this.getAbout();
    }
    setMedia = (fileName, title) => {
        let url = this.state.mediaEndMoint + 'About/' + fileName
        if (fileName.split('.').pop() === "mp4") {
            return <video controls preload="none" className="img-thumbnail" src={url} poster="main-images/video-poster.jpg" width="100%" height="100%" type="video/mp4" />
        }
        else {
            return <img className="img-thumbnail d-block w-100" width="100%" height="100%" src={url} alt={title + "Image"} />
        }
    }
    getHeading = (lang, item) => {
        let heading = []
        if (lang === 'en') {
            heading.push(item.Title)
            heading.push(item.Description)
        }
        else if (lang === 'fr') {
            heading.push(item.TitleFr)
            heading.push(item.DescriptionFr)
        }
        else {
            heading.push(item.TitleFa)
            heading.push(item.DescriptionFa)
        }
        heading.push(item.FileName)
        return heading
    }
    render() {
        const { aboutList, description } = this.state;
        const lang = localStorage.getItem('lang');
        return (
            <div className="p-0 m-0">
                <Helmet>
                    <title>About Us</title>
                    <meta name="description" content={description.slice(0, 120)} />
                    <meta name="keywords" cpntent="private, teacher, online, french, class, in 8 month, tefaq, tcf, B2, C1 , french exams" />
                </Helmet>
                {aboutList.map((item, index) =>
                    <Container key={index} fluid dir={lang === 'fa' ? 'rtl' : 'ltr'}>
                        <Row className="mb-4">
                            <Col sm="12" className="p-0 ">
                                <Card>
                                    <CardHeader className={lang === "fa" ? "text-right text-primary h5-lg font-weight-bold" : "text-primary h5-lg font-weight-bold"}>{this.getHeading(lang, item)[0]}</CardHeader>
                                    <CardBody>
                                        <Row>
                                            <Col sm="12" md="9" className={lang === 'fa' ? 'text-right p-0 m-0' : "p-0 m-0"}>
                                                <p>{this.getHeading(lang, item)[1]}</p>
                                            </Col>
                                            <Col sm="12" md="3">
                                                {this.setMedia(this.getHeading(lang, item)[2], this.getHeading(lang, item)[0])}
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                )}
            </div>);
    }
}

export default About;