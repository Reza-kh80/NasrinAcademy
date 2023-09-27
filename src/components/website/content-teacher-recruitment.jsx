import React, { Component, Suspense } from 'react';
import { Container, Row, Col, Spinner } from 'reactstrap';
import axios from 'axios';
import { Helmet } from "react-helmet";
import RecruitmentRequest from './recruitment-request';

class TeacherRecruitment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teacherRecruitmentObject: [],
            apiEndPoint: process.env.REACT_APP_APIEndPoint,
            mediaEndMoint: process.env.REACT_APP_MediaEndPoint,
            description: "",
        }
    }
    getteacherRecruitment = async () => {
        await axios.get(this.state.apiEndPoint + 'TeacherRecruitment/Display').then(response => {
            this.setState({ teacherRecruitmentObject: response.data });
            this.setState({ description: response.data.Description });
        });
    }
    componentDidMount() {
        this.getteacherRecruitment();
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
        else if (lang === 'fa') {
            heading.push(item.TitleFa)
            heading.push(item.DescriptionFa)
        } else {
            heading.push(item.TitleFa)
            heading.push(item.DescriptionFa)
        }
        return heading
    }
    render() {
        const { teacherRecruitmentObject, description } = this.state;
        const lang = localStorage.getItem('lang');
        return (
            <div className="p-0 m-0" >
                <Helmet>
                    <title>Teacher Recruitment</title>
                    <meta name="description" content={description.slice(0, 120)} />
                    <meta name="keywords" cpntent="private, teacher, online, french, class, in 8 month, tefaq, tcf, B2, C1 , french exams" />
                </Helmet>
                <Container fluid dir={lang === 'fa' || lang === 'ar' ? 'rtl' : 'ltr'}>
                    <Row className="mb-4">
                        <Col xs="12" className="m-0 p-0">
                            <Row>
                                <Col xs="12" className={lang === "fa" ? "text-right m-0 p-2" : "m-0 p-2"}>
                                    <strong className={lang === "fa" ? "text-right text-primary h5" : "text-primary h5"}>{this.getHeading(lang, teacherRecruitmentObject)[0]}</strong>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="12" className={lang === "fa" ? "text-right m-0 p-2" : "m-0 p-2"}>
                                    <p>{this.getHeading(lang, teacherRecruitmentObject)[1]}</p>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row >
                        <Col xs="12">
                            <Suspense fallback={<Spinner color="success" />}>
                                <RecruitmentRequest />
                            </Suspense>
                        </Col>
                    </Row>
                </Container>
            </div>

        );
    }
}
export default TeacherRecruitment;