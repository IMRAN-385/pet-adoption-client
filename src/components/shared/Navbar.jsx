import { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropRef = useRef();
  const nav = useNavigate();

  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const navLinkStyle = ({ isActive }) => ({
    padding: '8px 16px', borderRadius: 8, fontSize: 14, fontWeight: 500,
    color: isActive ? 'var(--primary)' : 'var(--text2)',
    background: isActive ? 'var(--primary-light)' : 'transparent',
    textDecoration: 'none', transition: '.2s',
  });

  return (
    <nav style={{
      background: 'var(--surface)', borderBottom: '1px solid var(--border)',
      position: 'sticky', top: 0, zIndex: 100,
      boxShadow: '0 2px 12px rgba(0,0,0,.06)'
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto', padding: '0 24px',
        display: 'flex', alignItems: 'center', height: 68, gap: 24
      }}>
        {/* Logo */}
        <Link to="/" style={{
          display: 'flex', alignItems: 'center', gap: 10,
          fontFamily: "'Playfair Display', serif", fontSize: 22,
          fontWeight: 900, color: 'var(--primary)', textDecoration: 'none'
        }}>
          🐾 PawsHome
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', gap: 4, marginLeft: 'auto' }} className="desktop-nav">
          <NavLink to="/" end style={navLinkStyle}>Home</NavLink>
          <NavLink to="/pets" style={navLinkStyle}>All Pets</NavLink>
          <NavLink to="/pet-care" style={navLinkStyle}>Pet Care</NavLink>
          {user && <NavLink to="/my-requests" style={navLinkStyle}>My Requests</NavLink>}
        </div>

        {/* Auth */}
        {user ? (
          <div ref={dropRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setOpen(!open)}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '6px 12px', borderRadius: 10,
                border: '1.5px solid var(--border)', background: 'var(--surface)',
                cursor: 'pointer', transition: '.2s',
              }}
            >
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: 'var(--primary)', color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: 13, flexShrink: 0,
                overflow: 'hidden',
              }}>
                {user.photoURL
                  ? <img src={user.photoURL} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : user.name?.[0]?.toUpperCase()
                }
              </div>
              <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--text)' }}>
                {user.name?.split(' ')[0]}
              </span>
              <span style={{ fontSize: 12, color: 'var(--text3)' }}>▾</span>
            </button>
            {open && (
              <div style={{
                position: 'absolute', top: 'calc(100% + 6px)', right: 0,
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 12, minWidth: 180,
                boxShadow: '0 8px 32px rgba(0,0,0,.1)', zIndex: 50, overflow: 'hidden'
              }}>
                {[
                  { to: '/dashboard', label: '📊 Dashboard' },
                  { to: '/dashboard/add-pet', label: '➕ Add Pet' },
                  { to: '/dashboard/my-listings', label: '🐾 My Listings' },
                ].map(({ to, label }) => (
                  <Link
                    key={to} to={to}
                    onClick={() => setOpen(false)}
                    style={{
                      display: 'block', padding: '10px 16px', fontSize: 14,
                      color: 'var(--text2)', textDecoration: 'none', transition: '.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--surface2)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >{label}</Link>
                ))}
                <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '4px 0' }} />
                <button
                  onClick={() => { logoutUser(); setOpen(false); nav('/'); }}
                  style={{
                    display: 'block', width: '100%', padding: '10px 16px',
                    fontSize: 14, color: '#e53e3e', background: 'none',
                    border: 'none', textAlign: 'left', cursor: 'pointer',
                  }}
                >🚪 Logout</button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login"
            style={{
              padding: '10px 22px', borderRadius: 10, fontWeight: 600,
              fontSize: 14, background: 'var(--primary)', color: '#fff',
              textDecoration: 'none', transition: '.2s',
            }}
          >Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
