import React from "react";

import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import AuthLayout from "../../pages/_layouts/Auth";

const LoginRoute = ({ component: Component, ...rest }) => {
  const token = useSelector((state) => state.auth.token);

  return (
    <Route
      {...rest}
      render={(props) =>
        !token ? (
          <AuthLayout>
            <Component {...props} />{" "}
          </AuthLayout>
        ) : (
          <Redirect to="/home" />
        )
      }
    />
  );
};

export default LoginRoute;
