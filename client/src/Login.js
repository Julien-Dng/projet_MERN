import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
//import { LinkContainer } from "react-router-bootstrap";
import "./Login.css";
import {Auth} from './Routes';
//import { Alert } from 'reactstrap';
import { Redirect } from 'react-router-dom';

export default class Login extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        email: "",
        password: "",
        redirectToReferrer: false,
      };

      this.handleSubmit = this.handleSubmit.bind(this)
    }
  
    validateForm() {
      return this.state.email.length > 0 && this.state.password.length > 0;
    }
  
    handleChange = event => {
      this.setState({
        [event.target.id]: event.target.value
      });
    }
  
    handleSubmit = event => {      
      event.preventDefault();
      var data = {
        email: this.state.email,
        password: this.state.password
      }
      Auth.authenticate(
        data,
        () => {
          //this.props.router.push('/')            
          this.setState({redirectToReferrer: true})
          window.location.reload();              
          },
          (err) => alert(err)
        );
    }
  
    render() {
      const {from} = this.props.location.state || {from: {pathname : '/'}}
      const {redirectToReferrer} = this.state;

      if (redirectToReferrer) {
        return <Redirect to={from} />
      }
      return (
        <div className="Login">
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="email" bsSize="large">
              <ControlLabel>Email</ControlLabel>
              <FormControl
                autoFocus
                type="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="password" bsSize="large">
              <ControlLabel>Password</ControlLabel>
              <FormControl
                value={this.state.password}
                onChange={this.handleChange}
                type="password"
              />
            </FormGroup>
           
            <Button
              block
              bsSize="large"
              disabled={!this.validateForm()}
              type="submit"
            >
              Login
            </Button>
            
          </form>
        </div>
      );
    }
  }