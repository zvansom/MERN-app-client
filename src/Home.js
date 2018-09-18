import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import FormContainer from './landingPage/FormContainer';

class Home extends Component {
  render() {
    if(this.props.user){
      return (<Redirect to="/profile" />);
    }
    return(
      <div className="page">
        <h2>Login now!</h2>
        <a href='/login'>Login</a>
        

        <FormContainer updateUser={this.props.updateUser} />
      </div>
      );
  }
}

export default Home;
