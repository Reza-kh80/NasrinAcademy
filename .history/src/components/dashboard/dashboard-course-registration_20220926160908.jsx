import React, { Component, Suspense } from 'react';
import { Container, Row, Col, Button, Spinner, Input } from 'reactstrap';
import Form from 'react-bootstrap/Form';
import SimpleReactValidator from 'simple-react-validator';
import axios from 'axios';
import { getDatetime } from '../../utils/datetime';
import UserContext from '../../utils/user-context';
const MyDropdown = React.lazy(() => import('../general/dropdown'));
const TableContent = React.lazy(() => import('../general/table'));
const FileUpload = React.lazy(() => import('../general/fileUpload'));

class CourseRegistration extends Component {
    static contextType = UserContext;
    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator();
        this.state = {
            apiEndPoint: process.env.REACT_APP_APIEndPoint,
            dropdownList: [],
            courseObject: {
                CourseId: "",
                Title: "",
                Benefits1: "",
                Benefits2: "",
                Benefits3: "",
                Benefits4: "",
                Benefits5: "",
                Benefits6: "",
                Benefits7: "",
                Benefits8: "",
                TitleFr: "",
                Benefits1Fr: "",
                Benefits2Fr: "",
                Benefits3Fr: "",
                Benefits4Fr: "",
                Benefits5Fr: "",
                Benefits6Fr: "",
                Benefits7Fr: "",
                Benefits8Fr: "",
                TitleFa: "",
                Benefits1Fa: "",
                Benefits2Fa: "",
                Benefits3Fa: "",
                Benefits4Fa: "",
                Benefits5Fa: "",
                Benefits6Fa: "",
                Benefits7Fa: "",
                Benefits8Fa: "",
                Agreement: "",
                AgreementFa: "",
                AgreementFr: "",
                Media: "",
                LanguageId: "",
                Modifier: "",
                ModificationDate: getDatetime(),
                IsDeleted: false,
            },
            Color: "",
            pageSize: 5,
            dataList: [],
            dataTitles: ["ID", 'Course Title', 'Modifier', 'Date', 'File Name', 'Edit'],
            columnList: ["id", "Title", 'Modifier', 'ModificationDate', 'Media'],
            filteredItem: "Title"
        }
    }
    getLanguage = async () => {
        let dropdownList = [];
        await axios.get(this.state.apiEndPoint + 'Language/DisplayDropdown').then(response => {
            let md = response.data
            md.map(m =>
                dropdownList.push({
                    value: m.LanguageId,
                    label: m.Name,
                }),
            );
            this.setState({ dropdownList });
        });
    }
    getData = async (id) => {
        const dataList = [];
        await axios.get(this.state.apiEndPoint + `Course/GetAll?languageId=${id}`).then(response => {
            let md = response.data
            md.map((m, i) =>
                dataList.push({
                    id: i + 1,
                    Title: m.Title,
                    Benefits1: m.Benefits1,
                    Benefits2: m.Benefits2,
                    Benefits3: m.Benefits3,
                    Benefits4: m.Benefits4,
                    Benefits5: m.Benefits5,
                    Benefits6: m.Benefits6,
                    Benefits7: m.Benefits7,
                    Benefits8: m.Benefits8,
                    TitleFr: m.TitleFr,
                    Benefits1Fr: m.Benefits1Fr,
                    Benefits2Fr: m.Benefits2Fr,
                    Benefits3Fr: m.Benefits3Fr,
                    Benefits4Fr: m.Benefits4Fr,
                    Benefits5Fr: m.Benefits5Fr,
                    Benefits6Fr: m.Benefits6Fr,
                    Benefits7Fr: m.Benefits7Fr,
                    Benefits8Fr: m.Benefits8Fr,
                    TitleFa: m.TitleFa,
                    Benefits1Fa: m.Benefits1Fa,
                    Benefits2Fa: m.Benefits2Fa,
                    Benefits3Fa: m.Benefits3Fa,
                    Benefits4Fa: m.Benefits4Fa,
                    Benefits5Fa: m.Benefits5Fa,
                    Benefits6Fa: m.Benefits6Fa,
                    Benefits7Fa: m.Benefits7Fa,
                    Benefits8Fa: m.Benefits8Fa,
                    Color: this.state.Color,
                    Media: m.Media,
                    LanguageId: m.LanguageId,
                    Modifier: m.Modifier,
                    ModificationDate: m.ModificationDate,
                    IsDeleted: m.IsDeleted,
                    CourseId: m.CourseId,
                }),
            );
            this.setState({ dataList });
        });
    }
    componentDidMount() {
        this.onNewHandeler();
        this.getLanguage();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.courseObject !== this.state.courseObject) {
            // console.log(this.state.courseObject)
        }
    }
    onNewHandeler() {
        const courseObject = { ...this.state.courseObject };
        courseObject.CourseId = "";
        courseObject.Title = "";
        courseObject.Benefits1 = "";
        courseObject.Benefits2 = "";
        courseObject.Benefits3 = "";
        courseObject.Benefits4 = "";
        courseObject.Benefits5 = "";
        courseObject.Benefits6 = "";
        courseObject.Benefits7 = "";
        courseObject.Benefits8 = "";
        courseObject.TitleFr = "";
        courseObject.Benefits1Fr = "";
        courseObject.Benefits2Fr = "";
        courseObject.Benefits3Fr = "";
        courseObject.Benefits4Fr = "";
        courseObject.Benefits5Fr = "";
        courseObject.Benefits6Fr = "";
        courseObject.Benefits7Fr = "";
        courseObject.Benefits8Fr = "";
        courseObject.TitleFa = "";
        courseObject.Benefits1Fa = "";
        courseObject.Benefits2Fa = "";
        courseObject.Benefits3Fa = "";
        courseObject.Benefits4Fa = "";
        courseObject.Benefits5Fa = "";
        courseObject.Benefits6Fa = "";
        courseObject.Benefits7Fa = "";
        courseObject.Benefits8Fa = "";
        courseObject.Agreement = "";
        courseObject.AgreementFr = "";
        courseObject.AgreementFa = "";
        this.state.Color = "";
        courseObject.Media = "";
        courseObject.LanguageId = "";
        // courseObject.Modifier = this.context.Username;
        courseObject.ModificationDate = getDatetime();
        courseObject.IsDeleted = false;
        this.setState({ courseObject });
        this.validator.hideMessages();
    }
    onEdithandler = (list) => {
        let courseObject = { ...this.state.courseObject };
        // courseObject.CourseId = list.CourseId;
        courseObject.Title = list.Title;
        courseObject.Benefits1 = list.Benefits1;
        courseObject.Benefits2 = list.Benefits2;
        courseObject.Benefits3 = list.Benefits3;
        courseObject.Benefits4 = list.Benefits4;
        courseObject.Benefits5 = list.Benefits5;
        courseObject.Benefits6 = list.Benefits6;
        courseObject.Benefits7 = list.Benefits7;
        courseObject.Benefits8 = list.Benefits8;
        courseObject.TitleFr = list.TitleFr;
        courseObject.Benefits1Fr = list.Benefits1Fr;
        courseObject.Benefits2Fr = list.Benefits2Fr;
        courseObject.Benefits3Fr = list.Benefits3Fr;
        courseObject.Benefits4Fr = list.Benefits4Fr;
        courseObject.Benefits5Fr = list.Benefits5Fr;
        courseObject.Benefits6Fr = list.Benefits6Fr;
        courseObject.Benefits7Fr = list.Benefits7Fr;
        courseObject.Benefits8Fr = list.Benefits8Fr;
        courseObject.TitleFa = list.TitleFa;
        courseObject.Benefits1Fa = list.Benefits1Fa;
        courseObject.Benefits2Fa = list.Benefits2Fa;
        courseObject.Benefits3Fa = list.Benefits3Fa;
        courseObject.Benefits4Fa = list.Benefits4Fa;
        courseObject.Benefits5Fa = list.Benefits5Fa;
        courseObject.Benefits6Fa = list.Benefits6Fa;
        courseObject.Benefits7Fa = list.Benefits7Fa;
        courseObject.Benefits8Fa = list.Benefits8Fa;
        courseObject.LanguageId = parseInt(list.LanguageId);
        courseObject.Color = list.Color;
        courseObject.Media = list.Media;
        // courseObject.Modifier = this.context.Username;
        courseObject.ModificationDate = getDatetime();
        courseObject.IsDeleted = list.IsDeleted;
        this.setState({ courseObject });
    }
    handleUpload = (fileName) => {
        let courseObject = { ...this.state.courseObject };
        if (fileName !== "") {
            courseObject.Media = fileName;
            this.setState({ courseObject });
        }
    }
    handleDropdownSelect = (e) => {
        let languageId = e.target.value;
        if (languageId === "0") {
            return;
        }
        else {

            this.getData(languageId);
        }

    }
    handleLanguageSelect = (e) => {
        let languageId = e.target.value;
        if (languageId !== "0") {
            let courseObject = { ...this.state.courseObject };
            courseObject.LanguageId = languageId;
            this.setState({ courseObject });
        }

    }
    handleColorChange = (color, event) => {
        let courseObject = { ...this.state.courseObject };
        courseObject.Color = color.hex;
        this.setState({ courseObject });
    };
    handleChange = e => {
        let courseObject = { ...this.state.courseObject };
        courseObject[e.currentTarget.name] = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        this.setState({ courseObject });
    }
    setCurrentTime = () => {
        let courseObject = { ...this.state.courseObject };
        courseObject.ModificationDate = getDatetime();
        this.setState({ courseObject });
    }
    handleSubmit = () => {
        const { courseObject, apiEndPoint } = this.state;
        if (this.validator.allValid()) {
            this.setCurrentTime();
            console.log("aaa");
            courseObject.Color = this.state.Color;
            axios.post(apiEndPoint + 'Course/Add', courseObject, {})
                .then(response => {
                    alert('You submitted the form and stuff!');
                    this.onNewHandeler();
                    this.getData(courseObject.LanguageId);
                    this.validator.hideMessages();
                })
                .catch(function (error) {
                    alert('Something went wrong!');
                })
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }
    handleChangeColor = (e) => {
        this.setState({ Color: e.target.value })
    };

    render() {
        const { dataList, dataTitles, columnList, pageSize, filteredItem, dropdownList, courseObject, Color } = this.state;
        return (<div>
            <Container fluid className="table">
                <Row className="mb-2">
                    <Col xs="12" className="text-left text-dark p-0" >
                        <h3 className="text-primary"> Course</h3>
                    </Col>
                </Row>
                {/* <Row className="mb-4">
                    <Col sm="12" md="6" lg="4" className="text-left m-0 p-0">
                        <Suspense fallback={<Spinner color="success" />}>
                            <MyDropdown
                                label="Select Language to visit courses"
                                dataList={dropdownList}
                                handleChange={this.handleDropdownSelect}
                                display="Select Language..."
                                selectedValue={null}
                                name="courseId"
                                htmlFor="course"
                                width={window.innerWidth < 576 ? "w-100" : "w-25"}
                            />
                        </Suspense>
                    </Col>
                </Row> */}
                {/* <Row className="mb-4">
                    <Col className="text-left m-0 p-0">
                        <TableContent filter={filteredItem} dataList={dataList} dataTitles={dataTitles} columnList={columnList} onEdithandler={this.onEdithandler} pageSize={pageSize} />
                    </Col>
                </Row> */}
                <Row className="text-left border border-primary p-3 rounded">
                    <Col sm="12" md="12" >
                        <Form>
                            <Row>
                                <Col xs="12">
                                    <Button onClick={() => this.onNewHandeler()} className="btn btn-sm mb-3 ">New Course</Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="12" md="6" >
                                    <Form.Group>
                                        <Form.Label htmlFor="color"><h6 className="text-primary mb-0 ml-1" >Course backgroung Color:</h6></Form.Label>
                                        <Row>
                                            <Col xs={2}>
                                                <Input className='text-left' dir="ltr" type="color" id="color" name="b" value={Color}
                                                    onChange={this.handleChangeColor}
                                                    style={{ width: 50 }}
                                                />
                                            </Col>
                                            <Col xs={10}>
                                                <Input type='text' style={{ Color }} value={Color} disabled />
                                            </Col>
                                        </Row>
                                        {this.validator.message('color', Color, 'required', { className: 'alert alert-danger' })}
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label htmlFor="agreement"><h6 className="text-primary mb-0 ml-1" >Agreement:</h6></Form.Label>
                                        <Row>
                                            <Col xs={12}>
                                                <Input className='text-left' dir="ltr" type="textarea" id="agreement" name="Agreement" value={courseObject.Agreement}
                                                    onChange={this.handleChange}
                                                    rows={5}
                                                />
                                            </Col>
                                        </Row>
                                        {this.validator.message('Agreement', courseObject.Agreement, 'required', { className: 'alert alert-danger' })}
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label htmlFor="agreementfr"><h6 className="text-primary mb-0 ml-1" >Agreement (French):</h6></Form.Label>
                                        <Row>
                                            <Col xs={12}>
                                                <Input className='text-left' dir="ltr" type="textarea" id="agreementfr" name="AgreementFr" value={courseObject.AgreementFr}
                                                    onChange={this.handleChange}
                                                    rows={5}
                                                />
                                            </Col>
                                        </Row>
                                        {this.validator.message('Agreement French', courseObject.AgreementFr, 'required', { className: 'alert alert-danger' })}
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label htmlFor="agreementfa"><h6 className="text-primary mb-0 ml-1" >Agreement (Farsi):</h6></Form.Label>
                                        <Row>
                                            <Col xs={12}>
                                                <Input className='text-left' dir="ltr" type="textarea" id="agreementfa" name="AgreementFa" value={courseObject.AgreementFa}
                                                    onChange={this.handleChange}
                                                    rows={4}
                                                />
                                            </Col>
                                        </Row>
                                        {this.validator.message('Agreement Farsi', courseObject.AgreementFa, 'required', { className: 'alert alert-danger' })}
                                    </Form.Group>
                                </Col>
                                <Col sm="12" md="6">
                                    <Suspense fallback={<Spinner color="success" />}>
                                        <MyDropdown
                                            label="Select Language to visit courses"
                                            dataList={dropdownList}
                                            handleChange={this.handleLanguageSelect}
                                            display="Select Language..."
                                            selectedValue={courseObject.LanguageId}
                                        />
                                        {this.validator.message('language', courseObject.LanguageId, 'required', { className: 'alert alert-danger' })}
                                    </Suspense>
                                    {/* <Col xs={6}>
                                        <Suspense fallback={<Spinner color="success" />}>
                                            <div className={lang === "fa" ? "text-right m-0 p-0" : "m-0 p-0"}>
                                                <MyDropdown
                                                    label={this.getHeading(lang, "")[39]}
                                                    display={TeacherName}
                                                    dataList={drop}
                                                    handleChange={this.handleDropdownSelectTeacher}
                                                    name="TeacherName"
                                                    selectedValue={id}
                                                    htmlFor="TeacherName"
                                                    width={window.innerWidth < 576 ? "w-100" : "w-25"}
                                                />
                                            </div>
                                        </Suspense>
                                        {this.validator.message(setError[lang]['teacher'], requestObject.TeachingCourses, 'required|max:95', { className: 'alert alert-danger' })}
                                    </Col> */}
                                    {/* <Form.Group>
                                        <Form.Label htmlFor="modifier"><h6 className="text-primary mb-0 ml-1" >Modefier:</h6></Form.Label>
                                        <Form.Label htmlFor="modificationDate" className="border rounded border-secondary d-block p-2">{courseObject.Modifier}</Form.Label>
                                    </Form.Group> */}
                                    <Form.Group>
                                        <Form.Label htmlFor="modificationDate"><h6 className="text-primary mb-0 ml-1" >Modefication Date:</h6></Form.Label>
                                        <Form.Label htmlFor="modificationDate" className="border rounded border-dark d-block p-2">{courseObject.ModificationDate}</Form.Label>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label htmlFor="title"><h6 className="text-primary mb-0 ml-1" >Course Title (English):</h6></Form.Label>
                                        <Form.Control id="title" name="Title" type="text" placeholder="Enter Course Title" value={courseObject.Title} onChange={this.handleChange} />
                                        {this.validator.message('title', courseObject.Title, 'required|max:100', { className: 'alert alert-danger' })}
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label htmlFor="titlefr"><h6 className="text-primary mb-0 ml-1" >Course Title (French):</h6></Form.Label>
                                        <Form.Control id="titlefr" name="TitleFr" type="text" placeholder="Enter Course Title (French)" value={courseObject.TitleFr} onChange={this.handleChange} />
                                        {this.validator.message('title french', courseObject.TitleFr, 'required|max:100', { className: 'alert alert-danger' })}
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label htmlFor="titlefa"><h6 className="text-primary mb-0 ml-1" >Course Title (Farsi):</h6></Form.Label>
                                        <Form.Control id="titlefa" name="TitleFa" type="text" dir="rtl" placeholder="عنوان دوره" value={courseObject.TitleFa} onChange={this.handleChange} />
                                        {this.validator.message('title farsi', courseObject.TitleFa, 'required|max:100', { className: 'alert alert-danger' })}
                                    </Form.Group>
                                    <FileUpload postMethod={'Course/UploadFile'} title="Photo(jpeg.jpg)" accept={['jpg', 'jpeg']} specifiedFileName="NoName" onUpload={this.handleUpload} />
                                    {this.validator.message('video or image', courseObject.Media, 'required|min:1', { className: 'alert alert-danger' })}
                                    <Form.Group>
                                        {courseObject.CourseId !== "" && <h6 className="text-primary mb-0 ml-1" ><Form.Check inline name="IsDeleted" label="Is Deleted?" checked={courseObject.IsDeleted} onChange={this.handleChange} /></h6>}
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="12" md="4">
                                    <Form.Group>
                                        <Form.Label htmlFor="benefits1"><h6 className="text-primary mb-0 ml-1" >Course Benefits 1:</h6></Form.Label>
                                        <Form.Control id="benefits1" name="Benefits1" type="text" placeholder="Enter Course Benefits 1" value={courseObject.Benefits1} onChange={this.handleChange} />
                                        {this.validator.message('course benefits 1', courseObject.Benefits1, 'required|max:150', { className: 'alert alert-danger' })}
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label htmlFor="benefits2"><h6 className="text-primary mb-0 ml-1" >Course Benefits 2:</h6></Form.Label>
                                        <Form.Control id="benefits2" name="Benefits2" type="text" placeholder="Enter Course Benefits 2" value={courseObject.Benefits2} onChange={this.handleChange} />
                                        {this.validator.message('course benefits 2', courseObject.Benefits2, 'required|max:150', { className: 'alert alert-danger' })}
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label htmlFor="benefits3"><h6 className="text-primary mb-0 ml-1" >Course Benefits 3:</h6></Form.Label>
                                        <Form.Control id="benefits3" name="Benefits3" type="text" placeholder="Enter Course Benefits 3" value={courseObject.Benefits3} onChange={this.handleChange} />
                                        {this.validator.message('course benefits 3', courseObject.Benefits3, 'required|max:150', { className: 'alert alert-danger' })}
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label htmlFor="benefits4"><h6 className="text-primary mb-0 ml-1" >Course Benefits 4:</h6></Form.Label>
                                        <Form.Control id="benefits4" name="Benefits4" type="text" placeholder="Enter Course Benefits 4" value={courseObject.Benefits4} onChange={this.handleChange} />
                                        {this.validator.message('course benefits 4', courseObject.Benefits4, 'required|max:150', { className: 'alert alert-danger' })}
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label htmlFor="benefits5"><h6 className="text-primary mb-0 ml-1" >Course Benefits 5:</h6></Form.Label>
                                        <Form.Control id="benefits5" name="Benefits5" type="text" placeholder="Enter Course Benefits 5" value={courseObject.Benefits5} onChange={this.handleChange} />
                                        {this.validator.message('course benefits 5', courseObject.Benefits5, 'required|max:150', { className: 'alert alert-danger' })}
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label htmlFor="benefits6"><h6 className="text-primary mb-0 ml-1" >Course Benefits 6:</h6></Form.Label>
                                        <Form.Control id="benefits6" name="Benefits6" type="text" placeholder="Enter Course Benefits 6" value={courseObject.Benefits6} onChange={this.handleChange} />
                                        {this.validator.message('course benefits 6', courseObject.Benefits6, 'required|max:150', { className: 'alert alert-danger' })}
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label htmlFor="benefits7"><h6 className="text-primary mb-0 ml-1" >Course Benefits 7:</h6></Form.Label>
                                        <Form.Control id="benefits7" name="Benefits7" type="text" placeholder="Enter Course Benefits 7" value={courseObject.Benefits7} onChange={this.handleChange} />
                                        {this.validator.message('course benefits 7', courseObject.Benefits7, 'required|max:150', { className: 'alert alert-danger' })}
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label htmlFor="benefits8"><h6 className="text-primary mb-0 ml-1" >Course Benefits 8:</h6></Form.Label>
                                        <Form.Control id="benefits8" name="Benefits8" type="text" placeholder="Enter Course Benefits 8" value={courseObject.Benefits8} onChange={this.handleChange} />
                                        {this.validator.message('course benefits 8', courseObject.Benefits8, 'required|max:150', { className: 'alert alert-danger' })}
                                    </Form.Group>
                                </Col>
                                <Col sm="12" md="4">
                                    <Form.Group>
                                        <Form.Label htmlFor="benefits1fr"><h6 className="text-primary mb-0 ml-1" >Course Benefits 1 (French):</h6></Form.Label>
                                        <Form.Control id="benefits1fr" name="Benefits1Fr" type="text" placeholder="Enter Course Benefits 1" value={courseObject.Benefits1Fr} onChange={this.handleChange} />
                                        {this.validator.message('course benefits 1 french', courseObject.Benefits1Fr, 'required|max:150', { className: 'alert alert-danger' })}
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label htmlFor="benefits2fr"><h6 className="text-primary mb-0 ml-1" >Course Benefits 2 (French):</h6></Form.Label>
                                        <Form.Control id="benefits2fr" name="Benefits2Fr" type="text" placeholder="Enter Course Benefits 2" value={courseObject.Benefits2Fr} onChange={this.handleChange} />
                                        {this.validator.message('course benefits 2 french', courseObject.Benefits2Fr, 'required|max:150', { className: 'alert alert-danger' })}
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label htmlFor="benefits3fr"><h6 className="text-primary mb-0 ml-1" >Course Benefits 3 (French):</h6></Form.Label>
                                        <Form.Control id="benefits3fr" name="Benefits3Fr" type="text" placeholder="Enter Course Benefits 3" value={courseObject.Benefits3Fr} onChange={this.handleChange} />
                                        {this.validator.message('course benefits 3 french', courseObject.Benefits3Fr, 'required|max:150', { className: 'alert alert-danger' })}
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label htmlFor="benefits4fr"><h6 className="text-primary mb-0 ml-1" >Course Benefits 4 (French):</h6></Form.Label>
                                        <Form.Control id="benefits4fr" name="Benefits4Fr" type="text" placeholder="Enter Course Benefits 4" value={courseObject.Benefits4Fr} onChange={this.handleChange} />
                                        {this.validator.message('course benefits 4 french', courseObject.Benefits4Fr, 'required|max:150', { className: 'alert alert-danger' })}
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label htmlFor="benefits5fr"><h6 className="text-primary mb-0 ml-1" >Course Benefits 5 (French):</h6></Form.Label>
                                        <Form.Control id="benefits5fr" name="Benefits5Fr" type="text" placeholder="Enter Course Benefits 5" value={courseObject.Benefits5Fr} onChange={this.handleChange} />
                                        {this.validator.message('course benefits 5 french', courseObject.Benefits5Fr, 'required|max:150', { className: 'alert alert-danger' })}
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label htmlFor="benefits6fr"><h6 className="text-primary mb-0 ml-1" >Course Benefits 6 (French):</h6></Form.Label>
                                        <Form.Control id="benefits6fr" name="Benefits6Fr" type="text" placeholder="Enter Course Benefits 6" value={courseObject.Benefits6Fr} onChange={this.handleChange} />
                                        {this.validator.message('course benefits 6 french', courseObject.Benefits6Fr, 'required|max:150', { className: 'alert alert-danger' })}
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label htmlFor="benefits7fr"><h6 className="text-primary mb-0 ml-1" >Course Benefits 7 (French):</h6></Form.Label>
                                        <Form.Control id="benefits7fr" name="Benefits7Fr" type="text" placeholder="Enter Course Benefits 7" value={courseObject.Benefits7Fr} onChange={this.handleChange} />
                                        {this.validator.message('course benefits 7 french', courseObject.Benefits7Fr, 'required|max:150', { className: 'alert alert-danger' })}
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label htmlFor="benefits8fr"><h6 className="text-primary mb-0 ml-1" >Course Benefits 8 (French):</h6></Form.Label>
                                        <Form.Control id="benefits8fr" name="Benefits8Fr" type="text" placeholder="Enter Course Benefits 8" value={courseObject.Benefits8Fr} onChange={this.handleChange} />
                                        {this.validator.message('course benefits 8 french', courseObject.Benefits8Fr, 'required|max:150', { className: 'alert alert-danger' })}
                                    </Form.Group>
                                </Col>
                                <Col sm="12" md="4">
                                    <Form.Group>
                                        <Form.Label htmlFor="benefits1fa"><h6 className="text-primary mb-0 ml-1" >Course Benefits 1 (Farsi):</h6></Form.Label>
                                        <Form.Control id="benefits1fa" name="Benefits1Fa" type="text" dir="rtl" placeholder="مزیت 1" value={courseObject.Benefits1Fa} onChange={this.handleChange} />
                                        {this.validator.message('course benefits 1 farsi', courseObject.Benefits1Fa, 'required|max:150', { className: 'alert alert-danger' })}
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label htmlFor="benefits2fa"><h6 className="text-primary mb-0 ml-1" >Course Benefits 2 (Farsi):</h6></Form.Label>
                                        <Form.Control id="benefits2fa" name="Benefits2Fa" type="text" dir="rtl" placeholder="مزیت 2" value={courseObject.Benefits2Fa} onChange={this.handleChange} />
                                        {this.validator.message('course benefits 2 farsi', courseObject.Benefits2Fa, 'required|max:150', { className: 'alert alert-danger' })}
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label htmlFor="benefits3fa"><h6 className="text-primary mb-0 ml-1" >Course Benefits 3 (Farsi):</h6></Form.Label>
                                        <Form.Control id="benefits3fa" name="Benefits3Fa" type="text" dir="rtl" placeholder="مزیت 3" value={courseObject.Benefits3Fa} onChange={this.handleChange} />
                                        {this.validator.message('course benefits 3 farsi', courseObject.Benefits3Fa, 'required|max:150', { className: 'alert alert-danger' })}
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label htmlFor="benefits4fa"><h6 className="text-primary mb-0 ml-1" >Course Benefits 4 (Farsi):</h6></Form.Label>
                                        <Form.Control id="benefits4fa" name="Benefits4Fa" type="text" dir="rtl" placeholder="مزیت 4" value={courseObject.Benefits4Fa} onChange={this.handleChange} />
                                        {this.validator.message('course benefits 4 farsi', courseObject.Benefits4Fa, 'required|max:150', { className: 'alert alert-danger' })}
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label htmlFor="benefits5fa"><h6 className="text-primary mb-0 ml-1" >Course Benefits 5 (Farsi):</h6></Form.Label>
                                        <Form.Control id="benefits5fa" name="Benefits5Fa" type="text" dir="rtl" placeholder="مزیت 5" value={courseObject.Benefits5Fa} onChange={this.handleChange} />
                                        {this.validator.message('course benefits 5 farsi', courseObject.Benefits5Fa, 'required|max:150', { className: 'alert alert-danger' })}
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label htmlFor="benefits6fa"><h6 className="text-primary mb-0 ml-1" >Course Benefits 6 (Farsi):</h6></Form.Label>
                                        <Form.Control id="benefits6fa" name="Benefits6Fa" type="text" dir="rtl" placeholder="مزیت 6" value={courseObject.Benefits6Fa} onChange={this.handleChange} />
                                        {this.validator.message('course benefits 6 farsi', courseObject.Benefits6Fa, 'required|max:150', { className: 'alert alert-danger' })}
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label htmlFor="benefits7fa"><h6 className="text-primary mb-0 ml-1" >Course Benefits 7 (Farsi):</h6></Form.Label>
                                        <Form.Control id="benefits7fa" name="Benefits7Fa" type="text" dir="rtl" placeholder="مزیت 7" value={courseObject.Benefits7Fa} onChange={this.handleChange} />
                                        {this.validator.message('course benefits 7 farsi', courseObject.Benefits7Fa, 'required|max:150', { className: 'alert alert-danger' })}
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label htmlFor="benefits8fa"><h6 className="text-primary mb-0 ml-1" >Course Benefits 8 (Farsi):</h6></Form.Label>
                                        <Form.Control id="benefits8fa" name="Benefits8Fa" type="text" dir="rtl" placeholder="مزیت 8" value={courseObject.Benefits8Fa} onChange={this.handleChange} />
                                        {this.validator.message('course benefits 8 farsi', courseObject.Benefits8Fa, 'required|max:150', { className: 'alert alert-danger' })}
                                    </Form.Group>
                                </Col>

                            </Row>
                            <Button className="btn btn-sm float-right" onClick={this.handleSubmit} >Submit Course</Button>
                        </Form>
                    </Col >

                </Row>
            </Container>
        </div>);
    }
}

export default CourseRegistration; 