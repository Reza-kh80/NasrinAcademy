import React, { useState, useContext } from 'react';
import { Link } from "react-router-dom";
import {
    Container, Row, Col,
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import UserContext from '../../utils/user-context';
const DeanMenu = (props) => {
    const user = useContext(UserContext);
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
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
                        <div className="font-weight-bold p-1">Dean Panel</div>
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
                            <div className="font-weight-bold h5 p-0 m-0 text-warning text-left">Dean Menu {'>>'}</div>
                            <NavbarToggler onClick={toggle} className="text-white" />
                            <Collapse isOpen={isOpen} navbar>
                                <Nav className="mr-auto text-left" navbar>
                                    <UncontrolledDropdown nav inNavbar  >
                                        <DropdownToggle nav caret className="custom-link text-white">
                                            Drop Downs
                                        </DropdownToggle>
                                        <DropdownMenu right className="bg-info">
                                            <DropdownItem>
                                                <Link className="custom-link" to="/dean">Language</Link>
                                            </DropdownItem>
                                            <DropdownItem>
                                                <Link className="custom-link" to="/dean/level">Level</Link>
                                            </DropdownItem>
                                            <DropdownItem>
                                                <Link className="custom-link" to="/dean/flashcard-category">Flash Card Category</Link>
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                    <UncontrolledDropdown nav inNavbar  >
                                        <DropdownToggle nav caret className="custom-link text-white">
                                            Courses
                                        </DropdownToggle>
                                        <DropdownMenu right className="bg-info">
                                            <DropdownItem>
                                                <Link className="custom-link" to="/dean/course">Course</Link>
                                            </DropdownItem>
                                            <DropdownItem>
                                                <Link className="custom-link" to="/dean/courseoverview">Course Overview</Link>
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                    <NavItem>
                                        <Link className="custom-link" to="/dean/teacher">Teachers</Link>
                                    </NavItem>
                                    <UncontrolledDropdown nav inNavbar  >
                                        <DropdownToggle nav caret className="custom-link text-white">
                                            Private Classes
                                        </DropdownToggle>
                                        <DropdownMenu right className="bg-info">
                                            <DropdownItem>
                                                <Link className="custom-link" to="/dean/private-courses">Private Courses</Link>
                                            </DropdownItem>
                                            <DropdownItem>
                                                <Link className="custom-link" to="/dean/private-student">Private Students</Link>
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                    <UncontrolledDropdown nav inNavbar  >
                                        <DropdownToggle nav caret className="custom-link text-white">
                                            Public Classes
                                        </DropdownToggle>
                                        <DropdownMenu right className="bg-info">
                                            <DropdownItem>
                                                <Link className="custom-link" to="/dean/public-courses">Public Courses</Link>
                                            </DropdownItem>
                                            <DropdownItem>
                                                <Link className="custom-link" to="/dean/public-classes">Public Classes</Link>
                                            </DropdownItem>
                                            <DropdownItem>
                                                <Link className="custom-link" to="/dean/public-student">Public Students</Link>
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                    <UncontrolledDropdown nav inNavbar  >
                                        <DropdownToggle nav caret className="custom-link text-white">
                                            Flash-Article
                                        </DropdownToggle>
                                        <DropdownMenu right className="bg-info">
                                            <DropdownItem>
                                                <Link className="custom-link" to="/dean/article">Article</Link>
                                            </DropdownItem>
                                            <DropdownItem>
                                                <Link className="custom-link" to="/dean/flashcard">FlashCard</Link>
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

export default DeanMenu;