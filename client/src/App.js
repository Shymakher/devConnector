import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import {Provider} from 'react-redux';
import store from './store';

import NavBar from './componets/layout/Navbar';
import Landing from './componets/layout/Landing';
import Register from './componets/auth/Register';
import Login from './componets/auth/Login';

import Alert from './componets/layout/Alert';

import './App.css';

const App = () =>
  <Provider store={store}>
    <Router>
      <Fragment>
        <NavBar/>
        <Route exact path="/" component={Landing}/>
        <section className="container">
          <Alert />
          <Switch>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/login" component={Login}/>
          </Switch>
        </section>
      </Fragment>
    </Router>
  </Provider>

export default App;
