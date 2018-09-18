import React, { Component } from "react";
import SingleInput from "./SingleInput";
import SubmitButton from "../components/SubmitButton";
import LoginButton from "../components/LoginButton";

class FormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      image: ""
    };
  }
  componentDidMount() {
    // fetch("./fake_db.json")
    //   .then(res => res.json())
    //   .then(data => {
    //     this.setState({
    //       firstName: data.firstName,
    //       lastName: data.lastName,
    //       email: data.email,
    //       password: data.password,
    //       image: data.image
    //     });
    //   });
  }

  handleFormSubmit = e => {
    // submit logic goes here
    e.preventDefault();

    const userform = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      image: this.state.image
    };

    console.log(userform);
  };

  handleClearForm = e => {
    // clear form logic goes here
    e.preventDefault();
    this.setState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      image: ""
    });
  };

  handleFirstNameChange = e => {
    this.setState({ firstName: e.target.value });
  };
  handleLastNameChange = e => {
    this.setState({ lastName: e.target.value });
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
      <div className="container">
        {/* <LoginButton /> */}
        <form className="form-container" onSubmit={this.handleFormSubmit}>
          <h3>Sign up for your free account</h3>
          <div className="full-name">
            <SingleInput
              inputType={"text"}
              name={"firstName"}
              controlFunc={this.handleFirstNameChange}
              content={this.state.firstName}
              placeholder={"First Name"}
              width={"true"}
            />
            <SingleInput
              inputType={"text"}
              name={"lastName"}
              controlFunc={this.handleLastNameChange}
              content={this.state.lastName}
              placeholder={"Last Name"}
              width={"true"}
            />
          </div>
          <div className="login-password">
            <SingleInput
              inputType={"text"}
              name={"email"}
              controlFunc={this.handleEmailChange}
              content={this.state.email}
              placeholder={"Email"}
              width={"true"}
            />
            <SingleInput
              inputType={"password"}
              name={"password"}
              controlFunc={this.handlePasswordChange}
              content={this.state.password}
              placeholder={"Password"}
              width={"true"}
            />
          </div>
          <div className="profile-image">
            <SingleInput
              inputType={"text"}
              name={"image"}
              controlFunc={this.handleImageChange}
              content={this.state.image}
              placeholder={"Profile Image"}
              width={"false"}
            />
          </div>
          <SubmitButton value="Create Acount" />
        </form>
        <div>
          <p>
            By creating an acount you agree to our <u>terms of service</u>{" "}
          </p>
        </div>
      </div>
    );
  }
}

export default FormContainer;
