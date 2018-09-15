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

  getSource = () =>{
    const cookieValue = getCook('FOST')
    if(!cookieValue){
      return 
    }
    axios.post('/source', { url: cookieValue})
      .then((response) =>{
        console.log(response.data, 'source response data');
        this.setState({source: response.data.source})
      })
  }

  componentDidMount () {
    this.getSource()
    this.checkCookie()
  }

    render() {
    let url = this.state.url
   if(!url) {
    return (
      <div>
        <Header checkCookie = {this.checkCookie} />
        {this.props.children}
      </div>
    )
  } 
  else  return <Display url={url} /> 
  
  }
}
