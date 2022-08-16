import React, { Component } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { Container, Row, Col, Button } from 'reactstrap';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { getDatetime } from './../../utils/datetime';
const TableContent = React.lazy(() => import('../general/table'));
const FileUpload = React.lazy(() => import('../general/fileUpload'));
class DashboardVideo extends Component {
    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator();
        this.state = {
            apiEndPoint: process.env.REACT_APP_APIEndPoint,
            mediaObject: {
                MediaId: "",
                Title: "",
                Description: "",
                DescriptionFr: "",
                DescriptionFa: "",
                FileName: "",
                IsFree: false,
                Modifier: "Nasrin Daftarchi",
                ModificationDate: getDatetime(),
                IsDeleted: false,
            },
            pageSize: 15,
            dataList: [],
            dataTitles: ["ID", 'Title', 'File Name', 'Edit'],
            columnList: ["id", "Title", 'FileName'],
            filteredItem: "Title"
        }
    }
    getData = async () => {
        const dataList = [];
        await axios.get(this.state.apiEndPoint + 'Media/GetAll').then(response => {
            let md = response.data
            md.map((m, i) =>
                dataList.push({
                    id: i + 1,
                    Title: m.Title,
                    Description: m.Description,
                    DescriptionFr: m.DescriptionFr,
                    DescriptionFa: m.DescriptionFa,
                    AboutMedia: m.AboutMedia,
                    FileName: m.FileName,
                    IsFree: m.IsFree,
                    Modifier: m.Modifier,
                    ModificationDate: m.ModificationDate,
                    IsDeleted: m.IsDeleted,
                    MediaId: m.MediaId,
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
        const mediaObject = { ...this.state.mediaObject };
        mediaObject.MediaId = "";
        mediaObject.Title = "";
        mediaObject.Description = "";
        mediaObject.DescriptionFr = "";
        mediaObject.DescriptionFa = "";
        mediaObject.FileName = "";
        mediaObject.IsFree = false;
        mediaObject.Modifier = "Nasrin Daftarchi";
        mediaObject.ModificationDate = getDatetime();
        mediaObject.IsDeleted = false;
        this.setState({ mediaObject });
        this.validator.hideMessages();
    }
    onEdithandler = (list) => {
        const mediaObject = { ...this.state.mediaObject };
        mediaObject.MediaId = list.MediaId;
        mediaObject.Title = list.Title;
        mediaObject.Description = list.Description;
        mediaObject.DescriptionFr = list.DescriptionFr;
        mediaObject.DescriptionFa = list.DescriptionFa;
        mediaObject.FileName = list.FileName;
        mediaObject.IsFree = list.IsFree;
        mediaObject.Modifier = list.Modifier;
        mediaObject.ModificationDate = list.ModificationDate;
        mediaObject.IsDeleted = list.IsDeleted;
        this.setState({ mediaObject });
    }
    handleUpload = (fileName) => {
        let mediaObject = { ...this.state.mediaObject };
        if (fileName !== "") {
            mediaObject.FileName = fileName;
            this.setState({ mediaObject });
        }
    }
    handleChange = e => {
        let mediaObject = { ...this.state.mediaObject };
        mediaObject[e.currentTarget.name] = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        this.setState({ mediaObject });
    }
    setCurrentTime = () => {
        let mediaObject = { ...this.state.mediaObject };
        mediaObject.ModificationDate = getDatetime();
        this.setState({ mediaObject });
    }
    handleSubmit = () => {
        if (this.validator.allValid()) {
            this.setCurrentTime();
            axios.post(this.state.apiEndPoint + 'Media/Add', this.state.mediaObject, {})
                .then(response => {
                    this.setState({ shouldRender: true })
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
        const { dataList, dataTitles, columnList, pageSize, filteredItem, mediaObject } = this.state;
        return (<div>
            <Container fluid className="table">
                <Row className="mb-2">
                    <Col xs="12" className="text-left text-dark p-0" >
                        <h3 className="text-primary"> Video</h3>
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col sm="12" md="6" className="text-left m-0 p-0">
                        <TableContent filter={filteredItem} dataList={dataList} dataTitles={dataTitles} columnList={columnList} onEdithandler={this.onEdithandler} pageSize={pageSize} />
                    </Col>
                    <Col sm="12" md="6" className="text-left border border-primary p-3 mt-3 rounded">
                        <div>
                            <Form >
                                <Button onClick={() => this.onNewHandeler()} className="btn btn-sm mb-3 ">New Media</Button>
                                <FileUpload postMethod={'Media/UploadFile'} title="Video(mp4)" accept={['mp4']} specifiedFileName="NoName" onUpload={this.handleUpload} />
                                {this.validator.message('video or image', mediaObject.FileName, 'required|min:1', { className: 'alert alert-danger' })}
                                <Form.Group>
                                    <h6 className="text-primary mb-0 ml-1" >
                                        <Form.Check inline name="IsFree" label="Is Free?" checked={mediaObject.IsFree} onChange={this.handleChange} />
                                    </h6>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label><h6 className="text-primary mb-0 ml-1" >Modefier:</h6></Form.Label>
                                    <Form.Control type="text" name="Modifier" value={mediaObject.Modifier} onChange={this.handleChange} disabled />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label><h6 className="text-primary mb-0 ml-1" >Modefication Date:</h6></Form.Label>
                                    <Form.Control type="text" name="ModificationDate" value={mediaObject.ModificationDate} onChange={this.handleChange} disabled />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor="title"><h6 className="text-primary mb-0 ml-1" >Media Title:</h6></Form.Label>
                                    <Form.Control id="title" name="Title" type="text" placeholder="Media Title" value={mediaObject.Title} onChange={this.handleChange} />
                                    {this.validator.message('title', mediaObject.Title, 'required|max:30', { className: 'alert alert-danger' })}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor="description"><h6 className="text-primary mb-0 ml-1" >Description (English):</h6></Form.Label>
                                    <Form.Control id="description" name="Description" as="textarea" className="wrap" placeholder="Media Description (English)" rows={3} value={mediaObject.Description} onChange={this.handleChange} />
                                    {this.validator.message('media description', mediaObject.Description, 'required|max:300', { className: 'alert alert-danger' })}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor="descriptionfr"><h6 className="text-primary mb-0 ml-1" >Description (French):</h6></Form.Label>
                                    <Form.Control id="descriptionfr" name="DescriptionFr" as="textarea" className="wrap" placeholder="Media Description (French)" rows={3} value={mediaObject.DescriptionFr} onChange={this.handleChange} />
                                    {this.validator.message('media description french', mediaObject.DescriptionFr, 'required|max:300', { className: 'alert alert-danger' })}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor="descriptionfa"><h6 className="text-primary mb-0 ml-1" >Description (Farsi):</h6></Form.Label>
                                    <Form.Control id="descriptionfa" name="DescriptionFa" as="textarea" className="wrap" dir="rtl" placeholder="توضیحات مختصر" rows={3} value={mediaObject.DescriptionFa} onChange={this.handleChange} />
                                    {this.validator.message('media description farsi', mediaObject.DescriptionFa, 'required|max:300', { className: 'alert alert-danger' })}
                                </Form.Group>
                                <Form.Group>
                                    {mediaObject.MediaId !== "" && <h6 className="text-primary mb-0 ml-1" ><Form.Check inline name="IsDeleted" label="Is Deleted?" checked={mediaObject.IsDeleted} onChange={this.handleChange} /></h6>}
                                </Form.Group>
                            </Form>
                            <Button className="btn btn-sm float-right" onClick={this.handleSubmit} >Submit Media</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>);
    }
}
export default DashboardVideo;
