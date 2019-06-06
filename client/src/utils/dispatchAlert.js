import {setAlert} from "../actions/alert";

export const dispatchAlert = (errors, dispatch) => {
  if(errors) {
    errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
  }
};