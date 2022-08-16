import React, { Component, Suspense } from 'react';
import { Container, Row, Col, Spinner } from 'reactstrap';
const StudentStatusProgress = React.lazy(() => import('./student-status-progress'));
const StudentStatusNotice = React.lazy(() => import('./student-status-notice'));
const StudentProperty = React.lazy(() => import('./student-property'));
class StudentStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (<div>
            <Container fluid>
                <Row xs="12">
                    <Col xs="12" lg="4">
                        <Suspense fallback={<Spinner color="success" />}>
                            <StudentProperty />
                        </Suspense>
                    </Col>
                    <Col xs="12" lg="8" className="">
                        <Suspense fallback={<Spinner color="success" />}>
                            <StudentStatusProgress />
                        </Suspense>
                        <Suspense fallback={<Spinner color="success" />}>
                            <StudentStatusNotice />
                        </Suspense>
                        <Row>
                            <Col xs="12" lg="7" className="">
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12" className="mt-3">
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>)
    }
}


export default StudentStatus;
