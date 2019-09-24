import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import PropTypes from 'prop-types';
import PrivateRoute from './PrivateRoute';
import TestComponent from "../componets/TestComponent";
import AddExperience from "../componets/profile-forms/AddExperience";
import NotFound from "../componets/layout/NotFound";
import EditProfile from "../componets/profile-forms/EditProfile";
import Dashboard from "../componets/dashboard/Dashboard";
import AddEducation from "../componets/profile-forms/AddEducation";
import Post from "../componets/post/Post";
import Posts from "../componets/posts/Posts";
import CreateProfile from "../componets/profile-forms/CreateProfile";
import Profiles from "../componets/profiles/Profiles";
import Profile from "../componets/profile/Profile";
import Login from "../componets/auth/Login";
import Register from "../componets/auth/Register";

import Alert from '../componets/layout/Alert';

const Routes = (props) => {
    return (
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
          <Route component={NotFound}/>
        </Switch>
      </section>
    );
};

Routes.propTypes = {

};

export default Routes;