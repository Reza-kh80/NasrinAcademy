import React, { useState, useEffect, useRef, useContext, useCallback } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import SimpleReactValidator from 'simple-react-validator';
import Form from 'react-bootstrap/Form';
import { getDatetime } from '../../../utils/datetime';
import UserContext from '../../../utils/user-context';
import { Container, Row, Col, Button } from 'reactstrap';
import { initialPrivateStudentObject } from './dean-form-objects'
const FileUpload = React.lazy(() => import('../../general/fileUpload'));
const MyDropdown = React.lazy(() => import('../../general/dropdown'));
function DeanPrivateStudentForm(props) {
    const apiEndPoint = process.env.REACT_APP_APIEndPoint;
    const mediaEndMoint = process.env.REACT_APP_MediaEndPoint;
    const currentUser = useContext(UserContext);
    const [imgHeight, setImgHeight] = useState(0)
    const [imgWidth, setImgWidth] = useState(0)
    const simpleValidator = useRef(new SimpleReactValidator())
    const { show, onHide, title, studentId, isRegistered, teacherCourseId } = props;
    const [studentObject, setStudentObject] = useState(initialPrivateStudentObject);
    const [dropdownList, setDropdownList] = useState([]);
    const [privateTeacherCourseId, setPrivateTeacherCourseId] = useState(teacherCourseId);
    const onEditStudent = useCallback((list) => {
        setStudentObject(prevState => ({
            ...prevState,
            StudentId: list.StudentId,
            Name: list.Name,
            Phone: list.Phone,
            Email: list.Email,
            Photo: list.Photo,
            Address: list.Address,
            Message: list.Message,
            IsRegistered: list.IsRegistered,
            Modifier: currentUser.Username,
            ModificationDate: getDatetime(),
            IsDeleted: list.IsDeleted,
            PrivateTeacherCourseId: list.PrivateTeacherCourseId,
            UserId: list.UserId,
            Username: list.Username,
            Password: "",
            RoleId: "2",
        }));
    }, [currentUser.Username])
    useEffect(() => {
        // console.log("Student Object=", studentObject)
        setPrivateTeacherCourseId(teacherCourseId);
    }, [studentObject, teacherCourseId]);
    useEffect(() => {
        let list = [];
        let mounted = true;
        const fetchData = async () => {
            const result = await axios.get(apiEndPoint + `TeacherCourse/DisplayAllPrivateDropdown`)
            if (mounted) {
                result.data.map(m => list.push({
                    value: m.PrivateTeacherCourseId,
                    label: m.TeacherName + '/' + m.CourseName,
                }));
                setDropdownList(list)
            }
        };
        fetchData();
        return () => {
            mounted = false;
        };
    }, [apiEndPoint, teacherCourseId]);
    useEffect(() => {
        let mounted = true;
        if (studentId === 0) {
            setStudentObject(initialPrivateStudentObject);
            setStudentObject(prevState => ({
                ...prevState, Modifier: currentUser.Username
            }));
        }
        else if (studentId > 0) {
            const fetchData = async () => {
                const result = await axios.get(apiEndPoint + `Student/GetPrivate?studentId=${studentId}`)
                if (mounted) {
                    onEditStudent(result.data);
                }
            };
            fetchData();
            return () => {
                mounted = false;
            };
        }
    }, [studentId, apiEndPoint, onEditStudent, currentUser.Username]);
    const addDefaultSrc = (ev) => {
        return ev.target.src = "main-images/user.webp";
    }
    const onImgLoad = ({ target: img }) => {
        setImgHeight(img.naturalHeight);
        setImgWidth(img.naturalWidth);
    }
    const handleChangeStudent = (e) => {
        const { name, value, checked } = e.target;
        if (e.target.type === 'checkbox') {
            setStudentObject(prevState => ({ ...prevState, [name]: checked }));
        }
        else {
            setStudentObject(prevState => ({ ...prevState, [name]: value }));
        }
    }
    const handleUpload = (fileName) => {
        setStudentObject(prevState => ({
            ...prevState,
            Photo: fileName
        }));
    }
    const handleDropdownSelect = (e) => {
        let privateTeacherCourseId = e.target.value;
        if (privateTeacherCourseId === "" || privateTeacherCourseId === null || privateTeacherCourseId === undefined) {
            setPrivateTeacherCourseId(0);
            return;
        }
        else {
            setPrivateTeacherCourseId(privateTeacherCourseId);
            setStudentObject(prevState => ({
                ...prevState,
                PrivateTeacherCourseId: privateTeacherCourseId
            }));
        }
    }
    const handleSubmit = () => {
        if (simpleValidator.current.allValid()) {
            axios.post(apiEndPoint + 'Student/AddPrivate', studentObject, {})
                .then(response => {
                    simpleValidator.current.hideMessages();
                    alert('You submitted the form and stuff!');
                    onHide();
                })
                .catch(function (error) {
                    alert(error);
                })
        } else {
            simpleValidator.current.showMessages();
        }
    }
    return (
        <div>
            <Modal
                size="xl"
                show={show}
                onHide={onHide}
                backdrop="static"
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton className="loginHeader p-2">
                    <Row className="align-items-center" >
                        <Col xs="2" className="text-center">
                            <img src="main-images/logo-circle.webp" width="100%" height="100%" alt="logo" />
                        </Col>
                        <Col xs="10" className='text-left m-0 p-0'>
                            <Modal.Title id="example-modal-sizes-title-lg" className="h4 font-weight-bold text-warning">{title}</Modal.Title>
                        </Col>
                    </Row>
                </Modal.Header>
                <Modal.Body>
                    <Container fluid className="table">
                        <Row>
                            <Col xs="12" lg="4" className="text-left m-0 p-1">
                                <Form>
                                    <Form.Group>
                                        <Form.Label htmlFor="username"><h6 className="text-primary mb-0 ml-1" >Username:</h6></Form.Label>
                                        <Form.Control id="username" name="Username" type="text" placeholder="firstname.lastname@nasinacademy.com" autoComplete="nope" value={studentObject.Username} onChange={handleChangeStudent} onBlur={simpleValidator.current.showMessageFor('email')} />
                                        {simpleValidator.current.message('email', studentObject.Username, 'required|email|max:100', { className: 'alert alert-danger' })}
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label htmlFor="password"><h6 className="text-primary mb-0 ml-1" >Password:</h6></Form.Label>
                                        <Form.Control id="password" name="Password" type="password" placeholder="Enter Password" autoComplete="new-password" value={studentObject.Password} onChange={handleChangeStudent} onBlur={simpleValidator.current.showMessageFor('password')} />
                                        {!isRegistered && simpleValidator.current.message('password', studentObject.Password, 'required', { className: 'alert alert-danger' })}
                                    </Form.Group>
                                    <Form.Group>
                                        <MyDropdown
                                            label={"Selecte a Teache Course"}
                                            display={"All Teacher Courses"}
                                            dataList={dropdownList}
                                            handleChange={handleDropdownSelect}
                                            name="language"
                                            selectedValue={privateTeacherCourseId}
                                            htmlFor="privateTeacherCourseId"
                                            width={null}
                                        />
                                        <Form.Check inline name="IsRegistered" label="Do you want to register ?" checked={studentObject.IsRegistered} onChange={handleChangeStudent} />
                                        <Form.Check inline name="IsDeleted" label="Avtive or Inactive?" checked={studentObject.IsDeleted} onChange={handleChangeStudent} />
                                    </Form.Group>
                                </Form>
                            </Col>
                            <Col xs="12" lg="4" className="text-center m-0 p-1">
                                <FileUpload postMethod={'Student/UploadFile'} title="Photo(jpeg.jpg)" accept={['jpg', 'jpeg']} specifiedFileName="NoName" onUpload={handleUpload} onBlur={simpleValidator.current.showMessageFor('photo')} />
                                {simpleValidator.current.message('photo', studentObject.Photo, 'required|min:1', { className: 'alert alert-danger' })}
                                {studentObject.Photo !== "" && <img className="img-card" onLoad={onImgLoad} width="200" height="200" src={mediaEndMoint + 'Student/' + studentObject.Photo} onError={addDefaultSrc} alt={studentObject.Name + "photo"} />}
                                {studentObject.Photo !== "" && <div>Image Size (400 Accepted): <strong className={imgHeight !== 400 ? "text-danger" : "text-success"}>Height: {imgHeight}</strong> | <strong className={imgWidth !== 400 ? "text-danger" : "text-success"}>Width: {imgWidth}</strong></div>}
                            </Col>
                            <Col xs="12" lg="4" className="text-left m-0 p-1">
                                <Form.Group>
                                    <Form.Label htmlFor="modificationDate"><h6 className="text-primary mb-0 ml-1" >Modefication Date (Now):</h6></Form.Label>
                                    <Form.Label id="modificationDate" className="border rounded border-dark d-block p-2">{studentObject.ModificationDate}</Form.Label>
                                    <Form.Label htmlFor="modificationDate"><h6 className="text-primary mb-0 ml-1" >Modefier (Now):</h6></Form.Label>
                                    <Form.Label id="modificationDate" className="border rounded border-dark d-block p-2">{studentObject.Modifier}</Form.Label>
                                    <Form.Label htmlFor="message"><h6 className="text-primary mb-0 ml-1" >Message:</h6></Form.Label>
                                    <Form.Label id="message" className="border rounded border-dark d-block p-2">{studentObject.Message}</Form.Label>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12" className="m-0 p-1">
                                <hr />
                                <h4 className="text-success font-weight-bold m-0 p-0">Contacts</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12" lg="4" className="m-0 p-1">
                                <Form.Group>
                                    <Form.Label htmlFor="name"><h6 className="text-primary mb-0 ml-1" >Full Name:</h6></Form.Label>
                                    <Form.Control id="name" name="Name" type="text" placeholder="Enter Full Name" value={studentObject.Name} onChange={handleChangeStudent} onBlur={simpleValidator.current.showMessageFor('full name (english)')} />
                                    {simpleValidator.current.message('full name (english)', studentObject.Name, 'required|max:50', { className: 'alert alert-danger' })}
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12" lg="3" className="text-left m-0 p-1">
                                <Form.Group>
                                    <Form.Label htmlFor="phone"><h6 className="text-primary mb-0 ml-1" >Phone:</h6></Form.Label>
                                    <Form.Control id="phone" name="Phone" type="text" placeholder="Enter Phone" value={studentObject.Phone} onChange={handleChangeStudent} onBlur={simpleValidator.current.showMessageFor('phone')} />
                                    {simpleValidator.current.message('phone', studentObject.Phone, 'required|max:100', { className: 'alert alert-danger' })}
                                </Form.Group>
                            </Col>
                            <Col xs="12" lg="3" className="text-left m-0 p-1">
                                <Form.Group>
                                    <Form.Label htmlFor="email"><h6 className="text-primary mb-0 ml-1" >Email:</h6></Form.Label>
                                    <Form.Control id="email" name="Email" type="text" placeholder="Enter Email" value={studentObject.Email} onChange={handleChangeStudent} onBlur={simpleValidator.current.showMessageFor('email')} />
                                    {simpleValidator.current.message('email', studentObject.Email, 'required|email|max:100', { className: 'alert alert-danger' })}
                                </Form.Group>
                            </Col>
                            <Col xs="12" lg="6" className="text-left m-0 p-1">
                                <Form.Group>
                                    <Form.Label htmlFor="address"><h6 className="text-primary mb-0 ml-1" >Address:</h6></Form.Label>
                                    <Form.Control id="address" name="Address" type="text" placeholder="Enter Address" value={studentObject.Address} onChange={handleChangeStudent} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="text-right">
                                <Button className="btn btn-sm float-right" onClick={handleSubmit} >{isRegistered ? "Edit Student" : "Register Student"}</Button>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
        </div>
    );
}
export default DeanPrivateStudentForm;
