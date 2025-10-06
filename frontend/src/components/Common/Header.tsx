import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

// Inline style helpers
const palette = {
  primaryFrom: '#4f46e5',
  primaryMid: '#6366f1',
  primaryTo: '#8b5cf6',
  textDark: '#1e293b',
  textMid: '#475569',
  textLight: '#64748b'
};

const gradient = `linear-gradient(105deg, ${palette.primaryFrom}, ${palette.primaryMid} 45%, ${palette.primaryTo})`;

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
    borderRadius: 10,
    color: isActive(path) ? palette.primaryFrom : palette.textMid,
    textDecoration: 'none',
    lineHeight: 1,
    transition: 'color .25s, background .25s, transform .25s',
    background: isActive(path) ? 'rgba(99,102,241,0.10)' : 'transparent'
  });

  const navLinkHover: React.CSSProperties = {
    cursor: 'pointer'
  };

  const buttonPrimary: React.CSSProperties = {
    background: gradient,
    color: '#fff',
    padding: '11px 22px',
    fontWeight: 600,
    fontSize: 14,
    border: 'none',
    borderRadius: 10,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    letterSpacing: '.3px',
    boxShadow: '0 4px 12px -2px rgba(99,102,241,.45), 0 2px 4px rgba(0,0,0,.08)',
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
    color: '#fff',
    fontWeight: 600,
    fontSize: 14,
    boxShadow: '0 2px 6px rgba(99,102,241,.5)'
  };

  return (
    <>
      {/* Component-scoped styles for responsive behavior */}
      <style>{`
        .hl-header { position:fixed; top:0; left:0; right:0; z-index:60; backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); background:rgba(255,255,255,0.85); border-bottom:1px solid #e2e8f0; box-shadow:0 4px 16px -4px rgba(30,41,59,.08), 0 2px 6px -2px rgba(30,41,59,.05); }
        .hl-nav-inner { max-width:1280px; margin:0 auto; padding:0 32px; display:flex; align-items:center; height:80px; justify-content:space-between; }
        .hl-brand { display:flex; align-items:center; text-decoration:none; }
        .hl-logo-box { width:48px; height:48px; border-radius:14px; display:flex; align-items:center; justify-content:center; background:${gradient}; box-shadow:0 6px 18px -6px rgba(99,102,241,.6); position:relative; overflow:hidden; }
        .hl-logo-box:after { content:''; position:absolute; inset:0; background:radial-gradient(circle at 30% 30%, rgba(255,255,255,.35), transparent 70%); mix-blend-mode:overlay; }
        .hl-brand-text { font-size:22px; font-weight:700; margin-left:14px; background:${gradient}; -webkit-background-clip:text; color:transparent; line-height:1.1; letter-spacing:.5px; }
        .hl-tagline { font-size:10px; font-weight:600; letter-spacing:1px; text-transform:uppercase; margin-left:14px; margin-top:4px; color:${palette.textLight}; }
        .hl-center { display:flex; align-items:center; gap:4px; }
        .hl-auth { display:flex; align-items:center; gap:12px; }
        .hl-user-box { display:flex; align-items:center; gap:10px; padding:6px 12px 6px 8px; border:1px solid rgba(99,102,241,.25); background:linear-gradient(120deg, rgba(99,102,241,.10), rgba(139,92,246,.10)); border-radius:14px; }
        .hl-logout { background:transparent; border:1px solid #fca5a5; color:#dc2626; border-radius:10px; padding:9px 16px; font-size:13px; font-weight:600; cursor:pointer; transition:.25s; }
        .hl-logout:hover { background:#fee2e2; border-color:#dc2626; }
        .hl-burger { display:none; background:#fff; border:1px solid #cbd5e1; width:44px; height:44px; border-radius:12px; align-items:center; justify-content:center; cursor:pointer; transition:.25s; }
        .hl-burger:hover { background:#f1f5f9; }
        .hl-mobile-panel { display:none; }
        .hl-nav a:hover { transform:translateY(-1px); }
        .hl-nav a:active { transform:translateY(0); }
        .hl-nav a.active { box-shadow:0 0 0 1px rgba(99,102,241,.15) inset; }
        .hl-primary-btn:hover { transform:translateY(-2px); box-shadow:0 10px 22px -6px rgba(99,102,241,.55), 0 4px 10px -4px rgba(0,0,0,.12); }
        .hl-primary-btn:active { transform:translateY(0); }
        @media (max-width: 920px) {
          .hl-nav-inner { padding:0 20px; }
          .hl-center, .hl-auth { display:none; }
          .hl-burger { display:flex; }
          .hl-mobile-panel { display:block; position:absolute; top:80px; left:0; right:0; background:rgba(255,255,255,0.95); backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px); border-bottom:1px solid #e2e8f0; box-shadow:0 16px 30px -12px rgba(30,41,59,.2); animation:hlSlide .35s cubic-bezier(.4,.8,.3,1); }
          .hl-mobile-inner { padding:20px 22px 28px; display:flex; flex-direction:column; gap:8px; }
          .hl-mobile-link { font-size:15px; font-weight:600; color:${palette.textMid}; text-decoration:none; padding:12px 14px; border-radius:12px; display:flex; align-items:center; justify-content:space-between; transition:.25s; }
          .hl-mobile-link:hover { background:rgba(99,102,241,.08); color:${palette.primaryFrom}; }
          .hl-mobile-auth { margin-top:12px; display:flex; flex-direction:column; gap:10px; }
          .hl-mobile-divider { height:1px; background:linear-gradient(to right, transparent, #e2e8f0, transparent); margin:18px 0 10px; }
        }
        @keyframes hlSlide { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }
      `}</style>

      <header className="hl-header">
        <div className="hl-nav-inner">
          {/* Brand */}
          <Link to="/" className="hl-brand" aria-label="HotelLux Home">
            <div className="hl-logo-box">
              <svg width={26} height={26} viewBox="0 0 24 24" stroke="#fff" strokeWidth={1.6} fill="none" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="7" width="16" height="13" rx="2" />
                <path d="M9 7V5a3 3 0 0 1 3-3 3 3 0 0 1 3 3v2" />
                <path d="M10 12h4M10 16h4" />
              </svg>
            </div>
            <div style={{ display:'flex', flexDirection:'column', justifyContent:'center' }}>
              <span className="hl-brand-text">HotelLux</span>
              <span className="hl-tagline">Premium Stays</span>
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
              <Link onClick={()=>setOpen(false)} to="/" className="hl-mobile-link" style={isActive('/')?{background:'rgba(99,102,241,.1)', color:palette.primaryFrom}:undefined}>Home</Link>
              <Link onClick={()=>setOpen(false)} to="/hotels" className="hl-mobile-link" style={isActive('/hotels')?{background:'rgba(99,102,241,.1)', color:palette.primaryFrom}:undefined}>Hotels</Link>
              <Link onClick={()=>setOpen(false)} to="/destinations" className="hl-mobile-link" style={isActive('/destinations')?{background:'rgba(99,102,241,.1)', color:palette.primaryFrom}:undefined}>Destinations</Link>
              {user && (
                <Link onClick={()=>setOpen(false)} to="/dashboard" className="hl-mobile-link" style={isActive('/dashboard')?{background:'rgba(99,102,241,.1)', color:palette.primaryFrom}:undefined}>Dashboard</Link>
              )}
              <div className="hl-mobile-divider" />
              <div className="hl-mobile-auth">
                {user ? (
                  <>
                    <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                      <div style={avatarStyle}>{user.firstName?.[0]}{user.lastName?.[0]}</div>
                      <div style={{ fontSize:14, fontWeight:600, color:palette.textDark }}>{user.firstName}</div>
                    </div>
                    <button onClick={() => { handleLogout(); setOpen(false); }} style={{ ...buttonPrimary, background:'#fff', color:'#dc2626', border:'1px solid #fecaca', boxShadow:'none', fontWeight:600 }}>Sign Out</button>
                  </>
                ) : (
                  <>
                    <Link onClick={()=>setOpen(false)} to="/login" style={{ ...buttonPrimary, background:'#fff', color:palette.primaryFrom, boxShadow:'none', border:'1px solid rgba(99,102,241,.3)' }}>Sign In</Link>
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