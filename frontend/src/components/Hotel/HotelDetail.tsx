import React, { useState, useEffect } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { getHotelById } from '../../services/api';

interface HotelDetailParams {
    id: string;
}

interface Hotel {
    id: string;
    name: string;
    location: string;
    description: string;
    price: number;
    rating: number;
    imageUrl?: string;
    images?: string[];
    amenities?: string[];
    rooms?: Room[];
    highlights?: string[];
    dining?: DiningOption[];
    nearby?: NearbyPlace[];
    policies?: Policy[];
    sustainability?: string[];
    faq?: FAQ[];
    reviews?: Review[];
}

interface Room {
    id: string;
    type: string;
    price: number;
    description: string;
    amenities: string[];
    maxGuests: number;
    images?: string[];
}

interface Review {
    id: string;
    user: string;
    rating: number;
    date: string;
    comment: string;
    stayType?: string;
}

interface FAQ {
    q: string;
    a: string;
}

interface DiningOption {
    name: string;
    type: string;
    hours: string;
    description: string;
}

interface NearbyPlace {
    name: string;
    distance: string;
    type: string;
}

interface Policy {
    title: string;
    items: string[];
}

const mockHotel: Hotel = {
    id: '1',
    name: 'Grand Plaza Hotel',
    location: 'New York, NY',
    description: 'Experience luxury at its finest in the heart of Manhattan. Our Grand Plaza Hotel offers world-class accommodations with breathtaking city views, premium amenities, and exceptional service that will make your stay unforgettable.',
    price: 299,
    rating: 4.5,
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=500&fit=crop',
    images: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=500&fit=crop',
        'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=500&fit=crop',
        'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=500&fit=crop',
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=500&fit=crop'
    ],
    amenities: [
        'Free WiFi', 'Pool', 'Gym', 'Spa', 'Restaurant', 'Bar', 
        'Room Service', 'Concierge', 'Valet Parking', 'Airport Shuttle',
        'Business Center', 'Pet Friendly'
    ],
    rooms: [
        {
            id: '1',
            type: 'Standard Room',
            price: 199,
            description: 'Comfortable room with city views, modern amenities, and premium bedding.',
            amenities: ['Free WiFi', 'Air Conditioning', 'Flat Screen TV', 'Mini Bar'],
            maxGuests: 2
        },
        {
            id: '2',
            type: 'Deluxe Suite',
            price: 299,
            description: 'Spacious suite with separate living area, premium amenities, and stunning views.',
            amenities: ['Free WiFi', 'Air Conditioning', 'Flat Screen TV', 'Mini Bar', 'Living Area', 'City View'],
            maxGuests: 4
        },
        {
            id: '3',
            type: 'Presidential Suite',
            price: 599,
            description: 'Ultimate luxury with panoramic views, private terrace, and exclusive amenities.',
            amenities: ['Free WiFi', 'Air Conditioning', 'Flat Screen TV', 'Mini Bar', 'Living Area', 'City View', 'Private Terrace', 'Butler Service'],
            maxGuests: 6
        }
    ],
    highlights: [
        'Central Park Views', 'Award-Winning Spa', 'Rooftop Infinity Pool', 'Michelin-Star Dining', 'Executive Lounge', '24/7 Concierge'
    ],
    dining: [
        { name: 'Azure Sky Lounge', type: 'Rooftop Bar', hours: '16:00 - 01:00', description: 'Panoramic skyline views with crafted cocktails & tapas.' },
        { name: 'Verde Restaurant', type: 'Fine Dining', hours: '18:00 - 23:00', description: 'Seasonal tasting menus with local organic produce.' },
        { name: 'Brasserie 12', type: 'All-Day Dining', hours: '06:30 - 22:30', description: 'International cuisine & live cooking stations.' },
        { name: 'Café Lumière', type: 'Cafe & Patisserie', hours: '07:00 - 19:00', description: 'Artisanal pastries, specialty coffee & light bites.' }
    ],
    nearby: [
        { name: 'Central Park South Gate', distance: '250 m', type: 'Landmark' },
        { name: '5th Avenue Shopping', distance: '400 m', type: 'Shopping' },
        { name: 'Modern Art Museum', distance: '0.9 km', type: 'Museum' },
        { name: 'Grand Central Terminal', distance: '1.2 km', type: 'Transport' }
    ],
    sustainability: [
        'LEED Gold Certified Building', '100% Renewable Electricity', 'Advanced Water Recycling System', 'Zero Single-Use Plastics Policy', 'Local & Organic Sourcing (65%)', 'EV Charging Stations (12 bays)'
    ],
    policies: [
        { title: 'Check-in / Check-out', items: ['Check-in from 15:00', 'Early check-in subject to availability', 'Check-out until 12:00', 'Express checkout available'] },
        { title: 'Children & Beds', items: ['All children welcome', 'Complimentary baby cots on request', 'Extra beds available (fees apply)'] },
        { title: 'Pets', items: ['Pets allowed (under 15kg)', 'One-time deep cleaning fee applies', 'Pet welcome kit included'] }
    ],
    faq: [
        { q: 'Is airport transfer available?', a: 'Yes, luxury sedan & SUV transfers 24/7. Pre-booking recommended.' },
        { q: 'Do rooms include breakfast?', a: 'Breakfast optional. Executive floor & suites include premium breakfast.' },
        { q: 'Is parking available?', a: 'Valet parking on-site. EV charging included for guests.' }
    ],
    reviews: [
        { id: 'r1', user: 'Sophia L.', rating: 5, date: '2025-08-14', stayType: 'Couple Trip', comment: 'Incredible views and flawless service. The rooftop pool alone is worth the stay.' },
        { id: 'r2', user: 'Michael B.', rating: 4, date: '2025-07-02', stayType: 'Business', comment: 'Executive lounge was excellent for meetings. WiFi blazing fast.' },
        { id: 'r3', user: 'Emily R.', rating: 5, date: '2025-06-19', stayType: 'Family', comment: 'Great connecting rooms. Kids loved the pool & city lights at night.' },
        { id: 'r4', user: 'Daniel K.', rating: 4, date: '2025-05-05', stayType: 'Solo', comment: 'Spa & wellness facilities are top-tier. Room automation was smooth.' }
    ]
};

