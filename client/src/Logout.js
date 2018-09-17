import React, { Component, Fragment } from 'react';
import Routes from "./Routes";


class Logout extends Component{
    componentWillMount(){
        localStorage.clear();
        window.location.href="/login" 

    }

    render(){
        return(
            <div>
                Now loggedOut
           </div>
        )
    }
}

export default Logout;