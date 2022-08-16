import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { initialTermPaymentUpdate } from '../studentPanel/forms/student-form-objects';
import {
    Container, Row, Col, Button, Card, CardHeader, CardFooter, CardBody, CardText
} from 'reactstrap';
import UserContext from '../../utils/user-context';
function StudentPaymentSuccessful(props) {
    const apiEndPoint = process.env.REACT_APP_APIEndPoint;
    const currentUser = useContext(UserContext);
    const termPaymentId = localStorage.getItem('termPaymentId');
    const amount = localStorage.getItem('amount');
    let mainText = window.location.href;
    // let mainText = 'http://nasrinacademy.com/#/student/successful?Authority=A00000000000000000000000000258867020&Status=OK';
    let index = mainText.lastIndexOf('&');
    let revised = mainText.substr(0, index);
    let authority = revised.substr(revised.length - 36, revised.length - 1);
    const [termPaymentUpdate, setTermPaymentUpdate] = useState(initialTermPaymentUpdate);
    const returnToPayment = (status) => {
        if (status === 1) {
            window.location = '#/student';
        }
        else {
            window.location = '#/student/payment';
        }
    }
    // useEffect(() => {
    //     // console.log(termPaymentUpdate)
    // }, [termPaymentUpdate]);
    useEffect(() => {
        const url = currentUser.status
            ? apiEndPoint + `Payment/PublicPaymentVerification?termPaymentId=${termPaymentId}&authorityNumber=${authority}&amount=${amount}`
            : apiEndPoint + `Payment/PrivatePaymentVerification?termPaymentId=${termPaymentId}&authorityNumber=${authority}&amount=${amount}`;
        let mounted = true;
        const fetchData = async () => {
            const result = await axios.post(url)
            if (mounted) {
                setTermPaymentUpdate(prevState => ({
                    ...prevState,
                    TermPaymentId: termPaymentId,
                    ReferenceId: result.data.Ref_Id,
                    Status: result.data.Message,
                    CardPan: result.data.Card_Pan
                }))
            }
        };
        fetchData();
        return () => {
            mounted = false;
        };
    });
    return (
        <div>
            <Container fluid>
                <Row xs="12" className="align-content-center">
                    <Col xs="12" className="text-center">
                        {termPaymentUpdate.TermPaymentId !== 0 &&
                            <div>
                                {(termPaymentUpdate.Status === "Verified" || termPaymentUpdate.Status === "Paid") ?
                                    <Card>
                                        <CardHeader className="text-success h4">Successful Payment</CardHeader>
                                        <CardBody>
                                            <CardText className="text-secondary">Reference Number: <span className="text-info"> {termPaymentUpdate.ReferenceId}</span></CardText>
                                            <CardText className="text-secondary">Amount: <span className="text-info"> {amount} Rials</span></CardText>
                                            <CardText className="text-secondary">From Card: <span className="text-info"> {termPaymentUpdate.CardPan}</span></CardText>
                                        </CardBody>
                                        <CardFooter>
                                            <Button onClick={() => returnToPayment(1)} className="btn btn-sm">Go Back to Status</Button>
                                        </CardFooter>
                                    </Card>

                                    :
                                    <Card>
                                        <CardHeader className="text-danger h4">Payment was not successfull !!!</CardHeader>
                                        <CardBody>
                                            <Button onClick={() => returnToPayment(0)} className="btn btn-sm">Back to Payments</Button>
                                        </CardBody>
                                    </Card>
                                }
                            </div>}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default StudentPaymentSuccessful;