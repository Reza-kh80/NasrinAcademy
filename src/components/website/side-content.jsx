import React, { Component, Suspense } from 'react';
import { Container, Row, Col, Spinner } from 'reactstrap';
const SideMenu = React.lazy(() => import('./sideMenu'));
const Advertise = React.lazy(() => import('./advertise'));
class SideContent extends Component {
    render() {
        const lang = localStorage.getItem('lang');
        return (
            <Container fluid >
                <Row >
                    <Col className="text-center pt-3 pb-3"><img src="main-images/img_logo.webp" width="150" height="150" alt="Logo" /></Col>
                </Row>
                <Row >
                    <Col sm="12" className="pt-3 pb-3">
                        {/* <video className="img-thumbnail" src="main-images/adv.mp4" width="100%" height="100%" type="video/mp4" controls autoPlay /> */}
                    </Col>
                </Row>
                <Row className="text-center">
                    <Col className="p-1">
                        <Suspense fallback={<Spinner color="success" />}>
                            <Advertise />
                        </Suspense>
                    </Col>
                </Row>
                <Row className="text-center">
                    <Col >
                        <h5 className="text-white font-weight-bold">{lang === 'en' ? "Contents" : "محتوای آموزشی"}</h5>
                    </Col>
                </Row>
                <Row>
                    <Col sm="12" className="p-1">
                        <Suspense fallback={<Spinner color="success" />}>
                            <SideMenu />
                        </Suspense>
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default SideContent;
