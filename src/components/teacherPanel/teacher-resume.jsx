import React, { Component, Suspense } from "react";
import { Container, Row, Col, CustomInput, FormGroup, Label, Input, Spinner, Button } from "reactstrap";
import SimpleReactValidator from "simple-react-validator";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import ModalClock from './ModalClock';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const MyDropdown = React.lazy(() => import('../general/dropdown'));



class Resume extends Component {
    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator({ locale: localStorage.getItem('lang') });

        this.state = {
            apiEndPoint: process.env.REACT_APP_APIEndPoint,
            userObject: {
                Name: '',
                NameFa: '',
                NameFr: '',
                Gender: '',
                Mobile: '',
                Phone: '',
                Address: '',
                Skills: '',
                Photo: 'main-images/user.webp',
                Email: '',
                Section: '',
                Feild: '',
                Orientation: '',
                TotalAverage: '',
                JobPosition: '',
                Workplace: '',
                CompleteExplanations: '',
                BirthDay: ''
            },
            errorMessage: '',
            key: 'BasicInformation',
            Male: 'Male',
            Female: 'Female'
        }
    }

    onUpload = (e) => {
        let userObject = { ...this.state.userObject };
        if (e.target.files && e.target.files.length > 0) {
            userObject.Photo = URL.createObjectURL(e.target.files[0]);
            this.setState({ userObject });
        }
    }

    handleChange = (e) => {
        e.persist();
        let userObject = { ...this.state.userObject };
        userObject[e.target.name] = e.target.value;
        this.setState({ userObject });
        this.setState({ errorMessage: "" })
    }

    getHeading = (lang) => {
        let heading = [];

        if (lang === 'fa') {
            heading.push('اطلاعات رزومه');
            heading.push('اطلاعات پایه');
            heading.push('سوابق آموزشی');
            heading.push('تجربه کاری');
            heading.push('مهارت ها');
            heading.push('شناسایی');
            heading.push('نام کامل');
            heading.push('نام کامل(انگلیسی)');
            heading.push('نام کامل (فرانسوی)');
            heading.push('انتخاب عکس');
            heading.push('jpg | jpeg');
            heading.push('جنسیت:');
            heading.push('مرد');
            heading.push('زن');
            heading.push('تاریخ تولد');
            heading.push('اطلاعات تماس');
            heading.push('موبایل');
            heading.push('تلفن');
            heading.push('آدرس');
            heading.push('ایمیل');
            heading.push('مقطع');
            heading.push('رشته تحصیلی');
            heading.push('گرایش/تخصص');
            heading.push('معدل');
            heading.push('سِمت شغلی مربوطه');
            heading.push('محل کار');
            heading.push('توضیحات کامل');
            heading.push('مهارت‌ها');
            heading.push('روز');
            heading.push('ماه');
            heading.push('سال');
            heading.push('زیردیپلم');
            heading.push('دیپلم');
            heading.push('فوق دیپلم');
            heading.push('کارشناسی');
            heading.push('کارشناسی ارشد');
            heading.push('دکتری');
            heading.push('فوق دکتری');
            heading.push('ارسال');
        }

        if (lang === 'en') {
            heading.push('Resume Information');
            heading.push('Basic Information');
            heading.push('Educational Records');
            heading.push('Work Experience');
            heading.push('Skills');
            heading.push('Identification');
            heading.push('Full Name');
            heading.push('Full Name(persian)');
            heading.push('Full Name(french)');
            heading.push('Choose Photo');
            heading.push('jpg | jpeg');
            heading.push('Gender: ');
            heading.push('Male');
            heading.push('Female');
            heading.push('BirthDay');
            heading.push('Contacts');
            heading.push('Mobile');
            heading.push('Phone');
            heading.push('Address');
            heading.push('Email');
            heading.push('Section');
            heading.push('Feild');
            heading.push('Orientation');
            heading.push('Total Average');
            heading.push('Job Position');
            heading.push('Work Place');
            heading.push('Complete Explanations');
            heading.push('Skills');
            heading.push('Day');
            heading.push('Month');
            heading.push('Year');
            heading.push('High school');
            heading.push('diploma');
            heading.push('Associate’s degree');
            heading.push('Bachelor’s degree');
            heading.push('Master’s degree');
            heading.push('Phd');
            heading.push('Post-doctoral');
            heading.push('Submit');
        }

        return heading;
    }

    handleSubmit = (e) => {
        const { apiEndPoint, userObject } = this.state;
        let data = {};
        data = {
            NameFa: userObject.NameFa,
            Name: userObject.Name,
            NameFr: userObject.NameFr,
            Email: userObject.Email,
            Mobile: userObject.Mobile,
            Gender: userObject.Gender,
            Phone: userObject.Phone,
            Address: userObject.Address,
            Skills: userObject.Skills,
            Photo: userObject.Photo,
            Section: userObject.Section,
            Feild: userObject.Feild,
            Orientation: userObject.Orientation,
            TotalAverage: userObject.TotalAverage,
            JobPosition: userObject.JobPosition,
            Workplace: userObject.Workplace,
            CompleteExplanations: userObject.CompleteExplanations,
            BirthDay: userObject.BirthDay
        }

        if (this.validator.allValid()) {
            axios({
                method: 'post',
                url: apiEndPoint + 'User/َAdd',
                data
            }).then(response => {
                // console.log(response.data + ' ' + this.state.key)
                const user = jwt_decode(response.data)
                this.handleLogin(user, response.data)
            }
            )
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    onChange(val) {
        let newBirth = { ...this.state.userObject, BirthDay: val };
        this.setState({ userObject: newBirth });
    }

    render() {
        const { userObject } = this.state;
        const lang = localStorage.getItem('lang');
        const section = [
            { value: 'High school', label: this.getHeading(lang)[31] },
            { value: 'diploma', label: this.getHeading(lang)[32] },
            { value: 'Associate’s degree', label: this.getHeading(lang)[33] },
            { value: 'Bachelor’s degree', label: this.getHeading(lang)[34] },
            { value: 'Master’s degree', label: this.getHeading(lang)[35] },
            { value: 'Phd', label: this.getHeading(lang)[36] },
            { value: 'Post-doctoral', label: this.getHeading(lang)[37] }
        ]

        const styles = {
            container: {
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: 50,
            },
            preview: {
                marginTop: 50,
                display: "flex",
                flexDirection: "column",
            },
            image: { maxWidth: 200, maxHeight: 200 },
            delete: {
                cursor: "pointer",
                padding: 15,
                background: "red",
                color: "white",
                border: "none",
            },
        };

        const setError = {
            'fa': {
                'photo': 'عکس',
                'gender': 'جنسیت',
                'name': 'نام انگلیسی',
                'namefa': 'نام فارسی',
                'namefr': 'نام فرانسوی',
                'birthday': 'تاریخ تولد',
                'mobile': 'تلفن همراه',
                'phone': 'تلفن ثابت',
                'email': 'ایمیل',
                'address': 'آدرس',
                'section': 'مقطع تحصیلی',
                'feild': 'رشته',
                'orientation': 'گرایش/تخصص',
                'average': 'معدل',
            },

            'en': {
                'photo': 'photo',
                'gender': 'gender',
                'name': 'english name',
                'namefa': 'persian name',
                'namefr': 'french name',
                'birthday': 'birthday',
                'mobile': 'mobile',
                'phone': 'phone',
                'email': 'email',
                'address': 'address',
                'section': 'section',
                'feild': 'feild',
                'orientation': 'orientation',
                'average': 'average',
            }
        }

        return (
            <div className="m-0 p-0">
                <Container fluid dir={lang === 'fa' ? 'rtl' : 'ltr'}>
                    <Row className='mb-2'>
                        <Col xs="12" className={lang === 'fa' ? "text-right text-dark p-0" : "text-left text-dark p-0"} >
                            <h2 className="text-primary">{this.getHeading(lang)[0]}</h2>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Tabs activeKey={this.state.key}
                                onSelect={(k) => this.setState({ key: k })}
                            >
                                <Tab eventKey="BasicInformation" tabClassName="font-weight-bold" className="tab-border" title={this.getHeading(lang)[1]} dir={lang === 'fa' ? 'rtl' : 'ltr'}>
                                    <Row>
                                        <Col className={lang === 'fa' ? "text-right p-3 overflow-auto mr-3 w-100" : "text-left p-3 overflow-auto m-3 w-100"}>
                                            <h5 className="text-primary font-weight-bold">{this.getHeading(lang)[5]}</h5>
                                            <Row form>
                                                <Col xs={12} lg={4}>
                                                    {this.state.userObject.Photo && (
                                                        <div style={styles.preview}>
                                                            <img
                                                                src={this.state.userObject.Photo}
                                                                style={styles.image}
                                                                alt="Thumb"
                                                            />
                                                        </div>
                                                    )}
                                                </Col>
                                            </Row>
                                            <Row form>
                                                <Col xs={12} lg={4}>
                                                    <FormGroup>
                                                        <Label for="Photo" className="text-primary">{this.getHeading(lang)[9]}</Label>
                                                        <CustomInput type="file" className='text-left'
                                                            label={this.getHeading(lang)[10]}
                                                            id="Photo"
                                                            onChange={this.onUpload}
                                                        />
                                                    </FormGroup>
                                                    {this.validator.message(setError[lang]['photo'], userObject.Photo, 'required', { className: 'alert alert-danger' })}
                                                </Col>
                                            </Row>
                                            <Row form>
                                                <Col xs={12} lg={4}>
                                                    <FormGroup>
                                                        <Form.Label className='mt-2'><h6 className="text-primary mb-0 ml-1">{this.getHeading(lang)[11]}</h6></Form.Label>
                                                        <div className="form-check" onChange={this.handleChange}>
                                                            <input className="form-check-input" type="radio" value={this.state.Male} name="Gender" />
                                                            <label className="form-check-label mr-3 text-primary">
                                                                {this.getHeading(lang)[12]}
                                                            </label>
                                                            &nbsp;
                                                            &nbsp;
                                                            <input className="form-check-input" type="radio" value={this.state.Female} name="Gender" />
                                                            <label className="form-check-label mr-3 text-primary">
                                                                {this.getHeading(lang)[13]}
                                                            </label>
                                                        </div>
                                                        {this.validator.message(setError[lang]['gender'], userObject.Gender, 'required', { className: 'alert alert-danger' })}
                                                    </FormGroup>
                                                    {/* <Suspense fallback={<Spinner color="success" />}>
                                                        <MyDropdown
                                                            label={this.getHeading(lang)[11]}
                                                            display={this.getHeading(lang)[11]}
                                                            dataList={[{ value: 'Male', label: this.getHeading(lang)[24] }, { value: 'Female', label: this.getHeading(lang)[25] }]}
                                                            handleChange={this.handleChange}
                                                            name='Gender'
                                                            selectedValue={userObject.Gender}
                                                            htmlFor='gender'
                                                            width={window.innerWidth < 576 ? "w-100" : "w-25"}
                                                        />
                                                        {this.validator.message(setError[lang]['LanguageId'], requestObject.LanguageId, 'required', { className: 'alert alert-danger' })}
                                                    </Suspense> */}
                                                </Col>
                                            </Row>
                                            <Row form>
                                                <Col xs={12} lg={4}>
                                                    <FormGroup>
                                                        <Label for="fullname" className="text-primary">{this.getHeading(lang)[6]}</Label>
                                                        <Input type="text" id="fullname" name="Name" value={userObject.Name} onChange={this.handleChange} />
                                                    </FormGroup>
                                                    {this.validator.message(setError[lang]['name'], userObject.Name, 'required:max:95', { className: 'alert alert-danger' })}
                                                </Col>
                                                <Col xs={12} lg={4}>
                                                    <FormGroup>
                                                        <Label for="fullnamefa" className="text-primary">{this.getHeading(lang)[7]}</Label>
                                                        <Input type="text" id="fullnamefa" name="NameFa" value={userObject.NameFa} onChange={this.handleChange} />
                                                    </FormGroup>
                                                    {this.validator.message(setError[lang]['namefa'], userObject.NameFa, 'required:max:95', { className: 'alert alert-danger' })}
                                                </Col>
                                                <Col xs={12} lg={4}>
                                                    <FormGroup>
                                                        <Label for="fullnamefr" className="text-primary">{this.getHeading(lang)[8]}</Label>
                                                        <Input type="text" id="fullnamefr" name="NameFr" value={userObject.NameFr} onChange={this.handleChange} />
                                                    </FormGroup>
                                                    {this.validator.message(setError[lang]['namefr'], userObject.NameFr, 'required:max:95', { className: 'alert alert-danger' })}
                                                </Col>
                                            </Row>
                                            <Row form>
                                                <Col xs={12} lg={3}>
                                                    <FormGroup>
                                                        <Form.Label className='mt-2'><h6 className="text-primary mb-0 ml-1">{this.getHeading(lang)[14]}</h6></Form.Label>
                                                        <br />
                                                        <ModalClock>
                                                            <DatePicker
                                                                calendar={persian}
                                                                locale={persian_fa}
                                                                calendarPosition="bottom-right"
                                                                id='birthday'
                                                                value={userObject.BirthDay}
                                                                // this.setState({ BirthDay: e.year + '/' + e.month + '/' + e.day })
                                                                onChange={(val) => this.onChange(val.year + '/' + val.month + '/' + val.day)}
                                                                style={{ height: 37 }}
                                                            />
                                                        </ModalClock>
                                                        {this.validator.message(setError[lang]['birthday'], userObject.BirthDay, 'required', { className: 'alert alert-danger' })}
                                                    </FormGroup>

                                                </Col>
                                            </Row>
                                            <Row form style={{ float: lang === 'fa' ? 'right' : 'left' }}>
                                                <Col xs={4} lg={2}>
                                                    <Label className="text-primary">{this.getHeading(lang)[30]}</Label>
                                                    <Input type="text" value={userObject.BirthDay.split('/')[0]} disabled />
                                                </Col>
                                                <Col xs={4} lg={2}>
                                                    <Label className="text-primary">{this.getHeading(lang)[29]}</Label>
                                                    <Input type="text" value={userObject.BirthDay.split('/')[1]} disabled />
                                                </Col>
                                                <Col xs={4} lg={2}>
                                                    <Label className="text-primary">{this.getHeading(lang)[28]}</Label>
                                                    <Input type="text" value={userObject.BirthDay.split('/')[2]} disabled />
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <hr className="bg-warning" />
                                    <Row>
                                        <Col className={lang === 'fa' ? "text-right p-3 overflow-auto mr-3 w-100" : "text-left p-3 overflow-auto m-3 w-100"}>
                                            <h5 className="text-primary font-weight-bold">{this.getHeading(lang)[15]}</h5>
                                            <Row form>
                                                <Col xs={12} lg={4}>
                                                    <FormGroup>
                                                        <Label for="mobile" className="text-primary">{this.getHeading(lang)[16]}</Label>
                                                        <Input type="text" id="mobile" name="Mobile" value={userObject.Mobile} onChange={this.handleChange} />
                                                    </FormGroup>
                                                    {this.validator.message(setError[lang]['mobile'], userObject.Mobile, 'required', { className: 'alert alert-danger' })}
                                                </Col>
                                                <Col xs={12} lg={4}>
                                                    <FormGroup>
                                                        <Label for="phone" className="text-primary">{this.getHeading(lang)[17]}</Label>
                                                        <Input type="text" id="phone" name="Phone" value={userObject.Phone} onChange={this.handleChange} />
                                                    </FormGroup>
                                                    {this.validator.message(setError[lang]['phone'], userObject.Phone, 'required:max:95', { className: 'alert alert-danger' })}
                                                </Col>
                                                <Col xs={12} lg={4}>
                                                    <FormGroup>
                                                        <Label for="email" className="text-primary">{this.getHeading(lang)[19]}</Label>
                                                        <Input type="text" id="email" name="Email" value={userObject.Email} onChange={this.handleChange} />
                                                    </FormGroup>
                                                    {this.validator.message(setError[lang]['email'], userObject.Email, 'required|email', { className: 'alert alert-danger' })}
                                                </Col>
                                            </Row>
                                            <Row form>
                                                <Col xs={12} lg={4}>
                                                    <FormGroup>
                                                        <Label for="address" className="text-primary">{this.getHeading(lang)[18]}</Label>
                                                        <Input type="textarea" rows={6} id="address" name="Address" value={userObject.Address} onChange={this.handleChange} />
                                                    </FormGroup>
                                                    {this.validator.message(setError[lang]['address'], userObject.Address, 'required:max:95', { className: 'alert alert-danger' })}
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Tab>
                                <Tab eventKey="EducationalRecords" tabClassName="font-weight-bold" className="tab-border" title={this.getHeading(lang)[2]} dir={lang === 'fa' ? 'rtl' : 'ltr'}>
                                    <Row>
                                        <Col className={lang === 'fa' ? "text-right p-3 overflow-auto mr-3 w-100" : "text-left p-3 overflow-auto m-3 w-100"}>
                                            <h5 className="text-primary font-weight-bold">{this.getHeading(lang)[2]}</h5>
                                            <Row form>
                                                <Col xs={12} lg={4}>
                                                    <Suspense fallback={<Spinner color="success" />}>
                                                        <MyDropdown
                                                            label={this.getHeading(lang)[20]}
                                                            display={this.getHeading(lang)[20]}
                                                            dataList={section}
                                                            handleChange={this.handleChange}
                                                            name='Section'
                                                            selectedValue={userObject.Section}
                                                            htmlFor='section'
                                                            width={window.innerWidth < 576 ? "w-100" : "w-25"}
                                                        />
                                                        {this.validator.message(setError[lang]['section'], userObject.Section, 'required', { className: 'alert alert-danger' })}
                                                    </Suspense>
                                                </Col>
                                                <Col xs={12} lg={4}>
                                                    <FormGroup>
                                                        <Label for="feild" className="text-primary">{this.getHeading(lang)[21]}</Label>
                                                        <Input type="text" id="feild" name="Feild" value={userObject.Feild} onChange={this.handleChange} />
                                                    </FormGroup>
                                                    {this.validator.message(setError[lang]['feild'], userObject.Feild, 'required:max:95', { className: 'alert alert-danger' })}
                                                </Col>
                                                <Col xs={12} lg={4}>
                                                    <FormGroup>
                                                        <Label for="orientation" className="text-primary">{this.getHeading(lang)[22]}</Label>
                                                        <Input type="text" id="orientation" name="Orientation" value={userObject.Orientation} onChange={this.handleChange} />
                                                    </FormGroup>
                                                    {this.validator.message(setError[lang]['orientation'], userObject.Orientation, 'required:max:95', { className: 'alert alert-danger' })}
                                                </Col>
                                            </Row>
                                            <Row form>
                                                <Col xs={12} lg={2}>
                                                    <FormGroup>
                                                        <Label for="average" className="text-primary">{this.getHeading(lang)[23]}</Label>
                                                        <Input type='number' id='average' name='TotalAverage' value={userObject.Total_Average} onChange={this.handleChange} min='0' max='20' placeholder="17.34" />
                                                    </FormGroup>
                                                    {this.validator.message(setError[lang]['average'], userObject.LanguageId, 'required', { className: 'alert alert-danger' })}
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Tab>
                                <Tab eventKey="WorkExperience" tabClassName="font-weight-bold" className="tab-border" title={this.getHeading(lang)[3]} dir={lang === 'fa' ? 'rtl' : 'ltr'}>
                                    <Row>
                                        <Col className={lang === 'fa' ? "text-right p-3 overflow-auto mr-3 w-100" : "text-left p-3 overflow-auto m-3 w-100"}>
                                            <h5 className="text-primary font-weight-bold">{this.getHeading(lang)[3]}</h5>
                                            <Row form>
                                                <Col xs={12} lg={6}>
                                                    <FormGroup>
                                                        <Label for="jobposition" className="text-primary">{this.getHeading(lang)[24]}</Label>
                                                        <Input type='text' id='jobposition' name='jobPosition' value={userObject.JobPosition} onChange={this.handleChange} />
                                                    </FormGroup>
                                                </Col>
                                                <Col xs={12} lg={6}>
                                                    <FormGroup>
                                                        <Label for="workplace" className="text-primary">{this.getHeading(lang)[25]}</Label>
                                                        <Input type='text' id='workplace' name='Workplace' value={userObject.Workplace} onChange={this.handleChange} />
                                                    </FormGroup>
                                                </Col>
                                                <Col xs={12} lg={6}>
                                                    <FormGroup>
                                                        <Label for="completeExplanations" className="text-primary">{this.getHeading(lang)[26]}</Label>
                                                        <Input type='textarea' rows={10} id='completeExplanations' name='CompleteExplanations' value={userObject.CompleteExplanations} onChange={this.handleChange} />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Tab>
                                <Tab eventKey="Skills" tabClassName="font-weight-bold" className="tab-border" title={this.getHeading(lang)[4]} dir={lang === 'fa' ? 'rtl' : 'ltr'}>
                                    <Row>
                                        <Col className={lang === 'fa' ? "text-right p-3 overflow-auto mr-3 w-100" : "text-left p-3 overflow-auto m-3 w-100"}>
                                            <Row form>
                                                <Col xs={12} lg={6}>
                                                    <FormGroup>
                                                        <Label for="skills" className="text-primary">{this.getHeading(lang)[27]}</Label>
                                                        <Input type='textarea' rows={10} id='skills' name='Skills' value={userObject.Skills} onChange={this.handleChange} />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Button className={lang === 'fa' ? "btn btn-md float-left" : "btn btn-md float-right"} onClick={this.handleSubmit} >{this.getHeading(lang)[38]}</Button>
                                        </Col>
                                    </Row>
                                </Tab>
                            </Tabs>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Resume;