import React, { useState, useContext, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import {
    Container, Row, Col, Collapse, Navbar, NavbarToggler, Nav, NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import UserContext from '../../utils/user-context';
const TeacherMenu = (props) => {
    const myContext = useContext(UserContext);
    const apiEndPoint = process.env.REACT_APP_APIEndPoint;
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const [hasArticle, setHasArticle] = useState(false);
    const [hasFlashCard, setHasFlashCard] = useState(false);
    useEffect(() => {
        let mount = true;
        if (myContext.UserId !== 0) {
            const fetch = async () => {
                const result = await axios.get(apiEndPoint + `Teacher/HasArticle?teacherId=${myContext.UserId}`);
                if (mount) {
                    setHasArticle(result.data)
                }
            }
            fetch();
            return () => {
                mount = false;
            }
        }
    }, [apiEndPoint, myContext.UserId])
    useEffect(() => {
        let mount = true;
        if (myContext.UserId !== 0) {
            const fetch = async () => {
                const result = await axios.get(apiEndPoint + `Teacher/HasFlashCard?teacherId=${myContext.UserId}`);
                if (mount) {
                    setHasFlashCard(result.data)
                }
            }
            fetch();
            return () => {
                mount = false;
            }
        }
    }, [apiEndPoint, myContext.UserId]);
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
                        <div className="font-weight-bold p-1">Teacher Panel</div>
                        {window.innerWidth > 576 && <span className="font-weight-bold p-1 text-warning">{myContext.Username}</span>}
                    </Col>
                    {window.innerWidth < 576 && <Col xs="12" className="m-0 p-1" >
                        <span className="font-weight-bold p-1 h5 text-warning">{myContext.Username}</span>
                    </Col>}
                    <Col xs="12" lg="3" className="m-0 p-1" >
                        <button className="btn btn-link m-0 p-2" onClick={handleLogout}>Logout</button>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" className="bg-info pl-2 m-0">
                        <Navbar light expand="md">
                            <div className="font-weight-bold h5 p-0 m-0 text-warning text-left">Teacher Menu {'>>'}</div>
                            <NavbarToggler onClick={toggle} className="text-white" />
                            <Collapse isOpen={isOpen} navbar>
                                <Nav className="mr-auto text-left" navbar>
                                    {hasArticle &&
                                        <NavItem>
                                            <Link className="custom-link" to="/teacher/article">Articles</Link>
                                        </NavItem>
                                    }
                                    {hasFlashCard &&
                                        <NavItem>
                                            <Link className="custom-link" to="/teacher/flashcard">FlashCards</Link>
                                        </NavItem>
                                    }
                                    <NavItem>
                                        <Link className="custom-link" to="/teacher">Materials</Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link className="custom-link" to="/teacher/assignment">Assignments</Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link className="custom-link" to="/teacher/course-registration">Course Registration</Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link className="custom-link" to="/teacher/plan">Plan</Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link className="custom-link" to="/teacher/resume">Resume</Link>
                                    </NavItem>
                                    <UncontrolledDropdown nav inNavbar  >
                                        <DropdownToggle nav caret className="custom-link text-white">
                                            Private Students
                                        </DropdownToggle>
                                        <DropdownMenu right className="bg-info">
                                            {hasArticle &&
                                                <DropdownItem>
                                                    <Link className="custom-link" to="/teacher/assign-articles"> Assign Articles</Link>
                                                </DropdownItem>
                                            }
                                            {hasFlashCard &&
                                                <DropdownItem>
                                                    <Link className="custom-link" to="/teacher/assign-flashcard"> Assign FlashCards</Link>
                                                </DropdownItem>
                                            }
                                            <DropdownItem />
                                            <DropdownItem>
                                                <Link className="custom-link" to="/teacher/assign-material"> Assign Materials</Link>
                                            </DropdownItem>
                                            <DropdownItem>
                                                <Link className="custom-link" to="/teacher/assign-assignment"> Assign Assignments</Link>
                                            </DropdownItem>
                                            <DropdownItem>
                                                <Link className="custom-link" to="/teacher/assign-notice"> Assign Notices</Link>
                                            </DropdownItem>
                                            <DropdownItem>
                                                <Link className="custom-link" to="/teacher/assign-progress"> Assign Progress</Link>
                                            </DropdownItem>
                                            <DropdownItem>
                                                <Link className="custom-link" to="/teacher/assign-result"> Assign Results</Link>
                                            </DropdownItem>
                                            <DropdownItem>
                                                <Link className="custom-link" to="/teacher/assign-status"> Assign Status</Link>
                                            </DropdownItem>
                                            <DropdownItem>
                                                <Link className="custom-link" to="/teacher/assign-payment"> Assign Payment</Link>
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>

                                    <UncontrolledDropdown nav inNavbar  >
                                        <DropdownToggle nav caret className="custom-link text-white">
                                            Public Students
                                        </DropdownToggle>
                                        <DropdownMenu right className="bg-info">
                                            {hasArticle &&
                                                <DropdownItem>
                                                    <Link className="custom-link" to="/teacher/assign-articles-public"> Assign Articles</Link>
                                                </DropdownItem>
                                            }
                                            {hasFlashCard &&
                                                <DropdownItem>
                                                    <Link className="custom-link" to="/teacher/assign-flashcard-public"> Assign Flash Card</Link>
                                                </DropdownItem>
                                            }
                                            <DropdownItem>
                                                <Link className="custom-link" to="/teacher/assign-material-public"> Assign Materials</Link>
                                            </DropdownItem>
                                            <DropdownItem>
                                                <Link className="custom-link" to="/teacher/assign-assignment-public"> Assign Assignments</Link>
                                            </DropdownItem>
                                            <DropdownItem>
                                                <Link className="custom-link" to="/teacher/assign-notice-public"> Assign Notices</Link>
                                            </DropdownItem>
                                            <DropdownItem>
                                                <Link className="custom-link" to="/teacher/assign-progress-public"> Assign Progress</Link>
                                            </DropdownItem>
                                            <DropdownItem>
                                                <Link className="custom-link" to="/teacher/assign-result-public"> Assign Results</Link>
                                            </DropdownItem>
                                            <DropdownItem>
                                                <Link className="custom-link" to="/teacher/assign-status-public"> Assign Status</Link>
                                            </DropdownItem>
                                            <DropdownItem>
                                                <Link className="custom-link" to="/teacher/assign-payment-public"> Assign Payments</Link>
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </Nav>
                            </Collapse>
                        </Navbar>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default TeacherMenu;