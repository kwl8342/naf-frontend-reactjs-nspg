import React, { useState, useEffect } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { RedirectAs404 } from './utils/Utils';
import PrivateRoute from './route/PrivateRoute';

import Layout from './layout/Layout';

import Error404Classic from './pages/error/404-classic';
import Error404Modern from './pages/error/404-modern';
import Error504Modern from './pages/error/504-modern';
import Error504Classic from './pages/error/504-classic';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import Success from './pages/auth/Success';

const App = () => {
  const [authenticated, setAuthenticated] = useState(localStorage.getItem('accessToken') ? true : false);

  const checkifUserAuthenticated = () => {
    if (localStorage.getItem('accessToken')) {
      setAuthenticated(true);
    }
  };

  useEffect(() => {
    checkifUserAuthenticated();
  }, []);

  return (
    <Switch>
      {/* Auth Pages */}
      <Route exact path={`/auth-success`} component={Success} />
      <Route exact path={`/auth-reset`} component={ForgotPassword} />
      <Route exact path={`/auth-register`} component={Register} />
      <Route
        exact
        path={`/auth-login`}
        component={() => <Login authenticated={authenticated} checkifUserAuthenticated={checkifUserAuthenticated} />}
      />

      {/*Error Pages*/}
      <Route exact path={`/errors/404-classic`} component={Error404Classic} />
      <Route exact path={`/errors/504-modern`} component={Error504Modern} />
      <Route exact path={`/errors/404-modern`} component={Error404Modern} />
      <Route exact path={`/errors/504-classic`} component={Error504Classic} />

      {/*Main Routes*/}
      <PrivateRoute exact path="" component={Layout} />
      <Route component={RedirectAs404} />
    </Switch>
  );
};
export default withRouter(App);
