import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
//import { LinkContainer } from "react-router-bootstrap";
import "./Register.css";

export default class Register extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        newUser: null        
      };
      this.handleSubmit = this.handleSubmit.bind(this)
    }
  
    validateForm() {
      return this.state.email.length > 0 && this.state.password.length > 0 && this.state.password === this.state.confirmPassword;
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
            username: this.state.username,
            password: this.state.password,
            
        }
        
        fetch("/api/users/register", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
              }            
            return response.json();
        }).then(function(data) {
            window.location.href="/login";
        }).catch(function(err) {
            console.log(err)            
        }); 
      } 
      
          
  
    render() {
      return (
        <div className="Register">
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
              <FormGroup controlId="username" bsSize="large">
              <ControlLabel>Username</ControlLabel>
              <FormControl
                autoFocus
                type="username"
                value={this.state.username}
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
            <FormGroup controlId="confirmPassword" bsSize="large">
             <ControlLabel>Confirm Password</ControlLabel>
             <FormControl
               value={this.state.confirmPassword}
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
              Register               
            </Button>
                           
          </form>
        </div>
      );
    }
  }