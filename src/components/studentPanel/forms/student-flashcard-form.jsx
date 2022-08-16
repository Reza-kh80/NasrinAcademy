import React, { useState, useEffect, useContext, useCallback } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import UserContext from '../../../utils/user-context';
import { Container, Row, Col } from 'reactstrap';
import { initialFlashCardObject } from './student-form-objects';
import ModalImage from "react-modal-image";
function StudentFlashCardForm(props) {
    const apiEndPoint = process.env.REACT_APP_APIEndPoint;
    const mediaEndPoint = process.env.REACT_APP_MediaEndPoint;
    const currentUser = useContext(UserContext);
    const { show, onHide, id } = props;
    const [flashCardObject, setFlashCardObject] = useState(initialFlashCardObject);
    const [urlAudio, setUrlAudio] = useState("");
    const [urlPicture, setUrlPicture] = useState("");
    const onEditHandler = useCallback((list) => {
        setFlashCardObject(prevState => ({
            ...prevState,
            FlashCardId: list.FlashCardId,
            Title: list.Title,
            TitleTranslation: list.TitleTranslation,
            Description: list.Description,
            DescriptionTranslation: list.DescriptionTranslation,
            Example: list.Example,
            ExampleTranslation: list.ExampleTranslation,
            Picture: list.Picture,
            Audio: list.Audio,
            Color: list.Color,
            IsFree: list.IsFree,
            TeacherId: list.TeacherId,
            LevelId: list.LevelId,
            FlashCardCategoryId: list.FlashCardCategoryId,
            Modifier: currentUser.Username,
            ModificationDate: list.ModificationDate,
            IsDeleted: list.IsDeleted,
        }));
    }, [currentUser.Username])
    useEffect(() => {
        // console.log("FlashCard Object=", flashCardObject)
        // console.log("FlashCard Object=", show)
    }, [flashCardObject]);
    useEffect(() => {

        if (flashCardObject.Picture !== undefined && flashCardObject.Picture !== "") {
            setUrlPicture(mediaEndPoint + 'FlashCard/' + flashCardObject.Picture)
        }
        if (flashCardObject.Audio !== undefined && flashCardObject.Audio !== "") {
            setUrlAudio(mediaEndPoint + 'FlashCard/' + flashCardObject.Audio)
        }
    }, [flashCardObject, mediaEndPoint]);
    useEffect(() => {
        let mounted = true;
        if (id !== "") {
            const fetchData = async () => {
                const result = await axios.get(apiEndPoint + `FlashCard/Get?flashCardId=${id}`)
                if (mounted) {
                    onEditHandler(result.data);
                }
            };
            fetchData();
            return () => {
                mounted = false;
            };
        }
    }, [id, apiEndPoint, currentUser.Username, currentUser.UserId, onEditHandler]);
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
                        <strong className="float-right"> Category : {flashCardObject.FlashCardCategoryName}</strong>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: flashCardObject.Color }}>
                    <Container fluid>
                        <Row className="mb-2 align-items-center">
                            {(flashCardObject.Picture !== "" | flashCardObject.Picture !== undefined) &&
                                <Col xs="3" className="text-center">
                                    <ModalImage
                                        hideDownload
                                        hideZoom
                                        className="image-mask"
                                        small={urlPicture}
                                        medium={urlPicture}
                                        alt={flashCardObject.Title}
                                    />
                                </Col>}
                            {(flashCardObject.Audio !== "" | flashCardObject.Audio !== undefined) &&
                                <Col xs="9" className="text-center">
                                    <audio controls preload="none" src={urlAudio}
                                        width="100%" height="100%" type="audio/mpeg" className="p-0" />
                                </Col>}
                        </Row>
                        <Row >
                            <Col xs="12" >
                                <Row className="mb-1">
                                    <Col xs="12" md="6" className="justify-content-center m-0 p-1">
                                        <strong className="p-1">Title:</strong>
                                        <div className="bg-white p-1 rounded">
                                            <strong className="pl-2">{flashCardObject.Title}</strong>
                                        </div>
                                    </Col>
                                    <Col xs="12" md="6" className="justify-content-center text-right m-0 p-1" dir="rtl">
                                        <strong className="p-1">عنوان :</strong>
                                        <div className="bg-white p-1 rounded">
                                            <strong className="pr-2">{flashCardObject.TitleTranslation}</strong>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="mb-1">
                                    <Col xs="12" md="6" className="justify-content-center m-0 p-1">
                                        <strong className="p-1">Description:</strong>
                                        <div className="bg-white p-1 rounded">
                                            <p className="">{flashCardObject.Description}</p>
                                        </div>
                                    </Col>
                                    <Col xs="12" md="6" className="justify-content-center text-right m-0 p-1" dir="rtl">
                                        <strong className="p-1">توضیحات:</strong>
                                        <div className="bg-white p-1 rounded">
                                            <p className="">{flashCardObject.DescriptionTranslation}</p>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="mb-1">
                                    <Col xs="12" md="6" className="justify-content-center m-0 p-1">
                                        <strong className="p-1">Example:</strong>
                                        <div className="bg-white p-1 rounded">
                                            <p className="">{flashCardObject.Example}</p>
                                        </div>
                                    </Col>
                                    <Col xs="12" md="6" className="justify-content-center text-right m-0 p-1" dir="rtl">
                                        <strong className="p-1">مثال:</strong>
                                        <div className="bg-white p-1 rounded">
                                            <p className="">{flashCardObject.ExampleTranslation}</p>
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
export default StudentFlashCardForm;



