import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';


const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <fieldset className="form-group">
    <label htmlFor={input.name}>{label}</label>
    <input className="form-control" {...input} type={type}/>
    { touched && error && <span className="text-danger">{error}</span> }
  </fieldset>
)

class Signup extends Component {
  handleFormSubmit(values) {
    // Call action creator to sign up the user
    console.log(values)
    this.props.signupUser(values);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      console.log(this.props.errorMessage)
      return (
        <div className="alert alert-danger" role="alert">
           {this.props.errorMessage}
        </div>
      )
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field name="email" component={renderField} type="email" label="Email"/>
        {this.renderAlert()}
        <button type="submit" className="btn btn-primary btn-confirm btn-confirm">Confirm</button>
      </form>
    )
  }
}

function validate(values) {
  const errors = {};

  // Condense with 4each
  if (!values.email) {
    errors.email = 'Please enter an email'
  }
  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error }
}

const reduxFormSignUp = reduxForm({
  form: 'signup',
  validate
})(Signup)

export default connect(mapStateToProps, actions)(reduxFormSignUp);