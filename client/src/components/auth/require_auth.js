import React, { Component } from 'react';
import { connect } from 'react-redux';

// Enhanced / Higher Order Component

export default function(ComposedComponent) {
  class Authentication extends Component {
   
    // componentWillMount() {
    //   if (!this.props.authenticated) {
    //     this.context.router.push('/')
    //   }
    // }

    // componentWillUpdate(nextProps) {
    //   // Updates when a component gets an updated set of props
    //   if (!nextProps.authenticated) {
    //     this.context.router.push('/')
    //   }
    // }

    render() {
     ''
    }
  }

  function mapStateToProps(state) {
    return { };
  }

  return connect(mapStateToProps)(Authentication);
}