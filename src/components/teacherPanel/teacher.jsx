import React, { useEffect, lazy, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';
import TeacherContent from './teacher-content';
import TeacherMenu from './teacher-menu';
import Footer from '../general/footer';
import jwt_decode from 'jwt-decode';
import UserContext from '../../utils/user-context';
const TeacherAgreement = lazy(() => import('./teacher-agreement'))
const Teacher = () => {
    const token = localStorage.getItem('token');
    const apiEndPoint = process.env.REACT_APP_APIEndPoint;
    const user = jwt_decode(token);
    const [teacherObject, setTeacherObject] = useState({});
    const [showAgreement, setShowAgreement] = useState(false)
    useEffect(() => {
        const fetch = async () => {
            const result = await axios.get(apiEndPoint + `Teacher/GetTeacher?teacherId=${user.UserId}`);
            setTeacherObject(result.data);
            setTeacherObject(prevState => ({ ...prevState, SignedAgreement: true }))
            if (!result.data.SignedAgreement) {
                setShowAgreement(true);
            }
        }
        fetch();
    }, [apiEndPoint, user.UserId]);

    const handleAcceptAgreement = async () => {
        await axios.post(apiEndPoint + `Teacher/UpdateAgreement`, teacherObject, {}).then(response => {
            alert('You submitted the form and stuff!');
            setShowAgreement(false);
        });
    }
    const handleHide = () => {
        setShowAgreement(false);
    }
    return (
        <UserContext.Provider value={user}>
            <div className="m-0 p-0">
                <Container fluid>
                    <Row >
                        <Col xs="12" className="p-0 m-0" >
                            <TeacherMenu />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12" className="student_body" >
                            <TeacherContent />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12" className="p-0 m-0">
                            <Footer />
                        </Col>
                    </Row>
                </Container>
                <TeacherAgreement show={showAgreement} onHide={handleHide} onAccept={handleAcceptAgreement} />
            </div>
        </UserContext.Provider>
    );
}

export default Teacher;