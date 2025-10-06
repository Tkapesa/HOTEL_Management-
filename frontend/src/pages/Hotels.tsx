import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getHotels } from '../services/api';

interface Hotel {
    id: string;
    name: string;
    location: string;
    description: string;
    price: number;
    rating: number;
    imageUrl?: string;
}

const Hotels: React.FC = () => {
    const [hotels, setHotels] = useState<Hotel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [priceFilter, setPriceFilter] = useState<string>('');

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                setLoading(true);
                const response = await getHotels();
                setHotels(response.data || []);
            } catch (err) {
                setError('Failed to load hotels. Please try again later.');
                // Mock data for demonstration - ready for real API integration
                setHotels([
                    // Luxury Hotels
                    {
                        id: '1',
                        name: 'The Ritz-Carlton New York',
                        location: 'New York, NY',
                        description: 'Iconic luxury hotel in the heart of Manhattan featuring elegant rooms, world-class dining, and personalized service with stunning Central Park views.',
                        price: 699,
                        rating: 4.8,
                        imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop'
                    },
                    {
                        id: '2',
                        name: 'Four Seasons Resort Maui',
                        location: 'Maui, Hawaii',
                        description: 'Oceanfront luxury resort with pristine beaches, championship golf course, award-winning spa, and authentic Hawaiian hospitality.',
                        price: 899,
                        rating: 4.9,
                        imageUrl: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&h=400&fit=crop'
                    },
                    {
                        id: '3',
                        name: 'The St. Regis Aspen Resort',
                        location: 'Aspen, Colorado',
                        description: 'Premier mountain resort offering ski-in/ski-out access, luxury spa treatments, and breathtaking Rocky Mountain views.',
                        price: 1299,
                        rating: 4.7,
                        imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&h=400&fit=crop'
                    },
                    {
                        id: '4',
                        name: 'The Plaza Hotel',
                        location: 'New York, NY',
                        description: 'Historic luxury landmark hotel offering timeless elegance, world-famous afternoon tea, and prime Fifth Avenue location.',
                        price: 795,
                        rating: 4.6,
                        imageUrl: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&h=400&fit=crop'
                    },
                    
                    // Business Hotels
                    {
                        id: '5',
                        name: 'Marriott Marquis San Francisco',
                        location: 'San Francisco, CA',
                        description: 'Modern business hotel in downtown featuring state-of-the-art conference facilities, rooftop bar, and easy access to tech companies.',
                        price: 329,
                        rating: 4.3,
                        imageUrl: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&h=400&fit=crop'
                    },
                    {
                        id: '6',
                        name: 'Hyatt Regency Chicago',
                        location: 'Chicago, Illinois',
                        description: 'Contemporary hotel on the Chicago River with stunning architecture views, multiple dining options, and comprehensive business center.',
                        price: 279,
                        rating: 4.4,
                        imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop'
                    },
                    {
                        id: '7',
                        name: 'Omni Atlanta Hotel',
                        location: 'Atlanta, Georgia',
                        description: 'Downtown business hotel connected to CNN Center with modern amenities, fitness facilities, and proximity to major corporations.',
                        price: 245,
                        rating: 4.2,
                        imageUrl: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=600&h=400&fit=crop'
                    },
                    
                    // Boutique Hotels
                    {
                        id: '8',
                        name: 'The Bowery Hotel',
                        location: 'New York, NY',
                        description: 'Stylish boutique hotel in NoHo with individually designed rooms, intimate lobby bar, and authentic New York neighborhood charm.',
                        price: 485,
                        rating: 4.5,
                        imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&h=400&fit=crop'
                    },
                    {
                        id: '9',
                        name: 'Hotel Zephyr San Francisco',
                        location: 'San Francisco, CA',
                        description: 'Nautical-themed boutique hotel at Fisherman\'s Wharf with unique maritime decor, waterfront views, and artisanal dining.',
                        price: 395,
                        rating: 4.4,
                        imageUrl: 'https://images.unsplash.com/photo-1578774204375-6c0d1b422090?w=600&h=400&fit=crop'
                    },
                    {
                        id: '10',
                        name: 'The Graduate Austin',
                        location: 'Austin, Texas',
                        description: 'Music-inspired boutique hotel near UT campus featuring local art, rooftop pool, and live music venue with Austin\'s signature vibe.',
                        price: 275,
                        rating: 4.6,
                        imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&h=400&fit=crop'
                    },
                    
                    // Resort Hotels
                    {
                        id: '11',
                        name: 'The Phoenician Scottsdale',
                        location: 'Scottsdale, Arizona',
                        description: 'Desert luxury resort with championship golf courses, world-class spa, multiple pools, and stunning Sonoran Desert landscapes.',
                        price: 649,
                        rating: 4.7,
                        imageUrl: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=600&h=400&fit=crop'
                    },
                    {
                        id: '12',
                        name: 'The Broadmoor',
                        location: 'Colorado Springs, CO',
                        description: 'Historic luxury resort in the Rocky Mountains offering golf, spa treatments, fine dining, and outdoor adventures in pristine wilderness.',
                        price: 595,
                        rating: 4.8,
                        imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&h=400&fit=crop'
                    },
                    {
                        id: '13',
                        name: 'Kiawah Island Golf Resort',
                        location: 'Kiawah Island, SC',
                        description: 'Oceanfront golf resort featuring five championship courses, pristine beaches, luxury spa, and family-friendly activities.',
                        price: 455,
                        rating: 4.5,
                        imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop'
                    },
                    
                    // Budget-Friendly Hotels
                    {
                        id: '14',
                        name: 'Pod Hotel Brooklyn',
                        location: 'Brooklyn, NY',
                        description: 'Modern budget hotel with smart micro-rooms, rooftop bar, shared spaces, and easy access to Manhattan via public transit.',
                        price: 149,
                        rating: 4.1,
                        imageUrl: 'https://images.unsplash.com/photo-1586611292717-f828b167408c?w=600&h=400&fit=crop'
                    },
                    {
                        id: '15',
                        name: 'Hampton Inn & Suites Miami',
                        location: 'Miami, Florida',
                        description: 'Comfortable budget hotel with complimentary breakfast, fitness center, outdoor pool, and close proximity to South Beach.',
                        price: 189,
                        rating: 4.2,
                        imageUrl: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600&h=400&fit=crop'
                    },
                    {
                        id: '16',
                        name: 'La Quinta Inn Denver',
                        location: 'Denver, Colorado',
                        description: 'Value hotel offering clean comfortable rooms, free breakfast, pet-friendly policies, and convenient location near downtown.',
                        price: 119,
                        rating: 4.0,
                        imageUrl: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600&h=400&fit=crop'
                    },
                    
                    // International Hotels
                    {
                        id: '17',
                        name: 'Hotel del Coronado',
                        location: 'San Diego, CA',
                        description: 'Historic beachfront resort with Victorian architecture, pristine beaches, multiple dining venues, and legendary hospitality since 1888.',
                        price: 525,
                        rating: 4.6,
                        imageUrl: 'https://images.unsplash.com/photo-1520637836862-4d197d17c7a4?w=600&h=400&fit=crop'
                    },
                    {
                        id: '18',
                        name: 'The Nantucket Hotel',
                        location: 'Nantucket, MA',
                        description: 'Charming New England inn with classic coastal décor, harbor views, locally-sourced dining, and quintessential island charm.',
                        price: 395,
                        rating: 4.4,
                        imageUrl: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&h=400&fit=crop'
                    },
                    {
                        id: '19',
                        name: 'The Stanley Hotel',
                        location: 'Estes Park, CO',
                        description: 'Historic mountain hotel that inspired \'The Shining\' offering ghost tours, stunning Rocky Mountain views, and vintage charm.',
                        price: 235,
                        rating: 4.3,
                        imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop'
                    },
                    {
                        id: '20',
                        name: 'Caesars Palace Las Vegas',
                        location: 'Las Vegas, Nevada',
                        description: 'Iconic casino resort with Roman-themed luxury, world-class entertainment, fine dining, shopping, and 24/7 gaming excitement.',
                        price: 199,
                        rating: 4.2,
                        imageUrl: 'https://images.unsplash.com/photo-1549294413-26f195200c16?w=600&h=400&fit=crop'
                    },
                    
                    // Specialty Hotels
                    {
                        id: '21',
                        name: 'McMenamins Kennedy School',
                        location: 'Portland, Oregon',
                        description: 'Unique hotel in a converted elementary school featuring themed rooms, on-site brewery, movie theater, and quirky Portland charm.',
                        price: 165,
                        rating: 4.1,
                        imageUrl: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=600&h=400&fit=crop'
                    },
                    {
                        id: '22',
                        name: 'The Liberty Hotel Boston',
                        location: 'Boston, Massachusetts',
                        description: 'Historic luxury hotel in a former jail featuring preserved architectural details, upscale dining, and prime Beacon Hill location.',
                        price: 445,
                        rating: 4.5,
                        imageUrl: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&h=400&fit=crop'
                    },
                    {
                        id: '23',
                        name: 'Fairmont Banff Springs',
                        location: 'Banff, Alberta',
                        description: 'Castle-like luxury resort in the Canadian Rockies offering world-class skiing, spa treatments, and breathtaking mountain vistas.',
                        price: 385,
                        rating: 4.7,
                        imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop'
                    },
                    {
                        id: '24',
                        name: 'The Graduate Seattle',
                        location: 'Seattle, Washington',
                        description: 'University district hotel with Pacific Northwest-inspired design, craft cocktails, local art, and easy access to campus and downtown.',
                        price: 295,
                        rating: 4.4,
                        imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&h=400&fit=crop'
                    }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchHotels();
    }, []);

    // Inject component-scoped styles
    const pageStyles = (
        <style>{`
          .hl-hotels-hero {position:relative; min-height:360px; display:flex; align-items:center; justify-content:center; padding:40px 20px; background:linear-gradient(115deg,#4f46e5,#6366f1 45%,#8b5cf6); overflow:hidden;}
          .hl-hotels-hero:before {content:''; position:absolute; inset:0; background:radial-gradient(circle at 20% 25%,rgba(255,255,255,.25),transparent 60%), radial-gradient(circle at 80% 70%,rgba(255,255,255,.18),transparent 55%); mix-blend-mode:overlay;}
          .hl-hotels-hero h1 {font-size:clamp(2.2rem,4vw,3.5rem); font-weight:700; letter-spacing:.5px; background:linear-gradient(90deg,#fff,#e0e7ff); -webkit-background-clip:text; color:transparent; margin:0 0 18px; text-shadow:0 4px 18px rgba(0,0,0,.15);}
          .hl-hotels-hero p {max-width:820px; font-size:clamp(1rem,1.4vw,1.3rem); line-height:1.5; color:#eef2ff; margin:0 auto; font-weight:500;}
          .hl-search-shell {position:relative; max-width:1220px; margin:-90px auto 0; padding:0 24px 10px;}
          .hl-search-panel {position:relative; z-index:2; display:grid; gap:28px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); background:linear-gradient(145deg,#ffffffee,#f1f5f9ee); border:1px solid #e2e8f0; border-radius:28px; padding:34px 38px 30px; box-shadow:0 18px 40px -15px rgba(30,41,59,.25), 0 4px 14px -4px rgba(30,41,59,.15); backdrop-filter:blur(10px);}          
          .hl-search-panel:before {content:''; position:absolute; inset:0; border-radius:28px; padding:1px; background:linear-gradient(120deg,rgba(99,102,241,.6),rgba(139,92,246,.25),transparent 70%); -webkit-mask:linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); mask:linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite: xor; mask-composite: exclude; opacity:.5;}
          .hl-search-group label {display:block; font-size:12px; font-weight:700; letter-spacing:.08em; text-transform:uppercase; color:#475569; margin-bottom:10px;}
          .hl-search-group input, .hl-search-group select {width:100%; background:#fff; border:1px solid #dbe1e8; border-radius:14px; padding:14px 16px 14px 44px; font-size:14px; font-weight:500; color:#334155; outline:none; transition:.25s; box-shadow:0 2px 4px rgba(15,23,42,.05);}          
          .hl-search-group input:focus, .hl-search-group select:focus {border-color:#6366f1; box-shadow:0 0 0 3px rgba(99,102,241,.25);}          
          .hl-search-icon {position:absolute; top:40px; left:16px; width:20px; height:20px; stroke:#64748b;}          
          .hl-filter-row {margin-top:6px; display:flex; flex-wrap:wrap; gap:10px; align-items:center;}
          .hl-price-filter {min-width:200px;}
          .hl-hotels-wrapper {max-width:1240px; margin:70px auto 0; padding:0 24px 80px;}
          .hl-results-head {display:flex; align-items:center; justify-content:space-between; gap:20px; flex-wrap:wrap; margin:10px 0 28px;}
          .hl-results-head h2 {font-size:26px; font-weight:700; color:#1e293b; letter-spacing:.5px; margin:0;}
          .hl-count-pill {background:linear-gradient(120deg,#eef2ff,#e0e7ff); color:#4338ca; padding:6px 14px 6px; border-radius:999px; font-size:13px; font-weight:600; letter-spacing:.5px; box-shadow:0 2px 6px rgba(99,102,241,.25);}          
          .hl-grid {display:grid; grid-template-columns:repeat(auto-fill,minmax(520px,1fr)); gap:34px;}          
          @media (max-width:1180px){.hl-grid {grid-template-columns:repeat(auto-fill,minmax(420px,1fr));}}
          @media (max-width:920px){.hl-grid {grid-template-columns:repeat(auto-fill,minmax(100%,1fr));} .hl-search-panel {grid-template-columns:1fr 1fr; padding:30px 26px;} }
          @media (max-width:620px){.hl-search-panel {grid-template-columns:1fr; margin-top:0;} .hl-grid {gap:28px;} }
          .hl-hotel-card {position:relative; display:flex; gap:0; background:#fff; border:1px solid #e2e8f0; border-radius:30px; overflow:hidden; box-shadow:0 12px 30px -12px rgba(30,41,59,.18), 0 4px 14px -6px rgba(30,41,59,.08); transition:.45s cubic-bezier(.6,.6,.2,1);}
          .hl-hotel-card:before {content:''; position:absolute; inset:0; border-radius:30px; padding:1px; background:linear-gradient(120deg,rgba(99,102,241,.55),rgba(139,92,246,.35),transparent 75%); -webkit-mask:linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); mask:linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite: xor; mask-composite: exclude; opacity:.55; pointer-events:none;}
          .hl-hotel-card:hover {transform:translateY(-6px) scale(1.01); box-shadow:0 26px 48px -20px rgba(30,41,59,.4), 0 12px 26px -8px rgba(30,41,59,.2);}          
          .hl-hotel-media {position:relative; width:220px; min-height:100%; flex-shrink:0; overflow:hidden;}
          .hl-hotel-media img {position:absolute; inset:0; width:100%; height:100%; object-fit:cover; transition:1.2s cubic-bezier(.25,.85,.35,1); filter:brightness(.92);}
          .hl-hotel-card:hover .hl-hotel-media img {transform:scale(1.08); filter:brightness(1.02);}          
          .hl-price-badge {position:absolute; top:14px; right:14px; background:linear-gradient(120deg,#4f46e5,#6366f1 60%,#8b5cf6); color:#fff; font-weight:600; font-size:13px; padding:7px 14px 7px; border-radius:999px; box-shadow:0 4px 14px -3px rgba(99,102,241,.6);}          
          .hl-card-body {flex:1; display:flex; flex-direction:column; padding:26px 28px 22px; gap:14px;}          
          .hl-card-top {display:flex; align-items:flex-start; justify-content:space-between; gap:16px;}          
          .hl-card-title {font-size:20px; font-weight:700; color:#1e293b; margin:0; letter-spacing:.4px; line-height:1.25;}
          .hl-rating {display:flex; align-items:center; gap:6px; background:#f1f5f9; padding:6px 12px 6px 10px; border-radius:16px; font-size:13px; font-weight:600; color:#334155;}
          .hl-rating svg {width:15px; height:15px; color:#fbbf24;}
          .hl-location {display:flex; align-items:center; gap:6px; font-size:13.5px; font-weight:500; color:#475569; letter-spacing:.3px;}
          .hl-location svg {width:15px; height:15px; stroke:#64748b;}
          .hl-desc {font-size:14px; line-height:1.55; color:#334155; font-weight:500; letter-spacing:.2px; max-height:72px; overflow:hidden; position:relative;}
          .hl-desc:after {content:''; position:absolute; bottom:0; left:0; right:0; height:30px; background:linear-gradient(to top,#fff,transparent);}          
          .hl-card-footer {display:flex; align-items:flex-end; justify-content:space-between; margin-top:auto; gap:20px;}
          .hl-price-stack {text-align:right;}
          .hl-price-stack strong {display:block; font-size:24px; line-height:1; font-weight:700; background:linear-gradient(90deg,#4f46e5,#6366f1); -webkit-background-clip:text; color:transparent; letter-spacing:.5px;}
          .hl-price-stack span {font-size:12px; font-weight:600; color:#64748b; letter-spacing:.4px;}
          .hl-details-btn {position:relative; background:#fff; border:1px solid #c7d2fe; color:#4f46e5; font-weight:600; font-size:13px; padding:12px 20px; border-radius:14px; text-decoration:none; display:inline-flex; align-items:center; gap:8px; letter-spacing:.4px; transition:.35s cubic-bezier(.6,.6,.2,1); overflow:hidden;}
          .hl-details-btn:before {content:''; position:absolute; inset:0; background:linear-gradient(120deg,#6366f1,#8b5cf6); opacity:0; transition:.4s;}
          .hl-details-btn span {position:relative; z-index:2;}
          .hl-details-btn:hover {color:#fff; border-color:#6366f1; transform:translateY(-3px); box-shadow:0 12px 28px -10px rgba(99,102,241,.55);}          
          .hl-details-btn:hover:before {opacity:1;}
          .hl-empty {text-align:center; padding:120px 20px 80px;}
          .hl-empty svg {width:82px; height:82px; stroke:#94a3b8; margin:0 auto 26px;}
          .hl-empty h3 {font-size:24px; font-weight:700; margin:0 0 12px; color:#1e293b;}
          .hl-empty p {margin:0 0 30px; font-size:15px; font-weight:500; color:#64748b;}
          .hl-clear-btn {background:linear-gradient(120deg,#4f46e5,#6366f1 60%,#8b5cf6); color:#fff; border:none; font-weight:600; font-size:14px; padding:14px 28px; border-radius:16px; box-shadow:0 6px 22px -8px rgba(99,102,241,.65), 0 4px 10px -4px rgba(30,41,59,.25); cursor:pointer; letter-spacing:.4px; transition:.4s;}
          .hl-clear-btn:hover {transform:translateY(-3px); box-shadow:0 14px 36px -12px rgba(99,102,241,.7), 0 8px 18px -6px rgba(30,41,59,.3);}          
        `}</style>
    );

    const filteredHotels = hotels.filter(hotel => {
        const matchesSearch = hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            hotel.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesPrice = !priceFilter || 
                           (priceFilter === 'low' && hotel.price < 150) ||
                           (priceFilter === 'medium' && hotel.price >= 150 && hotel.price <= 250) ||
                           (priceFilter === 'high' && hotel.price > 250);
        return matchesSearch && matchesPrice;
    });

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

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Loading amazing hotels...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50" style={{paddingTop:'0'}}> 
            {pageStyles}
            <div className="hl-hotels-hero">
                <div style={{textAlign:'center', position:'relative', zIndex:2}}>
                    <h1>Discover Amazing Hotels</h1>
                    <p>Find the perfect accommodation for your next adventure from our curated collection of luxury hotels worldwide</p>
                </div>
            </div>
            <div className="hl-search-shell">
              <div className="hl-search-panel">
                <div className="hl-search-group" style={{position:'relative'}}>
                  <label>Search Hotels</label>
                  <svg className="hl-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.35-4.35" /></svg>
                  <input value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} placeholder="Search by name or location..." />
                </div>
                <div className="hl-search-group">
                  <label>Price Range</label>
                  <select value={priceFilter} onChange={(e)=>setPriceFilter(e.target.value)} className="hl-price-filter">
                    <option value="">All Prices</option>
                    <option value="low">Under $150</option>
                    <option value="medium">$150 - $250</option>
                    <option value="high">Above $250</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="hl-hotels-wrapper">
              <div className="hl-results-head">
                <h2>Available Hotels</h2>
                <div className="hl-count-pill">{filteredHotels.length} results</div>
              </div>
              {error && <div style={{marginBottom:30, padding:"16px 20px", borderRadius:16, background:"linear-gradient(120deg,#fef2f2,#fee2e2)", border:"1px solid #fecaca", fontWeight:500, color:'#991b1b'}}>{error}</div>}
              {filteredHotels.length > 0 ? (
                <div className="hl-grid">
                  {filteredHotels.map(hotel=> (
                    <div key={hotel.id} className="hl-hotel-card">
                      <div className="hl-hotel-media">
                        <img src={hotel.imageUrl || 'https://via.placeholder.com/400x250?text=Hotel+Image'} alt={hotel.name} />
                        <div className="hl-price-badge">${hotel.price}/night</div>
                      </div>
                      <div className="hl-card-body">
                        <div className="hl-card-top">
                          <h3 className="hl-card-title">{hotel.name}</h3>
                          <div className="hl-rating">
                            {renderStars(hotel.rating)}
                            <span>{hotel.rating.toFixed(1)}</span>
                          </div>
                        </div>
                        <div className="hl-location">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-6-5.686-6-11a6 6 0 1 1 12 0c0 5.314-6 11-6 11Z" /><circle cx="12" cy="10" r="3" /></svg>
                          {hotel.location}
                        </div>
                        <p className="hl-desc">{hotel.description}</p>
                        <div className="hl-card-footer">
                          <div className="hl-price-stack">
                            <strong>${hotel.price}</strong>
                            <span>per night</span>
                          </div>
                          <Link to={`/hotels/${hotel.id}`} className="hl-details-btn"><span>View Details</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{position:'relative', zIndex:2}}><path d="m9 18 6-6-6-6" /></svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="hl-empty">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18" /><path d="M5 21V5a2 2 0 0 1 2-2h3" /><path d="M19 21V9" /><path d="m9 3 2 2-2 2" /><path d="M12 7h6" /></svg>
                  <h3>No hotels found</h3>
                  <p>Try adjusting your search criteria or filters to find more options.</p>
                  <button onClick={()=>{setSearchTerm(''); setPriceFilter('');}} className="hl-clear-btn">Clear Filters</button>
                </div>
              )}
            </div>
        </div>
    );
};

export default Hotels;