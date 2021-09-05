"use strict;"
import React, {Component, useState, useEffect} from 'react';

//BootStrap react imports
import Container from 'react-bootstrap/Container';
import Collapse from 'react-bootstrap/Collapse';
import Navbar from 'react-bootstrap/Navbar';
import NavLink from 'react-bootstrap/NavLink';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem';
import Modal from 'react-bootstrap/Modal';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';
import 'whatwg-fetch';

//Helpers----------------------------------------------------------
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}

const csrftoken = getCookie('csrftoken');
/* Component that handles the modals for CRUD ops
  props:
    show => show modal
    setShow => handle show
    type => which operation
    task => target task
    refresh => toggle the refresh of task lists
  */
export default class Modals extends Component {
  constructor(props){
    super(props);
    this.state = props.task;
  }
  render() {
    const props = this.props;
    const token = this.props.token;
    let title = "";

    //change of form
    const handleChange = (event) => {
      let description = this.state[0].description;
      let deadline = this.state[0].deadline;
      let important = this.state[0].important;
      let isPrivate = this.state[0].isPrivate;

      if (event.target.label === "Important"){
        important = true;  
      }
      if (event.target.label === "Private"){
        isPrivate = true;
      }
      if (event.target.placeholder === "Description"){
        description = event.target.value;
      }
      if (event.target.placeholder === "DD-MM-YYYY"){
        deadline = event.target.value;
      }
      let task = [{id: this.state[0].id, description: description, important: important, isPrivate: isPrivate, deadline: deadline}];
      this.setState(task);
    }

    //submit
    const handleSubmit = (event) => {
      let content = this.state[0]; //it appears it's an array
      if(event.target.id === "modal-add"){
        fetch('/api/todos/', {
          method: 'POST',
          body: JSON.stringify(content),
          headers: {'Content-Type': 'application/json','X-CSRFToken': `${csrftoken}`, "Authorization": "token:"+token}
        }).then(res => alert("New Task Added"+JSON.stringify(content))).catch(err => alert(`Something wrong: ${err}`));
      }
      else if(event.target.id === "modal-edit"){
        fetch(`api/todos/${content.id}`, {
          method: 'UPDATE',
          body: JSON.stringify(content),
          headers: {'Content-Type': 'application/json', 'X-CSRFToken': `${csrftoken}`, "Authorization": "token:"+token}
        }).then(res => alert("Successfully updated")).catch(err => alert(`Something wrong: ${err}`));
      }
      else if (event.target.id === "modal-delete"){
        fetch(`api/todos/${content.id}`, {
          method: 'DELETE',
          body: JSON.stringify(content),
          headers: {'Content-Type': 'application/json', 'X-CSRFToken': `${csrftoken}`, "Authorization": "token:"+token}
        }).then(res => alert("Successfully deleted")).catch(err => alert(`Something wrong: ${err}`));
      }
      props.setShow(false); //close modal
    }

    if (props.type === "Add"){
      title = "New Task";
    }
    if (props.type === "Edit"){
      title = "Edit";
    }
    let id = title === "Edit"? "modal-edit":"modal-add";
    
    if (props.type === "Delete"){
      return(
        <Modal show={props.show} onHide={() => props.setShow(false)}>
        <ModalHeader closeButton>
          <ModalTitle>Delete Task</ModalTitle>
        </ModalHeader>
        <ModalBody>
          Are you sure?
        </ModalBody>
        <ModalFooter>
                <Button
                  className="btn btn-danger"
                  id = "modal-delete"
                  onClick = {handleSubmit}
                >
                  Delete
                </Button>
              </ModalFooter>
        </Modal>
      )
    }
    if (title === ""){
      return(<></>)
    }
        return (
            <Modal show={props.show} onHide={() => props.setShow(false)}>
              <ModalHeader closeButton>
                <ModalTitle>{title}</ModalTitle>
              </ModalHeader>
              <ModalBody>
                <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" rows={1} placeholder="Description" value={this.state.description} onChange={handleChange}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Deadline</Form.Label>
                  <Form.Control type="date" placeholder="DD-MM-YYYY" value={this.dateBuffer} onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Important" value={props.task.important} onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Private" value={props.task.isPrivate} onChange={handleChange}/>
                </Form.Group>
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  id={id}
                  onClick = {handleSubmit} 
                >
                  Save
                </Button>
              </ModalFooter>
            </Modal>
            );
        }
    }
