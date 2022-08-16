import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import Form from 'react-bootstrap/Form';
import SimpleReactValidator from 'simple-react-validator';
import axios from 'axios';
import { getDatetime } from './../../utils/datetime';
const TableContent = React.lazy(() => import('../general/table'));
const FileUpload = React.lazy(() => import('../general/fileUpload'));
class DashboardAdvertise extends Component {
    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator();
        this.state = {
            apiEndPoint: process.env.REACT_APP_APIEndPoint,
            advertiseObject: {
                AdvertiseId: "",
                Title: "",
                Photo: "",
                Modifier: "Nasrin Daftarchi",
                ModificationDate: getDatetime(),
                IsDeleted: false,
            },
            pageSize: 15,
            dataList: [],
            dataTitles: ["ID", 'Title', 'File Name', 'Edit'],
            columnList: ["id", "Title", 'Photo'],
            filteredItem: "Title"
        }
    }
    getData = async () => {
        const dataList = [];
        await axios.get(this.state.apiEndPoint + 'Advertise/GetAll').then(response => {
            let md = response.data
            md.map((m, i) =>
                dataList.push({
                    id: i + 1,
                    Title: m.Title,
                    Photo: m.Photo,
                    Modifier: m.Modifier,
                    ModificationDate: m.ModificationDate,
                    IsDeleted: m.IsDeleted,
                    AdvertiseId: m.AdvertiseId,
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
        const advertiseObject = { ...this.state.advertiseObject };
        advertiseObject.AdvertiseId = "";
        advertiseObject.Title = "";
        advertiseObject.Photo = "";
        advertiseObject.Modifier = "Nasrin Daftarchi";
        advertiseObject.ModificationDate = getDatetime();
        advertiseObject.IsDeleted = false;
        this.setState({ advertiseObject });
        this.validator.hideMessages();
    }
    onEdithandler = (list) => {
        let advertiseObject = { ...this.state.advertiseObject };
        advertiseObject.AdvertiseId = list.AdvertiseId;
        advertiseObject.Title = list.Title;
        advertiseObject.Photo = list.Photo;
        advertiseObject.Modifier = list.Modifier;
        advertiseObject.ModificationDate = list.ModificationDate;
        advertiseObject.IsDeleted = list.IsDeleted;
        this.setState({ advertiseObject });
    }
    handleUpload = (fileName) => {
        let advertiseObject = { ...this.state.advertiseObject };
        if (fileName !== "") {
            advertiseObject.Photo = fileName;
            this.setState({ advertiseObject });
        }
    }
    handelChange = e => {
        let advertiseObject = { ...this.state.advertiseObject };
        advertiseObject[e.currentTarget.name] = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        this.setState({ advertiseObject });
    }
    setCurrentTime = () => {
        let advertiseObject = { ...this.state.advertiseObject };
        advertiseObject.ModificationDate = getDatetime();
        this.setState({ advertiseObject });
    }
    handelSubmit = () => {
        if (this.validator.allValid()) {
            this.setCurrentTime();
            axios.post(this.state.apiEndPoint + 'Advertise/Add', this.state.advertiseObject, {})
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
        const { dataList, dataTitles, columnList, pageSize, filteredItem, advertiseObject } = this.state;
        return (<div>
            <Container fluid className="table">
                <Row className="mb-2">
                    <Col xs="12" className="text-left text-dark p-0" >
                        <h3 className="text-primary"> Advetise</h3>
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col sm="12" md="6" className="text-left m-0 p-0">
                        <TableContent filter={filteredItem} dataList={dataList} dataTitles={dataTitles} columnList={columnList} onEdithandler={this.onEdithandler} pageSize={pageSize} />
                    </Col>
                    <Col sm="12" md="6" className="text-left border border-primary p-3 mt-3 rounded">
                        <div>
                            <Button onClick={() => this.onNewHandeler()} className="btn btn-sm mb-3 ">New Advertise</Button>
                            <FileUpload postMethod={'Advertise/UploadFile'} title="Photo(jpg,jpeg)" accept={['jpeg', 'jpg']} specifiedFileName="NoName" onUpload={this.handleUpload} />
                            {this.validator.message('video or image', advertiseObject.Photo, 'required|min:1', { className: 'alert alert-danger' })}
                            <Form.Group>
                                <Form.Label htmlFor="title"><h6 className="text-primary mb-0 ml-1" >Advertise Title:</h6></Form.Label>
                                <Form.Control id="title" name="Title" type="text" placeholder="Enter Advertise Title" value={advertiseObject.Title} onChange={this.handelChange} />
                                {this.validator.message('title', advertiseObject.Title, 'required|max:100', { className: 'alert alert-danger' })}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label><h6 className="text-primary mb-0 ml-1" >Modefier:</h6></Form.Label>
                                <Form.Control type="text" name="Modifier" value={advertiseObject.Modifier} onChange={this.handelChange} disabled />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label><h6 className="text-primary mb-0 ml-1" >Modefication Date:</h6></Form.Label>
                                <Form.Control type="text" name="ModificationDate" value={advertiseObject.ModificationDate} onChange={this.handelChange} disabled />
                            </Form.Group>
                            <Form.Group>
                                {advertiseObject.AdvertiseId !== "" && <h6 className="text-primary mb-0 ml-1" ><Form.Check inline name="IsDeleted" label="Is Deleted?" checked={advertiseObject.IsDeleted} onChange={this.handelChange} /></h6>}
                            </Form.Group>
                            <Button className="btn btn-sm float-right" onClick={this.handelSubmit} >Submit Advertise</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>);
    }
}
export default DashboardAdvertise;
