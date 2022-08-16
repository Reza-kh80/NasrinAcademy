import React, { Component, Suspense } from 'react';
import { Container, Row, Col, Button, Spinner } from 'reactstrap';
import axios from 'axios';
import UserContext from '../../utils/user-context';
const TableContent = React.lazy(() => import('../general/table'));
const MyDropdown = React.lazy(() => import('../general/dropdown'));
class TeacherResultAssignPublic extends Component {
    static contextType = UserContext;
    constructor(props) {
        super(props);
        this.state = {
            apiEndPoint: process.env.REACT_APP_APIEndPoint,
            pageSize: 20,
            dataList: [],
            dataTitles: ["ID", 'Teacher', 'Student', 'Course', 'Result Date', 'Modifier', 'Date', 'Not Active', 'Edit'],
            columnList: ["id", 'TeacherName', 'StudentName', 'CourseName', 'ResultDate', 'Modifier', 'ModificationDate', 'IsDeleted'],
            filteredItem: "StudentName",
            showTermResultRegister: false,
            title: "",
            studentList: [],
            termList: [],
            selectedTermId: "",
            selectedStudentId: "",
            selectedResultId: "",
            TeacherResultAssignPublicForm: null

        }
    }
    getTermResult = async (id) => {
        const dataList = [];
        await axios.get(this.state.apiEndPoint + `TermResult/GetAllPublic?studentId=${id}`).then(response => {
            response.data.map((m, i) =>
                dataList.push({
                    id: i + 1,
                    TeacherName: m.TeacherName,
                    StudentName: m.StudentName,
                    CourseName: m.CourseName,
                    ResultDate: m.ResultDate,
                    Modifier: m.Modifier,
                    ModificationDate: m.ModificationDate,
                    IsDeleted: m.IsDeleted,
                    PublicTermResultId: m.PublicTermResultId,
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
    onNewTermResult = async () => {
        this.setState({ selectedResultId: "" });
        this.setState({ title: 'New Term Result' });
        this.setState({ showTermResultRegister: true });
        const TeacherResultAssignPublicForm = await import('./forms/teacher-result-assign-public-form');
        this.setState({ TeacherResultAssignPublicForm: TeacherResultAssignPublicForm.default });
    }
    onEditTermResult = async (list) => {
        this.setState({ studentId: list.StudentId });
        this.setState({ selectedResultId: list.PublicTermResultId });
        this.setState({ title: 'Edit Term Result' });
        this.setState({ showTermResultRegister: true });
        const TeacherResultAssignPublicForm = await import('./forms/teacher-result-assign-public-form');
        this.setState({ TeacherResultAssignPublicForm: TeacherResultAssignPublicForm.default });
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
            this.getTermResult(selectedStudentId)
        }
        else {
        }
        this.setState({ selectedStudentId })
    }
    handleHide = () => {
        this.setState({ showTermResultRegister: false });
        this.getTermResult(this.state.selectedStudentId);
        this.setState({ selectedStudentId: "" });
        this.setState({ selectedResultId: "" });
        this.setState({ TeacherResultAssignPublicForm: null });
    }
    render() {
        const { dataList, dataTitles, columnList, pageSize, filteredItem,
            title, showTermResultRegister, studentList, termList, selectedResultId, selectedTermId, selectedStudentId, TeacherResultAssignPublicForm } = this.state;
        return (<div>
            <Container fluid className="table">
                <Row className="mb-2">
                    <Col xs="12" className="text-left text-dark p-0" >
                        <h3 className="text-primary text-center font-weight-bold">Assign Public Results</h3>
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
                            // onBlur={simpleValselectedResultIdator.current.showMessageFor('term')}
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
                                    // onBlur={simpleValselectedResultIdator.current.showMessageFor('term')}
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
                                <Button className="btn btn-sm mb-3" onClick={this.onNewTermResult} >Register New TermResult</Button>
                                <Suspense fallback={<Spinner color="success" />}>
                                    <TableContent filter={filteredItem} dataList={dataList} dataTitles={dataTitles} columnList={columnList} onEdithandler={this.onEditTermResult} pageSize={pageSize} />
                                </Suspense>
                            </div>
                        }
                    </Col>
                </Row>
            </Container>
            {TeacherResultAssignPublicForm &&
                <TeacherResultAssignPublicForm studentId={selectedStudentId} resultId={selectedResultId} title={title} show={showTermResultRegister} onHide={this.handleHide} />
            }
        </div>);
    }
}
export default TeacherResultAssignPublic;




