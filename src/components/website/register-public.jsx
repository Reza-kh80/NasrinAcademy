import React, { useState, Suspense } from 'react';
import { Row, Col, Spinner } from 'reactstrap';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Modal from 'react-bootstrap/Modal';
const RegisterProcedure = React.lazy(() => import('./register-procedure'));
const CourseRequestPublic = React.lazy(() => import('./course-request-public'));
const CourseOverview = React.lazy(() => import('./course-overview'));
function RegisterPublic(props) {
    const lang = localStorage.getItem('lang')
    const { show, onHide, title, courseId, publicTermId } = props;
    const [key, setKey] = useState('1');
    const getHeading = (lang) => {
        let heading = []
        if (lang === 'en') {
            heading.push("Course Syllabus")
            heading.push("Registeration Steps")
            heading.push("Register form")
        }
        else if (lang === 'fr') {
            heading.push("Étapes d'inscription")
            heading.push("Étapes d'inscription")
            heading.push("Formulaire d'inscription")
        }
        else if (lang === 'fa') {
            heading.push("سرفصل های آموزشی")
            heading.push("مراحل ثبت نام")
            heading.push("فرم ثبت نام")
        } else {
            heading.push("مخطط المنهج")
            heading.push("خطوات التسجيل")
            heading.push("استمارة تسجيل")
        }
        return heading
    }
    const handleHideRegister = () => {
        onHide();
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
                <Modal.Header closeButton className="loginHeader">
                    <Row className="align-items-center" >
                        <Col xs="2" className="text-center">
                            <img src="main-images/logo-circle.webp" width="100%" height="100%" alt="logo" />
                        </Col>
                        <Col xs="10">
                            <Modal.Title id="example-modal-sizes-title-lg" className="h4 font-weight-bold text-white">{title}</Modal.Title>
                        </Col>
                    </Row>
                </Modal.Header>
                <Modal.Body>
                    <div dir={lang === 'fa' ? 'rtl' : 'ltr'} className={lang === 'fa' ? 'text-right m-0 p-0' : 'text-left m-0 p-0'}>
                        <Tabs
                            id="controlled-tab-example"
                            activeKey={key}
                            onSelect={(k) => setKey(k)}
                        >
                            <Tab eventKey="1" tabClassName="font-weight-bold" className="tab-border p-3" title={getHeading(lang)[0]}>
                                <Suspense fallback={<Spinner color="success" />}>
                                    <CourseOverview id={courseId} />
                                </Suspense>
                            </Tab>
                            <Tab eventKey="2" tabClassName="font-weight-bold" className="tab-border p-3" title={getHeading(lang)[1]}>
                                <Suspense fallback={<Spinner color="success" />}>
                                    <RegisterProcedure />
                                </Suspense>
                            </Tab>
                            <Tab eventKey="3" tabClassName="font-weight-bold" className="tab-border p-3" title={getHeading(lang)[2]}>
                                <Suspense fallback={<Spinner color="success" />}>
                                    <CourseRequestPublic publicTermId={publicTermId} onHide={handleHideRegister} />
                                </Suspense>
                            </Tab>
                        </Tabs>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default RegisterPublic;
