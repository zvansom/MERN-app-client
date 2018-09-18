import React, { Component } from "react";
import "./App.css";
import FormContainer from "./landingPage/FormContainer";
import Login from "./landingPage/Login";

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <FormContainer /> */}
        <Login />
      </div>
    );
  }
}

export default App;
