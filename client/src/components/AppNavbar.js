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
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
           isOpen: false,
           loggedIn: false       
    };
   }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

   componentWillMount() {    
        if(localStorage.getItem('id_token') != null){
            this.setState({loggedIn: true}); 
        }
        else{
            this.setState({loggedIn: false}); 
        }        
    }

    render() {       
        return (                                  
            <div>
             <Navbar color="dark" dark expand="sm" className="mb-5">
             <Container>
                    <NavbarBrand href="/">Social Media</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>                        
                        {(this.state.loggedIn) ? <NavItem>
                                <NavLink href="/Logout">Logout</NavLink>
                        </NavItem> :
                            <Fragment>
                            <NavItem>
                                <NavLink href="/Login">Login</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/Register">Register</NavLink>
                            </NavItem>                            
                            </Fragment>}
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