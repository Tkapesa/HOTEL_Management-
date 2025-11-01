import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

// Inline style helpers - Luxury Champagne Gold & Navy Theme
const palette = {
  primaryFrom: '#d4af37',
  primaryMid: '#e4bf47',
  primaryTo: '#f4d03f',
  navyDark: '#1a1f2e',
  navyMid: '#2c3e50',
  textDark: '#1e293b',
  textMid: '#475569',
  textLight: '#64748b'
};

const gradient = `linear-gradient(135deg, ${palette.primaryFrom}, ${palette.primaryMid} 50%, ${palette.primaryTo})`;

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const history = useHistory();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    history.push('/');
  };

  const isActive = (path: string) => location.pathname === path;

  const navLinkStyle = (path: string): React.CSSProperties => ({
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    fontWeight: 500,
    fontSize: 14,
    padding: '10px 16px',
    borderRadius: 0,
    color: isActive(path) ? palette.primaryFrom : palette.textMid,
    textDecoration: 'none',
    lineHeight: 1,
    transition: 'color .25s, background .25s, transform .25s',
    background: isActive(path) ? 'rgba(212,175,55,0.08)' : 'transparent',
    borderBottom: isActive(path) ? `2px solid ${palette.primaryFrom}` : '2px solid transparent'
  });

  const navLinkHover: React.CSSProperties = {
    cursor: 'pointer'
  };

  const buttonPrimary: React.CSSProperties = {
    background: gradient,
    color: palette.navyDark,
    padding: '11px 24px',
    fontWeight: 600,
    fontSize: 13,
    border: 'none',
    borderRadius: 0,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    letterSpacing: '.08em',
    boxShadow: '0 4px 14px -2px rgba(212,175,55,.4), 0 2px 6px rgba(0,0,0,.08)',
    transition: 'transform .25s, box-shadow .25s',
    textDecoration: 'none'
  };

  const avatarStyle: React.CSSProperties = {
    width: 40,
    height: 40,
    borderRadius: '50%',
    background: gradient,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: palette.navyDark,
    fontWeight: 700,
    fontSize: 14,
    boxShadow: '0 3px 10px rgba(212,175,55,.45)',
    border: '2px solid rgba(212,175,55,0.3)'
  };

  return (
    <>
      {/* Component-scoped styles for responsive behavior */}
      <style>{`
        .hl-header { position:fixed; top:0; left:0; right:0; z-index:60; backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); background:rgba(255,255,255,0.92); border-bottom:2px solid rgba(212,175,55,0.2); box-shadow:0 4px 20px -4px rgba(26,31,46,.12), 0 2px 8px -2px rgba(0,0,0,.06); }
        .hl-nav-inner { max-width:1280px; margin:0 auto; padding:0 32px; display:flex; align-items:center; height:80px; justify-content:space-between; }
        .hl-brand { display:flex; align-items:center; text-decoration:none; }
        .hl-logo-box { width:50px; height:50px; border-radius:0; display:flex; align-items:center; justify-content:center; background:${gradient}; box-shadow:0 6px 20px -6px rgba(212,175,55,.55); position:relative; overflow:hidden; border:2px solid rgba(212,175,55,0.3); }
        .hl-logo-box:after { content:''; position:absolute; inset:0; background:linear-gradient(135deg, rgba(255,255,255,.25) 0%, transparent 60%); }
        .hl-brand-text { font-size:22px; font-weight:700; margin-left:14px; background:${gradient}; -webkit-background-clip:text; color:transparent; line-height:1.1; letter-spacing:.8px; }
        .hl-tagline { font-size:9px; font-weight:600; letter-spacing:1.5px; text-transform:uppercase; margin-left:14px; margin-top:4px; color:${palette.textLight}; }
        .hl-center { display:flex; align-items:center; gap:4px; }
        .hl-auth { display:flex; align-items:center; gap:12px; }
        .hl-user-box { display:flex; align-items:center; gap:10px; padding:6px 12px 6px 8px; border:1px solid rgba(212,175,55,.3); background:linear-gradient(120deg, rgba(212,175,55,.08), rgba(244,208,63,.08)); border-radius:0; }
        .hl-logout { background:transparent; border:1px solid rgba(212,175,55,.4); color:${palette.navyDark}; border-radius:0; padding:9px 18px; font-size:12px; font-weight:600; letter-spacing:.06em; text-transform:uppercase; cursor:pointer; transition:.25s; }
        .hl-logout:hover { background:rgba(212,175,55,.1); border-color:${palette.primaryFrom}; }
        .hl-burger { display:none; background:#fff; border:1px solid rgba(212,175,55,.3); width:44px; height:44px; border-radius:0; align-items:center; justify-content:center; cursor:pointer; transition:.25s; }
        .hl-burger:hover { background:rgba(212,175,55,.08); border-color:${palette.primaryFrom}; }
        .hl-mobile-panel { display:none; }
        .hl-nav a:hover { color:${palette.primaryFrom}; }
        .hl-nav a:active { transform:translateY(0); }
        .hl-nav a.active { }
        .hl-primary-btn { text-transform:uppercase; }
        .hl-primary-btn:hover { transform:translateY(-2px); box-shadow:0 10px 24px -6px rgba(212,175,55,.5), 0 4px 12px -4px rgba(0,0,0,.15); }
        .hl-primary-btn:active { transform:translateY(0); }
        @media (max-width: 920px) {
          .hl-nav-inner { padding:0 20px; }
          .hl-center, .hl-auth { display:none; }
          .hl-burger { display:flex; }
          .hl-mobile-panel { display:block; position:absolute; top:80px; left:0; right:0; background:rgba(255,255,255,0.96); backdrop-filter:blur(14px); -webkit-backdrop-filter:blur(14px); border-bottom:2px solid rgba(212,175,55,0.2); box-shadow:0 16px 36px -12px rgba(26,31,46,.25); animation:hlSlide .35s cubic-bezier(.4,.8,.3,1); }
          .hl-mobile-inner { padding:20px 22px 28px; display:flex; flex-direction:column; gap:8px; }
          .hl-mobile-link { font-size:15px; font-weight:600; color:${palette.textMid}; text-decoration:none; padding:12px 14px; border-radius:0; display:flex; align-items:center; justify-content:space-between; transition:.25s; border-left:3px solid transparent; }
          .hl-mobile-link:hover { background:rgba(212,175,55,.08); color:${palette.primaryFrom}; border-left-color:${palette.primaryFrom}; }
          .hl-mobile-auth { margin-top:12px; display:flex; flex-direction:column; gap:10px; }
          .hl-mobile-divider { height:2px; background:linear-gradient(to right, transparent, rgba(212,175,55,0.3), transparent); margin:18px 0 10px; }
        }
        @keyframes hlSlide { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }
      `}</style>

      <header className="hl-header">
        <div className="hl-nav-inner">
          {/* Brand */}
          <Link to="/" className="hl-brand" aria-label="HotelLux Home">
            <div className="hl-logo-box">
              <svg width={28} height={28} viewBox="0 0 24 24" stroke={palette.navyDark} strokeWidth={1.8} fill="none" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="7" width="16" height="13" rx="1" />
                <path d="M9 7V5a3 3 0 0 1 3-3 3 3 0 0 1 3 3v2" />
                <path d="M10 12h4M10 16h4" />
              </svg>
            </div>
            <div style={{ display:'flex', flexDirection:'column', justifyContent:'center' }}>
              <span className="hl-brand-text">HotelLux</span>
              <span className="hl-tagline">Luxury Collection</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hl-center hl-nav" aria-label="Main Navigation">
            <Link style={navLinkStyle('/')} onMouseEnter={e=>Object.assign(e.currentTarget.style, navLinkHover)} className={isActive('/') ? 'active' : ''} to="/">Home</Link>
            <Link style={navLinkStyle('/hotels')} className={isActive('/hotels') ? 'active' : ''} to="/hotels">Hotels</Link>
            <Link style={navLinkStyle('/destinations')} className={isActive('/destinations') ? 'active' : ''} to="/destinations">Destinations</Link>
            {user && (
              <Link style={navLinkStyle('/dashboard')} className={isActive('/dashboard') ? 'active' : ''} to="/dashboard">Dashboard</Link>
            )}
          </nav>

          {/* Desktop Auth */}
          <div className="hl-auth">
            {user ? (
              <>
                <div className="hl-user-box">
                  <div style={avatarStyle}>{user.firstName?.[0]}{user.lastName?.[0]}</div>
                  <div style={{ lineHeight:1.1 }}>
                    <div style={{ fontSize:13, fontWeight:600, color:palette.textDark }}>{user.firstName}</div>
                    <div style={{ fontSize:11, fontWeight:500, color:palette.textLight }}>Welcome back</div>
                  </div>
                </div>
                <button className="hl-logout" onClick={handleLogout}>Sign Out</button>
              </>
            ) : (
              <>
                <Link style={{ ...navLinkStyle('/login'), padding:'10px 14px' }} to="/login">Sign In</Link>
                <Link to="/register" style={buttonPrimary} className="hl-primary-btn">Get Started</Link>
              </>
            )}
          </div>

          {/* Burger */}
          <button aria-label="Toggle navigation menu" onClick={()=>setOpen(o=>!o)} className="hl-burger">
            <svg width={22} height={22} viewBox="0 0 24 24" stroke="#334155" strokeWidth={1.8} fill="none" strokeLinecap="round" strokeLinejoin="round">
              {open ? (
                <path d="M6 6L18 18M6 18L18 6" />
              ) : (
                <>
                  <path d="M3 6h18" /><path d="M7 12h14" /><path d="M11 18h10" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Panel */}
        {open && (
          <div className="hl-mobile-panel">
            <div className="hl-mobile-inner">
              <Link onClick={()=>setOpen(false)} to="/" className="hl-mobile-link" style={isActive('/')?{background:'rgba(212,175,55,.08)', color:palette.primaryFrom, borderLeftColor:palette.primaryFrom}:undefined}>Home</Link>
              <Link onClick={()=>setOpen(false)} to="/hotels" className="hl-mobile-link" style={isActive('/hotels')?{background:'rgba(212,175,55,.08)', color:palette.primaryFrom, borderLeftColor:palette.primaryFrom}:undefined}>Hotels</Link>
              <Link onClick={()=>setOpen(false)} to="/destinations" className="hl-mobile-link" style={isActive('/destinations')?{background:'rgba(212,175,55,.08)', color:palette.primaryFrom, borderLeftColor:palette.primaryFrom}:undefined}>Destinations</Link>
              {user && (
                <Link onClick={()=>setOpen(false)} to="/dashboard" className="hl-mobile-link" style={isActive('/dashboard')?{background:'rgba(212,175,55,.08)', color:palette.primaryFrom, borderLeftColor:palette.primaryFrom}:undefined}>Dashboard</Link>
              )}
              <div className="hl-mobile-divider" />
              <div className="hl-mobile-auth">
                {user ? (
                  <>
                    <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                      <div style={avatarStyle}>{user.firstName?.[0]}{user.lastName?.[0]}</div>
                      <div style={{ fontSize:14, fontWeight:600, color:palette.textDark }}>{user.firstName}</div>
                    </div>
                    <button onClick={() => { handleLogout(); setOpen(false); }} style={{ ...buttonPrimary, background:'#fff', color:palette.navyDark, border:`1px solid rgba(212,175,55,.3)`, boxShadow:'none', fontWeight:600 }}>Sign Out</button>
                  </>
                ) : (
                  <>
                    <Link onClick={()=>setOpen(false)} to="/login" style={{ ...buttonPrimary, background:'#fff', color:palette.primaryFrom, boxShadow:'none', border:`1px solid rgba(212,175,55,.3)` }}>Sign In</Link>
                    <Link onClick={()=>setOpen(false)} to="/register" style={buttonPrimary} className="hl-primary-btn">Get Started</Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;