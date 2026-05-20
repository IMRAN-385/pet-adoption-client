import { Outlet, NavLink } from 'react-router-dom';
import Navbar from './Navbar';
import { FiGrid, FiPlusCircle, FiList, FiFileText } from 'react-icons/fi';

const links = [
  { to: '/dashboard', icon: <FiGrid />, label: 'Overview', end: true },
  { to: '/dashboard/my-listings', icon: <FiList />, label: 'My Listings' },
  { to: '/dashboard/add-pet', icon: <FiPlusCircle />, label: 'Add Pet' },
  { to: '/my-requests', icon: <FiFileText />, label: 'My Requests' },
];

const DashboardLayout = () => {
  return (
    <>
      <Navbar />

      <div style={{ display: 'flex', minHeight: 'calc(100vh - 68px)' }}>
        
        <aside style={{
          width: 240,
          background: 'var(--surface)',
          borderRight: '1px solid var(--border)',
          padding: '24px 16px',
          flexShrink: 0
        }}>
          <p style={{
            fontSize: 11,
            fontWeight: 700,
            color: 'var(--text3)',
            textTransform: 'uppercase',
            letterSpacing: '.8px',
            padding: '0 12px',
            marginBottom: 8
          }}>
            Dashboard
          </p>

          {links.map(({ to, icon, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 12px',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 500,
                textDecoration: 'none',
                color: isActive ? 'var(--primary)' : 'var(--text2)',
                background: isActive ? 'var(--primary-light)' : 'transparent',
                transition: '.2s',
                marginBottom: 2,
              })}
            >
              <span style={{ fontSize: 16 }}>{icon}</span>
              {label}
            </NavLink>
          ))}
        </aside>

        <div style={{ flex: 1, padding: 32, overflowY: 'auto' }}>
          <Outlet />
        </div>

      </div>
    </>
  );
};

export default DashboardLayout;