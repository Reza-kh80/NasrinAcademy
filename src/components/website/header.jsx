import React from 'react';
import { Jumbotron, Container, Row, Col } from 'reactstrap';

const Header = (props) => {
  return (
    <Jumbotron fluid>
      <Container fluid>
        <Row className="p-0">
          <Col className="p-0">
            <img src="main-images/jumbotrun.webp" height="100%" width="100%" alt="Header of Website including address" />
          </Col>
        </Row>
      </Container>
    </Jumbotron>
  );
};

export default Header;

// height="100%"
// width="100%"