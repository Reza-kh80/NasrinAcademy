import React, { Component, Suspense } from 'react';
import { Container, Row, Col, Spinner } from 'reactstrap';
import axios from 'axios';
import UserContext from '../../utils/user-context';
const TableContent = React.lazy(() => import('../general/table'));
const MyDropdown = React.lazy(() => import('../general/dropdown'));
class StudentLesson extends Component {
    static contextType = UserContext;
    constructor(props) {
        super(props);
        this.state = {
            apiEndPoint: process.env.REACT_APP_APIEndPoint,
            pageSize: 20,
            dataList: [],
            dataTitles: ["ID", 'Teacher', 'Title', 'For Week', 'Modifier', 'Date', 'Not Active', 'Display Lesson'],
            columnList: ["id", 'TeacherName', 'Title', 'LevelName', 'Modifier', 'ModificationDate', 'IsDeleted'],
            filteredItem: "Title",
            showArticleRegister: false,
            title: "",
            levelList: [],
            levelId: "",
            teacherId: "",
            show: false,
            dropId: "",
            id: ""
        }
    }
    getTeacher = async (id) => {
        const url = this.context.status
            ? this.state.apiEndPoint + `Student/GetPublicTeacherId?studentId=${id}`
            : this.state.apiEndPoint + `Student/GetPrivateTeacherId?studentId=${id}`;
        await axios.get(url).then(response => {
            this.setState({ teacherId: response.data });
        });
    }
    getLevel = async (id) => {
        const url = this.context.status
            ? this.state.apiEndPoint + `TermArticle/DisplayAllPublic?studentId=${id}`
            : this.state.apiEndPoint + `TermArticle/DisplayAllPrivate?studentId=${id}`;
        const levelList = [];
        await axios.get(url).then(response => {
            response.data.map(m =>
                levelList.push({
                    value: m.LevelId,
                    label: m.LevelName,
                }),
            );
            this.setState({ levelList });
        });
    }
    getArticle = async (levelId, teacherId) => {
        const dataList = [];
        if (levelId !== "" && teacherId !== "") {
            await axios.get(this.state.apiEndPoint + `Article/DisplayAllByLevel?levelId=${levelId}&teacherId=${teacherId}`).then(response => {
                response.data.map((m, i) =>
                    dataList.push({
                        id: i + 1,
                        TeacherName: m.TeacherName,
                        Title: m.Title,
                        Level: m.Level,
                        LevelName: m.LevelName,
                        Modifier: m.Modifier,
                        ModificationDate: m.ModificationDate,
                        IsDeleted: m.IsDeleted,
                        ArticleId: m.ArticleId,
                    }),
                );
                this.setState({ dataList });
            });
        }
    }
    componentDidMount() {
        this.getTeacher(this.context.user.UserId);
        this.getLevel(this.context.user.UserId);
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.show !== prevState.show) {
            this.forceUpdate()
        }
    }
    onEditArticle = async (list) => {
        this.setState({ id: list.ArticleId });
        this.setState({ title: list.Title });
        this.setState({ showArticleRegister: true });
        const StudentLessonForm = await import('./forms/student-lesson-form');
        this.setState({ StudentLessonForm: StudentLessonForm.default });
    }
    handleSelect = (e) => {
        let levelId = e.target.value
        if (levelId !== "") {
            this.getArticle(levelId, this.state.teacherId);
            this.setState({ show: true })
        }
        else {
            this.setState({ show: false })
        }
        this.setState({ dropId: levelId })
    }
    handleHide = () => {
        this.setState({ showArticleRegister: false });
        this.setState({ levelId: "" });
        this.setState({ StudentLessonForm: null });
    }
    render() {
        const { dataList, dataTitles, columnList, pageSize, filteredItem,
            title, showArticleRegister, levelList, id, show, dropId, StudentLessonForm } = this.state;
        return (<div>
            <Container fluid className="table">
                <Row className="mb-2">
                    <Col xs="12" className="text-left text-dark p-0" >
                        <h3 className="text-primary text-center font-weight-bold">Term Articles</h3>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col className="text-left m-0 p-0">
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col xs="12" md="6" lg="4" className="text-left m-0 p-1">
                        <MyDropdown
                            label="Select a time to diplay related lessons"
                            display="Select Week ..."
                            dataList={levelList}
                            handleChange={this.handleSelect}
                            name=""
                            selectedValue={dropId}
                            htmlFor="term"
                            width="w-25"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" className="text-left m-0 p-1">
                        {show === true &&
                            <div>
                                <Suspense fallback={<Spinner color="success" />}>
                                    <TableContent filter={filteredItem} dataList={dataList} dataTitles={dataTitles} columnList={columnList} onEdithandler={this.onEditArticle} pageSize={pageSize} />
                                </Suspense>
                            </div>
                        }
                    </Col>
                </Row>
            </Container>
            {StudentLessonForm &&
                <StudentLessonForm id={id} title={title} show={showArticleRegister} onHide={this.handleHide} />
            }
        </div>);
    }
}
export default StudentLesson;
