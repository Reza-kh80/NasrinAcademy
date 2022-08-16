import React, { useState, useEffect, useContext, useCallback } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import UserContext from '../../../utils/user-context';
import { Container, Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { initialArticleObject } from './student-form-objects';
function StudentLessonForm(props) {
    const apiEndPoint = process.env.REACT_APP_APIEndPoint;
    const mediaEndPoint = process.env.REACT_APP_MediaEndPoint;
    const currentUser = useContext(UserContext);
    const { show, onHide, id, title } = props;
    const [articleObject, setArticleObject] = useState(initialArticleObject);
    const [lang, setLang] = useState("en");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);
    const onEditHandler = useCallback((list) => {
        setArticleObject(prevState => ({
            ...prevState,
            ArticleId: list.ArticleId,
            Title: list.Title,
            TitleFr: list.TitleFr,
            TitleFa: list.TitleFa,
            Level: list.Level,
            LevelFr: list.LevelFr,
            LevelFa: list.LevelFa,
            Body1: list.Body1,
            Body1Fr: list.Body1Fr,
            Body1Fa: list.Body1Fa,
            Body2: list.Body2,
            Body2Fr: list.Body2Fr,
            Body2Fa: list.Body2Fa,
            Description: list.Description,
            DescriptionFr: list.DescriptionFr,
            DescriptionFa: list.DescriptionFa,
            FileName: list.FileName,
            IsFree: list.IsFree,
            MenuId: list.MenuId,
            TeacherId: list.TeacherId,
            LevelId: list.LevelId,
            Modifier: currentUser.Username,
            ModificationDate: list.ModificationDate,
            IsDeleted: list.IsDeleted,
        }));
    }, [currentUser.Username])
    useEffect(() => {
        // console.log("Article Object=", articleObject)
        // console.log("Article Object=", show)
    }, [articleObject]);
    useEffect(() => {
        let mounted = true;
        if (id !== "") {
            const fetchData = async () => {
                const result = await axios.get(apiEndPoint + `Article/Get?articleId=${id}`)
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
    const getHeading = (lang, item) => {
        let heading = []
        if (lang === 'en') {
            heading.push(item.Title)
            heading.push(item.Level)
            heading.push(item.Body1)
            heading.push(item.Body2)
            heading.push("Level")
        }
        else if (lang === 'fr') {
            heading.push(item.TitleFr)
            heading.push(item.LevelFr)
            heading.push(item.Body1Fr)
            heading.push(item.Body2Fr)
            heading.push("Niveau")
        }
        else {
            heading.push(item.TitleFa)
            heading.push(item.LevelFa)
            heading.push(item.Body1Fa)
            heading.push(item.Body2Fa)
            heading.push("سطح")
        }
        return heading
    }
    return (
        <div>
            <Modal
                size="xl"
                show={show}
                onHide={onHide}
                backdrop="static"
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton className="loginHeader p-2" >
                    <Modal.Title id="contained-modal-title-vcenter" className="w-100" >
                        <Row className="align-items-center" >
                            <Col xs="1" className="text-center">
                                <img src="main-images/logo-circle.webp" width="100%" height="100%" alt="logo" />
                            </Col>
                            <Col xs="8" className='text-left m-0'>
                                <h4 className="h4 font-weight-bold text-warning">{title}</h4>
                            </Col>
                            <Col xs="2" className="float-left p-0 m-0">
                                <Dropdown isOpen={dropdownOpen} toggle={toggle} className="d-inline"  >
                                    <DropdownToggle className="btn d-inline float-right" caret>
                                        Language...
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem onClick={() => setLang("en")}>
                                            <img className="d-inline" src="main-images/en.webp" width="32" height="32" alt="Logo" /> English
                                        </DropdownItem>
                                        <DropdownItem onClick={() => setLang("fa")}>
                                            <img className="d-inline" src="main-images/fa.webp" width="32" height="32" alt="Logo" /> فارسی
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </Col>
                        </Row>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container fluid dir={lang === 'fa' ? 'rtl' : 'ltr'}>
                        <Row className="mb-3">
                            <Col xs="12" md="9" className={lang === "fa" ? "text-right m-0 p-0" : "m-0 p-0"}>
                                <strong className={lang === "fa" ? "text-right text-primary h5" : "text-primary h5"}>{getHeading(lang, articleObject)[0]}</strong>
                            </Col>
                            <Col xs="12" md="3" className={lang === "fa" ? "text-right m-0 p-0" : "m-0 p-0"}>
                                <strong className={lang === "fa" ? "text-right text-primary h5" : "text-primary h5"}>{getHeading(lang, articleObject)[4]}:</strong>
                                <strong className={lang === "fa" ? "text-right text-info h5" : "text-info h5"}> {getHeading(lang, articleObject)[1]}</strong>
                            </Col>
                        </Row>
                        <Row >
                            <Col xs="12" lg="5" className="text-center p-0 m-0">
                                <video controls preload="none" className="img-thumbnail mt-2 align-middle" src={mediaEndPoint + 'Videos/' + articleObject.FileName} poster="main-images/video-poster.jpg" width="100%" height="100%" type="video/mp4" />
                            </Col>
                            <Col xs="12" lg="7" className={lang === "fa" ? "text-right m-0 p-0" : "m-0 p-0"}><p>{getHeading(lang, articleObject)[2]}</p></Col>
                        </Row>
                        <Row className="mt-3">
                            <Col xs="12" md="12" className={lang === "fa" ? "text-right m-0 p-0" : "m-0 p-0"}><p>{getHeading(lang, articleObject)[3]}</p></Col>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
        </div>
    );
}
export default StudentLessonForm;



