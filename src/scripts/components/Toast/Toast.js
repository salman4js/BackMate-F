import React from 'react';
import './Toast.css';
import Textarea from './InputBox/Textarea';
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';

const Toast = (props) => {
  
  // Handle footer button click
  function handleClick(){
    props.handleClick();
  }
  
  return (
    <Modal show = {props.show} onHide={() => props.handleClose()}>
        <Modal.Body className = {props.alignment !== undefined ? props.alignment : "text-center"}>
            {props.message}
            {props.data && props.data.textarea.isRequired && 
            <Textarea placeholder = {props.data.textarea.placeholder} value = {props.value} data = {props.node} error = {props.error}/>}
        </Modal.Body>
        {props.data && props.data.footer.isRequired && 
          <Modal.Footer>
            <Button variant = {props.data.footer.buttons.btn1.variant} onClick = {() => handleClick()}>{props.data.footer.buttons.btn1.id}</Button>
          </Modal.Footer>
        }
    </Modal>
  )
}

export default Toast;