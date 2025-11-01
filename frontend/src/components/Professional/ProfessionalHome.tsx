import React, { useState } from 'react';
import './ProfessionalHome.css';

const ProfessionalHome: React.FC = () => {
  const [searchData, setSearchData] = useState({
    destination: '',
    checkin: '',
    checkout: '',
    guests: 2,
    rooms: 1
  });

  const handleSearch = () => {
    console.log('Search data:', searchData);
  };

  return (
    <div className="professional-home">
      {/* Hero Section with Search */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
        
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Find Your Perfect Stay
              <span className="title-accent">Anywhere in the World</span>
            </h1>
            <p className="hero-subtitle">
              Discover amazing hotels, resorts, and unique accommodations at unbeatable prices
            </p>
          </div>

          {/* Professional Search Box */}
          <div className="search-container">
            <div className="search-box">
              <div className="search-field destination-field">
                <label>Where are you going?</label>
                <div className="input-container">
                  <span className="input-icon location-icon"></span>
                  <input 
                    type="text" 
                    placeholder="Enter destination, hotel, landmark..."
                    value={searchData.destination}
                    onChange={(e) => setSearchData({...searchData, destination: e.target.value})}
                  />
                </div>
              </div>

              <div className="search-field date-field">
                <label>Check-in</label>
                <div className="input-container">
                  <span className="input-icon calendar-icon"></span>
                  <input 
                    type="date"
                    value={searchData.checkin}
                    onChange={(e) => setSearchData({...searchData, checkin: e.target.value})}
                  />
                </div>
              </div>

              <div className="search-field date-field">
                <label>Check-out</label>
                <div className="input-container">
                  <span className="input-icon calendar-icon"></span>
                  <input 
                    type="date"
                    value={searchData.checkout}
                    onChange={(e) => setSearchData({...searchData, checkout: e.target.value})}
                  />
                </div>
              </div>

              <div className="search-field guests-field">
                <label>Guests & Rooms</label>
                <div className="input-container">
                  <span className="input-icon guests-icon"></span>
                  <select 
                    value={`${searchData.guests}-${searchData.rooms}`}
                    onChange={(e) => {
                      const [guests, rooms] = e.target.value.split('-');
                      setSearchData({...searchData, guests: parseInt(guests), rooms: parseInt(rooms)});
                    }}
                  >
                    <option value="1-1">1 Guest, 1 Room</option>
                    <option value="2-1">2 Guests, 1 Room</option>
                    <option value="3-1">3 Guests, 1 Room</option>
                    <option value="4-1">4 Guests, 1 Room</option>
                    <option value="4-2">4 Guests, 2 Rooms</option>
                    <option value="6-2">6 Guests, 2 Rooms</option>
                  </select>
                </div>
              </div>

              <button className="search-btn" onClick={handleSearch}>
                <span className="search-icon"></span>
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="trust-section">
        <div className="container">
          <div className="trust-stats">
            <div className="stat-item">
              <div className="stat-number">2M+</div>
              <div className="stat-label">Properties</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100M+</div>
              <div className="stat-label">Happy Guests</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">220</div>
              <div className="stat-label">Countries</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Destinations - Trump Hotel Style Grid */}
      <section className="destinations-section">
        <div className="container">
          <div className="section-header">
            <h2>Exquisite Destinations</h2>
            <p>Curated luxury experiences in the world's most distinguished locations</p>
          </div>

          <div className="luxury-destinations-grid">
            {/* Large Featured - Paris */}
            <div className="destination-card large-feature">
              <div className="destination-image paris-bg">
                <div className="destination-overlay">
                  <div className="destination-content-overlay">
                    <div className="destination-location">Paris, France</div>
                    <h3 className="destination-title-overlay">The City of Light</h3>
                    <p className="destination-subtitle-overlay">2,847 Luxury Properties</p>
                    <div className="destination-price-overlay">From $120<span>/night</span></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Medium Featured - Tokyo */}
            <div className="destination-card medium-feature">
              <div className="destination-image tokyo-bg">
                <div className="destination-overlay">
                  <div className="destination-content-overlay">
                    <div className="destination-location">Tokyo, Japan</div>
                    <h3 className="destination-title-overlay">Modern Elegance</h3>
                    <p className="destination-subtitle-overlay">1,923 Properties</p>
                    <div className="destination-price-overlay">From $95<span>/night</span></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Medium Featured - Dubai */}
            <div className="destination-card medium-feature">
              <div className="destination-image dubai-bg">
                <div className="destination-overlay">
                  <div className="destination-content-overlay">
                    <div className="destination-location">Dubai, UAE</div>
                    <h3 className="destination-title-overlay">Arabian Luxury</h3>
                    <p className="destination-subtitle-overlay">1,567 Properties</p>
                    <div className="destination-price-overlay">From $85<span>/night</span></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Standard Cards */}
            <div className="destination-card standard">
              <div className="destination-image bali-bg">
                <div className="destination-overlay">
                  <div className="destination-content-overlay">
                    <div className="destination-location">Bali, Indonesia</div>
                    <h3 className="destination-title-overlay">Tropical Paradise</h3>
                    <div className="destination-price-overlay">From $45<span>/night</span></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="destination-card standard">
              <div className="destination-image nyc-bg">
                <div className="destination-overlay">
                  <div className="destination-content-overlay">
                    <div className="destination-location">New York, USA</div>
                    <h3 className="destination-title-overlay">The Big Apple</h3>
                    <div className="destination-price-overlay">From $180<span>/night</span></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="destination-card standard">
              <div className="destination-image london-bg">
                <div className="destination-overlay">
                  <div className="destination-content-overlay">
                    <div className="destination-location">London, UK</div>
                    <h3 className="destination-title-overlay">Royal Heritage</h3>
                    <div className="destination-price-overlay">From $140<span>/night</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose HotelLux?</h2>
            <p>We make booking your perfect stay simple, secure, and rewarding</p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon price-match-icon"></div>
              <h3>Best Price Guarantee</h3>
              <p>Find a lower price? We'll match it and give you an extra 10% off your next booking.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon secure-icon"></div>
              <h3>Secure Booking</h3>
              <p>Your data is protected with bank-level security. Book with confidence every time.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon support-icon"></div>
              <h3>24/7 Support</h3>
              <p>Our travel experts are available around the clock to help you with your booking.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="professional-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>HotelLux</h4>
              <p>Your premier destination for luxury hotel bookings worldwide.</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 HotelLux. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProfessionalHome;
