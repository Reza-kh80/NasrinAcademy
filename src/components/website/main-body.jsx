import React, { Component, Suspense } from 'react';
import { Container, Row, Col, Spinner } from 'reactstrap';
import Menu from '../website/menu';
import Header from './header';
import Contents from './content';
import Footer from '../general/footer';
const Sitemap = React.lazy(() => import('./sitemap'));
class MainBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <Container fluid className="menu">
                {window.innerWidth < 768 &&
                    <Row className="align-items-center">
                        <Col sm="12" className="p-0 m-0" >
                            <img src="main-images/jumbotrun-mobile.webp" width="100%" alt="nasring daftarchi in a red and blue gradient background with Ifel tower" />
                        </Col>
                    </Row>}
                <Row className="align-items-center">
                    <Col sm="12" >
                        <Menu />
                    </Col>
                </Row>
                <Row className="d-none d-md-block">
                    <Col sm="12" className="header" >
                        <Header />
                    </Col>
                </Row>
                <Row >
                    <Col sm="12" className="sitemap">
                        <Suspense fallback={<Spinner color="success" />}>
                            <Sitemap />
                        </Suspense>
                    </Col>
                </Row>
                <Row >
                    <Col sm="12" className="content-body">
                        <Contents />
                    </Col>
                </Row>

                <Row >
                    <Col sm="12" className="footer">
                        <Footer />
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default MainBody;

