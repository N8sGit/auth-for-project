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
      DOB : ''
    }
  }

  componentDidMount(){
    
    axios.get('http://localhost:3090/main', function(){})
      .then(res =>{
        console.log(res);
      })
    
    axios.get(`http://localhost:3090/`)
      .then(res => {
      console.log(res);
      console.log('promise entered');
      }) 
        .catch(err => console.log(err + 'error detected inside componentDidMount promise'))

}
handleChange(event) {
  this.setState({lastname: event.target.value});
}

handleSubmit(){
  axios.get('http://localhost:3090/main', function(req, res){
    let lastname = this.state.lastname
    let packet
    if(!lastname){
      alert('Please enter your last name')
    }
    else packet = {message: 'Greetings from the frontend', content: lastname}
    req.body = packet
    return res
  })
    .then(function(response){
      console.log(response);
      this.setState({data: response.url})
    })
      .catch(err => console.log(err + 'error detected inside submit request'))
}

  
  renderLinks() {
     {
      // Show a link to sign in or sign up
      return [
        // signing up is the input entry point here because the user must
        // only authenticate once
        //button also needs to submit values for the Last Name and DOB
  <div>
      <form onSubmit={this.handleSubmit}>
        <label>
          Last Name:
          <input type="text" value={this.state.lastname} onChange={this.handleChange} />
        </label>
        <button type='submit' onSubmit={this.handleSubmit}>
        <input type="submit" value="Submit" />
        </button> 
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