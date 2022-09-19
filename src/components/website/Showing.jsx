import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Card from 'react-bootstrap/Card';

function Showing() {
    return (
        <div>
            <Container>
                <Row>
                    <Col xs="12" md={12} style={{ display: "flex", flexDirection: "row", flexWrap: "nowrap", justifyContent: "center", alignItems: "center", alignContent: "center" }}>
                        <Card style={{ width: '40rem' }}>
                            <Card.Img src="main-images/Certificates.jpeg" />
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Showing;