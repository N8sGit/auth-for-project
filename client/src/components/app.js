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
      console.log(this.state, 'state in check cookie')
    }
  }

  getSource = (cookieValue) => {
    axios.post('/source', { url: cookieValue})
    .then((response) =>{
      let state = this.state
      state.source = response.data.source
      this.setState({state})
      console.log(this.state.source, 'source in getsource');
    })
  }

  // componentWillMount(){
  //   let cookieValue = getCook('FOST')
  //   this.getSource()
  // }

  componentWillUpdate(nextProps,nextState){
    console.log(nextState, 'next State');
  }

  componentDidMount () {
    console.log(this.state, 'state in didmount');
    console.log(this.state.source, 'source in didMount');
    this.checkCookie()
    console.log(this.state, 'state in didmount');
  }

    render() {
    console.log('render hit');
    let url = this.state.url
    let source = this.state.source
   console.log(source, 'source in render');
   if(url && source) {
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
 