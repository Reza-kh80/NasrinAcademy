import React, { useState, useEffect, useRef, useContext, useCallback } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import SimpleReactValidator from 'simple-react-validator';
import Form from 'react-bootstrap/Form';
import { getDatetime } from '../../../utils/datetime';
import UserContext from '../../../utils/user-context';
import { Container, Row, Col, Button } from 'reactstrap';
import { initialArticleObject } from './dean-form-objects';
const MyDropdown = React.lazy(() => import('../../general/dropdown'));
const FileUpload = React.lazy(() => import('../../general/fileUpload'));
function DeanArticleForm(props) {
    const apiEndPoint = process.env.REACT_APP_APIEndPoint;
    const mediaEndPoint = process.env.REACT_APP_MediaEndPoint;
    const currentUser = useContext(UserContext);
    const simpleValidator = useRef(new SimpleReactValidator())
    const { show, onHide, id, title } = props;
    const [articleObject, setArticleObject] = useState(initialArticleObject);
    const [menuList, setMenuList] = useState([]);
    const [levelList, setLevelList] = useState([]);

    const onEditHandler = useCallback((list) => {
        setArticleObject(prevState => ({
            ...prevState,
            ArticleId: list.ArticleId,
            Title: list.Title,
            TitleFr: list.TitleFr,
            TitleFa: list.TitleFa,
            Level: list.Level,
            LevelFr: list.LevelFr,
            LevelFa: list.LevelFa,
            Body1: list.Body1,
            Body1Fr: list.Body1Fr,
            Body1Fa: list.Body1Fa,
            Body2: list.Body2,
            Body2Fr: list.Body2Fr,
            Body2Fa: list.Body2Fa,
            Description: list.Description,
            DescriptionFr: list.DescriptionFr,
            DescriptionFa: list.DescriptionFa,
            FileName: list.FileName,
            IsFree: list.IsFree,
            MenuId: list.MenuId,
            TeacherId: list.TeacherId,
            LevelId: list.LevelId,
            Modifier: currentUser.Username,
            ModificationDate: getDatetime(),
            IsDeleted: list.IsDeleted,
        }));
    }, [currentUser.Username])
    useEffect(() => {
        // console.log("Article Object=", articleObject)
    }, [articleObject]);
    useEffect(() => {
        let mounted = true;
        if (id !== "") {
            const fetchData = async () => {
                const result = await axios.get(apiEndPoint + `Article/Get?articleId=${id}`)
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
            setArticleObject(initialArticleObject);
            setArticleObject(prevState => ({
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
            const result = await axios.get(apiEndPoint + 'SideMenu/DisplayDropdown')
            if (mounted) {
                result.data.map(m =>
                    dropdownList.push({
                        value: m.MenuId,
                        label: m.Title,
                    }),
                );
                setMenuList(dropdownList);
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
    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        if (e.target.type === 'checkbox') {
            setArticleObject(prevState => ({ ...prevState, [name]: checked }));
        }
        else {
            setArticleObject(prevState => ({ ...prevState, [name]: value }));
        }
    }
    const handleUpload = (fileName) => {
        setArticleObject(prevState => ({
            ...prevState,
            FileName: fileName
        }));
    }
    const handleSubmit = () => {
        if (simpleValidator.current.allValid()) {
            axios.post(apiEndPoint + 'Article/Add', articleObject, {})
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
                            <Col xs="12" lg="6" className="text-left m-0 p-1">
                                <Form>
                                    <FileUpload postMethod={'Article/UploadFile'} title="Video(mp4)" accept={['mp4']} specifiedFileName="NoName" onUpload={handleUpload} onBlur={simpleValidator.current.showMessageFor('video')} />
                                    {simpleValidator.current.message('video', articleObject.FileName, 'required|min:1', { className: 'alert alert-danger' })}
                                    <MyDropdown
                                        label="Select time of teaching"
                                        display="Select time ..."
                                        dataList={levelList}
                                        handleChange={handleChange}
                                        name="LevelId"
                                        selectedValue={articleObject.LevelId}
                                        htmlFor="time"
                                        onBlur={simpleValidator.current.showMessageFor('level')}
                                        width="w-100"
                                    />
                                    {simpleValidator.current.message('level', articleObject.LevelId, 'required', { className: 'alert alert-danger' })}
                                    {currentUser.RoleName === 'Dean' &&
                                        <MyDropdown
                                            label="Select Menu"
                                            display="Select Menu..."
                                            dataList={menuList}
                                            handleChange={handleChange}
                                            name="MenuId"
                                            selectedValue={articleObject.MenuId}
                                            htmlFor="sidemenu"
                                            onBlur={simpleValidator.current.showMessageFor('menu')}
                                            width="w-100"
                                        />}
                                    {simpleValidator.current.message('menu', articleObject.MenuId, 'required', { className: 'alert alert-danger' })}
                                    <Form.Group>
                                        <Form.Label htmlFor="modificationDate"><h6 className="text-primary mb-0 ml-1" >Modefication Date (Now):</h6></Form.Label>
                                        <Form.Label id="modificationDate" className="border rounded border-dark d-block p-2">{articleObject.ModificationDate}</Form.Label>
                                        <Form.Label htmlFor="modificationDate"><h6 className="text-primary mb-0 ml-1" >Modefier (Now):</h6></Form.Label>
                                        <Form.Label id="modificationDate" className="border rounded border-dark d-block p-2">{articleObject.Modifier}</Form.Label>
                                    </Form.Group>

                                </Form>
                            </Col>
                            <Col xs="12" lg="6" className="align-items-center m-0 p-4">
                                {articleObject.FileName !== "" && <video controls preload="none" className="img-thumbnail mt-2 align-middle" src={mediaEndPoint + 'Videos/' + articleObject.FileName} poster="main-images/video-poster.jpg" width="100%" height="100%" type="video/mp4" />}
                                <Form.Group>
                                    <Form.Check inline name="IsDeleted" label="Is Deleted?" checked={articleObject.IsDeleted} onChange={handleChange} className="mt-2" />
                                </Form.Group>
                                {currentUser.RoleName === 'Dean' &&
                                    <Form.Group>
                                        <Form.Check inline name="IsFree" label="Is This Video Free?" checked={articleObject.IsFree} onChange={handleChange} />
                                    </Form.Group>}
                            </Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col xs="12" lg="4" className="m-0 p-1">
                                <Form.Group>
                                    <Form.Label htmlFor="title"><h6 className="text-primary mb-0 ml-1" >Title (English)::</h6></Form.Label>
                                    <Form.Control id="title" name="Title" type="text" placeholder="Enter Title" value={articleObject.Title} onChange={handleChange} onBlur={simpleValidator.current.showMessageFor('title (english)')} />
                                    {simpleValidator.current.message('title (english)', articleObject.Title, 'required|max:50', { className: 'alert alert-danger' })}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor="level"><h6 className="text-primary mb-0 ml-1" >Level (English)::</h6></Form.Label>
                                    <Form.Control id="level" name="Level" type="text" placeholder="Enter Level" value={articleObject.Level} onChange={handleChange} onBlur={simpleValidator.current.showMessageFor('level (english)')} />
                                    {simpleValidator.current.message('level (english)', articleObject.Level, 'required|max:300', { className: 'alert alert-danger' })}
                                </Form.Group>
                                {currentUser.RoleName === 'Dean' &&
                                    <Form.Group>
                                        <Form.Label htmlFor="shortdescription"><h6 className="text-primary mb-0 ml-1" >Short Description (English):</h6></Form.Label>
                                        <Form.Control id="shortdescription" name="Description" as="textarea" rows={10} placeholder="Enter description" value={articleObject.Description} onChange={handleChange} onBlur={simpleValidator.current.showMessageFor('short description (english)')} />
                                        {simpleValidator.current.message('short description (english)', articleObject.Description, 'required|max:300', { className: 'alert alert-danger' })}
                                    </Form.Group>}
                                <Form.Group>
                                    <Form.Label htmlFor="description1"><h6 className="text-primary mb-0 ml-1" >Description 1 (English):</h6></Form.Label>
                                    <Form.Control id="description1" name="Body1" as="textarea" rows={10} placeholder="Enter description" value={articleObject.Body1} onChange={handleChange} onBlur={simpleValidator.current.showMessageFor('description 1 (english)')} />
                                    {simpleValidator.current.message('description 1 (english)', articleObject.Body1, 'required|max:20000', { className: 'alert alert-danger' })}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor="description2"><h6 className="text-primary mb-0 ml-1" >Description 2 (English):</h6></Form.Label>
                                    <Form.Control id="description2" name="Body2" as="textarea" rows={10} placeholder="Enter description" value={articleObject.Body2} onChange={handleChange} onBlur={simpleValidator.current.showMessageFor('description 2 (english)')} />
                                    {simpleValidator.current.message('description 2 (english)', articleObject.Body2, 'required|max:20000', { className: 'alert alert-danger' })}
                                </Form.Group>
                            </Col>
                            <Col xs="12" lg="4" className="m-0 p-1">
                                <Form.Group>
                                    <Form.Label htmlFor="titleFr"><h6 className="text-primary mb-0 ml-1" >Title (French):</h6></Form.Label>
                                    <Form.Control id="titleFr" name="TitleFr" type="text" placeholder="Enter Title" value={articleObject.TitleFr} onChange={handleChange} onBlur={simpleValidator.current.showMessageFor('title (french)')} />
                                    {simpleValidator.current.message('title (french)', articleObject.TitleFr, 'required|max:50', { className: 'alert alert-danger' })}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor="levelFr"><h6 className="text-primary mb-0 ml-1" >Level (French):</h6></Form.Label>
                                    <Form.Control id="levelFr" name="LevelFr" type="text" placeholder="Enter Level" value={articleObject.LevelFr} onChange={handleChange} onBlur={simpleValidator.current.showMessageFor('level (french)')} />
                                    {simpleValidator.current.message('level (french)', articleObject.LevelFr, 'required|max:50', { className: 'alert alert-danger' })}
                                </Form.Group>
                                {currentUser.RoleName === 'Dean' &&
                                    <Form.Group>
                                        <Form.Label htmlFor="shortdescriptionFr"><h6 className="text-primary mb-0 ml-1" >Short Description (French):</h6></Form.Label>
                                        <Form.Control id="shortdescriptionFr" name="DescriptionFr" as="textarea" rows={10} placeholder="Enter description" value={articleObject.DescriptionFr} onChange={handleChange} onBlur={simpleValidator.current.showMessageFor('short description (french)')} />
                                        {simpleValidator.current.message('short description (french)', articleObject.DescriptionFr, 'required|max:300', { className: 'alert alert-danger' })}
                                    </Form.Group>}
                                <Form.Group>
                                    <Form.Label htmlFor="description1Fr"><h6 className="text-primary mb-0 ml-1" >Description 1 (French):</h6></Form.Label>
                                    <Form.Control id="description1Fr" name="Body1Fr" as="textarea" rows={10} placeholder="Enter description" value={articleObject.Body1Fr} onChange={handleChange} onBlur={simpleValidator.current.showMessageFor('description 1 (french)')} />
                                    {simpleValidator.current.message('description 1 (french)', articleObject.Body1Fr, 'required|max:20000', { className: 'alert alert-danger' })}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor="description2Fr"><h6 className="text-primary mb-0 ml-1" >Description 2 (French):</h6></Form.Label>
                                    <Form.Control id="description2Fr" name="Body2Fr" as="textarea" rows={10} placeholder="Enter description" value={articleObject.Body2Fr} onChange={handleChange} onBlur={simpleValidator.current.showMessageFor('description 2 (french)')} />
                                    {simpleValidator.current.message('description 2 (french)', articleObject.Body2Fr, 'required|max:20000', { className: 'alert alert-danger' })}
                                </Form.Group>
                            </Col>
                            <Col xs="12" lg="4" className="m-0 p-1">
                                <Form.Group>
                                    <Form.Label htmlFor="titleFa"><h6 className="text-primary mb-0 ml-1 text-right" >Title (Farsi):</h6></Form.Label>
                                    <Form.Control id="titleFa" name="TitleFa" type="text" placeholder="عنوان" dir="rtl" className="text-right" value={articleObject.TitleFa} onChange={handleChange} onBlur={simpleValidator.current.showMessageFor('title (farsi)')} />
                                    {simpleValidator.current.message('title (farsi)', articleObject.TitleFa, 'required|max:50', { className: 'alert alert-danger' })}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor="levelFa"><h6 className="text-primary mb-0 ml-1 text-right" >Level (Farsi):</h6></Form.Label>
                                    <Form.Control id="levelFa" name="LevelFa" type="text" placeholder="Enter Level" dir="rtl" className="سطح" value={articleObject.LevelFa} onChange={handleChange} onBlur={simpleValidator.current.showMessageFor('level (farsi)')} />
                                    {simpleValidator.current.message('level (farsi)', articleObject.LevelFa, 'required|max:50', { className: 'alert alert-danger' })}
                                </Form.Group>
                                {currentUser.RoleName === 'Dean' &&
                                    <Form.Group>
                                        <Form.Label htmlFor="shortdescriptionFa"><h6 className="text-primary mb-0 ml-1 text-right" >Short Description (farsi):</h6></Form.Label>
                                        <Form.Control id="shortdescriptionFa" name="DescriptionFa" as="textarea" rows={10} dir="rtl" placeholder="توضیحات کوتاه" value={articleObject.DescriptionFa} onChange={handleChange} onBlur={simpleValidator.current.showMessageFor('short description (farsi)')} />
                                        {simpleValidator.current.message('short description (farsi)', articleObject.DescriptionFa, 'required|max:300', { className: 'alert alert-danger' })}
                                    </Form.Group>}
                                <Form.Group>
                                    <Form.Label htmlFor="description1Fa"><h6 className="text-primary mb-0 ml-1 text-right" >Description 1 (farsi):</h6></Form.Label>
                                    <Form.Control id="description1Fa" name="Body1Fa" as="textarea" rows={10} dir="rtl" placeholder="توضیحات 1" value={articleObject.Body1Fa} onChange={handleChange} onBlur={simpleValidator.current.showMessageFor('description 1 (farsi)')} />
                                    {simpleValidator.current.message('description 1 (farsi)', articleObject.Body1Fa, 'required|max:20000', { className: 'alert alert-danger' })}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor="description2Fa"><h6 className="text-primary mb-0 ml-1 text-right" >Description 2 (farsi):</h6></Form.Label>
                                    <Form.Control id="description2Fa" name="Body2Fa" as="textarea" rows={10} dir="rtl" placeholder="توضیحات 2" value={articleObject.Body2Fa} onChange={handleChange} onBlur={simpleValidator.current.showMessageFor('description 2 (farsi)')} />
                                    {simpleValidator.current.message('description 2 (farsi)', articleObject.Body2Fa, 'required|max:20000', { className: 'alert alert-danger' })}
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
export default DeanArticleForm;



