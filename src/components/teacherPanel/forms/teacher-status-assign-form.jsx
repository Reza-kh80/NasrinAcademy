import React, { useState, useEffect, useRef, useContext, useCallback } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import SimpleReactValidator from 'simple-react-validator';
import Form from 'react-bootstrap/Form';
import { getDatetime } from '../../../utils/datetime';
import UserContext from '../../../utils/user-context';
import { Container, Row, Col, Button } from 'reactstrap';
import { initialTermStatusObject } from './teacher-form-objects';
function TeacherStatusAssignForm(props) {
    const apiEndPoint = process.env.REACT_APP_APIEndPoint;
    const currentUser = useContext(UserContext);
    const simpleValidator = useRef(new SimpleReactValidator())
    const { show, onHide, studentId, statusId, title } = props;
    const [termStatusObject, setTermStatusObject] = useState(initialTermStatusObject);
    const onEditHandler = useCallback((list) => {
        setTermStatusObject(prevState => ({
            ...prevState,
            PrivateTermStatusId: list.PrivateTermStatusId,
            Sessions: list.Sessions,
            RemainSessions: list.RemainSessions,
            NextPayment: list.NextPayment,
            NextPaymentDate: list.NextPaymentDate,
            TotalPayment: list.TotalPayment,
            Modifier: currentUser.Username,
            ModificationDate: getDatetime(),
            IsDeleted: list.IsDeleted,
            StudentId: list.StudentId,
        }));
    }, [currentUser.Username])
    useEffect(() => {
        // console.log("TermStatus Object=", termStatusObject)
    }, [termStatusObject]);
    useEffect(() => {
        let mounted = true;
        if (studentId !== "" && statusId !== "") {
            const fetchData = async () => {
                const result = await axios.get(apiEndPoint + `TermStatus/GetPrivate?studentId=${studentId}&termStatusId=${statusId}`)
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
            setTermStatusObject(initialTermStatusObject);
            setTermStatusObject(prevState => ({
                ...prevState,
                Modifier: currentUser.Username,
                StudentId: studentId,
            }));
        }

    }, [studentId, statusId, apiEndPoint, currentUser.Username, currentUser.UserId, onEditHandler]);
    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        if (e.target.type === 'checkbox') {
            setTermStatusObject(prevState => ({ ...prevState, [name]: checked }));
        }
        else {
            setTermStatusObject(prevState => ({ ...prevState, [name]: value }));
        }
    }
    const handleSubmit = () => {
        if (simpleValidator.current.allValid()) {
            axios.post(apiEndPoint + 'TermStatus/AddPrivate', termStatusObject, {})
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
                                    <Form.Label htmlFor="sessions"><h6 className="text-primary mb-0 ml-1" >Number of Sessions:</h6></Form.Label>
                                    <Form.Control id="sessions" name="Sessions" type="text" placeholder="Enter Number" value={termStatusObject.Sessions} onChange={handleChange} onBlur={simpleValidator.current.showMessageFor('sessions')} />
                                </Form.Group>
                                {simpleValidator.current.message('sessions', termStatusObject.Sessions, 'required', { className: 'alert alert-danger' })}
                                <Form.Group>
                                    <Form.Label htmlFor="remainSessions"><h6 className="text-primary mb-0 ml-1" >Remain Sessions:</h6></Form.Label>
                                    <Form.Control id="remainSessions" name="RemainSessions" type="text" placeholder="Enter Number" value={termStatusObject.RemainSessions} onChange={handleChange} onBlur={simpleValidator.current.showMessageFor('remain sessions')} />
                                </Form.Group>
                                {simpleValidator.current.message('remain sessions', termStatusObject.RemainSessions, 'required', { className: 'alert alert-danger' })}
                                <Form.Group>
                                    <Form.Label htmlFor="nextPayment"><h6 className="text-primary mb-0 ml-1" >Next Payment:</h6></Form.Label>
                                    <Form.Control id="nextPayment" name="NextPayment" type="text" placeholder="exp: 15th March 2021" value={termStatusObject.NextPayment} onChange={handleChange} onBlur={simpleValidator.current.showMessageFor('next payment')} />
                                </Form.Group>
                                {simpleValidator.current.message('next payment', termStatusObject.NextPayment, 'required', { className: 'alert alert-danger' })}
                                <Form.Group>
                                    <Form.Label htmlFor="nextPaymentDate"><h6 className="text-primary mb-0 ml-1" >Next Payment Date:</h6></Form.Label>
                                    <Form.Control id="nextPaymentDate" name="NextPaymentDate" type="text" placeholder="Enter Date exp:15Th March 2021" value={termStatusObject.NextPaymentDate} onChange={handleChange} onBlur={simpleValidator.current.showMessageFor('next payment date')} />
                                </Form.Group>
                                {simpleValidator.current.message('next payment date', termStatusObject.NextPaymentDate, 'required', { className: 'alert alert-danger' })}
                                <Form.Group>
                                    <Form.Label htmlFor="totalPayment"><h6 className="text-primary mb-0 ml-1" >Total Payments:</h6></Form.Label>
                                    <Form.Control id="totalPayment" name="TotalPayment" type="text" placeholder="Enter Date" value={termStatusObject.TotalPayment} onChange={handleChange} onBlur={simpleValidator.current.showMessageFor('total payment')} />
                                </Form.Group>
                                {simpleValidator.current.message('total payment', termStatusObject.TotalPayment, 'required', { className: 'alert alert-danger' })}
                                <Form.Group>
                                    <Form.Label htmlFor="modificationDate"><h6 className="text-primary mb-0 ml-1" >Modefication Date (Now):</h6></Form.Label>
                                    <Form.Label id="modificationDate" className="border rounded border-dark d-block p-2">{termStatusObject.ModificationDate}</Form.Label>
                                    <Form.Label htmlFor="modificationDate"><h6 className="text-primary mb-0 ml-1" >Modefier (Now):</h6></Form.Label>
                                    <Form.Label id="modificationDate" className="border rounded border-dark d-block p-2">{termStatusObject.Modifier}</Form.Label>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Check inline name="IsDeleted" label="Is Deleted?" checked={termStatusObject.IsDeleted} onChange={handleChange} className="mt-2" />
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
export default TeacherStatusAssignForm;



