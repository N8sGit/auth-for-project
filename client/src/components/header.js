import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import axios from 'axios';
import Display from './schedule'
import {getCook} from '../utils'

// Container
class Header extends Component {

  constructor(props){
    super(props);
    this.state = {
      data: '',
      lastName: '',
      firstName : '',
      url: '',
      submitErr : false,
      notFound: false
    }
  }


handleChange = (event) => {
  this.setState({lastName: event.target.value});
 }

 handleZip = (event) => {
  this.setState({firstName: event.target.value})
 }

handleSubmit = () => {
  if(!this.state.lastName || !this.state.firstName){
    this.setState({submitErr: true})
    return
  }
  
  axios.post('/', {message: 'this is data from the frontend', zip: this.state.firstName, 
    lastName: this.state.lastName.toLowerCase().trim()}
  )
    .then( (response) => {
      if(response.data.url){
        this.setState({url: response.data.url})
       this.props.checkCookie()
      }
      else {
        this.setState({notFound : true})
      }
    })
      .catch(err => console.log(err + ' error detected inside submit request'))
  }

  
  renderLinks() {
      return <div  >
      
          <form id='input-form' onSubmit={this.handleSubmit}>
              <label id='lastName'>
                Last Name:
                <input type="text" value={this.state.lastName} onChange={this.handleChange} />
              </label>
              <label>
                firstName:
                <input  type='text' value = {this.state.firstName} onChange={this.handleZip} />
              </label>
              <button id='input-button' type='button' onClick ={ () => { this.handleSubmit()} }> Confirm </button>
          </form>
          { this.state.submitErr ? <p className='submit-error'> Please enter a last name and ZIP code. </p> : '' }
          {this.state.notFound ? <p className = 'submit-error'> Attendee not found. Please try re-entering your info </p> : ''}
      </div>  
    
  }


  render() {
    return (
    <div>
        <nav className="">
          <h1 to="/" className="navbar-brand">Fost Scheduling Portal</h1>
          <ul className="nav navbar-nav">
            {this.renderLinks()}
          </ul>
        </nav>
    
    <div >
      <h1> One-time Schedule Verification </h1>
      <p> </p>
      <p> To obtain your schedule please enter your first and last name </p> 
      <p> If you do not see results immediately, wait 20 seconds for the schedule data to load </p>
      <p> You will then be redirected to your schedule </p>
      
    </div>
  
  </div>
      )
  }
}

export default connect()(Header);