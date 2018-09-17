import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
//import Modal from 'react-modal';
import "./Profile.css";
import {Auth} from "./Routes";


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            isEditing: false
        };
        this.renderForm = this.renderForm.bind(this);
        this.toggleState = this.toggleState.bind(this);
        this.renderItem= this.renderItem.bind(this);
       // this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentWillMount() {
        const headers = { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + Auth.getToken()
        }
        fetch('api/users/me', {
            method: 'GET',
            headers: headers
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then((data) => {
            this.setState({user: data});
        }).catch(err => {
        console.log('caught it!',err);
        })
    }
    
    toggleState() {
        this.setState({
            isEditing:true
        })
    }

    handleSubmit = event => {
        event.preventDefault();
        var data = {
            
              bio:this.input.value,             
          }
          const headers = { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + Auth.getToken()
        }
          fetch("/api/users/me", {
             method: 'PUT',
             headers:headers,   
             body: JSON.stringify(data)                   
          }).then(function(response) {
              if (response.status >= 400) {
                  throw new Error("Bad response from server");
                }            
                return response.json();
            }).then(function(data) {
                window.location.href="/";
          }).catch(function(err) {
              console.log(err)            
          }); 
        } 
        

    renderForm() {
        let user = this.state.user;
        let content;
        //let content2;
        if(user) {
            content = <h2 key={user.username}>{user.username}</h2>
           // content2 = <p key={user.bio}>{user.bio}</p>
        }
        return (
            <div className="renderForm">
                {content}
               
            <form  onSubmit={this.handleSubmit}> 
                <textarea type="text" ref={(value) => { this.input = value }}  />
                <button  type="submit"> Save</button>
            </form>
            <form > 
                <button type="submit"> cancel</button>
            </form>
            </div>
        )
    }

    renderItem() {
        
        let user = this.state.user;
        let content1;
        let content2;
        if(user) {
            content1 = <h2 key={user.username}>{user.username}</h2>
            content2 = <p key={user.bio}>{user.bio}</p>
        } else {
            content1 = '';
            content2='';
        }
    
          return (
            <div className="Profile"> 
                {content1}            
                {content2}
                <button onClick={this.toggleState}>Edit Bio</button> 
            </div>             
          );
        }

   render() {
        const  isEditing  = this.state.isEditing;       
           return (
        <section>
            {
                isEditing ? this.renderForm() : this.renderItem()
            }                   
         </section>                  
      )
   }
}

export default Profile;


