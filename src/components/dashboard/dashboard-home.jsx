import React, { Component } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { Container, Row, Col, Button } from 'reactstrap';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { getDatetime } from './../../utils/datetime';
// import FileUpload from './../fileUpload';
const FileUpload = React.lazy(() => import('../general/fileUpload'));

class DashboardHome extends Component {
    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator();
        this.state = {
            apiEndPoint: process.env.REACT_APP_APIEndPoint,
            homeObject: {
                HomeId: "",
                LatestTitle: "",
                LatestTitleFr: "",
                LatestTitleFa: "",
                LatestDescription: "",
                LatestDescriptionFr: "",
                LatestDescriptionFa: "",
                LatestVideo: "",
                WhoTitle: "",
                WhoTitleFr: "",
                WhoTitleFa: "",
                WhoVideo: "",
                StudentPanelTitle: "",
                StudentPanelTitleFr: "",
                StudentPanelTitleFa: "",
                StudentPanelVideo: "",
                TeacherPanelTitle: "",
                TeacherPanelTitleFr: "",
                TeacherPanelTitleFa: "",
                TeacherPanelVideo: "",
                ObjectiveTitle: "",
                ObjectiveTitleFr: "",
                ObjectiveTitleFa: "",
                ObjectiveDescription: "",
                ObjectiveDescriptionFr: "",
                ObjectiveDescriptionFa: "",
                Modifier: "Nasrin Daftarchi",
                ModificationDate: getDatetime(),
                IsDeleted: false,
            },

        }
    }

    getHome = async () => {
        await axios.get(this.state.apiEndPoint + 'Home/Get').then(response => {
            this.setState({ homeObject: response.data });
        });
    }

    componentDidMount() {
        this.getHome();
    }
    componentDidUpdate(prevProps, prevState) {

    }
    handleUploadLatestVideo = (fileName) => {
        let homeObject = { ...this.state.homeObject };
        if (fileName !== "") {
            homeObject.LatestVideo = fileName;
            this.setState({ homeObject });
        }
    }
    handleUploadWhoVideo = (fileName) => {
        let homeObject = { ...this.state.homeObject };
        if (fileName !== "") {
            homeObject.WhoVideo = fileName;
            this.setState({ homeObject });
        }
    }
    handleUploadStudentVideo = (fileName) => {
        let homeObject = { ...this.state.homeObject };
        if (fileName !== "") {
            homeObject.StudentPanelVideo = fileName;
            this.setState({ homeObject });
        }
    }
    handleUploadTeacherVideo = (fileName) => {
        let homeObject = { ...this.state.homeObject };
        if (fileName !== "") {
            homeObject.TeacherPanelVideo = fileName;
            this.setState({ homeObject });
        }
    }
    handleChange = e => {
        e.persist();
        let homeObject = { ...this.state.homeObject };
        homeObject[e.currentTarget.name] = e.target.value;
        this.setState({ homeObject });
    }
    setCurrentTime = () => {
        let homeObject = { ...this.state.homeObject };
        homeObject.ModificationDate = getDatetime();
        this.setState({ homeObject });
    }
    handleSubmit = () => {
        if (this.validator.allValid()) {
            this.setCurrentTime();
            axios.post(this.state.apiEndPoint + 'Home/Add', this.state.homeObject, {})
                .then(response => {
                    alert('You submitted the form and stuff!');
                    this.validator.hideMessages();
                    this.getHome();
                })
                .catch(function (error) {
                    alert('Something went wrong!');
                })
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }
    render() {
        const { LatestTitle,
            LatestTitleFr,
            LatestTitleFa,
            LatestDescription,
            LatestDescriptionFr,
            LatestDescriptionFa,
            LatestVideo,
            WhoTitle,
            WhoTitleFr,
            WhoTitleFa,
            WhoVideo,
            StudentPanelTitle,
            StudentPanelTitleFr,
            StudentPanelTitleFa,
            StudentPanelVideo,
            TeacherPanelTitle,
            TeacherPanelTitleFr,
            TeacherPanelTitleFa,
            TeacherPanelVideo,
            ObjectiveTitle,
            ObjectiveTitleFr,
            ObjectiveTitleFa,
            ObjectiveDescription,
            ObjectiveDescriptionFr,
            ObjectiveDescriptionFa, Modifier, ModificationDate } = this.state.homeObject;
        return (
            <div>
                <Container fluid >
                    <Row className="mb-2">
                        <Col xs="12" className="text-left text-dark p-0" >
                            <h3 className="text-primary"> Home</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-left border border-primary p-3 m-0 rounded">
                            <Row>
                                <Col xs="12" md="4">
                                    <Form.Group>
                                        <Form.Label><h6 className="text-primary mb-0 ml-1" >Modefier:</h6></Form.Label>
                                        <Form.Control type="text" name="Modifier" value={Modifier} onChange={this.handleChange} disabled />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label><h6 className="text-primary mb-0 ml-1" >Modefication Date:</h6></Form.Label>
                                        <Form.Control type="text" name="ModificationDate" value={ModificationDate} onChange={this.handleChange} disabled />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <hr />
                            <h4 className="text-success">Latest Video</h4>
                            <Row>
                                <Col xs="12" md="4">
                                    <Form.Group>
                                        <FileUpload postMethod={'Home/UploadFile'} title="Latest Video(mp4)" accept={['mp4']} specifiedFileName="NoName" onUpload={this.handleUploadLatestVideo} />
                                        {this.validator.message('main video', LatestVideo, 'required|min:1', { className: 'alert alert-danger' })}
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="12" md="4">
                                    <Form.Group>
                                        <Form.Label htmlFor="latestVideoEnglishTitle"><h6 className="text-primary mb-0 ml-1" >Latest Title (English): </h6></Form.Label>
                                        <Form.Control id="latestVideoEnglishTitle" name="LatestTitle" type="text" placeholder="English title" value={LatestTitle} onChange={this.handleChange} />
                                        {this.validator.message('latest title english', LatestTitle, 'required|max:199', { className: 'alert alert-danger' })}
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label htmlFor="latestVideoEnglishDes"><h6 className="text-primary mb-0 ml-1" >Article English Description:</h6></Form.Label>
                                        <Form.Control id="latestVideoEnglishDes" name="LatestDescription" as="textarea" className="wrap" placeholder="English Description" rows={15} value={LatestDescription} onChange={this.handleChange} />
                                        {this.validator.message('latest video english description', LatestDescription, 'required|max:3500', { className: 'alert alert-danger' })}
                                    </Form.Group>
                                </Col>
                                <Col xs="12" md="4">
                                    <Form.Group>
                                        <Form.Label htmlFor="latestVideoFrenchTitle"><h6 className="text-primary mb-0 ml-1" >Main Video French Title:</h6></Form.Label>
                                        <Form.Control id="latestVideoFrenchTitle" name="LatestTitleFr" type="text" placeholder="French Title" value={LatestTitleFr} onChange={this.handleChange} />
                                        {this.validator.message('latest video french', LatestTitleFr, 'required|max:199', { className: 'alert alert-danger' })}
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label htmlFor="latestVideoFrenchDes"><h6 className="text-primary mb-0 ml-1" >Article French Description:</h6></Form.Label>
                                        <Form.Control id="latestVideoFrenchDes" name="LatestDescriptionFr" as="textarea" className="wrap" placeholder="French Description" rows={15} value={LatestDescriptionFr} onChange={this.handleChange} />
                                        {this.validator.message('latest video french description', LatestDescriptionFr, 'required|max:3500', { className: 'alert alert-danger' })}
                                    </Form.Group>
                                </Col>
                                <Col xs="12" md="4">
                                    <Form.Group>
                                        <Form.Label htmlFor="latestVideoFarsiTitle" ><h6 className="text-primary mb-0 ml-1" >Main Video Farsi Title:</h6></Form.Label>
                                        <Form.Control id="latestVideoFarsiTitle" name="LatestTitleFa" type="text" dir="rtl" placeholder="عنوان فارسی" value={LatestTitleFa} onChange={this.handleChange} />
                                        {this.validator.message('latest video farsi', LatestTitleFa, 'required|max:199', { className: 'alert alert-danger' })}
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label htmlFor="latestVideoFarsiDes"><h6 className="text-primary mb-0 ml-1" >Article Farsi Description:</h6></Form.Label>
                                        <Form.Control id="latestVideoFarsiDes" name="LatestDescriptionFa" as="textarea" className="wrap" dir="rtl" placeholder="توضیحات فارسی" rows={15} value={LatestDescriptionFa} onChange={this.handleChange} />
                                        {this.validator.message('latest video Farsi description', LatestDescriptionFa, 'required|max:3500', { className: 'alert alert-danger' })}
                                    </Form.Group>
                                </Col>
                            </Row>
                            <hr />
                            <h4 className="text-success">Who We Are?</h4>
                            <Row>
                                <Col xs="12" md="4">
                                    <Form.Group>
                                        <FileUpload postMethod={'Home/UploadFile'} title="Who Video (mp4)" accept={['mp4']} specifiedFileName="NoName" onUpload={this.handleUploadWhoVideo} />
                                        {this.validator.message('video or image', WhoVideo, 'required|min:1', { className: 'alert alert-danger' })}
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="12" md="4">
                                    <Form.Group>
                                        <Form.Label htmlFor="whoVideoEnglishTitle"><h6 className="text-primary mb-0 ml-1" >Who Video English Title:</h6></Form.Label>
                                        <Form.Control id="whoVideoEnglishTitle" name="WhoTitle" type="text" placeholder="English Title" value={WhoTitle} onChange={this.handleChange} />
                                        {this.validator.message('who video english', WhoTitle, 'required|max:199', { className: 'alert alert-danger' })}
                                    </Form.Group>

                                </Col>
                                <Col xs="12" md="4">
                                    <Form.Group>
                                        <Form.Label htmlFor="whoVideoFrenchTitle"><h6 className="text-primary mb-0 ml-1" >Who Video French Title:</h6></Form.Label>
                                        <Form.Control id="whoVideoFrenchTitle" name="WhoTitleFr" type="text" placeholder="French Title" value={WhoTitleFr} onChange={this.handleChange} />
                                        {this.validator.message('who video french', WhoTitleFr, 'required|max:199', { className: 'alert alert-danger' })}
                                    </Form.Group>

                                </Col>
                                <Col xs="12" md="4">
                                    <Form.Group>
                                        <Form.Label htmlFor="whoVideoFarsiTitle"><h6 className="text-primary mb-0 ml-1" >Who Video Farsi Title:</h6></Form.Label>
                                        <Form.Control id="whoVideoFarsiTitle" name="WhoTitleFa" type="text" dir="rtl" placeholder="عنوان فارسی" value={WhoTitleFa} onChange={this.handleChange} />
                                        {this.validator.message('who video farsi', WhoTitleFa, 'required|max:199', { className: 'alert alert-danger' })}
                                    </Form.Group>
                                </Col>
                            </Row>
                            <hr />
                            <h4 className="text-success">Student Panle Video</h4>
                            <Row>
                                <Col xs="12" md="4">
                                    <Form.Group>
                                        <FileUpload postMethod={'Home/UploadFile'} title="Student Panel Video (mp4)" accept={['mp4']} specifiedFileName="NoName" onUpload={this.handleUploadStudentVideo} />
                                        {this.validator.message('video', StudentPanelVideo, 'required|min:1', { className: 'alert alert-danger' })}
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="12" md="4">
                                    <Form.Group>
                                        <Form.Label htmlFor="studentVideoEnglishTitle"><h6 className="text-primary mb-0 ml-1" >Who Video English Title:</h6></Form.Label>
                                        <Form.Control id="studentVideoEnglishTitle" name="StudentPanelTitle" type="text" placeholder="English Title" value={StudentPanelTitle} onChange={this.handleChange} />
                                        {this.validator.message('student video english', StudentPanelTitle, 'required|max:199', { className: 'alert alert-danger' })}
                                    </Form.Group>

                                </Col>
                                <Col xs="12" md="4">
                                    <Form.Group>
                                        <Form.Label htmlFor="studentVideoFrenchTitle"><h6 className="text-primary mb-0 ml-1" >Who Video French Title:</h6></Form.Label>
                                        <Form.Control id="studentVideoFrenchTitle" name="StudentPanelTitleFr" type="text" placeholder="French Title" value={StudentPanelTitleFr} onChange={this.handleChange} />
                                        {this.validator.message('student video french', StudentPanelTitleFr, 'required|max:199', { className: 'alert alert-danger' })}
                                    </Form.Group>

                                </Col>
                                <Col xs="12" md="4">
                                    <Form.Group>
                                        <Form.Label htmlFor="studentVideoFarsiTitle"><h6 className="text-primary mb-0 ml-1" >Who Video Farsi Title:</h6></Form.Label>
                                        <Form.Control id="studentVideoFarsiTitle" name="StudentPanelTitleFa" type="text" dir="rtl" placeholder="عنوان فارسی" value={StudentPanelTitleFa} onChange={this.handleChange} />
                                        {this.validator.message('student video farsi', StudentPanelTitleFa, 'required|max:199', { className: 'alert alert-danger' })}
                                    </Form.Group>
                                </Col>
                            </Row>
                            <hr />
                            <h4 className="text-success">Teacher Panle Video</h4>
                            <Row>
                                <Col xs="12" md="4">
                                    <Form.Group>
                                        <FileUpload postMethod={'Home/UploadFile'} title="Teacher Panel Video (mp4)" accept={['mp4']} specifiedFileName="NoName" onUpload={this.handleUploadTeacherVideo} />
                                        {this.validator.message('video', TeacherPanelVideo, 'required|min:1', { className: 'alert alert-danger' })}
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="12" md="4">
                                    <Form.Group>
                                        <Form.Label htmlFor="teacherVideoEnglishTitle"><h6 className="text-primary mb-0 ml-1" >Who Video English Title:</h6></Form.Label>
                                        <Form.Control id="teacherVideoEnglishTitle" name="TeacherPanelTitle" type="text" placeholder="English Title" value={TeacherPanelTitle} onChange={this.handleChange} />
                                        {this.validator.message('teacher video english', TeacherPanelTitle, 'required|max:199', { className: 'alert alert-danger' })}
                                    </Form.Group>

                                </Col>
                                <Col xs="12" md="4">
                                    <Form.Group>
                                        <Form.Label htmlFor="teacherVideoFrenchTitle"><h6 className="text-primary mb-0 ml-1" >Who Video French Title:</h6></Form.Label>
                                        <Form.Control id="teacherVideoFrenchTitle" name="TeacherPanelTitleFr" type="text" placeholder="French Title" value={TeacherPanelTitleFr} onChange={this.handleChange} />
                                        {this.validator.message('teacher video french', TeacherPanelTitleFr, 'required|max:199', { className: 'alert alert-danger' })}
                                    </Form.Group>

                                </Col>
                                <Col xs="12" md="4">
                                    <Form.Group>
                                        <Form.Label htmlFor="teacherVideoFarsiTitle"><h6 className="text-primary mb-0 ml-1" >Who Video Farsi Title:</h6></Form.Label>
                                        <Form.Control id="teacherVideoFarsiTitle" name="TeacherPanelTitleFa" type="text" dir="rtl" placeholder="عنوان فارسی" value={TeacherPanelTitleFa} onChange={this.handleChange} />
                                        {this.validator.message('teacher video farsi', TeacherPanelTitleFa, 'required|max:199', { className: 'alert alert-danger' })}
                                    </Form.Group>
                                </Col>
                            </Row>
                            <hr />
                            <h4 className="text-success">Objectives</h4>
                            <Row>
                                <Col xs="12" md="4">
                                    <Form.Group>
                                        <Form.Label htmlFor="objectiveEnglishTitle"><h6 className="text-primary mb-0 ml-1" >Objective English Title:</h6></Form.Label>
                                        <Form.Control id="objectiveEnglishTitle" name="ObjectiveTitle" type="text" placeholder="English Title" value={ObjectiveTitle} onChange={this.handleChange} />
                                        {this.validator.message('objective english', ObjectiveTitle, 'required|max:199', { className: 'alert alert-danger' })}
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label htmlFor="descriptionEnglishFirst"><h6 className="text-primary mb-0 ml-1" >Objective English Description First:</h6></Form.Label>
                                        <Form.Control id="descriptionEnglishFirst" name="ObjectiveDescription" as="textarea" className="wrap" placeholder="Objective Description English" rows={15} value={ObjectiveDescription} onChange={this.handleChange} />
                                        {this.validator.message('description english first', ObjectiveDescription, 'required|max:3500', { className: 'alert alert-danger' })}
                                    </Form.Group>
                                </Col>
                                <Col xs="12" md="4">
                                    <Form.Group>
                                        <Form.Label htmlFor="objectiveFrenchTitle"><h6 className="text-primary mb-0 ml-1" >Objective French Title:</h6></Form.Label>
                                        <Form.Control id="objectiveFrenchTitle" name="ObjectiveTitleFr" type="text" placeholder="French Title" value={ObjectiveTitleFr} onChange={this.handleChange} />
                                        {this.validator.message('objective french', ObjectiveTitleFr, 'required|max:199', { className: 'alert alert-danger' })}
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label htmlFor="descriptionFrenchFirst"><h6 className="text-primary mb-0 ml-1" >Objective French Description First:</h6></Form.Label>
                                        <Form.Control id="descriptionFrenchFirst" name="ObjectiveDescriptionFr" as="textarea" className="wrap" placeholder="Objective Description French" rows={15} value={ObjectiveDescriptionFr} onChange={this.handleChange} />
                                        {this.validator.message('description French first', ObjectiveDescriptionFr, 'required|max:3500', { className: 'alert alert-danger' })}
                                    </Form.Group>
                                </Col>
                                <Col xs="12" md="4">
                                    <Form.Group>
                                        <Form.Label htmlFor="objectiveFarsiTitle"><h6 className="text-primary mb-0 ml-1" >Objective Farsi Title:</h6></Form.Label>
                                        <Form.Control id="objectiveFarsiTitle" name="ObjectiveTitleFa" type="text" dir="rtl" placeholder="عنوان فارسی" value={ObjectiveTitleFa} onChange={this.handleChange} />
                                        {this.validator.message('objective farsi', ObjectiveTitleFa, 'required|max:199', { className: 'alert alert-danger' })}
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label htmlFor="descriptionFarsiFirst"><h6 className="text-primary mb-0 ml-1" >Objective Farsi Description First:</h6></Form.Label>
                                        <Form.Control id="descriptionFarsiFirst" name="ObjectiveDescriptionFa" dir="rtl" as="textarea" className="wrap" placeholder="توضیحات فارسی" rows={15} value={ObjectiveDescriptionFa} onChange={this.handleChange} />
                                        {this.validator.message('description Farsi first', ObjectiveDescriptionFa, 'required|max:3500', { className: 'alert alert-danger' })}
                                    </Form.Group>
                                    <Button className="btn btn-sm float-right" onClick={this.handleSubmit} >
                                        Submit home</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                </Container>
            </div>
        )
    }
}
export default DashboardHome;
