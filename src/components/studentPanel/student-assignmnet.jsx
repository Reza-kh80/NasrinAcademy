import React, { Component, Suspense } from 'react';
import { Container, Row, Col, Spinner } from 'reactstrap';
import axios from 'axios';
import UserContext from '../../utils/user-context';
const TableContent = React.lazy(() => import('../general/table'));
class StudentAssignment extends Component {
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
            studentId: "",
            assignmentId: "",
            StudentAssignmentForm: null
        }
    }
    getTermAssignment = async () => {
        const url = this.context.status
            ? this.state.apiEndPoint + `TermAssignment/DisplayAllPublic?studentId=${this.context.user.UserId}`
            : this.state.apiEndPoint + `TermAssignment/DisplayAllPrivate?studentId=${this.context.user.UserId}`;
        const dataList = [];
        await axios.get(url).then(response => {
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
    componentDidMount() {
        this.getTermAssignment();
    }
    componentDidUpdate(prevProps, prevState) {
    }
    onEditTermAssignment = async (list) => {
        this.setState({ studentId: list.StudentId });
        this.setState({ assignmentId: list.AssignmentId });
        this.setState({ title: list.AssignmentTitle });
        this.setState({ showTermAssignmentRegister: true });
        const StudentAssignmentForm = await import('./forms/student-assignment-form');
        this.setState({ StudentAssignmentForm: StudentAssignmentForm.default });
    }
    handleHide = () => {
        this.setState({ showTermAssignmentRegister: false });
        this.setState({ studentId: "" });
        this.setState({ assginmentId: "" });
        this.setState({ StudentAssignmentForm: null });
        this.getTermAssignment();
    }
    render() {
        const { dataList, dataTitles, columnList, pageSize, filteredItem,
            title, showTermAssignmentRegister, assignmentId, studentId, StudentAssignmentForm } = this.state;
        return (<div>
            <Container fluid className="table">
                <Row className="mb-2">
                    <Col xs="12" className="text-left text-dark p-0" >
                        <h3 className="text-primary text-center font-weight-bold">Assignments</h3>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col xs="12" className="text-left m-0 p-1">
                        <Suspense fallback={<Spinner color="success" />}>
                            <TableContent filter={filteredItem} dataList={dataList} dataTitles={dataTitles} columnList={columnList} onEdithandler={this.onEditTermAssignment} pageSize={pageSize} />
                        </Suspense>
                    </Col>
                </Row>
            </Container>
            {StudentAssignmentForm &&
                <StudentAssignmentForm assignmentId={assignmentId} studentId={studentId} title={title} show={showTermAssignmentRegister} onHide={this.handleHide} />
            }
        </div>);
    }
}
export default StudentAssignment;
