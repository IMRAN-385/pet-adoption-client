import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getMyPets } from '../../api/pets.api';
import { getMyRequests } from '../../api/requests.api';

const DashboardOverview = () => {
  const { user } = useAuth();
  const [myPets, setMyPets] = useState([]);
  const [myReqs, setMyReqs] = useState([]);

  useEffect(() => {
    getMyPets().then(r => setMyPets(r.data.pets)).catch(() => {});
    getMyRequests().then(r => setMyReqs(r.data.requests)).catch(() => {});
  }, []);

  const stats = [
    { label: 'My Listings', value: myPets.length, color: 'var(--primary)' },
    { label: 'Available', value: myPets.filter(p => p.status === 'available').length, color: 'var(--accent)' },
    { label: 'Adopted', value: myPets.filter(p => p.status === 'adopted').length, color: '#7C3AED' },
    { label: 'My Requests', value: myReqs.length, color: 'var(--primary)' },
    { label: 'Approved', value: myReqs.filter(r => r.status === 'approved').length, color: 'var(--accent)' },
  ];

  return (
    <div>
      <h2 style={{ marginBottom: 4 }}>Welcome back, {user?.name?.split(' ')[0]}! 👋</h2>
      <p style={{ color: 'var(--text2)', marginBottom: 28 }}>Here is a summary of your activity</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(140px,1fr))', gap: 16, marginBottom: 32 }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: 'var(--surface)', borderRadius: 14, border: '1px solid var(--border)', padding: 20, textAlign: 'center' }}>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 32, fontWeight: 900, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ background: 'var(--surface)', borderRadius: 14, border: '1px solid var(--border)', padding: 24 }}>
        <h3 style={{ marginBottom: 16 }}>Quick Actions</h3>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {[
            { to: '/dashboard/add-pet', label: '➕ Add New Pet', primary: true },
            { to: '/dashboard/my-listings', label: '🐾 My Listings', primary: false },
            { to: '/my-requests', label: '📋 My Requests', primary: false },
            { to: '/pets', label: '🔍 Browse All Pets', primary: false },
          ].map(({ to, label, primary }) => (
            <Link key={to} to={to} style={{
              padding: '10px 22px', borderRadius: 10, fontWeight: 600, fontSize: 14,
              background: primary ? 'var(--primary)' : '#f0ebe4',
              color: primary ? '#fff' : 'var(--text2)',
              textDecoration: 'none', transition: '.2s',
            }}>{label}</Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
