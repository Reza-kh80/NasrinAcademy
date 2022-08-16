import React, { Component, Suspense } from 'react';
import { Container, Row, Col, Button, Spinner } from 'reactstrap';
import axios from 'axios';
const TableContent = React.lazy(() => import('../general/table'));
const MyDropdown = React.lazy(() => import('../general/dropdown'));
class DeanTeacher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apiEndPoint: process.env.REACT_APP_APIEndPoint,
            pageSize: 10,
            dataList: [],
            dataTitles: ["ID", 'Name', 'Teaching Language', 'Phone', 'ExperienceYear', 'SessionPrice', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Register'],
            columnList: ["id", 'Name', 'LanguageName', "Phone", 'ExperienceYear', 'SessionPrice', 'IsAvailableSun', 'IsAvailableMon', 'IsAvailableTue', 'IsAvailableWed', 'IsAvailableThu', 'IsAvailableFri', 'IsAvailableSat'],
            filteredItem: "Name",
            pageSizeTeacher: 15,
            dataListTeacher: [],
            dataTitlesTeacher: ["ID", 'Name', 'Teaching Language', 'Phone', 'ExperienceYear', 'SessionPrice', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Not Active', 'Edit'],
            columnListTeacher: ["id", 'Name', 'LanguageName', "Phone", 'ExperienceYear', 'SessionPrice', 'IsAvailableSun', 'IsAvailableMon', 'IsAvailableTue', 'IsAvailableWed', 'IsAvailableThu', 'IsAvailableFri', 'IsAvailableSat', 'IsDeleted'],
            filteredItemTeacher: "Name",
            showTeacherRegister: false,
            dropdownList: [],
            title: "",
            teacherId: "",
            languageId: 1,
            isRegistered: false,
            DeanTeacherForm: null

        }
    }
    getNotRegisteredTeacher = async (id) => {
        const dataList = [];
        await axios.get(this.state.apiEndPoint + `Teacher/DisplayAllNotRegistered`).then(response => {
            response.data.map((m, i) =>
                dataList.push({
                    id: i + 1,
                    Name: m.Name,
                    LanguageName: m.LanguageName,
                    Phone: m.Phone,
                    ExperienceYear: m.ExperienceYear,
                    SessionPrice: m.SessionPrice,
                    IsAvailableSun: m.IsAvailableSun,
                    IsAvailableMon: m.IsAvailableMon,
                    IsAvailableTue: m.IsAvailableTue,
                    IsAvailableWed: m.IsAvailableWed,
                    IsAvailableThu: m.IsAvailableThu,
                    IsAvailableFri: m.IsAvailableFri,
                    IsAvailableSat: m.IsAvailableSat,
                    ModificationDate: m.ModificationDate,
                    TeacherId: m.TeacherId,
                    LanguageId: m.LanguageId
                }),
            );
            this.setState({ dataList });
        });
    }
    getRegisteredTeacher = async (id) => {
        const dataListTeacher = [];
        await axios.get(this.state.apiEndPoint + `Teacher/DisplayAllRegistered?languageId=${id}`).then(response => {
            response.data.map((m, i) =>
                dataListTeacher.push({
                    id: i + 1,
                    Name: m.Name,
                    LanguageName: m.LanguageName,
                    Phone: m.Phone,
                    ExperienceYear: m.ExperienceYear,
                    SessionPrice: m.SessionPrice,
                    IsAvailableSun: m.IsAvailableSun,
                    IsAvailableMon: m.IsAvailableMon,
                    IsAvailableTue: m.IsAvailableTue,
                    IsAvailableWed: m.IsAvailableWed,
                    IsAvailableThu: m.IsAvailableThu,
                    IsAvailableFri: m.IsAvailableFri,
                    IsAvailableSat: m.IsAvailableSat,
                    ModificationDate: m.ModificationDate,
                    IsDeleted: m.IsDeleted,
                    TeacherId: m.TeacherId,
                    LanguageId: m.LanguageId
                }),
            );
            this.setState({ dataListTeacher });
        });
    }
    getLanguage = async () => {
        let dropdownList = [];
        await axios.get(this.state.apiEndPoint + 'Language/DisplayDropdown').then(response => {
            let md = response.data
            md.map(m =>
                dropdownList.push({
                    value: m.LanguageId,
                    label: m.Name,
                }),
            );
            this.setState({ dropdownList });
        });
    }
    componentDidMount() {
        this.getLanguage();
        this.getNotRegisteredTeacher(1);
        this.getRegisteredTeacher(1);
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.teacherObject !== this.state.teacherObject) {
            // console.log("teacher", this.state.teacherObject)
        }
        if (prevState.userAddObject !== this.state.userAddObject) {
            // console.log("userAdd", this.state.userAddObject)
        }
        if (prevState.languageId !== this.state.languageId) {
            this.getNotRegisteredTeacher(this.state.languageId);
            this.getRegisteredTeacher(this.state.languageId);
        }
    }
    onNewTeacher = async () => {
        this.setState({ teacherId: 0 });
        this.setState({ languageId: 0 })
        this.setState({ isRegistered: false });
        this.setState({ title: 'Register New Teacher' });
        this.setState({ showTeacherRegister: true });
        const DeanTeacherForm = await import('./forms/dean-teacher-form');
        this.setState({ DeanTeacherForm: DeanTeacherForm.default });
    }
    onRegisterTeacher = async (list) => {
        this.setState({ teacherId: list.TeacherId });
        this.setState({ languageId: list.LanguageId })
        this.setState({ isRegistered: false });
        this.setState({ title: `Register ${list.Name}` });
        this.setState({ showTeacherRegister: true });
        const DeanTeacherForm = await import('./forms/dean-teacher-form');
        this.setState({ DeanTeacherForm: DeanTeacherForm.default });
    }
    onEditTeacher = async (list) => {
        console.log(list.IsRegistered)
        this.setState({ teacherId: list.TeacherId });
        this.setState({ languageId: list.LanguageId })
        this.setState({ isRegistered: true });
        this.setState({ title: `Register ${list.Name}` });
        this.setState({ showTeacherRegister: true });
        const DeanTeacherForm = await import('./forms/dean-teacher-form');
        this.setState({ DeanTeacherForm: DeanTeacherForm.default });
    }
    handleDropdownSelect = (e) => {
        let languageId = e.target.value;
        if (languageId === "") {
            this.setState({ languageId });
            return;
        }
        else {
            this.setState({ languageId });
            this.getNotRegisteredTeacher(languageId);
            this.getRegisteredTeacher(languageId);
        }
    }
    handleHideTeacherRegister = () => {
        this.setState({ showTeacherRegister: false })
        this.getRegisteredTeacher(this.state.languageId);
        this.getNotRegisteredTeacher(this.state.languageId);
        this.setState({ DeanTeacherForm: null });
    }
    render() {
        const { dataList, dataTitles, columnList, pageSize, filteredItem, dataListTeacher, dataTitlesTeacher, columnListTeacher, languageId, dropdownList,
            pageSizeTeacher, filteredItemTeacher, title, showTeacherRegister, isRegistered, teacherId, DeanTeacherForm } = this.state;
        return (<div>
            <Container fluid className="table">
                <Row className="mb-2">
                    <Col xs="12" className="text-left text-dark p-0" >
                        <h3 className="text-primary text-center font-weight-bold">Teachers</h3>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col className="text-left m-0 p-0">
                        <Button className="btn btn-sm" onClick={this.onNewTeacher} >Register New Teacher</Button>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col xs="12" className="text-left m-0 p-1">
                        <h4 className="text-success font-weight-bold">Teaching Request</h4>
                        <Suspense fallback={<Spinner color="success" />}>
                            <TableContent placeholder="find teache by name" filter={filteredItem} dataList={dataList} dataTitles={dataTitles} columnList={columnList} onEdithandler={this.onRegisterTeacher} pageSize={pageSize} />
                        </Suspense>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" md="6" lg="4" className="text-left m-0 p-1">
                        <h4 className="text-success font-weight-bold">Registered Teachers</h4>
                        <Suspense fallback={<Spinner color="success" />}>
                            <MyDropdown
                                label="Select Language "
                                display="Select Language"
                                dataList={dropdownList}
                                handleChange={this.handleDropdownSelect}
                                name="language"
                                selectedValue={languageId}
                                htmlFor="language"
                                width={window.innerWidth < 576 ? "w-100" : "w-25"}
                            />
                        </Suspense>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" className="text-left m-0 p-1">
                        <Suspense fallback={<Spinner color="success" />}>
                            <TableContent placeholder="find teache by name" filter={filteredItemTeacher} dataList={dataListTeacher} dataTitles={dataTitlesTeacher} columnList={columnListTeacher} onEdithandler={this.onEditTeacher} pageSize={pageSizeTeacher} />
                        </Suspense>
                    </Col>
                </Row>
            </Container>
            {DeanTeacherForm &&
                <DeanTeacherForm teacherId={teacherId} title={title} isRegistered={isRegistered} show={showTeacherRegister} onHide={this.handleHideTeacherRegister} />
            }
        </div>);
    }
}
export default DeanTeacher;

