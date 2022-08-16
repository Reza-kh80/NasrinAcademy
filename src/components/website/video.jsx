import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Container, Row, Col } from 'reactstrap';
function Video(props) {
    const { show, onHide, object } = props;
    const lang = localStorage.getItem('lang')
    const mediaEndMoint = process.env.REACT_APP_MediaEndPoint;
    const getHeading = (lang) => {
        let heading = []
        if (lang === 'en') {
            heading.push(object.Description)
        }
        else if (lang === 'fr') {
            heading.push(object.DescriptionFr)
        }
        else {
            heading.push(object.DescriptionFa)
        }
        return heading
    }
    return (
        <div>
            <Modal
                size="lg"
                show={show}
                onHide={onHide}
                backdrop="static"
                aria-labelledby="example-modal-sizes-title-lg">
                <Modal.Header closeButton className="loginHeader">
                    <Row className="align-items-center">
                        <Col xs="2" className="text-center">
                            <img src="main-images/logo-circle.webp" width="100%" height="100%" alt="logo" />
                        </Col>
                        <Col xs="10" className="text-left m-0 p-0 ">
                            <Modal.Title id="example-modal-sizes-title-lg" className="h4 font-weight-bold text-white">{object.Title}</Modal.Title>
                        </Col>
                    </Row>
                </Modal.Header>
                <Modal.Body>
                    <Container fluid dir={lang === 'fa' ? 'rtl' : 'ltr'}>
                        <Row>
                            <Col xs="12">
                                <video controls preload="none" className="img-thumbnail mt-2" src={mediaEndMoint + 'Videos/' + object.FileName} poster="main-images/video-poster.jpg" width="100%" height="100%" type="video/mp4" />
                            </Col>
                            <Col xs="12" className={lang === 'fa' ? 'text-right' : 'text-left'}>
                                <p>{getHeading(lang)[0]}</p>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
        </div>
    );
}
export default Video;