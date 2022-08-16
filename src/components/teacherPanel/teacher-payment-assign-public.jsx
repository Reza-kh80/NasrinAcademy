import React, { Component, Suspense } from 'react';
import { Container, Row, Col, Button, Spinner } from 'reactstrap';
import axios from 'axios';
import UserContext from '../../utils/user-context';
const TableContent = React.lazy(() => import('../general/table'));
const MyDropdown = React.lazy(() => import('../general/dropdown'));
class TeacherPaymentAssignPublic extends Component {
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
            termList: [],
            selectedTermId: "",
            selectedStudentId: "",
            selectedPaymentId: "",
            TeacherPaymentAssignPublicForm: null

        }
    }
    getTermPayment = async (id) => {
        const dataList = [];
        await axios.get(this.state.apiEndPoint + `TermPayment/GetAllPublic?studentId=${id}`).then(response => {
            response.data.map((m, i) =>
                dataList.push({
                    id: i + 1,
                    PublicTermPaymentId: m.PublicTermPaymentId,
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
    onNewTermPayment = async () => {
        this.setState({ selectedPaymentId: "" });
        this.setState({ title: 'New Term Payment' });
        this.setState({ showTermPaymentRegister: true });
        const TeacherPaymentAssignPublicForm = await import('./forms/teacher-payment-assign-public-form');
        this.setState({ TeacherPaymentAssignPublicForm: TeacherPaymentAssignPublicForm.default });
    }
    onEditTermPayment = async (list) => {
        this.setState({ studentId: list.StudentId });
        this.setState({ selectedPaymentId: list.PublicTermPaymentId });
        this.setState({ title: 'Edit Term Payment' });
        this.setState({ showTermPaymentRegister: true });
        const TeacherPaymentAssignPublicForm = await import('./forms/teacher-payment-assign-public-form');
        this.setState({ TeacherPaymentAssignPublicForm: TeacherPaymentAssignPublicForm.default });
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
        this.setState({ TeacherPaymentAssignPublicForm: null });
    }
    render() {
        const { dataList, dataTitles, columnList, pageSize, filteredItem,
            title, showTermPaymentRegister, studentList, termList, selectedPaymentId, selectedTermId,
            selectedStudentId, TeacherPaymentAssignPublicForm } = this.state;
        return (<div>
            <Container fluid className="table">
                <Row className="mb-2">
                    <Col xs="12" className="text-left text-dark p-0" >
                        <h3 className="text-primary text-center font-weight-bold">Assign Public Payments</h3>
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
                            // onBlur={simpleValselectedPaymentIdator.current.showMessageFor('term')}
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
                                    // onBlur={simpleValselectedPaymentIdator.current.showMessageFor('term')}
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
                                <Button className="btn btn-sm mb-3" onClick={this.onNewTermPayment} >Register New TermPayment</Button>
                                <Suspense fallback={<Spinner color="success" />}>
                                    <TableContent filter={filteredItem} dataList={dataList} dataTitles={dataTitles} columnList={columnList} onEdithandler={this.onEditTermPayment} pageSize={pageSize} />
                                </Suspense>
                            </div>
                        }
                    </Col>
                </Row>
            </Container>
            {TeacherPaymentAssignPublicForm &&
                <TeacherPaymentAssignPublicForm studentId={selectedStudentId} paymentId={selectedPaymentId} title={title} show={showTermPaymentRegister} onHide={this.handleHide} />
            }
        </div>);
    }
}
export default TeacherPaymentAssignPublic;





