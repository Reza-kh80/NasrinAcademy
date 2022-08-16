import React, { Component, Suspense } from 'react';
import { Container, Row, Col, Button, Spinner } from 'reactstrap';
import axios from 'axios';
import UserContext from '../../utils/user-context';
const TableContent = React.lazy(() => import('../general/table'));
const MyDropdown = React.lazy(() => import('../general/dropdown'));
class TeacherNoticeAssignPublic extends Component {
    static contextType = UserContext;
    constructor(props) {
        super(props);
        this.state = {
            apiEndPoint: process.env.REACT_APP_APIEndPoint,
            pageSize: 20,
            dataList: [],
            dataTitles: ["ID", 'Teacher', 'Student', 'Course', 'Title', 'Modifier', 'Date', 'Not Active', 'Edit'],
            columnList: ["id", 'TeacherName', 'StudentName', 'CourseName', 'Title', 'Modifier', 'ModificationDate', 'IsDeleted'],
            filteredItem: "StudentName",
            showTermNoticeRegister: false,
            title: "",
            studentList: [],
            termList: [],
            selectedTermId: "",
            selectedStudentId: "",
            selectedNoticeId: "",
            TeacherNoticeAssignPublicForm: null

        }
    }
    getTermNotice = async (id) => {
        const dataList = [];
        await axios.get(this.state.apiEndPoint + `TermNotice/GetAllPublic?studentId=${id}`).then(response => {
            response.data.map((m, i) =>
                dataList.push({
                    id: i + 1,
                    TeacherName: m.TeacherName,
                    StudentName: m.StudentName,
                    CourseName: m.CourseName,
                    Title: m.Title,
                    Modifier: m.Modifier,
                    ModificationDate: m.ModificationDate,
                    IsDeleted: m.IsDeleted,
                    PublicTermNoticeId: m.PublicTermNoticeId,
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
    onNewTermNotice = async () => {
        this.setState({ selectedNoticeId: "" });
        this.setState({ title: 'New Term Notice' });
        this.setState({ showTermNoticeRegister: true });
        const TeacherNoticeAssignPublicForm = await import('./forms/teacher-notice-assign-public-form');
        this.setState({ TeacherNoticeAssignPublicForm: TeacherNoticeAssignPublicForm.default });
    }
    onEditTermNotice = async (list) => {
        this.setState({ studentId: list.StudentId });
        this.setState({ selectedNoticeId: list.PublicTermNoticeId });
        this.setState({ title: 'Edit Term Notice' });
        this.setState({ showTermNoticeRegister: true });
        const TeacherNoticeAssignPublicForm = await import('./forms/teacher-notice-assign-public-form');
        this.setState({ TeacherNoticeAssignPublicForm: TeacherNoticeAssignPublicForm.default });
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
            this.getTermNotice(selectedStudentId)
        }
        else {
        }
        this.setState({ selectedStudentId })
    }
    handleHide = () => {
        this.setState({ showTermNoticeRegister: false });
        this.getTermNotice(this.state.selectedStudentId);
        this.setState({ selectedStudentId: "" });
        this.setState({ selectedNoticeId: "" });
        this.setState({ TeacherNoticeAssignPublicForm: null });
    }
    render() {
        const { dataList, dataTitles, columnList, pageSize, filteredItem,
            title, showTermNoticeRegister, studentList, termList, selectedNoticeId, selectedTermId, selectedStudentId, TeacherNoticeAssignPublicForm } = this.state;
        return (<div>
            <Container fluid className="table">
                <Row className="mb-2">
                    <Col xs="12" className="text-left text-dark p-0" >
                        <h3 className="text-primary text-center font-weight-bold">Assign Public Notices</h3>
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
                            // onBlur={simpleValselectedNoticeIdator.current.showMessageFor('term')}
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
                                    // onBlur={simpleValselectedNoticeIdator.current.showMessageFor('term')}
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
                                <Button className="btn btn-sm mb-3" onClick={this.onNewTermNotice} >Register New TermNotice</Button>
                                <Suspense fallback={<Spinner color="success" />}>
                                    <TableContent filter={filteredItem} dataList={dataList} dataTitles={dataTitles} columnList={columnList} onEdithandler={this.onEditTermNotice} pageSize={pageSize} />
                                </Suspense>
                            </div>
                        }
                    </Col>
                </Row>
            </Container>
            {TeacherNoticeAssignPublicForm &&
                <TeacherNoticeAssignPublicForm studentId={selectedStudentId} noticeId={selectedNoticeId} title={title} show={showTermNoticeRegister} onHide={this.handleHide} />
            }
        </div>);
    }
}
export default TeacherNoticeAssignPublic;




