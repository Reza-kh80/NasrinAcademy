import React, { Component, Suspense } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Spinner,
  CardHeader,
  CardFooter,
  CardText,
} from "reactstrap";
import axios from "axios";
const TeacherOverview = React.lazy(() => import("./teacher-overview"));
const TecaherCourse = React.lazy(() => import("./teacher-course"));
const MyDropdown = React.lazy(() => import("../general/dropdown"));
class TranslaterList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mediaEndMoint: process.env.REACT_APP_MediaEndPoint,
      apiEndPoint: process.env.REACT_APP_APIEndPoint,
      teacherList: [],
      dropdownList: [],
      showTeacherOverView: false,
      showTeacherCourse: false,
      id: "",
      title: "",
      languageId: "",
      languageName: "French",
    };
  }
  getLanguage = async () => {
    const lang = localStorage.getItem("lang");
    let dropdownList = [];
    await axios
      .get(this.state.apiEndPoint + "Language/DisplayDropdown")
      .then((response) => {
        let md = response.data;
        md.map((m) =>
          dropdownList.push({
            value: m.LanguageId,
            label: lang === "en" ? m.Name : m.NameFa,
          })
        );
        this.setState({ dropdownList });
      });
  };
  getTeacher = async (id) => {
    await axios
      .get(
        this.state.apiEndPoint + `Teacher/DisplayAllRegistered?languageId=${id}`
      )
      .then((response) => {
        this.setState({
          teacherList: response.data.filter(
            (teacher) => teacher.IsDeleted === false
          ),
        });
      });
  };
  componentDidMount() {
    this.getLanguage();
    this.getTeacher(1);
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.teacherList !== this.state.teacherList) {
    }
  }
  addDefaultSrc(ev) {
    ev.target.src = "main-images/user.webp"; // this could be an imported image or url
  }
  getHeading = (lang, item) => {
    let heading = [];
    if (lang === "en") {
      heading.push(item.Name);
      heading.push(item.CoursesDescription);
      heading.push(item.TeachingLevel);
      heading.push(item.TeachingAgeLevel);
      heading.push("Courses");
      heading.push("Teacher Level");
      heading.push("Age Level");
      heading.push("Years of Experience");
      heading.push("Session Price");
      heading.push("Overview");
      heading.push("Available Courses");
      heading.push("Select language for teachers");
      heading.push("Select Language...");
    } else if (lang === "fr") {
      heading.push(item.NameFr);
      heading.push(item.CoursesDescriptionFr);
      heading.push(item.TeachingLevelFr);
      heading.push(item.TeachingAgeLevelFr);
      heading.push("Cours");
      heading.push("Niveau de l'enseignant");
      heading.push("Niveau d'âge");
      heading.push("Des Années d'expérience");
      heading.push("Prix de la session");
      heading.push("Aperçu de l'enseignant");
      heading.push("Cours Disponibles");
      heading.push("Select language for teachers");
      heading.push("Select Language...");
    } else if (lang === 'fa') {
      heading.push(item.NameFa);
      heading.push(item.CoursesDescriptionFa);
      heading.push(item.TeachingLevelFa);
      heading.push(item.TeachingAgeLevelFa);
      heading.push("دوره ها");
      heading.push("سطح استاد");
      heading.push("رده سنی تدریس");
      heading.push("سابقه تدریس (سال)");
      heading.push("قیمت هر جلسه");
      heading.push("معرفی");
      heading.push("دوره ها و ثبت نام");
      heading.push("زبان آموزشی را نتخاب کنید");
      heading.push("انتخاب زبان");
    } else {
      heading.push(item.NameFa);
      heading.push(item.CoursesDescriptionFa);
      heading.push(item.TeachingLevelFa);
      heading.push(item.TeachingAgeLevelFa);
      heading.push("الدورات");
      heading.push("مستوى المعلم");
      heading.push("المستوى العمري");
      heading.push("سنوات الخبرة");
      heading.push("سعر الجلسة");
      heading.push("نظرة عامة");
      heading.push("الدورات المتاحة");
      heading.push("اختر لغة للمعلمين");
      heading.push("اختر اللغة ...");
    }
    heading.push(item.ExperienceYear);
    heading.push(item.SessionPrice);
    return heading;
  };
  handleDropdownSelect = (e) => {
    let languageId = e.target.value;
    var index = e.nativeEvent.target.selectedIndex;
    let languageName = e.nativeEvent.target[index].text;
    if (languageId === "") {
      this.setState({ languageId: "" });
      this.setState({ languageName: "" });
      return;
    } else {
      this.getTeacher(languageId);
      this.setState({ languageId: languageId });
      this.setState({ languageName: languageName });
    }
  };
  handleShowTeacherOverview = (id, title) => {
    this.setState({ id });
    this.setState({ title });
    this.setState({ showTeacherOverview: true });
  };
  handleShowTeacherCourse = (id, title) => {
    this.setState({ id });
    this.setState({ title });
    this.setState({ showTeacherCourse: true });
  };
  handleHideTeacherOverview = () => {
    this.setState({ showTeacherOverview: false });
  };
  handleHideTeacherCourse = () => {
    this.setState({ showTeacherCourse: false });
  };
  render() {
    const {
      teacherList,
      showTeacherOverview,
      showTeacherCourse,
      id,
      title,
      languageId,
      dropdownList,
      languageName,
    } = this.state;
    const lang = localStorage.getItem("lang");
    return (
      <div className="p-0 m-0">
        <Row>
          <Col xs="12" md="6" lg="4" className="m-0">
            <Suspense fallback={<Spinner color="success" />}>
              <div className={lang === "fa" || lang === 'ar' ? "text-right m-0 p-0" : "m-0 p-0"}>
                <MyDropdown
                  label={this.getHeading(lang, "")[11]}
                  display={this.getHeading(lang, "")[12]}
                  dataList={dropdownList}
                  handleChange={this.handleDropdownSelect}
                  name="language"
                  selectedValue={languageId}
                  htmlFor="language"
                  width={window.innerWidth < 576 ? "w-100" : "w-25"}
                />
              </div>
            </Suspense>
          </Col>
        </Row>
        <Row className="text-center align-items-center">
          {teacherList.map((item, index) => (
            <Col
              key={index}
              xs="12"
              lg="7"
              xl="4"
              dir={lang === "fa" || lang === 'ar' ? "rtl" : "ltr"}
              className={
                lang === "fa" || lang === 'ar' ? "text-right p-0 m-0" : "text-left p-0 m-0"
              }
            >
              <Card className="m-2">
                <CardHeader tag="h4" className="text-primary m-0">
                  {this.getHeading(lang, item)[0]}
                </CardHeader>
                <div className="text-center p-1">
                  <div className="img-Wrapper">
                    <img
                      className="p-0 m-0 img-thumbnail"
                      src={this.state.mediaEndMoint + "Teacher/" + item.Photo}
                      onError={this.addDefaultSrc}
                      alt={item.Title + "Image"}
                    />
                  </div>
                </div>
                <CardBody>
                  <CardText
                    tag="h6"
                    className="text-secondary font-weight-bold"
                  >
                    <strong className="text-info">{languageName}</strong>
                  </CardText>
                  <CardText
                    tag="h6"
                    className="text-secondary font-weight-bold"
                  >
                    {this.getHeading(lang, item)[4]}:{" "}
                    <strong className="text-success">
                      {this.getHeading(lang, item)[1]}
                    </strong>
                  </CardText>
                  <CardText
                    tag="h6"
                    className="text-secondary font-weight-bold"
                  >
                    {this.getHeading(lang, item)[5]}:{" "}
                    <strong className="text-success">
                      {this.getHeading(lang, item)[2]}
                    </strong>
                  </CardText>
                  <CardText
                    tag="h6"
                    className="text-secondary font-weight-bold"
                  >
                    {this.getHeading(lang, item)[6]}:{" "}
                    <strong className="text-success">
                      {this.getHeading(lang, item)[3]}
                    </strong>
                  </CardText>
                  <CardText
                    tag="h6"
                    className="text-secondary font-weight-bold"
                  >
                    {this.getHeading(lang, item)[7]}:{" "}
                    <strong className="text-success">
                      {this.getHeading(lang, item)[13]}
                    </strong>
                  </CardText>
                </CardBody>
                <CardFooter className="text-muted">
                  <Button
                    className={
                      lang === "fa" || lang === 'ar'
                        ? "btn btn-xs float-right"
                        : "btn btn-xs float-left"
                    }
                    onClick={() =>
                      this.handleShowTeacherOverview(
                        item.TeacherId,
                        this.getHeading(lang, item)[0]
                      )
                    }
                  >
                    {this.getHeading(lang, item)[9]}
                  </Button>
                  <Button
                    className={
                      lang === "fa" || lang === 'ar'
                        ? "btn btn-xs float-left"
                        : "btn btn-xs float-right"
                    }
                    onClick={() =>
                      this.handleShowTeacherCourse(
                        item.TeacherId,
                        this.getHeading(lang, item)[0]
                      )
                    }
                  >
                    {this.getHeading(lang, item)[10]}
                  </Button>
                </CardFooter>
              </Card>
            </Col>
          ))}
        </Row>
        <Suspense fallback={<Spinner color="success" />}>
          <TeacherOverview
            id={id}
            title={title}
            show={showTeacherOverview}
            onHide={this.handleHideTeacherOverview}
          />
          <TecaherCourse
            id={id}
            title={title}
            show={showTeacherCourse}
            factor="Teacher"
            onHide={this.handleHideTeacherCourse}
          />
        </Suspense>
      </div>
    );
  }
}
export default TranslaterList;
