import React, { Component } from "react";
import styled from 'styled-components';
import SubmitButton from "../components/SubmitButton";
import InputField from '../components/InputField';

import axios from 'axios';

import { SERVER_URL, STARTING_CAPITAL } from '../constants/globals';

class FormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      image: "",
      workingCapital: STARTING_CAPITAL,
    };
  }

  handleFormSubmit = e => {
    // submit logic goes here
    e.preventDefault();
    console.log(this.state);

    axios.post(SERVER_URL + '/auth/signup', this.state)
    .then(result => {
      console.log('SUCCESS!', result);
      // Add the newly received token to LS
      localStorage.setItem('mernToken', result.data.token);
      // Update the user with a call to App.js
      this.props.updateUser();
    })
    .catch(err => {
      console.log('ERROR', err);
    }); 

    this.handleClearForm();
    // console.log(userform);
  };

  handleClearForm = e => {
    // clear form logic goes here
    this.setState({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      image: ""
    });
  };

  handleFirstNameChange = e => {
    this.setState({ firstname: e.target.value });
  };
  handleLastNameChange = e => {
    this.setState({ lastname: e.target.value });
  };
  handleEmailChange = e => {
    this.setState({ email: e.target.value });
  };
  handlePasswordChange = e => {
    this.setState({ password: e.target.value });
  };
  handleImageChange = e => {
    this.setState({ image: e.target.value });
  };

  render() {
    return (
      <StyledForm onSubmit={this.handleFormSubmit}>
        <h3>Sign up for your free account</h3>
          <InputField
            inputType={"text"}
            name={"firstname"}
            controlFunc={this.handleFirstNameChange}
            content={this.state.firstname}
            placeholder={"First Name"}
            width={"true"}
          />
          <InputField
            inputType={"text"}
            name={"lastname"}
            controlFunc={this.handleLastNameChange}
            content={this.state.lastname}
            placeholder={"Last Name"}
            width={"true"}
          />
          <InputField
            inputType={"text"}
            name={"email"}
            controlFunc={this.handleEmailChange}
            content={this.state.email}
            placeholder={"Email"}
            width={"true"}
          />
          <InputField
            inputType={"password"}
            name={"password"}
            controlFunc={this.handlePasswordChange}
            content={this.state.password}
            placeholder={"Password"}
            width={"true"}
          />
          <InputField
            inputType={"text"}
            name={"image"}
            controlFunc={this.handleImageChange}
            content={this.state.image}
            placeholder={"Profile Image"}
            width={"false"}
          />
        <SubmitButton value="Create Acount" />
      </StyledForm>
    );
  }
}

export default FormContainer;

const StyledForm = styled.form`
  margin: 30px auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

@media (min-width: 768px){
  grid-template-columns: 1fr 1fr;
  > h3 {
    grid-column: span 2;
  }

  > input:last-of-type {
    grid-column: span 2;
  }
  
  > button {
    grid-column: span 2;
  }
}

`;