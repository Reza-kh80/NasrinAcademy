import React, { useState, useEffect, useRef, useContext, useCallback } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import SimpleReactValidator from 'simple-react-validator';
import Form from 'react-bootstrap/Form';
import { getDatetime } from '../../../utils/datetime';
import UserContext from '../../../utils/user-context';
import { Container, Row, Col, Button } from 'reactstrap';
import { initialTermMaterialObject } from './teacher-form-objects';
const MyDropdown = React.lazy(() => import('../../general/dropdown'));
function TeacherMaterialAssignForm(props) {
    const apiEndPoint = process.env.REACT_APP_APIEndPoint;
    const currentUser = useContext(UserContext);
    const simpleValidator = useRef(new SimpleReactValidator())
    const { show, onHide, studentId, materialId, title } = props;
    const [termMaterialObject, setTermMaterialObject] = useState(initialTermMaterialObject);
    const [materialList, setMaterialList] = useState([]);
    const onEditHandler = useCallback((list) => {
        setTermMaterialObject(prevState => ({
            ...prevState,
            StudentId: list.StudentId,
            MaterialId: list.MaterialId,
            Modifier: currentUser.Username,
            ModificationDate: getDatetime(),
            IsDeleted: list.IsDeleted,
        }));
    }, [currentUser.Username])
    useEffect(() => {
        // console.log("TermMaterial Object=", termMaterialObject)
    }, [termMaterialObject]);
    useEffect(() => {
        let mounted = true;
        if (studentId !== "" && materialId !== "") {
            const fetchData = async () => {
                const result = await axios.get(apiEndPoint + `TermMaterial/GetPrivate?studentId=${studentId}&materialId=${materialId}`)
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
            setTermMaterialObject(initialTermMaterialObject);
            setTermMaterialObject(prevState => ({
                ...prevState,
                Modifier: currentUser.Username,
                StudentId: studentId,
            }));
        }

    }, [studentId, materialId, apiEndPoint, currentUser.Username, currentUser.UserId, onEditHandler]);
    useEffect(() => {
        let mounted = true;
        let dropdownList = [];
        const fetchData = async () => {
            const result = await axios.get(apiEndPoint + `Material/DisplayDropdown?teacherId=${currentUser.UserId}`)
            if (mounted) {
                result.data.map(m =>
                    dropdownList.push({
                        value: m.MaterialId,
                        label: m.Title,
                    }),
                );
                setMaterialList(dropdownList);
            }
        };
        fetchData();
        return () => {
            mounted = false;
        };
    }, [apiEndPoint, currentUser.UserId]);
    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        if (e.target.type === 'checkbox') {
            setTermMaterialObject(prevState => ({ ...prevState, [name]: checked }));
        }
        else {
            setTermMaterialObject(prevState => ({ ...prevState, [name]: value }));
        }
    }
    const handleSubmit = () => {
        if (simpleValidator.current.allValid()) {
            axios.post(apiEndPoint + 'TermMaterial/AddPrivate', termMaterialObject, {})
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
                                    label="Material:"
                                    display="Select Material ..."
                                    dataList={materialList}
                                    handleChange={handleChange}
                                    name="MaterialId"
                                    selectedValue={termMaterialObject.MaterialId}
                                    htmlFor="time"
                                    onBlur={simpleValidator.current.showMessageFor('material')}
                                    width="w-100"
                                />
                                {simpleValidator.current.message('material', termMaterialObject.MaterialId, 'required', { className: 'alert alert-danger' })}
                                <Form.Group>
                                    <Form.Label htmlFor="modificationDate"><h6 className="text-primary mb-0 ml-1" >Modefication Date (Now):</h6></Form.Label>
                                    <Form.Label id="modificationDate" className="border rounded border-dark d-block p-2">{termMaterialObject.ModificationDate}</Form.Label>
                                    <Form.Label htmlFor="modificationDate"><h6 className="text-primary mb-0 ml-1" >Modefier (Now):</h6></Form.Label>
                                    <Form.Label id="modificationDate" className="border rounded border-dark d-block p-2">{termMaterialObject.Modifier}</Form.Label>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Check inline name="IsDeleted" label="Is Deleted?" checked={termMaterialObject.IsDeleted} onChange={handleChange} className="mt-2" />
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
export default TeacherMaterialAssignForm;



