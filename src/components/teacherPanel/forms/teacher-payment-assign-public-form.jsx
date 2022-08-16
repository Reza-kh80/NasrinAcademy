import React, { useState, useEffect, useRef, useContext, useCallback } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import SimpleReactValidator from 'simple-react-validator';
import Form from 'react-bootstrap/Form';
import { getDatetime } from '../../../utils/datetime';
import UserContext from '../../../utils/user-context';
import { Container, Row, Col, Button } from 'reactstrap';
import { initialPublicTermPaymentObject } from './teacher-form-objects';
function TeacherPaymentAssignPublicForm(props) {
    const apiEndPoint = process.env.REACT_APP_APIEndPoint;
    const currentUser = useContext(UserContext);
    const simpleValidator = useRef(new SimpleReactValidator())
    const { show, onHide, studentId, paymentId, title } = props;
    const [termPaymentObject, setTermPaymentObject] = useState(initialPublicTermPaymentObject);
    const onEditHandler = useCallback((list) => {
        setTermPaymentObject(prevState => ({
            ...prevState,
            PublicTermPaymentId: list.PublicTermPaymentId,
            Amount: parseInt(list.Amount),
            IssueDate: getDatetime(),
            DueDate: list.DueDate,
            IsPaid: false,
            PaidDate: "",
            ReferenceId: list.ReferenceId,
            Status: list.Status,
            Authority: list.Authority,
            Modifier: currentUser.Username,
            IsDeleted: list.IsDeleted,
            StudentId: list.StudentId,
        }));
    }, [currentUser.Username])
    useEffect(() => {
        // console.log("TermPayment Object=", termPaymentObject)
        // console.log("type", typeof (termPaymentObject.amount))
    }, [termPaymentObject]);
    useEffect(() => {
        let mounted = true;
        if (studentId !== "" && paymentId !== "") {
            const fetchData = async () => {
                const result = await axios.get(apiEndPoint + `TermPayment/GetPublic?termPaymentId=${paymentId}`)
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
            setTermPaymentObject(initialPublicTermPaymentObject);
            setTermPaymentObject(prevState => ({
                ...prevState,
                Modifier: currentUser.Username,
                StudentId: studentId,
            }));
        }

    }, [studentId, paymentId, apiEndPoint, currentUser.Username, currentUser.UserId, onEditHandler]);
    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        if (e.target.type === 'checkbox') {
            setTermPaymentObject(prevState => ({ ...prevState, [name]: checked }));
        }
        else {
            setTermPaymentObject(prevState => ({ ...prevState, [name]: value }));
        }
    }
    const handleSubmit = () => {
        if (simpleValidator.current.allValid()) {
            axios.post(apiEndPoint + 'TermPayment/AddPublic', termPaymentObject, {})
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
                                    <Form.Label htmlFor="amount"><h6 className="text-primary mb-0 ml-1" >Amount:</h6></Form.Label>
                                    <Form.Control id="amount" name="Amount" type="text" placeholder="Enter Amount in Toman" value={termPaymentObject.Amount} onChange={handleChange} onBlur={simpleValidator.current.showMessageFor('amount')} />
                                </Form.Group>
                                {simpleValidator.current.message('amount', termPaymentObject.Amount, 'required|integer|min:20000,num|max:30000000,num', { className: 'alert alert-danger' })}
                                <Form.Group>
                                    <Form.Label htmlFor="dueDate"><h6 className="text-primary mb-0 ml-1" >Due Date:</h6></Form.Label>
                                    <Form.Control id="dueDate" name="DueDate" type="text" placeholder="Enter Due Date" value={termPaymentObject.DueDate} onChange={handleChange} onBlur={simpleValidator.current.showMessageFor('due date')} />
                                </Form.Group>
                                {simpleValidator.current.message('due date', termPaymentObject.DueDate, 'required|max:50', { className: 'alert alert-danger' })}
                                <Form.Group>
                                    <Form.Label htmlFor="modifier"><h6 className="text-primary mb-0 ml-1" >Modefier (Now):</h6></Form.Label>
                                    <Form.Label id="modifire" className="border rounded border-dark d-block p-2">{termPaymentObject.Modifier}</Form.Label>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Check inline name="IsDeleted" label="Is Deleted?" checked={termPaymentObject.IsDeleted} onChange={handleChange} className="mt-2" />
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
export default TeacherPaymentAssignPublicForm;



