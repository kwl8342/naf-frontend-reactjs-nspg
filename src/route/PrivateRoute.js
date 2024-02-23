import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ exact, component: Component, ...rest }) => {
  return (
    <Route
      exact={exact ? true : false}
      rest
      render={(props) => (localStorage.getItem('accessToken') ? <Component {...props} {...rest} /> : <Redirect to={`/auth-login`} />)}
    />
  );
};

export default PrivateRoute;
