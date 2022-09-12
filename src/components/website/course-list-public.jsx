import React, { Component, Suspense } from 'react';
import { Container, Row, Col, Spinner } from 'reactstrap';
import axios from 'axios';
const MyDropdown = React.lazy(() => import('../general/dropdown'));
const TableContent = React.lazy(() => import('../general/table'));
const RegisterPublic = React.lazy(() => import('./register-public'));
class CourseListPublic extends Component {
    constructor(props) {
        super(props);
        const lang = localStorage.getItem('lang');
        this.state = {
            apiEndPoint: process.env.REACT_APP_APIEndPoint,
            pageSize: 10,
            dataList: [],
            dataTitles: lang === 'en'
                ? ["ID", 'Language', 'Teacher', 'Course', 'Total Seats', 'Available Seats', 'Duration', 'Start/Finish', 'Class Time', 'Price', 'Detail and Enrollment']
                : lang === 'fa'
                    ? ['ردیف', 'زبان', 'استاد', 'دوره', 'ظرفیت', 'ظرفیت باقیمانده', 'طول دوره', 'شروع/پایان', 'زمان کلاس', 'قیمت', 'جزییات و ثبت نام']
                    : lang === 'fr'
                        ? ["ID", 'Langue', 'Enseignant', 'Cours', 'Nombre total de places', 'Places disponibles', 'Durée', 'Début/Arrêt', 'Heure du cours', 'Prix', 'Détail et inscription ']
                        : ["المعرف", "اللغة", "المدرس", "الدورة", "إجمالي المقاعد", "المقاعد المتاحة", "المدة", "البدء / الانتهاء", "وقت الفصل", "السعر", "التفاصيل والتسجيل "],

            columnList: ["id", 'LanguageName', 'TeacherName', 'CourseName', 'Capacity', 'AvailableCapacity', 'Duration', 'Start_Finish', 'Times', 'Price'],
            filteredItem: "TeacherName",
            showCourseDetail: false,
            courseId: "",
            publicTermId: "",
            title: "",
            //
            dropdownList: [],
            languageId: ""
        }
    }
    getLanguage = async () => {
        const lang = localStorage.getItem('lang');
        let dropdownList = [];
        await axios.get(this.state.apiEndPoint + 'Language/DisplayDropdown').then(response => {
            let md = response.data
            md.map(m =>
                dropdownList.push({
                    value: m.LanguageId,
                    label: lang === 'en' ? m.Name : m.NameFa,
                }),
            );
            this.setState({ dropdownList });
        });
    }
    getTeacherCourse = async (id) => {
        const lang = localStorage.getItem('lang');
        const dataList = [];
        let url = ""
        if (id === "" || id === null || id === undefined) {
            url = this.state.apiEndPoint + 'Term/DisplayAllPublic';
        }
        else {
            url = this.state.apiEndPoint + `Term/DisplayAllPublicByLanguage?languageId=${id}`;
        }
        await axios.get(url).then(response => {
            let md = response.data
            md.map((m, i) =>
                dataList.push({
                    id: i + 1,
                    LanguageName: lang === 'en' ? m.LanguageName : m.LanguageNameFa,
                    TeacherName: lang === 'en' ? m.TeacherName : m.TeacherNameFa,
                    CourseName: lang === 'en' ? m.CourseName : m.CourseNameFa,
                    Capacity: m.Capacity,
                    AvailableCapacity: m.AvailableCapacity,
                    Duration: lang === 'en' ? m.Duration : m.DurationFa,
                    Start_Finish: lang === 'en' ? (m.Start + '|' + m.Finish) : (m.StartFa + '|' + m.FinishFa),
                    Times: lang === 'en' ? m.Times : m.TimesFa,
                    Price: lang === 'en' ? m.Price : m.PriceFa,
                    EnrollmentDeadline: m.EnrollmentDeadline,
                    CourseId: m.CourseId,
                    TeacherId: m.TeacherId,
                    LanguageId: m.LanguageId,
                    Modifier: m.Modifier,
                    ModificationDate: m.ModificationDate,
                    IsDeleted: m.IsDeleted,
                    PublicTermId: m.PublicTermId,
                    PublicTeacherCourseId: m.PublicTeacherCourseId,
                }),
            );
            this.setState({ dataList });
        });
    }
    componentDidMount() {
        this.getLanguage();
        this.getTeacherCourse("");
    }
    componentDidUpdate(prevProps, prevState) {

    }
    onNewCourseRequest = (list) => {
        this.setState({ publicTermId: list.PublicTermId })
        this.setState({ courseId: list.CourseId })
        this.setState({ title: 'Register (Public Class)' })
        this.setState({ showCourseDetail: true })
    }
    handleHide = () => {
        this.setState({ showCourseDetail: false })
        this.setState({ courseId: "" })
        this.setState({ publicTermId: "" })
        this.getTeacherCourse();
    }
    handleDropdownSelect = (e) => {
        let languageId = e.target.value;
        if (languageId === "" || languageId === null || languageId === undefined) {
            this.setState({ languageId: "" })
            this.getTeacherCourse("");
            return;
        }
        else {
            this.getTeacherCourse(languageId);
            this.setState({ languageId: languageId })
        }
    }
    getHeading = (lang) => {
        let heading = []
        if (lang === 'en') {
            heading.push("Select Courses")
            heading.push("All Courses")
        }
        else if (lang === 'fr') {
            heading.push("Choisir la Cours")
            heading.push("All Cours...")
        }
        else {
            heading.push("انتخاب دوره")
            heading.push("دوره...")
        }
        return heading
    }
    render() {
        const lang = localStorage.getItem('lang');
        const { dropdownList, languageId, dataList, dataTitles, columnList, pageSize, filteredItem, title, showCourseDetail, courseId, publicTermId } = this.state;
        return (
            <div className="p-2">
                <Container fluid className="table">
                    <Row>
                        <Col xs="12" md="6" lg="4" className="text-left m-0 p-1">
                            <div className={lang === "fa" ? "text-right m-0 p-0" : "m-0 p-0"}>
                                <MyDropdown
                                    label={this.getHeading(lang)[0]}
                                    display={this.getHeading(lang)[1]}
                                    dataList={dropdownList}
                                    handleChange={this.handleDropdownSelect}
                                    name="language"
                                    selectedValue={languageId}
                                    htmlFor="language"
                                    width={window.innerWidth < 576 ? "w-100" : "w-25"}
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12" className="text-left m-0 p-1">
                            <Suspense fallback={<Spinner color="success" />}>
                                <TableContent filter={filteredItem} placeholder={lang === 'en' ? "Find Teacher" : "استاد را بیاب"} dataList={dataList} dataTitles={dataTitles} columnList={columnList} onEdithandler={this.onNewCourseRequest} pageSize={pageSize} />
                            </Suspense>
                        </Col>
                    </Row>
                </Container>
                <Suspense fallback={<Spinner color="success" />}>
                    <RegisterPublic courseId={courseId} publicTermId={publicTermId} title={title} show={showCourseDetail} onHide={this.handleHide} />
                </Suspense>
            </div>);
    }
}
export default CourseListPublic;