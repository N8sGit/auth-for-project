import React, { Component } from 'react';
import Header from './header';
import Display from './schedule'
import {getCook} from '../utils';

const cookieValue = getCook('FOST');
export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      url: '',
      hasRegistered: false
    }
  }
  componentDidMount = () =>{
    if(cookieValue){
      this.setState({url: cookieValue, hasRegistered: true})
    }
  }

  componentWillMount = () => {
    if(cookieValue){
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
  else  return <Display url={url} /> 
  
  }
}
