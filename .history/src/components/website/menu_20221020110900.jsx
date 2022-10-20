import React, { useState, Suspense } from 'react';
import { useLocation, useHistory, Link } from "react-router-dom";
import { ButtonGroup, Card } from 'react-bootstrap';
import { Container, Row, Col, Collapse, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Spinner } from 'reactstrap';
import { UilListUl, UilSignin } from '@iconscout/react-unicons';
const Login = React.lazy(() => import('./login'));
const Register = React.lazy(() => import('./Register'));
const SideMenu = React.lazy(() => import('./sideMenu'));

const Menu = (props) => {
    let location = useLocation();
    let history = useHistory();
    const lang = localStorage.getItem('lang');
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [Loginhow, setLoginhow] = React.useState(false);
    const [Registerhow, setRegister] = React.useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);
    const toggleMenu = () => setIsOpenMenu(!isOpenMenu);

    const menu_Items = [
        { id: 1, Title: "Home", path: "/" },
        { id: 5, Title: "Teachers", path: "/teacher-overview" },
        { id: 9, Title: "Translators", path: "/tranlator-overview" },
        { id: 4, Title: "Courses", path: "/course" },
        { id: 6, Title: "Teacher registration", path: "/recruitment" },
        { id: 7, Title: "Certificates", path: "/certificates" },
        { id: 8, Title: "Shop", path: "/shop" },
        { id: 9, Title: "Online Class", path: "/onlineclass" },
        // { id: 2, Title: "About Us", path: "/about" },
        // { id: 3, Title: "Contact", path: "/contact" },
    ]
    const menu_Items_Fa = [
        { id: 1, Title: " خانه ", path: "/" },
        { id: 5, Title: "معرفی اساتید", path: "/teacher-overview" },
        { id: 9, Title: "معرفی مترجمین", path: "/tranlator-overview" },
        { id: 4, Title: " دوره ها ", path: "/course" },
        { id: 6, Title: "ثبت نام مدرس", path: "/recruitment" },
        { id: 7, Title: "گواهی نامه ها", path: "/certificates" },
        { id: 8, Title: "فروشگاه", path: "/shop" },
        { id: 9, Title: "کلاس مجازی", path: "/onlineclass" }
        // { id: 2, Title: " درباره ما ", path: "/about" },
        // { id: 3, Title: " تماس با ما ", path: "/contact" },
    ]
    const menu_Items_Fr = [
        { id: 1, Title: "Accueil", path: "/" },
        { id: 5, Title: "Enseignants", path: "/teacher-overview" },
        { id: 9, Title: "Traducteurs", path: "/tranlator-overview" },
        { id: 4, Title: "Cours", path: "/course" },
        { id: 6, Title: "Inscription des enseignants", path: "/recruitment" },
        { id: 7, Title: "Certificats", path: "/certificates" },
        { id: 8, Title: "Magasin", path: "/shop" },
        { id: 9, Title: "Online Class", path: "/onlineclass" },
        // { id: 2, Title: "À propos de nous", path: "/about" },
        // { id: 3, Title: "Contact", path: "/contact" },
    ]
    const menu_Items_Ar = [
        { id: 1, Title: "مسكن", path: "/" },
        { id: 5, Title: "معلمون", path: "/teacher-overview" },
        { id: 9, Title: "التعريف بالمترجمين", path: "/tranlator-overview" },
        { id: 4, Title: "الدورات", path: "/course" },
        { id: 6, Title: "تسجيل المعلم", path: "/recruitment" },
        { id: 7, Title: "الشهادات", path: "/certificates" },
        { id: 8, Title: "محل", path: "/shop" },
        { id: 9, Title: "فئة افتراضية", path: "/onlineclass" }
        // { id: 2, Title: "معلومات عنا", path: "/about" },
        // { id: 3, Title: "اتصال", path: "/contact" },
    ]
    function setLanguage(lang) {
        localStorage.setItem('lang', lang);
        history.push(location.pathname);
    }
    const dispalyMenu = (lang) => {
        if (lang === 'en') {
            return (
                <Container fluid className="d-none d-md-block">
                    {window.innerWidth > 1200 ?
                        <Row className="pt-3 pb-3" >
                            <Col xs="12" md="12" className="m-0 p-0 align-items-center" >
                                <ButtonGroup aria-label="p-0 m-0">
                                    {menu_Items.map(item =>
                                        item.id ===
                                            8 ? <a key={item.id} className={location.pathname === item.path ? "btn bg-primary pl-3 pr-3" : "btn d-inline pl-3 pr-3"} href={'https://shop.nasrinacademy.com/'} target='blank'>{item.Title}</a>:
                                            9? <a key={item.id} className={location.pathname === item.path ? "btn bg-primary pl-3 pr-3" : "btn d-inline pl-3 pr-3"} href={'https://class.nasrinacademy.com/'} target='blank'>{item.Title}</a>
                                            : <Link key={item.id} className={location.pathname === item.path ? "btn bg-primary pl-3 pr-3" : "btn d-inline pl-3 pr-3"} to={item.path} replace>{item.Title}</Link>
                                    )}
                                </ButtonGroup>
                                <button className="btn   d-inline ml-1  float-right" onClick={() => setRegister(true)}>Register</button>
                                <button className="btn d-inline ml-1  float-right" onClick={() => setLoginhow(true)}>Login to Portal</button>
                                <Dropdown isOpen={dropdownOpen} toggle={toggle} className="d-inline"  >
                                    <DropdownToggle className="btn d-inline float-right" caret>
                                        Language...
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem onClick={() => setLanguage("en")}>
                                            <img className="d-inline" src="main-images/en.webp" width="32" height="32" alt="Logo" /> English
                                        </DropdownItem>
                                        <DropdownItem onClick={() => setLanguage("fr")}>
                                            <img className="d-inline" src="main-images/fr.webp" width="32" height="32" alt="Logo" /> Français
                                        </DropdownItem>
                                        <DropdownItem onClick={() => setLanguage("fa")}>
                                            <img className="d-inline" src="main-images/fa.webp" width="32" height="32" alt="Logo" /> فارسی
                                        </DropdownItem>
                                        <DropdownItem onClick={() => setLanguage("ar")}>
                                            <img className="d-inline" src="main-images/ar.webp" width="32" height="32" alt="Logo" /> العربی
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </Col>
                        </Row>
                        :
                        <div className="text-left">
                            <Row className="pt-3 pb-3" >
                                <Col xs="12" md="12" className="m-0 p-0 align-items-center" >
                                    <ButtonGroup aria-label="p-0 m-0">
                                        {menu_Items.map(item =>
                                            item.id === 8
                                                ? <a key={item.id} className={location.pathname === item.path ? "btn bg-primary pl-3 pr-3" : "btn d-inline pl-3 pr-3"} href={'https://shop.nasrinacademy.com/'} target='blank'>{item.Title}</a> :
                                                9? <a key={item.id} className={location.pathname === item.path ? "btn bg-primary pl-3 pr-3" : "btn d-inline pl-3 pr-3"} href={'https://class.nasrinacademy.com/'} target='blank'>{item.Title}</a>
                                                : <Link key={item.id} className={location.pathname === item.path ? "btn bg-primary pl-3 pr-3" : "btn d-inline pl-3 pr-3"} to={item.path} replace>{item.Title}</Link>
                                        )}
                                    </ButtonGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="12" md="12" className="m-0 p-0 align-items-center" >
                                    <button className="btn d-inline ml-1  float-right" onClick={() => setRegister(true)}>Register</button>
                                    <button className="btn d-inline ml-1 mr-2 mb-2" onClick={() => setLoginhow(true)}>Login to Portal</button>
                                    <Dropdown isOpen={dropdownOpen} toggle={toggle} className="d-inline"  >
                                        <DropdownToggle className="btn d-inline mr-2 mb-2" caret>
                                            Language...
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem onClick={() => setLanguage("en")}>
                                                <img className="d-inline" src="main-images/en.webp" width="32" height="32" alt="Logo" /> English
                                            </DropdownItem>
                                            <DropdownItem onClick={() => setLanguage("fr")}>
                                                <img className="d-inline" src="main-images/fr.webp" width="32" height="32" alt="Logo" /> Français
                                            </DropdownItem>
                                            <DropdownItem onClick={() => setLanguage("fa")}>
                                                <img className="d-inline" src="main-images/fa.webp" width="32" height="32" alt="Logo" /> فارسی
                                            </DropdownItem>
                                            <DropdownItem onClick={() => setLanguage("ar")}>
                                                <img className="d-inline" src="main-images/ar.webp" width="32" height="32" alt="Logo" /> العربی
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </Col>
                            </Row>
                        </div>
                    }
                </Container>
            )

        }
        else if (lang === 'fr') {
            return (
                <Container fluid className="d-none d-md-block">
                    {window.innerWidth > 1200 ?
                        <Row className="pt-3 pb-3" >
                            <Col xs="12" md="12" className="m-0 p-0 align-items-center d-table" >
                                <ButtonGroup aria-label="Basic example">
                                    {menu_Items_Fr.map(item =>
                                        item.id === 8
                                            ? <a key={item.id} className={location.pathname === item.path ? "btn bg-primary pl-3 pr-3" : "btn d-inline pl-3 pr-3"} href={'https://shop.nasrinacademy.com/'} target='blank'>{item.Title}</a>:
                                            9? <a key={item.id} className={location.pathname === item.path ? "btn bg-primary pl-3 pr-3" : "btn d-inline pl-3 pr-3"} href={'https://class.nasrinacademy.com/'} target='blank'>{item.Title}</a>
                                            : <Link key={item.id} className={location.pathname === item.path ? "btn bg-primary pl-3 pr-3" : "btn d-inline pl-3 pr-3"} to={item.path} replace>{item.Title}</Link>
                                    )}
                                </ButtonGroup>
                                <button className="btn  d-inline ml-1  float-right" onClick={() => setRegister(true)}>S'inscrire</button>
                                <button className="btn  d-inline ml-1  float-right" onClick={() => setLoginhow(true)}>Se Connecter</button>
                                <Dropdown isOpen={dropdownOpen} toggle={toggle} className="d-inline"  >
                                    <DropdownToggle className="btn  d-inline float-right" caret>
                                        Language...
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem onClick={() => setLanguage("en")}>
                                            <img className="d-inline" src="main-images/en.webp" width="32" height="32" alt="Logo" /> English
                                        </DropdownItem>
                                        <DropdownItem onClick={() => setLanguage("fr")}>
                                            <img className="d-inline" src="main-images/fr.webp" width="32" height="32" alt="Logo" /> Français
                                        </DropdownItem>
                                        <DropdownItem onClick={() => setLanguage("fa")}>
                                            <img className="d-inline" src="main-images/fa.webp" width="32" height="32" alt="Logo" /> فارسی
                                        </DropdownItem>
                                        <DropdownItem onClick={() => setLanguage("ar")}>
                                            <img className="d-inline" src="main-images/ar.webp" width="32" height="32" alt="Logo" /> العربی
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </Col>
                        </Row>
                        :
                        <div>
                            <Row className="pt-3 pb-3" >
                                <Col xs="12" md="12" className="m-0 p-0 align-items-center d-table" >
                                    <ButtonGroup aria-label="Basic example">
                                        {menu_Items_Fr.map(item =>
                                            item.id === 8
                                                ? <a key={item.id} className={location.pathname === item.path ? "btn bg-primary pl-3 pr-3" : "btn d-inline pl-3 pr-3"} href={'https://shop.nasrinacademy.com/'} target='blank'>{item.Title}</a> :
                                                9? <a key={item.id} className={location.pathname === item.path ? "btn bg-primary pl-3 pr-3" : "btn d-inline pl-3 pr-3"} href={'https://class.nasrinacademy.com/'} target='blank'>{item.Title}</a>
                                                : <Link key={item.id} className={location.pathname === item.path ? "btn bg-primary pl-3 pr-3" : "btn d-inline pl-3 pr-3"} to={item.path} replace>{item.Title}</Link>
                                        )}
                                    </ButtonGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="12" md="12" className="m-0 p-0 align-items-center" >
                                    <button className="btn  d-inline ml-1  float-right" onClick={() => setRegister(true)}>S'inscrire</button>
                                    <button className="btn  d-inline ml-1  mr-2 mb-2" onClick={() => setLoginhow(true)}>Se Connecter</button>
                                    <Dropdown isOpen={dropdownOpen} toggle={toggle} className="d-inline"  >
                                        <DropdownToggle className="btn  d-inline mr-2 mb-2" caret>
                                            Language...
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem onClick={() => setLanguage("en")}>
                                                <img className="d-inline" src="main-images/en.webp" width="32" height="32" alt="Logo" /> English
                                            </DropdownItem>
                                            <DropdownItem onClick={() => setLanguage("fr")}>
                                                <img className="d-inline" src="main-images/fr.webp" width="32" height="32" alt="Logo" /> Français
                                            </DropdownItem>
                                            <DropdownItem onClick={() => setLanguage("fa")}>
                                                <img className="d-inline" src="main-images/fa.webp" width="32" height="32" alt="Logo" /> فارسی
                                            </DropdownItem>
                                            <DropdownItem onClick={() => setLanguage("ar")}>
                                                <img className="d-inline" src="main-images/ar.webp" width="32" height="32" alt="Logo" /> العربی
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </Col>
                            </Row>
                        </div>
                    }
                </Container>
            )
        }
        else if (lang === 'fa') {
            return (
                <Container fluid className="d-none d-md-block text-right" >
                    {window.innerWidth > 1200 ?
                        <Row className="pt-3 pb-3" >
                            <Col xs="12" md="12" className="m-0 p-0 align-items-center"  >
                                <ButtonGroup aria-label="Basic example"  >
                                    {menu_Items_Fa.reverse().map(item =>
                                        item.id === 8
                                            ? <a key={item.id} className={location.pathname === item.path ? "btn bg-primary pl-3 pr-3" : "btn d-inline pl-3 pr-3"} href={'https://shop.nasrinacademy.com/'} target='blank'>{item.Title}</a> :
                                            9? <a key={item.id} className={location.pathname === item.path ? "btn bg-primary pl-3 pr-3" : "btn d-inline pl-3 pr-3"} href={'https://class.nasrinacademy.com/'} target='blank'>{item.Title}</a>
                                            : <Link key={item.id} className={location.pathname === item.path ? "btn bg-primary pl-3 pr-3" : "btn d-inline pl-3 pr-3"} to={item.path} replace>{item.Title}</Link>
                                    )}
                                </ButtonGroup>
                                <button className="btn d-inline mr-1  float-left" onClick={() => setRegister(true)}>ثبت نام</button>
                                <button className="btn  d-inline mr-1 float-left" onClick={() => setLoginhow(true)}>ورود به پورتال</button>
                                <Dropdown isOpen={dropdownOpen} toggle={toggle} className="d-inline" dir="ltr" >
                                    <DropdownToggle className="btn  d-inline float-left" caret>
                                        Choose Language
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem onClick={() => setLanguage("en")}>
                                            <img className="d-inline" src="main-images/en.webp" width="32" height="32" alt="Logo" /> English
                                        </DropdownItem>
                                        <DropdownItem onClick={() => setLanguage("fr")}>
                                            <img className="d-inline" src="main-images/fr.webp" width="32" height="32" alt="Logo" /> Français
                                        </DropdownItem>
                                        <DropdownItem onClick={() => setLanguage("fa")}>
                                            <img className="d-inline" src="main-images/fa.webp" width="32" height="32" alt="Logo" /> فارسی
                                        </DropdownItem>
                                        <DropdownItem onClick={() => setLanguage("ar")}>
                                            <img className="d-inline" src="main-images/ar.webp" width="32" height="32" alt="Logo" /> العربی
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </Col>
                        </Row>
                        :
                        <div>
                            <Row className="pt-3 pb-3" >
                                <Col xs="12" md="12" className="m-0 p-0 align-items-center"  >
                                    <ButtonGroup aria-label="Basic example"  >
                                        {menu_Items_Fa.reverse().map(item =>
                                            item.id === 8
                                                ? <a key={item.id} className={location.pathname === item.path ? "btn bg-primary pl-3 pr-3" : "btn d-inline pl-3 pr-3"} href={'https://shop.nasrinacademy.com/'} target='blank'>{item.Title}</a> :
                                                9? <a key={item.id} className={location.pathname === item.path ? "btn bg-primary pl-3 pr-3" : "btn d-inline pl-3 pr-3"} href={'https://class.nasrinacademy.com/'} target='blank'>{item.Title}</a>
                                                : <Link key={item.id} className={location.pathname === item.path ? "btn bg-primary pl-3 pr-3" : "btn d-inline pl-3 pr-3"} to={item.path} replace>{item.Title}</Link>
                                        )}
                                    </ButtonGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="12" md="12" className="m-0 p-0 align-items-center" >
                                    <button className="btn d-inline mr-1  float-left" onClick={() => setRegister(true)}>ثبت نام</button>
                                    <button className="btn  d-inline ml-2 mb-2" onClick={() => setLoginhow(true)}>ورود به پورتال</button>
                                    <Dropdown isOpen={dropdownOpen} toggle={toggle} className="d-inline" dir="ltr" >
                                        <DropdownToggle className="btn  d-inline ml-2 mb-2" caret>
                                            Choose Language
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem onClick={() => setLanguage("en")}>
                                                <img className="d-inline" src="main-images/en.webp" width="32" height="32" alt="Logo" /> English
                                            </DropdownItem>
                                            <DropdownItem onClick={() => setLanguage("fr")}>
                                                <img className="d-inline" src="main-images/fr.webp" width="32" height="32" alt="Logo" /> Français
                                            </DropdownItem>
                                            <DropdownItem onClick={() => setLanguage("fa")}>
                                                <img className="d-inline" src="main-images/fa.webp" width="32" height="32" alt="Logo" /> فارسی
                                            </DropdownItem>
                                            <DropdownItem onClick={() => setLanguage("ar")}>
                                                <img className="d-inline" src="main-images/ar.webp" width="32" height="32" alt="Logo" /> العربی
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </Col>
                            </Row>
                        </div>
                    }
                </Container>
            )
        } else {
            return (
                <Container fluid className="d-none d-md-block text-right" >
                    {window.innerWidth > 1200 ?
                        <Row className="pt-3 pb-3" >
                            <Col xs="12" md="12" className="m-0 p-0 align-items-center"  >
                                <ButtonGroup aria-label="Basic example"  >
                                    {menu_Items_Ar.reverse().map(item =>
                                        item.id === 8
                                            ? <a key={item.id} className={location.pathname === item.path ? "btn bg-primary pl-3 pr-3" : "btn d-inline pl-3 pr-3"} href={'https://shop.nasrinacademy.com/'} target='blank'>{item.Title}</a> :
                                            9? <a key={item.id} className={location.pathname === item.path ? "btn bg-primary pl-3 pr-3" : "btn d-inline pl-3 pr-3"} href={'https://class.nasrinacademy.com/'} target='blank'>{item.Title}</a>
                                            : <Link key={item.id} className={location.pathname === item.path ? "btn bg-primary pl-3 pr-3" : "btn d-inline pl-3 pr-3"} to={item.path} replace>{item.Title}</Link>
                                    )}
                                </ButtonGroup>
                                <button className="btn d-inline mr-1  float-left" onClick={() => setRegister(true)}>يسجل</button>
                                <button className="btn  d-inline mr-1 float-left" onClick={() => setLoginhow(true)}>تسجيل الدخول إلى البوابة</button>
                                <Dropdown isOpen={dropdownOpen} toggle={toggle} className="d-inline" dir="ltr" >
                                    <DropdownToggle className="btn  d-inline float-left" caret>
                                        Choose Language
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem onClick={() => setLanguage("en")}>
                                            <img className="d-inline" src="main-images/en.webp" width="32" height="32" alt="Logo" /> English
                                        </DropdownItem>
                                        <DropdownItem onClick={() => setLanguage("fr")}>
                                            <img className="d-inline" src="main-images/fr.webp" width="32" height="32" alt="Logo" /> Français
                                        </DropdownItem>
                                        <DropdownItem onClick={() => setLanguage("fa")}>
                                            <img className="d-inline" src="main-images/fa.webp" width="32" height="32" alt="Logo" /> فارسی
                                        </DropdownItem>
                                        <DropdownItem onClick={() => setLanguage("ar")}>
                                            <img className="d-inline" src="main-images/ar.webp" width="32" height="32" alt="Logo" /> العربی
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </Col>
                        </Row>
                        :
                        <div>
                            <Row className="pt-3 pb-3" >
                                <Col xs="12" md="12" className="m-0 p-0 align-items-center"  >
                                    <ButtonGroup aria-label="Basic example"  >
                                        {menu_Items_Ar.reverse().map(item =>
                                            item.id === 8
                                                ? <a key={item.id} className={location.pathname === item.path ? "btn bg-primary pl-3 pr-3" : "btn d-inline pl-3 pr-3"} href={'https://shop.nasrinacademy.com/'} target='blank'>{item.Title}</a> :
                                                9? <a key={item.id} className={location.pathname === item.path ? "btn bg-primary pl-3 pr-3" : "btn d-inline pl-3 pr-3"} href={'https://class.nasrinacademy.com/'} target='blank'>{item.Title}</a>
                                                : <Link key={item.id} className={location.pathname === item.path ? "btn bg-primary pl-3 pr-3" : "btn d-inline pl-3 pr-3"} to={item.path} replace>{item.Title}</Link>
                                        )}
                                    </ButtonGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="12" md="12" className="m-0 p-0 align-items-center" >
                                    <button className="btn d-inline mr-1  float-left" onClick={() => setRegister(true)}>يسجل</button>
                                    <button className="btn  d-inline ml-2 mb-2" onClick={() => setLoginhow(true)}>تسجيل الدخول إلى البوابة</button>
                                    <Dropdown isOpen={dropdownOpen} toggle={toggle} className="d-inline" dir="ltr" >
                                        <DropdownToggle className="btn  d-inline ml-2 mb-2" caret>
                                            Choose Language
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem onClick={() => setLanguage("en")}>
                                                <img className="d-inline" src="main-images/en.webp" width="32" height="32" alt="Logo" /> English
                                            </DropdownItem>
                                            <DropdownItem onClick={() => setLanguage("fr")}>
                                                <img className="d-inline" src="main-images/fr.webp" width="32" height="32" alt="Logo" /> Français
                                            </DropdownItem>
                                            <DropdownItem onClick={() => setLanguage("fa")}>
                                                <img className="d-inline" src="main-images/fa.webp" width="32" height="32" alt="Logo" /> فارسی
                                            </DropdownItem>
                                            <DropdownItem onClick={() => setLanguage("ar")}>
                                                <img className="d-inline" src="main-images/ar.webp" width="32" height="32" alt="Logo" /> العربی
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </Col>
                            </Row>
                        </div>
                    }
                </Container>
            )
        }
    }
    return (
        <div>
            {window.innerWidth < 786 ?
                <Container fluid className="d-sm-block d-md-none p-1">
                    <Row className="align-items-center mt-2">
                        <Col xs="5" className=" text-white p-1 font-weight-bold">
                            Nasrin Academy
                        </Col>
                        <Col xs="7" className="text-right p-1">
                            <img className="ml-1 mr-1" src="main-images/fa.webp" onClick={() => setLanguage("fa")} alt="select persian version" />
                            <img className="ml-1 mr-1" src="main-images/en.webp" onClick={() => setLanguage("en")} alt="select english version" />
                            <img className="ml-1 mr-1" src="main-images/fr.webp" onClick={() => setLanguage("fr")} alt="select french version" />
                            <img className="ml-1 mr-1" src="main-images/ar.webp" onClick={() => setLanguage("ar")} alt="select arabic version" />
                            <UilListUl className="ml-1 mr-1 text-white" size={32} onClick={toggleMenu} />
                            <UilSignin className="ml-1 text-white" onClick={() => setLoginhow(true)} />
                            <UilSignin className="ml-1 text-white" onClick={() => setRegister(true)} />
                        </Col>
                    </Row>
                    <Row className="align-items-center mt-3" >
                        <Col sm="6" md="10" className="m-0 float-sm-left" >
                            <Collapse className="d-sm-block d-md-none" isOpen={isOpenMenu}>
                                <Row className="">
                                    <Col md="2">
                                        <Card.Body dir={lang === 'fa' ? 'rtl' : 'ltr'} className={lang === 'fa' ? 'side-menu-body text-right ' : 'side-menu-body'}>
                                            <Suspense fallback={<div className="text-center"><Spinner color="success" /></div>}>
                                                <SideMenu />
                                            </Suspense>
                                        </Card.Body>
                                    </Col>
                                </Row>
                            </Collapse>
                        </Col>
                    </Row>
                </Container>
                : dispalyMenu(lang)
            }
            <Suspense fallback={<Spinner color="success" />}>
                <Login show={Loginhow} onHide={() => setLoginhow(false)} />
            </Suspense>
            <Suspense fallback={<Spinner color="success" />}>
                <Register show={Registerhow} onHide={() => setRegister(false)} />
            </Suspense>
        </div>
    );
}
export default Menu;
