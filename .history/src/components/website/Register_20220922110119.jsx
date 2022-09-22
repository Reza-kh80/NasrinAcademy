import React, { Component, Suspense } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import SimpleReactValidator from 'simple-react-validator';
import { Container, Row, Col, Spinner, Button } from 'reactstrap';
import 'simple-react-validator/dist/locale/fa';
import 'simple-react-validator/dist/locale/fr';
// import 'simple-react-validator/dist/locale/ar';
const MyDropdown = React.lazy(() => import("../general/dropdown"));

class Register extends Component {
    constructor(props) {
        super(props);
        if (localStorage.getItem('lang') === 'ar') {
            this.validator = new SimpleReactValidator({ locale: 'fa' });
        } else {
            this.validator = new SimpleReactValidator({ locale: localStorage.getItem('lang') });
        }

        this.state = {
            contactObject: [],
            apiEndPoint: process.env.REACT_APP_APIEndPoint,
            userObject: {
                Username:'',
                Namefa: '',
                Nameen: '',
                Namefr: '',
                Email: '',
                Password: '',
                Mobile: '',
                NationalCode: '',
                post: '',
                translator: false,
                LanguageId:1
            },
            // token: "",
            errorMessage: '',
            languageId: "",
            dropdownList: [],
            teacher: '3',
            student: '2',
        }
    }

    componentDidMount() {
        // localStorage.setItem('token', '')
        this.getLanguage();
        this.setState({ errorMessage: "" });
        // this.getLanguage();
    }

    getLanguage = async () => {
        const lang = localStorage.getItem("lang");
        let dropdownList = [];
        await axios
        .get(this.state.apiEndPoint + "Language/DisplayDropdown")
        .then((response) => {
            let md = response.data;
            md.map((m) =>
            dropdownList.push({
                value: m.LanguageId,
                label: lang === "en" ? m.Name : m.NameFa,
            })
            );
            this.setState({ dropdownList });
        });
    };

    componentDidUpdate(prevState) {
        if (prevState.token !== this.state.token) {
        }
    }

    // handleLogin = (user, token) => {
    //     if (user.IsAuthorized === true && user.RoleName === 'Admin' && this.state.key === 'teacher') {
    //         localStorage.setItem('token', token)
    //         this.props.onHide();
    //         window.location = "#/dashboard";
    //     }
    //     else if (user.IsAuthorized === true && user.RoleName === 'Dean') {
    //         localStorage.setItem('token', token)
    //         this.props.onHide();
    //         window.location = "#/dean";
    //     }
    //     else if (user.IsAuthorized === true && user.RoleName === 'Teacher' && this.state.key === 'teacher') {
    //         localStorage.setItem('token', token)
    //         this.props.onHide();
    //         window.location = "#/teacher";
    //     }
    //     else if (user.IsAuthorized === true && user.RoleName === 'Student' && this.state.key === 'student') {
    //         localStorage.setItem('token', token)
    //         this.props.onHide();
    //         window.location = "#/student";
    //     }
    //     else {
    //         this.setState({ errorMessage: "Sorry, information does not mach your profile" })
    //     }
    // }

    handelChange = e => {
        e.persist();
        let userObject = this.state.userObject;
        userObject[e.target.name] = e.target.value;
        this.setState({ userObject });
        this.setState({ errorMessage: "" })
        console.log(this.state.userObject);
    }

    handleCheckBox = (e) => {
        let userObject = { ...this.state.userObject };
        userObject[e.currentTarget.id] = e.target.checked;
        this.setState({ userObject });
    }

