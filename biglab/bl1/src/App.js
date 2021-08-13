import './App.css';
import React, { useState } from 'react';

//BootStrap react imports
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Collapse from 'react-bootstrap/Collapse';
import Navbar from 'react-bootstrap/Navbar';
import NavLink from 'react-bootstrap/NavLink';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [show, setShow] = useState(false);

    return ( 
        <div className = "App" >
            {/* NavBar */}
            <Navbar bg="success" expand="sm" variant="dark">
                <Container fluid>
                    <Button onClick={() => setShow(!show)} aria-controls="collapseSideBar" aria-expanded={show} className="btn btn-success d-sm-none">
                         <span className="navbar-toggler-icon"></span>
                    </Button>
                    <Navbar.Brand href="#home">
                        <svg class="bi bi-check-all" width="30" height="30" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M12.354 3.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L5 10.293l6.646-6.647a.5.5 0 01.708 0z" clip-rule="evenodd"/>
                            <path d="M6.25 8.043l-.896-.897a.5.5 0 10-.708.708l.897.896.707-.707zm1 2.414l.896.897a.5.5 0 00.708 0l7-7a.5.5 0 00-.708-.708L8.5 10.293l-.543-.543-.707.707z"/>
                        </svg> Task Manager
                    </Navbar.Brand>

                    <Form className="d-flex">
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="me-2 d-sm-block d-none"
                            aria-label="Search"
                        />
                        <Button variant="outline-secondary" className="btn d-sm-block d-none" style={{"color": "white"}} type="submit">Search</Button>
                    </Form>

                    <NavLink href="#home">
                        <svg class="bi bi-people-circle" width="30" height="30" fill="white" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 008 15a6.987 6.987 0 005.468-2.63z"/>
                            <path fill-rule="evenodd" d="M8 9a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>
                            <path fill-rule="evenodd" d="M8 1a7 7 0 100 14A7 7 0 008 1zM0 8a8 8 0 1116 0A8 8 0 010 8z" clip-rule="evenodd"/>
                        </svg>
                    </NavLink>
                </Container>
            </Navbar>

            <Container fluid className="mt-2">
                <Row>
                    <aside>
                        <Collapse in={show}>
                            <div id="collapseSideBar">
                                <Col sm={4} className="d-sm-block bg-light">
                                    <ListGroup as="ul" variant="flush">
                                        <ListGroup.Item as="li" action href="#home" id="All" active>All</ListGroup.Item>
                                        <ListGroup.Item as="li" action href="#home" id="Important">Important</ListGroup.Item>
                                        <ListGroup.Item as="li" action href="#home" id="Private">Private</ListGroup.Item>
                                        <ListGroup.Item as="li" action href="#home" id="Today">Today</ListGroup.Item>
                                        <ListGroup.Item as="li" action href="#home" id="Next7">Next 7 Days</ListGroup.Item>
                                    </ListGroup>
                                </Col>
                            </div>
                        </Collapse>
                    </aside>
                    <Col sm={8} className="col-12">
                        <ul id="taskList" class="list-group list-group-flush">

                        </ul>
                    </Col>
                </Row>
            </Container>

            <Container className="justify-content-end pt-5 mt-5 pe-5 me-5">
                <Button className="btn btn-success fixed-right-bottom" type="submit">+</Button>
            </Container>
        </div>
    );
}

export default App;