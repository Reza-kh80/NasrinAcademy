import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import classnames from 'classnames';
import { Row, Col, TabContent, TabPane, Nav, NavItem, NavLink, Form, FormGroup, Label, Input } from 'reactstrap';
function CourseOverview(props) {
    const apiEndPoint = process.env.REACT_APP_APIEndPoint;
    const mediaEndPoint = process.env.REACT_APP_MediaEndPoint;
    const lang = localStorage.getItem('lang')
    const { show, onHide, id, title } = props;
    const [dataObject, setDataObject] = useState([]);
    const [activeTab, setActiveTab] = useState('1');
    const [urlPhoto, setUrlPhoto] = useState("main-images/user.webp");
    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }
    useEffect(() => {
        let url = mediaEndPoint + 'Teacher/' + dataObject.Photo;
        if (dataObject.Photo !== "") {
            setUrlPhoto(url)
        }
        else {
            setUrlPhoto("main-images/user.webp")
        }


    }, [dataObject, mediaEndPoint]);
    useEffect(() => {
        let mounted = true;
        if (id !== "") {
            const fetchData = async () => {
                const result = await axios.get(apiEndPoint + `Teacher/Display?teacherId=${id}`)
                if (mounted) {
                    setDataObject(result.data);
                }
            };
            fetchData();
            return () => {
                mounted = false;
            };
        }
    }, [id, apiEndPoint]);
    const getHeading = (lang) => {
        let heading = []
        if (lang === 'en') {
            heading.push("Introduction")
            heading.push("Experience")
            heading.push("Education")
            heading.push("Certificates")
            heading.push("Courses")
            heading.push("Session Price")
            heading.push("Years of Experience")
            heading.push(dataObject.CoursesDescription)
            heading.push(dataObject.ExperienceDetail)
            heading.push(dataObject.Education)
            heading.push(dataObject.Certificate)
            heading.push("Sunday")
            heading.push("Monday")
            heading.push("Tuesday")
            heading.push("Wednesday")
            heading.push("Thursday")
            heading.push("Friday")
            heading.push("Saturday")
            heading.push("Available Days")
        }
        else if (lang === 'fr') {
            heading.push("Introduction")
            heading.push("Vivre")
            heading.push("Éducation")
            heading.push("Certificats")
            heading.push("Cours")
            heading.push("Prix de la session")
            heading.push("Des Années d'expérience")
            heading.push(dataObject.CoursesDescriptionFr)
            heading.push(dataObject.ExperienceDetailFr)
            heading.push(dataObject.EducationFr)
            heading.push(dataObject.CertificateFr)
            heading.push("Dimanche")
            heading.push("Lundi")
            heading.push("Mardi")
            heading.push("Mercredi")
            heading.push("Jeudi")
            heading.push("Vendredi")
            heading.push("Samedi")
            heading.push("Jours Disponibles")
        }
        else {
            heading.push("معرفی استاد")
            heading.push("سوابق کاری")
            heading.push("تحصیلات")
            heading.push("گواهینامه ها")
            heading.push("دوره ها")
            heading.push("قیمت هر جلسه")
            heading.push("سابقه تدریس (سال)")
            heading.push(dataObject.CoursesDescriptionFa)
            heading.push(dataObject.ExperienceDetailFa)
            heading.push(dataObject.EducationFa)
            heading.push(dataObject.CertificateFa)
            heading.push("یک شنبه")
            heading.push("دوشنبه")
            heading.push("سه شنبه")
            heading.push("چهار شنبه")
            heading.push("پنج شنبه")
            heading.push("جمعه")
            heading.push("شنبه")
            heading.push("روزهای کاری")
        }
        heading.push(dataObject.SessionPrice)
        heading.push(dataObject.ExperienceYear)
        return heading
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
                <Modal.Header closeButton className="loginHeader">
                    <Row className="align-items-center" >
                        <Col xs="3" className="text-center">
                            <img src="main-images/logo-circle.webp" width="100%" height="100%" alt="logo" />
                        </Col>
                        <Col xs="9" className={lang === 'fa' ? 'text-right m-0 p-0' : 'text-left m-0 p-0'}>
                            <Modal.Title id="example-modal-sizes-title-lg" className="h4 font-weight-bold text-white">{title}</Modal.Title>
                        </Col>
                    </Row>
                </Modal.Header>
                <Modal.Body dir={lang === 'fa' ? 'rtl' : 'ltr'}>
                    <div className={lang === 'fa' ? 'text-right m-0 p-0' : 'text-left m-0 p-0'}>
                        <Nav tabs >
                            <NavItem className="cursor-pointer" >
                                <NavLink
                                    className={classnames({ active: activeTab === '1' })}
                                    onClick={() => { toggle('1'); }}
                                >
                                    {getHeading(lang)[0]}
                                </NavLink>
                            </NavItem>
                            <NavItem className="cursor-pointer">
                                <NavLink
                                    className={classnames({ active: activeTab === '2' })}
                                    onClick={() => { toggle('2'); }}
                                >
                                    {getHeading(lang)[1]}
                                </NavLink>
                            </NavItem >
                            <NavItem className="cursor-pointer">
                                <NavLink
                                    className={classnames({ active: activeTab === '3' })}
                                    onClick={() => { toggle('3'); }}
                                >
                                    {getHeading(lang)[2]}
                                </NavLink>
                            </NavItem>
                            <NavItem className="cursor-pointer">
                                <NavLink
                                    className={classnames({ active: activeTab === '4' })}
                                    onClick={() => { toggle('4'); }}
                                >
                                    {getHeading(lang)[3]}
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={activeTab} className="tabcontent-Modal">
                            <TabPane tabId="1">
                                <Row>
                                    <Col xs="12" md="4" >
                                        <img className="img-thumbnail" width="100%" height="100%" src={urlPhoto} alt={dataObject.Title + "Photo"} />
                                    </Col>
                                    <Col xs="12" md="8" >
                                        <h6 tag="h6" className="text-secondary font-weight-bold">{getHeading(lang)[4]}: <strong className="text-success">{getHeading(lang)[7]}</strong></h6>
                                        <h6 tag="h6" className="text-secondary font-weight-bold">{getHeading(lang)[5]}: <strong className="text-success">{getHeading(lang)[19]}</strong></h6>
                                        <h6 tag="h6" className="text-secondary font-weight-bold">{getHeading(lang)[6]}: <strong className="text-success">{getHeading(lang)[20]}</strong></h6>
                                        <Form>
                                            <h6 className="text-primary font-weight-bold">{getHeading(lang)[18]}:</h6>
                                            <FormGroup check inline>
                                                <Label check>
                                                    <Input type="checkbox" defaultChecked={dataObject.IsAvailableSun} disabled />  {getHeading(lang)[11]}
                                                </Label>
                                            </FormGroup>
                                            <FormGroup check inline>
                                                <Label check>
                                                    <Input type="checkbox" defaultChecked={dataObject.IsAvailableMon} disabled />  {getHeading(lang)[12]}
                                                </Label>
                                            </FormGroup>
                                            <FormGroup check inline>
                                                <Label check>
                                                    <Input type="checkbox" defaultChecked={dataObject.IsAvailableTue} disabled />  {getHeading(lang)[13]}
                                                </Label>
                                            </FormGroup>
                                            <FormGroup check inline>
                                                <Label check>
                                                    <Input type="checkbox" defaultChecked={dataObject.IsAvailableWed} disabled />  {getHeading(lang)[14]}
                                                </Label>
                                            </FormGroup>
                                            <FormGroup check inline>
                                                <Label check>
                                                    <Input type="checkbox" defaultChecked={dataObject.IsAvailableThu} disabled />  {getHeading(lang)[15]}
                                                </Label>
                                            </FormGroup>
                                            <FormGroup check inline>
                                                <Label check>
                                                    <Input type="checkbox" defaultChecked={dataObject.IsAvailableFri} disabled />  {getHeading(lang)[16]}
                                                </Label>
                                            </FormGroup>
                                            <FormGroup check inline>
                                                <Label check>
                                                    <Input type="checkbox" defaultChecked={dataObject.IsAvailableSat} disabled />  {getHeading(lang)[17]}
                                                </Label>
                                            </FormGroup>
                                        </Form>
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tabId="2">
                                <p>{getHeading(lang)[8]}</p>
                            </TabPane>
                            <TabPane tabId="3">
                                <p>{getHeading(lang)[9]}</p>
                            </TabPane>
                            <TabPane tabId="4">
                                <p>{getHeading(lang)[10]}</p>
                            </TabPane>
                        </TabContent>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}
export default CourseOverview;