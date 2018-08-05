import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from '../actions'

class Private extends Component {
  componentWillMount() {
   console.log(this.props.fetchMessage(),'this.props.fetchMessage()') 
    this.props.fetchMessage();
  }

  render() {
    console.log(this.props.message, 'this.props.messsage')
    return (
      <div>{this.props.message}</div>
    )
  }
}

function mapStateToProps(state) {
  return { message: state.auth.message };
}

export default connect(mapStateToProps, actions)(Private)