import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyPets, deletePet } from '../../api/pets.api';
import { getPetRequests, updateRequestStatus } from '../../api/requests.api';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import toast from 'react-hot-toast';

const MyListingsPage = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reqModal, setReqModal] = useState(null);
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  const fetchPets = () => {
    getMyPets().then(r => setPets(r.data.pets)).catch(() => toast.error('Failed to load')).finally(() => setLoading(false));
  };
  useEffect(() => { fetchPets(); }, []);

  const openRequests = async (pet) => {
    setReqModal(pet);
    try {
      const res = await getPetRequests(pet._id);
      setRequests(res.data.requests);
    } catch { toast.error('Failed to load requests'); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this pet listing?')) return;
    try {
      await deletePet(id);
      toast.success('Pet deleted');
      setPets(prev => prev.filter(p => p._id !== id));
    } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
  };

  const handleStatus = async (reqId, status) => {
    try {
      await updateRequestStatus(reqId, status);
      toast.success(`Request ${status}`);
      setRequests(prev => prev.map(r => r._id === reqId ? { ...r, status } : r.status === 'pending' && status === 'approved' ? { ...r, status: 'rejected' } : r));
      if (status === 'approved') setPets(prev => prev.map(p => p._id === reqModal._id ? { ...p, status: 'adopted' } : p));
      setReqModal(null);
    } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
  };

  if (loading) return <LoadingSpinner />;

  const total = pets.length;
  const available = pets.filter(p => p.status === 'available').length;
  const adopted = pets.filter(p => p.status === 'adopted').length;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h2 style={{ marginBottom: 4 }}>My Pet Listings</h2>
          <p style={{ color: 'var(--text2)', fontSize: 14 }}>Manage your pet listings and adoption requests</p>
        </div>
        <button onClick={() => navigate('/dashboard/add-pet')} style={{ padding: '10px 22px', borderRadius: 10, fontWeight: 600, fontSize: 14, background: 'var(--primary)', color: '#fff', border: 'none', cursor: 'pointer' }}>+ Add New Pet</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(140px,1fr))', gap: 16, marginBottom: 28 }}>
        {[['Total', total, 'var(--primary)'], ['Available', available, 'var(--accent)'], ['Adopted', adopted, '#7C3AED']].map(([l, v, c]) => (
          <div key={l} style={{ background: 'var(--surface)', borderRadius: 14, border: '1px solid var(--border)', padding: 20, textAlign: 'center' }}>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 32, fontWeight: 900, color: c }}>{v}</div>
            <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 4 }}>{l}</div>
          </div>
        ))}
      </div>

      {pets.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '64px 24px', color: 'var(--text3)' }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>🐾</div>
          <h3 style={{ color: 'var(--text2)' }}>No listings yet</h3>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 20 }}>
          {pets.map(pet => (
            <div key={pet._id} style={{ background: 'var(--surface)', borderRadius: 14, border: '1px solid var(--border)', overflow: 'hidden' }}>
              <div style={{ height: 180, background: 'var(--surface2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 70, overflow: 'hidden' }}>
                {pet.imageURL ? <img src={pet.imageURL} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span>{pet.species === 'Dog' ? '🐕' : pet.species === 'Cat' ? '🐈' : pet.species === 'Bird' ? '🦜' : '🐰'}</span>}
              </div>
              <div style={{ padding: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 4 }}>
                  <h3 style={{ fontSize: 18 }}>{pet.name}</h3>
                  <span style={{ padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600, background: pet.status === 'available' ? 'var(--accent-light)' : '#F3E8FF', color: pet.status === 'available' ? 'var(--accent)' : '#7C3AED' }}>{pet.status}</span>
                </div>
                <p style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 8 }}>{pet.breed}</p>
                <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, color: 'var(--primary)', fontWeight: 700, marginBottom: 12 }}>৳{pet.adoptionFee?.toLocaleString()}</p>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  <button onClick={() => openRequests(pet)} style={{ padding: '6px 12px', borderRadius: 8, fontSize: 12, fontWeight: 600, background: '#EEF2FF', color: '#4F46E5', border: 'none', cursor: 'pointer' }}>📋 Requests</button>
                  <button onClick={() => navigate(`/dashboard/edit-pet/${pet._id}`)} style={{ padding: '6px 12px', borderRadius: 8, fontSize: 12, fontWeight: 600, background: '#f0ebe4', color: 'var(--text2)', border: 'none', cursor: 'pointer' }}>✏️ Edit</button>
                  <button onClick={() => navigate(`/pets/${pet._id}`)} style={{ padding: '6px 12px', borderRadius: 8, fontSize: 12, fontWeight: 600, background: '#f0ebe4', color: 'var(--text2)', border: 'none', cursor: 'pointer' }}>👁 View</button>
                  <button onClick={() => handleDelete(pet._id)} style={{ padding: '6px 12px', borderRadius: 8, fontSize: 12, fontWeight: 600, background: '#FFE8E8', color: '#C53030', border: 'none', cursor: 'pointer' }}>🗑</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Requests Modal */}
      {reqModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.5)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }} onClick={() => setReqModal(null)}>
          <div style={{ background: 'var(--surface)', borderRadius: 20, width: '100%', maxWidth: 560, maxHeight: '85vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,.2)' }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '24px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3>Requests for {reqModal.name}</h3>
              <button onClick={() => setReqModal(null)} style={{ background: 'var(--surface2)', border: 'none', width: 36, height: 36, borderRadius: '50%', fontSize: 18, cursor: 'pointer' }}>✕</button>
            </div>
            <div style={{ padding: '24px 28px' }}>
              {requests.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--text3)' }}>
                  <div style={{ fontSize: 48, marginBottom: 12 }}>📭</div><p>No requests yet</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {requests.map(r => (
                    <div key={r._id} style={{ background: 'var(--surface2)', borderRadius: 12, padding: 16, border: '1px solid var(--border)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                        <div>
                          <div style={{ fontWeight: 600 }}>{r.requesterName}</div>
                          <div style={{ fontSize: 12, color: 'var(--text3)' }}>{r.requesterEmail}</div>
                        </div>
                        <span style={{ padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600, background: r.status === 'pending' ? '#FFF3CD' : r.status === 'approved' ? 'var(--accent-light)' : '#FFE8E8', color: r.status === 'pending' ? '#856404' : r.status === 'approved' ? 'var(--accent)' : '#C53030' }}>{r.status}</span>
                      </div>
                      <p style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 4 }}>Pickup: {r.pickupDate}</p>
                      <p style={{ fontSize: 13, color: 'var(--text2)', fontStyle: 'italic', marginBottom: 10 }}>"{r.message}"</p>
                      {r.status === 'pending' && reqModal.status !== 'adopted' && (
                        <div style={{ display: 'flex', gap: 8 }}>
                          <button onClick={() => handleStatus(r._id, 'approved')} style={{ padding: '7px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600, background: 'var(--accent)', color: '#fff', border: 'none', cursor: 'pointer' }}>✓ Approve</button>
                          <button onClick={() => handleStatus(r._id, 'rejected')} style={{ padding: '7px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600, background: '#e53e3e', color: '#fff', border: 'none', cursor: 'pointer' }}>✗ Reject</button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyListingsPage;
