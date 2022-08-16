import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import DashboardContent from './dashboard-content';
import DashboardMenu from './dashboard-menu';
import Footer from '../general/footer';
class Dashboard extends Component {
    render() {
        return (
            <div className="m-0 p-0">
                <Container fluid>
                    <Row >
                        <Col xs="12" className="p-0 m-0" >
                            <DashboardMenu />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12" className="student_body" >
                            <DashboardContent />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12" className="p-0 m-0">
                            <Footer />
                        </Col>
                    </Row>
                </Container>
            </div>);
    }
}

export default Dashboard;