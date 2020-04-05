import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { PrivateRoute } from './PrivateRoute';
import { HomePage } from './HomePage';
import { LoginPage } from './LoginPage';

function App() {
 return (
    <div>
        <Router>
              <div>
                <PrivateRoute exact path="/" component={HomePage} />
                <Route path="/login" component={LoginPage} />
             </div>
        </Router>
    </div>
  );
}

export default App;