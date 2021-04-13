
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
import AdminPage from '../AdminPage';
import Header from "../Core/Header";

function App() {
  return (
    <div className="App container">
      <Header />
        <Switch>
          <PrivateRoute path="/home" component={Home} />
          <PrivateRoute path="/folder/:folderName" component={Home} />
          <PrivateRoute path="/search/:key" component={Home} />
          <PrivateRoute path="/admin" component={AdminPage} />
          <Route path="/login" component={LoginPage} />
          <Redirect from="/" to="/home" />
        </Switch>
    </div>
  );
}

export default withRouter(App);
