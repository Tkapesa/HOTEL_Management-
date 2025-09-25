import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import Home from './pages/Home';
import Hotels from './pages/Hotels';
import Dashboard from './pages/Dashboard';
import BookingConfirmation from './pages/BookingConfirmation';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Header from './components/Common/Header';
import Footer from './components/Common/Footer';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          {/* Home page has its own Header/Footer */}
          <Route exact path="/" component={Home} />
          
          {/* Other pages with shared Header/Footer */}
          <Route path="/hotels" render={() => (
            <>
              <Header />
              <main className="pt-16">
                <Hotels />
              </main>
              <Footer />
            </>
          )} />
          
          <Route path="/dashboard" render={() => (
            <>
              <Header />
              <main className="pt-16">
                <Dashboard />
              </main>
              <Footer />
            </>
          )} />
          
          <Route path="/booking-confirmation" render={() => (
            <>
              <Header />
              <main className="pt-16">
                <BookingConfirmation />
              </main>
              <Footer />
            </>
          )} />
          
          {/* Auth pages - clean layout without header/footer */}
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;