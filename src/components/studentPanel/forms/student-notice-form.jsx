import React, { useState, useEffect, useContext, useCallback } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import UserContext from '../../../utils/user-context';
import { Container, Row, Col } from 'reactstrap';
import { initialTermNoticeObject } from './student-form-objects';
function StudentNoticeForm(props) {
    const apiEndPoint = process.env.REACT_APP_APIEndPoint;
    const currentUser = useContext(UserContext);
    const { show, onHide, studentId, termNoticeId, title } = props;
    const [termNoticeObject, setTermNoticeObject] = useState(initialTermNoticeObject);
    const onEditHandler = useCallback((list) => {
        setTermNoticeObject(prevState => ({
            ...prevState,
            Title: list.Title,
            Description: list.Description,
            Modifier: currentUser.Username,
            ModificationDate: list.ModificationDate,
            IsDeleted: list.IsDeleted,
            TermId: list.TermId,
        }));
    }, [currentUser.Username])
    useEffect(() => {
        // console.log("TermNotice Object=", termNoticeObject)
    }, [termNoticeObject]);
    useEffect(() => {
        const url = currentUser.status
            ? apiEndPoint + `TermNotice/GetPublic?studentId=${studentId}&termNoticeId=${termNoticeId}`
            : apiEndPoint + `TermNotice/GetPrivate?studentId=${studentId}&termNoticeId=${termNoticeId}`;
        let mounted = true;
        if (studentId !== "" && termNoticeId !== "") {
            const fetchData = async () => {
                const result = await axios.get(url)
                if (mounted) {
                    onEditHandler(result.data);
                }
            };
            fetchData();
            return () => {
                mounted = false;
            };
        }
    }, [studentId, termNoticeId, apiEndPoint, currentUser.status, onEditHandler]);
    return (
        <div>
            <Modal
                size="lg"
                show={show}
                onHide={onHide}
                backdrop="static"
                // dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton className="loginHeader p-2">
                    <Row className="align-items-center" >
                        <Col xs="2" className="text-center">
                            <img src="main-images/logo-circle.webp" width="100%" height="100%" alt="logo" />
                        </Col>
                        <Col xs="10" className='text-left m-0 p-0'>
                            <Modal.Title id="example-custom-modal-styling-title" className="h4 font-weight-bold text-warning">{title}</Modal.Title>
                        </Col>
                    </Row>
                </Modal.Header>
                <Modal.Body>
                    <Container fluid >
                        <Row>
                            <Col xs="12" className="align-items-center m-0 p-1">
                                <h4 className="text-left text-primary font-weight-bold">{termNoticeObject.Title}</h4>
                                <p>{termNoticeObject.Description}</p>
                            </Col>
                            <Col>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
        </div>
    );
}
export default StudentNoticeForm;



