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
    let cookieValue = getCook('FOST');
   
    if(cookieValue){
      this.getSource(cookieValue)
      this.setState({url : cookieValue})
    }
  }

  getSource = (cookieValue) => {
    axios.post('/source', { url: cookieValue})
    .then((response) =>{
      let state = this.state
      state.source = response.data.source
      this.setState({state})
    })
  }

  componentWillUpdate(nextProps,nextState){
    console.log(nextState, 'next State');
  }

  componentDidMount () {
    this.checkCookie()
  }

    render() {
    let url = this.state.url
    let source = this.state.source
   if(url && source.lastName) {
    return (
       <Display url = {url} source = {source} /> 
    )
  } 
    else {
      return (
      <div id='background'>
      <Header checkCookie = {this.checkCookie.bind(this)} />
      {this.props.children}
      </div> 
      )
    }
  }
}
 