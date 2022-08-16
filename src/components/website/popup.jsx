import React from 'react';
import Modal from 'react-bootstrap/Modal';
function PopUp(props) {
    const mediaEndPoint = process.env.REACT_APP_MediaEndPoint;
    const { show, onHide, photoName } = props;
    return (
        <div>
            <Modal
                size="lg"
                show={show}
                onHide={onHide}
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Body>
                    <img src={mediaEndPoint + 'Advertise/' + photoName} width="100%" height="100%" alt="logo" />
                </Modal.Body>
            </Modal>
        </div>
    );
}
export default PopUp;



