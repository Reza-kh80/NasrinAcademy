import React, { Component, Suspense } from 'react';
import { Container, Row, Col, Button, Spinner } from 'reactstrap';
import axios from 'axios';
const TableContent = React.lazy(() => import('../general/table'));
class DeanPublicClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apiEndPoint: process.env.REACT_APP_APIEndPoint,
            pageSize: 20,
            dataList: [],
            dataTitles: ["ID", 'Language', 'Teacher', 'Course', 'Modifier', 'Date', 'Not Active', 'Edit'],
            columnList: ["id", 'LanguageName', 'TeacherName', 'CourseName', 'Modifier', 'ModificationDate', 'IsDeleted'],
            filteredItem: "TeacherName",
            showTermRegister: false,
            id: "",
            title: "",
            DeanPublicClassForm: null
        }
    }
    getTerm = async () => {
        const dataList = [];
        await axios.get(this.state.apiEndPoint + 'Term/GetAllPublic').then(response => {
            let md = response.data;
            md.map((m, i) =>
                dataList.push({
                    id: i + 1,
                    LanguageName: m.LanguageName,
                    TeacherName: m.TeacherName,
                    CourseName: m.CourseName,
                    Modifier: m.Modifier,
                    ModificationDate: m.ModificationDate,
                    IsDeleted: m.IsDeleted,
                    PublicTeacherCourseId: m.PublicTeacherCourseId,
                    PublicTermId: m.PublicTermId,
                }),
            );
            this.setState({ dataList });
        });
    }
    componentDidMount() {
        this.getTerm();
    }
    componentDidUpdate(prevProps, prevState) {

    }
    onNewTerm = async () => {
        this.setState({ id: "" })
        this.setState({ title: 'Register New Term' })
        this.setState({ showTermRegister: true })
        const DeanPublicClassForm = await import('./forms/dean-public-class-form');
        this.setState({ DeanPublicClassForm: DeanPublicClassForm.default });
    }
    onEditTerm = async (list) => {
        this.setState({ id: list.PublicTermId })
        this.setState({ title: 'Edit Term' })
        this.setState({ showTermRegister: true })
        const DeanPublicClassForm = await import('./forms/dean-public-class-form');
        this.setState({ DeanPublicClassForm: DeanPublicClassForm.default });
    }
    handleHide = () => {
        this.setState({ showTermRegister: false })
        this.setState({ id: "" })
        this.getTerm();
        this.setState({ DeanPublicClassForm: null });
    }
    render() {
        const { dataList, dataTitles, columnList, pageSize, filteredItem,
            id, title, showTermRegister, DeanPublicClassForm } = this.state;
        return (<div>
            <Container fluid className="table">
                <Row className="mb-2">
                    <Col xs="12" className="text-left text-dark p-0" >
                        <h3 className="text-primary text-center font-weight-bold">Public Classes</h3>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col className="text-left m-0 p-0">
                        <Button className="btn btn-sm ml-2" onClick={this.onNewTerm} >Register New Class</Button>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col xs="12" className="text-left m-0 p-1">
                        <Suspense fallback={<Spinner color="success" />}>
                            <TableContent filter={filteredItem} dataList={dataList} dataTitles={dataTitles} columnList={columnList} onEdithandler={this.onEditTerm} pageSize={pageSize} />
                        </Suspense>
                    </Col>
                </Row>
            </Container>
            {DeanPublicClassForm &&
                <DeanPublicClassForm id={id} title={title} show={showTermRegister} onHide={this.handleHide} />

            }
        </div>);
    }
}
export default DeanPublicClass;
