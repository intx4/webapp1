import './App.css';
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


// Fake Tasks
const TASKS = [
  { id: 1, description: "Complete BigLab 1C", important: false, isPrivate: true, deadline: dayjs("08-09-2021", "DD-MM-YYYY")},
  { id: 2, description: "Study for BigLab 1C", important: true, isPrivate: true, deadline: dayjs("08-09-2022", "DD-MM-YYYY")},
  { id: 3, description: "Buy some groceries", important: false, isPrivate: false, deadline: dayjs("08-09-2022", "DD-MM-YYYY")},
  { id: 4, description: "Read a good book", important: true, isPrivate: true, deadline: null},
  { id: 5, description: "Watch Mr. Robot", important: false, isPrivate: true, deadline: dayjs("08-09-2021", "DD-MM-YYYY")},
  { id: 6, description: "Buy some flowers", important: true, isPrivate: false, deadline: dayjs() }, // today task
  { id: 7, description: "Football match", important: true, isPrivate: false, deadline: dayjs().add(4, 'day') }, // next 7 days task
];

// Helpers-------------------------------------------------------------------------------------
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
// Component Handling the Filters
function SideNavbar(props){

  //handle the activation of filter
  const filters = ["All", "Important", "Private", "Today", "Next7"];
  const filterComponents = filters.map((filter) => {
    let isActive = filter === props.filter? true: false;
    return(
      <ListGroup.Item as="li" key={filter} id={filter} action active={isActive}
        onClick={() => {
          props.setFilter(filter);
        }}>{filter}</ListGroup.Item>
    )
  });

  return(
    <aside>
      <Col sm={true} className="d-sm-block bg-light">
        <Collapse in={props.show}>
          <div id="collapseSideBar">
            <ListGroup as="ul" id="filterList" variant="flush">
              {filterComponents}
            </ListGroup>
          </div>
        </Collapse>
      </Col>
    </aside>
  );
}
// Component Listing the ToDos
function ToDos(props){
  //map every array element to a ListGroup.Item component
  const filterTasks = () => {
    if (props.filter === "All"){
      return TASKS.filter((t) => t.isPrivate === false);
    }
    else if (props.filter === "Important"){
      return TASKS.filter((t) => t.important === true && t.isPrivate === false);
    }
    else if (props.filter === "Private"){
      return TASKS.filter((t) => t.isPrivate === true);
    }
    else if (props.filter === "Today"){
      return TASKS.filter((t) => (dateDiff(t.deadline) <= 1 && t.isPrivate === false)
      );
    }
    else if (props.filter === "Next7"){
      return TASKS.filter((t) => (dateDiff(t.deadline) <= 7 && t.isPrivate === false)
      );
    }
  }
  const tasks = filterTasks();
  const taskComponents = tasks.map( (task) => {
    let classNome = "d-flex justify-content-evenly";
    if (task.important){
      classNome += " important";
    }
    return(
      <ListGroupItem as="li" key={task.id}>
        <Container className={classNome}>
        <Button className="btn btn-success fixed-right-bottom" type="submit">Edit</Button>
        <Button className="btn btn-danger fixed-right-bottom" type="submit">Delete</Button>
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

function App() {
    const [show, setShow] = useState(true); // show controls sidenavbar
    const [filter, setFilter] = useState("All"); //active filter 

    let sideBarWidth = 4;
    let tasksWidth = 8;

    if(!show){
      sideBarWidth = 0;
      tasksWidth = 12;
    }
    return ( 
        <div className = "App" >
            {/* NavBar */}
            <Navbar bg="success" expand="sm" variant="dark">
                <Container fluid>
                    {/* Toggle Button for SideNB*/}
                    <Button onClick={() => setShow(!show)} aria-controls="collapseSideBar" aria-expanded={show} className="btn btn-success">
                         <span className="navbar-toggler-icon"></span>
                    </Button>
                    <Navbar.Brand href="#home">
                        <svg class="bi bi-check-all" width="30" height="30" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M12.354 3.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L5 10.293l6.646-6.647a.5.5 0 01.708 0z" clip-rule="evenodd"/>
                            <path d="M6.25 8.043l-.896-.897a.5.5 0 10-.708.708l.897.896.707-.707zm1 2.414l.896.897a.5.5 0 00.708 0l7-7a.5.5 0 00-.708-.708L8.5 10.293l-.543-.543-.707.707z"/>
                        </svg> Task Manager
                    </Navbar.Brand>

                    {/* Search Box */}
                    <Form className="d-flex">
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="me-2 d-sm-block d-none"
                            aria-label="Search"
                        />
                        <Button variant="outline-secondary" className="btn d-sm-block d-none" style={{"color": "white"}} type="submit">Search</Button>
                    </Form>

                    {/* User Icon */}
                    <NavLink href="#home">
                        <svg class="bi bi-people-circle" width="30" height="30" fill="white" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 008 15a6.987 6.987 0 005.468-2.63z"/>
                            <path fill-rule="evenodd" d="M8 9a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>
                            <path fill-rule="evenodd" d="M8 1a7 7 0 100 14A7 7 0 008 1zM0 8a8 8 0 1116 0A8 8 0 010 8z" clip-rule="evenodd"/>
                        </svg>
                    </NavLink>
                </Container>
            </Navbar>

            {/* Body */}
            <Container fluid className="mt-2">
                <Row className="d-flex flex-row">
                  {/* Side NB */}
                  <Col sm={sideBarWidth}>
                    <SideNavbar show={show} filter={filter} setFilter={setFilter}/>
                  </Col>
                  {/* ToDos */}
                  <Col sm={tasksWidth}>
                    <ToDos show={show} filter={filter}/>
                  </Col>
                </Row>
            </Container>

            <Container className="d-flex flex-row-reverse pt-5 mt-5 me-5 pe-5">
                <Button className="btn btn-success fixed-right-bottom" type="submit">+</Button>
            </Container>
        </div>
    );
}


export default App;