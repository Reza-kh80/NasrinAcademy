import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from "react-router-dom";
import { Container, Row, Col } from 'reactstrap';
import MainBody from './main-body';
import SideContent from './side-content';
import PopUp from './popup';
import axios from 'axios';
function Website(props) {
    const lang = localStorage.getItem('lang');
    let location = useLocation();
    let history = useHistory();
    const apiEndPoint = process.env.REACT_APP_APIEndPoint;
    const [showPopup, setShowPopup] = useState(false);
    const [photoName, setPhotoName] = useState("");
    useEffect(() => {
        let timeout = null;
        const fetch = async () => {
            const result = await axios.get(apiEndPoint + 'MainAdvertise/Get');
            if (result.data.TriggerTime > 0) {
                setPhotoName(result.data.Photo)
                timeout = setTimeout(() => {
                    setShowPopup(true);
                }, result.data.TriggerTime);
            }
        }
        fetch();
        return () => clearTimeout(timeout);
    }, [apiEndPoint]);
    const handleHide = () => {
        setShowPopup(false);
    }
    useEffect(() => {
        history.push(location.pathname);
    }, [lang, history, location.pathname]);
    return (
        <div className="p-0 m-0">
            {(lang === 'fr' || lang === 'en') ?
                <Container fluid >
                    <Row>
                        <Col md="3" xl="2" className="d-none d-md-block sidebar p-0 m-0">
                            <SideContent />
                        </Col>
                        <Col xs="12" md="9" xl="10" className="mainbody p-0 m-0">
                            <MainBody />
                        </Col>
                    </Row>
                </Container>
                :
                <Container fluid >
                    <Row>
                        <Col xs="12" md="9" xl="10" className="mainbody p-0">
                            <MainBody />
                        </Col>
                        <Col md="3" xl="2" className="d-none d-md-block sidebar">
                            <SideContent />
                        </Col>
                    </Row>
                </Container>
            }
            <PopUp photoName={photoName} show={showPopup} onHide={handleHide} />
        </div>
    );
}
export default Website;
