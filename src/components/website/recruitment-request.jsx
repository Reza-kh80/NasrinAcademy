import React, { Component, Suspense } from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, Spinner } from 'reactstrap';
import axios from 'axios';
import { getDatetime } from './../../utils/datetime';
import FileUpload from '../general/fileUpload';
import SimpleReactValidator from 'simple-react-validator';
const MyDropdown = React.lazy(() => import('../general/dropdown'));
class RecruitmentRequest extends Component {
    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator();
        this.state = {
            mediaEndMoint: process.env.REACT_APP_MediaEndPoint,
            apiEndPoint: process.env.REACT_APP_APIEndPoint,
            requestObject: {
                TeacherId: "",
                Name: "",
                NameFr: "-",
                NameFa: "-",
                Phone: "",
                Email: "",
                Photo: "",
                Address: "",
                CoursesDescription: "",
                CoursesDescriptionFr: "-",
                CoursesDescriptionFa: "-",
                ExperienceYear: "",
                SessionPrice: "",
                SessionPriceFa: "Not Entered",
                ExperienceDetail: "",
                ExperienceDetailFr: "-",
                ExperienceDetailFa: "-",
                Education: "",
                EducationFr: "-",
                EducationFa: "-",
                Certificate: "",
                CertificateFr: "-",
                CertificateFa: "-",
                IsAvailableSun: false,
                IsAvailableMon: false,
                IsAvailableTue: false,
                IsAvailableWed: false,
                IsAvailableThu: false,
                IsAvailableFri: false,
                IsAvailableSat: false,
                HasArticle: false,
                HasFlashCard: false,
                //
                UserId: "",
                Username: "teachingRequest@nasrinacademy.com",
                Password: "",
                RoleId: "3",
                //
                Modifier: "unkown",
                ModificationDate: getDatetime(),
                IsDeleted: false,
                LanguageId: "",
                TeachingLevel: "-",
                TeachingLevelFr: "-",
                TeachingLevelFa: "-",
                TeachingAgeLevel: "-",
                TeachingAgeLevelFr: "-",
                TeachingAgeLevelFa: "-",
                BankNumber: "-",
                SignedAgreement: false,
                IsRegistered: false,
            },
            dropdownList: []

        }
    }
    getLanguage = async () => {
        let dropdownList = [];
        await axios.get(this.state.apiEndPoint + 'Language/DisplayDropdown').then(response => {
            let md = response.data
            md.map(m =>
                dropdownList.push({
                    value: m.LanguageId,
                    label: m.Name,
                }),
            );
            this.setState({ dropdownList });
        });
    }
    componentDidMount() {
        this.getLanguage();
        this.onNewHandeler();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.requestObject !== this.state.requestObject) {
            // console.log(this.state.requestObject)
        }
    }
    onNewHandeler() {
        let requestObject = { ...this.state.requestObject };
        requestObject.TeacherId = "";
        requestObject.Name = "";
        requestObject.NameFr = "-";
        requestObject.NameFa = "-";
        requestObject.Phone = "";
        requestObject.Email = "";
        requestObject.Photo = "";
        requestObject.Address = "";
        requestObject.CoursesDescription = "";
        requestObject.CoursesDescriptionFr = "-";
        requestObject.CoursesDescriptionFa = "-";
        requestObject.ExperienceYear = "";
        requestObject.SessionPrice = "";
        requestObject.SessionPriceFa = "Not Entred";
        requestObject.ExperienceDetail = "";
        requestObject.ExperienceDetailFr = "-";
        requestObject.ExperienceDetailFa = "-";
        requestObject.Education = "";
        requestObject.EducationFr = "-";
        requestObject.EducationFa = "-";
        requestObject.Certificate = "";
        requestObject.CertificateFr = "-";
        requestObject.CertificateFa = "-";
        requestObject.IsAvailableSun = false;
        requestObject.IsAvailableMon = false;
        requestObject.IsAvailableTue = false;
        requestObject.IsAvailableWed = false;
        requestObject.IsAvailableThu = false;
        requestObject.IsAvailableFri = false;
        requestObject.IsAvailableSat = false;
        requestObject.HasArticle = false;
        requestObject.HasFlashCard = false;
        //
        requestObject.UserId = "";
        requestObject.Username = "teachingRequest@nasrinacademy.com";
        requestObject.Password = "";
        requestObject.RoleId = "3";
        //
        requestObject.Modifier = "unkown";
        requestObject.ModificationDate = getDatetime();
        requestObject.IsDeleted = false;
        requestObject.LanguageId = "";
        requestObject.TeachingLevel = "-";
        requestObject.TeachingLevelFr = "-";
        requestObject.TeachingLevelFa = "-";
        requestObject.TeachingAgeLevel = "-";
        requestObject.TeachingAgeLevelFr = "-";
        requestObject.TeachingAgeLevelFa = "-";
        requestObject.BankNumber = "-";
        requestObject.SignedAgreement = false;
        requestObject.IsRegistered = false;
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
            axios.post(this.state.apiEndPoint + 'Teacher/Add', this.state.requestObject, {})
                .then(response => {
                    alert('You submitted the form and stuff!');
                    this.validator.hideMessages();
                    this.onNewHandeler();
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
            heading.push('Recruitment Request Form')
            heading.push('New Request')
            heading.push('Identification')
            heading.push('Photo(jpeg,jpg)')
            heading.push('Full Name')
            heading.push("Exp: Nasrin Daftarchi")
            heading.push("Phone Number")
            heading.push("+1-(xxx)xxx-xxxx")
            heading.push("Email")
            heading.push("x@x.com")
            heading.push("Address")
            heading.push("Enter your address")
            heading.push("Teaching Interests")
            heading.push("Teaching Languages")
            heading.push("English, French, ...")
            heading.push("Teaching Courses")
            heading.push("IELTS, TCF, ...")
            heading.push("Session Price")
            heading.push("Example:$15")
            heading.push("Experiences and Certificates")
            heading.push("Experience (Years)")
            heading.push("Exp: 2.5 years")
            heading.push("Detailed Experience")
            heading.push("Discribe your experience")
            heading.push("Education")
            heading.push("Name your education level")
            heading.push("Certificate")
            heading.push("Name your certificates (if applicable)")
            heading.push("Availability for classes")
            heading.push("Sunday")
            heading.push("Monday")
            heading.push("Tuesday")
            heading.push("Wednesday")
            heading.push("Thursday")
            heading.push("Friday")
            heading.push("Saturday")
            heading.push("Cooperation")
            heading.push("Are you interested to have video lessons? (optional)")
            heading.push("Are you interested to have your own flashcards? (optional)")
            heading.push("Submit Request")

        }
        else if (lang === 'fr') {
            heading.push('Formulaire de demande de recrutement')
            heading.push('Nouvelle requête')
            heading.push('Identification')
            heading.push('Photo(jpeg,jpg)')
            heading.push('Nom Complet')
            heading.push("Exp: Nasrin Daftarchi")
            heading.push("Numéro de téléphone")
            heading.push("+1-(xxx)xxx-xxxx")
            heading.push("E-mail")
            heading.push("x@x.com")
            heading.push("Adresse")
            heading.push("Entrez votre adresse")
            heading.push("Intérêts pédagogiques")
            heading.push("Enseigner les langues")
            heading.push("English, French, ...")
            heading.push("Cours d'enseignement")
            heading.push("IELTS, TCF, ...")
            heading.push("Prix de la session")
            heading.push("Exp:$15")
            heading.push("Expériences et certificats")
            heading.push("Expérience (Années)")
            heading.push("Exp: 2.5 Années")
            heading.push("Expérience détaillée")
            heading.push("Décrivez votre expérience")
            heading.push("Éducation")
            heading.push("Name your eduction level")
            heading.push("Certificats")
            heading.push("Nommez vos certificats (le cas échéant)")
            heading.push("Disponibilité pour les cours")
            heading.push("Dimanche")
            heading.push("Lundi")
            heading.push("Mardi")
            heading.push("Mercredi")
            heading.push("Jeudi")
            heading.push("Vendredi")
            heading.push("Samedi")
            heading.push("La coopération")
            heading.push("Êtes-vous intéressé par des leçons vidéo? (optionnel)")
            heading.push("Êtes-vous intéressé d'avoir vos propres cartes mémoire?")
            heading.push("Envoyer la demande")

        }
        else {
            heading.push('فرم درخواست همکاری')
            heading.push('فرم جدید')
            heading.push('مشخصات')
            heading.push('تصویر(jpg,jpeg)')
            heading.push('نام و نام خانوادگی')
            heading.push("نمونه: نسرین دفترچی")
            heading.push("تلفن همراه")
            heading.push("+98-(xxx)xxx-xxxx")
            heading.push("ایمیل")
            heading.push("x@x.com")
            heading.push("آدرس")
            heading.push(":آدرس")
            heading.push("علاقه مندی های ندریس")
            heading.push("زبان های تدریس")
            heading.push("English, French, ...")
            heading.push("دوره های تدریس")
            heading.push("IELTS, TCF, ...")
            heading.push("قیمت درخواستی هر جلسه")
            heading.push("نمونه: 100,000 تومان")
            heading.push("تجارب و مدارک")
            heading.push("مدت سابقه کاری مرتبط")
            heading.push("نمونه: 3 سال")
            heading.push("شرح مختصر سابقه کاری")
            heading.push("شرح")
            heading.push("تحصیلات")
            heading.push("درجه تحصیلی و نام دانشگاه")
            heading.push("گواهینامه های اخذ شده")
            heading.push("نام ببرید")
            heading.push("زمان های در دسترس جهت تدریس")
            heading.push("یک شنبه")
            heading.push("دوشنبه")
            heading.push("سه شنبه")
            heading.push("چهار شنبه")
            heading.push("پنج شنبه")
            heading.push("جمعه")
            heading.push("شنبه")
            heading.push("همکاری")
            heading.push("آیا مایل هستید برای دانشحویان خود کلاس های ضبط شده ارایه دهید؟")
            heading.push("آیا مایل هستید فلش کارتهای مرتبط با اصلاحات و لغات برای دانشجویان تهیه نمایید؟(فرمت های فلش کارت برای شما آماده شده است)")
            heading.push("ارسال درخواست")

        }
        return heading
    }
    render() {
        const { requestObject, dropdownList } = this.state;
        const lang = localStorage.getItem('lang');
        return (<div className="m-0 p-0">
            <Container fluid className="m-0 p-0" dir={lang === 'fa' ? 'rtl' : 'ltr'} >
                <Row className="mb-2">
                    <Col xs="12" className={lang === 'fa' ? "text-right text-dark p-0" : "text-left text-dark p-0"} >
                        <h2 className="text-primary">{this.getHeading(lang)[0]}</h2>
                        <Button onClick={() => this.onNewHandeler()} className="btn btn-sm mb-3 ">{this.getHeading(lang)[1]}</Button>
                    </Col>
                </Row>
                <Row>
                    <Col className={lang === 'fa' ? "text-right border  border-primary rounded p-3 overflow-auto w-100" : "text-left border  border-primary rounded p-3 overflow-auto w-100"}>
                        <h5 className="text-primary font-weight-bold">{this.getHeading(lang)[2]}</h5>
                        <Row form>
                            <Col xs={12} lg={6}>
                                <FileUpload postMethod={'Teacher/UploadFile'} title={this.getHeading(lang)[3]} accept={['jpeg', 'jpg']} specifiedFileName="NoName" onUpload={this.onUpload} />
                                <FormGroup>
                                    <Label for="fullname">{this.getHeading(lang)[4]}</Label>
                                    <Input type="text" id="fullname" name="Name" value={requestObject.Name} onChange={this.handleChange} placeholder={this.getHeading(lang)[5]} />
                                </FormGroup>
                                {this.validator.message('fullname', requestObject.Name, 'required|max:95', { className: 'alert alert-danger' })}
                                <FormGroup >
                                    <Label for="phone">{this.getHeading(lang)[6]}</Label>
                                    <Input className='text-left' dir="ltr" type="text" id="phone" name="Phone" value={requestObject.Phone} onChange={this.handleChange} placeholder={this.getHeading(lang)[7]} />
                                </FormGroup>
                                {this.validator.message('phone', requestObject.Phone, 'required|max:30', { className: 'alert alert-danger' })}
                                <FormGroup>
                                    <Label for="email">{this.getHeading(lang)[8]}</Label>
                                    <Input className='text-left' dir="ltr" type="text" id="email" name="Email" value={requestObject.Email} onChange={this.handleChange} placeholder={this.getHeading(lang)[9]} />
                                </FormGroup>
                                {this.validator.message('email', requestObject.Email, 'required|email', { className: 'alert alert-danger' })}
                            </Col>
                            <Col xs={12} lg={6}>
                                <FormGroup>
                                    <Label for="address">{this.getHeading(lang)[10]}</Label>
                                    <Input type="textarea" id="address" rows={12} name="Address" value={requestObject.Address} onChange={this.handleChange} placeholder={this.getHeading(lang)[11]} />
                                </FormGroup>
                                {this.validator.message('address', requestObject.Address, 'required|max:300', { className: 'alert alert-danger' })}
                            </Col>
                        </Row>
                        <hr className="bg-warning" />
                        <h5 className="text-primary font-weight-bold">{this.getHeading(lang)[12]}</h5>
                        <Row form>
                            <Col xs={12} md={6} lg={4}>
                                <Suspense fallback={<Spinner color="success" />}>
                                    <MyDropdown
                                        label="Select Language "
                                        display="Select Language"
                                        dataList={dropdownList}
                                        handleChange={this.handleChange}
                                        name="LanguageId"
                                        selectedValue={requestObject.LanguageId}
                                        htmlFor="language"
                                        width={window.innerWidth < 576 ? "w-100" : "w-25"}
                                    />
                                </Suspense>
                                {this.validator.message('language', requestObject.LanguageId, 'required', { className: 'alert alert-danger' })}
                            </Col>
                            <Col xs={12} lg={4}>
                                <FormGroup>
                                    <Label for="courses">{this.getHeading(lang)[15]}</Label>
                                    <Input className='text-left' dir="ltr" type="text" id="courses" name="CoursesDescription" value={requestObject.CoursesDescription} onChange={this.handleChange} placeholder={this.getHeading(lang)[16]} />
                                </FormGroup>
                                {this.validator.message('teaching courses', requestObject.CoursesDescription, 'required|max:95', { className: 'alert alert-danger' })}
                            </Col>
                            <Col xs={12} lg={4}>
                                <FormGroup>
                                    <Label for="price">{this.getHeading(lang)[17]}</Label>
                                    <Input type="text" id="price" name="SessionPrice" value={requestObject.SessionPrice} onChange={this.handleChange} placeholder={this.getHeading(lang)[18]} />
                                </FormGroup>
                                {this.validator.message('session price', requestObject.SessionPrice, 'required|max:15', { className: 'alert alert-danger' })}
                            </Col>
                        </Row>
                        <hr className="bg-warning" />
                        <Row form>
                            <Col xs={12} lg={4}>
                                <h5 className="text-primary font-weight-bold">{this.getHeading(lang)[19]}</h5>
                                <FormGroup>
                                    <Label for="experience">{this.getHeading(lang)[20]}</Label>
                                    <Input type="text" id="experience" name="ExperienceYear" value={requestObject.ExperienceYear} onChange={this.handleChange} placeholder={this.getHeading(lang)[21]} />
                                </FormGroup>
                                {this.validator.message('years experience', requestObject.ExperienceYear, 'required|max:95', { className: 'alert alert-danger' })}
                            </Col>
                        </Row>
                        <Row form>
                            <Col xs={12} lg={4}>
                                <FormGroup>
                                    <Label for="experienceDetail">{this.getHeading(lang)[22]}</Label>
                                    <Input type="textarea" id="experienceDetail" rows={12} name="ExperienceDetail" value={requestObject.ExperienceDetail} onChange={this.handleChange} placeholder={this.getHeading(lang)[23]} />
                                </FormGroup>
                                {this.validator.message('detailed experience', requestObject.ExperienceDetail, 'required|max:3900', { className: 'alert alert-danger' })}
                            </Col>
                            <Col xs={12} lg={4}>
                                <FormGroup>
                                    <Label for="education">{this.getHeading(lang)[24]}</Label>
                                    <Input type="textarea" id="education" rows={12} name="Education" value={requestObject.Education} onChange={this.handleChange} placeholder={this.getHeading(lang)[25]} />
                                </FormGroup>
                                {this.validator.message('education', requestObject.Education, 'required', { className: 'alert alert-danger' })}
                            </Col>
                            <Col xs={12} lg={4}>
                                <FormGroup>
                                    <Label for="address">{this.getHeading(lang)[26]}</Label>
                                    <Input type="textarea" id="address" rows={12} name="Certificate" value={requestObject.Certificate} onChange={this.handleChange} placeholder={this.getHeading(lang)[27]} />
                                </FormGroup>
                                {this.validator.message('certificate', requestObject.Certificate, 'max:3999', { className: 'alert alert-danger' })}
                            </Col>
                        </Row>
                        <hr className="bg-warning" />
                        <Form>
                            <h5 className="text-primary font-weight-bold">{this.getHeading(lang)[28]}</h5>
                            <FormGroup check inline>
                                <Label check>
                                    <Input type="checkbox" name="IsAvailableSun" checked={requestObject.IsAvailableSun} onChange={this.handleChange} />  {this.getHeading(lang)[29]}
                                </Label>
                            </FormGroup>
                            <FormGroup check inline>
                                <Label check>
                                    <Input type="checkbox" name="IsAvailableMon" checked={requestObject.IsAvailableMon} onChange={this.handleChange} />  {this.getHeading(lang)[30]}
                                </Label>
                            </FormGroup>
                            <FormGroup check inline>
                                <Label check>
                                    <Input type="checkbox" name="IsAvailableTue" checked={requestObject.IsAvailableTue} onChange={this.handleChange} />  {this.getHeading(lang)[31]}
                                </Label>
                            </FormGroup>
                            <FormGroup check inline>
                                <Label check>
                                    <Input type="checkbox" name="IsAvailableWed" checked={requestObject.IsAvailableWed} onChange={this.handleChange} />  {this.getHeading(lang)[32]}
                                </Label>
                            </FormGroup>
                            <FormGroup check inline>
                                <Label check>
                                    <Input type="checkbox" name="IsAvailableThu" checked={requestObject.IsAvailableThu} onChange={this.handleChange} />  {this.getHeading(lang)[33]}
                                </Label>
                            </FormGroup>
                            <FormGroup check inline>
                                <Label check>
                                    <Input type="checkbox" name="IsAvailableFri" checked={requestObject.IsAvailableFri} onChange={this.handleChange} />  {this.getHeading(lang)[34]}
                                </Label>
                            </FormGroup>
                            <FormGroup check inline>
                                <Label check>
                                    <Input type="checkbox" name="IsAvailableSat" checked={requestObject.IsAvailableSat} onChange={this.handleChange} />  {this.getHeading(lang)[35]}
                                </Label>
                            </FormGroup>
                        </Form>
                        <hr className="bg-warning" />
                        <h5 className="text-primary font-weight-bold">{this.getHeading(lang)[36]}</h5>
                        <Row form>
                            <Col xs={12} >
                                <FormGroup check inline>
                                    <Label check>
                                        <Input type="checkbox" name="HasArticle" checked={requestObject.HasArticle} onChange={this.handleChange} />{' '}
                                        {this.getHeading(lang)[37]}
                                    </Label>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row form>
                            <Col xs={12} >
                                <FormGroup check inline>
                                    <Label check>
                                        <Input type="checkbox" name="HasFlashCard" checked={requestObject.HasFlashCard} onChange={this.handleChange} />{' '}
                                        {this.getHeading(lang)[38]}
                                    </Label>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Button className={lang === 'fa' ? "btn btn-sm float-left" : "btn btn-sm float-right"} onClick={this.handleSubmit} >{this.getHeading(lang)[39]}</Button>
                    </Col>
                </Row>
            </Container>
        </div >);
    }
}
export default RecruitmentRequest;

