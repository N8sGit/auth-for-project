import React, { Component } from 'react';
import Header from './header';
import Display from './schedule'
import {getCook} from '../utils';
import axios from 'axios'


export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      url: '',
      source: {}
    }
  }

  checkCookie = () => {
    const cookieValue = getCook('FOST');
    if(cookieValue){
      this.setState({url : cookieValue})
    }
  }

  getSource = () => {
    const cookieValue = getCook('FOST')
    if(!cookieValue){
      return 
    }
    else axios.post('/source', { url: cookieValue})
      .then((response) =>{
        this.setState({source: response.data.source})
      })
  }

  componentDidMount () {
    this.getSource()
    this.checkCookie()
  }

    render() {
    let url = this.state.url
    let source = this.state.source
    console.log(this.state.source)
    console.log(this.state.source);
   if(!url) {
    return (
      <div>
        <Header checkCookie = {this.checkCookie} />
        {this.props.children}
      </div>
    )
  } 
  else if(source.hasOwnProperty('email'))  return <Display url = {url} source = {source} email = {source.email} /> 
  
  }
}
