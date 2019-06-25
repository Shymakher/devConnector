import React from 'react';
import {connect} from 'react-redux';
import PropsTypes from 'prop-types';
import {Redirect, Route} from 'react-router-dom';

const PrivateRoute = ({component: Component, auth: {isAuthenticated, loading}, ...rest}) => (
  <Route {...rest} render={
    props => !isAuthenticated && !loading ? (<Redirect to="/login"/>) : (<Component {...props}/>)
  }
  />
);

PrivateRoute.prototype = {
  auth: PropsTypes.object.isRequired
};

const mapStateToProps = ({auth}) => ({
  auth
});

export default connect(mapStateToProps, null)(PrivateRoute);