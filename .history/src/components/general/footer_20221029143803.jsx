import React, { useState, useEffect } from 'react';
import { Container, Row, Col, FormGroup, Label } from 'reactstrap';
import axios from 'axios';
import { useLocation, useHistory, Link } from "react-router-dom";

const Footer = (props) => {
    let location = useLocation();
    const [description, setDescription] = useState('');
    const [aboutList, setAboutList] = useState([]);

    const getAbout = async () => {
        await axios.get(process.env.REACT_APP_APIEndPoint + 'About/DisplayAll').then(response => {
            setAboutList(response.data);
            // this.setState({ aboutList: response.data });
            setDescription(response.data[0].Description);
            // this.setState({ description: response.data[0].Description });
        });
    }

    useEffect(() => {
        getAbout();
    }, [])

    const newWindow = () => {
        window.open("https://logo.samandehi.ir/Verify.aspx?id=237661&p=uiwkxlaojyoegvkagvkarfth", "Popup", "toolbar=no, scrollbars=no, location=no, statusbar=no, menubar=no, resizable=0, width=450, height=630, top=30")
    }

    const lang = localStorage.getItem('lang');

    const menu_Items = [
        { id: 1, Title: "Home", path: "/" },
        { id: 5, Title: "Teachers", path: "/teacher-overview" },
        { id: 9, Title: "Translators", path: "/tranlator-overview" },
        { id: 4, Title: "Courses", path: "/course" },
        { id: 6, Title: "Teacher registration", path: "/recruitment" },
        { id: 7, Title: "Certificates", path: "/certificates" },
        { id: 8, Title: "Shop", path: "/shop" },
        { id: 9, Title: "Online Class", path: "/shop" },
        { id: 10, Title: "Dictionary", path: "/dictionary" },
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
        { id: 10, Title: "کلاس مجازی", path: "/onlineclass" },
        { id: 11, Title: "دیکشنری", path: "/dictionary" },
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
        { id: 10, Title: "Online Class", path: "/onlineclass" },
        { id: 11, Title: "dictionnaire", path: "/dictionary" },
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
        { id: 10, Title: "فئة افتراضية", path: "/onlineclass" },
        { id: 11, Title: "قاموس", path: "/dictionary" },
        // { id: 2, Title: "معلومات عنا", path: "/about" },
        // { id: 3, Title: "اتصال", path: "/contact" },
    ]

    function renderitem(item) {
        if (item.id===8) {
            return <a key={item.id} className={location.pathname === item.path ? "btn bg-primary pl-3 pr-3" : "btn d-inline pl-3 pr-3"} href={'https://shop.nasrinacademy.com/'} target='blank'>{item.Title}</a>
        } else if (item.id===10) {
            return <a key={item.id} className={location.pathname === item.path ? "btn bg-primary pl-3 pr-3" : "btn d-inline pl-3 pr-3"} href={'https://class.nasrinacademy.com/'} target='blank'>{item.Title}</a>
        }  else if (item.id===11) {
            return <a key={item.id} className={location.pathname === item.path ? "btn bg-primary pl-3 pr-3" : "btn d-inline pl-3 pr-3"} href={'https://dictionary.nasrinacademy.com/'} target='blank'>{item.Title}</a>
        } else {
            return <Link key={item.id} className={location.pathname === item.path ? "btn bg-primary pl-3 pr-3" : "btn d-inline pl-3 pr-3"} to={item.path} replace>{item.Title}</Link>
        }
    }

    const getTitle = (lang, item) => {
        let heading = [];

        if (lang === 'fa') {
            heading.push('پیمایش سریع');
            heading.push(item.DescriptionFa);
            heading.push('درباره نسرین آکادمی');
            heading.push('تماس با ما');
            heading.push('آدرس');
            heading.push('ایران-تهران-شکوفه کاظمی');
            heading.push('989371073665+');
            heading.push('ndaftarchi@gmail.com');
        }

        if (lang === 'en') {
            heading.push('Fast navigation');
            heading.push(item.Description);
            heading.push('About Nasrin Academy');
            heading.push('contact us');
            heading.push('Address');
            heading.push('IRAN-Tehran-Shokofeh-Kazemi');
            heading.push('989371073665+');
            heading.push('ndaftarchi@gmail.com');
        }

        if (lang === 'fr') {
            heading.push('Navigation rapide');
            heading.push(item.DescriptionFr);
            heading.push("À propos de l'Académie Nasrin");
            heading.push("Nous contacter");
            heading.push("Adresse");
            heading.push("IRAN-Téhéran-Shokofeh-Kazemi");
            heading.push('989371073665+');
            heading.push('ndaftarchi@gmail.com');
        }

        if (lang === 'ar') {
            heading.push('التنقل السريع');
            heading.push(item.DescriptionFa);
            heading.push('عن أكاديمية نسرين');
            heading.push('اتصل بنا');
            heading.push('تبوك');
            heading.push('إيران-طهران-شكوفه كاظمي');
            heading.push('989371073665+');
            heading.push('ndaftarchi@gmail.com');
        }
        return heading;
    }

    return (
        <Container fluid className="footer">
            <Row dir={lang === 'fa' || lang === 'ar' ? 'rtl' : 'ltr'}>
                {/* <Col sm="12" md="3" className="text-center">
                    2020 © NasrinAcademy.com
                </Col>
                <Col sm="12" md="3" className="text-center">
                    Powered by <a href="https://www.linkedin.com/in/babak-khajavi-157556172">Babak Khajavi</a>
                </Col>
                <Col sm="6" md="3" className="text-center">
                    <a referrerPolicy="origin" target="_blank" href="https://trustseal.enamad.ir/?id=216676&amp;Code=1Q1yPESeKiclbrOgR1dL"><img referrerPolicy="origin" src="https://Trustseal.eNamad.ir/logo.aspx?id=216676&amp;Code=1Q1yPESeKiclbrOgR1dL" alt="" className="cursor-pointer" id="1Q1yPESeKiclbrOgR1dL" /></a>
                </Col>
                <Col sm="6" md="3" className='text-center'>
                    <img src='https://www.zarinpal.com/lab/wp-content/uploads/sites/2/2016/05/icon-128x128.png' style={{ borderRadius: '25px', width: '80px' }} />
                </Col>
                <Col sm="6" md="3" className="text-center">
                    <img id='nbqergvjjzpefukzfukzjxlz' className='cursor-pointer' onClick={newWindow} alt='logo-samandehi' src='https://logo.samandehi.ir/logo.aspx?id=237661&p=odrfqftiyndtwlbqwlbqnbpd' />
                </Col> */}
                <Col xs={12} sm={12} md={3} dir={lang === 'fa' || lang === 'ar' ? 'rtl' : 'ltr'}>
                    <ul style={{ display: "flex", flexDirection: "column", flexWrap: "nowrap", justifyContent: "center", alignItems: "baseline", alignContent: "stretch" }}>
                        <h4 className="text-white mb-4" style={{ fontWeight: 'bold' }}>{getTitle(lang, '')[0]}</h4>
                        {lang === 'en'
                            ? menu_Items.map(item =>
                                renderitem(item)
                            )
                            :
                            
                            lang === 'fr'
                                ?
                                menu_Items_Fr.map(item =>
                                    renderitem(item)
                                )
                                :
                                lang === 'fa'
                                    ?
                                    menu_Items_Fa.map(item =>
                                        renderitem(item)
                                    )
                                    :
                                    menu_Items_Ar.map(item =>
                                        renderitem(item)
                                    )}
                    </ul>
                </Col>
                {aboutList.map((item, index) =>
                    <Col xs={12} sm={12} md={3} key={index} dir={lang === 'fa' || lang === 'ar' ? 'rtl' : 'ltr'}>
                        <h4 className="text-white mb-4" style={{ fontWeight: 'bold', textAlign: lang === 'fa' || lang === 'ar' ? 'right' : 'left' }}>{getTitle(lang, '')[2]}</h4>
                        <p className='text-white'>{getTitle(lang, item)[1]}</p>
                    </Col>
                )}

                <Col xs={12} sm={12} md={3}>
                    <h4 className="text-white mb-4 text-center" style={{ fontWeight: 'bold', textAlign: lang === 'fa' || lang === 'ar' ? 'right' : 'left' }}>{getTitle(lang, '')[3]}</h4>
                    <FormGroup style={{ textAlign: lang === 'fa' || lang === 'ar' ? 'right' : 'left' }} className='text-center'>
                        <i className="bi bi-signpost" style={{ fontSize: '1.5rem' }}></i>&nbsp;&nbsp;<span>{getTitle(lang, '')[5]}</span>
                    </FormGroup>
                    <FormGroup style={{ textAlign: lang === 'fa' || lang === 'ar' ? 'right' : 'left' }} className='text-center'>
                        <i className="bi bi-telephone" style={{ fontSize: '1.5rem' }}></i>&nbsp;&nbsp;<span>{getTitle(lang, '')[6]}</span>
                    </FormGroup>
                    <FormGroup style={{ textAlign: lang === 'fa' || lang === 'ar' ? 'right' : 'left' }} className='text-center'>
                        <i className="bi bi-envelope" style={{ fontSize: '1.5rem' }}></i>&nbsp;&nbsp;<span>{getTitle(lang, '')[7]}</span>
                    </FormGroup>
                    <FormGroup style={{ textAlign: lang === 'fa' || lang === 'ar' ? 'right' : 'left' }} className='text-center' >
                        <a href={"https://instagram.com/nasrin.academy"}><i className="bi bi-instagram text-white mr-3" style={{ fontSize: '2rem' }}></i></a>
                        <a href={"https://t.me/french_professor"}><i className="bi bi-telegram mr-3 text-white" style={{ fontSize: '2rem' }}></i></a>
                        <a href={"https://wa.me/+989371073665"}><i className="bi bi-whatsapp mr-3 text-white" style={{ fontSize: '2rem' }}></i></a>
                        <a href={"https://youtube.com/nasrin.academy"}><i className="bi bi-youtube mr-3 text-white" style={{ fontSize: '2rem' }}></i></a>
                    </FormGroup>
                </Col>

                <Col xs={12} sm={12} md={3} className='text-center'>
                    <FormGroup>
                        <a href='https://www.zarinpal.com/trustPage/shop.nasrinacademy.com' target='blank'><img src='https://www.zarinpal.com/lab/wp-content/uploads/sites/2/2016/05/icon-128x128.png' style={{ borderRadius: '25px', width: '80px', height: '80px' }} /></a>
                    </FormGroup>
                    <FormGroup>
                        <img id='nbqergvjjzpefukzfukzjxlz' className='cursor-pointer' alt='logo-samandehi' src='https://logo.samandehi.ir/logo.aspx?id=237661&p=odrfqftiyndtwlbqwlbqnbpd' />
                    </FormGroup>
                    <FormGroup>
                        <Link to='/showing' replace className='text-white' target='blank'>
                            <img height="100" width="100" src='main-images/logo-anjooman-senfi-400x343 copy.png' />
                        </Link>
                    </FormGroup>
                </Col>
            </Row>
        </Container>
    );
};
export default Footer;