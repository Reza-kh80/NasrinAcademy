import React, { useState, useEffect, useRef, useContext, useCallback } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import SimpleReactValidator from 'simple-react-validator';
import Form from 'react-bootstrap/Form';
import { getDatetime } from '../../../utils/datetime';
import UserContext from '../../../utils/user-context';
import { Container, Row, Col, Button } from 'reactstrap';
import { initialTeacherObject } from './dean-form-objects'
const FileUpload = React.lazy(() => import('../../general/fileUpload'));
const MyDropdown = React.lazy(() => import('../../general/dropdown'));
function DeanTeacherForm(props) {
    const apiEndPoint = process.env.REACT_APP_APIEndPoint;
    const mediaEndMoint = process.env.REACT_APP_MediaEndPoint;
    const currentUser = useContext(UserContext);
    const [imgHeight, setImgHeight] = useState(0)
    const [imgWidth, setImgWidth] = useState(0)
    const simpleValidator = useRef(new SimpleReactValidator())
    const { show, onHide, teacherId, title, isRegistered } = props;
    const [dropdownList, setDropdownList] = useState([]);
    const [teacherObject, setTeacherObject] = useState(initialTeacherObject);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const onEditTeacher = useCallback((list) => {
        setTeacherObject(prevState => ({
            ...prevState,
            TeacherId: list.TeacherId,
            Name: list.Name,
            NameFr: list.NameFr,
            NameFa: list.NameFa,
            Phone: list.Phone,
            Email: list.Email,
            Photo: list.Photo,
            Address: list.Address,
            CoursesDescription: list.CoursesDescription,
            CoursesDescriptionFr: list.CoursesDescriptionFr,
            CoursesDescriptionFa: list.CoursesDescriptionFa,
            ExperienceYear: list.ExperienceYear,
            SessionPrice: list.SessionPrice,
            SessionPriceFa: list.SessionPriceFa,
            ExperienceDetail: list.ExperienceDetail,
            ExperienceDetailFr: list.ExperienceDetailFr,
            ExperienceDetailFa: list.ExperienceDetailFa,
            Education: list.Education,
            EducationFr: list.EducationFr,
            EducationFa: list.EducationFa,
            Certificate: list.Certificate,
            CertificateFr: list.CertificateFr,
            CertificateFa: list.CertificateFa,
            IsAvailableSun: list.IsAvailableSun,
            IsAvailableMon: list.IsAvailableMon,
            IsAvailableTue: list.IsAvailableTue,
            IsAvailableWed: list.IsAvailableWed,
            IsAvailableThu: list.IsAvailableThu,
            IsAvailableFri: list.IsAvailableFri,
            IsAvailableSat: list.IsAvailableSat,
            HasArticle: list.HasArticle,
            HasFlashCard: list.HasFlashCard,
            IsRegistered: list.IsRegistered,
            SignedAgreement: list.SignedAgreement,
            //
            UserId: list.UserId,
            Username: list.Username,
            Password: "",
            RoleId: "3",
            //
            Modifier: currentUser.Username,
            ModificationDate: getDatetime(),
            IsDeleted: list.IsDeleted,
            LanguageId: list.LanguageId,
            TeachingLevel: list.TeachingLevel !== null ? list.TeachingLevel : "",
            TeachingLevelFr: list.TeachingLevelFr !== null ? list.TeachingLevelFr : "",
            TeachingLevelFa: list.TeachingLevelFa !== null ? list.TeachingLevelFa : "",
            TeachingAgeLevel: list.TeachingAgeLevel !== null ? list.TeachingAgeLevel : "",
            TeachingAgeLevelFr: list.TeachingAgeLevelFr !== null ? list.TeachingAgeLevelFr : "",
            TeachingAgeLevelFa: list.TeachingAgeLevelFa !== null ? list.TeachingAgeLevelFa : "",
            BankNumber: list.BankNumber !== null ? list.BankNumber : "",
        }));
        setPasswordErrorMessage("")
    }, [currentUser.Username])
    useEffect(() => {
        // console.log("Teacher Object=", teacherObject)
    }, [teacherObject]);
    useEffect(() => {
        let mounted = true;
        let dropdownList = [];
        const fetchData = async () => {
            const result = await axios.get(apiEndPoint + 'Language/DisplayDropdown')
            if (mounted) {
                result.data.map(m =>
                    dropdownList.push({
                        value: m.LanguageId,
                        label: m.Name,
                    }),
                );
                setDropdownList(dropdownList);
            }
        };
        fetchData();
        return () => {
            mounted = false;
        };
    }, [apiEndPoint]);
    const addDefaultSrc = (ev) => {
        return ev.target.src = "main-images/user.webp";
    }
    useEffect(() => {
        let mounted = true;
        if (teacherId === 0) {
            setTeacherObject(initialTeacherObject);
            setTeacherObject(prevState => ({
                ...prevState, Modifier: currentUser.Username
            }));
        }
        else if (teacherId > 0) {
            const fetchData = async () => {
                const result = await axios.get(apiEndPoint + `Teacher/Get?teacherId=${teacherId}`);
                if (mounted) {
                    onEditTeacher(result.data);
                }
            };
            fetchData();
            return () => {
                mounted = false;
            };
        }
    }, [teacherId, apiEndPoint, onEditTeacher, currentUser.Username]);

    const onImgLoad = ({ target: img }) => {
        setImgHeight(img.naturalHeight);
        setImgWidth(img.naturalWidth);
    }
    const handleChangeTeacher = (e) => {
        const { name, value, checked } = e.target;
        if (e.target.type === 'checkbox') {
            setTeacherObject(prevState => ({ ...prevState, [name]: checked }));
        }
        else {
            setTeacherObject(prevState => ({ ...prevState, [name]: value }));
        }
    }
    const handleUpload = (fileName) => {
        setTeacherObject(prevState => ({
            ...prevState,
            Photo: fileName
        }));
    }
    const handleSubmit = () => {
        if (simpleValidator.current.allValid() && passwordErrorMessage === '') {
            axios.post(apiEndPoint + 'Teacher/Add', teacherObject, {})
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
                                <MyDropdown
                                    label="Select language of teaching"
                                    display="Select language ..."
                                    dataList={dropdownList}
                                    handleChange={handleChangeTeacher}
                                    name="LanguageId"
                                    selectedValue={teacherObject.LanguageId}
                                    htmlFor="language"
                                    onBlur={simpleValidator.current.showMessageFor('language')}
                                    width="w-100"
                                />
                                {simpleValidator.current.message('language', teacherObject.LanguageId, 'required', { className: 'alert alert-danger' })}
                                <Form>
                                    <Form.Group>
                                        <Form.Label htmlFor="username"><h6 className="text-primary mb-0 ml-1" >Username:</h6></Form.Label>
                                        <Form.Control id="username" name="Username" type="text" placeholder="firstname.lastname@nasinacademy.com" autoComplete="no" value={teacherObject.Username} onChange={handleChangeTeacher} onBlur={simpleValidator.current.showMessageFor('email')} />
                                        {simpleValidator.current.message('email', teacherObject.Username, 'required|email|max:50', { className: 'alert alert-danger' })}
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label htmlFor="password"><h6 className="text-primary mb-0 ml-1" >Password:</h6></Form.Label>
                                        <Form.Control id="password" name="Password" type="password" placeholder="Enter Password" autoComplete="new-password" value={teacherObject.Password} onChange={handleChangeTeacher} onBlur={simpleValidator.current.showMessageFor('password')} />
                                        {!isRegistered && simpleValidator.current.message('password', teacherObject.Password, 'required', { className: 'alert alert-danger' })}
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label htmlFor="sessionPrice"><h6 className="text-primary mb-0 ml-1" >Session Price:</h6></Form.Label>
                                        <Form.Control id="sessionPrice" name="SessionPrice" type="text" placeholder="Enter session price" value={teacherObject.SessionPrice} onChange={handleChangeTeacher} onBlur={simpleValidator.current.showMessageFor('session price')} />
                                        {simpleValidator.current.message('session price', teacherObject.SessionPrice, 'required|max:50', { className: 'alert alert-danger' })}
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label htmlFor="sessionPricefa"><h6 className="text-primary mb-0 ml-1" >Session Price (In Tooman):</h6></Form.Label>
                                        <Form.Control id="sessionPricefa" name="SessionPriceFa" type="text" placeholder="Enter session price" value={teacherObject.SessionPriceFa} onChange={handleChangeTeacher} onBlur={simpleValidator.current.showMessageFor('session price')} />
                                        {simpleValidator.current.message('session price farsi', teacherObject.SessionPriceFa, 'required|max:50', { className: 'alert alert-danger' })}
                                    </Form.Group>
                                </Form>
                            </Col>
                            <Col xs="12" lg="4" className="text-center m-0 p-1">
                                <FileUpload postMethod={'Teacher/UploadFile'} title="Photo(jpeg.jpg)" accept={['jpg', 'jpeg']} specifiedFileName="NoName" onUpload={handleUpload} onBlur={simpleValidator.current.showMessageFor('photo')} />
                                {simpleValidator.current.message('photo', teacherObject.Photo, 'required|min:1', { className: 'alert alert-danger' })}
                                {teacherObject.Photo !== "" && <img className="img-card" onLoad={onImgLoad} width="200" height="200" src={mediaEndMoint + 'Teacher/' + teacherObject.Photo} onError={addDefaultSrc} alt={teacherObject.Name + "photo"} />}
                                {teacherObject.Photo !== "" && <div>Image Size (400 Accepted): <strong className={imgHeight !== 400 ? "text-danger" : "text-success"}>Height: {imgHeight}</strong> | <strong className={imgWidth !== 400 ? "text-danger" : "text-success"}>Width: {imgWidth}</strong></div>}
                            </Col>
                            <Col xs="12" lg="4" className="text-left m-0 p-1">
                                <Form.Group>
                                    <Form.Label htmlFor="modificationDate"><h6 className="text-primary mb-0 ml-1" >Modefication Date (Now):</h6></Form.Label>
                                    <Form.Label id="modificationDate" className="border rounded border-dark d-block p-2">{teacherObject.ModificationDate}</Form.Label>
                                    <Form.Label htmlFor="modificationDate"><h6 className="text-primary mb-0 ml-1" >Modefier (Now):</h6></Form.Label>
                                    <Form.Label id="modificationDate" className="border rounded border-dark d-block p-2">{teacherObject.Modifier}</Form.Label>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Check inline name="IsRegistered" label="Do you want to register?" checked={teacherObject.IsRegistered} onChange={handleChangeTeacher} />
                                    <Form.Check inline name="IsDeleted" label="Is Deleted?" checked={teacherObject.IsDeleted} onChange={handleChangeTeacher} />
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
                                    <Form.Control id="name" name="Name" type="text" placeholder="Enter Full Name" value={teacherObject.Name} onChange={handleChangeTeacher} onBlur={simpleValidator.current.showMessageFor('full name (english)')} />
                                    {simpleValidator.current.message('full name (english)', teacherObject.Name, 'required|max:50', { className: 'alert alert-danger' })}
                                </Form.Group>
                            </Col>
                            <Col xs="12" lg="4" className="m-0 p-1">
                                <Form.Group>
                                    <Form.Label htmlFor="nameFr"><h6 className="text-primary mb-0 ml-1" >Full Name (French):</h6></Form.Label>
                                    <Form.Control id="nameFr" name="NameFr" type="text" placeholder="Enter Full Name" value={teacherObject.NameFr} onChange={handleChangeTeacher} onBlur={simpleValidator.current.showMessageFor('full name (french)')} />
                                    {simpleValidator.current.message('full name (french)', teacherObject.NameFr, 'required|max:50', { className: 'alert alert-danger' })}
                                </Form.Group>
                            </Col>
                            <Col xs="12" lg="4" className="m-0 p-1">
                                <Form.Group>
                                    <Form.Label htmlFor="nameFa"><h6 className="text-primary mb-0 ml-1" >Full Name (Farsi):</h6></Form.Label>
                                    <Form.Control id="nameFa" name="NameFa" type="text" placeholder="Enter Full Name" dir="rtl" className="text-right" value={teacherObject.NameFa} onChange={handleChangeTeacher} onBlur={simpleValidator.current.showMessageFor('full name (farsi)')} />
                                    {simpleValidator.current.message('full name (farsi)', teacherObject.NameFa, 'required|max:50', { className: 'alert alert-danger' })}
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12" lg="2" className="text-left m-0 p-1">
                                <Form.Group>
                                    <Form.Label htmlFor="phone"><h6 className="text-primary mb-0 ml-1" >Phone:</h6></Form.Label>
                                    <Form.Control id="phone" name="Phone" type="text" placeholder="Enter Phone" value={teacherObject.Phone} onChange={handleChangeTeacher} onBlur={simpleValidator.current.showMessageFor('phone')} />
                                    {simpleValidator.current.message('phone', teacherObject.Phone, 'required|max:100', { className: 'alert alert-danger' })}
                                </Form.Group>
                            </Col>
                            <Col xs="12" lg="3" className="text-left m-0 p-1">
                                <Form.Group>
                                    <Form.Label htmlFor="email"><h6 className="text-primary mb-0 ml-1" >Email:</h6></Form.Label>
                                    <Form.Control id="email" name="Email" type="text" placeholder="Enter Email" value={teacherObject.Email} onChange={handleChangeTeacher} onBlur={simpleValidator.current.showMessageFor('email')} />
                                    {simpleValidator.current.message('email', teacherObject.Email, 'required|email|max:100', { className: 'alert alert-danger' })}
                                </Form.Group>
                            </Col>
                            <Col xs="12" lg="7" className="text-left m-0 p-1">
                                <Form.Group>
                                    <Form.Label htmlFor="address"><h6 className="text-primary mb-0 ml-1" >Address:</h6></Form.Label>
                                    <Form.Control id="address" name="Address" type="text" placeholder="Enter Address" value={teacherObject.Address} onChange={handleChangeTeacher} onBlur={simpleValidator.current.showMessageFor('address')} />
                                    {simpleValidator.current.message('address', teacherObject.Address, 'required|max:200', { className: 'alert alert-danger' })}
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12" className="m-0 p-1">
                                <hr />
                                <h4 className="text-success font-weight-bold m-0 p-0">Bank Acount</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12" lg="4" className="m-0 p-1">
                                <Form.Group>
                                    <Form.Label htmlFor="bankNumber"><h6 className="text-primary mb-0 ml-1" >Bank Account Number:</h6></Form.Label>
                                    <Form.Control id="bankNumber" name="BankNumber" type="text" placeholder="Bank Number" value={teacherObject.BankNumber} onChange={handleChangeTeacher} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12" className="m-0 p-1">
                                <hr />
                                <h4 className="text-success font-weight-bold m-0 p-0">Levels</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12" lg="4" className="m-0 p-1">
                                <Form.Group>
                                    <Form.Label htmlFor="teachingLevel"><h6 className="text-primary mb-0 ml-1" >Teaching Level:</h6></Form.Label>
                                    <Form.Control id="teachingLevel" name="TeachingLevel" type="text" placeholder="Teacher level" value={teacherObject.TeachingLevel} onChange={handleChangeTeacher} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor="teachingAgeLevel"><h6 className="text-primary mb-0 ml-1" >Teaching Age Level:</h6></Form.Label>
                                    <Form.Control id="teachingAgeLevel" name="TeachingAgeLevel" type="text" placeholder="age level" value={teacherObject.TeachingAgeLevel} onChange={handleChangeTeacher} />
                                </Form.Group>
                            </Col>
                            <Col xs="12" lg="4" className="m-0 p-1">
                                <Form.Group>
                                    <Form.Label htmlFor="teachingLevelFr"><h6 className="text-primary mb-0 ml-1" >Teaching Level (French):</h6></Form.Label>
                                    <Form.Control id="teachingLevelFr" name="TeachingLevelFr" type="text" placeholder="Teacher level" value={teacherObject.TeachingLevelFr} onChange={handleChangeTeacher} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor="teachingAgeLevelFr"><h6 className="text-primary mb-0 ml-1" >Teaching Age Level (French):</h6></Form.Label>
                                    <Form.Control id="teachingAgeLevelFr" name="TeachingAgeLevelFr" type="text" placeholder="Age level" value={teacherObject.TeachingAgeLevelFr} onChange={handleChangeTeacher} />
                                </Form.Group>
                            </Col>
                            <Col xs="12" lg="4" className="m-0 p-1">
                                <Form.Group>
                                    <Form.Label htmlFor="teachingLevelFa"><h6 className="text-primary mb-0 ml-1" >Teaching Level (Farsi):</h6></Form.Label>
                                    <Form.Control id="teachingLevelFa" name="TeachingLevelFa" type="text" placeholder="سطح استاد" dir="rtl" className="text-right" value={teacherObject.TeachingLevelFa} onChange={handleChangeTeacher} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor="teachingAgeLevelFa"><h6 className="text-primary mb-0 ml-1" >Teaching Age Level (Farsi):</h6></Form.Label>
                                    <Form.Control id="teachingAgeLevelFa" name="TeachingAgeLevelFa" type="text" placeholder="سطح دوره" dir="rtl" className="text-right" value={teacherObject.TeachingAgeLevelFa} onChange={handleChangeTeacher} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12" className="m-0 p-1">
                                <hr />
                                <h4 className="text-success font-weight-bold m-0 p-0">Course Description</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12" lg="4" className="text-left m-0 p-1">
                                <Form.Group>
                                    <Form.Label htmlFor="coursesDescription"><h6 className="text-primary mb-0 ml-1" >Courses Description (English):</h6></Form.Label>
                                    <Form.Control id="coursesDescription" name="CoursesDescription" as="textarea" rows={10} placeholder="Enter details" value={teacherObject.CoursesDescription} onChange={handleChangeTeacher} onBlur={simpleValidator.current.showMessageFor('description (english)')} />
                                    {simpleValidator.current.message('description (english)', teacherObject.CoursesDescription, 'required|max:3999', { className: 'alert alert-danger' })}
                                </Form.Group>
                            </Col>
                            <Col xs="12" lg="4" className="text-left m-0 p-1">
                                <Form.Group>
                                    <Form.Label htmlFor="coursesDescriptionFr"><h6 className="text-primary mb-0 ml-1" >Courses Description (French):</h6></Form.Label>
                                    <Form.Control id="coursesDescriptionFr" name="CoursesDescriptionFr" as="textarea" rows={10} placeholder="Enter details" value={teacherObject.CoursesDescriptionFr} onChange={handleChangeTeacher} onBlur={simpleValidator.current.showMessageFor('description (french)')} />
                                    {simpleValidator.current.message('description (french)', teacherObject.CoursesDescriptionFr, 'required|max:3999', { className: 'alert alert-danger' })}
                                </Form.Group>
                            </Col>
                            <Col xs="12" lg="4" className="text-left m-0 p-1">
                                <Form.Group>
                                    <Form.Label htmlFor="coursesDescriptionFa"><h6 className="text-primary mb-0 ml-1 text-right">Courses Description (Farsi):</h6></Form.Label>
                                    <Form.Control id="coursesDescriptionFa" name="CoursesDescriptionFa" as="textarea" rows={10} dir="rtl" placeholder="جزییات" value={teacherObject.CoursesDescriptionFa} onChange={handleChangeTeacher} onBlur={simpleValidator.current.showMessageFor('description (farsi)')} />
                                    {simpleValidator.current.message('description (farsi)', teacherObject.CoursesDescriptionFa, 'required|max:3999', { className: 'alert alert-danger' })}
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12" className="m-0 p-1">
                                <hr />
                                <h4 className="text-success font-weight-bold m-0 p-0">Availability</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12" className="text-left m-0 p-1">
                                <Form>
                                    <Form.Check inline name="HasArticle" label="Agreed to have Articles video" checked={teacherObject.HasArticle} onChange={handleChangeTeacher} />
                                    <Form.Check inline name="HasFlashCard" label="Agreed to have flash cardso" checked={teacherObject.HasFlashCard} onChange={handleChangeTeacher} />
                                </Form>
                                <Form>
                                    <Form.Check inline name="IsAvailableMon" label="Monday" checked={teacherObject.IsAvailableMon} onChange={handleChangeTeacher} />
                                    <Form.Check inline name="IsAvailableTue" label="Tuesday" checked={teacherObject.IsAvailableTue} onChange={handleChangeTeacher} />
                                    <Form.Check inline name="IsAvailableWed" label="Wednesday" checked={teacherObject.IsAvailableWed} onChange={handleChangeTeacher} />
                                    <Form.Check inline name="IsAvailableThu" label="Thursday" checked={teacherObject.IsAvailableThu} onChange={handleChangeTeacher} />
                                    <Form.Check inline name="IsAvailableFri" label="Friday" checked={teacherObject.IsAvailableFri} onChange={handleChangeTeacher} />
                                    <Form.Check inline name="IsAvailableSat" label="Satureday" checked={teacherObject.IsAvailableSat} onChange={handleChangeTeacher} />
                                    <Form.Check inline name="IsAvailableSun" label="Sunday" checked={teacherObject.IsAvailableSun} onChange={handleChangeTeacher} />
                                </Form>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12" className="m-0 p-1">
                                <hr />
                                <h4 className="text-success font-weight-bold m-0 p-0">Experience</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12" lg="4" className="m-0 p-1">
                                <Form.Group>
                                    <Form.Label htmlFor="experienceYear"><h6 className="text-primary mb-0 ml-1" >Years of experience:</h6></Form.Label>
                                    <Form.Control id="experienceYear" name="ExperienceYear" type="text" placeholder="Enter Full Name" value={teacherObject.ExperienceYear} onChange={handleChangeTeacher} onBlur={simpleValidator.current.showMessageFor('experience years')} />
                                    {simpleValidator.current.message('experience years', teacherObject.ExperienceYear, 'required|max:10', { className: 'alert alert-danger' })}
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12" lg="4" className="text-left m-0 p-1">
                                <Form.Group>
                                    <Form.Label htmlFor="experienceDetail"><h6 className="text-primary mb-0 ml-1" >Experience Detail (English):</h6></Form.Label>
                                    <Form.Control id="experienceDetail" name="ExperienceDetail" as="textarea" rows={10} placeholder="Enter details" value={teacherObject.ExperienceDetail} onChange={handleChangeTeacher} onBlur={simpleValidator.current.showMessageFor('experience (english)')} />
                                    {simpleValidator.current.message('experience (english)', teacherObject.ExperienceDetail, 'required|max:3999', { className: 'alert alert-danger' })}
                                </Form.Group>
                            </Col>
                            <Col xs="12" lg="4" className="text-left m-0 p-1">
                                <Form.Group>
                                    <Form.Label htmlFor="experienceDetailFr"><h6 className="text-primary mb-0 ml-1" >Experience Detail (French):</h6></Form.Label>
                                    <Form.Control id="experienceDetailFr" name="ExperienceDetailFr" as="textarea" rows={10} placeholder="Enter details" value={teacherObject.ExperienceDetailFr} onChange={handleChangeTeacher} onBlur={simpleValidator.current.showMessageFor('experience (french)')} />
                                    {simpleValidator.current.message('experience (french)', teacherObject.ExperienceDetailFr, 'required|max:3999', { className: 'alert alert-danger' })}
                                </Form.Group>
                            </Col>
                            <Col xs="12" lg="4" className="text-left m-0 p-1">
                                <Form.Group>
                                    <Form.Label htmlFor="experienceDetailFa"><h6 className="text-primary mb-0 ml-1 text-right">Experience Detail (Farsi):</h6></Form.Label>
                                    <Form.Control id="experienceDetailFa" name="ExperienceDetailFa" as="textarea" rows={10} dir="rtl" placeholder="جزییات" value={teacherObject.ExperienceDetailFa} onChange={handleChangeTeacher} onBlur={simpleValidator.current.showMessageFor('experience (farsi)')} />
                                    {simpleValidator.current.message('experience (farsi)', teacherObject.ExperienceDetailFa, 'required|max:3999', { className: 'alert alert-danger' })}
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12" className="m-0 p-1">
                                <hr />
                                <h4 className="text-success font-weight-bold m-0 p-0">Educations</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12" lg="4" className="text-left m-0 p-1">
                                <Form.Group>
                                    <Form.Label htmlFor="education"><h6 className="text-primary mb-0 ml-1" >Education (English):</h6></Form.Label>
                                    <Form.Control id="education" name="Education" as="textarea" rows={10} placeholder="Enter details" value={teacherObject.Education} onChange={handleChangeTeacher} onBlur={simpleValidator.current.showMessageFor('education (english)')} />
                                    {simpleValidator.current.message('education (english)', teacherObject.Education, 'required|max:3999', { className: 'alert alert-danger' })}
                                </Form.Group>
                            </Col>
                            <Col xs="12" lg="4" className="text-left m-0 p-1">
                                <Form.Group>
                                    <Form.Label htmlFor="educationFr"><h6 className="text-primary mb-0 ml-1" >Education (French):</h6></Form.Label>
                                    <Form.Control id="educationFr" name="EducationFr" as="textarea" rows={10} placeholder="Enter details" value={teacherObject.EducationFr} onChange={handleChangeTeacher} onBlur={simpleValidator.current.showMessageFor('education (french)')} />
                                    {simpleValidator.current.message('education (french)', teacherObject.EducationFr, 'required|max:3999', { className: 'alert alert-danger' })}
                                </Form.Group>
                            </Col>
                            <Col xs="12" lg="4" className="text-left m-0 p-1">
                                <Form.Group>
                                    <Form.Label htmlFor="educationFa"><h6 className="text-primary mb-0 ml-1 text-right">Education (Farsi):</h6></Form.Label>
                                    <Form.Control id="educationFa" name="EducationFa" as="textarea" rows={10} dir="rtl" placeholder="جزییات" value={teacherObject.EducationFa} onChange={handleChangeTeacher} onBlur={simpleValidator.current.showMessageFor('education (farsi)')} />
                                    {simpleValidator.current.message('education (farsi)', teacherObject.EducationFa, 'required|max:3999', { className: 'alert alert-danger' })}
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12" className="m-0 p-1">
                                <hr />
                                <h4 className="text-success font-weight-bold m-0 p-0">Certificates</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12" lg="4" className="text-left m-0 p-1">
                                <Form.Group>
                                    <Form.Label htmlFor="certificate"><h6 className="text-primary mb-0 ml-1" >Certificate (English):</h6></Form.Label>
                                    <Form.Control id="certificate" name="Certificate" as="textarea" rows={10} placeholder="Enter details" value={teacherObject.Certificate} onChange={handleChangeTeacher} onBlur={simpleValidator.current.showMessageFor('certificate (english)')} />
                                    {simpleValidator.current.message('certificate (english)', teacherObject.Certificate, 'required|max:3999', { className: 'alert alert-danger' })}
                                </Form.Group>
                            </Col>
                            <Col xs="12" lg="4" className="text-left m-0 p-1">
                                <Form.Group>
                                    <Form.Label htmlFor="certificateFr"><h6 className="text-primary mb-0 ml-1" >Certificate (French):</h6></Form.Label>
                                    <Form.Control id="certificateFr" name="CertificateFr" as="textarea" rows={10} placeholder="Enter details" value={teacherObject.CertificateFr} onChange={handleChangeTeacher} onBlur={simpleValidator.current.showMessageFor('certificate (french)')} />
                                    {simpleValidator.current.message('certificate (french)', teacherObject.CertificateFr, 'required|max:3999', { className: 'alert alert-danger' })}
                                </Form.Group>
                            </Col>
                            <Col xs="12" lg="4" className="text-left m-0 p-1">
                                <Form.Group>
                                    <Form.Label htmlFor="certificateFa"><h6 className="text-primary mb-0 ml-1 text-right">Certificate (Farsi):</h6></Form.Label>
                                    <Form.Control id="certificateFa" name="CertificateFa" as="textarea" rows={10} dir="rtl" placeholder="جزییات" value={teacherObject.CertificateFa} onChange={handleChangeTeacher} onBlur={simpleValidator.current.showMessageFor('certificate (farsi)')} />
                                    {simpleValidator.current.message('certificate (farsi)', teacherObject.CertificateFa, 'required|max:3999', { className: 'alert alert-danger' })}
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="text-right">
                                <Button className="btn btn-sm float-right" onClick={handleSubmit} >{isRegistered === 'Edit' ? "Edit Teacher" : "Register Teacher"}</Button>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
        </div>
    );
}
export default DeanTeacherForm;
