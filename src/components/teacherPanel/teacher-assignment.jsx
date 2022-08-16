
import React, { Component, Suspense } from 'react';
import { Container, Row, Col, Button, Spinner } from 'reactstrap';
import axios from 'axios';
import UserContext from '../../utils/user-context';
const TableContent = React.lazy(() => import('../general/table'));
class TeacherAssignment extends Component {
    static contextType = UserContext;
    constructor(props) {
        super(props);
        this.state = {
            apiEndPoint: process.env.REACT_APP_APIEndPoint,
            pageSize: 20,
            dataList: [],
            dataTitles: ["ID", 'Teacher', 'Title', 'Modifier', 'Date', 'Not Active', 'Edit'],
            columnList: ["id", 'TeacherName', 'Title', 'Modifier', 'ModificationDate', 'IsDeleted'],
            filteredItem: "Title",
            showAssignmentRegister: false,
            id: "",
            title: "",
            teacherId: "",
            TeacherAssignmentForm: null
        }
    }
    getAssignment = async () => {
        const dataList = [];
        await axios.get(this.state.apiEndPoint + `Assignment/GetAllByTeacher?teacherId=${this.context.UserId}`).then(response => {
            let md = response.data
            md.map((m, i) =>
                dataList.push({
                    id: i + 1,
                    TeacherName: m.TeacherName,
                    Title: m.Title,
                    Modifier: m.Modifier,
                    ModificationDate: m.ModificationDate,
                    IsDeleted: m.IsDeleted,
                    AssignmentId: m.AssignmentId,
                }),
            );
            this.setState({ dataList });
        });
    }
    componentDidMount() {
        this.getAssignment();
    }
    componentDidUpdate(prevProps, prevState) {

    }
    onNewAssignment = async () => {
        this.setState({ id: "" });
        this.setState({ title: 'New Assignment' });
        this.setState({ showAssignmentRegister: true });
        const TeacherAssignmentForm = await import('./forms/teacher-assignment-form');
        this.setState({ TeacherAssignmentForm: TeacherAssignmentForm.default });
    }
    onEditAssignment = async (list) => {
        this.setState({ id: list.AssignmentId });
        this.setState({ title: `Edit ${list.Title}` });
        this.setState({ showAssignmentRegister: true });
        const TeacherAssignmentForm = await import('./forms/teacher-assignment-form');
        this.setState({ TeacherAssignmentForm: TeacherAssignmentForm.default });
    }
    handleHide = () => {
        this.setState({ showAssignmentRegister: false });
        this.setState({ id: "" });
        this.getAssignment();
        this.setState({ TeacherAssignmentForm: null });
    }
    render() {
        const { dataList, dataTitles, columnList, pageSize, filteredItem,
            id, title, showAssignmentRegister, TeacherAssignmentForm } = this.state;
        return (<div>
            <Container fluid className="table">
                <Row className="mb-2">
                    <Col xs="12" className="text-left text-dark p-0" >
                        <h3 className="text-primary text-center font-weight-bold">Assignments</h3>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col className="text-left m-0 p-0">
                        <Button className="btn btn-sm" onClick={this.onNewAssignment} >Register New Assignment</Button>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col xs="12" className="text-left m-0 p-1">
                        <Suspense fallback={<Spinner color="success" />}>
                            <TableContent filter={filteredItem} dataList={dataList} dataTitles={dataTitles} columnList={columnList} onEdithandler={this.onEditAssignment} pageSize={pageSize} />
                        </Suspense>
                    </Col>
                </Row>
            </Container>
            {TeacherAssignmentForm &&
                <TeacherAssignmentForm id={id} title={title} show={showAssignmentRegister} onHide={this.handleHide} />
            }
        </div>);
    }
}
export default TeacherAssignment;
