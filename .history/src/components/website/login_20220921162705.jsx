import React, { Component, Suspense } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import SimpleReactValidator from 'simple-react-validator';
import { Row, Col, Spinner, Button, Container } from 'reactstrap';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import 'simple-react-validator/dist/locale/fa';

class Login extends Component {
    constructor(props) {
        super(props);
        if (localStorage.getItem('lang') === 'ar') {
            this.validator1 = new SimpleReactValidator({ locale: 'fa' });
            this.validator2 = new SimpleReactValidator({ locale: 'fa' });
        } else {
            this.validator1 = new SimpleReactValidator({ locale: localStorage.getItem('lang') });
            this.validator2 = new SimpleReactValidator({ locale: localStorage.getItem('lang') });
        }

        this.state = {
            contactObject: [],
            apiEndPoint: process.env.REACT_APP_APIEndPoint,
            userObject_teacher: {
                Email: '',
                Password: '',
            },
            userObject_student: {
                Email: '',
                Password: ''
            },
            // token: "",
            errorMessage: '',
            key: 'teacher'
        }
    }

    componentDidMount() {
        // localStorage.setItem('token', '')
        this.setState({ errorMessage: "" })
    }

    componentDidUpdate(prevState) {
        if (prevState.token !== this.state.token) {
        }
    }

    handleLogin = (user, token) => {
        // console.log(user);

        if (user.IsAuthorized === true && user.RoleName === 'Admin' && this.state.key === 'teacher') {
            localStorage.setItem('token', token)
            this.props.onHide();
            window.location = "#/dashboard";

        } else if (user.IsAuthorized === true && user.RoleName === 'Dean' && this.state.key === 'teacher') {
            localStorage.setItem('token', token)
            this.props.onHide();
            window.location = "#/dean";

        } else if (user.IsAuthorized === true && user.RoleName === 'Teacher' && this.state.key === 'teacher') {
            localStorage.setItem('token', token)
            this.props.onHide();
            window.location = "#/teacher";

        } else if (user.IsAuthorized === true && user.RoleName === 'Student' && this.state.key === 'student') {
            localStorage.setItem('token', token)
            this.props.onHide();
            window.location = "#/student";

        } else {
            this.setState({ errorMessage: "Sorry, information does not mach your profile" })
        }
    }


    handleSubmit = (e) => {
        const { apiEndPoint } = this.state;
        let userObject = {};
        let valid = this.validator1;

        if (this.state.key === 'teacher') {
            userObject = this.state.userObject_teacher;
        } else {
            userObject = this.state.userObject_student;
            valid = this.validator2;
        }

        if (valid.allValid()) {
            axios({
                method: 'post',
                url: apiEndPoint + 'User/Login',
                data: {
                    Username: userObject.Email,
                    Password: userObject.Password
                }
            }).then(response => {
                console.log(response.data)
                const user = jwt_decode(response.data);
                this.handleLogin(user, response.data.Token);
            }
            )
        } else {
            valid.showMessages();
            this.forceUpdate();
        }
    }

    handelChange = e => {
        e.persist();
        let userObject = '';
        if (this.state.key === 'teacher') {
            userObject = this.state.userObject_teacher;
        } else {
            userObject = this.state.userObject_student;
        }
        userObject[e.currentTarget.name] = e.currentTarget.name === "Password" ? e.target.value : e.target.value;
        this.setState({ userObject });
        this.setState({ errorMessage: "" })
    }

