import React, { useState } from 'react';
import { Link } from "react-router-dom";
import {
    Container, Row, Col,
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
} from 'reactstrap';
import jwt_decode from 'jwt-decode';
const DashboardMenu = (props) => {
    const token = localStorage.getItem('token');
    const user = jwt_decode(token);
    const [isOpenCreate, setIsOpenCreate] = useState(false);
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location = "/";
    }
    return (
        <div className="p-0 m-0">
            <Container fluid >
                <Row className="student_header">
                    <Col xs="12" lg="3" className="m-0 p-1">
                        <img src="main-images/logo-circle.webp" width={window.innerWidth < 576 ? "60" : "90"} height={window.innerWidth < 576 ? "60" : "90"} alt="Logo" />
                    </Col>
                    <Col xs="12" lg="6" className={window.innerWidth < 576 ? "h5 m-0 p-0" : "h4 m-0 p-0"}>
                        <div className="font-weight-bold p-1">Admin Panel</div>
                        {window.innerWidth > 576 && <span className="font-weight-bold p-1 text-warning">{user.Username}</span>}
                    </Col>
                    {window.innerWidth < 576 && <Col xs="12" className="m-0 p-1" >
                        <span className="font-weight-bold p-1 h5 text-warning">{user.Username}</span>
                    </Col>}
                    <Col xs="12" lg="3" className="m-0 p-1" >
                        <button className="btn btn-link m-0 p-2" onClick={handleLogout}>Logout</button>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" className="bg-info pl-2 m-0">
                        <Navbar light expand="md">
                            <div className="font-weight-bold h6 p-0 m-0 text-secondary text-left">Main Menu {'>>'}</div>
                            <NavbarToggler onClick={() => setIsOpenCreate(!isOpenCreate)} className="text-white" />
                            <Collapse isOpen={isOpenCreate} navbar>
                                <Nav className="mr-auto text-left" navbar>
                                    <NavItem>
                                        <Link className="custom-link" to="/dashboard">Home</Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link className="custom-link" to="/dashboard/about">About</Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link className="custom-link" to="/dashboard/contact">Contact</Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link className="custom-link" to="/dashboard/register">Register</Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link className="custom-link" to="/dashboard/advertise">Advertise</Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link className="custom-link" to="/dashboard/agreement">Agreement</Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link className="custom-link" to="/dashboard/main-advertise">Pop up Advertise</Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link className="custom-link" to="/dashboard/video">Video</Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link className="custom-link" to="/dashboard/menu">Menu</Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link className="custom-link" to="/dashboard/user">User</Link>
                                    </NavItem>
                                </Nav>
                            </Collapse>
                        </Navbar>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" className="bg-info pl-2 m-0">
                        <Navbar light expand="md">
                            <div className="font-weight-bold h6 p-0 m-0 text-secondary text-left">Outlook's Menu {'>>'}</div>
                            <NavbarToggler onClick={() => setIsOpenCreate(!isOpenCreate)} className="text-white" />
                            <Collapse isOpen={isOpenCreate} navbar>
                                <Nav className="mr-auto text-left" navbar>
                                    <NavItem>
                                        <Link className="custom-link" to="/dashboard/courseoutlook">Course Outlook</Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link className="custom-link" to="/dashboard/teacheroutlook">Teacher Outlook</Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link className="custom-link" to="/dashboard/flashcardoutlook">Flash Card Outlook</Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link className="custom-link" to="/dashboard/videooutlook">Video Outlook</Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link className="custom-link" to="/dashboard/teacherrecruitment">Recruitment Outlook</Link>
                                    </NavItem>
                                </Nav>
                            </Collapse>
                        </Navbar>
                    </Col>
                </Row>

            </Container>
        </div>
    );
}

export default DashboardMenu;