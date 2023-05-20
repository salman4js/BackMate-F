import React from 'react';
import './custom.dialog.view.css';
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
    <div className = "custom-dialog">
      <Modal
        show = {props.model.show} onHide={() => props.model.onHide()}
        size="medium"
        aria-labelledby="contained-modal-title-vcenter"
        centered = {props.model.centered}
      >
          {props.model.header.enableHeading && (
            <Modal.Header closeButton>
                <div className = {props.model.header.className}>
                  {props.model.header.heading}
                </div>
            </Modal.Header>
          )}
          {props.model.content.enableContent && (
            <Modal.Body>
              {props.model.subHeading.enableSubheading && (
                <h4>{props.model.subHeading.subHeading}</h4>
              )}
              {props.model.content.enableContent && (
                <p className = {props.model.content.className}>
                  {props.model.content.content}
                </p>
              )}
            </Modal.Body>
          )}
          {props.model.enableFooterButtons && (
            <Modal.Footer>
              {_showFooterButtons()}
            </Modal.Footer>
          )}
      </Modal>
    </div>
  )
}

export default CustomDialog;