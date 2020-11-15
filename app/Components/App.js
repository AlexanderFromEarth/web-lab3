import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap";

import AnimalList from "./Animal/AnimalList.js";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={AnimalList} />
      </Switch>
    </Router>
  );
};
ReactDOM.render(<App />, document.getElementById("app"));
