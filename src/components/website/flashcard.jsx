import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Container, Row, Col } from 'reactstrap';
import ModalImage from "react-modal-image";
function FlashCard(props) {
    const { show, onHide, object } = props;
    const mediaEndMoint = process.env.REACT_APP_MediaEndPoint;
    const [imageURL, setImageURL] = useState('');
    useEffect(() => {
        let mounted = true;
        if (mounted) {
            setImageURL(mediaEndMoint + "FlashCard/" + object.Picture);
        }
        return () => {
            mounted = false;
        };
    }, [mediaEndMoint, object.Picture]);
    return (
        <div>
            <Modal
                size="lg"
                show={show}
                onHide={onHide}
                backdrop="static"
                animation
                aria-labelledby="example-modal-sizes-title-lg">
                <Modal.Header closeButton className="loginHeader p-2 align-items-center">
                    <img src="main-images/logo-circle.webp" width="70" height="70" alt="logo" />
                    <Modal.Title id="example-modal-sizes-title-lg" className="h4 font-weight-bold text-white pl-4">
                        <strong className="float-right"> Category : {object.FlashCardCategoryName}</strong>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: object.Color }}>
                    <Container fluid>
                        <Row className="mb-2 align-items-center">
                            {(object.Picture !== "" | object.Picture !== undefined) &&
                                <Col xs="3" className="text-center">
                                    <ModalImage
                                        hideDownload
                                        hideZoom
                                        className="image-mask"
                                        small={imageURL}
                                        medium={imageURL}
                                        alt={object.Title}
                                    />
                                </Col>}
                            {(object.Audio !== "" | object.Audio !== undefined) &&
                                <Col xs="9" className="text-center">
                                    <audio controls preload="none" src={mediaEndMoint + "FlashCard/" + object.Audio}
                                        width="100%" height="100%" type="audio/mpeg" className="p-0" />
                                </Col>}
                        </Row>
                        <Row >
                            <Col xs="12" >
                                <Row className="mb-1">
                                    <Col xs="12" md="6" className="justify-content-center m-0 p-1">
                                        <strong className="p-1">Title:</strong>
                                        <div className="bg-white p-1 rounded">
                                            <strong className="pl-2">{object.Title}</strong>
                                        </div>
                                    </Col>
                                    <Col xs="12" md="6" className="justify-content-center text-right m-0 p-1" dir="rtl">
                                        <strong className="p-1">عنوان :</strong>
                                        <div className="bg-white p-1 rounded">
                                            <strong className="pr-2">{object.TitleTranslation}</strong>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="mb-1">
                                    <Col xs="12" md="6" className="justify-content-center m-0 p-1">
                                        <strong className="p-1">Description:</strong>
                                        <div className="bg-white p-1 rounded">
                                            <p className="">{object.Description}</p>
                                        </div>
                                    </Col>
                                    <Col xs="12" md="6" className="justify-content-center text-right m-0 p-1" dir="rtl">
                                        <strong className="p-1">توضیحات:</strong>
                                        <div className="bg-white p-1 rounded">
                                            <p className="">{object.DescriptionTranslation}</p>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="mb-1">
                                    <Col xs="12" md="6" className="justify-content-center m-0 p-1">
                                        <strong className="p-1">Example:</strong>
                                        <div className="bg-white p-1 rounded">
                                            <p className="">{object.Example}</p>
                                        </div>
                                    </Col>
                                    <Col xs="12" md="6" className="justify-content-center text-right m-0 p-1" dir="rtl">
                                        <strong className="p-1">مثال:</strong>
                                        <div className="bg-white p-1 rounded">
                                            <p className="">{object.ExampleTranslation}</p>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
        </div>
    );
}
export default FlashCard;