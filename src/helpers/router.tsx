import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export const AuthRoute = ({ isAllowed, ...props }: any) => {
  if (isAllowed) {
    return <Route {...props} />;
  } else {
    return <Redirect to="/sign-in" />;
  }
};

export const NonAuthRoute = ({ isLogged, ...props }: any) => {
  if (!isLogged) {
    return <Route {...props} />;
  } else {
    return <Redirect to="/dashboard" />;
  }
};

export const HomeRoute = ({ isLogged, ...props }: any) => {
  if (isLogged) {
    return <Redirect to="/dashboard" />;
  } else {
    return <Redirect to="/sign-in" />;
  }
};
