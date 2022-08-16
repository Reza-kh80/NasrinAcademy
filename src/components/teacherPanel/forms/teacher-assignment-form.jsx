import React, { useState, useEffect, useRef, useContext, useCallback } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import SimpleReactValidator from 'simple-react-validator';
import Form from 'react-bootstrap/Form';
import { getDatetime } from '../../../utils/datetime';
import UserContext from '../../../utils/user-context';
import { Container, Row, Col, Button } from 'reactstrap';
import { initialAssignmentObject } from './teacher-form-objects';
const FileUpload = React.lazy(() => import('../../general/fileUpload'));
function TeacherAssignmentForm(props) {
    const apiEndPoint = process.env.REACT_APP_APIEndPoint;
    const mediaEndPoint = process.env.REACT_APP_MediaEndPoint;
    const currentUser = useContext(UserContext);
    const simpleValidator = useRef(new SimpleReactValidator())
    const { show, onHide, id, title } = props;
    const [assignmentObject, setAssignmentObject] = useState(initialAssignmentObject);
    const onEditHandler = useCallback((list) => {
        setAssignmentObject(prevState => ({
            ...prevState,
            AssignmentId: list.AssignmentId,
            Title: list.Title,
            Request: list.Request,
            FileName: list.FileName,
            TeacherId: list.TeacherId,
            Modifier: currentUser.Username,
            ModificationDate: getDatetime(),
            IsDeleted: list.IsDeleted,
        }));
    }, [currentUser.Username])
    useEffect(() => {
        // console.log("Assignment Object=", assignmentObject)
    }, [assignmentObject]);
    useEffect(() => {
        let mounted = true;
        if (id !== "") {
            const fetchData = async () => {
                const result = await axios.get(apiEndPoint + `Assignment/Get?assignmentId=${id}`)
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
            setAssignmentObject(initialAssignmentObject);
            setAssignmentObject(prevState => ({
                ...prevState,
                Modifier: currentUser.Username,
                TeacherId: currentUser.UserId
            }));
        }

    }, [id, apiEndPoint, currentUser.Username, currentUser.UserId, onEditHandler]);
    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        if (e.target.type === 'checkbox') {
            setAssignmentObject(prevState => ({ ...prevState, [name]: checked }));
        }
        else {
            setAssignmentObject(prevState => ({ ...prevState, [name]: value }));
        }
    }
    const handleUpload = (fileName) => {
        setAssignmentObject(prevState => ({
            ...prevState,
            FileName: fileName
        }));
    }
    const handleSubmit = () => {
        if (simpleValidator.current.allValid()) {
            axios.post(apiEndPoint + 'Assignment/Add', assignmentObject, {})
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
                                    <Form.Label htmlFor="modificationDate"><h6 className="text-primary mb-0 ml-1" >Modefication Date (Now):</h6></Form.Label>
                                    <Form.Label id="modificationDate" className="border rounded border-dark d-block p-2">{assignmentObject.ModificationDate}</Form.Label>
                                    <Form.Label htmlFor="modificationDate"><h6 className="text-primary mb-0 ml-1" >Modefier (Now):</h6></Form.Label>
                                    <Form.Label id="modificationDate" className="border rounded border-dark d-block p-2">{assignmentObject.Modifier}</Form.Label>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Check inline name="IsDeleted" label="Is Deleted?" checked={assignmentObject.IsDeleted} onChange={handleChange} className="mt-2" />
                                </Form.Group>
                                {currentUser.RoleName === 'Dean' &&
                                    <Form.Group>
                                        <Form.Check inline name="IsFree" label="Is This Video Free?" checked={assignmentObject.IsFree} onChange={handleChange} />
                                    </Form.Group>}
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12" className="m-0 p-1">
                                <FileUpload postMethod={'Assignment/UploadFile'} title="FileName(pdf,docx)" accept={['pdf', 'docx']} specifiedFileName="NoName" onUpload={handleUpload} onBlur={simpleValidator.current.showMessageFor('document')} />
                                {simpleValidator.current.message('document', assignmentObject.FileName, 'required|min:1', { className: 'alert alert-danger' })}
                                {assignmentObject.FileName !== '' &&
                                    <Form.Label className="bg-success w-100 rounded pl-3 p-2 text-white">
                                        File Name:
                                    <a className="pl-2" href={mediaEndPoint + "Assignment/" + assignmentObject.FileName} download>{assignmentObject.FileName}</a>
                                    </Form.Label>}
                            </Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col xs="12" className="m-0 p-1">
                                <Form.Group>
                                    <Form.Label htmlFor="title"><h6 className="text-primary mb-0 ml-1" >Title:</h6></Form.Label>
                                    <Form.Control id="title" name="Title" type="text" placeholder="Enter Title" value={assignmentObject.Title} onChange={handleChange} onBlur={simpleValidator.current.showMessageFor('title')} />
                                    {simpleValidator.current.message('title', assignmentObject.Title, 'required|max:50', { className: 'alert alert-danger' })}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor="request"><h6 className="text-primary mb-0 ml-1" >Request:</h6></Form.Label>
                                    <Form.Control id="request" name="Request" as="textarea" rows={10} placeholder="Enter description" value={assignmentObject.Request} onChange={handleChange} onBlur={simpleValidator.current.showMessageFor('request')} />
                                    {simpleValidator.current.message('request', assignmentObject.Request, 'required|max:1000', { className: 'alert alert-danger' })}
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
export default TeacherAssignmentForm;



