import React from "react";

import { Route, Redirect } from "react-router-dom";

import { useSelector } from "react-redux";
import DefaultLayout from "../../pages/_layouts/Default";

const PrivateRoute = ({ component: Component, noMax, ...rest }) => {
  const token = useSelector((state) => state.auth.token);

  return (
    <Route
      {...rest}
      render={(props) =>
        token ? (
          <DefaultLayout noMax={noMax}>
            <Component {...props} />
          </DefaultLayout>
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default PrivateRoute;
