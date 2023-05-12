import React from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const CustomDialog = (props) => {
  
  // Show dynamic footer buttons@
  function _showFooterButtons(){
    return(
      props.model.buttons.map((options, key) => {
        return(
          <Button variant = {options.variant} onClick = {() => options.onClick()}>{options.id}</Button>
        )
      })
    )
  }
  
  
  return(
    <div>
      <Modal
        show = {props.model.show} onHide={() => props.model.onHide()}
        size="medium"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {props.model.heading}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>{props.model.subHeading}</h4>
            <p>
              {props.model.content}
            </p>
          </Modal.Body>
          <Modal.Footer>
            {_showFooterButtons()}
          </Modal.Footer>
      </Modal>
    </div>
  )
}

export default CustomDialog;