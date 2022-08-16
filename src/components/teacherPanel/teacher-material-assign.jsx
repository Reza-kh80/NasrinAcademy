import React, { Component, Suspense } from 'react';
import { Container, Row, Col, Button, Spinner } from 'reactstrap';
import axios from 'axios';
import UserContext from '../../utils/user-context';
const TableContent = React.lazy(() => import('../general/table'));
const MyDropdown = React.lazy(() => import('../general/dropdown'));
class TeacherMaterialAssign extends Component {
    static contextType = UserContext;
    constructor(props) {
        super(props);
        this.state = {
            apiEndPoint: process.env.REACT_APP_APIEndPoint,
            pageSize: 20,
            dataList: [],
            dataTitles: ["ID", 'Teacher', 'Student', 'Course', 'Title', 'Modifier', 'Date', 'Not Active', 'Edit'],
            columnList: ["id", 'TeacherName', 'StudentName', 'CourseName', 'MaterialTitle', 'Modifier', 'ModificationDate', 'IsDeleted'],
            filteredItem: "StudentName",
            showTermMaterialRegister: false,
            title: "",
            studentList: [],
            teacherCourseList: [],
            selectedTeacherCourseId: "",
            selectedStudentId: "",
            selectedMaterialId: "",
            TeacherMaterialAssignForm: null

        }
    }
    getTermMaterial = async (id) => {
        const dataList = [];
        await axios.get(this.state.apiEndPoint + `TermMaterial/GetAllPrivate?studentId=${id}`).then(response => {
            response.data.map((m, i) =>
                dataList.push({
                    id: i + 1,
                    TeacherName: m.TeacherName,
                    StudentName: m.StudentName,
                    CourseName: m.CourseName,
                    MaterialTitle: m.MaterialTitle,
                    Modifier: m.Modifier,
                    ModificationDate: m.ModificationDate,
                    IsDeleted: m.IsDeleted,
                    MaterialId: m.MaterialId,
                    StudentId: m.StudentId,
                }),
            );
            this.setState({ dataList });
        });
    }
    getTeacherCourse = async () => {
        const teacherCourseList = [];
        await axios.get(this.state.apiEndPoint + `TeacherCourse/DisplayPrivateDropdown?teacherId=${this.context.UserId}`).then(response => {
            response.data.map(m =>
                teacherCourseList.push({
                    value: m.PrivateTeacherCourseId,
                    label: `${m.TeacherName} (${m.CourseName})`,
                }),
            );
            this.setState({ teacherCourseList });
        });
    }
    getStudent = async (id) => {
        const studentList = [];
        await axios.get(this.state.apiEndPoint + `Student/DisplayPrivateDropdown?teacherCourseId=${id}`).then(response => {
            response.data.map(m =>
                studentList.push({
                    value: m.StudentId,
                    label: m.Name,
                }),
            );
            this.setState({ studentList });
        });
    }
    componentDidMount() {
        this.getTeacherCourse();
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.show !== prevState.show) {
            this.forceUpdate()
        }
    }
    onNewTermMaterial = async () => {
        this.setState({ selectedMaterialId: "" });
        this.setState({ title: 'New Term Material' });
        this.setState({ showTermMaterialRegister: true });
        const TeacherMaterialAssignForm = await import('./forms/teacher-material-assign-form');
        this.setState({ TeacherMaterialAssignForm: TeacherMaterialAssignForm.default });
    }
    onEditTermMaterial = async (list) => {
        this.setState({ studentId: list.StudentId });
        this.setState({ selectedMaterialId: list.MaterialId });
        this.setState({ title: 'Edit Term Material' });
        this.setState({ showTermMaterialRegister: true });
        const TeacherMaterialAssignForm = await import('./forms/teacher-material-assign-form');
        this.setState({ TeacherMaterialAssignForm: TeacherMaterialAssignForm.default });

    }
    handleTeacherCourseSelect = (e) => {
        let selectedTeacherCourseId = e.target.value
        if (selectedTeacherCourseId !== "") {
            this.getStudent(selectedTeacherCourseId)
        }
        else {
            // this.setState({ show: false })
        }
        this.setState({ selectedTeacherCourseId })
    }
    handleStudentSelect = (e) => {
        let selectedStudentId = e.target.value
        if (selectedStudentId !== "") {
            this.getTermMaterial(selectedStudentId)
        }
        else {
        }
        this.setState({ selectedStudentId })
    }
    handleHide = () => {
        this.setState({ showTermMaterialRegister: false });
        this.getTermMaterial(this.state.selectedStudentId);
        this.setState({ selectedStudentId: "" });
        this.setState({ selectedMaterialId: "" });
        this.setState({ TeacherMaterialAssignForm: null });
    }
    render() {
        const { dataList, dataTitles, columnList, pageSize, filteredItem,
            title, showTermMaterialRegister, studentList, teacherCourseList, selectedMaterialId, selectedTeacherCourseId, selectedStudentId, TeacherMaterialAssignForm } = this.state;
        return (<div>
            <Container fluid className="table">
                <Row className="mb-2">
                    <Col xs="12" className="text-left text-dark p-0" >
                        <h3 className="text-primary text-center font-weight-bold">Assign Private Materials</h3>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col className="text-left m-0 p-0">
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col xs="12" md="6" lg="4" className="text-left m-0 p-1">
                        <MyDropdown
                            label="Select Course"
                            display="Select ..."
                            dataList={teacherCourseList}
                            handleChange={this.handleTeacherCourseSelect}
                            name=""
                            selectedValue={selectedTeacherCourseId}
                            htmlFor="term"
                            // onBlur={simpleValselectedMaterialIdator.current.showMessageFor('term')}
                            width="w-25"
                        />
                        {selectedTeacherCourseId !== '' &&
                            <div>
                                <MyDropdown
                                    label="Select Student"
                                    display="Select ..."
                                    dataList={studentList}
                                    handleChange={this.handleStudentSelect}
                                    name=""
                                    selectedValue={selectedStudentId}
                                    htmlFor="term"
                                    // onBlur={simpleValselectedMaterialIdator.current.showMessageFor('term')}
                                    width="w-25"
                                />
                            </div>
                        }

                    </Col>
                </Row>
                <Row>
                    <Col className="text-left m-0 p-1">
                        {selectedStudentId !== '' && selectedTeacherCourseId !== '' &&
                            <div>
                                <Button className="btn btn-sm mb-3" onClick={this.onNewTermMaterial} >Register New TermMaterial</Button>
                                <Suspense fallback={<Spinner color="success" />}>
                                    <TableContent filter={filteredItem} dataList={dataList} dataTitles={dataTitles} columnList={columnList} onEdithandler={this.onEditTermMaterial} pageSize={pageSize} />
                                </Suspense>
                            </div>
                        }
                    </Col>
                </Row>
            </Container>
            {TeacherMaterialAssignForm &&
                <TeacherMaterialAssignForm studentId={selectedStudentId} materialId={selectedMaterialId} title={title} show={showTermMaterialRegister} onHide={this.handleHide} />
            }
        </div>);
    }
}
export default TeacherMaterialAssign;



