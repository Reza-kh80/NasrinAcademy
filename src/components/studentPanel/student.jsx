import React, { useState, useEffect, lazy } from 'react';
import { Container, Row, Col } from 'reactstrap';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import StudentContent from './student-content';
import StudentMenu from './student-menu';
import Footer from '../general/footer';
import UserContext from '../../utils/user-context';
const StudentAgreement = lazy(() => import('./student-agreement'));
const Student = () => {
    const token = localStorage.getItem('token');
    const apiEndPoint = process.env.REACT_APP_APIEndPoint;
    const user = jwt_decode(token);
    const [isPublic, setIsPublic] = useState(0);
    const [studentObject, setStudentObject] = useState({});
    const [showAgreement, setShowAgreement] = useState(false);
    useEffect(() => {
        let mount = true;
        const fetchIsPublic = async () => {
            const result = await axios.get(apiEndPoint + `Student/IsPublic?studentId=${user.UserId}`);
            if (mount) {
                setIsPublic(result.data);
                let url = result.data
                    ? apiEndPoint + `Student/GetPublicStudent?studentId=${user.UserId}`
                    : apiEndPoint + `Student/GetPrivateStudent?studentId=${user.UserId}`;
                const fetchStudent = async () => {
                    const result = await axios.get(url);
                    setStudentObject(result.data);
                    setStudentObject(prevState => ({ ...prevState, SignedAgreement: true }))
                    if (!result.data.SignedAgreement) {
                        setShowAgreement(true);
                    }
                }
                fetchStudent();
            }
        }
        fetchIsPublic();
        return () => {
            mount = false;
        }
    }, [user.UserId, apiEndPoint])
    const handleAcceptAgreement = async () => {
        let url = isPublic
            ? apiEndPoint + `Student/UpdatePublicAgreement`
            : apiEndPoint + `Student/UpdatePrivateAgreement`;
        await axios.post(url, studentObject, {}).then(response => {
            alert('You submitted the form and stuff!');
            setShowAgreement(false);
        });
    }
    const handleHide = () => {
        setShowAgreement(false);
    }
    return (
        <UserContext.Provider value={{ user, status: isPublic }}>
            <div className="m-0 p-0">
                <Container fluid>
                    <Row >
                        <Col xs="12" className="p-0 m-0" >
                            <StudentMenu />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12" className="student_body" >
                            <StudentContent />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12" className="p-0 m-0">
                            <Footer />
                        </Col>
                    </Row>
                </Container>
                <StudentAgreement show={showAgreement} onHide={handleHide} onAccept={handleAcceptAgreement} />
            </div>
        </UserContext.Provider>
    );
}

export default Student;