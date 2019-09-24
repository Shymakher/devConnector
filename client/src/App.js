import React, {Fragment, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import {Provider} from 'react-redux';
import store from './store';

// import TestComponent from './componets/TestComponent';
import NavBar from './componets/layout/Navbar';
import Landing from './componets/layout/Landing';
import Routes from './routing/Routes';

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
          <Switch>
            <Route exact path="/" component={Landing}/>
            <Route component={Routes}/>
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  )
};

export default App;
