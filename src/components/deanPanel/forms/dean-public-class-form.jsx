import React, { useState, useEffect, useRef, useContext, useCallback } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import SimpleReactValidator from 'simple-react-validator';
import Form from 'react-bootstrap/Form';
import { getDatetime } from '../../../utils/datetime';
import UserContext from '../../../utils/user-context';
import { Container, Row, Col, Button } from 'reactstrap';
import { initialPublicTermObject } from './dean-form-objects';
const MyDropdown = React.lazy(() => import('../../general/dropdown'));
function DeanPublicClassForm(props) {
    const apiEndPoint = process.env.REACT_APP_APIEndPoint;
    const currentUser = useContext(UserContext);
    const simpleValidator = useRef(new SimpleReactValidator());
    const { show, onHide, id, title } = props;
    const [termObject, setTermObject] = useState(initialPublicTermObject);
    const [teacherCourseList, setTeacherCourseList] = useState([]);
    const onEditHandler = useCallback((list) => {
        setTermObject(prevState => ({
            ...prevState,
            PublicTermId: list.PublicTermId,
            PublicTeacherCourseId: list.PublicTeacherCourseId,
            Capacity: list.Capacity,
            AvailableCapacity: list.AvailableCapacity,
            Price: list.Price,
            Duration: list.Duration,
            Start: list.Start,
            Finish: list.Finish,
            Times: list.Times,
            EnrollmentDeadline: list.EnrollmentDeadline,
            PriceFa: list.PriceFa,
            DurationFa: list.DurationFa,
            StartFa: list.StartFa,
            FinishFa: list.FinishFa,
            TimesFa: list.TimesFa,
            EnrollmentDeadlineFa: list.EnrollmentDeadlineFa,
            Modifier: currentUser.Username,
            ModificationDate: getDatetime(),
            IsDeleted: list.IsDeleted,
        }));
    }, [currentUser.Username])
    useEffect(() => {
        // console.log("Teacher Object=", termObject)
        // console.log("studentList", studentList)
    }, [termObject]);
    useEffect(() => {
        let mounted = true;
        if (id !== "") {
            const fetchData = async () => {
                const result = await axios.get(apiEndPoint + `Term/GetPublic?termId=${id}`)
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
            setTermObject(initialPublicTermObject);
            setTermObject(prevState => ({
                ...prevState, Modifier: currentUser.Username
            }));
        }

    }, [id, apiEndPoint, currentUser.Username, onEditHandler]);
    useEffect(() => {
        let mounted = true;
        let dropdownList = [];
        const fetchData = async () => {
            const result = await axios.get(apiEndPoint + 'TeacherCourse/DisplayPublicDropdown')
            if (mounted) {
                result.data.map(m =>
                    dropdownList.push({
                        value: m.PublicTeacherCourseId,
                        label: m.TeacherName + ` : (${m.CourseName})`,
                    }),
                );
                setTeacherCourseList(dropdownList);
            }
        };
        fetchData();
        return () => {
            mounted = false;
        };
    }, [apiEndPoint]);
    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        if (e.target.type === 'checkbox') {
            setTermObject(prevState => ({ ...prevState, [name]: checked }));
        }
        else {
            setTermObject(prevState => ({ ...prevState, [name]: value }));
        }
    }
    const handleSubmit = () => {
        if (simpleValidator.current.allValid()) {
            axios.post(apiEndPoint + 'Term/AddPublic', termObject, {})
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
                            <Col xs="12" sm="6" className="text-left m-0 p-1">
                                <MyDropdown
                                    label="Select Teacher"
                                    display="Select Teacher..."
                                    dataList={teacherCourseList}
                                    handleChange={handleChange}
                                    name="PublicTeacherCourseId"
                                    selectedValue={termObject.PublicTeacherCourseId}
                                    htmlFor="teacherCourse"
                                    onBlur={simpleValidator.current.showMessageFor('teacherCourse')}
                                    width="w-100"
                                />
                                {simpleValidator.current.message('teacherCourse', termObject.PublicTeacherCourseId, 'required', { className: 'alert alert-danger' })}
                                <Form.Group>
                                    <Form.Label htmlFor="capacity"><h6 className="text-primary mb-0 ml-1" >Capacity:</h6></Form.Label>
                                    <Form.Control id="capacity" name="Capacity" type="text" placeholder="Enter capacity" value={termObject.Capacity} onChange={handleChange} onBlur={simpleValidator.current.showMessageFor('capacity')} />
                                    {simpleValidator.current.message('capacity', termObject.Capacity, 'required|numeric|min:3,num|max:50,num', { className: 'alert alert-danger' })}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor="availablecapacity"><h6 className="text-primary mb-0 ml-1" >Available Capacity:</h6></Form.Label>
                                    <Form.Control id="availablecapacity" name="AvailableCapacity" type="text" placeholder="Enter capacity" value={termObject.AvailableCapacity} onChange={handleChange} onBlur={simpleValidator.current.showMessageFor('available capacity')} />
                                    {simpleValidator.current.message('available capacity', termObject.AvailableCapacity, 'required|numeric|min:0,num|max:50,num', { className: 'alert alert-danger' })}
                                </Form.Group>
                            </Col>
                            <Col xs="12" sm="6" className="text-left m-0 p-1">
                                <Form.Group>
                                    <Form.Label htmlFor="modificationDate"><h6 className="text-primary mb-0 ml-1" >Modefication Date (Now):</h6></Form.Label>
                                    <Form.Control type="text" placeholder={termObject.ModificationDate} disabled />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor="modifier"><h6 className="text-primary mb-0 ml-1" >Modefier (Now):</h6></Form.Label>
                                    <Form.Control type="text" placeholder={termObject.Modifier} disabled />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Check inline name="IsDeleted" label="Is Deleted?" checked={termObject.IsDeleted} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col xs="12" sm="6" className="text-left m-0 p-1">
                                <Form.Group>
                                    <Form.Label htmlFor="price"><h6 className="text-primary mb-0 ml-1" >Price:</h6></Form.Label>
                                    <Form.Control id="price" name="Price" type="text" placeholder="exp: $100" value={termObject.Price} onChange={handleChange} onBlur={simpleValidator.current.showMessageFor('price')} />
                                    {simpleValidator.current.message('price', termObject.Price, 'required', { className: 'alert alert-danger' })}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor="duration"><h6 className="text-primary mb-0 ml-1" >Duration:</h6></Form.Label>
                                    <Form.Control id="duration" name="Duration" type="text" placeholder="exp:8 weeks" value={termObject.Duration} onChange={handleChange} onBlur={simpleValidator.current.showMessageFor('duration')} />
                                    {simpleValidator.current.message('duration', termObject.Duration, 'required', { className: 'alert alert-danger' })}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor="start"><h6 className="text-primary mb-0 ml-1" >Start Date:</h6></Form.Label>
                                    <Form.Control id="start" name="Start" type="text" placeholder="exp:2021-01-01" value={termObject.Start} onChange={handleChange} onBlur={simpleValidator.current.showMessageFor('start')} />
                                    {simpleValidator.current.message('start', termObject.Start, 'required', { className: 'alert alert-danger' })}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor="finish"><h6 className="text-primary mb-0 ml-1" >Finish Date:</h6></Form.Label>
                                    <Form.Control id="finish" name="Finish" type="text" placeholder="exp:2021-01-01" value={termObject.Finish} onChange={handleChange} onBlur={simpleValidator.current.showMessageFor('finish')} />
                                    {simpleValidator.current.message('finish', termObject.Finish, 'required', { className: 'alert alert-danger' })}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor="deadline"><h6 className="text-primary mb-0 ml-1" >Registeration Deadline:</h6></Form.Label>
                                    <Form.Control id="deadline" name="EnrollmentDeadline" type="text" placeholder="exp:2021-01-01" value={termObject.EnrollmentDeadline} onChange={handleChange} onBlur={simpleValidator.current.showMessageFor('deadline')} />
                                    {simpleValidator.current.message('deadline', termObject.EnrollmentDeadline, 'required', { className: 'alert alert-danger' })}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor="times"><h6 className="text-primary mb-0 ml-1" >Class Time:</h6></Form.Label>
                                    <Form.Control id="times" name="Times" as="textarea" rows={4} placeholder="exp:Monday (8am-12pm)" value={termObject.Times} onChange={handleChange} onBlur={simpleValidator.current.showMessageFor('times')} />
                                    {simpleValidator.current.message('times', termObject.Times, 'required', { className: 'alert alert-danger' })}
                                </Form.Group>
                            </Col>
                            <Col xs="12" sm="6" className="text-right m-0 p-1" dir="rtl">
                                <Form.Group>
                                    <Form.Label htmlFor="priceFa"><h6 className="text-primary mb-0 ml-1" >هزینه دوره:</h6></Form.Label>
                                    <Form.Control id="priceFa" name="PriceFa" type="text" placeholder="exp: $100" value={termObject.PriceFa} onChange={handleChange} onBlur={simpleValidator.current.showMessageFor('priceFa')} />
                                    {simpleValidator.current.message('priceFa', termObject.PriceFa, 'required', { className: 'alert alert-danger' })}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor="durationFa"><h6 className="text-primary mb-0 ml-1" >طول دوره:</h6></Form.Label>
                                    <Form.Control id="durationFa" name="DurationFa" type="text" placeholder="exp:8 weeks" value={termObject.DurationFa} onChange={handleChange} onBlur={simpleValidator.current.showMessageFor('durationFa')} />
                                    {simpleValidator.current.message('durationFa', termObject.DurationFa, 'required', { className: 'alert alert-danger' })}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor="startFa"><h6 className="text-primary mb-0 ml-1" >شروع دوره:</h6></Form.Label>
                                    <Form.Control id="startFa" name="StartFa" type="text" placeholder="exp:2021-01-01" value={termObject.StartFa} onChange={handleChange} onBlur={simpleValidator.current.showMessageFor('startFa')} />
                                    {simpleValidator.current.message('startFa', termObject.StartFa, 'required', { className: 'alert alert-danger' })}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor="finishFa"><h6 className="text-primary mb-0 ml-1" >پایان دوره:</h6></Form.Label>
                                    <Form.Control id="finishFa" name="FinishFa" type="text" placeholder="exp:2021-01-01" value={termObject.FinishFa} onChange={handleChange} onBlur={simpleValidator.current.showMessageFor('finishFa')} />
                                    {simpleValidator.current.message('finishFa', termObject.FinishFa, 'required', { className: 'alert alert-danger' })}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor="deadlineFa"><h6 className="text-primary mb-0 ml-1" >آخرین تاریخ جهت ثبت نام:</h6></Form.Label>
                                    <Form.Control id="deadlineFa" name="EnrollmentDeadlineFa" type="text" placeholder="exp:2021-01-01" value={termObject.EnrollmentDeadlineFa} onChange={handleChange} onBlur={simpleValidator.current.showMessageFor('deadlineFa')} />
                                    {simpleValidator.current.message('deadlineFa', termObject.EnrollmentDeadlineFa, 'required', { className: 'alert alert-danger' })}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor="timesFa"><h6 className="text-primary mb-0 ml-1" > زمان کلاس ها:</h6></Form.Label>
                                    <Form.Control id="timesFa" name="TimesFa" as="textarea" rows={4} placeholder="exp:Monday (8am-12pm)" value={termObject.TimesFa} onChange={handleChange} onBlur={simpleValidator.current.showMessageFor('timesFa')} />
                                    {simpleValidator.current.message('timesFa', termObject.TimesFa, 'required', { className: 'alert alert-danger' })}
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button className="btn btn-sm float-right" onClick={handleSubmit} >Submit</Button>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
        </div>
    );
}
export default DeanPublicClassForm;

