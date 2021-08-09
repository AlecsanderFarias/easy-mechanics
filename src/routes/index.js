import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";

import LoginRoute from "./AuthRoute";
import PrivateRoute from "./PrivateRoute";

//Auth Routes
import SignIn from "../pages/Auth/SignIn";

//Default Routes
import Clients from "../pages/Default/Client/List";
import Client from "../pages/Default/Client/Edit";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        {/* <LoginRoute path="/forgot" component={ForgotPassword} exact /> */}
        <LoginRoute path="/" component={SignIn} exact />

        <PrivateRoute path="/home" isPrivate component={Clients} exact />
        <PrivateRoute path="/client/:id" isPrivate component={Client} exact />
        <PrivateRoute path="/client/new" isPrivate component={Client} exact />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
