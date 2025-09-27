import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import ProfessionalHome from './components/Professional/ProfessionalHome';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={ProfessionalHome} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
