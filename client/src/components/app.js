import React, { Component } from 'react';
import Header from './header';
import Display from './schedule'
import {getCook} from '../utils';

export default class App extends Component {
  constructor(){
    this.state = {
      url: ''
    }
  }
  componentWillMount = () => {
    const cookieValue = getCook('FOST');
    if(cookieValue){
      console.log(cookieValue, 'cookie valu eat header.js component will mount');
      this.setState({url: cookieValue})
    }
  }
    render() {
    let url = this.state.url
   if(!url) {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    )
  }
  
  else { return <Display url={url} /> }
  
  }
}
