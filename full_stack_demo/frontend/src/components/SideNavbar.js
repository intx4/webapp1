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

 export default SideNavbar;