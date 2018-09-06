import React, { Component, Fragment } from 'react';
import Routes from "../Routes";
import {Auth} from "../Routes";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';

//import ReactDOM from 'react-dom';
//import { Link } from "react-router-dom";
//import { Nav, Navbar, NavItem } from "react-bootstrap";
//import { LinkContainer } from "react-router-bootstrap";


class AppNavbar extends Component {
    state = {
       isOpen: false       
   }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {

       // const A = Auth.isLogin: this.state.Auth.isLogin;
        return (
                                  
            <div>
             <Navbar color="dark" dark expand="sm" className="mb-5">
             <Container>
                    <NavbarBrand href="/">Social Media</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <Fragment>
                            <NavItem>
                                <NavLink href="/Login">Login</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/Register">Register</NavLink>
                            </NavItem>
                            </Fragment>
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>  
            <Routes />         
           </div> 
                     
        );
    }
}



export default AppNavbar;