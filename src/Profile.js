import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import {SERVER_URL} from './constants/globals';
import Accordion from './components/Accordion';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      porfolio: [],
      workingCap: null,
    }
  }

  // componentDidMount() {
  //   console.log('id', this.props.user.id)
  //   const url = `${SERVER_URL}/users/${this.props.user.id}`
  //   console.log('url', url);
  //   axios.get(url).then(response => console.log('response', response));
  // }

  render() {
    if(this.props.user){
      return (
          <div>
            <h2>Buy some new stocks!</h2>
            <Accordion /> 
          </div>
        );
    }
    return(
      <Redirect to="/" />
    );
  }
}

export default Profile;
