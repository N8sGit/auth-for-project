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
      this.getSource(cookieValue)
      this.setState({url : cookieValue})
    }
  }

  getSource = (cookieValue) => {
     axios.post('/source', { url: cookieValue})
      .then((response) =>{
        this.setState({source: response.data.source})
        console.log(this.state.source);
      })
  }

  componentDidMount () {
    console.log(this.state, 'state in didmount');
    this.checkCookie()
  }

    render() {
    console.log('render hit');
    let url = this.state.url
    let source = this.state.source
   console.log(source, 'source in render');
   if(!url) {
    return (
      <div id='background'>
        <Header checkCookie = {this.checkCookie.bind(this)} />
        {this.props.children}
      </div>
    )
  } 
  else if(source.email)  return <Display url = {url} source = {source} email = {source.email} /> 
  
  }
}