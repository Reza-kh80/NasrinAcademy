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
            else { items.push("خانه"); items.push("") }
        }
        else if (path === "about") {
            if (lang === 'en') { items.push("Home"); items.push("About") }
            else if (lang === 'fr') { items.push("Accueil"); items.push("À Propos") }
            else { items.push("خانه"); items.push("درباره ما") }
        }
        else if (path === "contact") {
            if (lang === 'en') { items.push("Home"); items.push("Contact") }
            else if (lang === 'fr') { items.push("Accueil"); items.push("Contact") }
            else { items.push("خانه"); items.push("تماس با ما") }
        }
        else if (path === "course") {
            if (lang === 'en') { items.push("Home"); items.push("Courses") }
            else if (lang === 'fr') { items.push("Accueil"); items.push("Cours") }
            else { items.push("خانه"); items.push("دوره ها") }
        }
        else if (path === "teacher-overview") {
            if (lang === 'en') { items.push("Home"); items.push("Teachers") }
            else if (lang === 'fr') { items.push("Accueil"); items.push("Enseignants") }
            else { items.push("خانه"); items.push("معرفی اساتید") }
        }
        else if (path === "recruitment") {
            if (lang === 'en') { items.push("Home"); items.push("Teacher Recruitment") }
            else if (lang === 'fr') { items.push("Accueil"); items.push("Recrutement des enseignants") }
            else { items.push("خانه"); items.push("استخدام مدرس") }
        }
        else if (path === "register") {
            if (lang === 'en') { items.push("Home"); items.push("Register") }
            else if (lang === 'fr') { items.push("Accueil"); items.push("S'inscrire") }
            else { items.push("خانه"); items.push("ثبت نام") }
        }
        else if (path === "media") {
            if (lang === 'en') { items.push("Home"); items.push("Video Archives") }
            else if (lang === 'fr') { items.push("Accueil"); items.push("Archives Vidéo") }
            else { items.push("خانه"); items.push("آرشیو ویدیوها") }
        }
        else if (path === "flashcards") {
            if (lang === 'en') { items.push("Home"); items.push("ّFlash Cards") }
            else if (lang === 'fr') { items.push("Accueil"); items.push("Cartes Flash") }
            else { items.push("خانه"); items.push("فلش کارت ها") }
        }
        else if (location.pathname.startsWith("/article", 0)) {
            if (lang === 'en') { items.push("Home"); items.push(`Article number ${path}`) }
            else if (lang === 'fr') { items.push("Accueil"); items.push(`Article number ${path}`) }
            else { items.push("خانه"); items.push(`Article number ${path}`) }
        }
        else if (location.pathname.startsWith("/avai", 0)) {
            if (lang === 'en') { items.push("Home"); items.push(`Available Courses`) }
            else if (lang === 'fr') { items.push("Accueil"); items.push(`Available Courses`) }
            else { items.push("خانه"); items.push(`دوره های موجود`) }
        }
        else {
            // if (lang === 'en') { items.push("Home"); items.push(article.Title) }
            // else if (lang === 'fr') { items.push("Accueil"); items.push(article.TitleFr) }
            // else { items.push("خانه"); items.push(article.TitleFa) }
        }
        return items

    }
    return (
        <div dir={lang === 'fa' ? 'rtl' : 'ltr'} className={lang === 'fa' ? 'text-right p-0 m-0 pt-2' : "p-0 m-0 pt-2"}>
            <Link to="/" className="font-weight-bold d-inline h6 m-2">{getItems(lang)[0]}</Link>
            {location.pathname !== "/" && <div className="d-inline"><span className=""> / </span><strong className="text-info"> {getItems(lang)[1]}</strong></div>}
        </div>
    );
};

export default Sitemap;