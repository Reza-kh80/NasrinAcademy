import React, { Component, Suspense } from 'react';
import { Container, Row, Col, Button, FormGroup, Label, Input, Spinner } from 'reactstrap';
import axios from 'axios';
import SimpleReactValidator from 'simple-react-validator';
import 'simple-react-validator/dist/locale/fa';
import 'simple-react-validator/dist/locale/fr';
import FileUpload from '../general/fileUpload';
import { getDatetime } from '../../utils/datetime';
// import { SketchPicker } from 'react-color';
// import reactCSS from 'reactcss';


const MyDropdown = React.lazy(() => import('../general/dropdown'));
class CourseRegistration extends Component {
    constructor(props) {
        super(props);
        // localStorage.getItem('lang')
        this.validator = new SimpleReactValidator({ locale: 'en' });

        this.state = {
            mediaEndMoint: process.env.REACT_APP_MediaEndPoint,
            apiEndPoint: process.env.REACT_APP_APIEndPoint,
            requestObject: {
                SessionPrice: "",
                SessionPriceFa: "",
                SessionPriceFr: "",
                M1_en: "",
                M1_fa: "",
                M1_fr: "",
                M2_en: "",
                M2_fa: "",
                M2_fr: "",
                M3_en: "",
                M3_fa: "",
                M3_fr: "",
                M4_en: "",
                M4_fa: "",
                M4_fr: "",
                M5_en: "",
                M5_fa: "",
                M5_fr: "",
                M6_en: "",
                M6_fa: "",
                M6_fr: "",
                M7_en: "",
                M7_fa: "",
                M7_fr: "",
                M8_en: "",
                M8_fa: "",
                M8_fr: "",
                ModificationDate: getDatetime(),
            },
            dropdownList: [],
            color: '#ff0000',
            displayColorPicker: false,
            LanguageId: "",
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

    getTeacher = async (id) => {
        await axios
            .get(
                this.state.apiEndPoint + `Teacher/DisplayAllRegistered?languageId=${id}`
            )
            .then((response) => {
                this.setState({
                    teacherList: response.data.filter(
                        (teacher) => teacher.IsDeleted === false
                    ),
                });
            });
    };

    getHeading = (lang, item) => {
        let heading = []
        if (lang === 'fa') {
            heading.push('ثبت دوره');
            heading.push('فرم جدید');
            heading.push('اطلاعات');
            heading.push('انتخاب زبان');
            heading.push('هزینه هر جلسه');
            heading.push('هزینه هر جلسه(انگلیسی)');
            heading.push('هزینه هر جلسه(فرانسوی)');
            heading.push('نمونه: 100,000 تومان');
            heading.push('نمونه:$15');
            heading.push("نمونه:$15")
            heading.push('تصویر(jpg,jpeg)');
            heading.push('رنگ');
            heading.push('#fff');
            heading.push('مزایا');
            heading.push('مزیت اول');
            heading.push('مزیت اول(انگلیسی)');
            heading.push('مزیت اول(فرانسوی)');
            heading.push('مزیت دوم');
            heading.push('مزیت دوم(انگلیسی)');
            heading.push('مزیت دوم(فرانسوی)');
            heading.push('مزیت سوم');
            heading.push('مزیت سوم(انگلیسی)');
            heading.push('مزیت سوم(فرانسوی)');
            heading.push('مزیت چهارم');
            heading.push('مزیت چهارم(انگلیسی)');
            heading.push('مزیت چهارم(فرانسوی)');
            heading.push('مزیت پنجم');
            heading.push('مزیت پنجم(انگلیسی)');
            heading.push('مزیت پنجم(فرانسوی)');
            heading.push('مزیت ششم');
            heading.push('مزیت ششم(انگلیسی)');
            heading.push('مزیت ششم(فرانسوی)');
            heading.push('مزیت هفتم');
            heading.push('مزیت هفتم(انگلیسی)');
            heading.push('مزیت هفتم(فرانسوی)');
            heading.push('مزیت هشتم');
            heading.push('مزیت هشتم(انگلیسی)');
            heading.push('مزیت هشتم(فرانسوی)');
            heading.push('ارسال درخواست');
            heading.push('لیست استاد ها');
        }

        if (lang === 'en') {
            heading.push('Course registration');
            heading.push('New Request');
            heading.push('Information');
            heading.push('Select Language');
            heading.push('Cost per session');
            heading.push('Cost per session(persian)');
            heading.push('Cost per session(french)');
            heading.push('Example:$15');
            heading.push('Example: 100,000 تومان');
            heading.push("Example:$15");
            heading.push('Photo(jpeg,jpg)');
            heading.push('Color');
            heading.push('#fff');
            heading.push('Advantages');
            heading.push('first advantage');
            heading.push('first advantage (persian)');
            heading.push('first advantage (french)');
            heading.push('second advantage');
            heading.push('second advantage (persian)');
            heading.push('second advantage (french)');
            heading.push('third advantage');
            heading.push('third advantage (persian)');
            heading.push('third advantage (french)');
            heading.push('fourth advantage');
            heading.push('fourth advantage (persian)');
            heading.push('fourth advantage (french)');
            heading.push('fifth advantage');
            heading.push('fifth advantage (persian)');
            heading.push('fifth advantage (french)');
            heading.push('sixth advantage');
            heading.push('sixth advantage (persian)');
            heading.push('sixth advantage (french)');
            heading.push('Seventh Advantage');
            heading.push('Seventh advantage (persian)');
            heading.push('Seventh advantage (french)');
            heading.push('eighth advantage');
            heading.push('eighth advantage(persian)');
            heading.push('eighth advantage(french)');
            heading.push('Send Request');
            heading.push('Teachers List');
            heading.push(item.Name);
        }

        if (lang === 'fr') {
            heading.push("L'inscription aux cours");
            heading.push('Nouvelle requête');
            heading.push('Informations');
            heading.push('Choisir la langue');
            heading.push('Coût par séance');
            heading.push('Coût par séance(persan)');
            heading.push('Coût par séance(anglais)');
            heading.push("Exp:$15");
            heading.push('Exp:$15');
            heading.push('Exp: 100,000 تومان');
            heading.push('Photo(jpeg,jpg)');
            heading.push('Couleur');
            heading.push('#fff');
            heading.push('Avantages');
            heading.push('premier avantage');
            heading.push('premier avantage (persan)');
            heading.push('premier avantage (anglais)');
            heading.push('second avantage');
            heading.push('deuxième avantage (persan)');
            heading.push('deuxième avantage (anglais)');
            heading.push('troisième avantage');
            heading.push('troisième avantage (persan)');
            heading.push('troisième avantage (anglais)');
            heading.push('quatrième avantage');
            heading.push('quatrième avantage (persan)');
            heading.push('quatrième avantage (anglais)');
            heading.push('cinquième avantage');
            heading.push('cinquième avantage (persan)');
            heading.push('cinquième avantage (anglais)');
            heading.push('sixième avantage');
            heading.push('sixième avantage (persan)');
            heading.push('sixième avantage (anglais)');
            heading.push('Seventh Advantage');
            heading.push('Septième avantage (persan)');
            heading.push('Septième avantage (anglais)');
            heading.push('huitième avantage');
            heading.push('huitième avantage(persan)');
            heading.push('huitième avantage(anglais)');
            heading.push('Envoyer la demande');
        }
        return heading;
    }

    onNewHandeler() {
        let requestObject = { ...this.state.requestObject };
        requestObject.SessionPrice = '';
        requestObject.SessionPriceFa = '';
        requestObject.SessionPriceFr = '';
        requestObject.Color = '';
        requestObject.M1_en = '';
        requestObject.M1_fa = '';
        requestObject.M1_fr = '';
        requestObject.M2_en = '';
        requestObject.M2_fa = '';
        requestObject.M2_fr = '';
        requestObject.M3_en = '';
        requestObject.M3_fa = '';
        requestObject.M3_fr = '';
        requestObject.M4_en = '';
        requestObject.M4_fa = '';
        requestObject.M4_fr = '';
        requestObject.M5_en = '';
        requestObject.M5_fa = '';
        requestObject.M5_fr = '';
        requestObject.M6_en = '';
        requestObject.M6_fa = '';
        requestObject.M6_fr = '';
        requestObject.M7_en = '';
        requestObject.M7_fa = '';
        requestObject.M7_fr = '';
        requestObject.M8_en = '';
        requestObject.M8_fa = '';
        requestObject.M8_fr = '';
        requestObject.ModificationDate = getDatetime();
    }

    handleChange = e => {
        let requestObject = { ...this.state.requestObject };
        requestObject[e.currentTarget.name] = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        this.setState({ requestObject });
    }

    handleDropdownSelectLanguage = (e) => {
        let languageId = e.target.value;
        if (languageId === "") {
            this.setState({ languageId: "" });
            return;
        } else {
            this.getTeacher(languageId);
            this.setState({ LanguageId: languageId });
        }
    };

    componentDidMount() {
        this.getLanguage();
        this.onNewHandeler();
        this.getTeacher(1);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.requestObject !== this.state.requestObject) {
            // console.log(this.state.requestObject)
        }
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

    // handleClickColor = () => {
    //     this.setState({ displayColorPicker: !this.state.displayColorPicker })
    // };

    // handleCloseColor = () => {
    //     this.setState({ displayColorPicker: false })
    // };

    handleChangeColor = (e) => {
        this.setState({ color: e.target.value })
    };

    render() {
        const { requestObject, dropdownList, color, LanguageId } = this.state;
        // localStorage.getItem('lang')
        const lang = 'en';

        const setError = {
            'fa': {
                'language': 'انتخاب زبان',
                'color': 'رنگ',
                'picture': 'تصویر',
                'session': 'هزینه هر جلسه',
                'teacher': 'استاد مورد نظر'
            },

            'en': {
                'language': 'Select Language',
                'color': 'Color',
                'picture': 'Image',
                'session': 'Session Price',
                'teacher': 'Teacher List'
            },

            'fr': {
                'language': 'Choisir la langue',
                'color': 'Couleur',
                'picture': 'Image',
                'session': 'Coût par séance',
                'teacher': 'Liste des enseignants'
            }
        }

        // const styles = reactCSS({
        //     'default': {
        //         color: {
        //             width: '36px',
        //             height: '5px',
        //             borderRadius: '2px',
        //             background: color
        //         },
        //         swatch: {
        //             padding: '5px',
        //             background: '#fff',
        //             borderRadius: '1px',
        //             boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        //             display: 'inline-block',
        //             cursor: 'pointer',
        //         },
        //         popover: {
        //             position: 'absolute',
        //             zIndex: '2',
        //         },
        //         cover: {
        //             position: 'fixed',
        //             top: '0px',
        //             right: '0px',
        //             bottom: '0px',
        //             left: '0px',
        //         },
        //     },
        // });
        return (
            <div className="m-0 p-0">
                <Container fluid dir={lang === 'fa' ? 'rtl' : 'ltr'}>
                    <Row className="mb-2">
                        <Col xs="12" className={lang === 'fa' ? "text-right text-dark p-0" : "text-left text-dark p-0"} >
                            <h2 className="text-primary">{this.getHeading(lang, "")[0]}</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col className={lang === 'fa' ? "text-right border  border-primary rounded p-3 overflow-auto w-100" : "text-left border  border-primary rounded p-3 overflow-auto w-100"}>
                            <h5 className="text-primary font-weight-bold">{this.getHeading(lang, "")[2]}</h5>
                            <Row form>
                                <Col xs={12} lg={4}>
                                    <Suspense fallback={<Spinner color="success" />}>
                                        <div className={lang === "fa" ? "text-right m-0 p-0" : "m-0 p-0"}>
                                            <MyDropdown
                                                label={this.getHeading(lang, "")[3]}
                                                display={this.getHeading(lang, "")[3]}
                                                dataList={dropdownList}
                                                handleChange={this.handleDropdownSelectLanguage}
                                                name="LanguageId"
                                                selectedValue={LanguageId}
                                                htmlFor="language"
                                                width={window.innerWidth < 576 ? "w-100" : "w-25"}
                                            />
                                        </div>
                                    </Suspense>
                                    {this.validator.message(setError[lang]['language'], requestObject.TeachingCourses, 'required|max:95', { className: 'alert alert-danger' })}
                                </Col>
                                <Col xs={12} lg={4} >
                                    <FileUpload postMethod={'Teacher/UploadFile'} title={this.getHeading(lang, "")[10]} accept={['jpeg', 'jpg']} specifiedFileName="NoName" onUpload={this.onUpload} />
                                    {this.validator.message(setError[lang]['picture'], requestObject.TeachingCourses, 'required|max:95', { className: 'alert alert-danger' })}
                                </Col>
                                <Col xs={12} lg={4}>
                                    <FormGroup>
                                        <Label for="color" className='text-primary'>{this.getHeading(lang, "")[11]}</Label>
                                        <Row>
                                            <Col xs={2}>
                                                <Input className='text-left' dir="ltr" type="color" id="color" name="Color" value={color}
                                                    onChange={this.handleChangeColor}
                                                    placeholder={this.getHeading(lang, "")[12]}
                                                    style={{ width: 50 }}
                                                />
                                            </Col>
                                            <Col xs={10}>
                                                <Input type='text' style={{ color }} value={this.state.color} disabled />
                                            </Col>
                                        </Row>

                                        {/* <div style={styles.swatch} onClick={this.handleClickColor}>
                                            <div style={styles.color} />
                                        </div>
                                        {this.state.displayColorPicker ? <div style={styles.popover}>
                                            <div style={styles.cover} onClick={this.handleCloseColor} />
                                            <SketchPicker color={color} onChange={this.handleChangeColor} />
                                        </div> : null} */}
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col xs={12} lg={4}>
                                    <FormGroup>
                                        <Label for="sessionprice" className='text-primary'>{this.getHeading(lang, "")[4]}</Label>
                                        <Input className='text-left' dir="ltr" type="text" id="sessionprice" name="SessionPrice" value={requestObject.SessionPrice} onChange={this.handleChange} />
                                    </FormGroup>
                                    {this.validator.message(setError[lang]['session'], requestObject.TeachingCourses, 'required|max:95', { className: 'alert alert-danger' })}
                                </Col>
                                <Col xs={12} lg={4}>
                                    <FormGroup>
                                        <Label for="sessionpricefa" className='text-primary'>{this.getHeading(lang, "")[5]}</Label>
                                        <Input className='text-left' dir="ltr" type="text" id="sessionpricefa" name="SessionPriceFa" value={requestObject.SessionPriceFa} onChange={this.handleChange} placeholder={this.getHeading(lang, "")[8]} />
                                    </FormGroup>
                                </Col>
                                <Col xs={12} lg={4}>
                                    <FormGroup>
                                        <Label for="sessionpricefr" className='text-primary'>{this.getHeading(lang, "")[6]}</Label>
                                        <Input className='text-left' dir="ltr" type="text" id="sessionpricefr" name="SessionPriceFr" value={requestObject.SessionPriceFr} onChange={this.handleChange} placeholder={this.getHeading(lang, "")[9]} />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <hr className="bg-warning" />

                            <h5 className="text-primary font-weight-bold">{this.getHeading(lang, "")[13]}</h5>
                            <Row form>
                                <Col xs={12} lg={4}>
                                    <FormGroup>
                                        <Label for="M1_en" className='text-primary'>{this.getHeading(lang, "")[14]}</Label>
                                        <Input className='text-left' dir="ltr" type="text" id="M1_en" name="M1_en" value={requestObject.M1_en} onChange={this.handleChange} />
                                    </FormGroup>
                                </Col>
                                <Col xs={12} lg={4}>
                                    <FormGroup>
                                        <Label for="M1_fa" className='text-primary'>{this.getHeading(lang, "")[15]}</Label>
                                        <Input className='text-left' dir="ltr" type="text" id="M1_fa" name="M1_fa" value={requestObject.M1_fa} onChange={this.handleChange} />
                                    </FormGroup>
                                </Col>
                                <Col xs={12} lg={4}>
                                    <FormGroup>
                                        <Label for="M1_fr" className='text-primary'>{this.getHeading(lang, "")[16]}</Label>
                                        <Input className='text-left' dir="ltr" type="text" id="M1_fr" name="M1_fr" value={requestObject.M1_fr} onChange={this.handleChange} />
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row form>
                                <Col xs={12} lg={4}>
                                    <FormGroup>
                                        <Label for="M2_en" className='text-primary'>{this.getHeading(lang, "")[17]}</Label>
                                        <Input className='text-left' dir="ltr" type="text" id="M2_en" name="M2_en" value={requestObject.M2_en} onChange={this.handleChange} />
                                    </FormGroup>

                                </Col>
                                <Col xs={12} lg={4}>
                                    <FormGroup>
                                        <Label for="M2_fa" className='text-primary'>{this.getHeading(lang, "")[18]}</Label>
                                        <Input className='text-left' dir="ltr" type="text" id="M2_fa" name="M2_fa" value={requestObject.M2_fa} onChange={this.handleChange} />
                                    </FormGroup>

                                </Col>
                                <Col xs={12} lg={4}>
                                    <FormGroup>
                                        <Label for="M2_fr" className='text-primary'>{this.getHeading(lang, "")[19]}</Label>
                                        <Input className='text-left' dir="ltr" type="text" id="M2_fr" name="SesM2_frsionPrice" value={requestObject.M2_fr} onChange={this.handleChange} />
                                    </FormGroup>

                                </Col>
                            </Row>

                            <Row form>
                                <Col xs={12} lg={4}>
                                    <FormGroup>
                                        <Label for="M3_en" className='text-primary'>{this.getHeading(lang, "")[20]}</Label>
                                        <Input className='text-left' dir="ltr" type="text" id="M3_en" name="M3_en" value={requestObject.M3_en} onChange={this.handleChange} />
                                    </FormGroup>

                                </Col>
                                <Col xs={12} lg={4}>
                                    <FormGroup>
                                        <Label for="M3_fa" className='text-primary'>{this.getHeading(lang, "")[21]}</Label>
                                        <Input className='text-left' dir="ltr" type="text" id="M3_fa" name="M3_fa" value={requestObject.M3_fa} onChange={this.handleChange} />
                                    </FormGroup>

                                </Col>
                                <Col xs={12} lg={4}>
                                    <FormGroup>
                                        <Label for="M3_fr" className='text-primary'>{this.getHeading(lang, "")[22]}</Label>
                                        <Input className='text-left' dir="ltr" type="text" id="M3_fr" name="M3_fr" value={requestObject.M3_fr} onChange={this.handleChange} />
                                    </FormGroup>

                                </Col>
                            </Row>

                            <Row form>
                                <Col xs={12} lg={4}>
                                    <FormGroup>
                                        <Label for="M4_en" className='text-primary'>{this.getHeading(lang, "")[23]}</Label>
                                        <Input className='text-left' dir="ltr" type="text" id="M4_en" name="M4_en" value={requestObject.M4_en} onChange={this.handleChange} />
                                    </FormGroup>

                                </Col>
                                <Col xs={12} lg={4}>
                                    <FormGroup>
                                        <Label for="M4_fa" className='text-primary'>{this.getHeading(lang, "")[24]}</Label>
                                        <Input className='text-left' dir="ltr" type="text" id="M4_fa" name="M4_fa" value={requestObject.M4_fa} onChange={this.handleChange} />
                                    </FormGroup>

                                </Col>
                                <Col xs={12} lg={4}>
                                    <FormGroup>
                                        <Label for="M4_fr" className='text-primary'>{this.getHeading(lang, "")[25]}</Label>
                                        <Input className='text-left' dir="ltr" type="text" id="seM4_frssionprice" name="M4_fr" value={requestObject.M4_fr} onChange={this.handleChange} />
                                    </FormGroup>

                                </Col>
                            </Row>

                            <Row form>
                                <Col xs={12} lg={4}>
                                    <FormGroup>
                                        <Label for="M5_en" className='text-primary'>{this.getHeading(lang, "")[26]}</Label>
                                        <Input className='text-left' dir="ltr" type="text" id="M5_en" name="M5_en" value={requestObject.M5_en} onChange={this.handleChange} />
                                    </FormGroup>

                                </Col>
                                <Col xs={12} lg={4}>
                                    <FormGroup>
                                        <Label for="M5_fa" className='text-primary'>{this.getHeading(lang, "")[27]}</Label>
                                        <Input className='text-left' dir="ltr" type="text" id="M5_fa" name="M5_fa" value={requestObject.M5_fa} onChange={this.handleChange} />
                                    </FormGroup>

                                </Col>
                                <Col xs={12} lg={4}>
                                    <FormGroup>
                                        <Label for="M5_fr" className='text-primary'>{this.getHeading(lang, "")[28]}</Label>
                                        <Input className='text-left' dir="ltr" type="text" id="M5_fr" name="M5_fr" value={requestObject.M5_fr} onChange={this.handleChange} />
                                    </FormGroup>

                                </Col>
                            </Row>

                            <Row form>
                                <Col xs={12} lg={4}>
                                    <FormGroup>
                                        <Label for="M6_en" className='text-primary'>{this.getHeading(lang, "")[29]}</Label>
                                        <Input className='text-left' dir="ltr" type="text" id="M6_en" name="M6_en" value={requestObject.M6_en} onChange={this.handleChange} />
                                    </FormGroup>

                                </Col>
                                <Col xs={12} lg={4}>
                                    <FormGroup>
                                        <Label for="M6_fa" className='text-primary'>{this.getHeading(lang, "")[30]}</Label>
                                        <Input className='text-left' dir="ltr" type="text" id="M6_fa" name="M6_fa" value={requestObject.M6_fa} onChange={this.handleChange} />
                                    </FormGroup>

                                </Col>
                                <Col xs={12} lg={4}>
                                    <FormGroup>
                                        <Label for="M6_fr" className='text-primary'>{this.getHeading(lang, "")[31]}</Label>
                                        <Input className='text-left' dir="ltr" type="text" id="M6_fr" name="M6_fr" value={requestObject.M6_fr} onChange={this.handleChange} />
                                    </FormGroup>

                                </Col>
                            </Row>

                            <Row form>
                                <Col xs={12} lg={4}>
                                    <FormGroup>
                                        <Label for="M7_en" className='text-primary'>{this.getHeading(lang, "")[32]}</Label>
                                        <Input className='text-left' dir="ltr" type="text" id="M7_en" name="M7_en" value={requestObject.M7_en} onChange={this.handleChange} />
                                    </FormGroup>

                                </Col>
                                <Col xs={12} lg={4}>
                                    <FormGroup>
                                        <Label for="M7_fa" className='text-primary'>{this.getHeading(lang, "")[33]}</Label>
                                        <Input className='text-left' dir="ltr" type="text" id="M7_fa" name="M7_fa" value={requestObject.M7_fa} onChange={this.handleChange} />
                                    </FormGroup>

                                </Col>
                                <Col xs={12} lg={4}>
                                    <FormGroup>
                                        <Label for="M7_fr" className='text-primary'>{this.getHeading(lang, "")[34]}</Label>
                                        <Input className='text-left' dir="ltr" type="text" id="M7_fr" name="M7_fr" value={requestObject.M7_fr} onChange={this.handleChange} />
                                    </FormGroup>

                                </Col>
                            </Row>

                            <Row form>
                                <Col xs={12} lg={4}>
                                    <FormGroup>
                                        <Label for="M8_en" className='text-primary'>{this.getHeading(lang, "")[35]}</Label>
                                        <Input className='text-left' dir="ltr" type="text" id="M8_en" name="M8_en" value={requestObject.M8_en} onChange={this.handleChange} />
                                    </FormGroup>

                                </Col>
                                <Col xs={12} lg={4}>
                                    <FormGroup>
                                        <Label for="M8_fa" className='text-primary'>{this.getHeading(lang, "")[36]}</Label>
                                        <Input className='text-left' dir="ltr" type="text" id="M8_fa" name="M8_fa" value={requestObject.M8_fa} onChange={this.handleChange} />
                                    </FormGroup>

                                </Col>
                                <Col xs={12} lg={4}>
                                    <FormGroup>
                                        <Label for="M8_fr" className='text-primary'>{this.getHeading(lang, "")[37]}</Label>
                                        <Input className='text-left' dir="ltr" type="text" id="M8_fr" name="M8_fr" value={requestObject.M8_fr} onChange={this.handleChange} />
                                    </FormGroup>

                                </Col>
                            </Row>
                            <Button className={lang === 'fa' ? "btn btn-sm float-left" : "btn btn-sm float-right"} onClick={this.handleSubmit} >{this.getHeading(lang, "")[38]}</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default CourseRegistration;