import React, { useState, useEffect, useRef, useContext, useCallback } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import SimpleReactValidator from 'simple-react-validator';
import Form from 'react-bootstrap/Form';
import { getDatetime } from '../../../utils/datetime';
import UserContext from '../../../utils/user-context';
import { Container, Row, Col, Button } from 'reactstrap';
import { initialPublicTermNoticeObject } from './teacher-form-objects';
function TeacherNoticeAssignPublicForm(props) {
    const apiEndPoint = process.env.REACT_APP_APIEndPoint;
    const currentUser = useContext(UserContext);
    const simpleValidator = useRef(new SimpleReactValidator())
    const { show, onHide, studentId, noticeId, title } = props;
    const [termNoticeObject, setTermNoticeObject] = useState(initialPublicTermNoticeObject);
    const onEditHandler = useCallback((list) => {
        setTermNoticeObject(prevState => ({
            ...prevState,
            PublicTermNoticeId: list.PublicTermNoticeId,
            Title: list.Title,
            Description: list.Description,
            Modifier: currentUser.Username,
            ModificationDate: getDatetime(),
            IsDeleted: list.IsDeleted,
            StudentId: list.StudentId,
        }));
    }, [currentUser.Username])
    useEffect(() => {
        // console.log("TermNotice Object=", termNoticeObject)
    }, [termNoticeObject]);
    useEffect(() => {
        let mounted = true;
        if (studentId !== "" && noticeId !== "") {
            const fetchData = async () => {
                const result = await axios.get(apiEndPoint + `TermNotice/GetPublic?studentId=${studentId}&termNoticeId=${noticeId}`)
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
            setTermNoticeObject(initialPublicTermNoticeObject);
            setTermNoticeObject(prevState => ({
                ...prevState,
                Modifier: currentUser.Username,
                StudentId: studentId,
            }));
        }

    }, [studentId, noticeId, apiEndPoint, currentUser.Username, currentUser.UserId, onEditHandler]);
    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        if (e.target.type === 'checkbox') {
            setTermNoticeObject(prevState => ({ ...prevState, [name]: checked }));
        }
        else {
            setTermNoticeObject(prevState => ({ ...prevState, [name]: value }));
        }
    }
    const handleSubmit = () => {
        if (simpleValidator.current.allValid()) {
            axios.post(apiEndPoint + 'TermNotice/AddPublic', termNoticeObject, {})
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
                                <Form.Group>
                                    <Form.Label htmlFor="title"><h6 className="text-primary mb-0 ml-1" >Title:</h6></Form.Label>
                                    <Form.Control id="title" name="Title" type="text" placeholder="Enter Title" value={termNoticeObject.Title} onChange={handleChange} onBlur={simpleValidator.current.showMessageFor('title')} />
                                </Form.Group>
                                {simpleValidator.current.message('title', termNoticeObject.Title, 'required|max:60', { className: 'alert alert-danger' })}
                                <Form.Group>
                                    <Form.Label htmlFor="description"><h6 className="text-primary mb-0 ml-1" >Description:</h6></Form.Label>
                                    <Form.Control id="description" name="Description" as="textarea" rows={10} placeholder="Enter Description" value={termNoticeObject.Description} onChange={handleChange} onBlur={simpleValidator.current.showMessageFor('description')} />
                                </Form.Group>
                                {simpleValidator.current.message('description', termNoticeObject.Description, 'required|max:4000', { className: 'alert alert-danger' })}
                                <Form.Group>
                                    <Form.Label htmlFor="modificationDate"><h6 className="text-primary mb-0 ml-1" >Modefication Date (Now):</h6></Form.Label>
                                    <Form.Label id="modificationDate" className="border rounded border-dark d-block p-2">{termNoticeObject.ModificationDate}</Form.Label>
                                    <Form.Label htmlFor="modificationDate"><h6 className="text-primary mb-0 ml-1" >Modefier (Now):</h6></Form.Label>
                                    <Form.Label id="modificationDate" className="border rounded border-dark d-block p-2">{termNoticeObject.Modifier}</Form.Label>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Check inline name="IsDeleted" label="Is Deleted?" checked={termNoticeObject.IsDeleted} onChange={handleChange} className="mt-2" />
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
export default TeacherNoticeAssignPublicForm;



