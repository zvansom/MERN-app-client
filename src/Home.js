import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import NewUserForm from "./landingPage/NewUserForm";

class Home extends Component {
  render() {
    if (this.props.user) {
      return <Redirect to="/profile" />;
    }
    return (
      <div className="content">
        <h2>Login now!</h2>
        <a href="/login">Login</a>
        <NewUserForm updateUser={this.props.updateUser} />
      </div>
    );
  }
}

export default Home;


