import { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const [dropOpen, setDropOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success('Logged out successfully');
      navigate('/');
    } catch {
      toast.error('Logout failed');
    } finally {
      setDropOpen(false);
      setMobileOpen(false);
    }
  };

  const navLinkStyle = ({ isActive }) => ({
    fontSize: 14,
    fontWeight: 500,
    color: isActive ? 'var(--primary)' : 'var(--text2)',
    textDecoration: 'none',
    padding: '6px 12px',
    borderRadius: 8,
    background: isActive ? 'var(--primary-light)' : 'transparent',
    transition: 'all 0.2s',
  });

  const publicLinks = [
    { to: '/', label: 'Home', end: true },
    { to: '/pets', label: 'All Pets' },
    { to: '/pet-care', label: 'Pet Care' },
  ];

  const privateLinks = [
    { to: '/my-requests', label: 'My Requests' },
    { to: '/dashboard/add-pet', label: 'Add Pet' },
  ];

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'var(--surface)',
      borderBottom: '1px solid var(--border)',
      boxShadow: scrolled ? 'var(--shadow)' : 'none',
      transition: 'box-shadow 0.3s',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        padding: '0 24px', height: 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>

        {/* ── Logo ── */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
          <div style={{
            width: 36, height: 36, background: 'var(--primary)', borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
            animation: 'pawBounce 3s ease-in-out infinite',
          }}>🐾</div>
          <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 20, color: 'var(--text)' }}>
            PawsHome
          </span>
        </Link>

        {/* ── Desktop Nav ── */}
        <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {publicLinks.map(({ to, label, end }) => (
            <NavLink key={to} to={to} end={end} style={navLinkStyle}
              onMouseEnter={e => { if (!e.currentTarget.className.includes('active')) e.currentTarget.style.color = 'var(--primary)'; }}
              onMouseLeave={e => { if (!e.currentTarget.className.includes('active')) e.currentTarget.style.color = 'var(--text2)'; }}
            >{label}</NavLink>
          ))}
          {user && privateLinks.map(({ to, label }) => (
            <NavLink key={to} to={to} style={navLinkStyle}
              onMouseEnter={e => { if (!e.currentTarget.className.includes('active')) e.currentTarget.style.color = 'var(--primary)'; }}
              onMouseLeave={e => { if (!e.currentTarget.className.includes('active')) e.currentTarget.style.color = 'var(--text2)'; }}
            >{label}</NavLink>
          ))}
        </div>

        {/* ── Right Side ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {user ? (
            <div ref={dropRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setDropOpen(o => !o)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  background: 'var(--surface2)', border: '1px solid var(--border)',
                  borderRadius: 50, padding: '4px 12px 4px 4px',
                  cursor: 'pointer', transition: 'all 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--primary)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
              >
                <div style={{
                  width: 32, height: 32, borderRadius: '50%', overflow: 'hidden',
                  background: 'var(--primary-light)', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, fontWeight: 700, color: 'var(--primary)',
                }}>
                  {(user.photoURL || user.photo)
                    ? <img src={user.photoURL || user.photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { e.target.style.display = 'none'; }} />
                    : (user.name || user.displayName || 'U').charAt(0).toUpperCase()
                  }
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', maxWidth: 90, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {(user.name || user.displayName || 'User').split(' ')[0]}
                </span>
                <span style={{ fontSize: 9, color: 'var(--text3)', transform: dropOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', marginLeft: -4 }}>▼</span>
              </button>

              {dropOpen && (
                <div className="dropdown-menu" style={{
                  position: 'absolute', top: 'calc(100% + 10px)', right: 0,
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  borderRadius: 14, boxShadow: 'var(--shadow-lg)',
                  minWidth: 200, overflow: 'hidden', zIndex: 300,
                }}>
                  <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)', background: 'var(--surface2)' }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 2 }}>
                      {user.name || user.displayName || 'User'}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text3)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {user.email}
                    </div>
                  </div>

                  {[
                    { to: '/dashboard', icon: '⚡', label: 'Dashboard' },
                    { to: '/dashboard/my-listings', icon: '🐾', label: 'My Listings' },
                    { to: '/my-requests', icon: '📋', label: 'My Requests' },
                    { to: '/dashboard/add-pet', icon: '➕', label: 'Add Pet' },
                  ].map(({ to, icon, label }) => (
                    <Link key={to} to={to} onClick={() => setDropOpen(false)} style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: '10px 16px', fontSize: 13, color: 'var(--text2)',
                      textDecoration: 'none', transition: 'all 0.15s',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'var(--primary-light)'; e.currentTarget.style.color = 'var(--primary)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text2)'; }}
                    >
                      <span style={{ fontSize: 15 }}>{icon}</span>
                      <span>{label}</span>
                    </Link>
                  ))}

                  <div style={{ borderTop: '1px solid var(--border)', padding: '6px 0' }}>
                    <button onClick={handleLogout} style={{
                      width: '100%', padding: '10px 16px',
                      display: 'flex', alignItems: 'center', gap: 10,
                      fontSize: 13, color: '#C53030', fontWeight: 600,
                      background: 'none', border: 'none', cursor: 'pointer',
                      transition: 'background 0.15s', textAlign: 'left',
                    }}
                      onMouseEnter={e => e.currentTarget.style.background = '#FFE8E8'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <span style={{ fontSize: 15 }}>🚪</span> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="btn-primary" style={{
              padding: '9px 22px', borderRadius: 10,
              background: 'var(--primary)', color: '#fff',
              fontSize: 14, fontWeight: 700, textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(232,97,42,.3)',
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--primary-dark)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--primary)'; e.currentTarget.style.transform = 'none'; }}
            >Login</Link>
          )}

          {/* Mobile Toggle */}
          <button className="mobile-only" onClick={() => setMobileOpen(o => !o)} style={{
            background: 'var(--surface2)', border: '1px solid var(--border)',
            borderRadius: 8, width: 36, height: 36,
            alignItems: 'center', justifyContent: 'center',
            fontSize: 18, cursor: 'pointer', color: 'var(--text)',
          }}>{mobileOpen ? '✕' : '☰'}</button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      {mobileOpen && (
        <div className="mobile-menu" style={{
          borderTop: '1px solid var(--border)',
          background: 'var(--surface)', padding: '12px 24px 20px',
        }}>
          {publicLinks.map(({ to, label, end }) => (
            <NavLink key={to} to={to} end={end} onClick={() => setMobileOpen(false)} style={({ isActive }) => ({
              display: 'block', padding: '11px 0', fontSize: 15,
              fontWeight: isActive ? 700 : 400,
              color: isActive ? 'var(--primary)' : 'var(--text2)',
              textDecoration: 'none', borderBottom: '1px solid var(--border)',
            })}>{label}</NavLink>
          ))}
          {user && privateLinks.map(({ to, label }) => (
            <NavLink key={to} to={to} onClick={() => setMobileOpen(false)} style={({ isActive }) => ({
              display: 'block', padding: '11px 0', fontSize: 15,
              fontWeight: isActive ? 700 : 400,
              color: isActive ? 'var(--primary)' : 'var(--text2)',
              textDecoration: 'none', borderBottom: '1px solid var(--border)',
            })}>{label}</NavLink>
          ))}
          {user ? (
            <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Link to="/dashboard" onClick={() => setMobileOpen(false)} style={{
                display: 'block', padding: '10px 14px', background: 'var(--surface2)',
                borderRadius: 10, fontSize: 14, fontWeight: 600, color: 'var(--text)', textDecoration: 'none',
              }}>⚡ Dashboard</Link>
              <button onClick={handleLogout} style={{
                width: '100%', padding: '10px 14px', background: '#FFE8E8',
                color: '#C53030', border: 'none', borderRadius: 10,
                fontWeight: 700, fontSize: 14, cursor: 'pointer', textAlign: 'left',
              }}>🚪 Logout</button>
            </div>
          ) : (
            <Link to="/login" onClick={() => setMobileOpen(false)} style={{
              display: 'block', marginTop: 12, padding: '11px',
              background: 'var(--primary)', color: '#fff', borderRadius: 10,
              fontSize: 14, fontWeight: 700, textAlign: 'center', textDecoration: 'none',
            }}>Login</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;