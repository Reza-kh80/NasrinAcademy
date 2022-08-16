import React, { Component, Suspense } from 'react';
import { Container, Row, Col, Spinner } from 'reactstrap';
import axios from 'axios';
import UserContext from '../../utils/user-context';
const TableContent = React.lazy(() => import('../general/table'));
class StudentCertificate extends Component {
    static contextType = UserContext;
    constructor(props) {
        super(props);
        this.state = {
            apiEndPoint: process.env.REACT_APP_APIEndPoint,
            pageSize: 20,
            dataList: [],
            dataTitles: ["ID", 'Teacher', 'Student', 'Course', 'Result Date', 'Modifier', 'Date', 'Not Active', 'Edit'],
            columnList: ["id", 'TeacherName', 'StudentName', 'CourseName', 'ResultDate', 'Modifier', 'ModificationDate', 'IsDeleted'],
            filteredItem: "CourseName",
            showTermResultRegister: false,
            title: "",
            termResultId: "",
            studentId: "",
        }
    }
    getTermResult = async () => {
        const url = this.context.status
            ? this.state.apiEndPoint + `TermResult/DisplayAllPublic?studentId=${this.context.user.UserId}`
            : this.state.apiEndPoint + `TermResult/DisplayAllPrivate?studentId=${this.context.user.UserId}`;
        const dataList = [];
        await axios.get(url).then(response => {
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
                    TermResultId: this.context.status ? m.PublicTermResultId : m.PrivateTermResultId,
                    StudentId: m.StudentId,
                }),
            );
            this.setState({ dataList });
        });
    }
    componentDidMount() {
        this.getTermResult();
    }
    componentDidUpdate(prevProps, prevState) {

    }
    onEditTermResult = async (list) => {
        // console.log(list)
        this.setState({ studentId: list.StudentId });
        this.setState({ termResultId: list.TermResultId });
        this.setState({ title: 'Edit Term Result' });
        this.setState({ showTermResultRegister: true });
        const StudentCertificateForm = await import('./forms/student-certificate-form');
        this.setState({ StudentCertificateForm: StudentCertificateForm.default });
    }
    handleHide = () => {
        this.setState({ showTermResultRegister: false });
        this.getTermResult(this.state.studentId);
        this.setState({ studentId: "" });
        this.setState({ termResultId: "" });
        this.setState({ StudentCertificateForm: null });
    }
    render() {
        const { dataList, dataTitles, columnList, pageSize, filteredItem,
            title, showTermResultRegister, studentId, termResultId, StudentCertificateForm } = this.state;
        return (<div>
            <Container fluid className="table">
                <Row className="mb-2">
                    <Col xs="12" className="text-left text-dark p-0" >
                        <h3 className="text-primary text-center font-weight-bold">Certificates</h3>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col className="text-left m-0 p-0">
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col xs="12" className="text-left m-0 p-1">
                        <Suspense fallback={<Spinner color="success" />}>
                            <TableContent filter={filteredItem} placeholder="find course name" dataList={dataList} dataTitles={dataTitles} columnList={columnList} onEdithandler={this.onEditTermResult} pageSize={pageSize} />
                        </Suspense>
                    </Col>
                </Row>
            </Container>
            {StudentCertificateForm &&
                <StudentCertificateForm studentId={studentId} termResultId={termResultId} title={title} show={showTermResultRegister} onHide={this.handleHide} />
            }
        </div>);
    }
}
export default StudentCertificate;
