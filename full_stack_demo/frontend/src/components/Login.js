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

export default function Login(props){
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const setToken = props.setToken;

    const handleSubmit = async function (e) {
        e.preventDefault();
        // do a POST request to the auth API
        const content = {"username":user, "password": password};
        const res = await fetch('http://localhost:8000/api-token-auth/', {
            method: 'POST',
            body: JSON.stringify(content),
            headers: {'Content-Type': 'application/json','X-CSRFToken': `${csrftoken}`}
          });
        res.json().then(data => setToken(data)).catch(alert("Login failed!"));
    }

    return(
        <div className="fluid p-5 m-5">
        <Form id="login-form">
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextUsername" 
            onChange={(e) => setUser(e.target.value)}>
          <Form.Label column sm="2">
            Username
          </Form.Label>
          <Col sm="10">
            <Form.Control type="username" placeholder="Username"/>
          </Col>
        </Form.Group>
      
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword" 
            onChange={(e) => setPassword(e.target.value)}>
          <Form.Label column sm="2">
            Password
          </Form.Label>
          <Col sm="10">
            <Form.Control type="password" placeholder="Password" />
          </Col>
        </Form.Group>
        <Button variant="primary" type="submit" onClick={(e) => handleSubmit(e)}>
            Submit
        </Button> 
      </Form>
      </div>
      );
}