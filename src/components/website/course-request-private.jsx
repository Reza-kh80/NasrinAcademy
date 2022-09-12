import React, { Component } from 'react';
import { Container, Row, Col, Button, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import { getDatetime } from '../../utils/datetime';
import FileUpload from '../general/fileUpload';
import SimpleReactValidator from 'simple-react-validator';
class CourseRequestPrivate extends Component {
    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator();
        this.state = {
            mediaEndMoint: process.env.REACT_APP_MediaEndPoint,
            apiEndPoint: process.env.REACT_APP_APIEndPoint,
            requestObject: {
                StudentId: null,
                Name: "",
                Phone: "",
                Email: "",
                Photo: "",
                Address: "",
                Message: "",
                IsRegistered: false,
                Modifier: "",
                ModificationDate: getDatetime(),
                IsDeleted: false,
                PrivateTeacherCourseId: this.props.teacherCourseId,
                SignedAgreement: false,
                //
                UserId: "",
                Username: "studentRequest@nasinacademy.com",
                Password: "",
                RoleId: "2",
            },
        }
    }
    componentDidMount() {
        this.onNewHandeler();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.requestObject !== this.state.requestObject) {
            // console.log(this.state.requestObject)
        }
    }
    onNewHandeler() {
        let requestObject = { ...this.state.requestObject };
        requestObject.StudentId = "";
        requestObject.Name = "";
        requestObject.Phone = "";
        requestObject.Email = "";
        requestObject.Photo = "";
        requestObject.Address = "";
        requestObject.Message = "";
        requestObject.IsRegistered = false;
        requestObject.PrivateTeacherCourseId = this.props.teacherCourseId;
        requestObject.Modifier = "anonymous";
        requestObject.ModificationDate = getDatetime();
        requestObject.IsDeleted = false;
        requestObject.SignedAgreement = false;
        this.setState({ requestObject });
    }
    onUpload = (fileName) => {
        let requestObject = { ...this.state.requestObject };
        if (fileName !== "") {
            requestObject.Photo = fileName;
            this.setState({ requestObject });
        }
    }
    handleChange = e => {
        let requestObject = { ...this.state.requestObject };
        requestObject[e.currentTarget.name] = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        this.setState({ requestObject });
    }
    setCurrentTime = () => {
        let requestObject = { ...this.state.requestObject };
        requestObject.ModificationDate = getDatetime();
        this.setState({ requestObject });
    }
    handleSubmit = () => {
        if (this.validator.allValid()) {
            this.setCurrentTime();
            axios.post(this.state.apiEndPoint + 'Student/AddPrivate', this.state.requestObject, {})
                .then(response => {
                    this.props.onHide();
                    alert('You have been registered successfully');
                    // this.validator.hideMessages();
                    // this.onNewHandeler();
                })
                .catch(function (error) {
                    // alert('Something went wrong! try again');
                    alert(error);
                })
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }
    getHeading = (lang) => {
        let heading = []
        if (lang === 'en') {
            heading.push('New Request')
            heading.push('Photo(jpeg,jpg)')
            heading.push('Full Name')
            heading.push("Exp: Nasrin Daftarchi")
            heading.push("Phone Number")
            heading.push("+1-(xxx)xxx-xxxx")
            heading.push("Email")
            heading.push("(optional) x@x.com ")
            heading.push("Address")
            heading.push("(optional) Your address here ... ")
            heading.push("Message")
            heading.push("(optional) Your message here ... ")
            heading.push("Submit Request")

        }

        if (lang === 'fr') {
            heading.push('Nouvelle requête')
            heading.push('Photo(jpeg,jpg)')
            heading.push('Nom Complet')
            heading.push("Exp: Nasrin Daftarchi")
            heading.push("Numéro de téléphone")
            heading.push("+1-(xxx)xxx-xxxx")
            heading.push("E-mail")
            heading.push("(optional) x@x.com")
            heading.push("Address")
            heading.push("(optional) Votre adresse ...")
            heading.push("Message")
            heading.push("(optional) Votre message ...")
            heading.push("Envoyer la demande")

        }

        if (lang === 'fa') {
            heading.push('فرم جدید')
            heading.push('تصویر(jpg,jpeg)')
            heading.push('نام و نام خانوادگی')
            heading.push("نمونه: نسرین دفترچی")
            heading.push("تلفن همراه")
            heading.push("+98-(xxx)xxx-xxxx")
            heading.push("ایمیل")
            heading.push("x@x.com")
            heading.push("آدرس")
            heading.push(":آدرس")
            heading.push("پیام")
            heading.push("پیام خود را وارد کنید")
            heading.push("ارسال درخواست")

        }

        if (lang === 'ar') {
            heading.push('طلب جديد')
            heading.push('Photo(jpeg,jpg)')
            heading.push('الاسم الكامل')
            heading.push("مثال: نسرين دفترتشي")
            heading.push("رقم الهاتف")
            heading.push("+1-(xxx)xxx-xxxx")
            heading.push("البريد الإلكتروني")
            heading.push("(اختياري) x@x.com ")
            heading.push("تبوك")
            heading.push("(اختياري) عنوانك هنا ... ")
            heading.push("رسالة")
            heading.push("(اختياري) رسالتك هنا ... ")
            heading.push("تقديم الطلب")

        }
        return heading
    }
    render() {
        const { requestObject } = this.state;
        const lang = localStorage.getItem('lang');
        return (<div className="m-0 p-0">
            <Container fluid className="m-0 p-0" dir={lang === 'fa' ? 'rtl' : 'ltr'} >
                <Row className="mb-2">
                    <Col xs="12" className={lang === 'fa' ? "text-right text-dark pl-3 m-0" : "text-left text-dark pl-3 m-0"} >
                        <Button onClick={() => this.onNewHandeler()} className="btn btn-sm mb-3 ">{this.getHeading(lang)[0]}</Button>
                    </Col>
                </Row>
                <Row>
                    <Col className={lang === 'fa' ? "text-right w-100 text-dark" : "text-left w-100 text-dark"}>
                        <Row form>
                            <Col xs={12} lg={6}>
                                <FileUpload postMethod={'Student/UploadFile'} title={this.getHeading(lang)[1]} accept={['jpeg', 'jpg']} specifiedFileName="NoName" onUpload={this.onUpload} />
                                {this.validator.message('photo', requestObject.Photo, 'required|min:1', { className: 'alert alert-danger' })}
                                <FormGroup>
                                    <Label for="fullname">{this.getHeading(lang)[2]}</Label>
                                    <Input type="text" id="fullname" name="Name" value={requestObject.Name} onChange={this.handleChange} placeholder={this.getHeading(lang)[3]} />
                                </FormGroup>
                                {this.validator.message('fullname', requestObject.Name, 'required|max:95', { className: 'alert alert-danger' })}
                                <FormGroup >
                                    <Label for="phone">{this.getHeading(lang)[4]}</Label>
                                    <Input className='text-left' dir="ltr" type="text" id="phone" name="Phone" value={requestObject.Phone} onChange={this.handleChange} placeholder={this.getHeading(lang)[5]} />
                                </FormGroup>
                                {this.validator.message('phone', requestObject.Phone, 'required|max:30', { className: 'alert alert-danger' })}
                                <FormGroup>
                                    <Label for="email">{this.getHeading(lang)[6]}</Label>
                                    <Input className='text-left' dir="ltr" type="text" id="email" name="Email" value={requestObject.Email} onChange={this.handleChange} placeholder={this.getHeading(lang)[7]} />
                                </FormGroup>
                                {this.validator.message('email', requestObject.Email, 'max:200', { className: 'alert alert-danger' })}
                            </Col>
                            <Col xs={12} lg={6}>
                                <FormGroup>
                                    <Label for="address">{this.getHeading(lang)[8]}</Label>
                                    <Input type="textarea" id="address" rows={2} name="Address" value={requestObject.Address} onChange={this.handleChange} placeholder={this.getHeading(lang)[9]} />
                                </FormGroup>
                                {this.validator.message('address', requestObject.Address, 'max:300', { className: 'alert alert-danger' })}
                                <FormGroup>
                                    <Label for="message">{this.getHeading(lang)[10]}</Label>
                                    <Input type="textarea" id="message" rows={7} name="Message" value={requestObject.Message} onChange={this.handleChange} placeholder={this.getHeading(lang)[11]} />
                                </FormGroup>
                                {this.validator.message('message', requestObject.Message, 'max:300', { className: 'alert alert-danger' })}
                            </Col>
                        </Row>
                        <Button className={lang === 'fa' ? "btn btn-sm float-left" : "btn btn-sm float-right"} onClick={this.handleSubmit} >{this.getHeading(lang)[12]}</Button>
                    </Col>
                </Row>
            </Container>
        </div >);
    }
}
export default CourseRequestPrivate;

