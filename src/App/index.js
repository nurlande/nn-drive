
import React from "react";

import {
  Route,
  Switch,
  Redirect,
  withRouter
} from "react-router-dom";

import { PrivateRoute } from "./../_components"

import Home from "../HomePage";
import LoginPage from "../LoginPage";
import RegisterPage from "../RegisterPage";
import AdminPage from '../AdminPage';
import Header from "../Core/Header";
import SearchPage from "../SearchPage";

function App() {
  return (
    <div className="App container">
      <Header />
        <Switch>
          <PrivateRoute path="/home" component={Home} />
          <PrivateRoute path="/folder/:folderId" component={Home} />
          <PrivateRoute path="/search/:key" component={SearchPage} />
          <PrivateRoute path="/admin" component={AdminPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Redirect from="/" to="/home" />
        </Switch>
    </div>
  );
}

export default withRouter(App);
