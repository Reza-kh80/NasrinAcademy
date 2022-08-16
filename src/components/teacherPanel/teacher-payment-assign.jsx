import React, { Component, Suspense } from 'react';
import { Container, Row, Col, Button, Spinner } from 'reactstrap';
import axios from 'axios';
import UserContext from '../../utils/user-context';
const TableContent = React.lazy(() => import('../general/table'));
const MyDropdown = React.lazy(() => import('../general/dropdown'));
class TeacherPaymentAssign extends Component {
    static contextType = UserContext;
    constructor(props) {
        super(props);
        this.state = {
            apiEndPoint: process.env.REACT_APP_APIEndPoint,
            pageSize: 20,
            dataList: [],
            dataTitles: ["ID", 'Teacher', 'Course', 'Amount', 'Issued Date', 'Due date', 'Paid ?', 'Paid Date', 'Edit Payment'],
            columnList: ["id", 'TeacherName', 'CourseName', 'Amount', 'IssueDate', 'DueDate', 'IsPaid', 'PaidDate'],
            filteredItem: "StudentName",
            showTermPaymentRegister: false,
            title: "",
            studentList: [],
            teacherCourseList: [],
            selectedTeacherCourseId: "",
            selectedStudentId: "",
            selectedPaymentId: "",
            TeacherPaymentAssignForm: null

        }
    }
    getTermPayment = async (id) => {
        const dataList = [];
        await axios.get(this.state.apiEndPoint + `TermPayment/GetAllPrivate?studentId=${id}`).then(response => {
            response.data.map((m, i) =>
                dataList.push({
                    id: i + 1,
                    PrivateTermPaymentId: m.PrivateTermPaymentId,
                    TeacherName: m.TeacherName,
                    StudentName: m.StudentName,
                    CourseName: m.CourseName,
                    Amount: m.Amount,
                    IssueDate: m.IssueDate,
                    DueDate: m.DueDate,
                    IsPaid: m.IsPaid,
                    PaidDate: m.PaidDate,
                    Modifier: m.Modifier,
                    IsDeleted: m.IsDeleted,
                    StudentId: m.StudentId,
                    ReferenceId: m.ReferenceId,
                    Payment: m.Payment,
                    Authority: m.Authority,
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
    onNewTermPayment = async () => {
        this.setState({ selectedPaymentId: "" });
        this.setState({ title: 'New Term Payment' });
        this.setState({ showTermPaymentRegister: true });
        const TeacherPaymentAssignForm = await import('./forms/teacher-payment-assign-form');
        this.setState({ TeacherPaymentAssignForm: TeacherPaymentAssignForm.default });
    }
    onEditTermPayment = async (list) => {
        this.setState({ studentId: list.StudentId });
        this.setState({ selectedPaymentId: list.PrivateTermPaymentId });
        this.setState({ title: 'Edit Term Payment' });
        this.setState({ showTermPaymentRegister: true });
        const TeacherPaymentAssignForm = await import('./forms/teacher-payment-assign-form');
        this.setState({ TeacherPaymentAssignForm: TeacherPaymentAssignForm.default });
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
            this.getTermPayment(selectedStudentId)
        }
        else {
        }
        this.setState({ selectedStudentId })
    }
    handleHide = () => {
        this.setState({ showTermPaymentRegister: false });
        this.getTermPayment(this.state.selectedStudentId);
        this.setState({ selectedStudentId: "" });
        this.setState({ selectedPaymentId: "" });
        this.setState({ TeacherPaymentAssignForm: null });
    }
    render() {
        const { dataList, dataTitles, columnList, pageSize, filteredItem,
            title, showTermPaymentRegister, studentList, teacherCourseList, selectedPaymentId, selectedTeacherCourseId, selectedStudentId,
            TeacherPaymentAssignForm } = this.state;
        return (<div>
            <Container fluid className="table">
                <Row className="mb-2">
                    <Col xs="12" className="text-left text-dark p-0" >
                        <h3 className="text-primary text-center font-weight-bold">Assign Private Payments</h3>
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
                            // onBlur={simpleValselectedPaymentIdator.current.showMessageFor('term')}
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
                                    // onBlur={simpleValselectedPaymentIdator.current.showMessageFor('term')}
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
                                <Button className="btn btn-sm mb-3" onClick={this.onNewTermPayment} >Register New TermPayment</Button>
                                <Suspense fallback={<Spinner color="success" />}>
                                    <TableContent filter={filteredItem} dataList={dataList} dataTitles={dataTitles} columnList={columnList} onEdithandler={this.onEditTermPayment} pageSize={pageSize} />
                                </Suspense>
                            </div>
                        }
                    </Col>
                </Row>
            </Container>
            {TeacherPaymentAssignForm &&
                <TeacherPaymentAssignForm studentId={selectedStudentId} paymentId={selectedPaymentId} title={title} show={showTermPaymentRegister} onHide={this.handleHide} />
            }
        </div>);
    }
}
export default TeacherPaymentAssign;





