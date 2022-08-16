import React, { Component, Suspense } from 'react';
import { Container, Row, Col, Spinner } from 'reactstrap';
import axios from 'axios';
import { Helmet } from "react-helmet";
const VideoList = React.lazy(() => import('./video-list'));
class VideoOutlook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videoOutlookObject: [],
            apiEndPoint: process.env.REACT_APP_APIEndPoint,
            mediaEndMoint: process.env.REACT_APP_MediaEndPoint,
            description: "",
        }
    }
    getvideoOutlook = async () => {
        await axios.get(this.state.apiEndPoint + 'VideoOutlook/Display').then(response => {
            this.setState({ videoOutlookObject: response.data });
            this.setState({ description: response.data.Description });
        });
    }
    componentDidMount() {
        this.getvideoOutlook();
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
        return heading
    }
    render() {
        const { videoOutlookObject, description } = this.state;
        const lang = localStorage.getItem('lang');
        return (
            <div className="p-0 m-0" >
                <Helmet>
                    <title>Videos</title>
                    <meta name="description" content={description.slice(0, 120)} />
                    <meta name="keywords" cpntent="private, video, online, french, class, in 8 month, tefaq, tcf, B2, C1 , french exams" />
                </Helmet>
                <Container fluid dir={lang === 'fa' ? 'rtl' : 'ltr'}>
                    <Row className="mb-4">
                        <Col xs="12" lg="7" className={lang === "fa" ? "text-right m-0 p-0" : "m-0 p-0"}>
                            <strong className="text-primary h5">{this.getHeading(lang, videoOutlookObject)[0]}</strong>
                            <p>{this.getHeading(lang, videoOutlookObject)[1]}</p>

                        </Col>
                        <Col xs="12" lg="5">
                            <Suspense fallback={<Spinner color="success" />}>
                                <VideoList />
                            </Suspense>
                        </Col>
                    </Row>
                </Container>
            </div>

        );
    }
}

export default VideoOutlook;