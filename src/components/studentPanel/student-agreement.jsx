import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Container, Row, Col, Button } from 'reactstrap';
import axios from 'axios';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
function StudentAgreement(props) {
    const { show, onHide, onAccept } = props;
    const apiEndPoint = process.env.REACT_APP_APIEndPoint;
    const [agrrementObject, setAgreementObject] = useState({})
    useEffect(() => {
        const fetch = async () => {
            const result = await axios.get(apiEndPoint + `Agreement/Get`);
            setAgreementObject(result.data)
        }
        fetch();
    }, [apiEndPoint]);
    return (
        <div>
            <Modal
                size="lg"
                show={show}
                onHide={onHide}
                backdrop="static"
                animation
                aria-labelledby="example-modal-sizes-title-lg">
                <Modal.Header closeButton className="loginHeader p-2 align-items-center">
                    <img src="main-images/logo-circle.webp" width="70" height="70" alt="logo" />
                    <Modal.Title id="example-modal-sizes-title-lg" className="h4 font-weight-bold text-white pl-4">
                        <strong className="float-right"> Terms and Condition of Useing Student Panel</strong>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <Container fluid>
                        <Row >
                            <Col xs="12" >
                                <Tabs defaultActiveKey="1" id="uncontrolled-tab-example">
                                    <Tab eventKey="1" title="Terms and Conditions">
                                        <p className="wrap">{agrrementObject.DescriptionStudent}</p>
                                    </Tab>
                                    <Tab eventKey="2" title="قوانین و مقررات">
                                        <p className="wrap text-right" dir="rtl" >{agrrementObject.DescriptionStudentFa}</p>
                                    </Tab>
                                </Tabs>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer className="loginHeader">
                    <Button onClick={onAccept}> I will Accept Tems and Condition</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
export default StudentAgreement;