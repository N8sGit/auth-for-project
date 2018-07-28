import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import auth from './auth_reducer';
import main from './main_reducer'

const rootReducer = combineReducers({
  form, main
});

export default rootReducer;
