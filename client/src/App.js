import React, {Fragment, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import {Provider} from 'react-redux';
import store from './store';

import PrivateRoute from './routing/PrivateRoute';

import NavBar from './componets/layout/Navbar';
import Landing from './componets/layout/Landing';
import Register from './componets/auth/Register';
import Login from './componets/auth/Login';
import Dashboard from './componets/dashboard/Dashboard';
import CreateProfile from './componets/profile-forms/CreateProfile';
import EditProfile from './componets/profile-forms/EditProfile';
import AddExperience from './componets/profile-forms/AddExperience';
import AddEducation from './componets/profile-forms/AddEducation';

import Alert from './componets/layout/Alert';

import {setAuthToken} from "./utils/setAuthToken";
import {loadUser} from "./actions/auth";

import './App.css';

if (localStorage.getItem('token')) {
  setAuthToken(localStorage.getItem('token'));
}

const App = () => {

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <NavBar/>
          <Route exact path="/" component={Landing}/>
          <section className="container">
            <Alert/>
            <Switch>
              <Route exact path="/register" component={Register}/>
              <Route exact path="/login" component={Login}/>
              <PrivateRoute exact path="/dashboard" component={Dashboard}/>
              <PrivateRoute exact path="/create-profile" component={CreateProfile}/>
              <PrivateRoute exact path="/edit-profile" component={EditProfile}/>
              <PrivateRoute exact path="/add-experience" component={AddExperience}/>
              <PrivateRoute exact path="/add-education" component={AddEducation}/>
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  )
}

export default App;
