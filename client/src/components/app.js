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
    }
  }

  componentWillMount = () => {
    console.log('will mount');
    if(cookieValue){
      this.setState({url: cookieValue})
    }
  }

  componentDidMount = () => {
    console.log('did mount');
    if(cookieValue){
      this.setState({url: cookieValue})
    }
  }

  componentDidUpdate = () =>{
    console.log('did update');
   if(this.state.url) this.setState({url: cookieValue})
  }

  updateParent = () => {
    if(cookieValue){
      this.setState({url : cookieValue})
    }
  }

    render() {
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
