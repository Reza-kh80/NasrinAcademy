import React, { useState, useEffect, useRef, useContext, useCallback } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import SimpleReactValidator from 'simple-react-validator';
import Form from 'react-bootstrap/Form';
import { getDatetime } from '../../../utils/datetime';
import UserContext from '../../../utils/user-context';
import { Container, Row, Col, Button } from 'reactstrap';
import { initialPublicTermResultObject } from './teacher-form-objects';
function TeacherResultAssignForm(props) {
    const apiEndPoint = process.env.REACT_APP_APIEndPoint;
    const currentUser = useContext(UserContext);
    const simpleValidator = useRef(new SimpleReactValidator())
    const { show, onHide, studentId, resultId, title } = props;
    const [termResultObject, setTermResultObject] = useState(initialPublicTermResultObject);
    const onEditHandler = useCallback((list) => {
        setTermResultObject(prevState => ({
            ...prevState,
            PublicTermResultId: list.PublicTermResultId,
            Code: list.Code,
            Title: list.Title,
            Duration: list.Duration,
            SessionNumber: list.SessionNumber,
            ResultDate: list.ResultDate,
            Modifier: currentUser.Username,
            ModificationDate: getDatetime(),
            IsDeleted: list.IsDeleted,
            StudentId: list.StudentId,
        }));
    }, [currentUser.Username])
    useEffect(() => {
        // console.log("TermResult Object=", termResultObject)
    }, [termResultObject]);
    useEffect(() => {
        let mounted = true;
        if (studentId !== "" && resultId !== "") {
            const fetchData = async () => {
                const result = await axios.get(apiEndPoint + `TermResult/GetPublic?studentId=${studentId}&termResultId=${resultId}`)
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
            setTermResultObject(initialPublicTermResultObject);
            setTermResultObject(prevState => ({
                ...prevState,
                Modifier: currentUser.Username,
                StudentId: studentId,
            }));
        }

    }, [studentId, resultId, apiEndPoint, currentUser.Username, currentUser.UserId, onEditHandler]);
    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        if (e.target.type === 'checkbox') {
            setTermResultObject(prevState => ({ ...prevState, [name]: checked }));
        }
        else {
            setTermResultObject(prevState => ({ ...prevState, [name]: value }));
        }
    }
    const handleSubmit = () => {
        if (simpleValidator.current.allValid()) {
            axios.post(apiEndPoint + 'TermResult/AddPublic', termResultObject, {})
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
                                <Form.Group>
                                    <Form.Label htmlFor="code"><h6 className="text-primary mb-0 ml-1" >Code:</h6></Form.Label>
                                    <Form.Control id="code" name="Code" type="text" placeholder="Enter Code" value={termResultObject.Code} onChange={handleChange} onBlur={simpleValidator.current.showMessageFor('code')} />
                                </Form.Group>
                                {simpleValidator.current.message('code', termResultObject.Code, 'required', { className: 'alert alert-danger' })}
                                <Form.Group>
                                    <Form.Label htmlFor="title"><h6 className="text-primary mb-0 ml-1" >Title:</h6></Form.Label>
                                    <Form.Control id="title" name="Title" type="text" placeholder="Enter Title" value={termResultObject.Title} onChange={handleChange} onBlur={simpleValidator.current.showMessageFor('title')} />
                                </Form.Group>
                                {simpleValidator.current.message('title', termResultObject.Title, 'required', { className: 'alert alert-danger' })}
                                <Form.Group>
                                    <Form.Label htmlFor="duration"><h6 className="text-primary mb-0 ml-1" >Duration:</h6></Form.Label>
                                    <Form.Control id="duration" name="Duration" type="text" placeholder="exp: 15th March 2021" value={termResultObject.Duration} onChange={handleChange} onBlur={simpleValidator.current.showMessageFor('duration')} />
                                </Form.Group>
                                {simpleValidator.current.message('duration', termResultObject.Duration, 'required', { className: 'alert alert-danger' })}
                                <Form.Group>
                                    <Form.Label htmlFor="sessionNumber"><h6 className="text-primary mb-0 ml-1" >Session Number:</h6></Form.Label>
                                    <Form.Control id="sessionNumber" name="SessionNumber" type="text" placeholder="Enter Session Numbers" value={termResultObject.SessionNumber} onChange={handleChange} onBlur={simpleValidator.current.showMessageFor('session number')} />
                                </Form.Group>
                                {simpleValidator.current.message('session number', termResultObject.SessionNumber, 'required', { className: 'alert alert-danger' })}
                                <Form.Group>
                                    <Form.Label htmlFor="resultDate"><h6 className="text-primary mb-0 ml-1" >Result Date:</h6></Form.Label>
                                    <Form.Control id="resultDate" name="ResultDate" type="text" placeholder="Enter Date" value={termResultObject.ResultDate} onChange={handleChange} onBlur={simpleValidator.current.showMessageFor('result date')} />
                                </Form.Group>
                                {simpleValidator.current.message('result date', termResultObject.ResultDate, 'required', { className: 'alert alert-danger' })}
                                <Form.Group>
                                    <Form.Label htmlFor="modificationDate"><h6 className="text-primary mb-0 ml-1" >Modefication Date (Now):</h6></Form.Label>
                                    <Form.Label id="modificationDate" className="border rounded border-dark d-block p-2">{termResultObject.ModificationDate}</Form.Label>
                                    <Form.Label htmlFor="modificationDate"><h6 className="text-primary mb-0 ml-1" >Modefier (Now):</h6></Form.Label>
                                    <Form.Label id="modificationDate" className="border rounded border-dark d-block p-2">{termResultObject.Modifier}</Form.Label>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Check inline name="IsDeleted" label="Is Deleted?" checked={termResultObject.IsDeleted} onChange={handleChange} className="mt-2" />
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
export default TeacherResultAssignForm;



