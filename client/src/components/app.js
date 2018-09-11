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

  updateParent = () => {
    const cookieValue = getCook('FOST');
    if(cookieValue){
      this.setState({url : cookieValue})
    }
  }

    render() {
      console.log(this.state.url);
    let url = this.state.url
   if(!url) {
    return (
      <div>
        <Header updateParent = {this.updateParent} />
        {this.props.children}
      </div>
    )
  } 
  else  return <Display url={url} /> 
  
  }
}
