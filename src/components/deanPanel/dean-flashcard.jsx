
import React, { Component, Suspense } from 'react';
import { Container, Row, Col, Spinner } from 'reactstrap';
import axios from 'axios';
import UserContext from '../../utils/user-context';
const TableContent = React.lazy(() => import('../general/table'));
const DeanFlashCardForm = React.lazy(() => import('./forms/dean-flashcard-form'));
class DeanFlashCard extends Component {
    static contextType = UserContext;
    constructor(props) {
        super(props);
        this.state = {
            apiEndPoint: process.env.REACT_APP_APIEndPoint,
            pageSize: 20,
            dataList: [],
            dataTitles: ["ID", 'Teacher', 'Title', 'Category', 'For Week', 'Is Free', 'Modifier', 'Date', 'Not Active', 'Edit'],
            columnList: ["id", 'TeacherName', 'Title', 'FlashCardCategoryName', 'LevelName', 'IsFree', 'Modifier', 'ModificationDate', 'IsDeleted'],
            filteredItem: "Title",
            showFlashCardRegister: false,
            id: "",
            title: "",
            teacherId: ""
        }
    }
    getFlashCard = async () => {
        const dataList = [];
        await axios.get(this.state.apiEndPoint + `FlashCard/GetAll`).then(response => {
            let md = response.data
            md.map((m, i) =>
                dataList.push({
                    id: i + 1,
                    TeacherName: m.TeacherName,
                    Title: m.Title,
                    FlashCardCategoryName: m.FlashCardCategoryName,
                    LevelName: m.LevelName,
                    IsFree: m.IsFree,
                    Modifier: m.Modifier,
                    ModificationDate: m.ModificationDate,
                    IsDeleted: m.IsDeleted,
                    FlashCardId: m.FlashCardId,
                }),
            );
            this.setState({ dataList });
        });
    }
    componentDidMount() {
        this.getFlashCard();
    }
    componentDidUpdate(prevProps, prevState) {

    }
    onEditFlashCard = (list) => {
        this.setState({ id: list.FlashCardId })
        this.setState({ title: `Edit ${list.Title}` })
        this.setState({ showFlashCardRegister: true })
    }
    handleHide = () => {
        this.setState({ showFlashCardRegister: false })
        this.setState({ id: "" })
        this.getFlashCard();
    }
    render() {
        const { dataList, dataTitles, columnList, pageSize, filteredItem,
            id, title, showFlashCardRegister } = this.state;
        return (<div>
            <Container fluid className="table">
                <Row className="mb-2">
                    <Col xs="12" className="text-left text-dark p-0" >
                        <h3 className="text-primary text-center font-weight-bold">FlashCards</h3>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col xs="12" className="text-left m-0 p-1">
                        <Suspense fallback={<Spinner color="success" />}>
                            <TableContent filter={filteredItem} dataList={dataList} dataTitles={dataTitles} columnList={columnList} onEdithandler={this.onEditFlashCard} pageSize={pageSize} />
                        </Suspense>
                    </Col>
                </Row>
            </Container>
            <Suspense fallback={<Spinner color="success" />}>
                <DeanFlashCardForm id={id} title={title} show={showFlashCardRegister} onHide={this.handleHide} />
            </Suspense>
        </div>);
    }
}
export default DeanFlashCard;
