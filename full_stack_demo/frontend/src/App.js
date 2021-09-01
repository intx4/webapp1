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
//Components
import SideNavbar from './components/SideNavbar';
import ToDos from './components/ToDos';
import TASKS from './components/TASKS';
import Modals from './components/Modals';

//dayjs
//import dayjs from 'dayjs';
const dayjs = require("dayjs");
const customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);
const it = require('dayjs/locale/it');

// Helpers-------------------------------------------------------------------------------------
function App() {
    const [showSide, setShowSide] = useState(true); // show controls sidenavbar
    const [filter, setFilter] = useState("All"); //active filter 
    const [showModal, setShowModal] = useState(false); //show Modal
    const [whichModal, setWhichModal] = useState("");//type of Modal
    const [task, setTask] = useState(null); //target task 

    let sideBarWidth = 4;
    let tasksWidth = 8;

    if(!showSide){
      sideBarWidth = 0;
      tasksWidth = 12;
    }
    return ( 
        <div className = "App" >
            {/* NavBar */}
            <Navbar bg="success" expand="sm" variant="dark">
                <Container fluid>
                    {/* Toggle Button for SideNB*/}
                    <Button onClick={() => setShowSide(!showSide)} aria-controls="collapseSideBar" aria-expanded={showSide} className="btn btn-success">
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
                    <SideNavbar show={showSide} filter={filter} setFilter={setFilter}/>
                  </Col>
                  {/* ToDos */}
                  <Col sm={tasksWidth}>
                    <ToDos show={showSide} filter={filter} TASKS={TASKS} setShow={setShowModal} setModal={setWhichModal} setTask={setTask}/>
                  </Col>
                </Row>
            </Container>
            {/* Add new Task Button*/}
            <Container className="d-flex flex-row-reverse pt-5 mt-5 me-5 pe-5">
                <Button className="btn btn-success fixed-right-bottom" type="submit" onClick={() => {
                  setShowModal(true);
                  setWhichModal("Add");
                  }}>+</Button>
            </Container>

            {/* Modal for CRUD */}
            <Modals show={showModal} setShow={setShowModal} type={whichModal} task={task}/>
        </div>
    );
}


export default App;