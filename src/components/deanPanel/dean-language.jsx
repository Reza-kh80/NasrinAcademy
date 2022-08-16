import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import Form from 'react-bootstrap/Form';
import SimpleReactValidator from 'simple-react-validator';
import axios from 'axios';
import { getDatetime } from './../../utils/datetime';
import UserContext from '../../utils/user-context';
const TableContent = React.lazy(() => import('../general/table'));
const FileUpload = React.lazy(() => import('../general/fileUpload'));
class DeanLanguage extends Component {
    static contextType = UserContext;
    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator();
        this.state = {
            apiEndPoint: process.env.REACT_APP_APIEndPoint,
            languageObject: {
                LanguageId: "",
                Name: "",
                NameFa: "",
                Flag: "",
                Modifier: "Nasrin Daftarchi",
                ModificationDate: getDatetime(),
                IsDeleted: false,
            },
            pageSize: 15,
            dataList: [],
            dataTitles: ["ID", 'Name', 'File Name', 'Modifier', 'Date', 'Edit'],
            columnList: ["id", "Name", 'Modifier', 'ModificationDate', 'Flag'],
            filteredItem: "Name"
        }
    }
    getData = async () => {
        const dataList = [];
        await axios.get(this.state.apiEndPoint + 'Language/GetAll').then(response => {
            let md = response.data
            md.map((m, i) =>
                dataList.push({
                    id: i + 1,
                    Name: m.Name,
                    NameFa: m.NameFa,
                    Flag: m.Flag,
                    Modifier: m.Modifier,
                    ModificationDate: m.ModificationDate,
                    IsDeleted: m.IsDeleted,
                    LanguageId: m.LanguageId,
                }),
            );
            this.setState({ dataList });
        });
    }
    componentDidMount() {
        this.onNewHandeler();
        this.getData();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.dataList !== this.state.dataList) {

        }
    }
    onNewHandeler() {
        const languageObject = { ...this.state.languageObject };
        languageObject.LanguageId = "";
        languageObject.Name = "";
        languageObject.NameFa = "";
        languageObject.Flag = "";
        languageObject.Modifier = this.context.Username;
        languageObject.ModificationDate = getDatetime();
        languageObject.IsDeleted = false;
        this.setState({ languageObject });
        this.validator.hideMessages();
    }
    onEdithandler = (list) => {
        let languageObject = { ...this.state.languageObject };
        languageObject.LanguageId = list.LanguageId;
        languageObject.Name = list.Name;
        languageObject.NameFa = list.NameFa;
        languageObject.Flag = list.Flag;
        languageObject.Modifier = this.context.Username;
        languageObject.ModificationDate = getDatetime();
        languageObject.IsDeleted = list.IsDeleted;
        this.setState({ languageObject });
    }
    handleUpload = (fileName) => {
        let languageObject = { ...this.state.languageObject };
        if (fileName !== "") {
            languageObject.Flag = fileName;
            this.setState({ languageObject });
        }
    }
    handleChange = e => {
        let languageObject = { ...this.state.languageObject };
        languageObject[e.currentTarget.name] = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        this.setState({ languageObject });
    }
    setCurrentTime = () => {
        let languageObject = { ...this.state.languageObject };
        languageObject.ModificationDate = getDatetime();
        this.setState({ languageObject });
    }
    handleSubmit = () => {
        if (this.validator.allValid()) {
            this.setCurrentTime();
            axios.post(this.state.apiEndPoint + 'Language/Add', this.state.languageObject, {})
                .then(response => {
                    alert('You submitted the form and stuff!');
                    this.onNewHandeler();
                    this.validator.hideMessages();
                    this.getData();
                })
                .catch(function (error) {
                    alert('Something went wrong!');
                })
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }
    render() {
        const { dataList, dataTitles, columnList, pageSize, filteredItem, languageObject } = this.state;
        return (<div>
            <Container fluid className="table">
                <Row className="mb-2">
                    <Col xs="12" className="text-left text-dark p-0" >
                        <h3 className="text-primary"> Language</h3>
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col sm="12" md="6" className="text-left m-0 p-1">
                        <TableContent filter={filteredItem} dataList={dataList} dataTitles={dataTitles} columnList={columnList} onEdithandler={this.onEdithandler} pageSize={pageSize} />
                    </Col>
                    <Col sm="12" md="6" className="text-left border border-primary p-3 mt-3 rounded">
                        <div>
                            <Button onClick={() => this.onNewHandeler()} className="btn btn-sm mb-3 ">New Language</Button>
                            <FileUpload postMethod={'Language/UploadFile'} title="Flag(jpg,jpeg)" accept={['jpeg', 'jpg']} specifiedFileName="NoName" onUpload={this.handleUpload} />
                            {this.validator.message('video or image', languageObject.Flag, 'required|min:1', { className: 'alert alert-danger' })}
                            <Form.Group>
                                <Form.Label htmlFor="title"><h6 className="text-primary mb-0 ml-1" >Language Name:</h6></Form.Label>
                                <Form.Control id="title" name="Name" type="text" placeholder="Enter Language Name" value={languageObject.Name} onChange={this.handleChange} />
                                {this.validator.message('title', languageObject.Name, 'required|max:100', { className: 'alert alert-danger' })}
                            </Form.Group>
                            <Form.Group className="text-right">
                                <Form.Label htmlFor="titlefa" ><h6 className="text-primary mb-0 ml-1" dir="rtl" >نام زبان به فارسی</h6></Form.Label>
                                <Form.Control id="titlefa" name="NameFa" type="text" placeholder="نام زبان" className="text-right" dir="rtl" value={languageObject.NameFa} onChange={this.handleChange} />
                                {this.validator.message('title farsi', languageObject.NameFa, 'required|max:100', { className: 'alert alert-danger' })}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label htmlFor="modifier"><h6 className="text-primary mb-0 ml-1" >Modefier:</h6></Form.Label>
                                <Form.Label id="modifier" className="border rounded border-secondary d-block p-2">{languageObject.Modifier}</Form.Label>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label htmlFor="modificationDate"><h6 className="text-primary mb-0 ml-1" >Modefication Date:</h6></Form.Label>
                                <Form.Label id="modificationDate" className="border rounded border-dark d-block p-2">{languageObject.ModificationDate}</Form.Label>
                            </Form.Group>
                            <Form.Group>
                                {languageObject.LanguageId !== "" && <h6 className="text-primary mb-0 ml-1" ><Form.Check inline name="IsDeleted" label="Is Deleted?" checked={languageObject.IsDeleted} onChange={this.handleChange} /></h6>}
                            </Form.Group>
                            <Button className="btn btn-sm float-right" onClick={this.handleSubmit} >Submit Language</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>);
    }
}
export default DeanLanguage;
