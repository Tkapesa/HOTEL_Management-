import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

interface Destination {
  id: number;
  name: string;
  country: string;
  description: string;
  image: string;
  hotelCount: number;
  averagePrice: number;
  rating: number;
  popularAttractions: string[];
  bestTimeToVisit: string;
  category: 'beach' | 'city' | 'mountain' | 'cultural' | 'adventure';
}

const destinations: Destination[] = [
  {
    id: 1,
    name: 'Bali',
    country: 'Indonesia',
    description: 'A tropical paradise known for its stunning beaches, ancient temples, and vibrant culture. Perfect for relaxation and spiritual exploration.',
    image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&h=600&fit=crop',
    hotelCount: 156,
    averagePrice: 120,
    rating: 4.8,
    popularAttractions: ['Tanah Lot Temple', 'Uluwatu Cliff', 'Tegallalang Rice Terraces', 'Sacred Monkey Forest'],
    bestTimeToVisit: 'April - October',
    category: 'beach'
  },
  {
    id: 2,
    name: 'Paris',
    country: 'France',
    description: 'The City of Light offers world-class museums, iconic landmarks, and romantic ambiance. A must-visit for culture and history enthusiasts.',
    image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=600&fit=crop',
    hotelCount: 243,
    averagePrice: 280,
    rating: 4.7,
    popularAttractions: ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame Cathedral', 'Champs-Élysées'],
    bestTimeToVisit: 'April - June, September - October',
    category: 'city'
  },
  {
    id: 3,
    name: 'Swiss Alps',
    country: 'Switzerland',
    description: 'Breathtaking mountain landscapes perfect for skiing, hiking, and enjoying pristine alpine beauty year-round.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    hotelCount: 89,
    averagePrice: 350,
    rating: 4.9,
    popularAttractions: ['Matterhorn', 'Jungfraujoch', 'Lake Geneva', 'Zermatt'],
    bestTimeToVisit: 'December - March, June - September',
    category: 'mountain'
  },
  {
    id: 4,
    name: 'Tokyo',
    country: 'Japan',
    description: 'A fascinating blend of ultra-modern technology and traditional culture, offering incredible cuisine and unique experiences.',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop',
    hotelCount: 198,
    averagePrice: 200,
    rating: 4.6,
    popularAttractions: ['Senso-ji Temple', 'Shibuya Crossing', 'Tokyo Skytree', 'Meiji Shrine'],
    bestTimeToVisit: 'March - May, September - November',
    category: 'city'
  },
  {
    id: 5,
    name: 'Maldives',
    country: 'Maldives',
    description: 'Crystal-clear waters, pristine white sand beaches, and luxury overwater bungalows make this a tropical paradise.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    hotelCount: 67,
    averagePrice: 450,
    rating: 4.9,
    popularAttractions: ['Malé Atoll', 'Banana Reef', 'Vaadhoo Island', 'Hulhumalé Beach'],
    bestTimeToVisit: 'November - April',
    category: 'beach'
  },
  {
    id: 6,
    name: 'Rome',
    country: 'Italy',
    description: 'The Eternal City where ancient history meets modern life, featuring world-famous landmarks and incredible cuisine.',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&h=600&fit=crop',
    hotelCount: 167,
    averagePrice: 180,
    rating: 4.5,
    popularAttractions: ['Colosseum', 'Vatican City', 'Trevi Fountain', 'Roman Forum'],
    bestTimeToVisit: 'April - June, September - October',
    category: 'cultural'
  },
  {
    id: 7,
    name: 'New Zealand',
    country: 'New Zealand',
    description: 'Adventure capital of the world with stunning landscapes, from fjords to mountains, perfect for outdoor enthusiasts.',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop',
    hotelCount: 78,
    averagePrice: 220,
    rating: 4.8,
    popularAttractions: ['Milford Sound', 'Queenstown', 'Bay of Islands', 'Franz Josef Glacier'],
    bestTimeToVisit: 'December - February, September - November',
    category: 'adventure'
  },
  {
    id: 8,
    name: 'Santorini',
    country: 'Greece',
    description: 'Iconic blue-domed churches, stunning sunsets, and dramatic cliff-top villages overlooking the Aegean Sea.',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&h=600&fit=crop',
    hotelCount: 45,
    averagePrice: 320,
    rating: 4.7,
    popularAttractions: ['Oia Village', 'Red Beach', 'Akrotiri', 'Fira Town'],
    bestTimeToVisit: 'April - June, September - October',
    category: 'beach'
  }
];

