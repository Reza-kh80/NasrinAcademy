import React, { Component, Suspense } from 'react';
import { Container, Row, Col, Button, Spinner } from 'reactstrap';
import axios from 'axios';
import UserContext from '../../utils/user-context';
const TableContent = React.lazy(() => import('../general/table'));
const MyDropdown = React.lazy(() => import('../general/dropdown'));
class TeacherAssignmentAssignPublic extends Component {
    static contextType = UserContext;
    constructor(props) {
        super(props);
        this.state = {
            apiEndPoint: process.env.REACT_APP_APIEndPoint,
            pageSize: 20,
            dataList: [],
            dataTitles: ["ID", 'Teacher', 'Student', 'Course', 'Title', 'Answer', 'Solution', 'Grade', 'Modifier', 'Date', 'Not Active', 'Edit'],
            columnList: ["id", 'TeacherName', 'StudentName', 'CourseName', 'AssignmentTitle', 'Answer', 'Solution', 'Grade', 'Modifier', 'ModificationDate', 'IsDeleted'],
            filteredItem: "StudentName",
            showTermAssignmentRegister: false,
            title: "",
            studentList: [],
            termList: [],
            selectedTermId: "",
            selectedStudentId: "",
            selectedAssignmentId: "",
            TeacherAssignmentAssignForm: null
        }
    }
    getTermAssignment = async (id) => {
        const dataList = [];
        await axios.get(this.state.apiEndPoint + `TermAssignment/GetAllPublic?studentId=${id}`).then(response => {
            let md = response.data
            md.map((m, i) =>
                dataList.push({
                    id: i + 1,
                    TeacherName: m.TeacherName,
                    StudentName: m.StudentName,
                    CourseName: m.CourseName,
                    AssignmentTitle: m.AssignmentTitle,
                    Answer: m.Answer,
                    Solution: m.Solution,
                    Grade: m.Grade,
                    Modifier: m.Modifier,
                    ModificationDate: m.ModificationDate,
                    IsDeleted: m.IsDeleted,
                    AssignmentId: m.AssignmentId,
                    StudentId: m.StudentId,
                }),
            );
            this.setState({ dataList });
        });
    }
    getTerm = async () => {
        const termList = [];
        await axios.get(this.state.apiEndPoint + `Term/PublicTermDropdownByTeacher?teacherId=${this.context.UserId}`).then(response => {
            response.data.map(m =>
                termList.push({
                    value: m.PublicTermId,
                    label: `${m.TeacherName}/${m.CourseName}/${m.Start}`,
                }),
            );
            this.setState({ termList });
        });
    }
    getStudent = async (id) => {
        const studentList = [];
        await axios.get(this.state.apiEndPoint + `Student/DisplayPublicDropdown?termId=${id}`).then(response => {
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
        this.getTerm();
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.show !== prevState.show) {
            this.forceUpdate()
        }
    }
    onNewTermAssignment = async () => {
        this.setState({ selectedAssignmentId: "" });
        this.setState({ title: 'New Term Assignment' });
        this.setState({ showTermAssignmentRegister: true });
        const TeacherAssignmentAssignForm = await import('./forms/teacher-assignment-assign-public-form');
        this.setState({ TeacherAssignmentAssignForm: TeacherAssignmentAssignForm.default });
    }
    onEditTermAssignment = async (list) => {
        this.setState({ studentId: list.StudentId });
        this.setState({ selectedAssignmentId: list.AssignmentId });
        this.setState({ title: 'Edit Term Assignment' });
        this.setState({ showTermAssignmentRegister: true });
        const TeacherAssignmentAssignForm = await import('./forms/teacher-assignment-assign-public-form');
        this.setState({ TeacherAssignmentAssignForm: TeacherAssignmentAssignForm.default });

    }
    handleTermSelect = (e) => {
        let selectedTermId = e.target.value
        if (selectedTermId !== "") {
            this.getStudent(selectedTermId)
        }
        else {
            // this.setState({ show: false })
        }
        this.setState({ selectedTermId })
    }
    handleStudentSelect = (e) => {
        let selectedStudentId = e.target.value
        if (selectedStudentId !== "") {
            this.getTermAssignment(selectedStudentId)
        }
        else {
        }
        this.setState({ selectedStudentId })
    }
    handleHide = () => {
        this.setState({ showTermAssignmentRegister: false })
        this.getTermAssignment(this.state.selectedStudentId);
        this.setState({ selectedStudentId: "" })
        this.setState({ selectedAssignmentId: "" })
    }
    render() {
        const { dataList, dataTitles, columnList, pageSize, filteredItem,
            title, showTermAssignmentRegister, studentList, termList, selectedAssignmentId, selectedTermId, selectedStudentId, TeacherAssignmentAssignForm } = this.state;
        return (<div>
            <Container fluid className="table">
                <Row className="mb-2">
                    <Col xs="12" className="text-left text-dark p-0" >
                        <h3 className="text-primary text-center font-weight-bold">Assign Public Assignments</h3>
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
                            dataList={termList}
                            handleChange={this.handleTermSelect}
                            name=""
                            selectedValue={selectedTermId}
                            htmlFor="term"
                            // onBlur={simpleValselectedAssignmentIdator.current.showMessageFor('term')}
                            width="w-25"
                        />
                        {selectedTermId !== '' &&
                            <div>
                                <MyDropdown
                                    label="Select Student"
                                    display="Select ..."
                                    dataList={studentList}
                                    handleChange={this.handleStudentSelect}
                                    name=""
                                    selectedValue={selectedStudentId}
                                    htmlFor="term"
                                    // onBlur={simpleValselectedAssignmentIdator.current.showMessageFor('term')}
                                    width="w-25"
                                />
                            </div>
                        }

                    </Col>
                </Row>
                <Row>
                    <Col className="text-left m-0 p-1">
                        {selectedStudentId !== '' && selectedTermId !== '' &&
                            <div>
                                <Button className="btn btn-sm mb-3" onClick={this.onNewTermAssignment} >Register New TermAssignment</Button>
                                <Suspense fallback={<Spinner color="success" />}>
                                    <TableContent filter={filteredItem} dataList={dataList} dataTitles={dataTitles} columnList={columnList} onEdithandler={this.onEditTermAssignment} pageSize={pageSize} />
                                </Suspense>
                            </div>
                        }
                    </Col>
                </Row>
            </Container>
            {TeacherAssignmentAssignForm &&
                <TeacherAssignmentAssignForm studentId={selectedStudentId} assignmentId={selectedAssignmentId} title={title} show={showTermAssignmentRegister} onHide={this.handleHide} />
            }
        </div>);
    }
}
export default TeacherAssignmentAssignPublic;
