import React, { Component } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { Container, Row, Col, Button } from 'reactstrap';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { getDatetime } from '../../utils/datetime';
const FileUpload = React.lazy(() => import('../general/fileUpload'));
class DashboardMainAdvertise extends Component {
    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator();
        this.state = {
            mainAdvertiseObject: {
                AdvertiseId: "",
                Title: "",
                Photo: "",
                TriggerTime: "",
                Modifier: "Nasrin Daftarchi",
                ModificationDate: getDatetime(),
                IsDeleted: false,
            },
            apiEndPoint: process.env.REACT_APP_APIEndPoint,
            isDisabled: false
        }
    }
    getMainAdvertise = async () => {
        await axios.get(this.state.apiEndPoint + 'MainAdvertise/Get').then(response => {
            if (response.data.TriggerTime !== 0) {
                this.setState({ isDisabled: false });
            }
            else {
                this.setState({ isDisabled: true });
            }
            this.setState({ mainAdvertiseObject: response.data });
        });
    }
    componentDidMount() {
        this.getMainAdvertise();
    }
    // componentDidUpdate(prevProps, prevState) {

    // }
    handleChange = e => {
        e.persist();
        let mainAdvertiseObject = { ...this.state.mainAdvertiseObject };
        mainAdvertiseObject[e.currentTarget.name] = e.target.value;
        this.setState({ mainAdvertiseObject });
    }
    handleIsDisplayed = e => {
        e.persist();
        let mainAdvertiseObject = { ...this.state.mainAdvertiseObject };
        mainAdvertiseObject.TriggerTime = e.target.checked ? 0 : '';
        this.setState({ isDisabled: !this.state.isDisabled });
        this.setState({ mainAdvertiseObject });
    }
    handleUpload = (fileName) => {
        let mainAdvertiseObject = { ...this.state.mainAdvertiseObject };
        if (fileName !== "") {
            mainAdvertiseObject.Photo = fileName;
            this.setState({ mainAdvertiseObject });
        }
    }
    setCurrentTime = () => {
        let mainAdvertiseObject = { ...this.state.mainAdvertiseObject };
        mainAdvertiseObject.ModificationDate = getDatetime();
        this.setState({ mainAdvertiseObject });
    }
    handelSubmit = () => {
        this.forceUpdate();
        if (this.validator.allValid()) {
            this.setCurrentTime();
            console.log(this.state.mainAdvertiseObject);
            axios.post(this.state.apiEndPoint + 'MainAdvertise/Add', this.state.mainAdvertiseObject, {})
                .then(response => {
                    alert('You submitted the form and stuff!');
                    this.validator.hideMessages();
                    this.getMainAdvertise();
                })
                .catch(function (error) {
                    alert('Something went wrong!');
                })
        } else {
            console.log("error");
            this.validator.showMessages();
            this.forceUpdate();
        }
    }
    render() {
        const {
            Photo,
            TriggerTime,
        } = this.state.mainAdvertiseObject;
        return (<div>
            <Container fluid className="table">
                <Row className="mb-2">
                    <Col xs="12" className="text-center text-dark p-0 m-4" >
                        <h3 className="text-primary"> MainAdvertise</h3>
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col sm="12" md="12" className="text-left border border-primary p-3 rounded">
                        <div>
                            <Form onSubmit={this.handelSubmit}>
                                <Row>
                                    <Col sm="12" md="3">
                                        <Form.Group>
                                            <h6 className="text-primary mb-0 ml-1" ><Form.Check inline label="Make it invisible" checked={this.state.isDisabled} onChange={this.handleIsDisplayed} /></h6>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="12" md="6">
                                        <Form.Group>
                                            <Form.Label htmlFor="triggerTime"><h6 className="text-primary mb-0 ml-1" >Start After ? milisecond (Each 1000 = 1 Second)</h6></Form.Label>
                                            <Form.Control id="triggerTime" name="TriggerTime" type="text" placeholder="enter title" value={TriggerTime} onChange={this.handleChange} disabled={this.state.isDisabled} />
                                            {this.validator.message('trigger time', TriggerTime, 'required|integer|min:0,num|max:600000,num', { className: 'alert alert-danger' })}
                                        </Form.Group>
                                    </Col>
                                    <Col sm="12" md="6">
                                        <Form.Group>
                                            <FileUpload postMethod={'MainAdvertise/UploadFile'} title="Popup Advertise Image" accept={['jpg', 'jpeg']} specifiedFileName="NoName" onUpload={this.handleUpload} disabled={this.state.isDisabled} />
                                            {this.validator.message('image', Photo, 'required|min:1', { className: 'alert alert-danger' })}
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Form>
                            <Button className="btn btn-sm float-right" onClick={this.handelSubmit} >
                                Submit MainAdvertise
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>);
    }
}
export default DashboardMainAdvertise;
