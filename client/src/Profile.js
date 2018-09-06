import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
//import Modal from 'react-modal';
import "./Profile.css";
import {Auth} from "./Routes";
import UpdateItem from "./UpdateItem";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {user: null};
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

    handleSubmit = event => {
        event.preventDefault();
         this.setState({edit: true});
          }
   render() {
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

        let edit = <div></div>
        if(this.state.edit){
            edit = <UpdateItem user={content2}/>
        }
      return (
        <div className="Profile"> 
            {content1}
        
            {content2}
            <button onClick={this.handleSubmit}>Edit</button>
            {edit}
          
         </div>
         
      );
   }
}
export default Profile;