import { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { FiMenu, FiX, FiChevronDown, FiLogOut, FiUser, FiList, FiPlusCircle, FiGrid } from 'react-icons/fi';
import { FaPaw } from 'react-icons/fa';

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

  const publicLinks = [
    { to: '/', label: 'Home', end: true },
    { to: '/pets', label: 'All Pets' },
    { to: '/pet-care', label: 'Pet Care' },
  ];

  const privateLinks = [
    { to: '/my-requests', label: 'My Requests' },
    { to: '/dashboard/add-pet', label: 'Add Pet' },
  ];

  const dropLinks = [
    { to: '/dashboard',             label: 'Dashboard',   icon: <FiGrid size={14} /> },
    { to: '/dashboard/my-listings', label: 'My Listings', icon: <FiList size={14} /> },
    { to: '/my-requests',           label: 'My Requests', icon: <FiUser size={14} /> },
    { to: '/dashboard/add-pet',     label: 'Add Pet',     icon: <FiPlusCircle size={14} /> },
  ];

  const navLinkStyle = ({ isActive }) => ({
    fontSize: 13,
    fontWeight: 500,
    letterSpacing: '0.02em',
    color: isActive ? '#fff' : 'rgba(255,255,255,0.5)',
    textDecoration: 'none',
    padding: '6px 14px',
    borderRadius: 8,
    background: isActive ? 'rgba(255,255,255,0.08)' : 'transparent',
    border: isActive ? '1px solid rgba(255,255,255,0.1)' : '1px solid transparent',
    transition: 'all 0.2s',
  });

  return (
    <>
      <style>{`
        .nav-link-hover:hover {
          color: rgba(255,255,255,0.9) !important;
          background: rgba(255,255,255,0.07) !important;
          border-color: rgba(255,255,255,0.12) !important;
        }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-only { display: flex !important; }
        }
        @media (min-width: 769px) {
          .mobile-only { display: none !important; }
          .desktop-nav { display: flex !important; }
        }
      `}</style>

      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'rgba(6,4,15,0.8)' : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(20px) saturate(1.4)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(1.4)' : 'none',
        transition: 'background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease',
      }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          padding: '0 28px', height: 64,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>

          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'linear-gradient(135deg, #7c5cfc, #a78bfa)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(124,92,252,0.4)',
              flexShrink: 0,
            }}>
              <FaPaw size={17} color="#fff" />
            </div>
            <span style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700, fontSize: 19,
              color: '#f0eeff',
              letterSpacing: '-0.01em',
            }}>
              PawsHome
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {publicLinks.map(({ to, label, end }) => (
              <NavLink key={to} to={to} end={end} style={navLinkStyle} className="nav-link-hover">{label}</NavLink>
            ))}
            {user && privateLinks.map(({ to, label }) => (
              <NavLink key={to} to={to} style={navLinkStyle} className="nav-link-hover">{label}</NavLink>
            ))}
          </div>

          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {user ? (
              <div ref={dropRef} style={{ position: 'relative' }}>
                <button
                  onClick={() => setDropOpen(o => !o)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: 50, padding: '4px 12px 4px 4px',
                    cursor: 'pointer', transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
                >
                  <div style={{
                    width: 30, height: 30, borderRadius: '50%', overflow: 'hidden',
                    background: 'rgba(124,92,252,0.2)',
                    border: '1px solid rgba(124,92,252,0.3)',
                    flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, fontWeight: 700, color: '#a78bfa',
                  }}>
                    {(user.photoURL || user.photo)
                      ? <img src={user.photoURL || user.photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { e.target.style.display = 'none'; }} />
                      : (user.name || user.displayName || 'U').charAt(0).toUpperCase()
                    }
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.85)', maxWidth: 90, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {(user.name || user.displayName || 'User').split(' ')[0]}
                  </span>
                  <FiChevronDown size={12} style={{ color: 'rgba(255,255,255,0.4)', transform: dropOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                </button>

                {dropOpen && (
                  <div style={{
                    position: 'absolute', top: 'calc(100% + 10px)', right: 0,
                    background: 'rgba(8,6,18,0.9)',
                    backdropFilter: 'blur(24px) saturate(1.5)',
                    WebkitBackdropFilter: 'blur(24px) saturate(1.5)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 14,
                    boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
                    minWidth: 200, overflow: 'hidden', zIndex: 300,
                  }}>
                    <div style={{ padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.03)' }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#f0eeff', marginBottom: 2 }}>
                        {user.name || user.displayName || 'User'}
                      </div>
                      <div style={{ fontSize: 11, color: 'rgba(240,238,255,0.3)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {user.email}
                      </div>
                    </div>

                    {dropLinks.map(({ to, label, icon }) => (
                      <Link key={to} to={to} onClick={() => setDropOpen(false)} style={{
                        display: 'flex', alignItems: 'center', gap: 10,
                        padding: '10px 16px', fontSize: 13, color: 'rgba(240,238,255,0.55)',
                        textDecoration: 'none', transition: 'all 0.15s',
                      }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(124,92,252,0.1)'; e.currentTarget.style.color = '#a78bfa'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(240,238,255,0.55)'; }}
                      >
                        {icon}<span>{label}</span>
                      </Link>
                    ))}

                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: '6px 0' }}>
                      <button onClick={handleLogout} style={{
                        width: '100%', padding: '10px 16px',
                        display: 'flex', alignItems: 'center', gap: 10,
                        fontSize: 13, color: '#F87171', fontWeight: 600,
                        background: 'none', border: 'none', cursor: 'pointer',
                        transition: 'background 0.15s', textAlign: 'left',
                      }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(248,113,113,0.1)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                      >
                        <FiLogOut size={14} /> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" style={{
                padding: '8px 20px', borderRadius: 9,
                background: 'linear-gradient(135deg, #7c5cfc, #9b7dfd)',
                color: '#fff',
                fontSize: 13, fontWeight: 600, textDecoration: 'none',
                letterSpacing: '0.02em',
                boxShadow: '0 4px 16px rgba(124,92,252,0.35)',
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(124,92,252,0.5)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(124,92,252,0.35)'; }}
              >Login</Link>
            )}

            {/* Mobile hamburger */}
            <button
              className="mobile-only"
              onClick={() => setMobileOpen(o => !o)}
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 8, width: 36, height: 36,
                alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: 'rgba(255,255,255,0.7)',
              }}
            >
              {mobileOpen ? <FiX size={17} /> : <FiMenu size={17} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.07)',
            background: 'rgba(6,4,15,0.95)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            padding: '12px 24px 20px',
          }}>
            {publicLinks.map(({ to, label, end }) => (
              <NavLink key={to} to={to} end={end} onClick={() => setMobileOpen(false)} style={({ isActive }) => ({
                display: 'block', padding: '12px 0', fontSize: 14,
                fontWeight: isActive ? 600 : 400,
                color: isActive ? '#fff' : 'rgba(255,255,255,0.45)',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              })}>{label}</NavLink>
            ))}
            {user && privateLinks.map(({ to, label }) => (
              <NavLink key={to} to={to} onClick={() => setMobileOpen(false)} style={({ isActive }) => ({
                display: 'block', padding: '12px 0', fontSize: 14,
                fontWeight: isActive ? 600 : 400,
                color: isActive ? '#fff' : 'rgba(255,255,255,0.45)',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              })}>{label}</NavLink>
            ))}

            {user ? (
              <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <Link to="/dashboard" onClick={() => setMobileOpen(false)} style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '10px 14px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.09)',
                  borderRadius: 10, fontSize: 13, fontWeight: 600,
                  color: 'rgba(255,255,255,0.8)', textDecoration: 'none',
                }}>
                  <FiGrid size={14} /> Dashboard
                </Link>
                <button onClick={handleLogout} style={{
                  width: '100%', padding: '10px 14px',
                  background: 'rgba(248,113,113,0.08)',
                  border: '1px solid rgba(248,113,113,0.2)',
                  color: '#F87171', borderRadius: 10,
                  fontWeight: 600, fontSize: 13, cursor: 'pointer', textAlign: 'left',
                  display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  <FiLogOut size={14} /> Logout
                </button>
              </div>
            ) : (
              <Link to="/login" onClick={() => setMobileOpen(false)} style={{
                display: 'block', marginTop: 12, padding: '12px',
                background: 'linear-gradient(135deg, #7c5cfc, #9b7dfd)',
                color: '#fff', borderRadius: 10,
                fontSize: 13, fontWeight: 600, textAlign: 'center', textDecoration: 'none',
              }}>Login</Link>
            )}
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;