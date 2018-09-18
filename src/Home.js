import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import FormContainer from './landingPage/FormContainer';

// TODO: rename SubmitButton component
import SubmitButton from './components/SubmitButton';

class Home extends Component {
  render() {
    if(this.props.user){
      return (<Redirect to="/profile" />);
    }
    return(
      <div className="page">
        <h2>Login now!</h2>
        <SubmitButton value='LOGIN'/>
        

        <FormContainer updateUser={this.props.updateUser} />
      </div>
      );
  }
}

export default Home;
