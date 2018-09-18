import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import SERVER_URL from '../constants/server';

import SingleInput from "./SingleInput";
import SubmitButton from "../components/SubmitButton";
import styled from "styled-components";

class LoginPage extends Component {
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

    axios.post(SERVER_URL + '/auth/login', this.state)
    .then(result => {
      // Add the newly received token to LS
      localStorage.setItem('mernToken', result.data.token);
      // Update the user with a call to App.js
      this.props.updateUser();
    })
    .catch(err => {
      console.log('ERROR', err.response.data);
    });

    console.log(userform);
  };

  render() {
    if(this.props.user){
      return (<Redirect to="/profile" />);
    }
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
              inputType={"password"}
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

export default LoginPage;

const Logindiv = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
