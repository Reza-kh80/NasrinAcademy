import React, { useState, useEffect, useRef, useContext, useCallback } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import SimpleReactValidator from 'simple-react-validator';
import Form from 'react-bootstrap/Form';
import { getDatetime } from '../../../utils/datetime';
import UserContext from '../../../utils/user-context';
import { Container, Row, Col, Button } from 'reactstrap';
import { initialTermProgressObject } from './teacher-form-objects';
function TeacherProgressAssignForm(props) {
    const apiEndPoint = process.env.REACT_APP_APIEndPoint;
    const currentUser = useContext(UserContext);
    const simpleValidator = useRef(new SimpleReactValidator())
    const { show, onHide, studentId, progressId, title } = props;
    const [termProgressObject, setTermProgressObject] = useState(initialTermProgressObject);
    const onEditHandler = useCallback((list) => {
        setTermProgressObject(prevState => ({
            ...prevState,
            PrivateTermProgressId: list.PrivateTermProgressId,
            Label: list.Label,
            Plan: list.Plan,
            Actual: list.Actual,
            Modifier: currentUser.Username,
            ModificationDate: getDatetime(),
            IsDeleted: list.IsDeleted,
            StudentId: list.StudentId,
        }));
    }, [currentUser.Username])
    useEffect(() => {
        // console.log("TermProgress Object=", termProgressObject)
    }, [termProgressObject]);
    useEffect(() => {
        let mounted = true;
        if (studentId !== "" && progressId !== "") {
            const fetchData = async () => {
                const result = await axios.get(apiEndPoint + `TermProgress/GetPrivate?studentId=${studentId}&termProgressId=${progressId}`)
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
            setTermProgressObject(initialTermProgressObject);
            setTermProgressObject(prevState => ({
                ...prevState,
                Modifier: currentUser.Username,
                StudentId: studentId,
            }));
        }

    }, [studentId, progressId, apiEndPoint, currentUser.Username, currentUser.UserId, onEditHandler]);
    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        if (e.target.type === 'checkbox') {
            setTermProgressObject(prevState => ({ ...prevState, [name]: checked }));
        }
        else {
            setTermProgressObject(prevState => ({ ...prevState, [name]: value }));
        }
    }
    const handleSubmit = () => {
        if (simpleValidator.current.allValid()) {
            axios.post(apiEndPoint + 'TermProgress/AddPrivate', termProgressObject, {})
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
                                    <Form.Label htmlFor="label"><h6 className="text-primary mb-0 ml-1" >Label:</h6></Form.Label>
                                    <Form.Control id="label" name="Label" type="text" placeholder="Enter Label" value={termProgressObject.Label} onChange={handleChange} onBlur={simpleValidator.current.showMessageFor('label')} />
                                </Form.Group>
                                {simpleValidator.current.message('label', termProgressObject.Label, 'required', { className: 'alert alert-danger' })}
                                <Form.Group>
                                    <Form.Label htmlFor="plan"><h6 className="text-primary mb-0 ml-1" >Plan:</h6></Form.Label>
                                    <Form.Control id="plan" name="Plan" type="text" placeholder="Enter Plan (0-100)" value={termProgressObject.Plan} onChange={handleChange} onBlur={simpleValidator.current.showMessageFor('plan')} />
                                </Form.Group>
                                {/* {simpleValidator.current.message('plan', termProgressObject.Plan, 'required|numeric|min:0,num|max:100,num', { className: 'alert alert-danger' })} */}
                                {simpleValidator.current.message('plan', termProgressObject.Plan, 'required|numeric|between:0,100,num', { className: 'alert alert-danger' })}
                                <Form.Group>
                                    <Form.Label htmlFor="actual"><h6 className="text-primary mb-0 ml-1" >Actual:</h6></Form.Label>
                                    <Form.Control id="actual" name="Actual" type="text" placeholder="Enter Actual (0-100)" value={termProgressObject.Actual} onChange={handleChange} onBlur={simpleValidator.current.showMessageFor('actual')} />
                                </Form.Group>
                                {simpleValidator.current.message('actual', termProgressObject.Actual, 'required|numeric|between:0,100,num', { className: 'alert alert-danger' })}
                                <Form.Group>
                                    <Form.Label htmlFor="modificationDate"><h6 className="text-primary mb-0 ml-1" >Modefication Date (Now):</h6></Form.Label>
                                    <Form.Label id="modificationDate" className="border rounded border-dark d-block p-2">{termProgressObject.ModificationDate}</Form.Label>
                                    <Form.Label htmlFor="modificationDate"><h6 className="text-primary mb-0 ml-1" >Modefier (Now):</h6></Form.Label>
                                    <Form.Label id="modificationDate" className="border rounded border-dark d-block p-2">{termProgressObject.Modifier}</Form.Label>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Check inline name="IsDeleted" label="Is Deleted?" checked={termProgressObject.IsDeleted} onChange={handleChange} className="mt-2" />
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
export default TeacherProgressAssignForm;



