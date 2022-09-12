import React, { useState, useEffect, Suspense } from 'react';
import axios from 'axios';
import { Spinner } from 'reactstrap';
const TableContent = React.lazy(() => import('../general/table'));
const FlashCard = React.lazy(() => import('./flashcard'));
const FlashCardList = () => {
    const apiEndPoint = process.env.REACT_APP_APIEndPoint;
    const lang = localStorage.getItem('lang');
    const pageSize = 10;
    const dataTitles = lang === 'en'
        ? ["ID", 'Title', 'Teacher', 'Category', 'Display']
        : lang === 'fa'
            ? ["ردیف", 'عنوان', 'استاد', 'دسته بندی', 'نمایش']
            : lang === 'fr'
                ? ["ID", 'Titre', 'Enseignant', 'Catégorie', 'Affichage']
                : ["المعرف", "العنوان", "المدرس", "الفئة", "العرض"];
    const columnList = ["FlashCardId", 'Title', lang === 'en' ? 'TeacherName' : 'TeacherNameFa', 'FlashCardCategoryName'];
    const filteredItem = "Title";
    const [flashCardList, setFlashCardList] = useState([]);
    const [flashCard, setFlashCard] = useState({});
    const [show, setShow] = useState(false);
    const handleShow = (list) => {
        setFlashCard(list);
        setShow(true);
    }
    const handleHide = () => {
        setShow(false);
    }
    useEffect(() => {
        let mounted = true;
        const fetchData = async () => {
            const result = await axios.get(apiEndPoint + "FlashCard/DisplayAll");
            if (mounted) {
                setFlashCardList(result.data);
            }
        };
        fetchData();
        return () => {
            mounted = false;
        };
    }, [apiEndPoint]);
    return (<div>
        <Suspense fallback={<Spinner color="success" />}>
            <TableContent filter={filteredItem} placeholder={lang === 'en' ? "find title" : "جستجوی عنوان"} dataList={flashCardList} dataTitles={dataTitles} columnList={columnList} onEdithandler={handleShow} pageSize={pageSize} />
            <FlashCard object={flashCard} show={show} onHide={handleHide} />
        </Suspense>
    </div>);
}

export default FlashCardList;