const HotelDetail: React.FC = () => {
    const { id } = useParams<HotelDetailParams>();
    const history = useHistory();
    const [hotel, setHotel] = useState<Hotel | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState(2);
    const [selectedRoom, setSelectedRoom] = useState<string>('');

    useEffect(() => {
        const fetchHotel = async () => {
            try {
                setLoading(true);
                // For demonstration, use mock data
                setHotel(mockHotel);
                // const response = await getHotelById(id);
                // setHotel(response.data);
            } catch (err) {
                setError('Failed to load hotel details');
                setHotel(mockHotel); // Fallback to mock data
            } finally {
                setLoading(false);
            }
        };

        fetchHotel();
    }, [id]);

    // Booking handler (re-added after refactor)
    const handleBooking = () => {
      if (!selectedRoom || !checkIn || !checkOut) {
        alert('Please select dates, room and guests');
        return;
      }
      history.push(`/booking/${hotel?.id}?room=${selectedRoom}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`);
    };

    // Component-scoped design styles
    const detailStyles = (
      <style>{`
        .hd-hero {position:relative; min-height:460px; display:flex; align-items:flex-end; padding:0; background:#0f172a;}
        .hd-hero-media {position:absolute; inset:0; overflow:hidden;}
        .hd-hero-media img {width:100%; height:100%; object-fit:cover; filter:brightness(.75) saturate(1.05); transform:scale(1.05);}
        .hd-hero::before {content:""; position:absolute; inset:0; background:linear-gradient(180deg,rgba(15,23,42,.1),rgba(15,23,42,.55) 55%, #0f172a 92%);}        
        .hd-hero-inner {position:relative; z-index:2; width:100%; max-width:1280px; margin:0 auto; padding:0 2rem 3.25rem; display:flex; flex-wrap:wrap; gap:2.5rem; align-items:flex-end;}
        .hd-hero-left {flex:1 1 520px; min-width:300px; color:#fff;}
        .hd-breadcrumb {display:flex; gap:.5rem; font-size:.75rem; letter-spacing:.05em; font-weight:500; text-transform:uppercase; margin-bottom:1.1rem; color:#cbd5e1; align-items:center;}
        .hd-breadcrumb a {color:#e2e8f0; text-decoration:none; position:relative;}
        .hd-breadcrumb a:hover {color:#fff;}
        .hd-title {font-size:clamp(2.2rem,4.2vw,3.4rem); font-weight:700; line-height:1.08; letter-spacing:.5px; margin:0 0 1rem; background:linear-gradient(95deg,#fff,#f1f5f9 55%,#e2e8f0); -webkit-background-clip:text; color:transparent;}
        .hd-meta-row {display:flex; flex-wrap:wrap; gap:1rem 1.6rem; align-items:center; margin-bottom:1.4rem;}
        .hd-rating-badge {display:inline-flex; align-items:center; gap:.4rem; background:linear-gradient(120deg,#fbbf24,#f59e0b); color:#1e293b; font-weight:600; padding:.55rem .9rem; border-radius:14px; font-size:.85rem; box-shadow:0 4px 12px -4px rgba(251,191,36,.5);}        
        .hd-location {display:inline-flex; align-items:center; gap:.5rem; font-size:.85rem; font-weight:500; padding:.55rem .9rem; background:rgba(255,255,255,.12); backdrop-filter:blur(6px); border-radius:14px; color:#e2e8f0;}
        .hd-price-chip {align-self:flex-start; background:linear-gradient(120deg,#4f46e5,#6366f1 60%,#8b5cf6); color:#fff; padding:1rem 1.25rem .95rem; border-radius:18px; box-shadow:0 10px 28px -10px rgba(99,102,241,.55); display:flex; flex-direction:column; min-width:170px;}
        .hd-price-chip strong {font-size:2rem; font-weight:700; line-height:1; letter-spacing:.5px;}
        .hd-price-chip span {font-size:.7rem; letter-spacing:.15em; font-weight:600; text-transform:uppercase; opacity:.85; margin-top:.45rem;}
        .hd-tabs-wrap {background:#fff; border-bottom:1px solid #e2e8f0; position:sticky; top:80px; z-index:40;}
        .hd-tabs {max-width:1280px; margin:0 auto; padding:0 .75rem; display:flex; overflow-x:auto; gap:.35rem; scrollbar-width:none;}
        .hd-tabs::-webkit-scrollbar {display:none;}
        .hd-tab-btn {flex:0 0 auto; position:relative; background:transparent; border:none; cursor:pointer; font-size:.8rem; font-weight:600; letter-spacing:.08em; text-transform:uppercase; color:#64748b; padding:1.05rem 1.1rem .95rem; transition:.35s; border-radius:12px;}
        .hd-tab-btn:hover {color:#334155; background:#f1f5f9;}
        .hd-tab-btn.active {color:#4f46e5; background:linear-gradient(120deg,#eef2ff,#e0e7ff);}
        .hd-section-anchor {scroll-margin-top:120px;}
        .hd-layout {max-width:1280px; margin:0 auto; padding:3rem 2rem 5rem;}
        .hd-grid-main {display:grid; grid-template-columns:1fr 360px; gap:2.5rem;}
        @media (max-width:1180px){.hd-grid-main {grid-template-columns:1fr;}}
        .hd-card {background:#fff; border:1px solid #e2e8f0; border-radius:26px; box-shadow:0 10px 28px -12px rgba(30,41,59,.15); overflow:hidden;}
        .hd-card-inner {padding:2.25rem 2.25rem;}
        .hd-card + .hd-card {margin-top:2.25rem;}
        .hd-card h3.section-title {font-size:1.55rem; font-weight:700; letter-spacing:.4px; margin:0 0 1.3rem; display:flex; align-items:center; gap:.65rem;}
        .hd-chip-cloud {display:flex; flex-wrap:wrap; gap:.55rem;}
        .hd-chip {background:#f1f5f9; color:#334155; padding:.65rem 1rem; font-size:.75rem; font-weight:600; letter-spacing:.05em; border-radius:999px; display:inline-flex; align-items:center; gap:.4rem;}
        .hd-chip.gradient {background:linear-gradient(120deg,#4f46e5,#6366f1 65%,#8b5cf6); color:#fff; box-shadow:0 6px 18px -8px rgba(99,102,241,.6);}
        .hd-divider {height:1px; background:linear-gradient(to right,transparent,#e2e8f0,transparent); margin:1.8rem 0 1.4rem;}
        .hd-room-card {border:2px solid #e2e8f0; border-radius:22px; padding:1.75rem 1.6rem; transition:.4s; cursor:pointer; background:#fff; position:relative;}
        .hd-room-card:hover {border-color:#c7d2fe; box-shadow:0 12px 32px -14px rgba(99,102,241,.35);}        
        .hd-room-card.active {border-color:#6366f1; background:#f5f7ff; box-shadow:0 16px 42px -18px rgba(99,102,241,.45);}
        .hd-room-badge {position:absolute; top:14px; right:14px; background:linear-gradient(120deg,#4f46e5,#6366f1); color:#fff; font-size:.65rem; letter-spacing:.12em; padding:.45rem .65rem .4rem; border-radius:8px; font-weight:600;}
        .hd-sidebar {position:sticky; top:120px; background:#fff; border:1px solid #e2e8f0; border-radius:26px; padding:2rem 1.8rem 2.2rem; box-shadow:0 14px 40px -16px rgba(30,41,59,.25);}        
        .hd-book-btn {width:100%; background:linear-gradient(120deg,#4f46e5,#6366f1 60%,#8b5cf6); color:#fff; font-weight:600; letter-spacing:.04em; font-size:.95rem; padding:1rem 1.2rem; border:none; border-radius:14px; box-shadow:0 10px 28px -10px rgba(99,102,241,.6); cursor:pointer; transition:.4s;}
        .hd-book-btn:disabled {opacity:.4; cursor:not-allowed; box-shadow:none;}
        .hd-book-btn:not(:disabled):hover {transform:translateY(-3px); box-shadow:0 18px 38px -14px rgba(99,102,241,.7);}        
        .hd-price-summary {background:#f8fafc; border:1px solid #e2e8f0; border-radius:18px; padding:1rem 1.1rem .85rem; font-size:.75rem; letter-spacing:.05em; font-weight:600; text-transform:uppercase; color:#475569; margin-bottom:1.1rem; display:flex; justify-content:space-between; align-items:center;}
        .hd-total-line {display:flex; justify-content:space-between; align-items:center; font-weight:700; font-size:1.15rem; letter-spacing:.4px; margin-top:.85rem;}
        .hd-section-grid {display:grid; gap:1rem 1.4rem;}
        .hd-nearby-card {display:flex; gap:.9rem; padding:1rem 1rem .95rem; background:#f8fafc; border:1px solid #e2e8f0; border-radius:16px; align-items:flex-start; font-size:.8rem; font-weight:500; color:#475569;}
        .hd-nearby-distance {background:#eef2ff; color:#4338ca; font-weight:600; padding:.55rem .65rem; border-radius:10px; font-size:.6rem; letter-spacing:.1em;}
        .hd-review-card {background:#fff; border:1px solid #e2e8f0; border-radius:18px; padding:1.4rem 1.5rem 1.3rem; box-shadow:0 4px 18px -8px rgba(30,41,59,.15);}
        .hd-policy-block h4 {font-size:1rem; font-weight:700; margin:0 0 .65rem; display:flex; gap:.45rem; align-items:center;}
        .hd-policy-block ul {margin:0; padding-left:1rem; display:flex; flex-direction:column; gap:.35rem;}
        .hd-policy-block li {font-size:.85rem; color:#475569; line-height:1.35;}
        .hd-faq-item {border:1px solid #e2e8f0; border-radius:16px; padding:1rem 1.2rem .95rem; background:#fff;}
        .hd-faq-item p.question {font-weight:600; font-size:.9rem; margin:0 0 .4rem; color:#1e293b;}
        .hd-faq-item p.answer {font-size:.8rem; line-height:1.45; color:#475569; margin:0;}
        html {scroll-behavior:smooth;}
      `}</style>
    );

    // Smooth scroll to section
    const tabs: { id: string; label: string; condition?: boolean }[] = [
      { id: 'overview', label: 'Overview' },
      { id: 'rooms', label: 'Rooms', condition: !!hotel?.rooms?.length },
      { id: 'highlights', label: 'Highlights', condition: !!hotel?.highlights?.length },
      { id: 'dining', label: 'Dining', condition: !!hotel?.dining?.length },
      { id: 'nearby', label: 'Location', condition: !!hotel?.nearby?.length },
      { id: 'sustainability', label: 'Sustainability', condition: !!hotel?.sustainability?.length },
      { id: 'reviews', label: 'Reviews', condition: !!hotel?.reviews?.length },
      { id: 'policies', label: 'Policies', condition: !!(hotel?.policies?.length || hotel?.faq?.length) }
    ].filter(t => t.condition === undefined || t.condition);

    if (!hotel) return null;

    return (
        <div className="min-h-screen bg-gray-50 pt-0">
          {detailStyles}
          {/* Hero */}
          <section className="hd-hero">
            <div className="hd-hero-media">
              <img src={hotel.images?.[0] || hotel.imageUrl} alt={hotel.name} />
            </div>
            <div className="hd-hero-inner">
              <div className="hd-hero-left">
                <div className="hd-breadcrumb">
                  <Link to="/">Home</Link>
                  <span>/</span>
                  <Link to="/hotels">Hotels</Link>
                </div>
                <h1 className="hd-title">{hotel.name}</h1>
                <div className="hd-meta-row">
                  <div className="hd-rating-badge">{hotel.rating.toFixed(1)} ★</div>
                  <div className="hd-location">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-6-5.686-6-11a6 6 0 1 1 12 0c0 5.314-6 11-6 11Z" /><circle cx="12" cy="10" r="3" /></svg>
                    {hotel.location}
                  </div>
                  <div className="hd-chip gradient">Verified Luxury</div>
                </div>
                {hotel.highlights && (
                  <div className="hd-chip-cloud" style={{marginTop:'.25rem'}}>
                    {hotel.highlights.slice(0,4).map(h => <span key={h} className="hd-chip">{h}</span>)}
                  </div>
                )}
              </div>
              <div className="hd-price-chip">
                <strong>${hotel.price}</strong>
                <span>Per Night</span>
              </div>
            </div>
          </section>

          {/* Tabs */}
          <div className="hd-tabs-wrap">
            <div className="hd-tabs">
              {tabs.map(tab => (
                <button key={tab.id} className={`hd-tab-btn`} onClick={()=>document.getElementById(tab.id)?.scrollIntoView({behavior:'smooth'})}>{tab.label}</button>
              ))}
            </div>
          </div>

          {/* Main layout */}
          <div className="hd-layout">
            <div className="hd-grid-main">
              <div>
                {/* Overview Section */}
                <div id="overview" className="hd-section-anchor hd-card">
                  <div className="hd-card-inner">
                    {/* Inject existing primary info / images removed from here (already in hero) keep amenities */}
                    <h3 className="section-title"><svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg> Overview</h3>
                    <p className="text-gray-700 leading-relaxed text-base" style={{fontWeight:500}}>{hotel.description}</p>
                    <div className="hd-divider" />
                    <h4 className="text-lg font-semibold mb-4 text-gray-900 flex items-center gap-2"><svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg> Amenities</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {hotel.amenities?.map(a => <span key={a} className="text-sm text-gray-700 flex items-center gap-2"><svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>{a}</span>)}
                    </div>
                  </div>
                </div>

                {/* Rooms Section */}
                {hotel.rooms?.length ? (
                  <div id="rooms" className="hd-section-anchor hd-card">
                    <div className="hd-card-inner">
                      <h3 className="section-title"><svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 12h18M3 17h18"/></svg> Rooms</h3>
                      <div className="flex flex-col gap-6">
                        {hotel.rooms.map(r => (
                          <div key={r.id} className={`hd-room-card ${r.id===selectedRoom ? 'active':''}`} onClick={()=>setSelectedRoom(r.id)}>
                            <div className="hd-room-badge">SELECT</div>
                            <h4 className="text-xl font-semibold mb-1 text-gray-900">{r.type}</h4>
                            <p className="text-sm text-gray-600 mb-3 leading-relaxed max-w-prose">{r.description}</p>
                            <div className="flex flex-wrap gap-3 mb-4">
                              {r.amenities.slice(0,6).map(am => <span key={am} className="hd-chip" style={{fontSize:'.65rem'}}>{am}</span>)}
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="text-2xl font-bold text-primary-600">${r.price}<span className="text-xs text-gray-500 font-medium ml-1">/night</span></div>
                              <div className="text-xs font-semibold tracking-wide text-gray-500">Max {r.maxGuests} Guests</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ): null}

                {/* Highlights */}
                {hotel.highlights?.length ? (
                  <div id="highlights" className="hd-section-anchor hd-card">
                    <div className="hd-card-inner">
                      <h3 className="section-title"><svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2"/></svg> Highlights</h3>
                      <div className="hd-chip-cloud">
                        {hotel.highlights.map(h => <span key={h} className="hd-chip">{h}</span>)}
                      </div>
                    </div>
                  </div>
                ) : null}

                {/* Dining */}
                {hotel.dining?.length ? (
                  <div id="dining" className="hd-section-anchor hd-card">
                    <div className="hd-card-inner">
                      <h3 className="section-title"><svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg> Dining & Culinary</h3>
                      <div className="flex flex-col gap-6">
                        {hotel.dining.map(d => (
                          <div key={d.name} className="border border-gray-200 rounded-2xl p-5 hover:shadow-sm transition">
                            <div className="flex flex-wrap items-baseline gap-3 mb-1">
                              <h4 className="text-lg font-semibold text-gray-900 m-0">{d.name}</h4>
                              <span className="hd-chip" style={{fontSize:'.55rem'}}>{d.type}</span>
                              <span className="text-xs font-semibold tracking-wide text-primary-600">{d.hours}</span>
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed m-0">{d.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : null}

                {/* Nearby */}
                {hotel.nearby?.length ? (
                  <div id="nearby" className="hd-section-anchor hd-card">
                    <div className="hd-card-inner">
                      <h3 className="section-title"><svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg> Location & Nearby</h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {hotel.nearby.map(n => (
                          <div key={n.name} className="hd-nearby-card">
                            <span className="hd-nearby-distance">{n.distance}</span>
                            <div>
                              <p className="m-0 font-semibold text-gray-800 text-sm">{n.name}</p>
                              <p className="m-0 text-[10px] tracking-wide font-semibold text-gray-500 uppercase">{n.type}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ): null}

                {/* Sustainability */}
                {hotel.sustainability?.length ? (
                  <div id="sustainability" className="hd-section-anchor hd-card">
                    <div className="hd-card-inner">
                      <h3 className="section-title"><svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg> Sustainability</h3>
                      <ul className="list-none p-0 m-0 flex flex-col gap-3">
                        {hotel.sustainability.map(s => <li key={s} className="text-sm text-gray-700 flex items-start gap-2"><svg className="w-4 h-4 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>{s}</li>)}
                      </ul>
                    </div>
                  </div>
                ): null}

                {/* Reviews */}
                {hotel.reviews?.length ? (
                  <div id="reviews" className="hd-section-anchor hd-card">
                    <div className="hd-card-inner">
                      <h3 className="section-title"><svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg> Guest Reviews</h3>
                      <div className="grid md:grid-cols-2 gap-5">
                        {hotel.reviews.map(r => (
                          <div key={r.id} className="hd-review-card">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <p className="m-0 font-semibold text-gray-800 text-sm">{r.user}</p>
                                <p className="m-0 text-[11px] text-gray-500 font-medium">{r.stayType} • {new Date(r.date).toLocaleDateString()}</p>
                              </div>
                              <div className="flex items-center gap-1">
                                {Array.from({length:5}).map((_,i)=>(<svg key={i} className={`w-4 h-4 ${i < r.rating ? 'text-yellow-400':'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>))}
                              </div>
                            </div>
                            <p className="text-[13px] leading-relaxed text-gray-700 m-0">{r.comment}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ): null}

                {/* Policies & FAQ */}
                {(hotel.policies?.length || hotel.faq?.length) ? (
                  <div id="policies" className="hd-section-anchor hd-card">
                    <div className="hd-card-inner">
                      <h3 className="section-title"><svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2"/></svg> Policies & FAQ</h3>
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="flex flex-col gap-6">
                          {hotel.policies?.map(p => (
                            <div key={p.title} className="hd-policy-block">
                              <h4><svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>{p.title}</h4>
                              <ul>
                                {p.items.map(it => <li key={it}>{it}</li>)}
                              </ul>
                            </div>
                          ))}
                        </div>
                        <div className="flex flex-col gap-4">
                          {hotel.faq?.map(f => (
                            <div key={f.q} className="hd-faq-item">
                              <p className="question">{f.q}</p>
                              <p className="answer">{f.a}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ): null}

              </div>

              {/* Sidebar */}
              <aside className="hd-sidebar">
                <h3 className="text-lg font-bold text-gray-900 mb-5">Book Your Stay</h3>
                <div className="flex flex-col gap-5 mb-4">
                  <div>
                    <label className="block text-xs font-semibold tracking-wide text-gray-600 mb-1.5">Check-in</label>
                    <input type="date" value={checkIn} onChange={e=>setCheckIn(e.target.value)} className="input-field" min={new Date().toISOString().split('T')[0]} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold tracking-wide text-gray-600 mb-1.5">Check-out</label>
                    <input type="date" value={checkOut} onChange={e=>setCheckOut(e.target.value)} className="input-field" min={checkIn || new Date().toISOString().split('T')[0]} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold tracking-wide text-gray-600 mb-1.5">Guests</label>
                    <select value={guests} onChange={e=>setGuests(parseInt(e.target.value))} className="input-field">
                      {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} Guest{n>1?'s':''}</option>)}
                    </select>
                  </div>
                </div>
                {selectedRoom && checkIn && checkOut && (
                  <div>
                    <div className="hd-price-summary">
                      <span>Room Rate</span>
                      <span>${hotel.rooms?.find(r=>r.id===selectedRoom)?.price}</span>
                    </div>
                    <div className="text-xs text-gray-500 font-medium tracking-wide flex justify-between">
                      <span>Nights</span>
                      <span>{Math.max(1, Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000))}</span>
                    </div>
                    <div className="hd-total-line">
                      <span>Total</span>
                      <span>${(hotel.rooms?.find(r=>r.id===selectedRoom)?.price||0)* Math.max(1, Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000))}</span>
                    </div>
                    <div className="text-[10px] text-gray-500 tracking-wide font-semibold mt-2">Taxes & fees calculated at checkout</div>
                    <div className="hd-divider" />
                  </div>
                )}
                <button className="hd-book-btn" disabled={!selectedRoom || !checkIn || !checkOut} onClick={handleBooking}>Book Now</button>
                <p className="text-[11px] text-gray-500 font-medium tracking-wide text-center mt-3">Free cancellation • No booking fees • Secure payment</p>
              </aside>
            </div>
          </div>
        </div>
    );
};

export default HotelDetail;