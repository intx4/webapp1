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
import dayjs from 'dayjs';

export default class Modals extends Component {
  constructor(props){
    super(props);
    this.setState(props.task);
  }
  render() {
    const props = this.props;
    let title = "";

    const handleChange = (event) => {
      let description = "";
      let deadline = null;
      let important = false;
      let isPrivate = false;

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
        deadline = dayjs(event.target.value, "DD-MM-YYYY", "it");
      }
      let task = {description: description, important: important, isPrivate: isPrivate, deadline: deadline};
      this.setState(task);
    }

    if (props.type === "Add"){
      title = "New Task";
    }
    else if (props.type === "Edit"){
      title = "Edit";
    }
    else if (props.type === "Delete"){
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
                  <Form.Control as="textarea" rows={1} placeholder="DD-MM-YYYY" value={this.state.deadline} onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Important" value={this.state.important} onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Private" value={this.state.isPrivate} onChange={handleChange}/>
                </Form.Group>
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary" 
                >
                  Save
                </Button>
              </ModalFooter>
            </Modal>
            );
        }
    }
