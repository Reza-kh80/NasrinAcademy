import React, { useEffect, useState } from 'react';
import { useLocation, useHistory, Link } from "react-router-dom";
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';

function SideMenu() {
    let location = useLocation();
    const apiEndPoint = process.env.REACT_APP_APIEndPoint;
    const [menuList, setMenuList] = useState([]);
    const [articleList, setArticleList] = useState([]);
    const lang = localStorage.getItem('lang');
    useEffect(() => {
        let mounted = true;
        const fetchData = async () => {
            let menu = [];
            const result = await axios.get(apiEndPoint + "SideMenu/DisplayAll")
            result.data.map(m =>
                menu.push({
                    id: m.MenuId,
                    title: m.Title,
                    titleFr: m.TitleFr,
                    titleFa: m.TitleFa,
                    active: false
                }))
            if (mounted) {
                setMenuList(menu);
            }
        };
        fetchData();
        return () => {
            mounted = false;
        };
    }, [apiEndPoint]);
    const getArticle = async (id) => {
        const result = await axios.get(apiEndPoint + `Article/DisplayAllForMenu?menuId=${id}`)
        setArticleList(result.data)
    }
    const getBody = () => {
        return (
            articleList.map((item, index) =>
                <Link key={index} className="side-menu-link" to={"/article/" + item.ArticleId} replace>{getHeadingBody(item)[0]}</Link>
            )
        )
    }
    function setActive(index, id) {
        let newMenu = [...menuList];
        newMenu.map(function (item, i) {
            if (i === index) {
                return newMenu[i].active = !(newMenu[i].active)
            }
            else {
                return newMenu[i].active = false
            }
        })
        setMenuList(newMenu);
        getArticle(id);
    }
    const menu_Items = [
        { id: 1, Title: "Home", path: "/" },
        { id: 5, Title: "Teachers", path: "/teacher-overview" },
        { id: 4, Title: "Courses", path: "/course" },
        { id: 6, Title: "Teacher registration", path: "/recruitment" },
        { id: 7, Title: "Certificates", path: "/certificates" },
        { id: 8, Title: "Shop", path: "/shop" },
        { id: 9, Title: "Online Class", path: "/onlineclass" },
        { id: 2, Title: "About Us", path: "/about" },
        { id: 3, Title: "Contact", path: "/contact" },
        { id: 10, Title: "Dictionary", path: "/dictionary" },
    ]
    const menu_Items_Fa = [
        { id: 1, Title: " خانه ", path: "/" },
        { id: 5, Title: "معرفی اساتید", path: "/teacher-overview" },
        { id: 4, Title: " دوره ها ", path: "/course" },
        { id: 6, Title: "ثبت نام مدرس", path: "/recruitment" },
        { id: 7, Title: "گواهی نامه ها", path: "/certificates" },
        { id: 8, Title: "فروشگاه", path: "/shop" },
        { id: 9, Title: "کلاس مجازی", path: "/onlineclass" },
        { id: 2, Title: " درباره ما ", path: "/about" },
        { id: 3, Title: " تماس با ما ", path: "/contact" },
        { id: 10, Title: "دیکشنری", path: "/dictionary" },
    ]
    const menu_Items_Fr = [
        { id: 1, Title: "Accueil", path: "/" },
        { id: 5, Title: "Enseignants", path: "/teacher-overview" },
        { id: 4, Title: "Cours", path: "/course" },
        { id: 6, Title: "Inscription des enseignants", path: "/recruitment" },
        { id: 7, Title: "Certificats", path: "/certificates" },
        { id: 8, Title: "Magasin", path: "/shop" },
        { id: 9, Title: "Online Class", path: "/onlineclass" },
        { id: 2, Title: "À propos de nous", path: "/about" },
        { id: 3, Title: "Contact", path: "/contact" },
        { id: 10, Title: "dictionnaire", path: "/dictionary" },
    ]
    const menu_Items_Ar = [
        { id: 1, Title: "مسكن", path: "/" },
        { id: 5, Title: "معلمون", path: "/teacher-overview" },
        { id: 4, Title: "الدورات", path: "/course" },
        { id: 6, Title: "تسجيل المعلم", path: "/recruitment" },
        { id: 7, Title: "الشهادات", path: "/certificates" },
        { id: 8, Title: "محل", path: "/shop" },
        { id: 9, Title: "فئة افتراضية", path: "/onlineclass" },
        { id: 2, Title: "معلومات عنا", path: "/about" },
        { id: 3, Title: "اتصال", path: "/contact" },
        { id: 10, Title: "قاموس", path: "/dictionary" },
    ]

    function renderitem(item) {
        if (item.id===8) {
            return <Accordion.Toggle as={Card.Header} className="cursor-pointer m-0 p-1 text-left" >
                                        <a key={item.id} className="text-white" href={'https://shop.nasrinacademy.com/'} target='blank'>{item.Title}</a>
                                    </Accordion.Toggle>
        } else if (item.id===9) {
            return <Accordion.Toggle as={Card.Header} className="cursor-pointer m-0 p-1 text-left" >
                                        <a key={item.id} className="text-white" href={'https://class.nasrinacademy.com/'} target='blank'>{item.Title}</a>
                                    </Accordion.Toggle>
        }  else if (item.id===10) {
            return <a key={item.id} className={location.pathname === item.path ? "btn bg-primary pl-3 pr-3" : "btn d-inline pl-3 pr-3"} href={'https://dictionary.nasrinacademy.com/'} target='blank'>{item.Title}</a>
        } else {
            return  <Accordion.Toggle as={Card.Header} className="cursor-pointer m-0 p-1 text-left" >
                                        <Link key={item.id} className="text-white" to={item.path} replace>{item.Title}</Link>
                                    </Accordion.Toggle>
        }
    }

    const getHeadingBody = (item) => {
        let heading = []
        if (lang === 'en') {
            heading.push(item.Title)
        }
        else if (lang === 'fr') {
            heading.push(item.TitleFr)
        }
        else {
            heading.push(item.TitleFa)
        }
        return heading
    }
    const getHeading = (item) => {
        let heading = []
        if (lang === 'en') {
            heading.push(item.title)
        }
        else if (lang === 'fr') {
            heading.push(item.titleFr)
        }
        else if (lang === 'fa') {
            heading.push(item.titleFa)
        }
        else {
            heading.push(item.titleFa);
        }
        return heading
    }
    const displayMenuHeader = (item) => {
        if (item.title === 'Flash Cards') {
            return (<Link className={lang === 'fa' || lang === 'ar' ? 'float-right text-right text-white' : 'float-left text-left text-white'} to="/flashcards" replace>{getHeading(item)[0]}</Link>)
        }
        else if (item.title === 'Video Archives') {
            return (<Link className={lang === 'fa' || lang === 'ar' ? 'float-right text-right text-white' : 'float-left text-left text-white'} to="/media" replace>{getHeading(item)[0]}</Link>)
        }
        else {
            return (
                lang === 'fa' || lang === 'ar' ?
                    <div dir="rtl">
                        <span className="text-right float-right text-white" dir="rtl">{getHeading(item)[0]}</span>
                        <span className={item.active ? 'fa fa-chevron-circle-up text-warning float-left' : 'fa fa-chevron-circle-down float-left'}></span>
                    </div>
                    : <div>
                        <span className="text-white">{getHeading(item)[0]}</span>
                        <span className={item.active ? 'fa fa-chevron-circle-up text-warning float-right' : 'fa fa-chevron-circle-down float-right'}></span>
                    </div>
            )
        }
    }
    return (
        <div className="m-0 p-0" >
            <Accordion defaultActiveKey="0" >
                {window.innerWidth < 786 &&
                    <Card className="bg-transparent" >
                        {lang === 'en' ?
                            menu_Items.map(item =>
                                renderitem(item)
                            ) :
                            lang === 'fr' ?
                                menu_Items_Fr.map(item =>
                                    renderitem(item)
                                ) :
                                lang === 'fa' ?
                                    menu_Items_Fa.map(item =>
                                        renderitem(item)
                                    ) :
                                    menu_Items_Ar.map(item =>
                                        renderitem(item)
                                    )}
                    </Card>
                }
                {menuList.map((item, index) =>
                    <Card className="bg-transparent" key={index}>
                        <Accordion.Toggle as={Card.Header} eventKey={index} onClick={() => setActive(index, item.id)} className="cursor-pointer m-0 p-1" dir={lang === 'fa' ? 'rtl' : 'ltr'}>
                            {displayMenuHeader(item)}
                        </Accordion.Toggle>
                        {index > 1 &&
                            <Accordion.Collapse eventKey={index}>
                                <Card.Body dir={lang === 'fa' ? 'rtl' : 'ltr'} className={lang === 'fa' ? 'side-menu-body text-right ' : 'side-menu-body'}>{getBody()}</Card.Body>
                            </Accordion.Collapse>
                        }
                    </Card>
                )}
            </Accordion>

        </div>
    );
}
export default SideMenu;
