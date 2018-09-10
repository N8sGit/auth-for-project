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
      lastname: '',
      zip : '',
      notFound: '',
      url: ''

    }
  }

  // componentDidMount = () =>{
  //   if(cookieValue){
  //     console.log('hi');
  //     this.setState({url: cookieValue})
  //     location.reload()
  //   }
  // }


handleChange = (event) => {
  this.setState({lastname: event.target.value});
 }

 handleDate = (event) => {
  this.setState({zip: event.target.value})
 }

handleSubmit = () => {
  if(!this.state.lastname || !this.state.zip){
    alert('Please submit a last name and date of birth')
  }
  
  axios.post('/', {message: 'this is data from the frontend', zip: this.state.zip, 
    lastname: this.state.lastname.toLowerCase().trim()}
  )
    .then( (response) => {
      if(response.data.url){
        this.setState({url: response.data.url})
        this.props.updateParent()
         //window.location.href=response.data.url 
      }
      else {
        this.setState({notFound : response.data.notFound})
      }
    })
      .catch(err => console.log(err + ' error detected inside submit request'))
  }

  
  renderLinks() {
      return <div>
          <form id='input-form' onSubmit={this.handleSubmit}>
              <label id='lastname'>
                Last Name:
                <input type="text" value={this.state.lastname} onChange={this.handleChange} />
              </label>
              <label>
                ZIP:
                <input  type='date' value = {this.state.zip} onChange={this.handleDate} />
              </label>
              <button id='input-button' type='button' onClick ={ () => { this.handleSubmit()} }> Confirm </button> 
          </form>
      </div>  
    
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