import React, { useState, useContext, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { Container, Row, Col, Collapse, Navbar, NavbarToggler, Nav, NavItem, } from 'reactstrap';
import UserContext from '../../utils/user-context';
const StudentMenu = (props) => {
    const myContext = useContext(UserContext);
    const apiEndPoint = process.env.REACT_APP_APIEndPoint;
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const [teacherId, setTeacherId] = useState(0);
    const [hasArticle, setHasArticle] = useState(false);
    const [hasFlashCard, setHasFlashCard] = useState(false);
    useEffect(() => {
        const url = myContext.status
            ? apiEndPoint + `Student/GetPublicTeacherId?studentId=${myContext.user.UserId}`
            : apiEndPoint + `Student/GetPrivateTeacherId?studentId=${myContext.user.UserId}`;
        let mount = true;
        const fetch = async () => {
            const result = await axios.get(url);
            if (mount) {
                setTeacherId(result.data)
            }
        }
        fetch();
        return () => {
            mount = false;
        }
    }, [apiEndPoint, myContext.user.UserId, myContext.status])
    useEffect(() => {
        let mount = true;
        if (teacherId !== 0) {
            const fetch = async () => {
                const result = await axios.get(apiEndPoint + `Teacher/HasArticle?teacherId=${teacherId}`);
                if (mount) {
                    setHasArticle(result.data)
                }
            }
            fetch();
            return () => {
                mount = false;
            }
        }
    }, [apiEndPoint, teacherId])
    useEffect(() => {
        let mount = true;
        if (teacherId !== 0) {
            const fetch = async () => {
                const result = await axios.get(apiEndPoint + `Teacher/HasFlashCard?teacherId=${teacherId}`);
                if (mount) {
                    setHasFlashCard(result.data)
                }
            }
            fetch();
            return () => {
                mount = false;
            }
        }
    }, [apiEndPoint, teacherId]);
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
                        <div className="font-weight-bold p-1">Student Panel</div>
                        {window.innerWidth > 576 && <span className="font-weight-bold p-1 text-warning">{myContext.user.Username}</span>}
                    </Col>
                    {window.innerWidth < 576 && <Col xs="12" className="m-0 p-1" >
                        <span className="font-weight-bold p-1 h5 text-warning">{myContext.user.Username}</span>
                    </Col>}
                    <Col xs="12" lg="3" className="m-0 p-1" >
                        <button className="btn btn-link m-0 p-2" onClick={handleLogout}>Logout</button>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" className="bg-info pl-2 m-0">
                        <Navbar light expand="md">
                            <div className="font-weight-bold h5 p-0 m-0 text-warning text-left">Student Menu {'>>'}</div>
                            <NavbarToggler onClick={toggle} className="text-white" />
                            <Collapse isOpen={isOpen} navbar>
                                <Nav className="mr-auto text-left" navbar>
                                    <NavItem>
                                        <Link className="custom-link" to="/student">Status</Link>
                                    </NavItem>
                                    {hasArticle &&
                                        <NavItem>
                                            <Link className="custom-link" to="/student/lesson">Lessons</Link>
                                        </NavItem>
                                    }
                                    {hasFlashCard &&
                                        <NavItem>
                                            <Link className="custom-link" to="/student/flashcard">Flash Cards</Link>
                                        </NavItem>
                                    }
                                    <NavItem>
                                        <Link className="custom-link" to="/student/material">Materials</Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link className="custom-link" to="/student/assignment">Assignments</Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link className="custom-link" to="/student/certificate">Certificates</Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link className="custom-link" to="/student/payment">Payments</Link>
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

export default StudentMenu;