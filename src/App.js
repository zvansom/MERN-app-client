// Import package depenedencies
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";

// Import local dependencies
import { SERVER_URL } from "./constants/globals";

//  Import styles
import "./App.css";

// Import Components
import LoginPage from "./landingPage/LoginPage";
// import ProgressBar from "./components/ProgressBar";

import Footer from "./layout/Footer";
import Home from "./Home";
import Nav from "./layout/Nav";
import Profile from "./Profile";

class App extends Component {
  state = {
    user: null,
    checkLogin: false
  };

  componentDidMount = () => {
    this.getUser();
  };

  // TODO: Break this function out to a seperate js file.
  getUser = () => {
    const token = localStorage.getItem("mernToken");
    if (token) {
      // ! testing console log
      console.log("token found in LS", token);
      // There is a token in localStorage. Try to validate it!
      axios
        .post(SERVER_URL + "/auth/me/from/token", {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
          // ! testing console log
          //console.log("SUCCESS", response);
          this.setState({
            user: response.data.user,
            checkLogin: true
          });
        })
        .catch(err => {
          console.log("ERROR", err);
          console.log("response", err.response);
          localStorage.removeItem("mernToken");
          this.setState({
            user: null,
            checkLogin: true
          });
        });
    } else {
      // ! testing console log
      // TODO: Make pretty alert to user to re-login
      console.log("No token was found");
      this.setState({
        user: null,
        checkLogin: true
      });
    }
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Nav user={this.state.user} updateUser={this.getUser} />
          <div className="container">
            <Switch>
              <Route
                exact
                path="/"
                component={() => (
                  <Home user={this.state.user} updateUser={this.getUser} />
                )}
              />
              <Route
                path="/login"
                component={() => (
                  <LoginPage user={this.state.user} updateUser={this.getUser} />
                )}
              />
              <Route
                path="/profile"
                component={() => (
                  <Profile
                    user={this.state.user}
                    checkLogin={this.state.checkLogin}
                  />
                )}
              />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
