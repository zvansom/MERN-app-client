import React, { Component } from 'react';
import FormContainer from './landingPage/FormContainer';

// TODO: rename SubmitButton component
import SubmitButton from './components/SubmitButton';

class Home extends Component {
  render() {
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
