import React, { Component, Suspense } from 'react';
import { Container, Row, Col, Button, Spinner } from 'reactstrap';
import axios from 'axios';
const TableContent = React.lazy(() => import('../general/table'));
class DeanPublicTeacherCourse extends Component {
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
            DeanPublicTeacherCourseForm: null
        }
    }
    getTeacherCourse = async () => {
        const dataList = [];
        await axios.get(this.state.apiEndPoint + 'TeacherCourse/DisplayAllPublic').then(response => {
            let md = response.data
            md.map((m, i) =>
                dataList.push({
                    id: i + 1,
                    LanguageName: m.LanguageName,
                    TeacherName: m.TeacherName,
                    CourseName: m.CourseName,
                    Modifier: m.Modifier,
                    ModificationDate: m.ModificationDate,
                    PublicTeacherCourseId: m.PublicTeacherCourseId,
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
            this.forceUpdate();
            this.getTeacherCourse();
        }
    }
    onNewTeacherCourse = async () => {
        this.setState({ id: "" });
        this.setState({ title: 'Register New Teacher-Course' });
        this.setState({ showTeacherCourseRegister: true });
        const DeanPublicTeacherCourseForm = await import('./forms/dean-public-teacher-course-form');
        this.setState({ DeanPublicTeacherCourseForm: DeanPublicTeacherCourseForm.default });
    }
    onEditTeacherCourse = async (list) => {
        this.setState({ id: list.PublicTeacherCourseId });
        this.setState({ title: 'Edit Teacher Course' });
        this.setState({ showTeacherCourseRegister: true });
        const DeanPublicTeacherCourseForm = await import('./forms/dean-public-teacher-course-form');
        this.setState({ DeanPublicTeacherCourseForm: DeanPublicTeacherCourseForm.default });
    }
    handleHide = () => {
        this.setState({ showTeacherCourseRegister: false });
        this.setState({ id: "" });
        this.setState({ DeanPublicTeacherCourseForm: null });
    }
    render() {
        const { dataList, dataTitles, columnList, pageSize, filteredItem,
            id, title, showTeacherCourseRegister, DeanPublicTeacherCourseForm } = this.state;
        return (<div>
            <Container fluid className="table">
                <Row className="mb-2">
                    <Col xs="12" className="text-left text-dark p-0" >
                        <h3 className="text-primary text-center font-weight-bold">Public Courses</h3>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col className="text-left m-0 p-0">
                        <Button className="btn btn-sm ml-2" onClick={this.onNewTeacherCourse} >Register New Teacher - Course</Button>
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
            {DeanPublicTeacherCourseForm &&
                <DeanPublicTeacherCourseForm id={id} title={title} show={showTeacherCourseRegister} onHide={this.handleHide} />
            }
        </div>);
    }
}
export default DeanPublicTeacherCourse;
