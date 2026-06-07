import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getMyPets } from '../../api/pets.api';
import { getMyRequests } from '../../api/requests.api';

const PawIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20a1 1 0 0 0 2 0v-1a1 1 0 0 0-2 0v1z"/><ellipse cx="7.5" cy="14.5" rx="2.5" ry="2.5"/><ellipse cx="16.5" cy="14.5" rx="2.5" ry="2.5"/><ellipse cx="5" cy="9" rx="2" ry="2"/><ellipse cx="19" cy="9" rx="2" ry="2"/><ellipse cx="12" cy="8" rx="2" ry="2"/>
  </svg>
);
const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6L9 17l-5-5"/>
  </svg>
);
const HeartIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);
const ListIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
  </svg>
);
const StarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);
const ClockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const PlusIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

const DogIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2 .336-3.5 2-3.5 4 0 .085.002.17.005.253C3.162 8.639 4 10.695 4 13c0 3.314 2.686 6 6 6h4c3.314 0 6-2.686 6-6 0-2.305.838-4.361.995-5.747A4.5 4.5 0 0 0 17.5 3c-1.923-.321-3.5.782-3.5 2.172V8H10V5.172z"/>
  </svg>
);

const StatCard = ({ label, value, color, Icon, loading, index }) => (
  <div
    className={`animate-fadeInUp delay-${index + 1}`}
    style={{
      background: 'var(--surface)', borderRadius: 12,
      border: '1px solid var(--border)', padding: '20px 16px',
      transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'default',
    }}
    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; }}
    onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
  >
    <div style={{ width: 36, height: 36, borderRadius: 8, background: `${color}18`, color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
      <Icon />
    </div>
    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 900, color, lineHeight: 1, marginBottom: 6 }}>
      {loading ? '—' : value}
    </div>
    <div style={{ fontSize: 12, color: 'var(--text3)', fontWeight: 500 }}>{label}</div>
  </div>
);

const DashboardOverview = () => {
  const { user } = useAuth();
  const [myPets, setMyPets] = useState([]);
  const [myReqs, setMyReqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getMyPets().then(r => setMyPets(r.data.pets)).catch(() => {}),
      getMyRequests().then(r => setMyReqs(r.data.requests)).catch(() => {}),
    ]).finally(() => setLoading(false));
  }, []);

  const stats = [
    { label: 'My listings',  value: myPets.length,                                       color: 'var(--primary)', Icon: PawIcon   },
    { label: 'Available',    value: myPets.filter(p => p.status === 'available').length,  color: 'var(--accent)',  Icon: CheckIcon },
    { label: 'Adopted',      value: myPets.filter(p => p.status === 'adopted').length,    color: '#7C3AED',        Icon: HeartIcon },
    { label: 'My requests',  value: myReqs.length,                                        color: 'var(--primary)', Icon: ListIcon  },
    { label: 'Approved',     value: myReqs.filter(r => r.status === 'approved').length,   color: 'var(--accent)',  Icon: StarIcon  },
    { label: 'Pending',      value: myReqs.filter(r => r.status === 'pending').length,    color: '#D97706',        Icon: ClockIcon },
  ];

  const quickActions = [
    { to: '/dashboard/add-pet',     label: 'Add new pet',   primary: true  },
    { to: '/dashboard/my-listings', label: 'My listings',   primary: false },
    { to: '/my-requests',           label: 'My requests',   primary: false },
    { to: '/pets',                  label: 'Browse pets',   primary: false },
  ];

  const speciesIcon = (species) => {
    if (species === 'Dog') return <DogIcon />;
    return <PawIcon />;
  };

  return (
    <div className="page-enter">

      {/* Header */}
      <div className="animate-fadeInUp" style={{ marginBottom: 28 }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text3)', marginBottom: 8, textTransform: 'uppercase' }}>Overview</p>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>
          Welcome back, {user?.name?.split(' ')[0]}
        </h2>
        <p style={{ color: 'var(--text2)', fontSize: 14 }}>Here is a summary of your PawsHome activity.</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 12, marginBottom: 20 }}>
        {stats.map((s, i) => <StatCard key={s.label} {...s} loading={loading} index={i} />)}
      </div>

      {/* Quick Actions */}
      <div className="animate-fadeInUp delay-4" style={{ background: 'var(--surface)', borderRadius: 12, border: '1px solid var(--border)', padding: 20, marginBottom: 16 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text3)', marginBottom: 14, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Quick actions</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {quickActions.map(({ to, label, primary }) => (
            <Link
              key={to} to={to}
              style={{
                padding: '9px 18px', borderRadius: 8, fontWeight: 600, fontSize: 13,
                background: primary ? 'var(--text)' : 'var(--surface2)',
                color: primary ? 'var(--bg)' : 'var(--text2)',
                textDecoration: 'none', transition: 'all 0.15s',
                border: primary ? 'none' : '1px solid var(--border)',
                display: 'inline-flex', alignItems: 'center', gap: 6,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--primary)';
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.borderColor = 'var(--primary)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = primary ? 'var(--text)' : 'var(--surface2)';
                e.currentTarget.style.color = primary ? 'var(--bg)' : 'var(--text2)';
                e.currentTarget.style.borderColor = primary ? 'transparent' : 'var(--border)';
              }}
            >
              {primary && <PlusIcon />}
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Listings */}
      {myPets.length > 0 && (
        <div className="animate-fadeInUp delay-5" style={{ background: 'var(--surface)', borderRadius: 12, border: '1px solid var(--border)', padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Recent listings</p>
            <Link to="/dashboard/my-listings" style={{ fontSize: 12, color: 'var(--primary)', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
              View all <ArrowIcon />
            </Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {myPets.slice(0, 4).map((pet, i) => (
              <div key={pet._id} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px 0',
                borderBottom: i < Math.min(myPets.length, 4) - 1 ? '1px solid var(--border)' : 'none',
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 8,
                  background: 'var(--surface2)', overflow: 'hidden', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--text3)',
                }}>
                  {pet.imageURL
                    ? <img src={pet.imageURL} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : speciesIcon(pet.species)
                  }
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text)' }}>{pet.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text3)' }}>{pet.breed} · {pet.age}</div>
                </div>
                <span style={{
                  padding: '3px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600, flexShrink: 0,
                  background: pet.status === 'available' ? 'var(--accent-light)' : 'var(--primary-light)',
                  color: pet.status === 'available' ? 'var(--accent)' : 'var(--primary)',
                }}>
                  {pet.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardOverview;