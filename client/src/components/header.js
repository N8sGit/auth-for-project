import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import axios from 'axios';


// Container
class Header extends Component {

  constructor(props){
    super(props);
    this.state = {
      data: '',
      lastname: '',
      dob : '',
      hasRegistered: false 
    }
    // this.handleChange.bind(this)
    // this.handleSubmit.bind(this)
  }


handleChange = (event) => {
  this.setState({lastname: event.target.value});
 }

 handleDate = (event) => {
  this.setState({dob: event.target.value})
 }

handleSubmit = () => {
  console.log('submit fired!');
  if(!this.state.lastname || !this.state.dob){
    alert('Please submit a last name and date of birth')
  }
  axios.post('http://localhost:3090/', {message: 'this is data from the frontend', dob: this.state.dob.replace('/','-'), 
  lastname: this.state.lastname.toLowerCase().trim()}
  )
    .then( (response) => {
      console.log(response.data.url)
    if(response.data.url){
       window.location.href=response.data.url 
    }
    console.log(response, 'server response');
  })
      .catch(err => console.log(err + ' error detected inside submit request'))
}

  
  renderLinks() {
     {
      // Show a link to sign in or sign up
      return [
        // signing up is the input entry point here because the user must
        // only authenticate once
        //button also needs to submit values for the Last Name and dob
  <div>
      <form id='input-form' onSubmit={this.handleSubmit}>
        <label id='lastname'>
          Last Name:
          <input type="text" value={this.state.lastname} onChange={this.handleChange} />
        </label>
        <label>
          DOB:
          <input  type='date' value= {this.state.dob} onChange={this.handleDate} />
        </label>
        <button id='input-button' type='button' onClick ={ () => { this.handleSubmit()} }> Confirm </button> 
    
    
    </form>
  </div>      
      ]
    }
  }

  render() {
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
  
  };
}

export default connect(mapStateToProps)(Header);