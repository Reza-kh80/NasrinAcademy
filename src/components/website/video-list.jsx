import React, { useState, useEffect, Suspense } from 'react';
import axios from 'axios';
import { Spinner } from 'reactstrap';
const TableContent = React.lazy(() => import('../general/table'));
const Video = React.lazy(() => import('./video'));
const VideoList = () => {
    const apiEndPoint = process.env.REACT_APP_APIEndPoint;
    const lang = localStorage.getItem('lang');
    const pageSize = 10;
    const dataTitles = lang === 'en'
        ? ["ID", 'Title', 'Display']
        : ["ردیف", 'عنوان', 'نمایش'];
    const columnList = ["MediaId", 'Title'];
    const filteredItem = "Title";
    const [videoList, setVideoList] = useState([]);
    const [video, setVideo] = useState({});
    const [show, setShow] = useState(false);
    const handleShow = (list) => {
        setVideo(list);
        setShow(true);
    }
    const handleHide = (list) => {
        setShow(false);
    }
    useEffect(() => {
        let mounted = true;
        const fetchData = async () => {
            const result = await axios.get(apiEndPoint + "Media/DisplayAll")
            if (mounted) {
                setVideoList(result.data);
            }
        };
        fetchData();
        return () => {
            mounted = false;
        };
    }, [apiEndPoint]);
    return (<div>
        <Suspense fallback={<Spinner color="success" />}>
            <TableContent filter={filteredItem} placeholder={lang === 'en' ? "Search Title" : "جستجو با عنوان"} dataList={videoList} dataTitles={dataTitles} columnList={columnList} onEdithandler={handleShow} pageSize={pageSize} />
            <Video object={video} show={show} onHide={handleHide} />
        </Suspense>
    </div>);
}

export default VideoList;