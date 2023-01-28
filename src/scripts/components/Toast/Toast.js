import React from 'react';
import Modal from "react-bootstrap/Modal";

const Toast = (props) => {
  return (
    <Modal show = {props.show} onHide={() => props.handleClose()}>
        <Modal.Body className = "text-center">
            {props.message}
        </Modal.Body>
    </Modal>
  )
}

export default Toast;