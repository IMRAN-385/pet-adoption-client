import { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/* ── Dark mode hook ── */
const useDarkMode = () => {
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  return [dark, setDark];
};

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const [dropOpen, setDropOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useDarkMode();
  const dropRef = useRef();
  const nav = useNavigate();

  /* outside click closes dropdown */
  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  /* scroll shadow */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* close mobile menu on navigate */
  useEffect(() => { setMenuOpen(false); }, [nav]);

  const navLinkStyle = ({ isActive }) => ({
    padding: '8px 16px', borderRadius: 8, fontSize: 14, fontWeight: 500,
    color: isActive ? 'var(--primary)' : 'var(--text2)',
    background: isActive ? 'var(--primary-light)' : 'transparent',
    textDecoration: 'none', transition: 'all 0.2s ease',
  });

  const navItems = [
    { to: '/',           label: 'Home',        end: true  },
    { to: '/pets',       label: 'All Pets',    end: false },
    { to: '/pet-care',   label: 'Pet Care',    end: false },
    ...(user ? [{ to: '/my-requests', label: 'My Requests', end: false }] : []),
  ];

  /* ── Theme toggle button ── */
  const ThemeToggle = ({ mobile = false }) => (
    <button
      onClick={() => setDark(d => !d)}
      title={dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      style={{
        width: mobile ? 40 : 36,
        height: mobile ? 40 : 36,
        borderRadius: 10,
        border: '1.5px solid var(--border)',
        background: 'var(--surface)',
        cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: mobile ? 18 : 16,
        transition: 'all 0.2s ease',
        flexShrink: 0,
      }}
      onMouseEnter={e => { e.currentTarget.style.background = 'var(--primary-light)'; e.currentTarget.style.borderColor = 'var(--primary)'; }}
      onMouseLeave={e => { e.currentTarget.style.background = 'var(--surface)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
    >
      {dark ? '💡' : '🌑'}
    </button>
  );

  return (
    <nav style={{
      background: 'var(--surface)',
      borderBottom: '1px solid var(--border)',
      position: 'sticky', top: 0, zIndex: 100,
      boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,.1)' : '0 2px 8px rgba(0,0,0,.04)',
      transition: 'box-shadow 0.3s ease',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto', padding: '0 24px',
        display: 'flex', alignItems: 'center', height: 68, gap: 24,
      }}>

        {/* Logo */}
        <Link to="/" style={{
          display: 'flex', alignItems: 'center', gap: 10,
          fontFamily: "'Playfair Display', serif", fontSize: 22,
          fontWeight: 900, color: 'var(--primary)', textDecoration: 'none',
          transition: 'transform 0.2s ease',
        }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          <span style={{ fontSize: 24, display: 'inline-block', animation: 'pawBounce 3s ease-in-out infinite' }}>🐾</span>
          PawsHome
        </Link>

        {/* Desktop Nav Links */}
        <div className="desktop-nav" style={{ display: 'flex', gap: 4, marginLeft: 'auto' }}>
          {navItems.map(({ to, label, end }) => (
            <NavLink key={to} to={to} end={end} style={navLinkStyle}
              onMouseEnter={e => { if (!e.currentTarget.classList.contains('active')) e.currentTarget.style.background = 'var(--surface2)'; }}
              onMouseLeave={e => { if (!e.currentTarget.classList.contains('active')) e.currentTarget.style.background = 'transparent'; }}
            >{label}</NavLink>
          ))}
        </div>

        {/* Desktop Right — theme toggle + auth */}
        <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <ThemeToggle />

          {user ? (
            <div ref={dropRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setDropOpen(o => !o)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '6px 12px', borderRadius: 10,
                  border: `1.5px solid ${dropOpen ? 'var(--primary)' : 'var(--border)'}`,
                  background: 'var(--surface)', cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--primary)'}
                onMouseLeave={e => { if (!dropOpen) e.currentTarget.style.borderColor = 'var(--border)'; }}
              >
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: 'var(--primary)', color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: 13, flexShrink: 0, overflow: 'hidden',
                }}>
                  {user.photoURL
                    ? <img src={user.photoURL} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : user.name?.[0]?.toUpperCase()
                  }
                </div>
                <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--text)' }}>
                  {user.name?.split(' ')[0]}
                </span>
                <span style={{
                  fontSize: 10, color: 'var(--text3)',
                  transition: 'transform 0.2s',
                  transform: dropOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                }}>▾</span>
              </button>

              {dropOpen && (
                <div className="dropdown-menu" style={{
                  position: 'absolute', top: 'calc(100% + 8px)', right: 0,
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  borderRadius: 14, minWidth: 190,
                  boxShadow: '0 12px 40px rgba(0,0,0,.13)', zIndex: 50, overflow: 'hidden',
                }}>
                  <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)' }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{user.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text3)' }}>{user.email}</div>
                  </div>
                  {[
                    { to: '/dashboard',             label: '📊 Dashboard'   },
                    { to: '/dashboard/add-pet',     label: '➕ Add Pet'     },
                    { to: '/dashboard/my-listings', label: '🐾 My Listings' },
                    { to: '/my-requests',           label: '📋 My Requests' },
                  ].map(({ to, label }) => (
                    <Link key={to} to={to} onClick={() => setDropOpen(false)}
                      style={{ display: 'block', padding: '10px 16px', fontSize: 14, color: 'var(--text2)', textDecoration: 'none', transition: 'all 0.15s' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'var(--surface2)'; e.currentTarget.style.color = 'var(--primary)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text2)'; }}
                    >{label}</Link>
                  ))}
                  <div style={{ borderTop: '1px solid var(--border)', padding: '4px 0' }}>
                    <button
                      onClick={() => { logoutUser(); setDropOpen(false); nav('/'); }}
                      style={{ display: 'block', width: '100%', padding: '10px 16px', fontSize: 14, color: '#e53e3e', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', transition: 'background 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.background = '#fff0f0'}
                      onMouseLeave={e => e.currentTarget.style.background = 'none'}
                    >🚪 Logout</button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', gap: 8 }}>
              <Link to="/login" style={{
                padding: '9px 20px', borderRadius: 10, fontWeight: 600, fontSize: 14,
                color: 'var(--primary)', border: '1.5px solid var(--primary)', textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--primary-light)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >Login</Link>
              <Link to="/register" style={{
                padding: '9px 20px', borderRadius: 10, fontWeight: 600, fontSize: 14,
                background: 'var(--primary)', color: '#fff', textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--primary-dark)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--primary)'}
              >Register</Link>
            </div>
          )}
        </div>

        {/* Hamburger (mobile) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto' }} className="mobile-only">
          <ThemeToggle mobile />
          <button
            onClick={() => setMenuOpen(o => !o)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}
            aria-label="Toggle menu"
          >
            <div style={{ width: 22, display: 'flex', flexDirection: 'column', gap: 5 }}>
              {[0, 1, 2].map(i => (
                <span key={i} style={{
                  display: 'block', height: 2, background: 'var(--text)', borderRadius: 2,
                  transition: 'all 0.3s ease',
                  transform: menuOpen
                    ? i === 0 ? 'rotate(45deg) translate(5px, 5px)'
                      : i === 2 ? 'rotate(-45deg) translate(5px, -5px)'
                      : 'scaleX(0)'
                    : 'none',
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }} />
              ))}
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu" style={{
          borderTop: '1px solid var(--border)',
          background: 'var(--surface)',
          padding: '12px 16px 16px',
        }}>
          {navItems.map(({ to, label, end }) => (
            <NavLink key={to} to={to} end={end} onClick={() => setMenuOpen(false)}
              style={({ isActive }) => ({
                display: 'block', padding: '11px 16px', borderRadius: 10,
                fontSize: 15, fontWeight: 500, marginBottom: 4,
                color: isActive ? 'var(--primary)' : 'var(--text2)',
                background: isActive ? 'var(--primary-light)' : 'transparent',
                textDecoration: 'none',
              })}
            >{label}</NavLink>
          ))}
          <div style={{ marginTop: 8, borderTop: '1px solid var(--border)', paddingTop: 12, display: 'flex', gap: 8 }}>
            {user ? (
              <button
                onClick={() => { logoutUser(); setMenuOpen(false); nav('/'); }}
                style={{ flex: 1, padding: '10px', borderRadius: 10, fontWeight: 600, fontSize: 14, background: '#FFE8E8', color: '#C53030', border: 'none', cursor: 'pointer' }}
              >🚪 Logout</button>
            ) : (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)} style={{ flex: 1, padding: '10px', borderRadius: 10, fontWeight: 600, fontSize: 14, color: 'var(--primary)', border: '1.5px solid var(--primary)', textAlign: 'center' }}>Login</Link>
                <Link to="/register" onClick={() => setMenuOpen(false)} style={{ flex: 1, padding: '10px', borderRadius: 10, fontWeight: 600, fontSize: 14, background: 'var(--primary)', color: '#fff', textAlign: 'center' }}>Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;