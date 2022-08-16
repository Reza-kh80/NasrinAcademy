import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { getDatetime } from './../../utils/datetime';
import TableContent from '../general/table';
import SimpleReactValidator from 'simple-react-validator';
class DashboardSiteMenu extends Component {
    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator();
        this.state = {
            apiEndPoint: process.env.REACT_APP_APIEndPoint,
            menuObject: {
                MenuId: "",
                Title: "",
                TitleFr: "",
                TitleFa: "",
                Modifier: "Nasrin Daftarchi",
                ModificationDate: getDatetime(),
                IsDeleted: false,
            },
            pageSize: 10,
            dataList: [],
            dataTitles: ["ID", 'Title', 'Edit'],
            columnList: ["id", "Title"],
            filteredItem: "Title"
        }
    }
    getData = async () => {
        const dataList = [];
        await axios.get(this.state.apiEndPoint + 'SideMenu/GetAll').then(response => {
            let md = response.data
            md.map((m, i) =>
                dataList.push({
                    id: i + 1,
                    Title: m.Title,
                    TitleFr: m.TitleFr,
                    TitleFa: m.TitleFa,
                    Modifier: m.Modifier,
                    ModificationDate: m.ModificationDate,
                    IsDeleted: m.IsDeleted,
                    MenuId: m.MenuId,
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
        const menuObject = { ...this.state.menuObject };
        menuObject.MenuId = "";
        menuObject.Title = "";
        menuObject.TitleFr = "";
        menuObject.TitleFa = "";
        menuObject.Modifier = "Nasrin Daftarchi";
        menuObject.ModificationDate = getDatetime();
        menuObject.IsDeleted = false;
        this.setState({ menuObject });
        this.validator.hideMessages();
    }
    onEdithandler = (list) => {
        let menuObject = { ...this.state.menuObject };
        menuObject.MenuId = list.MenuId;
        menuObject.Title = list.Title;
        menuObject.TitleFr = list.TitleFr;
        menuObject.TitleFa = list.TitleFa;
        menuObject.Modifier = list.Modifier;
        menuObject.ModificationDate = list.ModificationDate;
        menuObject.IsDeleted = list.IsDeleted;
        this.setState({ menuObject });
    }
    handleChange = e => {
        let menuObject = { ...this.state.menuObject };
        menuObject[e.currentTarget.name] = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        this.setState({ menuObject });
    }
    setCurrentTime = () => {
        let menuObject = { ...this.state.menuObject };
        menuObject.ModificationDate = getDatetime();
        this.setState({ menuObject });
    }
    handleSubmit = () => {
        const { MenuId } = this.state.menuObject;
        if (MenuId === 1 || MenuId === 2 || MenuId === 3) {
            alert('*** Your Are Not Allowed To Change This Filed !!! ***');
            return;
        }
        else {
            if (this.validator.allValid()) {
                this.setCurrentTime();
                axios.post(this.state.apiEndPoint + 'SideMenu/Add', this.state.menuObject, {})
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
    }
    render() {
        const { dataList, dataTitles, columnList, pageSize, filteredItem, menuObject } = this.state;
        return (<div>
            <Container fluid className="table">
                <Row className="mb-2">
                    <Col xs="12" className="text-left text-dark p-0" >
                        <h3 className="text-primary"> Site Menu</h3>
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col sm="12" md="6" className="text-left m-0 p-0">
                        <TableContent filter={filteredItem} dataList={dataList} dataTitles={dataTitles} columnList={columnList} onEdithandler={this.onEdithandler} pageSize={pageSize} />
                    </Col>
                    <Col sm="12" md="6" className="text-left border border-primary p-3 rounded">
                        <div>
                            <Form>
                                <Button onClick={() => this.onNewHandeler()} className="btn btn-sm mb-3 ">New Menu</Button>
                                <Form.Group>
                                    <Form.Label htmlFor="title"><h6 className="text-primary mb-0 ml-1" >Menu Title (English):</h6></Form.Label>
                                    <Form.Control id="title" name="Title" type="text" placeholder="Menu Title (English)" value={menuObject.Title} onChange={this.handleChange} />
                                    {this.validator.message('title', menuObject.Title, 'required|max:50', { className: 'alert alert-danger' })}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor="titlefr"><h6 className="text-primary mb-0 ml-1" >Menu Title (French):</h6></Form.Label>
                                    <Form.Control id="titlefr" name="TitleFr" type="text" placeholder="Menu Title (French)" value={menuObject.TitleFr} onChange={this.handleChange} />
                                    {this.validator.message('title french', menuObject.TitleFr, 'required|max:50', { className: 'alert alert-danger' })}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor="titlefa"><h6 className="text-primary mb-0 ml-1" >Menu Title (Farsi):</h6></Form.Label>
                                    <Form.Control id="titlefa" name="TitleFa" type="text" dir="rtl" placeholder="عنوان منوی فارسی" value={menuObject.TitleFa} onChange={this.handleChange} />
                                    {this.validator.message('title farsi', menuObject.TitleFa, 'required|max:50', { className: 'alert alert-danger' })}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label><h6 className="text-primary mb-0 ml-1" >Modefier:</h6></Form.Label>
                                    <Form.Control type="text" name="Modifier" value={menuObject.Modifier} onChange={this.handleChange} disabled />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label><h6 className="text-primary mb-0 ml-1" >Modefication Date:</h6></Form.Label>
                                    <Form.Control type="text" name="ModificationDate" value={menuObject.ModificationDate} onChange={this.handleChange} disabled />
                                </Form.Group>
                                <Form.Group>
                                    {menuObject.MenuId !== "" && <h6 className="text-primary mb-0 ml-1" ><Form.Check inline name="IsDeleted" label="Is Deleted?" checked={menuObject.IsDeleted} onChange={this.handleChange} /></h6>}
                                </Form.Group>
                            </Form>
                            <Button className="btn btn-sm float-right" onClick={this.handleSubmit} >Submit Menu</Button>
                        </div>

                    </Col>
                </Row>
            </Container>
        </div>);
    }
}
export default DashboardSiteMenu;
