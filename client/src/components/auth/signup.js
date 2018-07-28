import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';

console.log(actions, 'actions on signup.js')
// executeMain is the post request containing the data payload to go to the sevrver response Main

// this is the redux form Jon mentioned. 

//renderField is the main entry point to the React Form. This will have to be retrofitted to our purposes.
const renderField = ({ input, label, type, meta: { touched, error, warning } }) =>{ 
  //the renderfield input is possibly an essential element to the problem
  console.log(input, 'renderField input')
  (
  <fieldset className="form-group">
    <label htmlFor={input.name}>{label}</label>
    <input className="form-control" {...input} type={type}/>
    { touched && error && <span className="text-danger">{this.props.errorMessage}</span> }
  </fieldset>
  )
}

class Signup extends Component {
  handleFormSubmit(values) {
    // Call action creator to sign up the user
    //this is a redux route that will not need to be utilized,
    //or possibly it can be retooled to hand off the main call to the backend
    console.log(value, 'handleFormSubmit value inside signup.js')
    //executeMain should be on the props of this component, because it is being exported at the same location in actions, 
    //unless a redux link is missing
    this.props.executeMain(values)
  }

  renderAlert() {
    let testMessage = 'this is a test error message'
    if (this.props.errorMessage) {
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
        <Field name="name" component={renderField} label="Your Name"/>
        {this.renderAlert()}
        <button type="submit" className="btn btn-primary btn-confirm btn-confirm">Confirm</button>
      </form>
    )
  }
}

function validate(values) {
  const errors = {};

  // Condense with 4each
  if (!values.name) {
    errors.name = 'Please enter a name'
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