import React, { useState, useEffect, useRef, useContext, useCallback } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import SimpleReactValidator from 'simple-react-validator';
import Form from 'react-bootstrap/Form';
import { getDatetime } from '../../../utils/datetime';
import UserContext from '../../../utils/user-context';
import { Container, Row, Col, Button } from 'reactstrap';
import { initialTeacherCourseObject } from './dean-form-objects';
const MyDropdown = React.lazy(() => import('../../general/dropdown'));
function DeanPrivateTeacherCourseForm(props) {
    const apiEndPoint = process.env.REACT_APP_APIEndPoint;
    const currentUser = useContext(UserContext);
    const simpleValidator = useRef(new SimpleReactValidator())
    const { show, onHide, id, title } = props;
    const [teacherCourseObject, setTeacherCourseObject] = useState(initialTeacherCourseObject);
    const [courseList, setCourseList] = useState([]);
    const [teacherList, setTeacherList] = useState([]);

    const onEditHandler = useCallback((list) => {
        setTeacherCourseObject(prevState => ({
            ...prevState,
            PrivateTeacherCourseId: list.PrivateTeacherCourseId,
            CourseId: list.CourseId,
            TeacherId: list.TeacherId,
            Modifier: currentUser.Username,
            ModificationDate: getDatetime(),
            IsDeleted: list.IsDeleted,
        }));
    }, [currentUser.Username])
    useEffect(() => {
        // console.log("Teacher Object=", teacherCourseObject)
        // console.log("courseList", courseList)
    }, [teacherCourseObject]);
    useEffect(() => {
        let mounted = true;
        if (id !== "") {
            const fetchData = async () => {
                const result = await axios.get(apiEndPoint + `TeacherCourse/GetPrivate?teacherCourseId=${id}`)
                if (mounted) {
                    onEditHandler(result.data);
                }
            };
            fetchData();
            return () => {
                mounted = false;
            };
        }
        else {
            setTeacherCourseObject(initialTeacherCourseObject);
            setTeacherCourseObject(prevState => ({
                ...prevState, Modifier: currentUser.Username
            }));
        }

    }, [id, apiEndPoint, currentUser.Username, onEditHandler]);
    useEffect(() => {
        let mounted = true;
        let dropdownList = [];
        const fetchData = async () => {
            const result = await axios.get(apiEndPoint + 'Course/DisplayDropdown')
            if (mounted) {
                result.data.map(m =>
                    dropdownList.push({
                        value: m.CourseId,
                        label: m.Title,
                    }),
                );
                setCourseList(dropdownList);
            }
        };
        fetchData();
        return () => {
            mounted = false;
        };
    }, [id, apiEndPoint]);
    useEffect(() => {
        let mounted = true;
        let dropdownList = [];
        const fetchData = async () => {
            const result = await axios.get(apiEndPoint + 'Teacher/DisplayDropdown')
            if (mounted) {
                result.data.map(m =>
                    dropdownList.push({
                        value: m.TeacherId,
                        label: m.Name,
                    }),
                );
                setTeacherList(dropdownList);
            }
        };
        fetchData();
        return () => {
            mounted = false;
        };
    }, [id, apiEndPoint]);
    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        if (e.target.type === 'checkbox') {
            setTeacherCourseObject(prevState => ({ ...prevState, [name]: checked }));
        }
        else {
            setTeacherCourseObject(prevState => ({ ...prevState, [name]: value }));
        }
    }
    const handleSubmit = () => {
        if (simpleValidator.current.allValid()) {
            axios.post(apiEndPoint + 'TeacherCourse/AddPrivate', teacherCourseObject, {})
                .then(response => {
                    alert('You submitted the form and stuff!');
                    simpleValidator.current.hideMessages();
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
                size="lg"
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
                            <Col xs="12" className="text-left m-0 p-1">
                                <Form>
                                    <MyDropdown
                                        label="Select Teacher"
                                        display="Select Teacher..."
                                        dataList={teacherList}
                                        handleChange={handleChange}
                                        name="TeacherId"
                                        selectedValue={teacherCourseObject.TeacherId}
                                        htmlFor="teacher"
                                        onBlur={simpleValidator.current.showMessageFor('teacher')}
                                    />
                                    {simpleValidator.current.message('teacher', teacherCourseObject.TeacherId, 'required', { className: 'alert alert-danger' })}
                                    <MyDropdown
                                        label="Select Course"
                                        display="Select Course..."
                                        dataList={courseList}
                                        handleChange={handleChange}
                                        name="CourseId"
                                        selectedValue={teacherCourseObject.CourseId}
                                        htmlFor="course"
                                        onBlur={simpleValidator.current.showMessageFor('course')}
                                    />
                                    {simpleValidator.current.message('course', teacherCourseObject.CourseId, 'required', { className: 'alert alert-danger' })}
                                    <Form.Group>
                                        <Form.Check inline name="IsDeleted" label="Is Deleted?" checked={teacherCourseObject.IsDeleted} onChange={handleChange} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label htmlFor="modificationDate"><h6 className="text-primary mb-0 ml-1" >Modefication Date (Now):</h6></Form.Label>
                                        <Form.Label id="modificationDate" className="border rounded border-dark d-block p-2">{teacherCourseObject.ModificationDate}</Form.Label>
                                        <Form.Label htmlFor="modificationDate"><h6 className="text-primary mb-0 ml-1" >Modefier (Now):</h6></Form.Label>
                                        <Form.Label id="modificationDate" className="border rounded border-dark d-block p-2">{teacherCourseObject.Modifier}</Form.Label>
                                    </Form.Group>
                                    <Button className="btn btn-sm float-right" onClick={handleSubmit} >Submit</Button>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
        </div>
    );
}
export default DeanPrivateTeacherCourseForm;

