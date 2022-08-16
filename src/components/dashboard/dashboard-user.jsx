import React, { Component } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { Container, Row, Col, Button } from 'reactstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { getDatetime } from './../../utils/datetime';
const TableContent = React.lazy(() => import('../general/table'));
class DashboardUser extends Component {
    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator();
        this.state = {
            apiEndPoint: process.env.REACT_APP_APIEndPoint,
            contactObject: [],
            userObject: {
                UserId: "",
                Username: "",
                Password: "",
                RoleId: "1",
                Modifier: "Nasrin Daftarchi",
                ModificationDate: getDatetime(),
                IsDeleted: false,
            },
            visible: false,
            confirmPassword: "",
            confirmMessage: "",
            passwordRequiredMessage: "",
            /////
            roleList: [],
            ///////
            pageSize: 10,
            dataList: [],
            dataTitles: ["ID", 'Username', 'Role', 'Edit'],
            columnList: ["id", "Username", 'RoleName'],
            filteredItem: "Username"
        }
    }
    getData = async () => {
        const dataList = [];
        await axios.get(this.state.apiEndPoint + 'User/GetAll').then(response => {
            let md = response.data
            md.map((m, i) =>
                dataList.push({
                    id: i + 1,
                    Username: m.Username,
                    RoleName: m.RoleName,
                    Modifier: m.Modifier,
                    ModificationDate: m.ModificationDate,
                    IsDeleted: m.IsDeleted,
                    UserId: m.UserId,
                }),
            );
            this.setState({ dataList });
        });
    }
    getRoles = async () => {
        const roleList = [];
        await axios.get(this.state.apiEndPoint + 'User/GetAllRoles').then(response => {
            let md = response.data
            md.map(m =>
                roleList.push({
                    RoleId: m.RoleId,
                    RoleName: m.RoleName,
                }),
            );
            this.setState({ roleList });
        });
    }
    componentDidMount() {
        this.getData();
        this.getRoles();
    }
    getRoleId = (rolename) => {
        const role = this.state.roleList.filter(m => m.RoleName === rolename)[0]
        let roleList = { ...role }
        return roleList.RoleId
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.userObject !== this.state.userObject) {
            // console.log(this.state.userObject)
        }
    }
    onNewHandeler() {
        this.clearErrorMessages();
        const userObject = { ...this.state.userObject };
        userObject.UserId = "";
        userObject.Username = "";
        userObject.Password = "";
        userObject.RoleId = "1";
        userObject.Modifier = "Nasrin Daftarchi";
        userObject.ModificationDate = getDatetime();
        userObject.IsDeleted = false;
        this.setState({ userObject });
        this.setState({ confirmPassword: "" });
        this.validator.hideMessages();
    }
    onEdithandler = (list) => {
        this.clearErrorMessages();
        let userObject = { ...this.state.userObject };
        userObject.UserId = list.UserId;
        userObject.Username = list.Username.toLowerCase();
        userObject.Password = "";
        userObject.RoleId = this.getRoleId(list.RoleName);
        userObject.Modifier = list.Modifier;
        userObject.ModificationDate = list.ModificationDate;
        userObject.IsDeleted = list.IsDeleted;
        this.setState({ userObject });
        this.setState({ confirmPassword: "" });
        this.validator.hideMessages();

    }
    handleFileName = (fileName, titleName) => {
        let userObject = { ...this.state.userObject };
        if (fileName !== "") {
            userObject.UserMedia = fileName;
            this.setState({ userObject });
        }
    }
    handleConfirm = (e) => {
        let confirmPassword = e.target.value;
        this.setState({ confirmPassword })
    }
    handleChange = e => {
        let userObject = { ...this.state.userObject };
        userObject[e.currentTarget.name] = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        this.setState({ userObject });

    }
    setCurrentTime = () => {
        let userObject = { ...this.state.userObject };
        userObject.ModificationDate = getDatetime();
        this.setState({ userObject });
    }
    submit = () => {
        let newUserOpject = { ...this.state.userObject }
        newUserOpject.Username = newUserOpject.Username.toLowerCase().trim();
        this.setCurrentTime();
        axios.post(this.state.apiEndPoint + 'User/Add', newUserOpject, {})
            .then(response => {
                alert('You submitted the form and stuff!');
                this.onNewHandeler();
                this.validator.hideMessages();
                this.getData();
            })
            .catch(function (error) {
                // alert('Something went wrong!');
                alert(error);
            })
    }
    clearErrorMessages = () => {
        this.setState({ confirmMessage: "" })
        this.setState({ passwordRequiredMessage: "" })
    }
    handleSubmit = () => {
        this.clearErrorMessages();
        const { confirmPassword, userObject } = this.state;
        if (userObject.UserId === "") {
            if (userObject.Password !== '') {
                if (confirmPassword === userObject.Password) {
                    if (this.validator.allValid()) {
                        this.submit();
                    }
                    else {
                        this.validator.showMessages();
                        this.forceUpdate();
                    }
                }
                else {
                    this.setState({ confirmMessage: "Password does not match" })
                }
            }
            else {
                this.setState({ passwordRequiredMessage: "password is required" })
            }
        }
        else {
            if (userObject.Password === '') {
                if (this.validator.allValid()) {
                    this.submit();
                }
                else {
                    this.validator.showMessages();
                    this.forceUpdate();
                }
            }
            else {
                if (confirmPassword === userObject.Password) {
                    if (this.validator.allValid()) {
                        this.submit();
                    }
                    else {
                        this.validator.showMessages();
                        this.forceUpdate();
                    }
                }
                else {
                    this.setState({ confirmMessage: "Password does not match" })
                }
            }
        }
    }
    render() {
        const { dataList, dataTitles, columnList, pageSize, filteredItem, userObject, visible, confirmPassword, confirmMessage, passwordRequiredMessage, roleList } = this.state;
        return (<div>
            <Container fluid className="table">
                <Row className="mb-2">
                    <Col xs="12" className="text-left text-dark p-0" >
                        <h3 className="text-primary"> User</h3>
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col xs="12" sm="6" className="text-left m-0 p-0">
                        <TableContent filter={filteredItem} dataList={dataList} dataTitles={dataTitles} columnList={columnList} onEdithandler={this.onEdithandler} pageSize={pageSize} />
                    </Col>
                    <Col xs="12" sm="6" className="text-left border border-primary p-3 mt-3 rounded">
                        <Form>
                            <Button onClick={() => this.onNewHandeler()} className="btn btn-sm mb-3 ">New User</Button>
                            <InputGroup className="mb-2">
                                <InputGroup.Prepend>
                                    <InputGroup.Text className="text-primary h5 prepend">Role</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control as="select" id="menu" name="RoleId" value={userObject.RoleId} onChange={this.handleChange}>
                                    {roleList.map(item =>
                                        <option key={item.RoleId} value={item.RoleId} >{item.RoleName}</option>
                                    )}
                                </Form.Control>
                            </InputGroup>
                            {this.validator.message('role', userObject.RoleId, 'required', { className: 'alert alert-danger' })}
                            <InputGroup className="mb-2">
                                <InputGroup.Prepend >
                                    <InputGroup.Text className="text-primary h5 prepend" >Username</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control id="username" name="Username" type="text" placeholder="Enter Username" autoComplete="no" value={userObject.Username} onChange={this.handleChange} />
                            </InputGroup>
                            {this.validator.message('username', userObject.Username, 'required|email', { className: 'alert alert-danger' })}

                            <InputGroup className="mb-2">
                                <InputGroup.Prepend >
                                    <InputGroup.Text className="text-primary h5 prepend" >Modefier</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control type="text" name="Modifier" value={userObject.Modifier} onChange={this.handleChange} disabled />
                            </InputGroup>
                            <InputGroup className="mb-2">
                                <InputGroup.Prepend >
                                    <InputGroup.Text className="text-primary h5 prepend" >Modefication Date</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control type="text" name="ModificationDate" value={userObject.ModificationDate} onChange={this.handleChange} disabled />
                            </InputGroup>
                            {userObject.UserId !== "" &&
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Checkbox name="IsDeleted" checked={userObject.IsDeleted} onChange={this.handleChange} />
                                    </InputGroup.Prepend>
                                    <Form.Control type="text" value="Is Deleted" placeholder="Enter Username" readOnly />
                                </InputGroup>
                            }
                            <InputGroup className="mb-2">
                                <InputGroup.Prepend>
                                    <InputGroup.Text className="text-primary h5 prepend">Password</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control id="Password" name="Password" type={visible ? "text" : "Password"} placeholder="Enter Password" autoComplete="new-Password" value={userObject.Password} onChange={this.handleChange} />
                                <InputGroup.Append>
                                    <InputGroup.Text><span className={visible ? "fa fa-eye-slash" : "fa fa-eye"} onClick={() => this.setState({ visible: !visible })}></span></InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                            {passwordRequiredMessage !== "" && <div className="alert alert-danger">{passwordRequiredMessage}</div>}
                            <InputGroup className="mb-2">
                                <InputGroup.Prepend>
                                    <InputGroup.Text className="text-primary h5 prepend">Confirm Password</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control id="confirmPassword" name="confirmPassword" type={visible ? "text" : "Password"} autoComplete="no" placeholder="Enter Password" value={confirmPassword} onChange={this.handleConfirm} />
                                <InputGroup.Append>
                                    <InputGroup.Text><span className={visible ? "fa fa-eye-slash" : "fa fa-eye"} onClick={() => this.setState({ visible: !visible })}></span></InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                            {confirmMessage !== "" && <div className="alert alert-danger">{confirmMessage}</div>}
                        </Form>
                        <div>
                            <Button className="btn btn-sm float-right" onClick={this.handleSubmit} >Submit User</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>);
    }
}
export default DashboardUser;