import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { PrivateRoute } from "./PrivateRoute";
import { HomePage } from "./HomePage";
import { LoginPage } from "./LoginPage";
import { AdminPage } from "./AdminPage";
import { InfoPage } from "./InfoPage";
import { ResultPage } from "./ResultPage";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <div>
            <PrivateRoute exact path="/" component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <PrivateRoute exact path="/admin" component={AdminPage} />
            <PrivateRoute exact path="/info" component={InfoPage} />
            <PrivateRoute exact path="/result" component={ResultPage} />
          </div>
        </Switch>
      </Router>
    </div>
  );
}

export default App;