    render() {
        const { userObject_teacher, userObject_student, errorMessage } = this.state;
        const lang = localStorage.getItem('lang');

        const getHeading = (lang) => {
            let heading = []
            if (lang === 'en') {
                heading.push("Teacher")
                heading.push("Student")
            }

            if (lang === 'fr') {
                heading.push("Professeur")
                heading.push("étudiant à l'université")
            }

            if (lang === 'fa') {
                heading.push("استاد");
                heading.push("دانشجو");
            }

            if (lang === 'ar') {
                heading.push('أستاذ');
                heading.push('طالب جامعي');
            }
            return heading
        }

        const getTitle = (lang) => {
            let type = []
            if (lang === 'en') {
                type.push('Username: (Email)');
                type.push('Password:');
            }

            if (lang === 'fr') {
                type.push("nom d'utilisateur: (E-mail)");
                type.push('le mot de passe: ');
            }

            if (lang === 'fa') {
                type.push('نام کاربری: (ایمیل)');
                type.push('پسورد:');
            }

            if (lang === 'ar') {
                type.push('اسم المستخدم: (البريد الإلكتروني):');
                type.push('كلمه السر:');
            }
            return type;
        }

        const getPlaceHolder = (lang) => {
            let placeholder = []
            if (lang === 'en') {
                placeholder.push('Enter your email address');
                placeholder.push('Enter your password');
            }

            if (lang === 'fr') {
                placeholder.push("Entrez votre adresse email");
                placeholder.push('Tapez votre mot de passe');
            }

            if (lang === 'fa') {
                placeholder.push('آدرس ایمیل خود را وارد کنید');
                placeholder.push('رمز عبور خود را وارد کنید');
            }

            if (lang === 'ar') {
                placeholder.push('أدخل عنوان بريدك الالكتروني');
                placeholder.push('ادخل رقمك السري');
            }
            return placeholder;
        }

        const setError = {
            fa: {
                Email: 'ایمیل',
                Password: 'پسورد'
            },

            fr: {
                Email: 'e-mail',
                Password: 'le mot de passe'
            },

            en: {
                Email: 'email',
                Password: 'password'
            },

            ar: {
                Email: 'البريد الإلكتروني',
                Password: 'كلمه السر'
            }
        }

        return (
            <div >
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
                                <Modal.Title id="example-modal-sizes-title-lg" className="h4 font-weight-bold text-white">Login to Portals</Modal.Title>
                            </Col>
                        </Row>
                    </Modal.Header>

                    <Modal.Body>
                        <Tabs activeKey={this.state.key}
                            onSelect={(k) => this.setState({ key: k })}
                        >
                            <Tab eventKey="teacher" tabClassName="font-weight-bold" className="tab-border" title={getHeading(lang)[0]} dir={lang === 'fa' || lang === 'ar' ? 'rtl' : 'ltr'}>
                                <Suspense fallback={<Spinner color="success" />}>
                                    <Container>
                                        <Form>
                                            {errorMessage !== '' && <div className="alert alert-danger">{errorMessage}</div>}
                                            <Form.Group>
                                                <Form.Label htmlFor="email" className='mt-2' style={{ float: lang === 'fa' || lang === 'ar' ? 'right' : 'left' }}><h6 className="text-primary mb-0 ml-1">{getTitle(lang)[0]}</h6></Form.Label>
                                                <Form.Control id="email" name="Email" type="text" placeholder={getPlaceHolder(lang)[0]} value={userObject_teacher.Email} onChange={this.handelChange} />
                                                {this.validator1.message(setError[lang]['Email'], userObject_teacher.Email, 'required', { className: 'alert alert-danger' })}
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label htmlFor="password" style={{ float: lang === 'fa' || lang === 'ar' ? 'right' : 'left' }}><h6 className="text-primary mb-0 ml-1">{getTitle(lang)[1]}</h6></Form.Label>
                                                <Form.Control id="password" name="Password" type="password" placeholder={getPlaceHolder(lang)[1]} value={userObject_teacher.Password} onChange={this.handelChange} />
                                                {this.validator1.message(setError[lang]['Password'], userObject_teacher.Password, 'required', { className: 'alert alert-danger' })}
                                            </Form.Group>
                                        </Form>
                                    </Container>
                                </Suspense>
                            </Tab>
                            <Tab eventKey="student" tabClassName="font-weight-bold" className="tab-border" title={getHeading(lang)[1]} dir={lang === 'fa' || lang === 'ar' ? 'rtl' : 'ltr'}>
                                <Suspense fallback={<Spinner color="success" />}>
                                    <Container>
                                        <Form>
                                            {errorMessage !== '' && <div className="alert alert-danger">{errorMessage}</div>}
                                            <Form.Group>
                                                <Form.Label htmlFor="email" className='mt-2' style={{ float: lang === 'fa' || lang === 'ar' ? 'right' : 'left' }}><h6 className="text-primary mb-0 ml-1" >{getTitle(lang)[0]}</h6></Form.Label>
                                                <Form.Control id="email" name="Email" type="text" placeholder={getPlaceHolder(lang)[0]} value={userObject_student.Email} onChange={this.handelChange} />
                                                {this.validator2.message(setError[lang]['Email'], userObject_student.Email, 'required', { className: 'alert alert-danger' })}
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label htmlFor="password" style={{ float: lang === 'fa' || lang === 'ar' ? 'right' : 'left' }}><h6 className="text-primary mb-0 ml-1" >{getTitle(lang)[1]}</h6></Form.Label>
                                                <Form.Control id="password" name="Password" type="password" placeholder={getPlaceHolder(lang)[1]} value={userObject_student.Password} onChange={this.handelChange} />
                                                {this.validator2.message(setError[lang]['Password'], userObject_student.Password, 'required', { className: 'alert alert-danger' })}
                                            </Form.Group>
                                        </Form>
                                    </Container>
                                </Suspense>
                            </Tab>

                        </Tabs>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.props.onHide}>Close</Button>
                        <Button type="submit" onClick={this.handleSubmit}>Login</Button>
                    </Modal.Footer>
                </Modal>

                {/* <Modal
                    {...this.props}
                    size="lg"
                    // show={show}
                    // onHide={onHide}
                    backdrop="static"
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                    <Modal.Header closeButton className="loginHeader">
                        <Row className="align-items-center">
                            <Col xs="2" className="text-center">
                                <img src="main-images/logo-circle.webp" width="100%" height="100%" alt="logo" />
                            </Col>
                            <Col xs="10" className="text-left m-0 p-0 ">
                                <Modal.Title id="example-modal-sizes-title-lg" className="h4 font-weight-bold text-white">Login to Portals</Modal.Title>
                            </Col>
                        </Row>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            {errorMessage !== '' && <div className="alert alert-danger">{errorMessage}</div>}
                            <Form.Group>
                                <Form.Label htmlFor="email"><h6 className="text-primary mb-0 ml-1" >Username: (Email)</h6></Form.Label>
                                <Form.Control id="email" name="Email" type="text" placeholder="Enter your email address" value={userObject.Email} onChange={this.handelChange} />
                                {this.validator.message('email', userObject.Email, 'required|email', { className: 'alert alert-danger' })}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label htmlFor="password"><h6 className="text-primary mb-0 ml-1" >Password:</h6></Form.Label>
                                <Form.Control id="password" name="Password" type="password" placeholder="Enter your password" value={userObject.Password} onChange={this.handelChange} />
                                {this.validator.message('password', userObject.Password, 'required', { className: 'alert alert-danger' })}
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.onHide}>Close</Button>
                        <Button type="submit" onClick={this.handleSubmit}  >Login</Button>
                    </Modal.Footer>
                </Modal> */}
            </div >

        );
    }
}

export default Login;