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
  
  // Show footer buttons!
  function _showFooterButtons(){
    return(
      props.data.footer.buttons.map((options, key) => {
        return(
          <Button variant = {options.variant} onClick = {() => options.onClick()}>{options.id}</Button>
        )
      })
    )
  }
  
  return (
    <Modal show = {props.show} onHide={() => props.data.onHide()}>
        <Modal.Body className = {props.data?.alignment !== undefined ? props.data.alignment : "text-center"}>
            {props.message}
            {props.data && props.data?.textarea?.isRequired && 
            <Textarea placeholder = {props.data?.textarea?.placeholder} value = {props.value} data = {props.node} error = {props.error}/>}
        </Modal.Body>
        {props.data && props.data?.footer?.isRequired && 
          <Modal.Footer>
            {_showFooterButtons()}
          </Modal.Footer>
        }
    </Modal>
  )
}

export default Toast;