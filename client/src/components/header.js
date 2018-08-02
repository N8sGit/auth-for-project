import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import axios from 'axios';


// Container
class Header extends Component {

  constructor(props){
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount(){
    axios.get(`/main`, function(req, res){
      console.log(req || null , res || null);
  })
  .then(res => {
    console.log('Contact with server confirmed');
    console.log(res, 'res?');
    console.log(res.message, 'message?')
    if(!res.message) console.log('response message missing!')
  }) 
    .catch(err => console.log(err + 'error detected inside axios promise'))
}

  
  renderLinks() {
     {
      // Show a link to sign in or sign up
      return [
        // signing up is the input entry point here because the user must
        // only authenticate once
        //button also needs to submit values for the Last Name and DOB
        <button type='submit' onClick = { () =>{
            axios.get('/main', function(req, res){
              console.log(res.message, 'message on click?')
            })
        }} > 
        <li className="nav-item" key={1}>
          {/* <Link className="nav-link" to="/main">Get Schedule</Link> */}
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
  
  };
}

export default connect(mapStateToProps)(Header);