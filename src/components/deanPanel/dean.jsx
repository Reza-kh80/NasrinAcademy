import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import DeanContent from './dean-content';
import DeanMenu from './dean-menu';
import Footer from '../general/footer';
import jwt_decode from 'jwt-decode';
import UserContext from '../../utils/user-context';
const Dean = () => {
    const token = localStorage.getItem('token');
    const user = jwt_decode(token);
    return (
        <UserContext.Provider value={user}>
            <div className="m-0 p-0">
                <Container fluid>
                    <Row >
                        <Col xs="12" className="p-0 m-0" >
                            <DeanMenu />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12" className="student_body" >
                            <DeanContent />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12" className="p-0 m-0">
                            <Footer />
                        </Col>
                    </Row>
                </Container>
            </div>
        </UserContext.Provider>
    );
}

export default Dean;