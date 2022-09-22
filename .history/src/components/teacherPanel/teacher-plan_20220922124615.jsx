import React, { Component } from 'react';
import { Container, Row, Col, Button, FormGroup, Label } from 'reactstrap';
import axios from 'axios';
import SimpleReactValidator from 'simple-react-validator';
import 'simple-react-validator/dist/locale/fa';
import 'simple-react-validator/dist/locale/fr';
import { getDatetime } from './../../utils/datetime';
import Form from 'react-bootstrap/Form';
import TimeKeeper from 'react-timekeeper';
import ModalClock from './ModalClock.jsx';

class TeacherPlan extends Component {
    constructor(props) {
        super(props);
        // localStorage.getItem('lang')
        this.validator = new SimpleReactValidator({ locale: 'en' });

        this.state = {
            mediaEndMoint: process.env.REACT_APP_MediaEndPoint,
            apiEndPoint: process.env.REACT_APP_APIEndPoint,
            requestObject: {
                fromSaturdayBefor: "00:00",
                untilSaturdayBefor: "00:00",
                fromSaturdayAfter: "00:00",
                untilSaturdayAfter: "00:00",

                fromSundayBefor: "00:00",
                untilSundayBefor: "00:00",
                fromSundayAfter: "00:00",
                untilSundayAfter: "00:00",

                fromMondayBefor: "00:00",
                untilMondayBefor: "00:00",
                fromMondayAfter: "00:00",
                untilMondayAfter: "00:00",

                fromTuesdayBefor: "00:00",
                untilTuesdayBefor: "00:00",
                fromTuesdayAfter: "00:00",
                untilTuesdayAfter: "00:00",

                fromWednesdayBefor: "00:00",
                untilWednesdayBefor: "00:00",
                fromWednesdayAfter: "00:00",
                untilWednesdayAfter: "00:00",

                fromThursdayBefor: "00:00",
                untilThursdayBefor: "00:00",
                fromThursdayAfter: "00:00",
                untilThursdayAfter: "00:00",

                fromFridayBefor: "00:00",
                untilFridayBefor: "00:00",
                fromFridayAfter: "00:00",
                untilFridayAfter: "00:00"
            },
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

    handleChange = e => {
        let requestObject = { ...this.state.requestObject };
        requestObject[e.currentTarget.name] = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        this.setState({ requestObject });
    }

    getHeading = (lang, item) => {
        let heading = []

        if (lang === 'fa') {
            heading.push('ثبت برنامه هفتگی');
            heading.push('روز های هفته');
            heading.push('شنبه');
            heading.push('یکشنبه');
            heading.push('دوشنبه');
            heading.push('سه شنبه');
            heading.push('چهارشنبه');
            heading.push('پنجشنبه');
            heading.push('جمعه');
            heading.push('قبل از ظهر');
            heading.push('بعد از ظهر');
            heading.push('از ساعت:');
            heading.push('تا ساعت:');
            heading.push('ثبت');
            heading.push('لیست اساتید');
            heading.push('انتخاب زبان');
        }

        if (lang === 'en') {
            heading.push('Record the weekly schedule');
            heading.push('Days of the Week');
            heading.push('Saturday');
            heading.push('Sunday');
            heading.push('Monday');
            heading.push('Tuesday');
            heading.push('Wednesday');
            heading.push('Thursday');
            heading.push('Friday');
            heading.push('forenoon');
            heading.push('after noon');
            heading.push('from hours:');
            heading.push('up to the hour:');
            heading.push('Submit');
            heading.push('Teacher List');
            heading.push('Select Language');
            heading.push(item.Name);
        }

        if (lang === 'fr') {
            heading.push('Enregistrer le programme hebdomadaire');
            heading.push('Jours de la semaine');
            heading.push('Samedi');
            heading.push('Dimanche');
            heading.push('Monday');
            heading.push('mardi');
            heading.push('Mercredi');
            heading.push('Jeudi');
            heading.push('Vendredi');
            heading.push('avant midi');
            heading.push('après midi');
            heading.push('depuis les heures:');
            heading.push('jusqu"à l"heure:');
            heading.push('Soumettre');
        }
        return heading;
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
        let requestObject = this.state.requestObject;

        if (this.validator.allValid()) {
            axios({
                method: 'post',
                url: this.state.apiEndPoint + 'Calender/Add',
                data: {
                    UserId:parseInt(localStorage.getItem('UserId')),
                    SaturdayAM: requestObject.fromSaturdayBefor + " - " + requestObject.untilSaturdayBefor,
                    SaturdayPM: requestObject.fromSaturdayAfter + " - " + requestObject.untilSaturdayAfter,
                    SundayAM: requestObject.fromSundayBefor + " - " + requestObject.untilSundayBefor,
                    SundayPM: requestObject.fromSundayAfter + " - " + requestObject.untilSundayAfter,
                    MondayAM: requestObject.fromMondayBefor + " - " + requestObject.untilMondayBefor,
                    MondayPM: requestObject.fromMondayAfter + " - " + requestObject.untilMondayAfter,
                    TuesdayAM: requestObject.fromTuesdayBefor + " - " + requestObject.untilTuesdayBefor,
                    TuesdayPM: requestObject.fromTuesdayAfter + " - " + requestObject.untilTuesdayAfter,
                    WednesdayAM: requestObject.fromWednesdayBefor + " - " + requestObject.untilWednesdayBefor,
                    WednesdayPM: requestObject.fromWednesdayAfter + " - " + requestObject.untilWednesdayAfter,
                    ThursdayAM: requestObject.fromThursdayBefor + " - " + requestObject.untilThursdayBefor,
                    ThursdayPM: requestObject.fromThursdayAfter + " - " + requestObject.untilThursdayAfter,
                    FridayAM: requestObject.fromFridayBefor + " - " + requestObject.untilFridayBefor,
                    FridayPM: requestObject.fromFridayAfter + " - " + requestObject.untilFridayAfter,
                }
            }).then(response => {
                console.log(response);
            })
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    onNewHandeler() {
        let requestObject = { ...this.state.requestObject };
        requestObject.fromSaturdayAfter = "00:00";
        requestObject.untilSaturdayAfter = "00:00";
        requestObject.fromSaturdayBefor = "00:00";
        requestObject.untilSaturdayBefor = "00:00";

        requestObject.fromSundayBefor = "00:00";
        requestObject.untilSundayBefor = "00:00";
        requestObject.fromSundayAfter = "00:00";
        requestObject.untilSundayAfter = "00:00";

        requestObject.fromMondayBefor = "00:00";
        requestObject.untilMondayBefor = "00:00";
        requestObject.fromMondayAfter = "00:00";
        requestObject.untilMondayAfter = "00:00";

        requestObject.fromTuesdayBefor = "00:00";
        requestObject.untilTuesdayBefor = "00:00";
        requestObject.fromTuesdayAfter = "00:00";
        requestObject.untilTuesdayAfter = "00:00";

        requestObject.fromWednesdayBefor = "00:00";
        requestObject.untilWednesdayBefor = "00:00";
        requestObject.fromWednesdayAfter = "00:00";
        requestObject.untilWednesdayAfter = "00:00";

        requestObject.fromThursdayBefor = "00:00";
        requestObject.untilThursdayBefor = "00:00";
        requestObject.fromThursdayAfter = "00:00";
        requestObject.untilThursdayAfter = "00:00";

        requestObject.fromFridayBefor = "00:00";
        requestObject.untilFridayBefor = "00:00";
        requestObject.fromFridayAfter = "00:00";
        requestObject.untilFridayAfter = "00:00";
        requestObject.ModificationDate = getDatetime();
    }

    onChange(val, key) {
        var newTime = {};
        switch (key) {
            case 'fromSaturdayBefor':
                newTime = { ...this.state.requestObject, fromSaturdayBefor: val };
                this.setState({ requestObject: newTime })
                break;
            case 'untilSaturdayBefor':
                newTime = { ...this.state.requestObject, untilSaturdayBefor: val };
                this.setState({ requestObject: newTime })
                break;
            case 'fromSaturdayAfter':
                newTime = { ...this.state.requestObject, fromSaturdayAfter: val };
                this.setState({ requestObject: newTime })
                break;
            case 'untilSaturdayAfter':
                newTime = { ...this.state.requestObject, untilSaturdayAfter: val };
                this.setState({ requestObject: newTime })
                break;

            case 'fromSundayBefor':
                newTime = { ...this.state.requestObject, fromSundayBefor: val };
                this.setState({ requestObject: newTime })
                break;
            case 'untilSundayBefor':
                newTime = { ...this.state.requestObject, untilSundayBefor: val };
                this.setState({ requestObject: newTime })
                break;
            case 'fromSundayAfter':
                newTime = { ...this.state.requestObject, fromSundayAfter: val };
                this.setState({ requestObject: newTime })
                break;
            case 'untilSundayAfter':
                newTime = { ...this.state.requestObject, untilSundayAfter: val };
                this.setState({ requestObject: newTime })
                break;

            case 'fromMondayBefor':
                newTime = { ...this.state.requestObject, fromMondayBefor: val };
                this.setState({ requestObject: newTime })
                break;
            case 'untilMondayBefor':
                newTime = { ...this.state.requestObject, untilMondayBefor: val };
                this.setState({ requestObject: newTime })
                break;
            case 'fromMondayAfter':
                newTime = { ...this.state.requestObject, fromMondayAfter: val };
                this.setState({ requestObject: newTime })
                break;
            case 'untilMondayAfter':
                newTime = { ...this.state.requestObject, untilMondayAfter: val };
                this.setState({ requestObject: newTime })
                break;

            case 'fromTuesdayBefor':
                newTime = { ...this.state.requestObject, fromTuesdayBefor: val };
                this.setState({ requestObject: newTime })
                break;
            case 'untilTuesdayBefor':
                newTime = { ...this.state.requestObject, untilTuesdayBefor: val };
                this.setState({ requestObject: newTime })
                break;
            case 'fromTuesdayAfter':
                newTime = { ...this.state.requestObject, fromTuesdayAfter: val };
                this.setState({ requestObject: newTime })
                break;
            case 'untilTuesdayAfter':
                newTime = { ...this.state.requestObject, untilTuesdayAfter: val };
                this.setState({ requestObject: newTime })
                break;

            case 'fromWednesdayBefor':
                newTime = { ...this.state.requestObject, fromWednesdayBefor: val };
                this.setState({ requestObject: newTime })
                break;
            case 'untilWednesdayBefor':
                newTime = { ...this.state.requestObject, untilWednesdayBefor: val };
                this.setState({ requestObject: newTime })
                break;
            case 'fromWednesdayAfter':
                newTime = { ...this.state.requestObject, fromWednesdayAfter: val };
                this.setState({ requestObject: newTime })
                break;
            case 'untilWednesdayAfter':
                newTime = { ...this.state.requestObject, untilWednesdayAfter: val };
                this.setState({ requestObject: newTime })
                break;

            case 'fromThursdayBefor':
                newTime = { ...this.state.requestObject, fromThursdayBefor: val };
                this.setState({ requestObject: newTime })
                break;
            case 'untilThursdayBefor':
                newTime = { ...this.state.requestObject, untilThursdayBefor: val };
                this.setState({ requestObject: newTime })
                break;
            case 'fromThursdayAfter':
                newTime = { ...this.state.requestObject, fromThursdayAfter: val };
                this.setState({ requestObject: newTime })
                break;
            case 'untilThursdayAfter':
                newTime = { ...this.state.requestObject, untilThursdayAfter: val };
                this.setState({ requestObject: newTime })
                break;

            case 'fromFridayBefor':
                newTime = { ...this.state.requestObject, fromFridayBefor: val };
                this.setState({ requestObject: newTime })
                break;
            case 'untilFridayBefor':
                newTime = { ...this.state.requestObject, untilFridayBefor: val };
                this.setState({ requestObject: newTime })
                break;
            case 'fromFridayAfter':
                newTime = { ...this.state.requestObject, fromFridayAfter: val };
                this.setState({ requestObject: newTime })
                break;
            case 'untilFridayAfter':
                newTime = { ...this.state.requestObject, untilFridayAfter: val };
                this.setState({ requestObject: newTime })
                break;
        }

    }

    HandleCheckBox = (e) => {
        let requestObject = { ...this.state.requestObject };
        requestObject[e.currentTarget.id] = e.target.checked;
        this.setState({ requestObject });
    }

    render() {
        const { requestObject } = this.state;
        // const lang = localStorage.getItem('lang');
        const lang = 'en';
        const setError = {
            'fa': {
                'Saturday': 'شنبه',
                'Sunday': 'یکشنبه',
                'Monday': 'دوشنبه',
                'Tuesday': 'سه شنبه',
                'Wednesday': 'چهارشنبه',
                'Thursday': 'پنجشنبه',
                'Friday': 'جمعه'
            },

            'en': {
                'Saturday': 'Saturday',
                'Sunday': 'Sunday',
                'Monday': 'Monday',
                'Tuesday': 'Tuesday',
                'Wednesday': 'Wednesday',
                'Thursday': 'Thursday',
                'Friday': 'Friday'
            },

            'fr': {
                'Saturday': 'Samedi',
                'Sunday': 'Dimanche',
                'Monday': 'Monday',
                'Tuesday': 'mardi',
                'Wednesday': 'Mercredi',
                'Thursday': 'Jeudi',
                'Friday': 'Vendredi'
            }
        }

        return (
            <div className="m-0 p-0">
                <Container fluid dir={lang === 'fa' ? 'rtl' : 'ltr'}>
                    <Row className="mb-2">
                        <Col xs="12" className={lang === 'fa' ? "text-right text-dark p-0" : "text-left text-dark p-0"} >
                            <h2 className="text-primary">{this.getHeading(lang, '')[0]}</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col className={lang === 'fa' ? "text-right border  border-primary rounded p-3 overflow-auto w-100" : "text-left border  border-primary rounded p-3 overflow-auto w-100"}>
                            <Row form>
                                <Col xs={12}>
                                    <table className="table table-bordered border-primary">
                                        <thead className='text-center'>
                                            <tr>
                                                <th>{this.getHeading(lang, '')[1]}</th>
                                                <th>{this.getHeading(lang, '')[9]}</th>
                                                <th>{this.getHeading(lang, '')[10]}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th className='text-center'>{this.getHeading(lang, '')[2]}</th>
                                                <th>
                                                    <Container>
                                                        <Row>
                                                            <Col xs={12} lg={6}>
                                                                <FormGroup>
                                                                    <Label for="fromSaturdayBefor">{this.getHeading(lang, '')[11]}</Label>
                                                                    &nbsp;&nbsp;
                                                                    <span className='text-primary'>{requestObject.fromSaturdayBefor}</span>
                                                                    <br />
                                                                    <ModalClock>
                                                                        <div className='text-center'>
                                                                            <TimeKeeper
                                                                                hour24Mode
                                                                                time={requestObject.fromSaturdayBefor}
                                                                                onChange={(val) => this.onChange(val.formatted24, "fromSaturdayBefor")}
                                                                                switchToMinuteOnHourSelect
                                                                            />
                                                                        </div>
                                                                    </ModalClock>
                                                                    {/* <Form.Check
                                                                        inline
                                                                        type="switch"
                                                                        id='fromSaturdayBefor'
                                                                        checked={requestObject.fromSaturdayBefor}
                                                                        onChange={this.HandleCheckBox}
                                                                    /> */}
                                                                </FormGroup>
                                                            </Col>
                                                            <Col xs={12} lg={6}>
                                                                <FormGroup>
                                                                    <Label for="untilSaturdayBefor">{this.getHeading(lang, '')[12]}</Label>
                                                                    &nbsp;&nbsp;
                                                                    <span className='text-primary'>{requestObject.untilSaturdayBefor}</span>
                                                                    <br />
                                                                    <ModalClock>
                                                                        <div className='text-center'>
                                                                            <TimeKeeper
                                                                                hour24Mode
                                                                                time={requestObject.untilSaturdayBefor}
                                                                                onChange={(val) => this.onChange(val.formatted24, "untilSaturdayBefor")}
                                                                                switchToMinuteOnHourSelect
                                                                            />
                                                                        </div>
                                                                    </ModalClock>
                                                                    {/* <Form.Check
                                                                        inline
                                                                        type="switch"
                                                                        id='untilSaturdayBefor'
                                                                        checked={requestObject.untilSaturdayBefor}
                                                                        onChange={this.HandleCheckBox}
                                                                    /> */}
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>
                                                    </Container>
                                                </th>
                                                <th>
                                                    <Container>
                                                        <Row>
                                                            <Col xs={12} lg={6}>
                                                                <FormGroup>
                                                                    <Label for="fromSaturdayAfter">{this.getHeading(lang, '')[11]}</Label>                                                                    &nbsp;&nbsp;
                                                                    <span className='text-primary'>{requestObject.fromSaturdayAfter}</span>
                                                                    <br />
                                                                    <ModalClock>
                                                                        <div className='text-center'>
                                                                            <TimeKeeper
                                                                                hour24Mode
                                                                                time={requestObject.fromSaturdayAfter}
                                                                                onChange={(val) => this.onChange(val.formatted24, "fromSaturdayAfter")}
                                                                                switchToMinuteOnHourSelect
                                                                            />
                                                                        </div>
                                                                    </ModalClock>
                                                                    {/* <Form.Check
                                                                        inline
                                                                        type="switch"
                                                                        id='fromSaturdayAfter'
                                                                        checked={requestObject.fromSaturdayAfter}
                                                                        onChange={this.HandleCheckBox}
                                                                    /> */}
                                                                </FormGroup>
                                                            </Col>
                                                            <Col xs={12} lg={6}>
                                                                <FormGroup>
                                                                    <Label for="untilSaturdayAfter">{this.getHeading(lang, '')[12]}</Label>                                                                    &nbsp;&nbsp;
                                                                    <span className='text-primary'>{requestObject.untilSaturdayAfter}</span>
                                                                    <br />
                                                                    <ModalClock>
                                                                        <div className='text-center'>
                                                                            <TimeKeeper
                                                                                hour24Mode
                                                                                time={requestObject.untilSaturdayAfter}
                                                                                onChange={(val) => this.onChange(val.formatted24, "untilSaturdayAfter")}
                                                                                switchToMinuteOnHourSelect
                                                                            />
                                                                        </div>
                                                                    </ModalClock>
                                                                    {/* <Form.Check
                                                                        inline
                                                                        type="switch"
                                                                        id='untilSaturdayAfter'
                                                                        checked={requestObject.untilSaturdayAfter}
                                                                        onChange={this.HandleCheckBox}
                                                                    /> */}
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>
                                                    </Container>
                                                </th>
                                            </tr>
                                            {this.validator.message(setError[lang]['Saturday'], requestObject.fromSaturdayBefor, 'required|max:95', { className: 'alert alert-danger' })}
                                            <tr>
                                                <th className='text-center'>{this.getHeading(lang, '')[3]}</th>
                                                <th>
                                                    <Container>
                                                        <Row>
                                                            <Col xs={12} lg={6}>
                                                                <FormGroup>
                                                                    <Label for="fromSundayBefor">{this.getHeading(lang, '')[11]}</Label>                                                                    &nbsp;&nbsp;
                                                                    <span className='text-primary'>{requestObject.fromSundayBefor}</span>
                                                                    <br />
                                                                    <ModalClock>
                                                                        <div className='text-center'>
                                                                            <TimeKeeper
                                                                                hour24Mode
                                                                                time={requestObject.fromSundayBefor}
                                                                                onChange={(val) => this.onChange(val.formatted24, "fromSundayBefor")}
                                                                                switchToMinuteOnHourSelect
                                                                            />
                                                                        </div>
                                                                    </ModalClock>
                                                                    {/* <Form.Check
                                                                        inline
                                                                        type="switch"
                                                                        id='fromSundayBefor'
                                                                        checked={requestObject.fromSundayBefor}
                                                                        onChange={this.HandleCheckBox}
                                                                    /> */}
                                                                </FormGroup>
                                                            </Col>
                                                            <Col xs={12} lg={6}>
                                                                <FormGroup>
                                                                    <Label for="untilSundayBefor">{this.getHeading(lang, '')[12]}</Label>                                                                    &nbsp;&nbsp;
                                                                    <span className='text-primary'>{requestObject.untilSundayBefor}</span>
                                                                    <br />
                                                                    <ModalClock>
                                                                        <div className='text-center'>
                                                                            <TimeKeeper
                                                                                hour24Mode
                                                                                time={requestObject.untilSundayBefor}
                                                                                onChange={(val) => this.onChange(val.formatted24, "untilSundayBefor")}
                                                                                switchToMinuteOnHourSelect
                                                                            />
                                                                        </div>
                                                                    </ModalClock>
                                                                    {/* <Form.Check
                                                                        inline
                                                                        type="switch"
                                                                        id='untilSundayBefor'
                                                                        checked={requestObject.untilSundayBefor}
                                                                        onChange={this.HandleCheckBox}
                                                                    /> */}
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>
                                                    </Container>
                                                </th>
                                                <th>
                                                    <Container>
                                                        <Row>
                                                            <Col xs={12} lg={6}>
                                                                <FormGroup>
                                                                    <Label for="fromSundayAfter">{this.getHeading(lang, '')[11]}</Label>                                                                    &nbsp;&nbsp;
                                                                    <span className='text-primary'>{requestObject.fromSundayAfter}</span>
                                                                    <br />
                                                                    <ModalClock>
                                                                        <div className='text-center'>
                                                                            <TimeKeeper
                                                                                hour24Mode
                                                                                time={requestObject.fromSundayAfter}
                                                                                onChange={(val) => this.onChange(val.formatted24, "fromSundayAfter")}
                                                                                switchToMinuteOnHourSelect
                                                                            />
                                                                        </div>
                                                                    </ModalClock>
                                                                    {/* <Form.Check
                                                                        inline
                                                                        type="switch"
                                                                        id='fromSundayAfter'
                                                                        checked={requestObject.fromSundayAfter}
                                                                        onChange={this.HandleCheckBox}
                                                                    /> */}
                                                                </FormGroup>
                                                            </Col>
                                                            <Col xs={12} lg={6}>
                                                                <FormGroup>
                                                                    <Label for="untilSundayAfter">{this.getHeading(lang, '')[12]}</Label>                                                                    &nbsp;&nbsp;
                                                                    <span className='text-primary'>{requestObject.untilSundayAfter}</span>
                                                                    <br />
                                                                    <ModalClock>
                                                                        <div className='text-center'>
                                                                            <TimeKeeper
                                                                                hour24Mode
                                                                                time={requestObject.untilSundayAfter}
                                                                                onChange={(val) => this.onChange(val.formatted24, "untilSundayAfter")}
                                                                                switchToMinuteOnHourSelect
                                                                            />
                                                                        </div>
                                                                    </ModalClock>
                                                                    {/* <Form.Check
                                                                        inline
                                                                        type="switch"
                                                                        id='untilSundayAfter'
                                                                        checked={requestObject.untilSundayAfter}
                                                                        onChange={this.HandleCheckBox}
                                                                    /> */}
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>
                                                    </Container>
                                                </th>
                                            </tr>
                                            {this.validator.message(setError[lang]['Sunday'], requestObject.fromSaturdayBefor, 'required|max:95', { className: 'alert alert-danger' })}

                                            <tr>
                                                <th className='text-center'>{this.getHeading(lang, '')[4]}</th>
                                                <th>
                                                    <Container>
                                                        <Row>
                                                            <Col xs={12} lg={6}>
                                                                <FormGroup>
                                                                    <Label for="fromMondayBefor">{this.getHeading(lang, '')[11]}</Label>                                                                    &nbsp;&nbsp;
                                                                    <span className='text-primary'>{requestObject.fromMondayBefor}</span>
                                                                    <br />
                                                                    <ModalClock>
                                                                        <div className='text-center'>
                                                                            <TimeKeeper
                                                                                hour24Mode
                                                                                time={requestObject.fromMondayBefor}
                                                                                onChange={(val) => this.onChange(val.formatted24, "fromMondayBefor")}
                                                                                switchToMinuteOnHourSelect
                                                                            />
                                                                        </div>
                                                                    </ModalClock>
                                                                    {/* <Form.Check
                                                                        inline
                                                                        type="switch"
                                                                        id='fromMondayBefor'
                                                                        checked={requestObject.fromMondayBefor}
                                                                        onChange={this.HandleCheckBox}
                                                                    /> */}
                                                                </FormGroup>
                                                            </Col>
                                                            <Col xs={12} lg={6}>
                                                                <FormGroup>
                                                                    <Label for="untilMondayBefor">{this.getHeading(lang, '')[12]}</Label>                                                                    &nbsp;&nbsp;
                                                                    <span className='text-primary'>{requestObject.untilMondayBefor}</span>
                                                                    <br />
                                                                    <ModalClock>
                                                                        <div className='text-center'>
                                                                            <TimeKeeper
                                                                                hour24Mode
                                                                                time={requestObject.untilMondayBefor}
                                                                                onChange={(val) => this.onChange(val.formatted24, "untilMondayBefor")}
                                                                                switchToMinuteOnHourSelect
                                                                            />
                                                                        </div>
                                                                    </ModalClock>
                                                                    {/* <Form.Check
                                                                        inline
                                                                        type="switch"
                                                                        id='untilMondayBefor'
                                                                        checked={requestObject.untilMondayBefor}
                                                                        onChange={this.HandleCheckBox}
                                                                    /> */}
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>
                                                    </Container>
                                                </th>
                                                <th>
                                                    <Container>
                                                        <Row>
                                                            <Col xs={12} lg={6}>
                                                                <FormGroup>
                                                                    <Label for="fromMondayAfter">{this.getHeading(lang, '')[11]}</Label>                                                                    &nbsp;&nbsp;
                                                                    <span className='text-primary'>{requestObject.fromMondayAfter}</span>
                                                                    <br />
                                                                    <ModalClock>
                                                                        <div className='text-center'>
                                                                            <TimeKeeper
                                                                                hour24Mode
                                                                                time={requestObject.fromMondayAfter}
                                                                                onChange={(val) => this.onChange(val.formatted24, "fromMondayAfter")}
                                                                                switchToMinuteOnHourSelect
                                                                            />
                                                                        </div>
                                                                    </ModalClock>
                                                                    {/* <Form.Check
                                                                        inline
                                                                        type="switch"
                                                                        id='fromMondayAfter'
                                                                        checked={requestObject.fromMondayAfter}
                                                                        onChange={this.HandleCheckBox}
                                                                    /> */}
                                                                </FormGroup>
                                                            </Col>
                                                            <Col xs={12} lg={6}>
                                                                <FormGroup>
                                                                    <Label for="untilMondayAfter">{this.getHeading(lang, '')[12]}</Label>                                                                    &nbsp;&nbsp;
                                                                    <span className='text-primary'>{requestObject.untilMondayAfter}</span>
                                                                    <br />
                                                                    <ModalClock>
                                                                        <div className='text-center'>
                                                                            <TimeKeeper
                                                                                hour24Mode
                                                                                time={requestObject.untilMondayAfter}
                                                                                onChange={(val) => this.onChange(val.formatted24, "untilMondayAfter")}
                                                                                switchToMinuteOnHourSelect
                                                                            />
                                                                        </div>
                                                                    </ModalClock>
                                                                    {/* <Form.Check
                                                                        inline
                                                                        type="switch"
                                                                        id='untilMondayAfter'
                                                                        checked={requestObject.untilMondayAfter}
                                                                        onChange={this.HandleCheckBox}
                                                                    /> */}
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>
                                                    </Container>
                                                </th>
                                            </tr>
                                            {this.validator.message(setError[lang]['Monday'], requestObject.fromSaturdayBefor, 'required|max:95', { className: 'alert alert-danger' })}

                                            <tr>
                                                <th className='text-center'>{this.getHeading(lang, '')[5]}</th>
                                                <th>
                                                    <Container>
                                                        <Row>
                                                            <Col xs={12} lg={6}>
                                                                <FormGroup>
                                                                    <Label for="fromTuesdayBefor">{this.getHeading(lang, '')[11]}</Label>                                                                    &nbsp;&nbsp;
                                                                    <span className='text-primary'>{requestObject.fromTuesdayBefor}</span>
                                                                    <br />
                                                                    <ModalClock>
                                                                        <div className='text-center'>
                                                                            <TimeKeeper
                                                                                hour24Mode
                                                                                time={requestObject.fromTuesdayBefor}
                                                                                onChange={(val) => this.onChange(val.formatted24, "fromTuesdayBefor")}
                                                                                switchToMinuteOnHourSelect
                                                                            />
                                                                        </div>
                                                                    </ModalClock>
                                                                    {/* <Form.Check
                                                                        inline
                                                                        type="switch"
                                                                        id='fromTuesdayBefor'
                                                                        checked={requestObject.fromTuesdayBefor}
                                                                        onChange={this.HandleCheckBox}
                                                                    /> */}
                                                                </FormGroup>
                                                            </Col>
                                                            <Col xs={12} lg={6}>
                                                                <FormGroup>
                                                                    <Label for="untilTuesdayBefor">{this.getHeading(lang, '')[12]}</Label>                                                                    &nbsp;&nbsp;
                                                                    <span className='text-primary'>{requestObject.untilTuesdayBefor}</span>
                                                                    <br />
                                                                    <ModalClock>
                                                                        <div className='text-center'>
                                                                            <TimeKeeper
                                                                                hour24Mode
                                                                                time={requestObject.untilTuesdayBefor}
                                                                                onChange={(val) => this.onChange(val.formatted24, "untilTuesdayBefor")}
                                                                                switchToMinuteOnHourSelect
                                                                            />
                                                                        </div>
                                                                    </ModalClock>
                                                                    {/* <Form.Check
                                                                        inline
                                                                        type="switch"
                                                                        id='untilTuesdayBefor'
                                                                        checked={requestObject.untilTuesdayBefor}
                                                                        onChange={this.HandleCheckBox}
                                                                    /> */}
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>
                                                    </Container>
                                                </th>
                                                <th>
                                                    <Container>
                                                        <Row>
                                                            <Col xs={12} lg={6}>
                                                                <FormGroup>
                                                                    <Label for="fromTuesdayAfter">{this.getHeading(lang, '')[11]}</Label>                                                                    &nbsp;&nbsp;
                                                                    <span className='text-primary'>{requestObject.fromTuesdayAfter}</span>
                                                                    <br />
                                                                    <ModalClock>
                                                                        <div className='text-center'>
                                                                            <TimeKeeper
                                                                                hour24Mode
                                                                                time={requestObject.fromTuesdayAfter}
                                                                                onChange={(val) => this.onChange(val.formatted24, "fromTuesdayAfter")}
                                                                                switchToMinuteOnHourSelect
                                                                            />
                                                                        </div>
                                                                    </ModalClock>
                                                                    {/* <Form.Check
                                                                        inline
                                                                        type="switch"
                                                                        id='fromTuesdayAfter'
                                                                        checked={requestObject.fromTuesdayAfter}
                                                                        onChange={this.HandleCheckBox}
                                                                    /> */}
                                                                </FormGroup>
                                                            </Col>
                                                            <Col xs={12} lg={6}>
                                                                <FormGroup>
                                                                    <Label for="untilTuesdayAfter">{this.getHeading(lang, '')[12]}</Label>                                                                    &nbsp;&nbsp;
                                                                    <span className='text-primary'>{requestObject.untilTuesdayAfter}</span>
                                                                    <br />
                                                                    <ModalClock>
                                                                        <div className='text-center'>
                                                                            <TimeKeeper
                                                                                hour24Mode
                                                                                time={requestObject.untilTuesdayAfter}
                                                                                onChange={(val) => this.onChange(val.formatted24, "untilTuesdayAfter")}
                                                                                switchToMinuteOnHourSelect
                                                                            />
                                                                        </div>
                                                                    </ModalClock>
                                                                    {/* <Form.Check
                                                                        inline
                                                                        type="switch"
                                                                        id='untilTuesdayAfter'
                                                                        checked={requestObject.untilTuesdayAfter}
                                                                        onChange={this.HandleCheckBox}
                                                                    /> */}
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>
                                                    </Container>
                                                </th>
                                            </tr>
                                            {this.validator.message(setError[lang]['Tuesday'], requestObject.fromSaturdayBefor, 'required|max:95', { className: 'alert alert-danger' })}

                                            <tr>
                                                <th className='text-center'>{this.getHeading(lang, '')[6]}</th>
                                                <th>
                                                    <Container>
                                                        <Row>
                                                            <Col xs={12} lg={6}>
                                                                <FormGroup>
                                                                    <Label for="fromWednesdayBefor">{this.getHeading(lang, '')[11]}</Label>                                                                    &nbsp;&nbsp;
                                                                    <span className='text-primary'>{requestObject.fromWednesdayBefor}</span>
                                                                    <br />
                                                                    <ModalClock>
                                                                        <div className='text-center'>
                                                                            <TimeKeeper
                                                                                hour24Mode
                                                                                time={requestObject.fromWednesdayBefor}
                                                                                onChange={(val) => this.onChange(val.formatted24, "fromWednesdayBefor")}
                                                                                switchToMinuteOnHourSelect
                                                                            />
                                                                        </div>
                                                                    </ModalClock>
                                                                    {/* <Form.Check
                                                                        inline
                                                                        type="switch"
                                                                        id='fromWednesdayBefor'
                                                                        checked={requestObject.fromWednesdayBefor}
                                                                        onChange={this.HandleCheckBox}
                                                                    /> */}
                                                                </FormGroup>
                                                            </Col>
                                                            <Col xs={12} lg={6}>
                                                                <FormGroup>
                                                                    <Label for="untilWednesdayBefor">{this.getHeading(lang, '')[12]}</Label>                                                                    &nbsp;&nbsp;
                                                                    <span className='text-primary'>{requestObject.untilWednesdayBefor}</span>
                                                                    <br />
                                                                    <ModalClock>
                                                                        <div className='text-center'>
                                                                            <TimeKeeper
                                                                                hour24Mode
                                                                                time={requestObject.untilWednesdayBefor}
                                                                                onChange={(val) => this.onChange(val.formatted24, "untilWednesdayBefor")}
                                                                                switchToMinuteOnHourSelect
                                                                            />
                                                                        </div>
                                                                    </ModalClock>
                                                                    {/* <Form.Check
                                                                        inline
                                                                        type="switch"
                                                                        id='untilWednesdayBefor'
                                                                        checked={requestObject.untilWednesdayBefor}
                                                                        onChange={this.HandleCheckBox}
                                                                    /> */}
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>
                                                    </Container>
                                                </th>
                                                <th>
                                                    <Container>
                                                        <Row>
                                                            <Col xs={12} lg={6}>
                                                                <FormGroup>
                                                                    <Label for="fromWednesdayAfter">{this.getHeading(lang, '')[11]}</Label>                                                                    &nbsp;&nbsp;
                                                                    <span className='text-primary'>{requestObject.fromWednesdayAfter}</span>
                                                                    <br />
                                                                    <ModalClock>
                                                                        <div className='text-center'>
                                                                            <TimeKeeper
                                                                                hour24Mode
                                                                                time={requestObject.fromWednesdayAfter}
                                                                                onChange={(val) => this.onChange(val.formatted24, "fromWednesdayAfter")}
                                                                                switchToMinuteOnHourSelect
                                                                            />
                                                                        </div>
                                                                    </ModalClock>
                                                                    {/* <Form.Check
                                                                        inline
                                                                        type="switch"
                                                                        id='fromWednesdayAfter'
                                                                        checked={requestObject.fromWednesdayAfter}
                                                                        onChange={this.HandleCheckBox}
                                                                    /> */}
                                                                </FormGroup>
                                                            </Col>
                                                            <Col xs={12} lg={6}>
                                                                <FormGroup>
                                                                    <Label for="untilWednesdayAfter">{this.getHeading(lang, '')[12]}</Label>                                                                    &nbsp;&nbsp;
                                                                    <span className='text-primary'>{requestObject.untilWednesdayAfter}</span>
                                                                    <br />
                                                                    <ModalClock>
                                                                        <div className='text-center'>
                                                                            <TimeKeeper
                                                                                hour24Mode
                                                                                time={requestObject.untilWednesdayAfter}
                                                                                onChange={(val) => this.onChange(val.formatted24, "untilWednesdayAfter")}
                                                                                switchToMinuteOnHourSelect
                                                                            />
                                                                        </div>
                                                                    </ModalClock>
                                                                    {/* <Form.Check
                                                                        inline
                                                                        type="switch"
                                                                        id='untilWednesdayAfter'
                                                                        checked={requestObject.untilWednesdayAfter}
                                                                        onChange={this.HandleCheckBox}
                                                                    /> */}
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>
                                                    </Container>
                                                </th>
                                            </tr>
                                            {this.validator.message(setError[lang]['Wednesday'], requestObject.fromSaturdayBefor, 'required|max:95', { className: 'alert alert-danger' })}

                                            <tr>
                                                <th className='text-center'>{this.getHeading(lang, '')[7]}</th>
                                                <th>
                                                    <Container>
                                                        <Row>
                                                            <Col xs={12} lg={6}>
                                                                <FormGroup>
                                                                    <Label for="fromThursdayBefor">{this.getHeading(lang, '')[11]}</Label>                                                                    &nbsp;&nbsp;
                                                                    <span className='text-primary'>{requestObject.fromThursdayBefor}</span>
                                                                    <br />
                                                                    <ModalClock>
                                                                        <div className='text-center'>
                                                                            <TimeKeeper
                                                                                hour24Mode
                                                                                time={requestObject.fromThursdayBefor}
                                                                                onChange={(val) => this.onChange(val.formatted24, "fromThursdayBefor")}
                                                                                switchToMinuteOnHourSelect
                                                                            />
                                                                        </div>
                                                                    </ModalClock>
                                                                    {/* <Form.Check
                                                                        inline
                                                                        type="switch"
                                                                        id='fromThursdayBefor'
                                                                        checked={requestObject.fromThursdayBefor}
                                                                        onChange={this.HandleCheckBox}
                                                                    /> */}
                                                                </FormGroup>
                                                            </Col>
                                                            <Col xs={12} lg={6}>
                                                                <FormGroup>
                                                                    <Label for="untilThursdayBefor">{this.getHeading(lang, '')[12]}</Label>                                                                    &nbsp;&nbsp;
                                                                    <span className='text-primary'>{requestObject.untilThursdayBefor}</span>
                                                                    <br />
                                                                    <ModalClock>
                                                                        <div className='text-center'>
                                                                            <TimeKeeper
                                                                                hour24Mode
                                                                                time={requestObject.untilThursdayBefor}
                                                                                onChange={(val) => this.onChange(val.formatted24, "untilThursdayBefor")}
                                                                                switchToMinuteOnHourSelect
                                                                            />
                                                                        </div>
                                                                    </ModalClock>
                                                                    {/* <Form.Check
                                                                        inline
                                                                        type="switch"
                                                                        id='untilThursdayBefor'
                                                                        checked={requestObject.untilThursdayBefor}
                                                                        onChange={this.HandleCheckBox}
                                                                    /> */}
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>
                                                    </Container>
                                                </th>
                                                <th>
                                                    <Container>
                                                        <Row>
                                                            <Col xs={12} lg={6}>
                                                                <FormGroup>
                                                                    <Label for="fromThursdayAfter">{this.getHeading(lang, '')[11]}</Label>                                                                    &nbsp;&nbsp;
                                                                    <span className='text-primary'>{requestObject.fromThursdayAfter}</span>
                                                                    <br />
                                                                    <ModalClock>
                                                                        <div className='text-center'>
                                                                            <TimeKeeper
                                                                                hour24Mode
                                                                                time={requestObject.fromThursdayAfter}
                                                                                onChange={(val) => this.onChange(val.formatted24, "fromThursdayAfter")}
                                                                                switchToMinuteOnHourSelect
                                                                            />
                                                                        </div>
                                                                    </ModalClock>
                                                                    {/* <Form.Check
                                                                        inline
                                                                        type="switch"
                                                                        id='fromThursdayAfter'
                                                                        checked={requestObject.fromThursdayAfter}
                                                                        onChange={this.HandleCheckBox}
                                                                    /> */}
                                                                </FormGroup>
                                                            </Col>
                                                            <Col xs={12} lg={6}>
                                                                <FormGroup>
                                                                    <Label for="untilThursdayAfter">{this.getHeading(lang, '')[12]}</Label>                                                                    &nbsp;&nbsp;
                                                                    <span className='text-primary'>{requestObject.untilThursdayAfter}</span>
                                                                    <br />
                                                                    <ModalClock>
                                                                        <div className='text-center'>
                                                                            <TimeKeeper
                                                                                hour24Mode
                                                                                time={requestObject.untilThursdayAfter}
                                                                                onChange={(val) => this.onChange(val.formatted24, "untilThursdayAfter")}
                                                                                switchToMinuteOnHourSelect
                                                                            />
                                                                        </div>
                                                                    </ModalClock>
                                                                    {/* <Form.Check
                                                                        inline
                                                                        type="switch"
                                                                        id='untilThursdayAfter'
                                                                        checked={requestObject.untilThursdayAfter}
                                                                        onChange={this.HandleCheckBox}
                                                                    /> */}
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>
                                                    </Container>
                                                </th>
                                            </tr>
                                            {this.validator.message(setError[lang]['Thursday'], requestObject.fromSaturdayBefor, 'required|max:95', { className: 'alert alert-danger' })}

                                            <tr>
                                                <th className='text-center'>{this.getHeading(lang, '')[8]}</th>
                                                <th>
                                                    <Container>
                                                        <Row>
                                                            <Col xs={12} lg={6}>
                                                                <FormGroup>
                                                                    <Label for="fromFridayBefor">{this.getHeading(lang, '')[11]}</Label>                                                                    &nbsp;&nbsp;
                                                                    <span className='text-primary'>{requestObject.fromFridayBefor}</span>
                                                                    <br />
                                                                    <ModalClock>
                                                                        <div className='text-center'>
                                                                            <TimeKeeper
                                                                                hour24Mode
                                                                                time={requestObject.fromFridayBefor}
                                                                                onChange={(val) => this.onChange(val.formatted24, "fromFridayBefor")}
                                                                                switchToMinuteOnHourSelect
                                                                            />
                                                                        </div>
                                                                    </ModalClock>
                                                                    {/* <Form.Check
                                                                        inline
                                                                        type="switch"
                                                                        id='fromFridayBefor'
                                                                        checked={requestObject.fromFridayBefor}
                                                                        onChange={this.HandleCheckBox}
                                                                    /> */}
                                                                </FormGroup>
                                                            </Col>
                                                            <Col xs={12} lg={6}>
                                                                <FormGroup>
                                                                    <Label for="untilFridayBefor">{this.getHeading(lang, '')[12]}</Label>                                                                    &nbsp;&nbsp;
                                                                    <span className='text-primary'>{requestObject.untilFridayBefor}</span>
                                                                    <br />
                                                                    <ModalClock>
                                                                        <div className='text-center'>
                                                                            <TimeKeeper
                                                                                hour24Mode
                                                                                time={requestObject.untilFridayBefor}
                                                                                onChange={(val) => this.onChange(val.formatted24, "untilFridayBefor")}
                                                                                switchToMinuteOnHourSelect
                                                                            />
                                                                        </div>
                                                                    </ModalClock>
                                                                    {/* <Form.Check
                                                                        inline
                                                                        type="switch"
                                                                        id='untilFridayBefor'
                                                                        checked={requestObject.untilFridayBefor}
                                                                        onChange={this.HandleCheckBox}
                                                                    /> */}
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>
                                                    </Container>
                                                </th>
                                                <th>
                                                    <Container>
                                                        <Row>
                                                            <Col xs={12} lg={6}>
                                                                <FormGroup>
                                                                    <Label for="fromFridayAfter">{this.getHeading(lang, '')[11]}</Label>                                                                    &nbsp;&nbsp;
                                                                    <span className='text-primary'>{requestObject.fromFridayAfter}</span>
                                                                    <br />
                                                                    <ModalClock>
                                                                        <div className='text-center'>
                                                                            <TimeKeeper
                                                                                hour24Mode
                                                                                time={requestObject.fromFridayAfter}
                                                                                onChange={(val) => this.onChange(val.formatted24, "fromFridayAfter")}
                                                                                switchToMinuteOnHourSelect
                                                                            />
                                                                        </div>
                                                                    </ModalClock>
                                                                    {/* <Form.Check
                                                                        inline
                                                                        type="switch"
                                                                        id='fromFridayAfter'
                                                                        checked={requestObject.fromFridayAfter}
                                                                        onChange={this.HandleCheckBox}
                                                                    /> */}
                                                                </FormGroup>
                                                            </Col>
                                                            <Col xs={12} lg={6}>
                                                                <FormGroup>
                                                                    <Label for="untilFridayAfter">{this.getHeading(lang, '')[12]}</Label>                                                                    &nbsp;&nbsp;
                                                                    <span className='text-primary'>{requestObject.untilFridayAfter}</span>
                                                                    <br />
                                                                    <ModalClock>
                                                                        <div className='text-center'>
                                                                            <TimeKeeper
                                                                                hour24Mode
                                                                                time={requestObject.untilFridayAfter}
                                                                                onChange={(val) => this.onChange(val.formatted24, "untilFridayAfter")}
                                                                                switchToMinuteOnHourSelect
                                                                            />
                                                                        </div>
                                                                    </ModalClock>
                                                                    {/* <Form.Check
                                                                        inline
                                                                        type="switch"
                                                                        id='untilFridayAfter'
                                                                        checked={requestObject.untilFridayAfter}
                                                                        onChange={this.HandleCheckBox}
                                                                    /> */}
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>
                                                    </Container>
                                                </th>
                                            </tr>
                                            {this.validator.message(setError[lang]['Friday'], requestObject.fromSaturdayBefor, 'required|max:95', { className: 'alert alert-danger' })}

                                        </tbody>
                                    </table>
                                </Col>
                            </Row>
                            <Button className={lang === 'fa' ? "btn btn-sm float-left" : "btn btn-sm float-right"} onClick={this.handleSubmit} >{this.getHeading(lang, '')[13]}</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default TeacherPlan;