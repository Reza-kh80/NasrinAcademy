import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TableContent from '../general/table';
import { Row, Col } from 'reactstrap';
function CourseOverview(props) {
    const apiEndPoint = process.env.REACT_APP_APIEndPoint;
    const mediaEndPoint = process.env.REACT_APP_MediaEndPoint;
    const lang = localStorage.getItem('lang');
    const pageSize = 15;
    const dataTitles = lang === 'en'
        ? ['ID', 'Level', 'Title', 'Expected Time']
        : ['ردیف', 'سطح', 'عنوان', 'زمان مورد انتظار تدریس'];
    const columnList = ["id", 'Level', 'Title', 'ExpectedTime'];
    const filteredItem = "Title";
    const { id } = props;
    const [dataList, setDataList] = useState([]);
    const [courseList, setCourseList] = useState({});
    useEffect(() => {
        let mounted = true;
        if (id !== "") {
            const fetchData = async () => {
                const result = await axios.get(apiEndPoint + `Course/Get?courseId=${id}`)
                if (mounted) {
                    setCourseList(result.data);
                }
            };
            fetchData();
            return () => {
                mounted = false;
            };
        }
    }, [id, apiEndPoint]);
    useEffect(() => {
        let mounted = true;
        let list = [];
        if (id !== "") {
            const fetchData = async () => {
                const result = await axios.get(apiEndPoint + `CourseOverview/DisplayAll?courseId=${id}`)
                if (mounted) {
                    result.data.map((m, i) => list.push({
                        id: i + 1,
                        Level: m.Level,
                        Title: m.Title,
                        ExpectedTime: m.ExpectedTime,
                        OverviewId: m.OverviewId,
                        CourseId: m.CourseId,
                        CourseName: m.CourseName,
                    }))
                    setDataList(list);
                }
            };
            fetchData();
            return () => {
                mounted = false;
            };
        }
    }, [id, apiEndPoint]);
    const getHeading = (lang, item) => {
        let heading = []
        if (lang === 'en') {
            heading.push(item.Title)
            heading.push(item.Benefits1)
            heading.push(item.Benefits2)
            heading.push(item.Benefits3)
            heading.push(item.Benefits4)
            heading.push(item.Benefits5)
            heading.push(item.Benefits6)
            heading.push(item.Benefits7)
            heading.push(item.Benefits8)
            heading.push("Syllabus")
            heading.push("Courses & Register")
            heading.push("Select language for courses")
            heading.push("Select Language...")
        }
        else if (lang === 'fr') {
            heading.push(item.TitleFr)
            heading.push(item.Benefits1Fr)
            heading.push(item.Benefits2Fr)
            heading.push(item.Benefits3Fr)
            heading.push(item.Benefits4Fr)
            heading.push(item.Benefits5Fr)
            heading.push(item.Benefits6Fr)
            heading.push(item.Benefits7Fr)
            heading.push(item.Benefits8Fr)
            heading.push("Syllabus")
            heading.push("Cours et inscription")
            heading.push("Choisir la langue")
            heading.push("Choisir la langue...")
        }
        else {
            heading.push(item.TitleFa)
            heading.push(item.Benefits1Fa)
            heading.push(item.Benefits2Fa)
            heading.push(item.Benefits3Fa)
            heading.push(item.Benefits4Fa)
            heading.push(item.Benefits5Fa)
            heading.push(item.Benefits6Fa)
            heading.push(item.Benefits7Fa)
            heading.push(item.Benefits8Fa)
            heading.push("مطالب")
            heading.push("دوره ها و ثبت نام")
            heading.push("انتخاب زبان جهت مشاهده دوره ها")
            heading.push("انتخاب دوره ...")
        }
        return heading
    }
    return (
        <div>
            <Row style={{ backgroundColor: courseList.Color }} className=" m-0 mb-2 mt-2 rounded">
                <Col xs="12" xl="4" className="p-2 d-flex align-content-center flex-wrap">
                    <img className="img-thumbnail" width="100%" height="100%" src={mediaEndPoint + 'Course/' + courseList.Media} alt={courseList.Title + "Image"} />
                </Col>
                <Col xs="12" xl="8" className="p-2 h-100">
                    <Row>
                        <Col>
                            <h4 className={lang === "fa" ? "text-right mt-2 text-white" : "text-left mt-2 text-white"} >{getHeading(lang, courseList)[0]}</h4>
                            <div className={lang === "fa" ? "text-right h6 p-2" : "h6 p-2"}>
                                <ul className="p-0 m-0 text-white">
                                    <li>{getHeading(lang, courseList)[1]}</li>
                                    <li>{getHeading(lang, courseList)[2]}</li>
                                    <li>{getHeading(lang, courseList)[3]}</li>
                                    <li>{getHeading(lang, courseList)[4]}</li>
                                    <li>{getHeading(lang, courseList)[5]}</li>
                                    <li>{getHeading(lang, courseList)[6]}</li>
                                    <li>{getHeading(lang, courseList)[7]}</li>
                                    <li>{getHeading(lang, courseList)[8]}</li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <TableContent filter={filteredItem} placeholder={lang === 'en' ? "search with title" : "جستجو با عنوان"} dataList={dataList} dataTitles={dataTitles} columnList={columnList} onEdithandler={null} pageSize={pageSize} />
        </div>
    );
}
export default CourseOverview;