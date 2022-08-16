
import React, { Component, Suspense } from 'react';
import { Container, Row, Col, Button, Spinner } from 'reactstrap';
import axios from 'axios';
import UserContext from '../../utils/user-context';
const TableContent = React.lazy(() => import('../general/table'));
class TeacherMaterial extends Component {
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
            showMaterialRegister: false,
            id: "",
            title: "",
            teacherId: "",
            TeacherMaterialForm: null
        }
    }
    getMaterial = async () => {
        const dataList = [];
        await axios.get(this.state.apiEndPoint + `Material/GetAllByTeacher?teacherId=${this.context.UserId}`).then(response => {
            let md = response.data
            md.map((m, i) =>
                dataList.push({
                    id: i + 1,
                    TeacherName: m.TeacherName,
                    Title: m.Title,
                    Modifier: m.Modifier,
                    ModificationDate: m.ModificationDate,
                    IsDeleted: m.IsDeleted,
                    MaterialId: m.MaterialId,
                }),
            );
            this.setState({ dataList });
        });
    }
    componentDidMount() {
        this.getMaterial();
    }
    componentDidUpdate(prevProps, prevState) {

    }
    onNewMaterial = async () => {
        this.setState({ id: "" });
        this.setState({ title: 'New Material' });
        this.setState({ showMaterialRegister: true });
        const TeacherMaterialForm = await import('./forms/teacher-material-form');
        this.setState({ TeacherMaterialForm: TeacherMaterialForm.default });
    }
    onEditMaterial = async (list) => {
        this.setState({ id: list.MaterialId });
        this.setState({ title: `Edit ${list.Title}` });
        this.setState({ showMaterialRegister: true });
        const TeacherMaterialForm = await import('./forms/teacher-material-form');
        this.setState({ TeacherMaterialForm: TeacherMaterialForm.default });
    }
    handleHide = () => {
        this.setState({ showMaterialRegister: false });
        this.setState({ id: "" });
        this.getMaterial();
        this.setState({ TeacherMaterialForm: null });
    }
    render() {
        const { dataList, dataTitles, columnList, pageSize, filteredItem,
            id, title, showMaterialRegister, TeacherMaterialForm } = this.state;
        return (<div>
            <Container fluid className="table">
                <Row className="mb-2">
                    <Col xs="12" className="text-left text-dark p-0" >
                        <h3 className="text-primary text-center font-weight-bold">Materials</h3>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col className="text-left m-0 p-0">
                        <Button className="btn btn-sm" onClick={this.onNewMaterial} >Register New Material</Button>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col xs="12" className="text-left m-0 p-1">

                        <Suspense fallback={<Spinner color="success" />}>
                            <TableContent filter={filteredItem} dataList={dataList} dataTitles={dataTitles} columnList={columnList} onEdithandler={this.onEditMaterial} pageSize={pageSize} />
                        </Suspense>
                    </Col>
                </Row>
            </Container>
            {TeacherMaterialForm &&
                <TeacherMaterialForm id={id} title={title} show={showMaterialRegister} onHide={this.handleHide} />
            }
        </div>);
    }
}
export default TeacherMaterial;
