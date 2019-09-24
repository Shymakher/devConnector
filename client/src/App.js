import React, {Fragment, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import {Provider} from 'react-redux';
import store from './store';

import PrivateRoute from './routing/PrivateRoute';

import TestComponent from './componets/TestComponent';
import NavBar from './componets/layout/Navbar';
import Landing from './componets/layout/Landing';
import Register from './componets/auth/Register';
import Login from './componets/auth/Login';
import Dashboard from './componets/dashboard/Dashboard';
import CreateProfile from './componets/profile-forms/CreateProfile';
import EditProfile from './componets/profile-forms/EditProfile';
import AddExperience from './componets/profile-forms/AddExperience';
import AddEducation from './componets/profile-forms/AddEducation';
import Profiles from './componets/profiles/Profiles';
import Profile from './componets/profile/Profile';
import Posts from './componets/posts/Posts';
import Post from './componets/post/Post';

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
              <Route exact path="/profiles" component={Profiles}/>
              <Route exact path="/profile/:id" component={Profile}/>
              <Route exact path="/test" component={TestComponent}/>
              <PrivateRoute exact path="/dashboard" component={Dashboard}/>
              <PrivateRoute exact path="/create-profile" component={CreateProfile}/>
              <PrivateRoute exact path="/edit-profile" component={EditProfile}/>
              <PrivateRoute exact path="/add-experience" component={AddExperience}/>
              <PrivateRoute exact path="/add-education" component={AddEducation}/>
              <PrivateRoute exact path="/posts" component={Posts}/>
              <PrivateRoute exact path="/post/:id" component={Post}/>
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  )
};

export default App;
