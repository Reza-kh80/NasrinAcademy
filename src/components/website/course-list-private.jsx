import React, { Component, Suspense } from "react";
import { Container, Row, Col, Spinner } from "reactstrap";
import axios from "axios";
const MyDropdown = React.lazy(() => import("../general/dropdown"));
const TableContent = React.lazy(() => import("../general/table"));
const RegisterPrivate = React.lazy(() => import("./register-private"));
class CourseListPrivate extends Component {
  constructor(props) {
    super(props);
    const lang = localStorage.getItem("lang");
    this.state = {
      apiEndPoint: process.env.REACT_APP_APIEndPoint,
      pageSize: 10,
      dataList: [],
      dataTitles:
        lang === "en"
          ? [
              "ID",
              "Language",
              "Teacher",
              "Course",
              "Mon",
              "Tue",
              "Wed",
              "Thu",
              "Fri",
              "Sat",
              "Sun",
              "Price/Session",
              "Detail and Enrollment",
            ]
          : [
              "ردیف",
              "زبان",
              "استاد",
              "دوره",
              "شنبه",
              "یک شنبه",
              "دوشنبه",
              "سه شنبه",
              "چهار شنبه",
              "پنج شنبه",
              "جمعه",
              "قیمت جلسه",
              "جزییات و ثبت نام",
            ],
      columnList: [
        "id",
        "LanguageName",
        "TeacherName",
        "CourseName",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun",
        "SessionPrice",
      ],
      filteredItem: "TeacherName",
      showCourseDetail: false,
      courseId: "",
      privateTeacherCourseId: "",
      title: "",
      dropdownList: [],
      languageId: "",
    };
  }
  getLanguage = async () => {
    const lang = localStorage.getItem("lang");
    let dropdownList = [];
    await axios
      .get(this.state.apiEndPoint + "Language/DisplayDropdown")
      .then((response) => {
        response.data.map((m) =>
          dropdownList.push({
            value: m.LanguageId,
            label: lang === "en" ? m.Name : m.NameFa,
          })
        );
        this.setState({ dropdownList });
      });
  };
  getCourse = async (id) => {
    await axios.get().then((response) => {
      console.log(response.data);
      this.setState({ courseList: response.data });
    });
  };
  getTeacherCourse = async (id) => {
    const lang = localStorage.getItem("lang");
    const dataList = [];
    let url = "";
    if (id === "" || id === null || id === undefined) {
      url = this.state.apiEndPoint + "TeacherCourse/DisplayAllPrivate";
    } else {
      url =
        this.state.apiEndPoint +
        `TeacherCourse/DisplayAllByLanguage?languageId=${id}`;
    }
    await axios.get(url).then((response) => {
      response.data.map((m, i) =>
        lang === "en"
          ? dataList.push({
              id: i + 1,
              LanguageName: m.LanguageName,
              TeacherName: m.TeacherName,
              CourseName: m.CourseName,
              Mon: m.IsAvailableMon,
              Tue: m.IsAvailableTue,
              Wed: m.IsAvailableWed,
              Thu: m.IsAvailableThu,
              Fri: m.IsAvailableFri,
              Sat: m.IsAvailableSat,
              Sun: m.IsAvailableSun,
              SessionPrice: m.SessionPrice,
              PrivateTeacherCourseId: m.PrivateTeacherCourseId,
              CourseId: m.CourseId,
              TeacherId: m.TeacherId,
            })
          : dataList.push({
              id: i + 1,
              LanguageName: m.LanguageNameFa,
              TeacherName: m.TeacherNameFa,
              CourseName: m.CourseNameFa,
              Sat: m.IsAvailableSat,
              Sun: m.IsAvailableSun,
              Mon: m.IsAvailableMon,
              Tue: m.IsAvailableTue,
              Wed: m.IsAvailableWed,
              Thu: m.IsAvailableThu,
              Fri: m.IsAvailableFri,
              SessionPrice: m.SessionPriceFa,
              PrivateTeacherCourseId: m.PrivateTeacherCourseId,
              CourseId: m.CourseId,
              TeacherId: m.TeacherId,
            })
      );
      this.setState({ dataList });
    });
  };
  componentDidMount() {
    this.getLanguage();
    this.getTeacherCourse("");
  }
  componentDidUpdate(prevProps, prevState) {}
  onNewCourseRequest = (list) => {
    this.setState({ privateTeacherCourseId: list.PrivateTeacherCourseId });
    this.setState({ courseId: list.CourseId });
    this.setState({ title: "Register (Private Class)" });
    this.setState({ showCourseDetail: true });
  };
  handleHide = () => {
    this.setState({ showCourseDetail: false });
    this.setState({ courseId: "" });
    this.setState({ privateTeacherCourseId: "" });
    this.getTeacherCourse();
  };
  handleDropdownSelect = (e) => {
    let languageId = e.target.value;
    if (languageId === "" || languageId === null || languageId === undefined) {
      this.setState({ languageId: "" });
      this.getTeacherCourse("");
      return;
    } else {
      this.getTeacherCourse(languageId);
      this.setState({ languageId: languageId });
    }
  };
  getHeading = (lang) => {
    let heading = [];
    if (lang === "en") {
      heading.push("Select Courses");
      heading.push("Course...");
    } else if (lang === "fr") {
      heading.push("Choisir la Cours");
      heading.push("Cours...");
    } else {
      heading.push("انتخاب دوره");
      heading.push("دوره ...");
    }
    return heading;
  };
  render() {
    const lang = localStorage.getItem("lang");
    const {
      dropdownList,
      languageId,
      dataList,
      dataTitles,
      columnList,
      pageSize,
      filteredItem,
      title,
      showCourseDetail,
      courseId,
      privateTeacherCourseId,
    } = this.state;
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
                <TableContent
                  filter={filteredItem}
                  placeholder={lang === "en" ? "Find Teacher" : "استاد را بیاب"}
                  dataList={dataList}
                  dataTitles={dataTitles}
                  columnList={columnList}
                  onEdithandler={this.onNewCourseRequest}
                  pageSize={pageSize}
                />
              </Suspense>
              <Suspense fallback={<Spinner color="success" />}>
                <RegisterPrivate
                  courseId={courseId}
                  privateTeacherCourseId={privateTeacherCourseId}
                  title={title}
                  show={showCourseDetail}
                  onHide={this.handleHide}
                />
              </Suspense>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default CourseListPrivate;
