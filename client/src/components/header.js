import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import axios from 'axios';
import Error from './error'
import NotFound from './notFound'
import Display from './schedule'
import {getCook} from '../utils'

// Container
class Header extends Component {

  constructor(props){
    super(props);
    this.state = {
      data: '',
      lastName: '',
      zip : '',
      url: '',
      submitErr : false,
      notFound: false
    }
  }


handleChange = (event) => {
  this.setState({lastName: event.target.value});
 }

 handleZip = (event) => {
  this.setState({zip: event.target.value})
 }

handleSubmit = () => {
  if(!this.state.lastName || !this.state.zip){
    this.setState({submitErr: true})
    return
  }
  
  axios.post('/', {message: 'this is data from the frontend', zip: this.state.zip, 
    lastName: this.state.lastName.toLowerCase().trim()}
  )
    .then( (response) => {
      if(response.data.url){
        this.setState({url: response.data.url})
        console.log(this.state.url, 'urel?');
       // this.props.updateParent()
         //window.location.href=response.data.url 
      }
      else {
        this.setState({notFound : true})
        return
      }
    })
      .catch(err => console.log(err + ' error detected inside submit request'))
  }

  
  renderLinks() {
      return <div>
          <form id='input-form' onSubmit={this.handleSubmit}>
              <label id='lastName'>
                Last Name:
                <input type="text" value={this.state.lastName} onChange={this.handleChange} />
              </label>
              <label>
                ZIP:
                <input  type='text' value = {this.state.zip} onChange={this.handleZip} />
              </label>
              <button id='input-button' type='button' onClick ={ () => { this.handleSubmit()} }> Confirm </button>
          </form>
          { this.state.submitErr ? <p className='submit-error'> Please enter a last name and ZIP code. </p> : '' }
          {this.state.notFound ? <p className = 'submit-error'> Attendee not found. Please try re-entering your info </p> : ''}
      </div>  
    
  }


  render() {
    console.log(this.state.notFound, this.state.submitErr);
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