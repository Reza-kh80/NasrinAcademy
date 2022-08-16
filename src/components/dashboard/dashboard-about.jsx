import React, { Component, Suspense } from 'react';
import { Container, Row, Col, Button, Spinner } from 'reactstrap';
import SimpleReactValidator from 'simple-react-validator';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { getDatetime } from './../../utils/datetime';
const TableContent = React.lazy(() => import('../general/table'));
const FileUpload = React.lazy(() => import('../general/fileUpload'));
class DashboardAbout extends Component {
    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator();
        this.state = {
            apiEndPoint: process.env.REACT_APP_APIEndPoint,
            aboutObject: {
                AboutId: "",
                Title: "",
                TitleFr: "",
                TitleFa: "",
                Description: "",
                DescriptionFr: "",
                DescriptionFa: "",
                FileName: "",
                Modifier: "Nasrin Daftarchi",
                ModificationDate: getDatetime(),
                IsDeleted: false,
            },
            pageSize: 5,
            dataList: [],
            dataTitles: ["ID", 'Title', 'File Name', 'Edit'],
            columnList: ["id", "Title", 'FileName'],
            filteredItem: "Title"
        }
    }
    getData = async () => {
        const dataList = [];
        await axios.get(this.state.apiEndPoint + 'About/GetAll').then(response => {
            let md = response.data
            md.map((m, i) =>
                dataList.push({
                    id: i + 1,
                    Title: m.Title,
                    Description: m.Description,
                    TitleFr: m.TitleFr,
                    DescriptionFr: m.DescriptionFr,
                    TitleFa: m.TitleFa,
                    DescriptionFa: m.DescriptionFa,
                    FileName: m.FileName,
                    Modifier: m.Modifier,
                    ModificationDate: m.ModificationDate,
                    IsDeleted: m.IsDeleted,
                    AboutId: m.AboutId,
                }),
            );
            this.setState({ dataList });
        });
    }
    componentDidMount() {
        this.getData();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.dataList !== this.state.dataList) {
        }
    }
    onNewHandeler() {
        const aboutObject = { ...this.state.aboutObject };
        aboutObject.AboutId = "";
        aboutObject.Title = "";
        aboutObject.Description = "";
        aboutObject.TitleFr = "";
        aboutObject.DescriptionFr = "";
        aboutObject.TitleFa = "";
        aboutObject.DescriptionFa = "";
        aboutObject.FileName = "";
        aboutObject.Modifier = "Nasrin Daftarchi";
        aboutObject.ModificationDate = getDatetime();
        aboutObject.IsDeleted = false;
        this.setState({ aboutObject });
        this.validator.hideMessages();
    }
    onEdithandler = (list) => {
        let aboutObject = { ...this.state.aboutObject };
        aboutObject.AboutId = list.AboutId;
        aboutObject.Title = list.Title;
        aboutObject.Description = list.Description;
        aboutObject.TitleFr = list.TitleFr;
        aboutObject.DescriptionFr = list.DescriptionFr;
        aboutObject.TitleFa = list.TitleFa;
        aboutObject.DescriptionFa = list.DescriptionFa;
        aboutObject.FileName = list.FileName;
        aboutObject.Modifier = list.Modifier;
        aboutObject.ModificationDate = list.ModificationDate;
        aboutObject.IsDeleted = list.IsDeleted;
        this.setState({ aboutObject });

    }
    handleUpload = (fileName) => {
        let aboutObject = { ...this.state.aboutObject };
        if (fileName !== "") {
            aboutObject.FileName = fileName;
            this.setState({ aboutObject });
        }
    }
    handelChange = e => {
        let aboutObject = { ...this.state.aboutObject };
        aboutObject[e.currentTarget.name] = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        this.setState({ aboutObject });
    }
    setCurrentTime = () => {
        let aboutObject = { ...this.state.aboutObject };
        aboutObject.ModificationDate = getDatetime();
        this.setState({ aboutObject });
    }
    handelSubmit = () => {
        if (this.validator.allValid()) {
            this.setCurrentTime();
            axios.post(this.state.apiEndPoint + 'About/Add', this.state.aboutObject, {})
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
        const { dataList, dataTitles, columnList, pageSize, filteredItem, aboutObject } = this.state;
        return (<div>
            <Container fluid className="table">
                <Row className="mb-2">
                    <Col xs="12" className="text-left text-dark p-0" >
                        <h3 className="text-primary"> About</h3>
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col xs="12" className="text-left m-0 p-0">
                        <Suspense fallback={<Spinner color="success" />}>
                            <TableContent filter={filteredItem} dataList={dataList} dataTitles={dataTitles} columnList={columnList} onEdithandler={this.onEdithandler} pageSize={pageSize} />
                        </Suspense>
                    </Col>
                </Row>
                <Row >
                    <Col xs="12" className="text-left border border-primary p-3 rounded" >
                        <div>
                            <Row>
                                <Col xs="12" sm="6" >
                                    <Button onClick={() => this.onNewHandeler()} className="btn btn-sm mb-3 ">New Media</Button>
                                    <Form.Group>
                                        <Form.Label><h6 className="text-primary mb-0 ml-1" >Modefier:</h6></Form.Label>
                                        <Form.Control type="text" name="Modifier" value={aboutObject.Modifier} onChange={this.handelChange} disabled />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label><h6 className="text-primary mb-0 ml-1" >Modefication Date:</h6></Form.Label>
                                        <Form.Control type="text" name="ModificationDate" value={aboutObject.ModificationDate} onChange={this.handelChange} disabled />
                                    </Form.Group>
                                    <FileUpload postMethod={'About/UploadFile'} title="Photo(mp4,jpeg)" accept={['mp4', 'jpeg', 'jpg']} specifiedFileName="NoName" onUpload={this.handleUpload} />
                                    {this.validator.message('video or image', aboutObject.FileName, 'required|min:1', { className: 'alert alert-danger' })}
                                    <Form.Group>
                                        {aboutObject.AboutId !== "" && <h6 className="text-primary mb-0 ml-1" ><Form.Check inline name="IsDeleted" label="Is Deleted?" checked={aboutObject.IsDeleted} onChange={this.handelChange} /></h6>}
                                    </Form.Group>
                                </Col>
                                <Col xs="12" sm="6" >
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="12" sm="4" >
                                    <Form.Group>
                                        <Form.Label htmlFor="title"><h6 className="text-primary mb-0 ml-1" >About Title:</h6></Form.Label>
                                        <Form.Control id="title" name="Title" type="text" placeholder="Title" value={aboutObject.Title} onChange={this.handelChange} />
                                        {this.validator.message('title', aboutObject.Title, 'required|max:100', { className: 'alert alert-danger' })}
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label htmlFor="description"><h6 className="text-primary mb-0 ml-1" >Description:</h6></Form.Label>
                                        <Form.Control id="description" name="Description" as="textarea" className="wrap" placeholder="Description" rows={10} value={aboutObject.Description} onChange={this.handelChange} />
                                        {this.validator.message('description', aboutObject.Description, 'required|max:3000', { className: 'alert alert-danger' })}
                                    </Form.Group>
                                </Col>
                                <Col xs="12" sm="4" >
                                    <Form.Group>
                                        <Form.Label htmlFor="titleFr"><h6 className="text-primary mb-0 ml-1" >About Title:</h6></Form.Label>
                                        <Form.Control id="titleFr" name="TitleFr" type="text" placeholder="Title French" value={aboutObject.TitleFr} onChange={this.handelChange} />
                                        {this.validator.message('title french', aboutObject.TitleFr, 'required|max:100', { className: 'alert alert-danger' })}
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label htmlFor="descriptionFr"><h6 className="text-primary mb-0 ml-1" >Description:</h6></Form.Label>
                                        <Form.Control id="descriptionFr" name="DescriptionFr" as="textarea" className="wrap" placeholder="Description French" rows={10} value={aboutObject.DescriptionFr} onChange={this.handelChange} />
                                        {this.validator.message('description french', aboutObject.DescriptionFr, 'required|max:3000', { className: 'alert alert-danger' })}
                                    </Form.Group>
                                </Col>
                                <Col xs="12" sm="4" >
                                    <Form.Group>
                                        <Form.Label htmlFor="titleFa"><h6 className="text-primary mb-0 ml-1" >About Title:</h6></Form.Label>
                                        <Form.Control id="titleFa" name="TitleFa" type="text" dir="rtl" placeholder="عنوان فارسی" value={aboutObject.TitleFa} onChange={this.handelChange} />
                                        {this.validator.message('title farsi', aboutObject.TitleFa, 'required|max:100', { className: 'alert alert-danger' })}
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label htmlFor="descriptionFa"><h6 className="text-primary mb-0 ml-1" >Description:</h6></Form.Label>
                                        <Form.Control id="descriptionFa" name="DescriptionFa" as="textarea" className="wrap" dir="rtl" placeholder=" توضیحات فارسی" rows={10} value={aboutObject.DescriptionFa} onChange={this.handelChange} />
                                        {this.validator.message('description farsi', aboutObject.DescriptionFa, 'required|max:3000', { className: 'alert alert-danger' })}
                                    </Form.Group>
                                </Col>
                            </Row>
                            <div>
                                <Button className="btn btn-sm float-right" onClick={this.handelSubmit} >Submit About</Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>);
    }
}
export default DashboardAbout;
