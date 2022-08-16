import React from 'react';
import { Container, Row, Col } from 'reactstrap';
const Footer = (props) => {
    const newWindow = () => {
        window.open("https://logo.samandehi.ir/Verify.aspx?id=237661&p=uiwkxlaojyoegvkagvkarfth", "Popup", "toolbar=no, scrollbars=no, location=no, statusbar=no, menubar=no, resizable=0, width=450, height=630, top=30")
    }
    return (
        <Container fluid className="footer">
            <Row >
                <Col sm="12" md="3" className="text-center">
                    2020 © NasrinAcademy.com
                </Col>
                <Col sm="12" md="3" className="text-center">
                    Powered by <a href="https://www.linkedin.com/in/babak-khajavi-157556172">Babak Khajavi</a>
                </Col>
                <Col sm="6" md="3" className="text-center">
                    <a referrerPolicy="origin" target="_blank" href="https://trustseal.enamad.ir/?id=216676&amp;Code=1Q1yPESeKiclbrOgR1dL"><img referrerPolicy="origin" src="https://Trustseal.eNamad.ir/logo.aspx?id=216676&amp;Code=1Q1yPESeKiclbrOgR1dL" alt="" className="cursor-pointer" id="1Q1yPESeKiclbrOgR1dL" /></a>
                </Col>
                <Col sm="6" md="3" className="text-center">
                    <img id='nbqergvjjzpefukzfukzjxlz' className='cursor-pointer' onClick={newWindow} alt='logo-samandehi' src='https://logo.samandehi.ir/logo.aspx?id=237661&p=odrfqftiyndtwlbqwlbqnbpd' />
                </Col>
            </Row>
        </Container>
    );
};
export default Footer;