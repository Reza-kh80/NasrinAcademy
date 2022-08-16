import React, { Component, Suspense } from 'react';
import { Container, Row, Col, Spinner } from 'reactstrap';
import axios from 'axios';
import UserContext from '../../utils/user-context';
const TableContent = React.lazy(() => import('../general/table'));

class StudentMaterial extends Component {
    static contextType = UserContext;
    constructor(props) {
        super(props);
        this.state = {
            apiEndPoint: process.env.REACT_APP_APIEndPoint,
            pageSize: 20,
            dataList: [],
            dataTitles: ["ID", 'Teacher', 'Student', 'Course', 'Title', 'Modifier', 'Date', 'Not Active', 'Display'],
            columnList: ["id", 'TeacherName', 'StudentName', 'CourseName', 'MaterialTitle', 'Modifier', 'ModificationDate', 'IsDeleted'],
            filteredItem: "MaterialTitle",
            showTermMaterialRegister: false,
            title: "",
            id: ""
        }
    }
    getTermMaterial = async () => {
        const url = this.context.status
            ? this.state.apiEndPoint + `TermMaterial/DisplayAllPublic?studentId=${this.context.user.UserId}`
            : this.state.apiEndPoint + `TermMaterial/DisplayAllPrivate?studentId=${this.context.user.UserId}`;
        const dataList = [];
        await axios.get(url).then(response => {
            let md = response.data
            md.map((m, i) =>
                dataList.push({
                    id: i + 1,
                    TeacherName: m.TeacherName,
                    StudentName: m.StudentName,
                    CourseName: m.CourseName,
                    MaterialTitle: m.MaterialTitle,
                    Modifier: m.Modifier,
                    ModificationDate: m.ModificationDate,
                    IsDeleted: m.IsDeleted,
                    MaterialId: m.MaterialId,
                    StudentId: m.StudentId,
                }),
            );
            this.setState({ dataList });
        });
    }
    componentDidMount() {
        this.getTermMaterial();
    }
    componentDidUpdate(prevProps, prevState) {
    }
    onEditTermMaterial = async (list) => {
        this.setState({ id: list.MaterialId });
        this.setState({ title: list.Title });
        this.setState({ showTermMaterialRegister: true });
        const StudentMaterialForm = await import('./forms/student-material-form');
        this.setState({ StudentMaterialForm: StudentMaterialForm.default });
    }
    handleHide = () => {
        this.setState({ showTermMaterialRegister: false })
        this.getTermMaterial();
        this.setState({ StudentMaterialForm: null });
    }
    render() {
        const { dataList, dataTitles, columnList, pageSize, filteredItem,
            title, showTermMaterialRegister, id, StudentMaterialForm } = this.state;
        return (<div>
            <Container fluid className="table">
                <Row className="mb-2">
                    <Col xs="12" className="text-left text-dark p-0" >
                        <h3 className="text-primary text-center font-weight-bold">Materials</h3>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col xs="12" className="text-left m-0 p-1">
                        <Suspense fallback={<Spinner color="success" />}>
                            <TableContent filter={filteredItem} placeholder="find material title" dataList={dataList} dataTitles={dataTitles} columnList={columnList} onEdithandler={this.onEditTermMaterial} pageSize={pageSize} />
                        </Suspense>
                    </Col>
                </Row>
            </Container>
            {StudentMaterialForm &&
                <StudentMaterialForm id={id} title={title} show={showTermMaterialRegister} onHide={this.handleHide} />
            }
        </div>);
    }
}
export default StudentMaterial;