const categories = [
  { id: 'all', name: 'All Destinations', icon: '🌍' },
  { id: 'beach', name: 'Beach', icon: '🏖️' },
  { id: 'city', name: 'City', icon: '🏙️' },
  { id: 'mountain', name: 'Mountain', icon: '🏔️' },
  { id: 'cultural', name: 'Cultural', icon: '🏛️' },
  { id: 'adventure', name: 'Adventure', icon: '🎿' }
];

const Destinations: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const [isAnimating, setIsAnimating] = useState(false);
  const [categoryStats, setCategoryStats] = useState<{[key: string]: number}>({});

  // Get category and search from URL params
  const urlParams = new URLSearchParams(location.search);
  const selectedCategory = urlParams.get('category') || 'all';
  const searchTerm = urlParams.get('search') || '';

  useEffect(() => {
    const stats = categories.reduce((acc, category) => {
      if (category.id === 'all') {
        acc[category.id] = destinations.length;
      } else {
        acc[category.id] = destinations.filter(dest => dest.category === category.id).length;
      }
      return acc;
    }, {} as {[key: string]: number});
    setCategoryStats(stats);
  }, []);

  const filteredDestinations = destinations.filter(destination => {
    const matchesCategory = selectedCategory === 'all' || destination.category === selectedCategory;
    const matchesSearch = destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         destination.country.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Enhanced category selection with URL routing
  const handleCategorySelect = (categoryId: string) => {
    if (categoryId === selectedCategory) return;
    
    setIsAnimating(true);
    
    // Update URL with new category
    const newParams = new URLSearchParams();
    if (categoryId !== 'all') {
      newParams.set('category', categoryId);
    }
    if (searchTerm && categoryId === selectedCategory) {
      newParams.set('search', searchTerm);
    }
    
    const newUrl = `/destinations${newParams.toString() ? `?${newParams.toString()}` : ''}`;
    history.push(newUrl);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 150);

    // Add analytics/tracking
    console.log(`Category selected: ${categoryId}, URL: ${newUrl}`);
  };

  // Handle search with URL routing
  const handleSearchChange = (value: string) => {
    const newParams = new URLSearchParams();
    if (selectedCategory !== 'all') {
      newParams.set('category', selectedCategory);
    }
    if (value.trim()) {
      newParams.set('search', value);
    }
    
    const newUrl = `/destinations${newParams.toString() ? `?${newParams.toString()}` : ''}`;
    history.push(newUrl);
  };

  // Clear search function
  const clearSearch = () => {
    const newParams = new URLSearchParams();
    if (selectedCategory !== 'all') {
      newParams.set('category', selectedCategory);
    }
    
    const newUrl = `/destinations${newParams.toString() ? `?${newParams.toString()}` : ''}`;
    history.push(newUrl);
  };

  // Reset to all destinations
  const resetToAll = () => {
    history.push('/destinations');
  };

  const getCategoryAveragePrice = (categoryId: string) => {
    const categoryDestinations = categoryId === 'all' 
      ? destinations 
      : destinations.filter(dest => dest.category === categoryId);
    
    if (categoryDestinations.length === 0) return 0;
    
    const totalPrice = categoryDestinations.reduce((sum, dest) => sum + dest.averagePrice, 0);
    return Math.round(totalPrice / categoryDestinations.length);
  };

  const getCategoryDescription = (categoryId: string) => {
    const descriptions = {
      all: 'Explore all available destinations worldwide',
      beach: 'Tropical paradises with pristine beaches and crystal-clear waters',
      city: 'Urban adventures with culture, dining, and entertainment',
      mountain: 'Scenic peaks perfect for hiking, skiing, and nature lovers',
      cultural: 'Historic sites rich in heritage and ancient wonders',
      adventure: 'Thrilling destinations for outdoor enthusiasts and adrenaline seekers'
    };
    return descriptions[categoryId as keyof typeof descriptions] || '';
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-4 h-4 ${index < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative py-20" style={{
        background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)',
        color: 'white'
      }}>
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Discover Amazing Destinations
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Explore the world's most beautiful places and create unforgettable memories
            </p>
            <div className="max-w-md mx-auto relative">
              <input
                type="text"
                placeholder="Search destinations..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full px-6 py-4 rounded-full text-gray-900"
                style={{ 
                  color: '#111827',
                  backgroundColor: 'white',
                  border: 'none',
                  outline: 'none'
                }}
              />
              <svg className="absolute right-4 top-4 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center mb-6">
            <p className="text-gray-600 text-sm max-w-2xl mx-auto">
              {getCategoryDescription(selectedCategory)}
            </p>
            {selectedCategory !== 'all' && (
              <div className="mt-2 text-sm text-blue-600">
                Average price: ${getCategoryAveragePrice(selectedCategory)}/night
              </div>
            )}
          </div>

          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            justifyContent: 'center', 
            gap: '1rem' 
          }}>
            {categories.map(category => {
              const isSelected = selectedCategory === category.id;
              const count = categoryStats[category.id] || 0;
              
              return (
                <button
                  key={category.id}
                  onClick={() => handleCategorySelect(category.id)}
                  disabled={isAnimating}
                  className="font-medium transition-all duration-300 transform hover:scale-105"
                  style={{
                    backgroundColor: isSelected ? '#2563eb' : '#f3f4f6',
                    color: isSelected ? 'white' : '#374151',
                    border: isSelected ? '2px solid #2563eb' : '2px solid transparent',
                    cursor: isAnimating ? 'not-allowed' : 'pointer',
                    boxShadow: isSelected 
                      ? '0 10px 25px -5px rgba(37, 99, 235, 0.4)' 
                      : '0 2px 4px -1px rgba(0, 0, 0, 0.1)',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '9999px',
                    minWidth: 'fit-content',
                    whiteSpace: 'nowrap',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.25rem',
                    opacity: isAnimating ? 0.7 : 1,
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected && !isAnimating) {
                      e.currentTarget.style.backgroundColor = '#e5e7eb';
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor = '#f3f4f6';
                      e.currentTarget.style.transform = 'scale(1)';
                    }
                  }}
                >
                  {isSelected && (
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.1) 100%)',
                      animation: 'shimmer 2s infinite'
                    }} />
                  )}
                  
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem',
                    position: 'relative',
                    zIndex: 1
                  }}>
                    <span style={{ fontSize: '1.125rem', lineHeight: '1' }}>
                      {category.icon}
                    </span>
                    <span style={{ fontSize: '0.875rem', lineHeight: '1', fontWeight: '500' }}>
                      {category.name}
                    </span>
                  </div>
                  
                  <div style={{
                    fontSize: '0.75rem',
                    opacity: 0.8,
                    position: 'relative',
                    zIndex: 1
                  }}>
                    {count} destination{count !== 1 ? 's' : ''}
                  </div>
                </button>
              );
            })}
          </div>

          {/* URL Display for debugging (remove in production) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-4 text-center">
              <small className="text-gray-500">
                Current URL: {location.pathname}{location.search}
              </small>
            </div>
          )}

          {selectedCategory !== 'all' && (
            <div className="mt-6 flex justify-center">
              <div className="bg-blue-50 rounded-lg px-4 py-2 text-sm text-blue-800">
                <span className="font-medium">
                  {categories.find(c => c.id === selectedCategory)?.name} destinations: 
                </span>
                <span className="ml-1">
                  {filteredDestinations.length} available
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {selectedCategory === 'all' ? 'All Destinations' : categories.find(c => c.id === selectedCategory)?.name + ' Destinations'}
          </h2>
          <p className="text-gray-600">
            {filteredDestinations.length} destination{filteredDestinations.length !== 1 ? 's' : ''} found
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        </div>

        {isAnimating ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '2rem',
            opacity: isAnimating ? 0.5 : 1,
            transition: 'opacity 0.3s ease-in-out'
          }}>
            {filteredDestinations.map((destination, index) => (
              <div 
                key={destination.id} 
                className="card group cursor-pointer overflow-hidden" 
                style={{
                  backgroundColor: 'white',
                  borderRadius: '0.75rem',
                  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                  border: '1px solid #e5e7eb',
                  transition: 'all 0.3s ease-in-out',
                  height: 'fit-content',
                  animationDelay: `${index * 100}ms`,
                  animation: isAnimating ? 'none' : 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                <div className="relative overflow-hidden" style={{ height: '12rem' }}>
                  <img
                    src={destination.image}
                    alt={destination.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease-in-out'
                    }}
                    className="group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 shadow-md">
                    <span className="text-sm font-semibold text-gray-900">${destination.averagePrice}/night</span>
                  </div>
                </div>
                
                <div style={{ padding: '1.5rem' }}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{destination.name}</h3>
                    <div className="flex items-center space-x-1">
                      {renderStars(destination.rating)}
                      <span className="text-sm text-gray-600 ml-1">{destination.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {destination.description}
                  </p>
                  
                  <div style={{ marginBottom: '1rem' }}>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-500">Country:</span>
                      <span className="font-medium">{destination.country}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-500">Hotels:</span>
                      <span className="font-medium">{destination.hotelCount} available</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Best Time:</span>
                      <span className="font-medium">{destination.bestTimeToVisit}</span>
                    </div>
                  </div>
                  
                  <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Popular Attractions:</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                      {destination.popularAttractions.slice(0, 2).map((attraction, index) => (
                        <span
                          key={index}
                          style={{
                            display: 'inline-block',
                            backgroundColor: '#eff6ff',
                            color: '#1d4ed8',
                            fontSize: '0.75rem',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '9999px'
                          }}
                        >
                          {attraction}
                        </span>
                      ))}
                      {destination.popularAttractions.length > 2 && (
                        <span style={{
                          display: 'inline-block',
                          backgroundColor: '#f3f4f6',
                          color: '#4b5563',
                          fontSize: '0.75rem',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '9999px'
                        }}>
                          +{destination.popularAttractions.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem' }}>
                    <Link
                      to={`/hotels?destination=${destination.name}`}
                      style={{
                        flex: 1,
                        backgroundColor: '#2563eb',
                        color: 'white',
                        textAlign: 'center',
                        padding: '0.5rem 1rem',
                        borderRadius: '0.5rem',
                        fontWeight: '500',
                        textDecoration: 'none',
                        transition: 'background-color 0.2s ease-in-out'
                      }}
                      className="hover:bg-blue-700"
                    >
                      View Hotels
                    </Link>
                    <button style={{
                      flex: 1,
                      border: '1px solid #2563eb',
                      color: '#2563eb',
                      padding: '0.5rem 1rem',
                      borderRadius: '0.5rem',
                      fontWeight: '500',
                      backgroundColor: 'transparent',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s ease-in-out'
                    }}
                    className="hover:bg-blue-50">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredDestinations.length === 0 && !isAnimating && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">
              {selectedCategory === 'beach' ? '🏖️' : 
               selectedCategory === 'city' ? '🏙️' : 
               selectedCategory === 'mountain' ? '🏔️' : 
               selectedCategory === 'cultural' ? '🏛️' : 
               selectedCategory === 'adventure' ? '🎿' : '🌍'}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No {selectedCategory === 'all' ? '' : selectedCategory} destinations found
            </h3>
            <p className="text-gray-500 mb-4">
              {searchTerm 
                ? `No destinations match "${searchTerm}" in the ${selectedCategory} category.`
                : `We're working on adding more ${selectedCategory} destinations.`
              }
            </p>
            <div className="flex justify-center gap-4">
              {searchTerm && (
                <button 
                  onClick={clearSearch}
                  className="btn-ghost"
                >
                  Clear search
                </button>
              )}
              <button 
                onClick={resetToAll}
                className="btn-modern-primary"
              >
                View all destinations
              </button>
            </div>
          </div>
        )}
      </div>

      <div style={{
        background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
        color: 'white',
        padding: '4rem 0'
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Book your perfect hotel and create memories that will last a lifetime
          </p>
          <Link
            to="/hotels"
            style={{
              display: 'inline-block',
              backgroundColor: 'white',
              color: '#8b5cf6',
              padding: '1rem 2rem',
              borderRadius: '9999px',
              fontWeight: 'bold',
              fontSize: '1.125rem',
              textDecoration: 'none',
              transition: 'background-color 0.2s ease-in-out'
            }}
            className="hover:bg-gray-100"
          >
            Explore All Hotels
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Destinations;