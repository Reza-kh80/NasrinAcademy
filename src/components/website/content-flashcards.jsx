import React, { Component, Suspense } from 'react';
import { Container, Row, Col, Spinner } from 'reactstrap';
import axios from 'axios';
import { Helmet } from "react-helmet";
const FlashCardList = React.lazy(() => import('./flashcard-list'));
class FlashCardOutlook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flashCardOutlookObject: [],
            apiEndPoint: process.env.REACT_APP_APIEndPoint,
            mediaEndMoint: process.env.REACT_APP_MediaEndPoint,
            description: "",
        }
    }
    getflashCardOutlook = async () => {
        await axios.get(this.state.apiEndPoint + 'FlashCardOutlook/Display').then(response => {
            this.setState({ flashCardOutlookObject: response.data });
            this.setState({ description: response.data.Description });
        });
    }
    componentDidMount() {
        this.getflashCardOutlook();
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
        }
        else {
            heading.push(item.TitleFa)
            heading.push(item.DescriptionFa)
        }
        return heading
    }
    render() {
        const { flashCardOutlookObject, description } = this.state;
        const lang = localStorage.getItem('lang');
        return (
            <div className="p-0 m-0" >
                <Helmet>
                    <title>FlashCards</title>
                    <meta name="description" content={description.slice(0, 120)} />
                    <meta name="keywords" cpntent="private, flashCard, online, french, class, in 8 month, tefaq, tcf, B2, C1 , french exams" />
                </Helmet>
                <Container fluid dir={lang === 'fa' ? 'rtl' : 'ltr'}>
                    <Row className="mb-4" >
                        <Col xs="12" lg="5" className={lang === "fa" ? "text-right m-0 p-0" : "m-0 p-0"} dir={lang === 'fa' ? 'rtl' : 'ltr'} >
                            <strong className="text-primary h5">{this.getHeading(lang, flashCardOutlookObject)[0]}</strong>
                            <p>{this.getHeading(lang, flashCardOutlookObject)[1]}</p>
                        </Col>
                        <Col xs="12" lg="7">
                            <Suspense fallback={<Spinner color="success" />}>
                                <FlashCardList />
                            </Suspense>
                        </Col>
                    </Row>
                </Container>
            </div>

        );
    }
}

export default FlashCardOutlook;