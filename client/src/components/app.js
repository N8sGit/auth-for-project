import React, { Component } from 'react';
import Header from './header';
import Display from './schedule'
import {getCook} from '../utils';


export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      url: '',
    }
  }

  checkCookie = () => {
    const cookieValue = getCook('FOST');
    if(cookieValue){
      this.setState({url : cookieValue})
    }
  }

  componentDidMount () {
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
