import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

// Container
class Header extends Component {
  
  renderLinks() {
  console.log(this.props.authenticated, 'this.props.authenticated');
    if (this.props.authenticated) {
      //I assume this.props.authenticated is just a boolian
      //after 
      // The user will either not see this view because they will be redirected 
      //to booms
      //OR
      // They will be taken inside this view component (TBD) which is simple display for
      //the attendee /w urls
      return (
        <div className='attendee-list'>
        <li className="nav-item">
          <Link className="nav-link" to="/signout">signout</Link>

          {/* This Link will eventually enter the /fetchURL route */}
        </li>
        </div>
       
      )
    } else {
      // Show a link to sign in or sign up
      return [
        // signing up is the input entry point here because the user must
        // only authenticate once
        <button type='submit'> 
        <li className="nav-item" key={1}>
          <Link className="nav-link" to="/signup">Get Schedule</Link>
        </li>
        </ button>        
      ]
    }
  }

  render() {
    console.log(this.renderLinks, 'renderlinks in return')
    return (
      <nav className="">
        <Link to="/" className="navbar-brand">Fost Scheduling Portal</Link>
        <ul className="nav navbar-nav">
          {this.renderLinks()}
        </ul>
      </nav>
    )
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps)(Header);