import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyRequests, cancelRequest } from '../api/requests.api';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import toast from 'react-hot-toast';

const MyRequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchRequests = () => {
    getMyRequests()
      .then(res => setRequests(res.data.requests))
      .catch(() => toast.error('Failed to load requests'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchRequests(); }, []);

  const handleCancel = async (id) => {
    if (!confirm('Cancel this adoption request?')) return;
    try {
      await cancelRequest(id);
      toast.success('Request cancelled');
      setRequests(prev => prev.filter(r => r._id !== id));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to cancel');
    }
  };

  if (loading) return <LoadingSpinner />;

  const statusStyle = {
    pending: { background: '#FFF3CD', color: '#856404' },
    approved: { background: 'var(--accent-light)', color: 'var(--accent)' },
    rejected: { background: '#FFE8E8', color: '#C53030' },
  };

  return (
    <div style={{ padding: '48px 24px', maxWidth: 1000, margin: '0 auto' }}>
      <h2 style={{ marginBottom: 8 }}>My Adoption Requests</h2>
      <p style={{ color: 'var(--text2)', fontSize: 14, marginBottom: 28 }}>Track all your adoption requests in one place</p>

      {requests.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '64px 24px', color: 'var(--text3)' }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>📋</div>
          <h3 style={{ fontSize: 20, color: 'var(--text2)', marginBottom: 8 }}>No requests yet</h3>
          <p style={{ marginBottom: 20 }}>Browse our pets and submit your first adoption request!</p>
          <button onClick={() => navigate('/pets')} style={{
            padding: '10px 24px', borderRadius: 10, fontWeight: 600, fontSize: 14,
            background: 'var(--primary)', color: '#fff', border: 'none', cursor: 'pointer'
          }}>Browse Pets</button>
        </div>
      ) : (
        <div style={{ background: 'var(--surface)', borderRadius: 14, border: '1px solid var(--border)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--surface2)' }}>
                {['Pet Name', 'Request Date', 'Pickup Date', 'Status', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '.5px' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {requests.map(req => (
                <tr key={req._id} style={{ borderTop: '1px solid var(--border)' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 600 }}>{req.petName}</td>
                  <td style={{ padding: '14px 16px', fontSize: 13, color: 'var(--text2)' }}>{new Date(req.createdAt).toLocaleDateString()}</td>
                  <td style={{ padding: '14px 16px', fontSize: 13, color: 'var(--text2)' }}>{req.pickupDate}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600, ...statusStyle[req.status] }}>
                      {req.status}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', gap: 6 }}>
                      {req.petId && (
                        <button onClick={() => navigate(`/pets/${req.petId._id || req.petId}`)} style={{ padding: '6px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600, background: '#f0ebe4', color: 'var(--text2)', border: 'none', cursor: 'pointer' }}>View</button>
                      )}
                      {req.status === 'pending' && (
                        <button onClick={() => handleCancel(req._id)} style={{ padding: '6px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600, background: '#FFE8E8', color: '#C53030', border: 'none', cursor: 'pointer' }}>Cancel</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyRequestsPage;
