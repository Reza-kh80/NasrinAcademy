import React, { Component } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { Container, Row, Col, Button } from 'reactstrap';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { getDatetime } from '../../utils/datetime';
class DashboardAgreement extends Component {
    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator();
        this.state = {
            agreementObject: {
                AgreementId: "",
                TitleStudent: "",
                DescriptionStudent: "",
                TitleStudentFa: "",
                DescriptionStudentFa: "",
                TitleTeacher: "",
                DescriptionTeacher: "",
                TitleTeacherFa: "",
                DescriptionTeacherFa: "",
                Modifier: "Nasrin Daftarchi",
                ModificationDate: getDatetime(),
                IsDeleted: false,
            },
            apiEndPoint: process.env.REACT_APP_APIEndPoint,
        }
    }
    getAgreement = async () => {
        await axios.get(this.state.apiEndPoint + 'Agreement/Get').then(response => {
            this.setState({ agreementObject: response.data });
        });
    }
    componentDidMount() {
        this.getAgreement();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.agreementObject !== this.state.agreementObject) {
        }
    }
    handleChange = e => {
        e.persist();
        let agreementObject = { ...this.state.agreementObject };
        agreementObject[e.currentTarget.name] = e.target.value;
        this.setState({ agreementObject });
    }
    setCurrentTime = () => {
        let agreementObject = { ...this.state.agreementObject };
        agreementObject.ModificationDate = getDatetime();
        this.setState({ agreementObject });
    }
    handelSubmit = () => {
        if (this.validator.allValid()) {
            this.setCurrentTime();
            axios.post(this.state.apiEndPoint + 'Agreement/Add', this.state.agreementObject, {})
                .then(response => {
                    alert('You submitted the form and stuff!');
                    this.validator.hideMessages();
                    this.getAgreement();
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
            TitleStudent,
            DescriptionStudent,
            TitleTeacher,
            DescriptionTeacher,
            TitleStudentFa,
            DescriptionStudentFa,
            TitleTeacherFa,
            DescriptionTeacherFa,
        } = this.state.agreementObject;
        return (<div>
            <Container fluid className="table">
                <Row className="mb-2">
                    <Col xs="12" className="text-center text-dark p-0 m-4" >
                        <h3 className="text-primary"> Agreement</h3>
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col sm="12" md="12" className="text-left border border-primary p-3 rounded">
                        <div>
                            <Form onSubmit={this.handelSubmit}>
                                <Row>
                                    <Col sm="12" md="6">
                                        <Form.Group>
                                            <Form.Label htmlFor="titleStudent"><h6 className="text-primary mb-0 ml-1" >Student Rules Title</h6></Form.Label>
                                            <Form.Control id="titleStudent" name="TitleStudent" type="text" placeholder="enter title" value={TitleStudent} onChange={this.handleChange} />
                                            {this.validator.message('student rules title', TitleStudent, 'required|max:290', { className: 'alert alert-danger' })}
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label htmlFor="descriptionStudent"><h6 className="text-primary mb-0 ml-1" >Student Rules</h6></Form.Label>
                                            <Form.Control id="descriptionStudent" name="DescriptionStudent" as="textarea" className="wrap" placeholder="enter description" rows={15} value={DescriptionStudent} onChange={this.handleChange} />
                                            {this.validator.message('student rules', DescriptionStudent, 'required', { className: 'alert alert-danger' })}
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label htmlFor="titleTeacher"><h6 className="text-primary mb-0 ml-1" >Teacher Rules Title</h6></Form.Label>
                                            <Form.Control id="titleTeacher" name="TitleTeacher" type="text" placeholder="enter title" value={TitleTeacher} onChange={this.handleChange} />
                                            {this.validator.message('teacher rules title', TitleTeacher, 'required|max:290', { className: 'alert alert-danger' })}
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label htmlFor="descriptionTeacher"><h6 className="text-primary mb-0 ml-1" >Teachers Rules</h6></Form.Label>
                                            <Form.Control id="descriptionTeacher" name="DescriptionTeacher" as="textarea" className="wrap" placeholder="enter description" rows={15} value={DescriptionTeacher} onChange={this.handleChange} />
                                            {this.validator.message('teacher rules', DescriptionTeacher, 'required', { className: 'alert alert-danger' })}
                                        </Form.Group>

                                    </Col>
                                    <Col sm="12" md="6" className="text-right" dir="rtl">
                                        <Form.Group>
                                            <Form.Label htmlFor="titleStudentFa"><h6 className="text-primary mb-0 ml-1" >عنوان مقررات برای دانشجویان</h6></Form.Label>
                                            <Form.Control id="titleStudentFa" name="TitleStudentFa" type="text" placeholder="enter title" value={TitleStudentFa} onChange={this.handleChange} />
                                            {this.validator.message('student rules title farsi', TitleStudentFa, 'required|max:290', { className: 'alert alert-danger' })}
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label htmlFor="descriptionStudentFa"><h6 className="text-primary mb-0 ml-1" >مقررات دانشجویان</h6></Form.Label>
                                            <Form.Control id="descriptionStudentFa" name="DescriptionStudentFa" as="textarea" className="wrap" placeholder="enter description" rows={15} value={DescriptionStudentFa} onChange={this.handleChange} />
                                            {this.validator.message('student rules farsi', DescriptionStudentFa, 'required', { className: 'alert alert-danger' })}
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label htmlFor="titleTeacherFa"><h6 className="text-primary mb-0 ml-1" >عنوان مقررات اساتید</h6></Form.Label>
                                            <Form.Control id="titleTeacherFa" name="TitleTeacherFa" type="text" placeholder="enter title" value={TitleTeacherFa} onChange={this.handleChange} />
                                            {this.validator.message('teacher rules title farsi', TitleTeacherFa, 'required|max:290', { className: 'alert alert-danger' })}
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label htmlFor="descriptionTeacherFa"><h6 className="text-primary mb-0 ml-1" >مقررات اساتید</h6></Form.Label>
                                            <Form.Control id="descriptionTeacherFa" name="DescriptionTeacherFa" as="textarea" className="wrap" placeholder="enter description" rows={15} value={DescriptionTeacherFa} onChange={this.handleChange} />
                                            {this.validator.message('teacher rules title', DescriptionTeacherFa, 'required', { className: 'alert alert-danger' })}
                                        </Form.Group>

                                    </Col>
                                </Row>
                            </Form>
                            <Button className="btn btn-sm float-right" onClick={this.handelSubmit} >
                                Submit Agreement
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>);
    }
}
export default DashboardAgreement;
