import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import decode from 'jwt-decode';
//import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Profile from "./Profile";
import Logout from "./Logout";

export const Auth = {
    // isAuthenticated: false,
    isLogin() {
       return localStorage.getItem('id_token');
       
    },
    authenticate(data, callback, error) {
        fetch("/api/users/login", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(function(response) {
            if (response.status >= 400) {
                response.json().then(res => error(res.error));
                return;
            }
            response.json().then(res => {
                localStorage.setItem('id_token', res.token);
                    callback();                
            });
            // return response.json();
        }).catch(function(err) {
            console.log(err);
            error(err);
        });
        // this.isAuthenticated = true;
        // setTimeout(cb, 100); // fake async
    },
    setToken(idToken) {
        // Saves user token to localStorage
        localStorage.setItem('id_token', idToken)
    },

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token')
    }
  };

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        Auth.isLogin() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );

export default () =>
<Switch>
    <PrivateRoute path="/" exact component={Profile} />;
    <Route path="/Login" exact component={Login} />;
    <Route path="/Register" exact component={Register} />;
    <Route path="/Profile" exact component={Profile} />;
    <Route path="/Logout" exact component={Logout} />
</Switch>


