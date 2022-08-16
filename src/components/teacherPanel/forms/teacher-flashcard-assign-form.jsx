import React, { useState, useEffect, useRef, useContext, useCallback } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import SimpleReactValidator from 'simple-react-validator';
import Form from 'react-bootstrap/Form';
import { getDatetime } from '../../../utils/datetime';
import UserContext from '../../../utils/user-context';
import { Container, Row, Col, Button } from 'reactstrap';
import { initialTermFlashCardObject } from './teacher-form-objects';
const MyDropdown = React.lazy(() => import('../../general/dropdown'));
function TeacherFlashCardAssignForm(props) {
    const apiEndPoint = process.env.REACT_APP_APIEndPoint;
    const currentUser = useContext(UserContext);
    const simpleValidator = useRef(new SimpleReactValidator())
    const { show, onHide, studentId, levelId, title } = props;
    const [termFlashCardObject, setTermFlashCardObject] = useState(initialTermFlashCardObject);
    const [levelList, setLevelList] = useState([]);
    const onEditHandler = useCallback((list) => {
        setTermFlashCardObject(prevState => ({
            ...prevState,
            StudentId: list.StudentId,
            LevelId: list.LevelId,
            Modifier: currentUser.Username,
            ModificationDate: getDatetime(),
            IsDeleted: list.IsDeleted,
        }));
    }, [currentUser.Username])
    useEffect(() => {
        // console.log("TermFlashCard Object=", termFlashCardObject)
        // console.log("student Id ", studentId)
        // console.log("level Id ", levelId)
    }, [termFlashCardObject]);
    useEffect(() => {
        let mounted = true;
        if (studentId !== "" && levelId !== "") {
            const fetchData = async () => {
                const result = await axios.get(apiEndPoint + `TermFlashCard/GetPrivate?studentId=${studentId}&levelId=${levelId}`)
                if (mounted) {
                    onEditHandler(result.data);
                }
            };
            fetchData();
            return () => {
                mounted = false;
            };
        }
        else {
            setTermFlashCardObject(initialTermFlashCardObject);
            setTermFlashCardObject(prevState => ({
                ...prevState,
                Modifier: currentUser.Username,
                StudentId: studentId,
            }));
        }

    }, [studentId, levelId, apiEndPoint, currentUser.Username, currentUser.UserId, onEditHandler]);
    useEffect(() => {
        let mounted = true;
        let dropdownList = [];
        const fetchData = async () => {
            const result = await axios.get(apiEndPoint + 'Level/DisplayDropdown')
            if (mounted) {
                result.data.map(m =>
                    dropdownList.push({
                        value: m.LevelId,
                        label: m.Name,
                    }),
                );
                setLevelList(dropdownList);
            }
        };
        fetchData();
        return () => {
            mounted = false;
        };
    }, [apiEndPoint]);
    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        if (e.target.type === 'checkbox') {
            setTermFlashCardObject(prevState => ({ ...prevState, [name]: checked }));
        }
        else {
            setTermFlashCardObject(prevState => ({ ...prevState, [name]: value }));
        }
    }
    const handleSubmit = () => {
        if (simpleValidator.current.allValid()) {
            axios.post(apiEndPoint + 'TermFlashCard/AddPrivate', termFlashCardObject, {})
                .then(response => {
                    alert('You submitted the form and stuff!');
                    simpleValidator.current.hideMessages();
                    onHide();
                })
                .catch(function (error) {
                    alert(error);
                })
        } else {
            simpleValidator.current.showMessages();
        }
    }
    return (
        <div>
            <Modal
                size="md"
                show={show}
                onHide={onHide}
                backdrop="static"
                // dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton className="loginHeader p-2">
                    <Row className="align-items-center" >
                        <Col xs="2" className="text-center">
                            <img src="main-images/logo-circle.webp" width="100%" height="100%" alt="logo" />
                        </Col>
                        <Col xs="10" className='text-left m-0 p-0'>
                            <Modal.Title id="example-custom-modal-styling-title" className="h4 font-weight-bold text-warning">{title}</Modal.Title>
                        </Col>
                    </Row>
                </Modal.Header>
                <Modal.Body>
                    <Container fluid >
                        <Row>
                            <Col xs="12" className="align-items-center m-0 p-1">
                                <MyDropdown
                                    label="Select time of teaching"
                                    display="Select time ..."
                                    dataList={levelList}
                                    handleChange={handleChange}
                                    name="LevelId"
                                    selectedValue={termFlashCardObject.LevelId}
                                    htmlFor="time"
                                    onBlur={simpleValidator.current.showMessageFor('level')}
                                    width="w-100"
                                />
                                {simpleValidator.current.message('level', termFlashCardObject.LevelId, 'required', { className: 'alert alert-danger' })}
                                <Form.Group>
                                    <Form.Label htmlFor="modificationDate"><h6 className="text-primary mb-0 ml-1" >Modefication Date (Now):</h6></Form.Label>
                                    <Form.Label id="modificationDate" className="border rounded border-dark d-block p-2">{termFlashCardObject.ModificationDate}</Form.Label>
                                    <Form.Label htmlFor="modificationDate"><h6 className="text-primary mb-0 ml-1" >Modefier (Now):</h6></Form.Label>
                                    <Form.Label id="modificationDate" className="border rounded border-dark d-block p-2">{termFlashCardObject.Modifier}</Form.Label>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Check inline name="IsDeleted" label="Is Deleted?" checked={termFlashCardObject.IsDeleted} onChange={handleChange} className="mt-2" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button className="btn btn-sm float-right" onClick={handleSubmit} >Submit</Button>
                    </Container>
                </Modal.Body>
            </Modal>
        </div>
    );
}
export default TeacherFlashCardAssignForm;



