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
    // this.handleChange.bind(this)
    // this.handleSubmit.bind(this)
  }

  componentDidMount(){
  
    axios.get(`http://localhost:3090/`)
      .then(res => {
      console.log(res);
      console.log('promise entered');
      }) 
        .catch(err => console.log(err + 'error detected inside componentDidMount promise'))

}


handleChange = (event) => {
  console.log('handleChange fired!');
  this.setState({lastname: event.target.value});
  console.log(this.state.lastname, 'lastname updated');
 }

handleSubmit = () => {
  console.log('submit fired!');
  if(!this.state.lastname){
    alert('please submit a last name')
  }
  axios.post('http://localhost:3090/', function(req, res){
    let lastname = this.state.lastname
    let packet
    if(lastname){ packet = {message: 'Greetings from the frontend', lastname: lastname}
      req.body = packet
  }
  else prompt('Please enter your details.') 
  return res
  })
    .then(function(response){
      console.log(response, 'backend resposne');
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
        <button type='button' onClick ={ () => { this.handleSubmit} }> Confirm </button> 
    
    
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