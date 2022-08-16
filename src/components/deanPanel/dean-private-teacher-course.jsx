import React, { Component, Suspense } from 'react';
import { Container, Row, Col, Button, Spinner } from 'reactstrap';
import axios from 'axios';
const TableContent = React.lazy(() => import('../general/table'));
class DeanPrivateTeacherCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apiEndPoint: process.env.REACT_APP_APIEndPoint,
            pageSize: 20,
            dataList: [],
            dataTitles: ["ID", 'Language', 'Teacher', 'Course', 'Modifier', 'Date', 'Not Active', 'Edit'],
            columnList: ["id", 'LanguageName', 'TeacherName', 'CourseName', 'Modifier', 'ModificationDate', 'IsDeleted'],
            filteredItem: "TeacherName",
            showTeacherCourseRegister: false,
            id: "",
            title: "",
            DeanPrivateTeacherCourseForm: null
        }
    }
    getTeacherCourse = async () => {
        const dataList = [];
        await axios.get(this.state.apiEndPoint + 'TeacherCourse/GetAllPrivate').then(response => {
            let md = response.data
            md.map((m, i) =>
                dataList.push({
                    id: i + 1,
                    LanguageName: m.LanguageName,
                    TeacherName: m.TeacherName,
                    CourseName: m.CourseName,
                    Modifier: m.Modifier,
                    ModificationDate: m.ModificationDate,
                    PrivateTeacherCourseId: m.PrivateTeacherCourseId,
                    IsDeleted: m.IsDeleted,
                    CourseId: m.CourseId,
                    TeacherId: m.TeacherId,
                }),
            );
            this.setState({ dataList });
        });
    }
    componentDidMount() {
        this.getTeacherCourse();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.id !== this.state.id) {
            this.getTeacherCourse();
            this.forceUpdate();
        }
    }
    onNewTeacherCourse = async () => {
        this.setState({ id: "" });
        this.setState({ title: 'Register New Teacher-Course' });
        this.setState({ showTeacherCourseRegister: true });
        const DeanPrivateTeacherCourseForm = await import('./forms/dean-private-teacher-course-form');
        this.setState({ DeanPrivateTeacherCourseForm: DeanPrivateTeacherCourseForm.default });
    }
    onEditTeacherCourse = async (list) => {
        this.setState({ id: list.PrivateTeacherCourseId });
        this.setState({ title: 'Edit Teacher Course' });
        this.setState({ showTeacherCourseRegister: true });
        const DeanPrivateTeacherCourseForm = await import('./forms/dean-private-teacher-course-form');
        this.setState({ DeanPrivateTeacherCourseForm: DeanPrivateTeacherCourseForm.default });
    }
    handleHide = () => {
        this.setState({ showTeacherCourseRegister: false });
        this.setState({ id: "" });
        this.setState({ DeanPrivateTeacherCourseForm: null });
    }
    render() {
        const { dataList, dataTitles, columnList, pageSize, filteredItem,
            id, title, showTeacherCourseRegister, DeanPrivateTeacherCourseForm } = this.state;
        return (<div>
            <Container fluid className="table">
                <Row className="mb-2">
                    <Col xs="12" className="text-left text-dark p-0" >
                        <h3 className="text-primary text-center font-weight-bold">Private Courses</h3>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col className="text-left m-0 p-0">
                        <Button className="btn btn-sm ml-2" onClick={this.onNewTeacherCourse} >Register New Teacher</Button>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col xs="12" className="text-left m-0 p-1">
                        <Suspense fallback={<Spinner color="success" />}>
                            <TableContent filter={filteredItem} dataList={dataList} dataTitles={dataTitles} columnList={columnList} onEdithandler={this.onEditTeacherCourse} pageSize={pageSize} />
                        </Suspense>
                    </Col>
                </Row>
            </Container>
            {DeanPrivateTeacherCourseForm &&
                <DeanPrivateTeacherCourseForm id={id} title={title} show={showTeacherCourseRegister} onHide={this.handleHide} />
            }

        </div>);
    }
}
export default DeanPrivateTeacherCourse;
