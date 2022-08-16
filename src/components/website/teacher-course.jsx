import React, { useState, useEffect, Suspense } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { Row, Col, Spinner } from 'reactstrap';
import TableContent from '../general/table';
const RegisterPrivate = React.lazy(() => import('./register-private'));
function TeacherCourse(props) {
    const apiEndPoint = process.env.REACT_APP_APIEndPoint;
    const lang = localStorage.getItem('lang')
    const pageSize = 15;
    const dataTitles = lang === 'en' ?
        ["ID", 'Language', 'Course', 'Teacher', 'Register']
        : ['ردیف', 'زبان', 'دوره', 'استاد', 'ثبت نام'];
    const columnList = ["id", 'LanguageName', 'CourseName', 'TeacherName'];
    const filteredItem = "CourseName";
    const { show, onHide, id, title, factor } = props;
    const [dataList, setDataList] = useState([]);
    const [showRegister, setShowRegister] = useState(false);
    const [teacherCouseId, setTeacherCouseId] = useState(0);
    const [registerTitle, setRegisterTitle] = useState('');
    useEffect(() => {
        let mounted = true;
        let result = "";
        let list = [];
        if (id !== "") {
            const fetchData = async () => {
                if (factor === "Course") {
                    result = await axios.get(apiEndPoint + `TeacherCourse/DisplayAllByCourse?courseId=${id}`)
                }
                else {
                    result = await axios.get(apiEndPoint + `TeacherCourse/DisplayAllByTeacher?teacherId=${id}`)
                }
                if (mounted) {
                    result.data.map((m, i) => list.push({
                        id: i + 1,
                        LanguageName: lang === 'en' ? m.LanguageName : m.LanguageNameFa,
                        CourseName: lang === 'en' ? m.CourseName : m.CourseNameFa,
                        TeacherName: lang === 'en' ? m.TeacherName : m.TeacherNameFa,
                        TeacherCourseId: m.TeacherCourseId,
                        CourseId: m.CourseId,
                        TeacherId: m.TeacherId,
                    }))
                    setDataList(list);
                }
            };
            fetchData();
            return () => {
                mounted = false;
            };
        }
    }, [id, apiEndPoint, factor, lang]);
    const handleShowRegister = (list) => {
        let title = '';
        if (lang === 'fa') {
            title = list.CourseName + "ثبت نام در";
        }
        else if (lang === 'fr') {
            title = `Inscrivez-vous au ${list.CourseName}`;
        }
        else {

            title = `Register in ${list.CourseName}`;
        }
        setTeacherCouseId(list.TeacherCourseId)
        setRegisterTitle(title)
        setShowRegister(true)
    }
    const handleHideRegister = () => {
        setShowRegister(false)
        onHide();
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
                <Modal.Header closeButton className="loginHeader"  >
                    <Row className="align-items-center">
                        <Col xs="2" className="text-center">
                            <img src="main-images/logo-circle.webp" width="100%" height="100%" alt="logo" />
                        </Col>
                        <Col xs="10" dir={lang === "fa" ? "rtl" : "ltr"}>
                            <Modal.Title id="example-modal-sizes-title-lg" className="h4 font-weight-bold text-white">{title}</Modal.Title>
                        </Col>
                    </Row>
                </Modal.Header>
                <Modal.Body dir={lang === 'en' ? "ltr" : "rtl"}>
                    <TableContent filter={filteredItem} placeholder={lang === 'en' ? "Search course Name" : "جستجو با عنوان دوره"} dataList={dataList} dataTitles={dataTitles} columnList={columnList} onEdithandler={handleShowRegister} pageSize={pageSize} />
                </Modal.Body>
            </Modal>
            <Suspense fallback={<Spinner color="success" />}>
                <RegisterPrivate id={teacherCouseId} title={registerTitle} show={showRegister} onHide={handleHideRegister} />
            </Suspense>
        </div>
    );
}
export default TeacherCourse;