import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component {
  handleLogout = (e) => {
    // ! Testing console log
    console.log('logging out...');
    e.preventDefault();
    localStorage.removeItem('mernToken');
    this.props.updateUser();
  }

  render() {
    let links = '';
    if(this.props.user){
      links = (
          <span>
            <a onClick={this.handleLogout}>Logout</a>
            <Link to="/profile">Profile</Link>
          </span>
        );
    }
    else {
      links = (
          <span>
            <Link to="/login">Log In</Link>
          </span>
        );
    }
    return(
        <div>
          <nav className="nav">
            <Link to="/">Home</Link>
            {links}
          </nav>
        </div>
      );
  }
}

export default Nav;
