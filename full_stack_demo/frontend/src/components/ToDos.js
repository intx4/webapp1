"use strict;"
import React, { useState, useEffect} from 'react';

//BootStrap react imports
import Container from 'react-bootstrap/Container';
import Collapse from 'react-bootstrap/Collapse';
import Navbar from 'react-bootstrap/Navbar';
import NavLink from 'react-bootstrap/NavLink';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem';


//dayjs
//import dayjs from 'dayjs';
const dayjs = require("dayjs");
const customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);
const it = require('dayjs/locale/it');

//Helpers
function formatDate(date){
    if (date === null){
      return "---O---";
    }
    return date.format("DD/MM/YYYY");
}
function dateDiff(date) {
  if (date === null){
    return 1000;
  }
  let now = dayjs();
  return date.diff(now, 'day');
}

// Component Listing the ToDos
function ToDos(props){

  //map every array element to a ListGroup.Item component
  const filterTasks = () => {
    if (props.filter === "All"){
        return props.TASKS.filter((t) => t.isPrivate === false);
    }
    else if (props.filter === "Important"){
        return props.TASKS.filter((t) => t.important === true && t.isPrivate === false);
    }
    else if (props.filter === "Private"){
        return props.TASKS.filter((t) => t.isPrivate === true);
    }
    else if (props.filter === "Today"){
        return props.TASKS.filter((t) => (dateDiff(t.deadline) <= 1 && t.isPrivate === false)
        );
    }
    else if (props.filter === "Next7"){
        return props.TASKS.filter((t) => (dateDiff(t.deadline) <= 7 && t.isPrivate === false)
        );
    }
  }
  const tasks = filterTasks();
  
  const taskComponents = tasks.map( (task) => {
    let classNome = "d-flex justify-content-evenly";
    if (task.important){
        classNome+= " important";
    }
    return(
          <ListGroupItem as="li" key={task.id}>
          <Container className={classNome}>
          <Button className="btn btn-success fixed-right-bottom" type="submit" onClick={() =>{
              props.setShow(true);
              props.setModal("Edit");
              props.setTask(task);
            }}>Edit</Button>
          <Button className="btn btn-danger fixed-right-bottom" type="submit"  onClick={() => {
              props.setShow(true);
              props.setModal("Delete");
              props.setTask(task);
            }}>Delete</Button>
          {task.description}
          <small> Date: {formatDate(task.deadline)}</small>
          </Container>
          </ListGroupItem>
    );
  });
  //include the array of components into the ListGroup
  return (
  <Col sm={true}>
      <ListGroup as="ul">
      {taskComponents}
      </ListGroup>
  </Col>
  );  
}

export default ToDos;
