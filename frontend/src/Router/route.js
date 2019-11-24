import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "../Master/Auth/login/login";
import SignUp from "../Master/Auth/SignUp/signUp";
import Dashboard from "../Master/Dashboard/userDashboard";
import UserInfo from "../Master/UserInfo/userInfo";

const Routes = (
  <Router>
    <Route path={"/"} component={Login} exact />
    <Route path={"/signup"} component={SignUp} exact />
    <Route path={"/dashboard"} component={Dashboard} exact />
    <Route path={"/dashboard/:id"} component={UserInfo} exact />
  </Router>
);
export default Routes