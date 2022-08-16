import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import Form from 'react-bootstrap/Form';
import SimpleReactValidator from 'simple-react-validator';
import axios from 'axios';
import UserContext from '../../utils/user-context';
import { getDatetime } from './../../utils/datetime';
const TableContent = React.lazy(() => import('../general/table'));
class DeanLevel extends Component {
    static contextType = UserContext;
    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator();
        this.state = {
            apiEndPoint: process.env.REACT_APP_APIEndPoint,
            levelObject: {
                LevelId: "",
                Name: "",
                Modifier: "",
                ModificationDate: getDatetime(),
                IsDeleted: false,
            },
            pageSize: 15,
            dataList: [],
            dataTitles: ["ID", 'Name', 'Modifier', 'Date', 'Edit'],
            columnList: ["id", "Name", 'Modifier', 'ModificationDate',],
            filteredItem: "Name"
        }
    }
    getData = async () => {
        const dataList = [];
        await axios.get(this.state.apiEndPoint + 'Level/GetAll').then(response => {
            let md = response.data
            md.map((m, i) =>
                dataList.push({
                    id: i + 1,
                    Name: m.Name,
                    Modifier: m.Modifier,
                    ModificationDate: m.ModificationDate,
                    IsDeleted: m.IsDeleted,
                    LevelId: m.LevelId,
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
        const levelObject = { ...this.state.levelObject };
        levelObject.LevelId = "";
        levelObject.Name = "";
        levelObject.Modifier = this.context.Username;
        levelObject.ModificationDate = getDatetime();
        levelObject.IsDeleted = false;
        this.setState({ levelObject });
        this.validator.hideMessages();
    }
    onEdithandler = (list) => {
        let levelObject = { ...this.state.levelObject };
        levelObject.LevelId = list.LevelId;
        levelObject.Name = list.Name;
        levelObject.Modifier = this.context.Username;
        levelObject.ModificationDate = getDatetime();
        levelObject.IsDeleted = list.IsDeleted;
        this.setState({ levelObject });
    }
    handleChange = e => {
        let levelObject = { ...this.state.levelObject };
        levelObject[e.currentTarget.name] = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        this.setState({ levelObject });
    }
    setCurrentTime = () => {
        let levelObject = { ...this.state.levelObject };
        levelObject.ModificationDate = getDatetime();
        this.setState({ levelObject });
    }
    handleSubmit = () => {
        if (this.validator.allValid()) {
            this.setCurrentTime();
            axios.post(this.state.apiEndPoint + 'Level/Add', this.state.levelObject, {})
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
        const { dataList, dataTitles, columnList, pageSize, filteredItem, levelObject } = this.state;
        return (<div>
            <Container fluid className="table">
                <Row className="mb-2">
                    <Col xs="12" className="text-left text-dark p-0" >
                        <h3 className="text-primary"> Level</h3>
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col sm="12" md="6" className="text-left m-0 p-1">
                        <TableContent filter={filteredItem} dataList={dataList} dataTitles={dataTitles} columnList={columnList} onEdithandler={this.onEdithandler} pageSize={pageSize} />
                    </Col>
                    <Col sm="12" md="6" className="text-left border border-primary p-3 mt-3 rounded">
                        <div>
                            <Button onClick={() => this.onNewHandeler()} className="btn btn-sm mb-3 ">New Level</Button>
                            <Form.Group>
                                <Form.Label htmlFor="title"><h6 className="text-primary mb-0 ml-1" >Level Name:</h6></Form.Label>
                                <Form.Control id="title" name="Name" type="text" placeholder="Enter Level Name" value={levelObject.Name} onChange={this.handleChange} />
                                {this.validator.message('title', levelObject.Name, 'required|max:100', { className: 'alert alert-danger' })}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label htmlFor="modifier"><h6 className="text-primary mb-0 ml-1" >Modefier:</h6></Form.Label>
                                <Form.Label id="modifier" className="border rounded border-secondary d-block p-2">{levelObject.Modifier}</Form.Label>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label htmlFor="modificationDate"><h6 className="text-primary mb-0 ml-1" >Modefication Date:</h6></Form.Label>
                                <Form.Label id="modificationDate" className="border rounded border-dark d-block p-2">{levelObject.ModificationDate}</Form.Label>
                            </Form.Group>
                            <Form.Group>
                                {levelObject.LevelId !== "" && <h6 className="text-primary mb-0 ml-1" ><Form.Check inline name="IsDeleted" label="Is Deleted?" checked={levelObject.IsDeleted} onChange={this.handleChange} /></h6>}
                            </Form.Group>
                            <Button className="btn btn-sm float-right" onClick={this.handleSubmit} >Submit Level</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>);
    }
}
export default DeanLevel;
