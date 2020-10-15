import React from "react";
import Home from "./screens/Home";
import Content from "./screens/Content";
import LoginUser from "./screens/LoginUser";
import RegisterUser from "./screens/RegisterUser";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={LoginUser} />
        <Route path="/register" exact component={RegisterUser} />
        <Route path="/content" exact component={Content} />
      </Switch>
    </Router>
  );
};

export default App;
