import React, { useState, useEffect, useRef, useContext, useCallback } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import SimpleReactValidator from 'simple-react-validator';
import Form from 'react-bootstrap/Form';
import { getDatetime } from '../../../utils/datetime';
import UserContext from '../../../utils/user-context';
import { Container, Row, Col, Button } from 'reactstrap';
import { initialTermAssignmentObject } from './teacher-form-objects';
const MyDropdown = React.lazy(() => import('../../general/dropdown'));
const FileUpload = React.lazy(() => import('../../general/fileUpload'));
function TeacherAssignmentAssignForm(props) {
    const apiEndPoint = process.env.REACT_APP_APIEndPoint;
    const mediaEndPoint = process.env.REACT_APP_mediaEndPoint;
    const currentUser = useContext(UserContext);
    const simpleValidator = useRef(new SimpleReactValidator())
    const { show, onHide, studentId, assignmentId, title } = props;
    const [termAssignmentObject, setTermAssignmentObject] = useState(initialTermAssignmentObject);
    const [assignmentList, setAssignmentList] = useState([]);
    const onEditHandler = useCallback((list) => {
        setTermAssignmentObject(prevState => ({
            ...prevState,
            StudentId: list.StudentId,
            AssignmentId: list.AssignmentId,
            Answer: list.Answer,
            Solution: list.Solution,
            Note: list.Note,
            Grade: list.Grade,
            Modifier: currentUser.Username,
            ModificationDate: getDatetime(),
            IsDeleted: list.IsDeleted,
        }));
    }, [currentUser.Username])
    useEffect(() => {
        // console.log("TermAssignment Object=", termAssignmentObject)
    }, [termAssignmentObject]);
    useEffect(() => {
        let mounted = true;
        if (studentId !== "" && assignmentId !== "") {
            const fetchData = async () => {
                const result = await axios.get(apiEndPoint + `TermAssignment/GetPrivate?studentId=${studentId}&assignmentId=${assignmentId}`)
                if (mounted) {
                    onEditHandler(result.data);
                }
            };
            fetchData();
            return () => {
                mounted = false;
            };
        }
        else {
            setTermAssignmentObject(initialTermAssignmentObject);
            setTermAssignmentObject(prevState => ({
                ...prevState,
                Modifier: currentUser.Username,
                StudentId: studentId,
            }));
        }

    }, [studentId, assignmentId, apiEndPoint, currentUser.Username, currentUser.UserId, onEditHandler]);
    useEffect(() => {
        let mounted = true;
        let dropdownList = [];
        const fetchData = async () => {
            const result = await axios.get(apiEndPoint + `Assignment/DisplayDropdown?teacherId=${currentUser.UserId}`)
            if (mounted) {
                result.data.map(m =>
                    dropdownList.push({
                        value: m.AssignmentId,
                        label: m.Title,
                    }),
                );
                setAssignmentList(dropdownList);
            }
        };
        fetchData();
        return () => {
            mounted = false;
        };
    }, [apiEndPoint, currentUser.UserId]);
    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        if (e.target.type === 'checkbox') {
            setTermAssignmentObject(prevState => ({ ...prevState, [name]: checked }));
        }
        else {
            setTermAssignmentObject(prevState => ({ ...prevState, [name]: value }));
        }
    }
    const setFileName = (id) => {
        let fileName = 'Solution_' + currentUser.UserId + '_' + id + '.pdf';
        return fileName;
    }
    const handleUpload = (fileName) => {
        console.log(fileName)
        setTermAssignmentObject(prevState => ({
            ...prevState,
            Solution: fileName
        }));
    }
    const handleSubmit = () => {
        if (simpleValidator.current.allValid()) {
            axios.post(apiEndPoint + 'TermAssignment/AddPrivate', termAssignmentObject, {})
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
            console.log("No")
        }
    }
    return (
        <div>
            <Modal
                size="md"
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
                                <MyDropdown
                                    label="Assignment"
                                    display="Select Assignment ..."
                                    dataList={assignmentList}
                                    handleChange={handleChange}
                                    name="AssignmentId"
                                    selectedValue={termAssignmentObject.AssignmentId}
                                    htmlFor="assignment"
                                    onBlur={simpleValidator.current.showMessageFor('assignment')}
                                    width="w-100"
                                />
                                {simpleValidator.current.message('assignment', termAssignmentObject.AssignmentId, 'required', { className: 'alert alert-danger' })}
                                {termAssignmentObject.Answer !== '' &&
                                    <div>
                                        <Form.Label className="bg-success w-100 rounded pl-3 p-2 text-white">
                                            File Name:
                                            <a className="pl-2" href={mediaEndPoint + "Assignment/" + termAssignmentObject.Answer} download>{termAssignmentObject.Answer}</a>
                                        </Form.Label>
                                        <FileUpload postMethod={'TermAssignment/UploadFile'} title="Solution(pdf)" accept={['pdf']} specifiedFileName={setFileName(termAssignmentObject.AssignmentId)} onUpload={handleUpload} />
                                        {termAssignmentObject.Solution !== '' &&
                                            <Form.Label className="bg-success w-100 rounded pl-3 p-2 text-white">
                                                File Name:
                                                <a className="pl-2" href={mediaEndPoint + "Assignment/" + termAssignmentObject.Solution} download>{termAssignmentObject.Solution}</a>
                                            </Form.Label>}
                                        <Form.Group>
                                            <Form.Label htmlFor="grade"><h6 className="text-primary mb-0 ml-1" >Grade:</h6></Form.Label>
                                            <Form.Control id="grade" name="Grade" type="text" placeholder="Enter Grade" value={termAssignmentObject.Grade} onChange={handleChange} />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label htmlFor="note"><h6 className="text-primary mb-0 ml-1" >Note:</h6></Form.Label>
                                            <Form.Control id="note" name="Note" as="textarea" rows={10} placeholder="Enter Note" value={termAssignmentObject.Note} onChange={handleChange} />
                                        </Form.Group>
                                    </div>
                                }
                                <Form.Group>
                                    <Form.Label htmlFor="modificationDate"><h6 className="text-primary mb-0 ml-1" >Modefication Date (Now):</h6></Form.Label>
                                    <Form.Label id="modificationDate" className="border rounded border-dark d-block p-2">{termAssignmentObject.ModificationDate}</Form.Label>
                                    <Form.Label htmlFor="modificationDate"><h6 className="text-primary mb-0 ml-1" >Modefier (Now):</h6></Form.Label>
                                    <Form.Label id="modificationDate" className="border rounded border-dark d-block p-2">{termAssignmentObject.Modifier}</Form.Label>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Check inline name="IsDeleted" label="Is Deleted?" checked={termAssignmentObject.IsDeleted} onChange={handleChange} className="mt-2" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button className="btn btn-sm float-right" onClick={handleSubmit} >Submit</Button>
                    </Container>
                </Modal.Body>
            </Modal>
        </div>
    );
}
export default TeacherAssignmentAssignForm;



