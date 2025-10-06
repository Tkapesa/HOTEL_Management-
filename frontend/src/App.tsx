import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';

// Import components
import Header from './components/Common/Header';
import Footer from './components/Common/Footer';
import ProfessionalHome from './components/Professional/ProfessionalHome';
import Hotels from './pages/Hotels';
import HotelDetail from './components/Hotel/HotelDetail';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './pages/Dashboard';
import BookingConfirmation from './pages/BookingConfirmation';
import BookingHistoryPage from './pages/BookingHistoryPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-20">
          <Switch>
            <Route exact path="/" component={ProfessionalHome} />
            <Route exact path="/hotels" component={Hotels} />
            <Route path="/hotels/:id" component={HotelDetail} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/booking-confirmation" component={BookingConfirmation} />
            <Route path="/booking-history" component={BookingHistoryPage} />
            {/* Fallback for destinations route */}
            <Route path="/destinations" render={() => (
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">Destinations</h1>
                  <p className="text-gray-600">Coming soon! Explore amazing destinations worldwide.</p>
                </div>
              </div>
            )} />
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
