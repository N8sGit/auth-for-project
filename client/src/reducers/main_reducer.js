import {
   EXECUTE_MAIN
    } from '../actions/types';
  
  export default function(state = {}, action) {
    switch(action.type) {
      case EXECUTE_MAIN:
        return { ...state, error: '', message: "hello from the main_reducer" };
    }
  
    return state;
  }