import React, { useState, useEffect, useRef, useContext, useCallback } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import SimpleReactValidator from 'simple-react-validator';
import Form from 'react-bootstrap/Form';
import { getDatetime } from '../../../utils/datetime';
import UserContext from '../../../utils/user-context';
import { Container, Row, Col, Button } from 'reactstrap';
import { initialTermAssignmentObject } from './student-form-objects';
const FileUpload = React.lazy(() => import('../../general/fileUpload'));
function StudentAssignmentForm(props) {
    const apiEndPoint = process.env.REACT_APP_APIEndPoint;
    const mediaEndPoint = process.env.REACT_APP_mediaEndPoint;
    const currentUser = useContext(UserContext);
    const simpleValidator = useRef(new SimpleReactValidator())
    const { show, onHide, studentId, assignmentId, title } = props;
    const [termAssignmentObject, setTermAssignmentObject] = useState(initialTermAssignmentObject);
    const [assignmentRequest, setAssignmentRequest] = useState("");
    const [assignmentFile, setAssignmentFile] = useState("");
    const onEditHandler = useCallback((list) => {
        setTermAssignmentObject(prevState => ({
            ...prevState,
            StudentId: list.StudentId,
            AssignmentId: list.AssignmentId,
            Answer: list.Answer,
            Solution: list.Solution,
            Note: list.Note,
            Grade: list.Grade,
            Modifier: currentUser.user.Username,
            ModificationDate: getDatetime(),
            IsDeleted: list.IsDeleted,
        }));
    }, [currentUser.user.Username])
    useEffect(() => {
        // console.log("TermAssignment Object=", termAssignmentObject)
    }, [termAssignmentObject]);
    useEffect(() => {
        const url = currentUser.status
            ? apiEndPoint + `TermAssignment/GetPublic?studentId=${studentId}&assignmentId=${assignmentId}`
            : apiEndPoint + `TermAssignment/GetPrivate?studentId=${studentId}&assignmentId=${assignmentId}`;
        let mounted = true;
        if (studentId !== "" && assignmentId !== "") {
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
    }, [studentId, assignmentId, apiEndPoint, onEditHandler, currentUser.status]);
    useEffect(() => {
        let mounted = true;
        if (assignmentId !== "") {
            const fetchData = async () => {
                const result = await axios.get(apiEndPoint + `Assignment/Get?assignmentId=${assignmentId}`)
                if (mounted) {
                    setAssignmentRequest(result.data.Request);
                    setAssignmentFile(result.data.FileName);
                }
            };
            fetchData();
            return () => {
                mounted = false;
            };
        }
    }, [assignmentId, apiEndPoint]);
    const setFileName = (id) => {
        let fileName = 'Answer_' + currentUser.user.UserId + '_' + id;
        return fileName;
    }
    const handleUpload = (fileName) => {
        setTermAssignmentObject(prevState => ({
            ...prevState,
            Answer: fileName
        }));
    }
    const handleSubmit = () => {
        const url = currentUser.status
            ? apiEndPoint + `TermAssignment/AddPublic`
            : apiEndPoint + `TermAssignment/AddPrivate`;
        if (simpleValidator.current.allValid()) {
            axios.post(url, termAssignmentObject, {})
                .then(response => {
                    alert('You submitted the form and stuff!');
                    simpleValidator.current.hideMessages();
                    onHide();
                })
                .catch(function (error) {
                    alert(error);
                })
        } else {
            simpleValidator.current.showMessages();
        }
    }
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
                                <h6 className="w-100 rounded text-success font-weight-bold">َRequest Section</h6>
                                <h6 className="w-100 rounded text-primary font-weight-bold">Request:</h6>
                                <strong className="mb-2 d-block">{assignmentRequest}</strong>
                                <Form.Label className="bg-warning w-100 rounded pl-3 p-2 text-white">
                                    Request File:
                                    <a className="pl-2" href={mediaEndPoint + "Assignment/" + assignmentFile} download>{assignmentFile}</a>
                                </Form.Label>
                                <Form.Group>
                                    <Form.Label htmlFor="modificationDate"><h6 className="text-primary mb-0 ml-1" >Modefication Date (Now):</h6></Form.Label>
                                    <Form.Label id="modificationDate" className="border rounded border-dark d-block p-2">{termAssignmentObject.ModificationDate}</Form.Label>
                                    <Form.Label htmlFor="modificationDate"><h6 className="text-primary mb-0 ml-1" >Modefier (Now):</h6></Form.Label>
                                    <Form.Label id="modificationDate" className="border rounded border-dark d-block p-2">{termAssignmentObject.Modifier}</Form.Label>
                                </Form.Group>
                                <hr />
                                <h6 className="w-100 rounded text-success font-weight-bold">َAnswer and Feedback Section</h6>
                                <FileUpload postMethod={'TermAssignment/UploadFile'} title="Answer(pdf,docx)" accept={['pdf', 'docx']} specifiedFileName={setFileName(termAssignmentObject.AssignmentId)} onUpload={handleUpload} />
                                {termAssignmentObject.Answer !== '' &&
                                    <Form.Label className="bg-success w-100 rounded pl-3 p-2 text-white">
                                        Answer File:
                                        <a className="pl-2" href={mediaEndPoint + "Assignment/" + termAssignmentObject.Answer} download>{termAssignmentObject.Answer}</a>
                                    </Form.Label>
                                }
                                <Form.Group>
                                    <Form.Label htmlFor="grade"><h6 className="text-primary mb-0 ml-1" >Grade: {termAssignmentObject.Grade}</h6></Form.Label>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor="note"><h6 className="text-primary mb-0 ml-1" >Note:</h6></Form.Label>
                                    <p>{termAssignmentObject.Note}</p>
                                </Form.Group>
                                {termAssignmentObject.Solution !== '' &&
                                    <Form.Label className="bg-info w-100 rounded pl-3 p-2 text-white">
                                        Solution File:
                                        <a className="pl-2" href={mediaEndPoint + "Assignment/" + termAssignmentObject.Solution} download>{termAssignmentObject.Solution}</a>
                                    </Form.Label>
                                }
                            </Col>
                        </Row>
                        <Button className="btn btn-sm float-right" onClick={handleSubmit} >Submit</Button>
                    </Container>
                </Modal.Body>
            </Modal>
        </div>
    );
}
export default StudentAssignmentForm;



