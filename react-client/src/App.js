import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { PrivateRoute } from './PrivateRoute';
import { HomePage } from './HomePage';
import { LoginPage } from './LoginPage';
import { AdminPage } from './AdminPage';


function App() {
 return (
    <div>
        <Router>
          <Switch>
             <div>
                <PrivateRoute exact path="/" component={HomePage} />
                <Route path="/login" component={LoginPage} />
                <PrivateRoute exact path="/admin" component={AdminPage} />
             </div>
          </Switch>

        </Router>
    </div>
  );
}

export default App;