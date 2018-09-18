import React, { Component } from "react";
import SingleInput from "./SingleInput";
import SubmitButton from "../components/SubmitButton";
import styled from "styled-components";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleEmailChange = e => {
    this.setState({ email: e.target.value });
  };
  handlePasswordChange = e => {
    this.setState({ password: e.target.value });
  };

  handleFormSubmit = e => {
    // submit logic goes here
    e.preventDefault();
    const userform = {
      email: this.state.email,
      password: this.state.password
    };

    console.log(userform);
  };

  render() {
    return (
      <Logindiv className="login-page">
        <form className="login-container" onSubmit={this.handleFormSubmit}>
          <div className="login-form">
            <SingleInput
              inputType={"text"}
              name={"email"}
              controlFunc={this.handleEmailChange}
              content={this.state.email}
              placeholder={"Email"}
            />
            <SingleInput
              inputType={"text"}
              name={"password"}
              controlFunc={this.handlePasswordChange}
              content={this.state.password}
              placeholder={"Password"}
            />
          </div>
          <SubmitButton value="LogIn" />
        </form>
      </Logindiv>
    );
  }
}

export default Login;

const Logindiv = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
