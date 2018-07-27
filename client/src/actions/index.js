import axios from 'axios';
import { browserHistory } from 'react-router';
//this browser history featuer may be a problem
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_MESSAGE } from './types';

const ROOT_URL = 'http://localhost:3090';

//theoretically nothing here in signup user should actually ever fire







export function signinUser({ name }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signin`, { name})
      .then(response => {
        // If request is goood...
        // - Update state to indicate the user is authenticated
        dispatch({ type: AUTH_USER });
        // - Save the JWT token
        localStorage.setItem('token', response.data.token);
        // - Redorect to the protected route
        browserHistory.push('/private');
      })
      .catch(() => {
        // If request is bad...
        // - Show an error to the user
        dispatch(authError('Incorrect name'))
      });
  }
}

export function signupUser({ name }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signup`, { name })
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/private')
      })
      .catch(error => dispatch(authError(error.response.data.error)));
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function signoutUser() {
  localStorage.removeItem('token');
  return { type: UNAUTH_USER };
}

export function fetchMessage() {
  return function(dispatch) {
    axios.get(ROOT_URL, {
      headers: { authorization: localStorage.getItem('token') }
    }).then(response => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message
        })
      });
  }
}