    handleSubmit = () => {
        const { apiEndPoint, userObject } = this.state;

        if (this.validator.allValid()) {
            var data = JSON.stringify({
                Username: userObject.Username,
                NameFa: userObject.Namefa,
                Name: userObject.Nameen,
                NameFr: userObject.Namefr,
                Email: userObject.Email,
                Password: userObject.Password,
                Mobile: userObject.Mobile,
                NationalCode: userObject.NationalCode,
                RoleId: parseInt(userObject.post),
                Modifier: userObject.Email,
                ModificationDate: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
                IsDeleted: 0,
                Translater: userObject.translator,
                LanguageId:userObject.LanguageId
            });

            var config = {
                method: 'post',
                url: 'https://test.nasrinacademy.com/api/User/AddNewUser',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios(config)
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });

        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    render() {
        const { userObject, errorMessage,dropdownList,languageId } = this.state;
        const lang = localStorage.getItem('lang');


        const getTitle = (lang) => {
            let type = []
            if (lang === 'en') {
                type.push('Full Name:');
                type.push('Full Name: (persian)');
                type.push('Full Name: (french)');
                type.push('Mobile');
                type.push('Email');
                type.push('National Code:');
                type.push('Password:');
                type.push('post:');
                type.push('Teacher');
                type.push('Student');
                type.push('Carrying out translation activities:')
                type.push('Username:');
            }

            if (lang === 'fr') {
                type.push("Nom et prénom");
                type.push("Nom et prénom(persan)");
                type.push("Nom et prénom(anglais)");
                type.push('Mobile');
                type.push('E-mail');
                type.push('Code national:');
                type.push('Mot de passe:');
                type.push('Publier:');
                type.push('Professeure');
                type.push('étudiante');
                type.push("Réalisation d'activités de traduction:")
                type.push('Username:');
            }

            if (lang === 'fa') {
                type.push('نام و نام خانوادگی:');
                type.push('نام و نام خانوادگی(انگلیسی):');
                type.push('نام و نام خانوادگی(فرانسوی):');
                type.push('تلفن همراه:');
                type.push('ایمیل:');
                type.push('کد ملی:');
                type.push('پسورد:');
                type.push('سمت:');
                type.push('استاد');
                type.push('دانشجو');
                type.push('انجام فعالیت های ترجمه:');
                type.push('نام کاربری :');
            }

            if (lang === 'ar') {
                type.push('الاسم واللقب:');
                type.push('الاسم واللقب (الإنجليزية):');
                type.push('الاسم واللقب (الفرنسية):');
                type.push('هاتف خلوي:');
                type.push('البريد الإلكتروني:');
                type.push('رمز دولي:');
                type.push('كلمه السر:');
                type.push('بريد:');
                type.push('أستاذ');
                type.push('طالب جامعي');
                type.push('القيام بأنشطة الترجمة:');
                type.push('نام کاربری :');
            }
            return type;
        }

        const getPlaceHolder = (lang) => {
            let placeholder = []
            if (lang === 'en') {
                placeholder.push('Example:nasrin daftarchi');
                placeholder.push('نمونه:نسرین دفترچی');
                placeholder.push('Example:nasrin daftarchi');
                placeholder.push('+98-(xxx)xxx-xxxx');
                placeholder.push('x@x.com');
            }

            if (lang === 'fr') {
                placeholder.push('Example:nasrin daftarchi');
                placeholder.push('نمونه:نسرین دفترچی');
                placeholder.push('Example:nasrin daftarchi');
                placeholder.push('+98-(xxx)xxx-xxxx');
                placeholder.push('x@x.com');
            }

            if (lang === 'fa') {
                placeholder.push('نمونه:نسرین دفترچی');
                placeholder.push('Example:nasrin daftarchi');
                placeholder.push('Example:nasrin daftarchi');
                placeholder.push('+98-(xxx)xxx-xxxx');
                placeholder.push('x@x.com');
            }

            if (lang === 'ar') {
                placeholder.push('نمونه:نسرین دفترچی');
                placeholder.push('Example:nasrin daftarchi');
                placeholder.push('Example:nasrin daftarchi');
                placeholder.push('+98-(xxx)xxx-xxxx');
                placeholder.push('x@x.com');
            }
            return placeholder;
        }

        const setError = {
            fa: {
                Email: 'ایمیل',
                Password: 'پسورد',
                Namefa: 'نام و نام خانوادگی',
                Namefr: 'نام و نام خانوادگی(فرانسوی)',
                Nameen: 'نام و نام خانوادگی(انگلیسی)',
                Mobile: 'تلفن همراه',
                Language_ID: 'شناسه زبان',
                Role_ID: 'شناسه نقش',
                Username: 'نام کاربری',
                language: 'انتخاب زبان',
                NationalCode: 'کد ملی',
                Post: 'سمت',
                Translator: 'مترجم'
            },

            fr: {
                language: 'Choisir la langue',
                Email: 'e-mail',
                Password: 'password',
                Namefa: 'nom complet (persan)',
                Namefr: 'nom complet (français)',
                Nameen: 'nom complet (anglais)',
                Mobile: 'portable',
                Language_ID: 'identifiant de la langue',
                Role_ID: 'ID de rôle',
                Username: "Nom d'utilisateur",
                NationalCode: 'Code national',
                Post: 'Publier',
                Translator: 'Traducteur'
            },

            en: {
                language: 'Select Language',
                Email: 'email',
                Password: 'password',
                Namefa: 'fullname(persian)',
                Namefr: 'fullname(french)',
                Nameen: 'fullname(english)',
                Mobile: 'mobile',
                Language_ID: 'language id',
                Role_ID: 'role id',
                Username: 'username',
                NationalCode: 'national code',
                Post: 'post',
                Translator: 'Translator'
            },

            ar: {
                language: 'اختار اللغة',
                Email: 'البريد الإلكتروني',
                Password: 'كلمه السر',
                Namefa: 'الاسم الكامل (الفارسي)',
                Namefr: 'الاسم الكامل (فرنسي)',
                Nameen: 'الاسم الكامل (إنجليزي)',
                Mobile: 'التليفون المحمول',
                Language_ID: 'معرف اللغة',
                Role_ID: 'معرف الدور',
                Username: 'اسم االمستخدم',
                NationalCode: 'رمز دولي',
                Post: 'بريد',
                Translator: 'مترجم'
            }
        }

        return (

            <div>
                <Modal
                    {...this.props}
                    size="lg"
                    // show={show}
                    // onHide={onHide}
                    backdrop="static"
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                    <Modal.Header closeButton className='loginHeader'>
                        <Row className="align-items-center">
                            <Col xs="2" className="text-center">
                                <img src="main-images/logo-circle.webp" width="100%" height="100%" alt="logo" />
                            </Col>
                            <Col xs="10" className="text-left m-0 p-0 ">
                                <Modal.Title id="example-modal-sizes-title-lg" className="h4 font-weight-bold text-white">Register</Modal.Title>
                            </Col>
                        </Row>
                    </Modal.Header>

                    <Modal.Body>
                        <Suspense fallback={<Spinner color="success" />}>
                            <Container fluid dir={lang === 'fa' || lang === 'ar' ? 'rtl' : 'ltr'} className="tab-border">
                                <Form >
                                    <Row>
                                        <Col className={lang === 'fa' || lang === 'ar' ? "text-right rounded p-3 overflow-auto w-100" : "text-left rounded p-3 overflow-auto w-100"}>
                                            <Row form>
                                                <Col xs={12} md={4}>
                                                    {errorMessage !== '' && <div className="alert alert-danger">{errorMessage}</div>}
                                                    <Form.Group>
                                                        <Form.Label className='mt-2'><h6 className="text-primary mb-0 ml-1">{getTitle(lang)[7]}</h6></Form.Label>
                                                        <div className="form-check" onChange={this.handelChange}>
                                                            <input className="form-check-input" type="radio" value={this.state.teacher} name="post" />
                                                            <label className="form-check-label mr-3">
                                                                {getTitle(lang)[8]}
                                                            </label>
                                                            &nbsp;
                                                            &nbsp;
                                                            <input className="form-check-input" type="radio" value={this.state.student} name="post" />
                                                            <label className="form-check-label mr-3">
                                                                {getTitle(lang)[9]}
                                                            </label>
                                                        </div>
                                                        {this.validator.message(setError[lang]['Post'], userObject.post, 'required', { className: 'alert alert-danger' })}
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row form>
                                                <Col xs={12} md={4}>
                                                    {errorMessage !== '' && <div className="alert alert-danger">{errorMessage}</div>}
                                                    <Form.Group>
                                                        <Form.Label htmlFor="Nameen" className='mt-2' style={{ float: lang === 'fa' || lang === 'ar' ? 'right' : 'left' }}><h6 className="text-primary mb-0 ml-1">{getTitle(lang)[0]}</h6></Form.Label>
                                                        <Form.Control id="Nameen" name="Nameen" type="text" placeholder={getPlaceHolder(lang)[0]} value={userObject.Nameen} onChange={this.handelChange} />
                                                        {this.validator.message(setError[lang]['Nameen'], userObject.Nameen, 'required', { className: 'alert alert-danger' })}
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={12} md={4}>
                                                    <Form.Group>
                                                        <Form.Label htmlFor="Namefa" className='mt-2' style={{ float: lang === 'fa' || lang === 'ar' ? 'right' : 'left' }}><h6 className="text-primary mb-0 ml-1">{getTitle(lang)[1]}</h6></Form.Label>
                                                        <Form.Control id="Namefa" name="Namefa" type="text" placeholder={getPlaceHolder(lang)[1]} value={userObject.Namefa} onChange={this.handelChange} />
                                                        {this.validator.message(setError[lang]['Namefa'], userObject.Namefa, 'required', { className: 'alert alert-danger' })}
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={12} md={4}>
                                                    <Form.Group>
                                                        <Form.Label htmlFor="Namefr" className='mt-2' style={{ float: lang === 'fa' || lang === 'ar' ? 'right' : 'left' }}><h6 className="text-primary mb-0 ml-1">{getTitle(lang)[2]}</h6></Form.Label>
                                                        <Form.Control id="Namefr" name="Namefr" type="text" placeholder={getPlaceHolder(lang)[2]} value={userObject.Namefr} onChange={this.handelChange} />
                                                        {this.validator.message(setError[lang]['Namefr'], userObject.Namefr, 'required', { className: 'alert alert-danger' })}
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row form>
                                                <Col xs={12} md={4}>
                                                    {errorMessage !== '' && <div className="alert alert-danger">{errorMessage}</div>}
                                                    <Form.Group>
                                                        <Form.Label htmlFor="Mobile" className='mt-2' style={{ float: lang === 'fa' || lang === 'ar' ? 'right' : 'left' }}><h6 className="text-primary mb-0 ml-1">{getTitle(lang)[3]}</h6></Form.Label>
                                                        <Form.Control id="Mobile" name="Mobile" type="text" placeholder={getPlaceHolder(lang)[3]} value={userObject.Mobile} onChange={this.handelChange} />
                                                        {this.validator.message(setError[lang]['Mobile'], userObject.Mobile, 'required', { className: 'alert alert-danger' })}
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={12} md={4}>
                                                    <Form.Group>
                                                        <Form.Label htmlFor="Email" className='mt-2' style={{ float: lang === 'fa' || lang === 'ar' ? 'right' : 'left' }}><h6 className="text-primary mb-0 ml-1">{getTitle(lang)[4]}</h6></Form.Label>
                                                        <Form.Control id="Email" name="Email" type="email" placeholder={getPlaceHolder(lang)[4]} value={userObject.Email} onChange={this.handelChange} />
                                                        {this.validator.message(setError[lang]['Email'], userObject.Email, 'required|email', { className: 'alert alert-danger' })}
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={12} md={4}>
                                                    <Form.Group>
                                                        <Form.Label htmlFor="Username" className='mt-2' style={{ float: lang === 'fa' || lang === 'ar' ? 'right' : 'left' }}><h6 className="text-primary mb-0 ml-1">{getTitle(lang)[11]}</h6></Form.Label>
                                                        <Form.Control id="Username" name="Username" type="text" value={userObject.Username} onChange={this.handelChange} />
                                                        {this.validator.message(setError[lang]['Username'], userObject.Username, 'required', { className: 'alert alert-danger' })}
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row form>
                                                <Col xs={12} md={4}>
                                                    <Form.Group>
                                                        <Form.Label htmlFor="Password" className='mt-2' style={{ float: lang === 'fa' || lang === 'ar' ? 'right' : 'left' }}><h6 className="text-primary mb-0 ml-1">{getTitle(lang)[6]}</h6></Form.Label>
                                                        <Form.Control id="Password" name="Password" type="password" value={userObject.Password} onChange={this.handelChange} />
                                                        {this.validator.message(setError[lang]['Password'], userObject.Password, 'required', { className: 'alert alert-danger' })}
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={12} md={4}>
                                                    {errorMessage !== '' && <div className="alert alert-danger">{errorMessage}</div>}
                                                    <Form.Group>
                                                        <Form.Label htmlFor="NationalCode" className='mt-2' style={{ float: lang === 'fa' || lang === 'ar' ? 'right' : 'left' }}><h6 className="text-primary mb-0 ml-1">{getTitle(lang)[5]}</h6></Form.Label>
                                                        <Form.Control id="NationalCode" name="NationalCode" type="number" min='1' value={userObject.NationalCode} onChange={this.handelChange} />
                                                    </Form.Group>
                                                    {this.validator.message(setError[lang]['NationalCode'], userObject.NationalCode, 'required', { className: 'alert alert-danger' })}
                                                </Col>
                                                {/* <Col xs={12} md={4}>
                                                    <Form.Label htmlFor="translator" className='mt-2' style={{ float: lang === 'fa' || lang === 'ar' ? 'right' : 'left' }}><h6 style={{ marginRight: lang === 'fa' || lang === 'ar' ? '0px' : '21px' }} className='text-primary'>{getTitle(lang)[10]}</h6></Form.Label>
                                                    <Form.Check
                                                        className='mt-2'
                                                        inline
                                                        type="switch"
                                                        id='translator'
                                                        checked={userObject.translator}
                                                        onChange={this.handleCheckBox}
                                                    />
                                                </Col> */}
                                            </Row>
                                            <Row form>
                                                <Col xs={12} md={6}>
                                                    {/* {errorMessage !== '' && <div className="alert alert-danger">{errorMessage}</div>} */}
                                                    <Form.Label htmlFor="translator" className='mt-2' style={{ float: lang === 'fa' || lang === 'ar' ? 'right' : 'left' }}><h6 style={{ marginRight: lang === 'fa' || lang === 'ar' ? '0px' : '21px' }} className='text-primary'>{getTitle(lang)[10]}</h6></Form.Label>
                                                    <Form.Check
                                                        className='mt-2'
                                                        inline
                                                        type="switch"
                                                        id='translator'
                                                        checked={userObject.translator}
                                                        onChange={this.handleCheckBox}
                                                    />
                                                    {/* {this.validator.message(setError[lang]['Translator'], userObject.translator, 'required', { className: 'alert alert-danger' })} */}
                                                </Col>
                                                <Col xs={12} md={6} className="m-0">
                                                    <Suspense fallback={<Spinner color="success" />}>
                                                        <div className={lang === "fa" || lang === 'ar' ? "text-right m-0 p-0" : "m-0 p-0"}>
                                                            <MyDropdown
                                                            label="انتخاب زبان"
                                                            display="انتخاب زبان"
                                                            dataList={dropdownList}
                                                            handleChange={this.handleDropdownSelect}
                                                            name="language"
                                                            selectedValue={languageId}
                                                            htmlFor="language"
                                                            width={window.innerWidth < 576 ? "w-100" : "w-25"}
                                                                onChange={this.handlehandelChange}
                                                                value={userObject.NationalCode}
                                                            />
                                                        </div>
                                                    </Suspense>
                                                </Col>
                                                
                                            </Row>
                                        </Col>
                                    </Row>
                                </Form>
                            </Container>
                        </Suspense>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.props.onHide}>Close</Button>
                        <Button type="submit" onClick={this.handleSubmit}>Register</Button>
                    </Modal.Footer>
                </Modal>
            </div >
        );
    }
}

export default Register;