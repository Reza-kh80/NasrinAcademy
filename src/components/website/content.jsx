import React, { Component, Suspense } from 'react';
import { Container, Row, Col, Spinner } from 'reactstrap';
import { Route, Switch } from 'react-router-dom';
const Home = React.lazy(() => import('./content-home'));
const About = React.lazy(() => import('./content-about'));
const Contacts = React.lazy(() => import('./content-contact'));
const CourseOutlook = React.lazy(() => import('./content-course'));
const TeacherOutlook = React.lazy(() => import('./content-teacher'));
const TeacherRecruitment = React.lazy(() => import('./content-teacher-recruitment'));
const FlashCards = React.lazy(() => import('./content-flashcards'));
const VideoOutlook = React.lazy(() => import('./content-videos'));
const Article = React.lazy(() => import('./content-articls'));

class Contents extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="content">
                <Container fluid className="p-0 m-0">
                    <Row >
                        <Col sm="12">
                            <Suspense fallback={<div className="text-center p-4"><Spinner color="success" /></div>}>
                                <Switch>
                                    <Route path="/teacher-overview" component={TeacherOutlook} />
                                    <Route path="/recruitment" component={TeacherRecruitment} />
                                    <Route path="/course" component={CourseOutlook} />
                                    <Route path="/media" component={VideoOutlook} />
                                    <Route path="/flashcards" component={FlashCards} />
                                    <Route path="/article/:id" component={Article} />
                                    <Route path="/contact" component={Contacts} />
                                    <Route path="/about" component={About} />
                                    <Route path="/" component={Home} />
                                </Switch>
                            </Suspense>
                        </Col>
                    </Row>
                </Container>
            </div>

        );
    }
}
export default Contents;