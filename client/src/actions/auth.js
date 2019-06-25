import axios from 'axios';
import {
  REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT,
  CLEAR_PROFILE
} from './types';
// import {setAlert} from "./alert";
import {setAuthToken} from '../utils/setAuthToken';
import {dispatchAlert} from "../utils/dispatchAlert";

//LOAD USER
export const loadUser = () => async dispatch => {
  if(localStorage.getItem('token')) {
    setAuthToken(localStorage.getItem('token'));
  }

  try{
    const res = await axios.get('/api/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  }catch(err){
    // dispatchAlert(err.response.data.errors, dispatch);
    dispatch({
      type: AUTH_ERROR
    });
  }
};

//REGISTER_USER
export const register = ({name, email, password}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({name, email, password});

  try{
    const res = await axios.post('/api/users', body, config);

    //register and get token
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });

    //  after token we have to authenticate user and get his data
    dispatch(loadUser());
  }catch(err){
    /* const errors = err.response.data.errors;
    if(errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }*/
    dispatchAlert(err.response.data.errors, dispatch);
    dispatch({
      type: REGISTER_FAIL
    });
  }
};

//LOGIN_USER
export const login = ({email, password}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({email, password});

  try{
    const res = await axios.post('/api/auth', body, config);

    // get token
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

  //  after token we have to authenticate user and get his data
    dispatch(loadUser());

  }catch(err){
    /* const errors = err.response.data.errors;
    if(errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }*/
    dispatchAlert(err.response.data.errors, dispatch);
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// Logout / Clear Profile
export const logout = () => async dispatch=> {
  dispatch({
    type: LOGOUT
  });dispatch({
    type: CLEAR_PROFILE
  });
};