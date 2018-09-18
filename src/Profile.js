import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Profile extends Component {
  render() {
    if(this.props.user){
      return (
          <div>
            <h2>Hello again, {this.props.user.name}!</h2>
            <h4>Your email is {this.props.user.email}</h4>
          </div>
        );
    }
    return(
      <Redirect to="/" />
    );
  }
}

export default Profile;
