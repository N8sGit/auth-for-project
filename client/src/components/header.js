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
      lastname: 'amme',
      DOB : '',
      hasRegistered: false 
    }
    // this.handleChange.bind(this)
    // this.handleSubmit.bind(this)
  }

  componentDidMount(){
  
    // axios.get(`http://localhost:3090/`)
    //   .then(res => {
    //   console.log(res);
    //   console.log('promise entered');
    //   }) 
    //     .catch(err => console.log(err + ' error detected inside componentDidMount promise'))

}


handleChange = (event) => {
  console.log('handleChange fired!');
  this.setState({lastname: event.target.value});
  console.log(this.state.lastname, 'lastname updated');
 }

handleSubmit = () => {
  console.log('submit fired!');
  if(!this.state.lastname){
    alert('Please submit a last name')
  }
  axios.post('http://localhost:3090/', {message: 'this is data from the frontend', lastname: this.state.lastname.toLowerCase().trim()})
    .then( (response) => {
      console.log(response.data.url)
    if(response.data.url){
       window.location.href=response.data.url 
    }
    console.log(response, 'server response');
    console.log('submit completed! Check out this redirect!');
  })
      .catch(err => console.log(err + ' error detected inside submit request'))
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
        <button type='button' onClick ={ () => { this.handleSubmit()} }> Confirm </button> 
    
    
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