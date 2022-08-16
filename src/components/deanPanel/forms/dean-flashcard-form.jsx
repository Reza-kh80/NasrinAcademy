import React, { useState, useEffect, useRef, useContext, useCallback } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import SimpleReactValidator from 'simple-react-validator';
import { ChromePicker } from 'react-color';
import Form from 'react-bootstrap/Form';
import { getDatetime } from '../../../utils/datetime';
import UserContext from '../../../utils/user-context';
import { Container, Row, Col, Button } from 'reactstrap';
import { initialFlashCardObject } from './dean-form-objects';
const MyDropdown = React.lazy(() => import('../../general/dropdown'));
const FileUpload = React.lazy(() => import('../../general/fileUpload'));
function DeanFlashCardForm(props) {
    const apiEndPoint = process.env.REACT_APP_APIEndPoint;
    const mediaEndPoint = process.env.REACT_APP_MediaEndPoint;
    const currentUser = useContext(UserContext);
    const simpleValidator = useRef(new SimpleReactValidator())
    const { show, onHide, id, title } = props;
    const [flashCardObject, setFlashCardObject] = useState(initialFlashCardObject);
    const [flashCardCategoryList, setFlashCardCategoryList] = useState([]);
    const [levelList, setLevelList] = useState([]);

    const onEditHandler = useCallback((list) => {
        setFlashCardObject(prevState => ({
            ...prevState,
            FlashCardId: list.FlashCardId,
            Title: list.Title,
            TitleTranslation: list.TitleTranslation,
            Description: list.Description,
            DescriptionTranslation: list.DescriptionTranslation,
            Example: list.Example,
            ExampleTranslation: list.ExampleTranslation,
            Picture: list.Picture,
            Audio: list.Audio,
            Color: list.Color,
            IsFree: list.IsFree,
            TeacherId: list.TeacherId,
            LevelId: list.LevelId,
            FlashCardCategoryId: list.FlashCardCategoryId,
            Modifier: currentUser.Username,
            ModificationDate: getDatetime(),
            IsDeleted: list.IsDeleted,
        }));
    }, [currentUser.Username])
    useEffect(() => {
        // console.log("FlashCard Object=", flashCardObject)
    }, [flashCardObject]);
    useEffect(() => {
        let mounted = true;
        if (id !== "") {
            const fetchData = async () => {
                const result = await axios.get(apiEndPoint + `FlashCard/Get?flashCardId=${id}`)
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
            setFlashCardObject(initialFlashCardObject);
            setFlashCardObject(prevState => ({
                ...prevState,
                Modifier: currentUser.Username,
                TeacherId: currentUser.UserId
            }));
        }

    }, [id, apiEndPoint, currentUser.Username, currentUser.UserId, onEditHandler]);
    useEffect(() => {
        let mounted = true;
        let dropdownList = [];
        const fetchData = async () => {
            const result = await axios.get(apiEndPoint + 'FlashCardCategory/DisplayDropdown')
            if (mounted) {
                result.data.map(m =>
                    dropdownList.push({
                        value: m.FlashCardCategoryId,
                        label: m.Title,
                    }),
                );
                setFlashCardCategoryList(dropdownList);
            }
        };
        fetchData();
        return () => {
            mounted = false;
        };
    }, [apiEndPoint]);
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
    const addDefaultSrc = (ev) => {
        return ev.target.src = "main-images/user.webp";
    }
    const handleColorChange = (color, event) => {
        setFlashCardObject(prevState => ({ ...prevState, Color: color.hex }));
    };
    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        if (e.target.type === 'checkbox') {
            setFlashCardObject(prevState => ({ ...prevState, [name]: checked }));
        }
        else {
            setFlashCardObject(prevState => ({ ...prevState, [name]: value }));
        }
    }
    const handleUploadAudio = (fileName) => {
        setFlashCardObject(prevState => ({
            ...prevState,
            Audio: fileName
        }));
    }
    const handleUploadPicture = (fileName) => {
        setFlashCardObject(prevState => ({
            ...prevState,
            Picture: fileName
        }));
    }
    const handleSubmit = () => {
        if (simpleValidator.current.allValid()) {
            axios.post(apiEndPoint + 'FlashCard/Add', flashCardObject, {})
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
                // size="xl"
                show={show}
                onHide={onHide}
                backdrop="static"
                dialogClassName="modal-90w"
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
                            <Col xs="12" lg="4" className="text-left m-0 p-1">
                                <Form>

                                    <MyDropdown
                                        label="Select time of teaching"
                                        display="Select time ..."
                                        dataList={levelList}
                                        handleChange={handleChange}
                                        name="LevelId"
                                        selectedValue={flashCardObject.LevelId}
                                        htmlFor="time"
                                        onBlur={simpleValidator.current.showMessageFor('level')}
                                        width="w-100"
                                    />
                                    {simpleValidator.current.message('level', flashCardObject.LevelId, 'required', { className: 'alert alert-danger' })}
                                    <MyDropdown
                                        label="Select FlashCardCategory"
                                        display="Select FlashCardCategory..."
                                        dataList={flashCardCategoryList}
                                        handleChange={handleChange}
                                        name="FlashCardCategoryId"
                                        selectedValue={flashCardObject.FlashCardCategoryId}
                                        htmlFor="flashCardCategory"
                                        onBlur={simpleValidator.current.showMessageFor('flashCardCategory')}
                                        width="w-100"
                                    />
                                    {simpleValidator.current.message('flashCardCategory', flashCardObject.FlashCardCategoryId, 'required', { className: 'alert alert-danger' })}


                                </Form>
                            </Col>
                            <Col xs="12" lg="4" className="align-items-center m-0 p-1">
                                <Form.Group>
                                    <Form.Label htmlFor="modificationDate"><h6 className="text-primary mb-0 ml-1" >Modefication Date (Now):</h6></Form.Label>
                                    <Form.Label id="modificationDate" className="border rounded border-dark d-block p-2">{flashCardObject.ModificationDate}</Form.Label>
                                    <Form.Label htmlFor="modificationDate"><h6 className="text-primary mb-0 ml-1" >Modefier (Now):</h6></Form.Label>
                                    <Form.Label id="modificationDate" className="border rounded border-dark d-block p-2">{flashCardObject.Modifier}</Form.Label>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Check inline name="IsDeleted" label="Is Deleted?" checked={flashCardObject.IsDeleted} onChange={handleChange} className="mt-2" />
                                </Form.Group>
                                {currentUser.RoleName === 'Dean' &&
                                    <Form.Group>
                                        <Form.Check inline name="IsFree" label="Is This Video Free?" checked={flashCardObject.IsFree} onChange={handleChange} />
                                    </Form.Group>}
                            </Col>
                            <Col xs="12" lg="4" className="text-left m-0 p-1">
                                <Form.Group>
                                    <Form.Label htmlFor="color"><h6 className="text-primary mb-0 ml-1" >Course backgroung Color:</h6></Form.Label>
                                    <ChromePicker className="mb-2" name="b" color={flashCardObject.Color} onChangeComplete={handleColorChange} onBlur={simpleValidator.current.showMessageFor('color')} />
                                    {simpleValidator.current.message('color', flashCardObject.Color, 'required', { className: 'alert alert-danger' })}
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12" lg="6">
                                <FileUpload postMethod={'FlashCard/UploadFile'} title="Audio(mp3,mpeg)" accept={['mp3', 'mpeg']} specifiedFileName="NoName" onUpload={handleUploadAudio} onBlur={simpleValidator.current.showMessageFor('audio')} />
                                {flashCardObject.Audio !== "" &&
                                    <audio controls preload="none" src={mediaEndPoint + "FlashCard/" + flashCardObject.Audio}
                                        width="100%" height="100%" type="audio/mpeg" className="p-0" />
                                }
                            </Col>
                            <Col xs="12" lg="6">
                                <FileUpload postMethod={'FlashCard/UploadFile'} title="Photo(jpg,jpeg)" accept={['jpeg', 'jpg']} specifiedFileName="NoName" onUpload={handleUploadPicture} onBlur={simpleValidator.current.showMessageFor('picture')} />
                                {flashCardObject.Picture !== "" && <img className="img-card text-center" width="200" height="200" src={mediaEndPoint + 'FlashCard/' + flashCardObject.Picture} onError={addDefaultSrc} alt={flashCardObject.Picture + "picture"} />}
                            </Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col xs="12" lg="6" className="m-0 p-1">
                                <Form.Group>
                                    <Form.Label htmlFor="title"><h6 className="text-primary mb-0 ml-1" >Title:</h6></Form.Label>
                                    <Form.Control id="title" name="Title" type="text" placeholder="Enter Title" value={flashCardObject.Title} onChange={handleChange} onBlur={simpleValidator.current.showMessageFor('title')} />
                                    {simpleValidator.current.message('title', flashCardObject.Title, 'required|max:99', { className: 'alert alert-danger' })}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor="description"><h6 className="text-primary mb-0 ml-1" >Description</h6></Form.Label>
                                    <Form.Control id="description" name="Description" as="textarea" rows={10} placeholder="Enter description" value={flashCardObject.Description} onChange={handleChange} onBlur={simpleValidator.current.showMessageFor('description')} />
                                    {simpleValidator.current.message('description', flashCardObject.Description, 'required|max:999', { className: 'alert alert-danger' })}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor="example"><h6 className="text-primary mb-0 ml-1" >Example</h6></Form.Label>
                                    <Form.Control id="example" name="Example" as="textarea" rows={10} placeholder="Enter description" value={flashCardObject.Example} onChange={handleChange} onBlur={simpleValidator.current.showMessageFor('example')} />
                                    {simpleValidator.current.message('example', flashCardObject.Example, 'required|max:999', { className: 'alert alert-danger' })}
                                </Form.Group>
                            </Col>
                            <Col xs="12" lg="6" className="m-0 p-1">
                                <Form.Group>
                                    <Form.Label htmlFor="titleTranslation"><h6 className="text-primary mb-0 ml-1 " >Title Translation:</h6></Form.Label>
                                    <Form.Control id="titleTranslation" name="TitleTranslation" type="text" placeholder="ترجمه" value={flashCardObject.TitleTranslation} className="text-right" onChange={handleChange} onBlur={simpleValidator.current.showMessageFor('title translation')} />
                                    {simpleValidator.current.message('title translation', flashCardObject.TitleTranslation, 'required|max:99', { className: 'alert alert-danger' })}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor="descriptionTranslation"><h6 className="text-primary mb-0 ml-1" >Description</h6></Form.Label>
                                    <Form.Control id="descriptionTranslation" name="DescriptionTranslation" as="textarea" rows={10} placeholder="ترجمه" value={flashCardObject.DescriptionTranslation} className="text-right" onChange={handleChange} onBlur={simpleValidator.current.showMessageFor('description translation')} />
                                    {simpleValidator.current.message('description translation', flashCardObject.DescriptionTranslation, 'required|max:999', { className: 'alert alert-danger' })}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor="exampleTranslation"><h6 className="text-primary mb-0 ml-1" >Example</h6></Form.Label>
                                    <Form.Control id="exampleTranslation" name="ExampleTranslation" as="textarea" rows={10} placeholder="ترجمه" value={flashCardObject.ExampleTranslation} className="text-right" onChange={handleChange} onBlur={simpleValidator.current.showMessageFor('example translation')} />
                                    {simpleValidator.current.message('example translation', flashCardObject.ExampleTranslation, 'required|max:999', { className: 'alert alert-danger' })}
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
export default DeanFlashCardForm;



