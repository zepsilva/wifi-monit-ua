import React, { Component } from 'react';
import './App.css';

import { 
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect 
} from "react-router-dom";

//Pages
import IndexPage from "./pages";
import NotFoundPage from "./pages/404";
import ConnectionPage from "./pages/myConnection";
import Dep4Page from "./pages/dep4";

class App extends Component {
  render() {
    return <Router> 
      <Switch>
        <Route exact path="/" component={IndexPage} />
        <Route exact path="/myconnection" component={ConnectionPage}/>
        <Route exact path="/dep4" component={Dep4Page}/>
        <Route path="/404" component={NotFoundPage}/>
        <Redirect to="/404"/>
      </Switch>
    </Router>
  }
}

export default App;
