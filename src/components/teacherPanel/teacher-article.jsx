
import React, { Component, Suspense } from 'react';
import { Container, Row, Col, Button, Spinner } from 'reactstrap';
import axios from 'axios';
import UserContext from '../../utils/user-context';
const TableContent = React.lazy(() => import('../general/table'));
class TeacherArticle extends Component {
    static contextType = UserContext;
    constructor(props) {
        super(props);
        this.state = {
            apiEndPoint: process.env.REACT_APP_APIEndPoint,
            pageSize: 20,
            dataList: [],
            dataTitles: ["ID", 'Teacher', 'Title', 'Menu Header', 'For Week', 'Is Free', 'Modifier', 'Date', 'Not Active', 'Register'],
            columnList: ["id", 'TeacherName', 'Title', 'MenuName', 'LevelName', 'IsFree', 'Modifier', 'ModificationDate', 'IsDeleted'],
            filteredItem: "Title",
            showArticleRegister: false,
            id: "",
            title: "",
            teacherId: "",
            TeacherArticleForm: null
        }
    }
    getArticle = async () => {
        const dataList = [];
        await axios.get(this.state.apiEndPoint + `Article/GetAllByTeacher?teacherId=${this.context.UserId}`).then(response => {
            response.data.map((m, i) =>
                dataList.push({
                    id: i + 1,
                    TeacherName: m.TeacherName,
                    Title: m.Title,
                    Level: m.Level,
                    MenuName: m.MenuName,
                    LevelName: m.LevelName,
                    IsFree: m.IsFree,
                    Modifier: m.Modifier,
                    ModificationDate: m.ModificationDate,
                    IsDeleted: m.IsDeleted,
                    ArticleId: m.ArticleId,
                }),
            );
            this.setState({ dataList });
        });
    }
    componentDidMount() {
        this.getArticle();
    }
    componentDidUpdate(prevProps, prevState) {

    }
    onNewArticle = async () => {
        this.setState({ id: "" });
        this.setState({ title: 'Register New Teacher-Course' });
        this.setState({ showArticleRegister: true });
        const TeacherArticleForm = await import('./forms/teacher-article-forms');
        this.setState({ TeacherArticleForm: TeacherArticleForm.default });
    }
    onEditArticle = async (list) => {
        this.setState({ id: list.ArticleId });
        this.setState({ title: 'Edit Teacher Course' });
        this.setState({ showArticleRegister: true });
        const TeacherArticleForm = await import('./forms/teacher-article-forms');
        this.setState({ TeacherArticleForm: TeacherArticleForm.default });
    }
    handleHide = () => {
        this.setState({ showArticleRegister: false })
        this.setState({ id: "" })
        this.getArticle();
        this.setState({ TeacherArticleForm: null });
    }
    render() {
        const { dataList, dataTitles, columnList, pageSize, filteredItem,
            id, title, showArticleRegister, TeacherArticleForm } = this.state;
        return (<div>
            <Container fluid className="table">
                <Row className="mb-2">
                    <Col xs="12" className="text-left text-dark p-0" >
                        <h3 className="text-primary text-center font-weight-bold">Articles</h3>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col className="text-left m-0 p-0">
                        <Button className="btn btn-sm" onClick={this.onNewArticle} >Register New Article</Button>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col xs="12" className="text-left m-0 p-1">
                        <Suspense fallback={<Spinner color="success" />}>
                            <TableContent filter={filteredItem} dataList={dataList} dataTitles={dataTitles} columnList={columnList} onEdithandler={this.onEditArticle} pageSize={pageSize} />
                        </Suspense>
                    </Col>
                </Row>
            </Container>
            {TeacherArticleForm &&
                <TeacherArticleForm id={id} title={title} show={showArticleRegister} onHide={this.handleHide} />
            }
        </div>);
    }
}
export default TeacherArticle;
