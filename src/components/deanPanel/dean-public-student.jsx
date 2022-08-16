import React, { Component, Suspense } from 'react';
import { Container, Row, Col, Button, Spinner } from 'reactstrap';
import SimpleReactValidator from 'simple-react-validator';
import axios from 'axios';
import UserContext from '../../utils/user-context';
const TableContent = React.lazy(() => import('../general/table'));
class DeanPublicStudent extends Component {
    static contextType = UserContext;
    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator();
        this.state = {
            apiEndPoint: process.env.REACT_APP_APIEndPoint,
            pageSize: 15,
            dataList: [],
            dataTitles: ["ID", 'Name', 'Course Name', 'Teacher', 'Phone', 'Email', 'Address', 'Date', 'Register'],
            columnList: ["id", 'Name', 'CourseName', 'TeacherName', "Phone", 'Email', 'Address', 'ModificationDate'],
            filteredItem: "CourseName",
            pageSizeStudent: 15,
            dataListStudent: [],
            dataTitlesStudent: ["ID", 'Name', 'Course Name', 'Teacher', 'Phone', 'Email', 'Address', 'Date', 'Register'],
            columnListStudent: ["id", 'Name', 'CourseName', 'TeacherName', "Phone", 'Email', 'Address', 'ModificationDate'],
            filteredItemStudent: "CourseName",
            showStudentRegister: false,
            title: "",
            studentId: "",
            publicTermId: "",
            isRegistered: false,
            DeanPublicStudentForm: null

        }
    }
    getNotRegisteredStudent = async () => {
        const dataList = [];
        await axios.get(this.state.apiEndPoint + 'Student/DisplayAllPublicNotRegistered').then(response => {
            response.data.map((m, i) =>
                dataList.push({
                    id: i + 1,
                    Name: m.Name,
                    CourseName: m.CourseName,
                    TeacherName: m.TeacherName,
                    Phone: m.Phone,
                    Email: m.Email,
                    Address: m.Address,
                    ModificationDate: m.ModificationDate,
                    Message: m.Message,
                    Modifier: m.Modifier,
                    IsDeleted: m.IsDeleted,
                    StudentId: m.StudentId,
                    PublicTermId: m.PublicTermId,
                    Photo: m.Photo,
                    IsRegistered: m.IsRegistered
                }),
            );
            this.setState({ dataList });
        });
    }
    getRegisteredStudent = async () => {
        const dataListStudent = [];
        await axios.get(this.state.apiEndPoint + 'Student/DisplayAllPublicRegistered').then(response => {
            let md = response.data
            md.map((m, i) =>
                dataListStudent.push({
                    id: i + 1,
                    Name: m.Name,
                    CourseName: m.CourseName,
                    TeacherName: m.TeacherName,
                    Phone: m.Phone,
                    Email: m.Email,
                    Address: m.Address,
                    ModificationDate: m.ModificationDate,
                    Message: m.Message,
                    Modifier: m.Modifier,
                    IsDeleted: m.IsDeleted,
                    StudentId: m.StudentId,
                    PublicTermId: m.PublicTermId,
                    Photo: m.Photo,
                    IsRegistered: m.IsRegistered
                }),
            );
            this.setState({ dataListStudent });
        });
    }
    componentDidMount() {
        this.getNotRegisteredStudent();
        this.getRegisteredStudent();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.studentObject !== this.state.studentObject) {
            // console.log("student", this.state.studentObject)
        }
        if (prevState.userAddObject !== this.state.userAddObject) {
            // console.log("userAdd", this.state.userAddObject)
        }
        if (prevState.userUpdateObject !== this.state.userUpdateObject) {
            // console.log("userUpdate", this.state.userUpdateObject)
        }
    }
    onNewStudent = async () => {
        this.setState({ studentId: 0 });
        this.setState({ publicTermId: 0 });
        this.setState({ isRegistered: false });
        this.setState({ title: 'Register New Student' });
        this.setState({ showStudentRegister: true });
        const DeanPublicStudentForm = await import('./forms/dean-public-student-form');
        this.setState({ DeanPublicStudentForm: DeanPublicStudentForm.default });
    }
    onRegisterStudent = async (list) => {
        this.setState({ studentId: list.StudentId })
        this.setState({ publicTermId: list.PublicTermId })
        this.setState({ isRegistered: list.IsRegistered })
        this.setState({ title: `Register ${list.Name}` })
        this.setState({ showStudentRegister: true })
        const DeanPublicStudentForm = await import('./forms/dean-public-student-form');
        this.setState({ DeanPublicStudentForm: DeanPublicStudentForm.default });
    }
    onEditStudent = async (list) => {
        this.setState({ studentId: list.StudentId })
        this.setState({ publicTermId: list.PublicTermId })
        this.setState({ isRegistered: list.IsRegistered })
        this.setState({ id: list.StudentId })
        this.setState({ title: `Edit ${list.Name}` })
        this.setState({ showStudentRegister: true })
        const DeanPublicStudentForm = await import('./forms/dean-public-student-form');
        this.setState({ DeanPublicStudentForm: DeanPublicStudentForm.default });
    }
    handleHideStudentRegister = () => {
        this.setState({ showStudentRegister: false })
        this.setState({ studentId: 0 })
        this.setState({ isRegistered: false })
        this.getRegisteredStudent();
        this.setState({ DeanPublicStudentForm: null });
    }
    render() {
        const { dataList, dataTitles, columnList, pageSize, filteredItem, dataListStudent, dataTitlesStudent, columnListStudent,
            pageSizeStudent, filteredItemStudent, title, showStudentRegister, studentId, isRegistered, publicTermId,
            DeanPublicStudentForm } = this.state;
        return (<div>
            <Container fluid className="table">
                <Row className="mb-2">
                    <Col xs="12" className="text-left text-dark p-0" >
                        <h3 className="text-primary text-center font-weight-bold">Private Students</h3>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col className="text-left m-0 p-0">
                        <Button className="btn btn-sm" onClick={this.onNewStudent} >Register New Private Student</Button>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" className="text-left m-0 p-1">
                        <h4 className="text-success font-weight-bold mt-2">Not Registered Students</h4>
                        <Suspense fallback={<Spinner color="success" />}>
                            <TableContent filter={filteredItem} dataList={dataList} dataTitles={dataTitles} columnList={columnList} onEdithandler={this.onRegisterStudent} pageSize={pageSize} />
                        </Suspense>
                        <br />
                        <h4 className="text-success font-weight-bold">Registered Students</h4>
                        <Suspense fallback={<Spinner color="success" />}>
                            <TableContent filter={filteredItemStudent} dataList={dataListStudent} dataTitles={dataTitlesStudent} columnList={columnListStudent} onEdithandler={this.onEditStudent} pageSize={pageSizeStudent} />
                        </Suspense>
                    </Col>
                </Row>
            </Container>
            {DeanPublicStudentForm &&
                <DeanPublicStudentForm studentId={studentId} termId={publicTermId} isRegistered={isRegistered} title={title} show={showStudentRegister} onHide={this.handleHideStudentRegister} />
            }
        </div>);
    }
}
export default DeanPublicStudent;
