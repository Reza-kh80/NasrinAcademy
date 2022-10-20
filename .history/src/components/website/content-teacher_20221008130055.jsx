import React, { Component, Suspense } from 'react';
import { Container, Row, Col, Spinner } from 'reactstrap';
import axios from 'axios';
import { Helmet } from "react-helmet";
const TeacherList = React.lazy(() => import('./teacher-list'));

class TeacherOutlook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teacherOutlookObject: [],
            apiEndPoint: process.env.REACT_APP_APIEndPoint,
            mediaEndMoint: process.env.REACT_APP_MediaEndPoint,
            description: "",
        }
    }
    getteacherOutlook = async () => {
        await axios.get(this.state.apiEndPoint + 'TeacherOutlook/Display').then(response => {
            this.setState({ teacherOutlookObject: response.data });
            this.setState({ description: response.data.Description });
        });
    }
    componentDidMount() {
        // this.getteacherOutlook();
        axios.get(this.state.apiEndPoint + 'TeacherOutlook/Display').then(response => {
            this.setState({ teacherOutlookObject: response.data });
            this.setState({ description: response.data.Description });
        });
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
        const { teacherOutlookObject, description } = this.state;
        const lang = localStorage.getItem('lang') ? localStorage.getItem('lang') : "fa";

        return (
            <div className="p-0 m-0" >
                <Helmet>
                    <title>Teachers</title>
                    <meta name="description" content={description.slice(0, 120)} />
                    <meta name="keywords" cpntent="private, teacher, online, french, class, in 8 month, tefaq, tcf, B2, C1 , french exams" />
                </Helmet>
                <Container fluid dir={lang === 'fa' || lang === 'ar' ? 'rtl' : 'ltr'}>
                    <Row className="mb-4">
                        <Col xs="12" className="m-0 p-0">
                            <Row>
                                <Col xs="12" className={lang === "fa" || lang === 'ar' ? "text-right m-0 p-2" : "m-0 p-2"}>
                                    <strong className={lang === "fa" || lang === 'ar' ? "text-right text-primary h5" : "text-primary h5"}>{this.getHeading(lang, teacherOutlookObject)[0]}</strong>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="12" className={lang === "fa" || lang === 'ar' ? "text-right m-0 p-2" : "m-0 p-2"}>
                                    <p>{this.getHeading(lang, teacherOutlookObject)[1]}</p>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row >
                        <Col xs="12">
                            <Suspense fallback={<Spinner color="success" />}>
                                <TeacherList />
                            </Suspense>
                        </Col>
                    </Row>
                </Container>
            </div>

        );
    }
}

export default TeacherOutlook;