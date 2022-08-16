import React, { Component, Suspense } from 'react';
import { Container, Row, Col, Button, Spinner } from 'reactstrap';
import Form from 'react-bootstrap/Form';
import SimpleReactValidator from 'simple-react-validator';
import axios from 'axios';
import UserContext from '../../utils/user-context';
import { getDatetime } from './../../utils/datetime';
const MyDropdown = React.lazy(() => import('../general/dropdown'));
const TableContent = React.lazy(() => import('../general/table'));
class DeanCourseOverview extends Component {
    static contextType = UserContext;
    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator();
        this.state = {
            apiEndPoint: process.env.REACT_APP_APIEndPoint,
            dropdownList: [],
            courseOverviewObject: {
                OverviewId: "",
                Level: "",
                Title: "",
                ExpectedTime: "",
                CourseId: "",
                Modifier: "",
                ModificationDate: getDatetime(),
                IsDeleted: false,
            },
            pageSize: 20,
            dataList: [],
            dataTitles: ["ID", 'Course', 'Level', 'Title', 'Expected Time', 'Modifier', 'Date', 'Edit'],
            columnList: ['id', 'CourseName', "Level", 'Title', 'ExpectedTime', 'Modifier', 'ModificationDate'],
            filteredItem: "CourseName"
        }
    }
    getCourse = async () => {
        let dropdownList = [];
        await axios.get(this.state.apiEndPoint + 'Course/DisplayDropdown').then(response => {
            let md = response.data
            md.map(m =>
                dropdownList.push({
                    value: m.CourseId,
                    label: m.Title,
                }),
            );
            this.setState({ dropdownList });
        });
    }
    getData = async () => {
        const dataList = [];
        await axios.get(this.state.apiEndPoint + 'CourseOverview/GetAll').then(response => {
            let md = response.data
            md.map((m, i) =>
                dataList.push({
                    id: i + 1,
                    CourseName: m.CourseName,
                    Level: m.Level,
                    Title: m.Title,
                    ExpectedTime: m.ExpectedTime,
                    CourseId: m.CourseId,
                    Modifier: m.Modifier,
                    ModificationDate: m.ModificationDate,
                    IsDeleted: m.IsDeleted,
                    OverviewId: m.OverviewId,
                }),
            );
            this.setState({ dataList });
        });
    }
    componentDidMount() {
        this.onNewHandeler();
        this.getCourse();
        this.getData();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.courseOverviewObject !== this.state.courseOverviewObject) {
            // console.log("hello", this.state.courseOverviewObject)

        }
    }
    onNewHandeler() {
        const courseOverviewObject = { ...this.state.courseOverviewObject };
        courseOverviewObject.OverviewId = "";
        courseOverviewObject.Level = "";
        courseOverviewObject.Title = "";
        courseOverviewObject.ExpectedTime = "";
        courseOverviewObject.CourseId = "";
        courseOverviewObject.Modifier = this.context.Username;
        courseOverviewObject.ModificationDate = getDatetime();
        courseOverviewObject.IsDeleted = false;
        this.setState({ courseOverviewObject });
        this.validator.hideMessages();
    }
    onEdithandler = (list) => {
        let courseOverviewObject = { ...this.state.courseOverviewObject };
        courseOverviewObject.OverviewId = list.OverviewId;
        courseOverviewObject.Level = list.Level;
        courseOverviewObject.Title = list.Title;
        courseOverviewObject.ExpectedTime = list.ExpectedTime;
        courseOverviewObject.CourseId = list.CourseId;
        courseOverviewObject.Modifier = this.context.Username;
        courseOverviewObject.ModificationDate = getDatetime();
        courseOverviewObject.IsDeleted = list.IsDeleted;
        this.setState({ courseOverviewObject });
    }
    handleCourseSelect = (e) => {
        let courseId = e.target.value;
        if (courseId !== "0") {
            let courseOverviewObject = { ...this.state.courseOverviewObject };
            courseOverviewObject.CourseId = courseId;
            this.setState({ courseOverviewObject });
        }

    }
    handleChange = e => {
        let courseOverviewObject = { ...this.state.courseOverviewObject };
        courseOverviewObject[e.currentTarget.name] = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        this.setState({ courseOverviewObject });
    }
    setCurrentTime = () => {
        let courseOverviewObject = { ...this.state.courseOverviewObject };
        courseOverviewObject.ModificationDate = getDatetime();
        this.setState({ courseOverviewObject });
    }
    handleSubmit = () => {
        if (this.validator.allValid()) {
            this.setCurrentTime();
            axios.post(this.state.apiEndPoint + 'CourseOverview/Add', this.state.courseOverviewObject, {})
                .then(response => {
                    alert('You submitted the form and stuff!');
                    this.onNewHandeler();
                    this.validator.hideMessages();
                    this.getData();
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
        const { dataList, dataTitles, columnList, pageSize, filteredItem, dropdownList, courseOverviewObject } = this.state;
        return (<div>
            <Container fluid className="table">
                <Row className="mb-2">
                    <Col xs="12" className="text-left text-dark p-0" >
                        <h3 className="text-primary">Course Overview</h3>
                    </Col>
                </Row>
                <Row>
                    <Col sm="12" className="text-left m-0 p-1">
                        <TableContent filter={filteredItem} dataList={dataList} dataTitles={dataTitles} columnList={columnList} onEdithandler={this.onEdithandler} pageSize={pageSize} />
                    </Col>
                </Row>
                <Row className="text-left border border-primary p-3 mt-3 rounded">
                    <Col sm="12" md="6">
                        <Button onClick={() => this.onNewHandeler()} className="btn btn-sm mb-3 ">New Overview</Button>
                        <Suspense fallback={<Spinner color="success" />}>
                            <MyDropdown
                                label="Select Course"
                                dataList={dropdownList}
                                handleChange={this.handleCourseSelect}
                                display="Select Course..."
                                selectedValue={courseOverviewObject.CourseId}
                            />
                            {this.validator.message('course', courseOverviewObject.CourseId, 'required', { className: 'alert alert-danger' })}
                        </Suspense>
                        <Form.Group>
                            <Form.Label htmlFor="title"><h6 className="text-primary mb-0 ml-1" >Overview Title:</h6></Form.Label>
                            <Form.Control id="title" name="Title" type="text" placeholder="Enter Overview Title" value={courseOverviewObject.Title} onChange={this.handleChange} />
                            {this.validator.message('title', courseOverviewObject.Title, 'required|max:100', { className: 'alert alert-danger' })}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="level"><h6 className="text-primary mb-0 ml-1" >Overview Level:</h6></Form.Label>
                            <Form.Control id="level" name="Level" type="text" placeholder="Enter Overview Level" value={courseOverviewObject.Level} onChange={this.handleChange} />
                            {this.validator.message('level', courseOverviewObject.Level, 'required|max:100', { className: 'alert alert-danger' })}
                        </Form.Group>
                    </Col>
                    <Col sm="12" md="6">
                        <Form.Group>
                            <Form.Label htmlFor="expectedTime"><h6 className="text-primary mb-0 ml-1" >Overview ExpectedTime:</h6></Form.Label>
                            <Form.Control id="expectedTime" name="ExpectedTime" type="text" placeholder="Enter Overview Title" value={courseOverviewObject.ExpectedTime} onChange={this.handleChange} />
                            {this.validator.message('expected time', courseOverviewObject.ExpectedTime, 'required|max:100', { className: 'alert alert-danger' })}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="modifier"><h6 className="text-primary mb-0 ml-1" >Modefier:</h6></Form.Label>
                            <Form.Label id="modifier" className="border rounded border-secondary d-block p-2">{courseOverviewObject.Modifier}</Form.Label>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="modificationDate"><h6 className="text-primary mb-0 ml-1" >Modefication Date:</h6></Form.Label>
                            <Form.Label id="modificationDate" className="border rounded border-dark d-block p-2">{courseOverviewObject.ModificationDate}</Form.Label>
                        </Form.Group>
                        <Form.Group>
                            {courseOverviewObject.OverviewId !== "" && <h6 className="text-primary mb-0 ml-1" ><Form.Check inline name="IsDeleted" label="Is Deleted?" checked={courseOverviewObject.IsDeleted} onChange={this.handleChange} /></h6>}
                        </Form.Group>
                        <Button className="btn btn-sm float-right" onClick={this.handleSubmit} >Submit Overview</Button>
                    </Col>
                </Row>
            </Container>
        </div>);
    }
}
export default DeanCourseOverview;

