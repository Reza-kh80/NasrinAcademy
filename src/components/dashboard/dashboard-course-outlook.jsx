import React, { Component } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { Container, Row, Col, Button } from 'reactstrap';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { getDatetime } from './../../utils/datetime';
class DashboardCourseOutlook extends Component {
    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator();
        this.state = {
            courseOutlookObject: {
                CourseOutlookId: "",
                Title: "",
                TitleFr: "",
                TitleFa: "",
                Description: "",
                DescriptionFr: "",
                DescriptionFa: "",
                Modifier: "Nasrin Daftarchi",
                ModificationDate: getDatetime(),
                IsDeleted: false,
            },
            apiEndPoint: process.env.REACT_APP_APIEndPoint,
        }
    }
    getCourseOutlook = async () => {
        await axios.get(this.state.apiEndPoint + 'CourseOutlook/Get').then(response => {
            this.setState({ courseOutlookObject: response.data });
        });
    }
    componentDidMount() {
        this.getCourseOutlook();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.courseOutlookObject !== this.state.courseOutlookObject) {
        }
    }
    handleChange = e => {
        e.persist();
        let courseOutlookObject = { ...this.state.courseOutlookObject };
        courseOutlookObject[e.currentTarget.name] = e.target.value;
        this.setState({ courseOutlookObject });
    }
    setCurrentTime = () => {
        let courseOutlookObject = { ...this.state.courseOutlookObject };
        courseOutlookObject.ModificationDate = getDatetime();
        this.setState({ courseOutlookObject });
    }
    handelSubmit = () => {
        if (this.validator.allValid()) {
            this.setCurrentTime();
            axios.post(this.state.apiEndPoint + 'CourseOutlook/Add', this.state.courseOutlookObject, {})
                .then(response => {
                    alert('You submitted the form and stuff!');
                    this.validator.hideMessages();
                    this.getCourseOutlook();
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
        const {
            Title,
            TitleFr,
            TitleFa,
            Description,
            DescriptionFr,
            DescriptionFa,
            Modifier,
            ModificationDate,
        } = this.state.courseOutlookObject;
        return (<div>
            <Container fluid className="table">
                <Row className="mb-2">
                    <Col xs="12" className="text-left text-dark p-0" >
                        <h3 className="text-primary"> Course Outlook</h3>
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col xs="12" className="text-left border border-primary p-3 rounded">
                        <div>
                            <Form onSubmit={this.handelSubmit}>
                                <Row>
                                    <Col xs="12" md="4" >
                                        <Form.Group>
                                            <Form.Label><h6 className="text-primary mb-0 ml-1" >Modefier:</h6></Form.Label>
                                            <Form.Control type="text" name="Modifier" value={Modifier} onChange={this.handleChange} disabled />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label><h6 className="text-primary mb-0 ml-1" >Modefication Date:</h6></Form.Label>
                                            <Form.Control type="text" name="ModificationDate" value={ModificationDate} onChange={this.handleChange} disabled />
                                        </Form.Group>

                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12" md="4">
                                        <Form.Group>
                                            <Form.Label htmlFor="title"><h6 className="text-primary mb-0 ml-" >Course Outlook Title  (English):</h6></Form.Label>
                                            <Form.Control id="title" name="Title" type="text" placeholder="Title  (English)" value={Title} onChange={this.handleChange} />
                                            {this.validator.message('title ', Title, 'required|max:290', { className: 'alert alert-danger' })}
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label htmlFor="description"><h6 className="text-primary mb-0 ml-" >Course Outlook Description  (English):</h6></Form.Label>
                                            <Form.Control id="description" name="Description" as="textarea" className="wrap" placeholder="Description  (English)" rows={15} value={Description} onChange={this.handleChange} />
                                            {this.validator.message('description ', Description, 'required|max:8000', { className: 'alert alert-danger' })}
                                        </Form.Group>
                                    </Col>
                                    <Col xs="12" md="4">
                                        <Form.Group>
                                            <Form.Label htmlFor="titlefr"><h6 className="text-primary mb-0 ml-" >Course Outlook Title  (French):</h6></Form.Label>
                                            <Form.Control id="titlefr" name="TitleFr" type="text" placeholder="Title  (French)" value={TitleFr} onChange={this.handleChange} />
                                            {this.validator.message('title  French', TitleFr, 'required|max:290', { className: 'alert alert-danger' })}
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label htmlFor="descriptionfr"><h6 className="text-primary mb-0 ml-" >Course Outlook Description  (French):</h6></Form.Label>
                                            <Form.Control id="descriptionfr" name="DescriptionFr" as="textarea" className="wrap" placeholder="Description  (French)" rows={15} value={DescriptionFr} onChange={this.handleChange} />
                                            {this.validator.message('description  french', DescriptionFr, 'required|max:8000', { className: 'alert alert-danger' })}
                                        </Form.Group>
                                    </Col>
                                    <Col xs="12" md="4">
                                        <Form.Group>
                                            <Form.Label htmlFor="titlefa"><h6 className="text-primary mb-0 ml-" >Course Outlook Title  (Farsi):</h6></Form.Label>
                                            <Form.Control id="titlefa" name="TitleFa" type="text" dir="rtl" placeholder="عنوان فارسی " value={TitleFa} onChange={this.handleChange} />
                                            {this.validator.message('title  Farsi', TitleFa, 'required|max:290', { className: 'alert alert-danger' })}
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label htmlFor="descriptionfa"><h6 className="text-primary mb-0 ml-" >Course Outlook Description  (Farsi):</h6></Form.Label>
                                            <Form.Control id="descriptionfa" name="DescriptionFa" as="textarea" className="wrap" dir="rtl" placeholder="توضیحات فارسی " rows={15} value={DescriptionFa} onChange={this.handleChange} />
                                            {this.validator.message('description  farsi', DescriptionFa, 'required|max:8000', { className: 'alert alert-danger' })}
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Form>
                            <Button className="btn btn-sm float-right" onClick={this.handelSubmit} >
                                Submit Course Outlook
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>);
    }
}
export default DashboardCourseOutlook;
