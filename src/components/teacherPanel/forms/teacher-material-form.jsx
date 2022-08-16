import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback,
} from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import SimpleReactValidator from "simple-react-validator";
import Form from "react-bootstrap/Form";
import { getDatetime } from "../../../utils/datetime";
import UserContext from "../../../utils/user-context";
import { Container, Row, Col, Button } from "reactstrap";
import { initialMaterialObject } from "./teacher-form-objects";
const FileUpload = React.lazy(() => import("../../general/fileUpload"));
function TeacherMaterialForm(props) {
  const apiEndPoint = process.env.REACT_APP_APIEndPoint;
  const mediaEndPoint = process.env.REACT_APP_MediaEndPoint;
  const currentUser = useContext(UserContext);
  const simpleValidator = useRef(new SimpleReactValidator());
  const { show, onHide, id, title } = props;
  const [materialObject, setMaterialObject] = useState(initialMaterialObject);
  const [isLink, setIsLink] = useState(false);
  const onEditHandler = useCallback(
    (list) => {
      setMaterialObject((prevState) => ({
        ...prevState,
        MaterialId: list.MaterialId,
        Title: list.Title,
        FileName: list.FileName,
        TeacherId: list.TeacherId,
        Modifier: currentUser.Username,
        ModificationDate: getDatetime(),
        IsDeleted: list.IsDeleted,
      }));
      setIsLink(list.FileName.startsWith("http") ? true : false);
    },
    [currentUser.Username]
  );
  useEffect(() => {
    // console.log("Material Object=", materialObject)
  }, [materialObject]);
  useEffect(() => {
    let mounted = true;
    if (id !== "") {
      const fetchData = async () => {
        const result = await axios.get(
          apiEndPoint + `Material/Get?materialId=${id}`
        );
        if (mounted) {
          onEditHandler(result.data);
        }
      };
      fetchData();
      return () => {
        mounted = false;
      };
    } else {
      setMaterialObject(initialMaterialObject);
      setMaterialObject((prevState) => ({
        ...prevState,
        Modifier: currentUser.Username,
        TeacherId: currentUser.UserId,
      }));
    }
  }, [
    id,
    apiEndPoint,
    currentUser.Username,
    currentUser.UserId,
    onEditHandler,
  ]);
  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (e.target.type === "checkbox") {
      setMaterialObject((prevState) => ({ ...prevState, [name]: checked }));
    } else {
      setMaterialObject((prevState) => ({ ...prevState, [name]: value }));
    }
  };
  const handleUpload = (fileName) => {
    setMaterialObject((prevState) => ({
      ...prevState,
      FileName: fileName,
    }));
  };
  const handleIsLink = () => {
    setIsLink((prev) => !prev);
    setMaterialObject((prevState) => ({ ...prevState, FileName: "" }));
  };
  const handleAddLink = (e) => {
    const { name, value } = e.target;
    setMaterialObject((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = () => {
    if (simpleValidator.current.allValid()) {
      axios
        .post(apiEndPoint + "Material/Add", materialObject, {})
        .then((response) => {
          alert("You submitted the form and stuff!");
          simpleValidator.current.hideMessages();
          onHide();
        })
        .catch(function (error) {
          alert(error);
        });
    } else {
      simpleValidator.current.showMessages();
    }
  };
  return (
    <div>
      <Modal
        size="md"
        show={show}
        onHide={onHide}
        backdrop="static"
        // dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton className="loginHeader p-2">
          <Row className="align-items-center">
            <Col xs="2" className="text-center">
              <img
                src="main-images/logo-circle.webp"
                width="100%"
                height="100%"
                alt="logo"
              />
            </Col>
            <Col xs="10" className="text-left m-0 p-0">
              <Modal.Title
                id="example-custom-modal-styling-title"
                className="h4 font-weight-bold text-warning"
              >
                {title}
              </Modal.Title>
            </Col>
          </Row>
        </Modal.Header>
        <Modal.Body>
          <Container fluid>
            <Row>
              <Col xs="12" className="align-items-center m-0 p-1">
                <Form.Group>
                  <Form.Label htmlFor="modificationDate">
                    <h6 className="text-primary mb-0 ml-1">
                      Modefication Date (Now):
                    </h6>
                  </Form.Label>
                  <Form.Label
                    id="modificationDate"
                    className="border rounded border-dark d-block p-2"
                  >
                    {materialObject.ModificationDate}
                  </Form.Label>
                  <Form.Label htmlFor="modificationDate">
                    <h6 className="text-primary mb-0 ml-1">Modefier (Now):</h6>
                  </Form.Label>
                  <Form.Label
                    id="modificationDate"
                    className="border rounded border-dark d-block p-2"
                  >
                    {materialObject.Modifier}
                  </Form.Label>
                </Form.Group>
                <Form.Group>
                  <Form.Check
                    inline
                    name="IsDeleted"
                    label="Is Deleted?"
                    checked={materialObject.IsDeleted}
                    onChange={handleChange}
                    className="mt-2"
                  />
                </Form.Group>
                {currentUser.RoleName === "Dean" && (
                  <Form.Group>
                    <Form.Check
                      inline
                      name="IsFree"
                      label="Is This Video Free?"
                      checked={materialObject.IsFree}
                      onChange={handleChange}
                    />
                  </Form.Group>
                )}
              </Col>
            </Row>
            <Row>
              <Col xs="12" className="m-0 p-1">
                <Form.Group>
                  <Form.Check
                    inline
                    label="Do you want to add a link?"
                    checked={isLink}
                    onChange={handleIsLink}
                  />
                </Form.Group>
                {!isLink && (
                  <>
                    <FileUpload
                      postMethod={"Material/UploadFile"}
                      title="FileName(pdf,docx,mp4,mpeg,mp3,pptx)"
                      accept={["pdf", "docx", "mp4", "mpeg", "mp3", "pptx"]}
                      specifiedFileName="NoName"
                      onUpload={handleUpload}
                      onBlur={simpleValidator.current.showMessageFor(
                        "document"
                      )}
                    />
                    {simpleValidator.current.message(
                      "document",
                      materialObject.FileName,
                      "required|min:1",
                      { className: "alert alert-danger" }
                    )}
                    {(materialObject.FileName.split(".").pop() === "pdf" ||
                      materialObject.FileName.split(".").pop() === "docx" ||
                      materialObject.FileName.split(".").pop() === "pptx") && (
                      <Form.Label className="bg-success w-100 rounded pl-3 p-2 text-white">
                        File Name:
                        <a
                          className="pl-2"
                          href={
                            mediaEndPoint +
                            "Material/" +
                            materialObject.FileName
                          }
                          download
                        >
                          {materialObject.FileName}
                        </a>
                      </Form.Label>
                    )}
                    {(materialObject.FileName.split(".").pop() === "mpeg" ||
                      materialObject.FileName.split(".").pop() === "mpeg") && (
                      <audio
                        controls
                        preload="none"
                        src={
                          mediaEndPoint + "Material/" + materialObject.FileName
                        }
                        width="100%"
                        height="100%"
                        type="audio/mpeg"
                        className="p-0"
                      />
                    )}
                    {materialObject.FileName.split(".").pop() === "mp4" && (
                      <video
                        controls
                        preload="none"
                        className="img-thumbnail mt-2 align-middle"
                        src={
                          mediaEndPoint + "Material/" + materialObject.FileName
                        }
                        poster="main-images/video-poster.jpg"
                        width="100%"
                        height="100%"
                        type="video/mp4"
                      />
                    )}
                  </>
                )}
              </Col>
            </Row>
            <hr />
            <Row>
              <Col xs="12" className="m-0 p-1">
                {isLink && (
                  <Form.Group>
                    <Form.Label htmlFor="fileName">
                      <h6 className="text-primary mb-0 ml-1">Link :</h6>
                    </Form.Label>
                    <Form.Control
                      id="fileName"
                      name="FileName"
                      type="text"
                      placeholder="https://..."
                      value={materialObject.FileName}
                      onChange={handleAddLink}
                      onBlur={simpleValidator.current.showMessageFor(
                        "document"
                      )}
                    />
                    {simpleValidator.current.message(
                      "document",
                      materialObject.FileName,
                      "required|url",
                      { className: "alert alert-danger" }
                    )}
                  </Form.Group>
                )}
                <Form.Group>
                  <Form.Label htmlFor="title">
                    <h6 className="text-primary mb-0 ml-1">Title:</h6>
                  </Form.Label>
                  <Form.Control
                    id="title"
                    name="Title"
                    type="text"
                    placeholder="Enter Title"
                    value={materialObject.Title}
                    onChange={handleChange}
                    onBlur={simpleValidator.current.showMessageFor("title")}
                  />
                  {simpleValidator.current.message(
                    "title",
                    materialObject.Title,
                    "required|max:300",
                    { className: "alert alert-danger" }
                  )}
                </Form.Group>
              </Col>
            </Row>
            <Button className="btn btn-sm float-right" onClick={handleSubmit}>
              Submit
            </Button>
          </Container>
        </Modal.Body>
      </Modal>
    </div>
  );
}
export default TeacherMaterialForm;
