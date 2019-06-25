import axios from 'axios';

import {CLEAR_PROFILE, DELETE_ACCOUNT, GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE} from "./types";
import {dispatchAlert} from "../utils/dispatchAlert";
import {setAlert} from "./alert";
// import {dispatchAlert} from "../utils/dispatchAlert";

//Get current user`s profile
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get('/api/profile/me');

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    // dispatchAlert(err.response.data.errors, dispatch);
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText, status: err.response.status
      }
    });
  }
};

// Create or update profile
export const createProfile = (formData, history, edit = false) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post('/api/profile', formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

    if (!edit) {
      history.push('/dashboard');
    }
  } catch (err) {
    dispatchAlert(err.response.data.errors, dispatch);
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText, status: err.response.status
      }
    });
  }
};

// Add experience
export const addExperience = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.put('/api/profile/experience', formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Experience Added', 'success'));

    history.push('/dashboard');

  } catch (err) {
    dispatchAlert(err.response.data.errors, dispatch);
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText, status: err.response.status
      }
    });
  }
};

// Add education
export const addEducation = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.put('/api/profile/education', formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Education Added', 'success'));

    history.push('/dashboard');

  } catch (err) {
    dispatchAlert(err.response.data.errors, dispatch);
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText, status: err.response.status
      }
    });
  }
};

// Delete experience
export const deleteExperience = (id) => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Experience Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText, status: err.response.status
      }
    });
  }
};

// Delete education
export const deleteEducation = (id) => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Education Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText, status: err.response.status
      }
    });
  }
};


// Delete account & profile
export const deleteAccount = () => async dispatch => {
  if (window.confirm('Are you sure? This can NOT undone!')) {
    try {
      await axios.delete(`/api/profile`);

      dispatch({
        type: CLEAR_PROFILE
      });
      dispatch({
        type: DELETE_ACCOUNT
      });

      dispatch(setAlert('Your Account Has Been PERMANENTLY Deleted', 'success'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response.statusText, status: err.response.status
        }
      });
    }
  }
};