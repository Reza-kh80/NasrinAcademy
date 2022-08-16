import React, { useState, useEffect, useContext, useCallback } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import UserContext from '../../../utils/user-context';
import { Container, Row, Col } from 'reactstrap';
import { initialTermResultObject } from './student-form-objects';
function TeacherResultAssignForm(props) {
    const apiEndPoint = process.env.REACT_APP_APIEndPoint;
    const currentUser = useContext(UserContext);
    const { show, onHide, studentId, termResultId } = props;
    const [termResultObject, setTermResultObject] = useState(initialTermResultObject);
    const [studentName, setStudentName] = useState("");
    const onEditHandler = useCallback((list) => {
        setTermResultObject(prevState => ({
            ...prevState,
            Code: list.Code,
            Title: list.Title,
            Duration: list.Duration,
            SessionNumber: list.SessionNumber,
            ResultDate: list.ResultDate,
            Modifier: currentUser.Username,
            ModificationDate: list.ModificationDate,
            IsDeleted: list.IsDeleted,
            StudentId: list.StudentId,
        }));
    }, [currentUser.Username])
    useEffect(() => {
        // console.log("TermResult Object=", termResultObject)
    }, [termResultObject]);
    useEffect(() => {
        const url = currentUser.status
            ? apiEndPoint + `TermResult/GetPublic?studentId=${studentId}&termResultId=${termResultId}`
            : apiEndPoint + `TermResult/GetPrivate?studentId=${studentId}&termResultId=${termResultId}`;
        let mounted = true;
        if (studentId !== "" && termResultId !== "") {
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
    }, [studentId, termResultId, apiEndPoint, currentUser.status, currentUser.UserId, onEditHandler]);
    useEffect(() => {
        const url = currentUser.status
            ? apiEndPoint + `Student/GetPublic?studentId=${currentUser.user.UserId}`
            : apiEndPoint + `Student/GetPrivate?studentId=${currentUser.user.UserId}`;
        let mounted = true;
        if (currentUser.UserId !== "") {
            const fetchData = async () => {
                const result = await axios.get(url)
                if (mounted) {
                    setStudentName(result.data.Name);
                }
            };
            fetchData();
            return () => {
                mounted = false;
            };
        }
    });
    return (
        <div className="p-0 m-0" >
            <Modal
                size="lg"
                show={show}
                onHide={onHide}
                // backdrop="static"
                // dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Body className="bg-info p-5 p-0 m-0 rounded">
                    <Container fluid  >
                        <Row>
                            <Col xs="12" className="align-items-center text-center bg-white m-0 p-3">
                                <div className="text-left mt-3 mb-3">
                                    <strong className="text-muted">Issued Date: {termResultObject.ResultDate}</strong>
                                </div>
                                <div>
                                    <img src="main-images/logo-circle.webp" width={window.innerWidth < 576 ? "60" : "90"} height={window.innerWidth < 576 ? "60" : "90"} alt="Logo" />
                                </div>
                                <h4 className="mt-3 font-weight-bold">CERTIFICATION OF COMPLETETION</h4>
                                <h6 className="mt-3 text-muted font-weight-bold">Awarded To</h6>
                                <h3 className="mt-3 font-weight-bold">{studentName}</h3>
                                <h6 className="mt-3 text-muted font-weight-bold">Graduating From</h6>
                                <h5 className="mt-3 font-weight-bold">{termResultObject.Title}</h5>
                                <h6 className="mt-3 text-muted font-weight-bold">Duration:{termResultObject.Duration}</h6>
                                <div className="w-50 text-left mt-5">
                                    <strong className="text-muted text-xs-left d-block">CERT Code:{termResultObject.Code}</strong>
                                    <strong className="text-muted text-xs-left d-block">SN:{termResultObject.SessionNumber}</strong>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
        </div>
    );
}
export default TeacherResultAssignForm;
