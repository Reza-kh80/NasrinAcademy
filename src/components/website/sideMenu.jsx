import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
function SideMenu() {
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
        { id: 2, Title: "About Us", path: "/about" },
        { id: 3, Title: "Contact", path: "/contact" },
        { id: 4, Title: "Courses", path: "/course" },
        { id: 5, Title: "Teachers", path: "/teacher-overview" },
        { id: 6, Title: "Teacher Recruitment", path: "/recruitment" },
    ]
    const menu_Items_Fa = [
        { id: 1, Title: " خانه ", path: "/" },
        { id: 2, Title: " درباره ما ", path: "/about" },
        { id: 3, Title: " تماس با ما ", path: "/contact" },
        { id: 4, Title: " دوره ها ", path: "/course" },
        { id: 5, Title: "معرفی اساتید", path: "/teacher-overview" },
        { id: 6, Title: "استخدام مدرس", path: "/recruitment" },
    ]
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
        else {
            heading.push(item.titleFa)
        }
        return heading
    }
    const displayMenuHeader = (item) => {
        if (item.title === 'Flash Cards') {
            return (<Link className={lang === 'fa' ? 'float-right text-right text-white' : 'float-left text-left text-white'} to="/flashcards" replace>{getHeading(item)[0]}</Link>)
        }
        else if (item.title === 'Video Archives') {
            return (<Link className={lang === 'fa' ? 'float-right text-right text-white' : 'float-left text-left text-white'} to="/media" replace>{getHeading(item)[0]}</Link>)
        }
        else {
            return (
                lang === 'fa' ?
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
                        {lang === 'en' ? menu_Items.map(item =>
                            <Accordion.Toggle as={Card.Header} className="cursor-pointer m-0 p-1 text-left" >
                                <Link key={item.id} className="text-white" to={item.path}>{item.Title}</Link>
                            </Accordion.Toggle>
                        ) : menu_Items_Fa.map(item =>
                            <Accordion.Toggle as={Card.Header} className="cursor-pointer m-0 p-1 text-right" dir='rtl'>
                                <Link key={item.id} className="text-white" to={item.path}>{item.Title}</Link>
                            </Accordion.Toggle>
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
