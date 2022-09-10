import React, { Component, Suspense } from "react";
import { Container, Row, Col, Spinner } from "reactstrap";
import axios from "axios";
import { Helmet } from "react-helmet";

const Courses = React.lazy(() => import("./courses"));
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homeObject: [],
      apiEndPoint: process.env.REACT_APP_APIEndPoint,
      mediaEndMoint: process.env.REACT_APP_MediaEndPoint,
      description: "",
    };
  }
  getHome = async () => {
    await axios
      .get(this.state.apiEndPoint + "Home/Display")
      .then((response) => {
        this.setState({ homeObject: response.data });
        this.setState({ description: response.data.ObjectiveDescription });
      })
      .catch((err) => {
        console.log("ERROR: " + err);
      });
  };
  componentDidMount() {
    this.getHome();
  }
  getHeading = (lang, item) => {
    let heading = [];
    if (lang === "en") {
      heading.push(item.LatestTitle);
      heading.push(item.LatestDescription);
      heading.push(item.WhoTitle);
      heading.push(item.StudentPanelTitle);
      heading.push(item.TeacherPanelTitle);
      heading.push(item.ObjectiveTitle);
      heading.push(item.ObjectiveDescription);
    } else if (lang === "fr") {
      heading.push(item.LatestTitleFr);
      heading.push(item.LatestDescriptionFr);
      heading.push(item.WhoTitleFr);
      heading.push(item.StudentPanelTitleFr);
      heading.push(item.TeacherPanelTitleFr);
      heading.push(item.ObjectiveTitleFr);
      heading.push(item.ObjectiveDescriptionFr);
    } else {
      heading.push(item.LatestTitleFa);
      heading.push(item.LatestDescriptionFa);
      heading.push(item.WhoTitleFa);
      heading.push(item.StudentPanelTitleFa);
      heading.push(item.TeacherPanelTitleFa);
      heading.push(item.ObjectiveTitleFa);
      heading.push(item.ObjectiveDescriptionFa);
    }
    return heading;
  };
  render() {
    const { homeObject, mediaEndMoint, description } = this.state;
    const lang = localStorage.getItem("lang");
    return (
      <div className="p-0 m-0">
        <Helmet>
          <title>Nasrin Academy</title>
          <meta name="description" content={description?.slice(0, 120)} />
          <meta
            name="keywords"
            cpntent="private, teacher, online, french, class, in 8 month, tefaq, tcf, B2, C1 , french exams"
          />
        </Helmet>
        <Container fluid dir={lang === "fa" ? "rtl" : "ltr"}>
          {/* <Row className="mt-2">
            <Col
              xs="12"
              md="8"
              className={lang === "fa" ? "text-right m-0 p-1" : "m-0 p-1"}
            >
              <strong
                className={
                  lang === "fa"
                    ? "text-right text-primary h5 p-2"
                    : "text-primary h5 p-2"
                }
              >
                {this.getHeading(lang, homeObject)[0]}
              </strong>
              <video
                controls
                preload="none"
                className="img-thumbnail mt-2"
                src={mediaEndMoint + "Home/" + homeObject.LatestVideo}
                poster="main-images/article-poster.jpg"
                width="100%"
                height="100%"
                type="video/mp4"
              />
              <p className="text-justify">
                {this.getHeading(lang, homeObject)[1]}
              </p>
              <br />
              <strong
                className={
                  lang === "fa"
                    ? "text-right text-primary h5 p-3"
                    : "text-primary h5 p-3"
                }
              >
                {this.getHeading(lang, homeObject)[5]}
              </strong>
              <p>{this.getHeading(lang, homeObject)[6]}</p>
              <br />
            </Col>
            <Col
              xs="12"
              md="4"
              className={
                lang === "fa"
                  ? "text-right m-0 p-1 overflow-auto"
                  : "m-0 p-1 flex-row flex-nowrap overflow-auto"
              }
            >
              <strong
                className={
                  lang === "fa"
                    ? "text-right text-primary h5"
                    : "text-primary h5"
                }
              >
                {this.getHeading(lang, homeObject)[2]}
              </strong>
              <video
                controls
                preload="none"
                className="img-thumbnail mt-2"
                src={mediaEndMoint + "Home/" + homeObject.WhoVideo}
                poster="main-images/video-poster.jpg"
                width="100%"
                height="100%"
                type="video/mp4"
              />
              <strong
                className={
                  lang === "fa"
                    ? "text-right text-primary h5"
                    : "text-primary h5"
                }
              >
                {this.getHeading(lang, homeObject)[3]}
              </strong>
              <video
                controls
                preload="none"
                className="img-thumbnail mt-2"
                src={mediaEndMoint + "Home/" + homeObject.StudentPanelVideo}
                poster="main-images/video-poster.jpg"
                width="100%"
                height="100%"
                type="video/mp4"
              />
              <strong
                className={
                  lang === "fa"
                    ? "text-right text-primary h5"
                    : "text-primary h5"
                }
              >
                {this.getHeading(lang, homeObject)[4]}
              </strong>
              <video
                controls
                preload="none"
                className="img-thumbnail mt-2"
                src={mediaEndMoint + "Home/" + homeObject.TeacherPanelVideo}
                poster="main-images/video-poster.jpg"
                width="100%"
                height="100%"
                type="video/mp4"
              />
            </Col>
          </Row> */}
          <Row className="mt-4">
            <Col xs="12" className="m-0 p-0">
              <Suspense fallback={<Spinner color="success" />}>
                <Courses />
              </Suspense>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default Home;
