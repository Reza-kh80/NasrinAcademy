import React, { Component, Suspense } from 'react';
import { Container, Row, Col, Spinner } from 'reactstrap';
import axios from 'axios';
import UserContext from '../../utils/user-context';
const TableContent = React.lazy(() => import('../general/table'));

class StudentStatusNotice extends Component {
    static contextType = UserContext;
    constructor(props) {
        super(props);
        this.state = {
            apiEndPoint: process.env.REACT_APP_APIEndPoint,
            pageSize: 20,
            dataList: [],
            dataTitles: ["ID", 'Title', 'Modifier', 'Date', 'Display'],
            columnList: ["id", 'Title', 'Modifier', 'ModificationDate',],
            filteredItem: "Title",
            showTermNoticeRegister: false,
            title: "",
            termNoticeId: "",
            studentId: "",
            show: false,
        }
    }
    getTermNotice = async () => {
        const url = this.context.status
            ? this.state.apiEndPoint + `TermNotice/DisplayAllPublic?studentId=${this.context.user.UserId}`
            : this.state.apiEndPoint + `TermNotice/DisplayAllPrivate?studentId=${this.context.user.UserId}`;
        const dataList = [];
        await axios.get(url).then(response => {
            let md = response.data
            md.map((m, i) =>
                dataList.push({
                    id: i + 1,
                    TermNoticeId: this.context.status ? m.PublicTermNoticeId : m.PrivateTermNoticeId,
                    StudentName: m.StudentName,
                    CourseName: m.CourseName,
                    Title: m.Title,
                    Modifier: m.Modifier,
                    ModificationDate: m.ModificationDate,
                    IsDeleted: m.IsDeleted,
                    StudentId: m.StudentId,
                }),
            );
            this.setState({ dataList });
        });
    }
    componentDidMount() {
        this.getTermNotice();
    }
    componentDidUpdate(prevProps, prevState) {

    }
    onEditTermNotice = async (list) => {
        this.setState({ studentId: list.StudentId });
        this.setState({ termNoticeId: list.TermNoticeId });
        this.setState({ title: 'Progress Note' });
        this.setState({ showTermNoticeRegister: true });
        const StudentNoticeForm = await import('./forms/student-notice-form');
        this.setState({ StudentNoticeForm: StudentNoticeForm.default });
    }
    handleHide = () => {
        this.setState({ showTermNoticeRegister: false })
        this.getTermNotice();
        this.setState({ studentId: "" })
        this.setState({ termNoticeId: "" })
        this.setState({ StudentNoticeForm: null });
    }
    render() {
        const { dataList, dataTitles, columnList, pageSize, filteredItem,
            title, showTermNoticeRegister, studentId, termNoticeId, StudentNoticeForm } = this.state;
        return (<div>
            <Container fluid className="table">
                <Row>
                    <Col xs="12" className="text-left m-0 p-1">
                        <h6 className="text-primary font-weight-bold">Important notes to improve your skills</h6>
                        <div>
                            <Suspense fallback={<Spinner color="success" />}>
                                <TableContent filter={filteredItem} dataList={dataList} dataTitles={dataTitles} columnList={columnList} onEdithandler={this.onEditTermNotice} pageSize={pageSize} />
                            </Suspense>
                        </div>
                    </Col>
                </Row>
            </Container>
            {StudentNoticeForm &&
                <StudentNoticeForm studentId={studentId} termNoticeId={termNoticeId} title={title} show={showTermNoticeRegister} onHide={this.handleHide} />
            }
        </div>);
    }
}
export default StudentStatusNotice;
