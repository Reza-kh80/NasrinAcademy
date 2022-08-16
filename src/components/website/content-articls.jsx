import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';
import { Helmet } from "react-helmet";
class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mediaEndMoint: process.env.REACT_APP_MediaEndPoint,
            apiEndPoint: process.env.REACT_APP_APIEndPoint,
            articleObject: {
                ArticleId: "",
                Title: "",
                TitleFr: "",
                TitleFa: "",
                Level: "",
                LevelFr: "",
                LevelFa: "",
                Body1: "",
                Body1Fr: "",
                Body1Fa: "",
                Body2: "",
                Body2Fr: "",
                Body2Fa: "",
                FileName: "",
                TeacherName: ''
            },
        }
    }
    setArticleObject = (list) => {
        let articleObject = { ...this.state.articleObject }
        articleObject.ArticleId = list.ArticleId;
        articleObject.Title = list.Title;
        articleObject.TitleFr = list.TitleFr;
        articleObject.TitleFa = list.TitleFa;
        articleObject.Level = list.Level;
        articleObject.LevelFr = list.LevelFr;
        articleObject.LevelFa = list.LevelFa;
        articleObject.Body1 = list.Body1;
        articleObject.Body1Fr = list.Body1Fr;
        articleObject.Body1Fa = list.Body1Fa;
        articleObject.Body2 = list.Body2;
        articleObject.Body2Fr = list.Body2Fr;
        articleObject.Body2Fa = list.Body2Fa;
        articleObject.FileName = list.FileName;
        articleObject.TeacherName = list.TeacherName;
        this.setState({ articleObject });
    }
    getArticle = async (id) => {
        await axios.get(this.state.apiEndPoint + `Article/Display?articleId=${id}`)
            .then(response => {

                this.setArticleObject(response.data)
            }
            );
    }
    componentDidMount() {
        let id = this.props.match.params.id;
        if (id !== null || id !== "" || id !== undefined) {
            this.getArticle(id);
        }
        else {
            window.location = "#/";
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.getArticle(this.props.match.params.id)
        }
    }
    getMedia = (fileName, title) => {
        let url = fileName !== undefined ? this.state.mediaEndMoint + 'Videos/' + fileName : 'main-images/article-poster.jpg';
        return <video controls preload="none" className="img-thumbnail" src={url} poster="main-images/article-poster.jpg" width="100%" height="100%" type="video/mp4" />
    }
    getHeading = (lang, item) => {
        let heading = []
        if (lang === 'en') {
            heading.push(item.Title)
            heading.push(item.Level)
            heading.push(item.Body1)
            heading.push(item.Body2)
            heading.push("Level")
        }
        else if (lang === 'fr') {
            heading.push(item.TitleFr)
            heading.push(item.LevelFr)
            heading.push(item.Body1Fr)
            heading.push(item.Body2Fr)
            heading.push("Niveau")
        }
        else {
            heading.push(item.TitleFa)
            heading.push(item.LevelFa)
            heading.push(item.Body1Fa)
            heading.push(item.Body2Fa)
            heading.push("سطح")
        }
        return heading
    }
    render() {
        const { articleObject } = this.state;
        const lang = localStorage.getItem('lang');
        return (<div className="m-0 p-0">
            <Helmet>
                <title>{articleObject.Title}</title>
                <meta name="description" content={articleObject.Body1.slice(0, 120)} />
                <meta name="keywords" cpntent="private, teacher, online, french, class, in 8 month, tefaq, tcf, B2, C1 , french exams" />
            </Helmet>
            <Container fluid dir={lang === 'fa' ? 'rtl' : 'ltr'}>
                <Row className="mb-3">
                    <Col xs="12" md="9" className={lang === "fa" ? "text-right m-0 p-0" : "m-0 p-0"}>
                        <strong className={lang === "fa" ? "text-right text-primary h5" : "text-primary h5"}>{this.getHeading(lang, articleObject)[0]}</strong>
                    </Col>
                    <Col xs="12" md="3" className={lang === "fa" ? "text-right m-0 p-0" : "m-0 p-0"}>
                        <strong className={lang === "fa" ? "text-right text-primary h5" : "text-primary h5"}>{this.getHeading(lang, articleObject)[4]}:</strong>
                        <strong className={lang === "fa" ? "text-right text-info h5" : "text-info h5"}> {this.getHeading(lang, articleObject)[1]}</strong>
                    </Col>
                </Row>
                <Row >
                    <Col xs="12" lg="5" className="text-center p-0 m-0">{this.getMedia(articleObject.FileName, this.getHeading(lang, articleObject)[0])}</Col>
                    <Col xs="12" lg="7" className={lang === "fa" ? "text-right m-0 p-0" : "m-0 p-0"}><p>{this.getHeading(lang, articleObject)[2]}</p></Col>
                </Row>
                <Row className="mt-3">
                    <Col xs="12" md="12" className={lang === "fa" ? "text-right m-0 p-0" : "m-0 p-0"}><p>{this.getHeading(lang, articleObject)[3]}</p></Col>
                </Row>
            </Container>
        </div>);
    }
}
export default Article;

