import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalClock(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // localStorage.getItem('lang');
    const lang = localStorage.getItem('lang');

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                {lang === 'fa' ? 'تنظیم تاریخ' : 'Set BirthDay'}
            </Button>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header className='d-flex justify-content-center'>
                    <Modal.Title>{lang === 'fa' ? 'تنظیم تاریخ' : 'Set BirthDay'}</Modal.Title>
                </Modal.Header>
                <Modal.Body className='bg-light text-center'>
                    {props.children}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {lang === 'fa' ? 'تایید' : 'Set'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalClock;