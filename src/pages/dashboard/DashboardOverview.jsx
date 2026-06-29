import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getMyPets } from '../../api/pets.api';
import { getMyRequests } from '../../api/requests.api';

import { 
  FiCheckCircle, 
  FiHeart, 
  FiList, 
  FiStar, 
  FiClock, 
  FiPlus, 
  FiArrowRight 
} from 'react-icons/fi';

import { FaPaw } from 'react-icons/fa';

const T = {
  bg: '#080612',
  surface: 'rgba(255,255,255,0.04)',
  surface2: 'rgba(255,255,255,0.07)',
  border: 'rgba(255,255,255,0.08)',
  text: '#f0eeff',
  text2: 'rgba(240,238,255,0.55)',
  text3: 'rgba(240,238,255,0.3)',
  accent: '#7c5cfc',
  accentGlow: 'rgba(124,92,252,0.25)',
};

const StatCard = ({ label, value, Icon, loading, index }) => {
  const [hov, setHov] = useState(false);

  const colors = [
    { bg: 'rgba(124,92,252,0.12)', border: 'rgba(124,92,252,0.25)', color: '#a78bfa' },
    { bg: 'rgba(74,222,128,0.1)', border: 'rgba(74,222,128,0.2)', color: '#4ade80' },
    { bg: 'rgba(244,114,182,0.1)', border: 'rgba(244,114,182,0.2)', color: '#f472b6' },
    { bg: 'rgba(124,92,252,0.12)', border: 'rgba(124,92,252,0.25)', color: '#a78bfa' },
    { bg: 'rgba(74,222,128,0.1)', border: 'rgba(74,222,128,0.2)', color: '#4ade80' },
    { bg: 'rgba(250,200,80,0.1)', border: 'rgba(250,200,80,0.2)', color: '#f5c842' },
  ];

  const c = colors[index % colors.length] || colors[0];

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? c.bg : T.surface,
        borderRadius: 16,
        border: `1px solid ${hov ? c.border : T.border}`,
        padding: '20px 18px',
        backdropFilter: 'blur(12px)',
        transition: 'all 0.2s ease',
        transform: hov ? 'translateY(-4px)' : 'none',
        boxShadow: hov ? `0 12px 32px ${c.bg}` : 'none',
        cursor: 'default',
      }}
    >
      <div style={{
        width: 38, height: 40, borderRadius: 11,
        background: c.bg, border: `1px solid ${c.border}`,
        color: c.color,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 14,
      }}>
        <Icon size={20} strokeWidth={2.25} />
      </div>
      <div style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: 34,
        fontWeight: 900,
        color: hov ? c.color : T.text,
        lineHeight: 1,
        marginBottom: 6,
      }}>
        {loading ? '—' : value}
      </div>
      <div style={{ fontSize: 12, color: T.text3, fontWeight: 500 }}>{label}</div>
    </div>
  );
};

const DashboardOverview = () => {
  const { user } = useAuth();
  const [myPets, setMyPets] = useState([]);
  const [myReqs, setMyReqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [petsRes, reqsRes] = await Promise.all([
          getMyPets(),
          getMyRequests()
        ]);
        setMyPets(petsRes.data?.pets || []);
        setMyReqs(reqsRes.data?.requests || []);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const stats = [
    { label: 'My listings', value: myPets.length, Icon: FaPaw },
    { label: 'Available', value: myPets.filter(p => p.status === 'available').length, Icon: FiCheckCircle },
    { label: 'Adopted', value: myPets.filter(p => p.status === 'adopted').length, Icon: FiHeart },
    { label: 'My requests', value: myReqs.length, Icon: FiList },
    { label: 'Approved', value: myReqs.filter(r => r.status === 'approved').length, Icon: FiStar },
    { label: 'Pending', value: myReqs.filter(r => r.status === 'pending').length, Icon: FiClock },
  ];

  const quickActions = [
    { to: '/dashboard/add-pet', label: 'Add new pet', primary: true },
    { to: '/dashboard/my-listings', label: 'My listings', primary: false },
    { to: '/my-requests', label: 'My requests', primary: false },
    { to: '/pets', label: 'Browse pets', primary: false },
  ];

  return (
    <div style={{ 
      fontFamily: "'DM Sans', sans-serif", 
      paddingTop: '80px',     // ← Fixed & Clean
      minHeight: '100vh'
    }}>
      <style>{`
        @keyframes fadeInUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:none} }
        @keyframes pulse { 0%,100%{opacity:0.55} 50%{opacity:1} }
        .qa-link:hover { background: rgba(124,92,252,0.15) !important; color: #c4b0ff !important; border-color: rgba(124,92,252,0.35) !important; }
        .qa-primary:hover { background: rgba(124,92,252,0.85) !important; transform: translateY(-1px) !important; box-shadow: 0 8px 24px rgba(124,92,252,0.4) !important; }
        .pet-row:hover { background: rgba(255,255,255,0.05) !important; }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: 28, animation: 'fadeInUp 0.5s ease both' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(124,92,252,0.12)', border: '1px solid rgba(124,92,252,0.25)', borderRadius: 50, padding: '4px 13px', marginBottom: 16 }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#a78bfa', display: 'inline-block', animation: 'pulse 2s ease-in-out infinite' }} />
          <span style={{ fontSize: 10, fontWeight: 700, color: '#b8a0ff', letterSpacing: '.08em', textTransform: 'uppercase' }}>Overview</span>
        </div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: T.text, marginBottom: 6 }}>
          Welcome back, <span style={{ background: 'linear-gradient(135deg,#a78bfa,#7c5cfc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {user?.name?.split(' ')[0] || 'Friend'}
          </span>
        </h2>
        <p style={{ color: T.text2, fontSize: 14, margin: 0 }}>Here is a summary of your PawsHome activity.</p>
      </div>

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 12, marginBottom: 20 }}>
        {stats.map((s, i) => (
          <StatCard key={s.label} {...s} loading={loading} index={i} />
        ))}
      </div>

      {/* Quick Actions & Recent Listings (rest of your code remains the same) */}
      {/* ... (Quick Actions + Recent Listings) ... */}
    </div>
  );
};

export default DashboardOverview;