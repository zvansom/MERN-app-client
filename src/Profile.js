import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import Accordion from "./components/Accordion";
import ProgressBar from "./components/ProgressBar";

class Profile extends Component {
  render() {
    if (this.props.user) {
      return (
        <div>
          <h2>Buy some new stocks!</h2>
          <ProgressBar workingCapital={110} portfolioTotal={90000} />
          <Accordion />
        </div>
      );
    }
    return <Redirect to="/" />;
  }
}

export default Profile;
