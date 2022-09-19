import React from 'react';
import { Link, useLocation } from "react-router-dom";

const Sitemap = (props) => {
    let location = useLocation();
    const lang = localStorage.getItem('lang');
    const getItems = (lang) => {
        const path = location.pathname.split('/').pop();
        let items = []
        if (path === "") {
            if (lang === 'en') { items.push("Home"); items.push("") }
            else if (lang === 'fr') { items.push("Accueil"); items.push("") }
            else if (lang === 'fa') { items.push("خانه"); items.push("") }
            else { items.push('مسکن'); items.push("") }
        }
        else if (path === "about") {
            if (lang === 'en') { items.push("Home"); items.push("About") }
            else if (lang === 'fr') { items.push("Accueil"); items.push("À Propos") }
            else if (lang === 'fa') { items.push("خانه"); items.push("درباره ما") }
            else { items.push('مسکن'); items.push("معلومات عنا") }
        }
        else if (path === "contact") {
            if (lang === 'en') { items.push("Home"); items.push("Contact") }
            else if (lang === 'fr') { items.push("Accueil"); items.push("Contact") }
            else if (lang === 'fa') { items.push("خانه"); items.push("تماس با ما") }
            else { items.push('مسکن'); items.push("اتصال") }
        }
        else if (path === "course") {
            if (lang === 'en') { items.push("Home"); items.push("Courses") }
            else if (lang === 'fr') { items.push("Accueil"); items.push("Cours") }
            else if (lang === 'fa') { items.push("خانه"); items.push("دوره ها") }
            else { items.push('مسکن'); items.push("الدورات") }
        }
        else if (path === "teacher-overview") {
            if (lang === 'en') { items.push("Home"); items.push("Teachers") }
            else if (lang === 'fr') { items.push("Accueil"); items.push("Enseignants") }
            else if (lang === 'fa') { items.push("خانه"); items.push("معرفی اساتید") }
            else { items.push('مسکن'); items.push("معلمون") }
        }
        else if (path === "recruitment") {
            if (lang === 'en') { items.push("Home"); items.push("Teacher Recruitment") }
            else if (lang === 'fr') { items.push("Accueil"); items.push("Recrutement des enseignants") }
            else if (lang === 'fa') { items.push("خانه"); items.push("استخدام مدرس") }
            else { items.push('مسکن'); items.push("تسجیل المعلم") }
        }
        else if (path === "register") {
            if (lang === 'en') { items.push("Home"); items.push("Register") }
            else if (lang === 'fr') { items.push("Accueil"); items.push("S'inscrire") }
            else if (lang === 'fa') { items.push("خانه"); items.push("ثبت نام") }
            else { items.push('مسکن'); items.push("یسجل"); }
        }
        else if (path === "media") {
            if (lang === 'en') { items.push("Home"); items.push("Video Archives") }
            else if (lang === 'fr') { items.push("Accueil"); items.push("Archives Vidéo") }
            else if (lang === 'fa') { items.push("خانه"); items.push("آرشیو ویدیوها") }
            else { items.push('مسکن'); items.push("أرشيف الفيديو") }
        }
        else if (path === "flashcards") {
            if (lang === 'en') { items.push("Home"); items.push("ّFlash Cards") }
            else if (lang === 'fr') { items.push("Accueil"); items.push("Cartes Flash") }
            else if (lang === 'fa') { items.push("خانه"); items.push("فلش کارت ها") }
            else { items.push('مسکن'); items.push("بطاقات فلاش") }
        }
        else if (location.pathname.startsWith("/article", 0)) {
            if (lang === 'en') { items.push("Home"); items.push(`Article number ${path}`) }
            else if (lang === 'fr') { items.push("Accueil"); items.push(`Article number ${path}`) }
            else if (lang === 'fa') { items.push("خانه"); items.push(`Article number ${path}`) }
            else { items.push('مسکن'); items.push(`Article number ${path}`) }
        }
        else if (location.pathname.startsWith("/avai", 0)) {
            if (lang === 'en') { items.push("Home"); items.push(`Available Courses`) }
            else if (lang === 'fr') { items.push("Accueil"); items.push(`Available Courses`) }
            else if (lang === 'fa') { items.push("خانه"); items.push(`دوره های موجود`) }
            else { items.push('مسکن'); items.push("الدورات المتاحة") }
        }
        else if (path === "tranlator-overview") {
            if (lang === 'en') { items.push("Home"); items.push("Translator") }
            else if (lang === 'fr') { items.push("Accueil"); items.push("Traducteurs") }
            else if (lang === 'fa') { items.push("خانه"); items.push("معرفی مترجمین") }
            else { items.push('مسکن'); items.push("التعريف بالمترجمين") }
        }
        else if (path === "certificates") {
            if (lang === 'en') { items.push("Home"); items.push("Certificates") }
            else if (lang === 'fr') { items.push("Accueil"); items.push("Certificats") }
            else if (lang === 'fa') { items.push("خانه"); items.push("گواهی نامه ها") }
            else { items.push('مسکن'); items.push("الشهادات") }
        }
        else if (path === "showing") {
            if (lang === 'en') { items.push(""); items.push("Association membership certificate") }
            else if (lang === 'fr') { items.push(""); items.push("Certificat d'adhésion à l'association") }
            else if (lang === 'fa') { items.push(""); items.push("گواهی عضویت انجمن صنفی") }
            else { items.push(''); items.push("شهادة عضوية النقابة") }
        }
        else {
            // if (lang === 'en') { items.push("Home"); items.push(article.Title) }
            // else if (lang === 'fr') { items.push("Accueil"); items.push(article.TitleFr) }
            // else { items.push("خانه"); items.push(article.TitleFa) }
        }
        return items;

    }
    return (
        <div dir={lang === 'fa' || lang === 'ar' ? 'rtl' : 'ltr'} className={lang === 'fa' || lang === 'ar' ? 'text-right p-0 m-0 pt-2' : "p-0 m-0 pt-2"}>
            <Link to="/" className="font-weight-bold d-inline h6 m-2">{getItems(lang)[0]}</Link>
            {location.pathname !== "/" && <div className="d-inline"><span className=""> / </span><strong className="text-info"> {getItems(lang)[1]}</strong></div>}
        </div>
    );
};

export default Sitemap;