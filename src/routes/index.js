import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";

import LoginRoute from "./AuthRoute";
import PrivateRoute from "./PrivateRoute";

//Auth Routes
import SignIn from "../pages/Auth/SignIn";

//Default Routes
import Dashboard from "../pages/Default/Dashboard";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        {/* <LoginRoute path="/forgot" component={ForgotPassword} exact /> */}
        <LoginRoute path="/" component={SignIn} exact />

        <PrivateRoute path="/home" isPrivate component={Dashboard} exact />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
