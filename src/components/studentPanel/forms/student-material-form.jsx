import React, { useState, useEffect, useContext, useCallback } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import UserContext from "../../../utils/user-context";
import { Container, Row, Col } from "reactstrap";
import { initialMaterialObject } from "./student-form-objects";
function StudentMaterialForm(props) {
  const apiEndPoint = process.env.REACT_APP_APIEndPoint;
  const mediaEndPoint = process.env.REACT_APP_MediaEndPoint;
  const currentUser = useContext(UserContext);
  const { show, onHide, id } = props;
  const [materialObject, setMaterialObject] = useState(initialMaterialObject);
  const onEditHandler = useCallback(
    (list) => {
      setMaterialObject((prevState) => ({
        ...prevState,
        MaterialId: list.MaterialId,
        Title: list.Title,
        FileName: list.FileName,
        TeacherId: list.TeacherId,
        Modifier: currentUser.Username,
        ModificationDate: list.ModificationDate,
        IsDeleted: list.IsDeleted,
      }));
    },
    [currentUser.Username]
  );
  useEffect(() => {
    // console.log("Material Object=", title)
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
    }
  }, [
    id,
    apiEndPoint,
    currentUser.Username,
    currentUser.UserId,
    onEditHandler,
  ]);
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
                {materialObject.Title}
              </Modal.Title>
            </Col>
          </Row>
        </Modal.Header>
        <Modal.Body>
          <Container fluid>
            <Row>
              <Col xs="12" className="align-items-center m-0 p-1">
                {(materialObject.FileName.split(".").pop() === "pdf" ||
                  materialObject.FileName.split(".").pop() === "docx" ||
                  materialObject.FileName.split(".").pop() === "pptx") && (
                  <div>
                    <strong>Download Link: </strong>
                    <a
                      className="pl-2"
                      href={
                        mediaEndPoint + "Material/" + materialObject.FileName
                      }
                      download
                    >
                      {materialObject.FileName}
                    </a>
                  </div>
                )}
                {(materialObject.FileName.split(".").pop() === "mpeg" ||
                  materialObject.FileName.split(".").pop() === "mpeg") && (
                  <audio
                    controls
                    preload="none"
                    src={mediaEndPoint + "Material/" + materialObject.FileName}
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
                    src={mediaEndPoint + "Material/" + materialObject.FileName}
                    poster="main-images/video-poster.jpg"
                    width="100%"
                    height="100%"
                    type="video/mp4"
                  />
                )}
                {materialObject.FileName.startsWith("http") && (
                  <a
                    href={materialObject.FileName}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {materialObject.FileName}
                  </a>
                )}
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </div>
  );
}
export default StudentMaterialForm;
