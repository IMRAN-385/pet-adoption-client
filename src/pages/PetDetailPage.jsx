import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPetById } from '../api/pets.api';
import { submitRequest } from '../api/requests.api';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import toast from 'react-hot-toast';

const PetDetailPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ pickupDate: '', message: '' });

  useEffect(() => {
    getPetById(id)
      .then(res => setPet(res.data.pet))
      .catch(() => toast.error('Pet not found'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.pickupDate) { toast.error('Please select a pickup date'); return; }
    if (!form.message) { toast.error('Please write a message'); return; }
    setSubmitting(true);
    try {
      await submitRequest(id, form);
      toast.success('Adoption request submitted! 🐾');
      setShowForm(false);
      setForm({ pickupDate: '', message: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit request');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!pet) return <div style={{ textAlign: 'center', padding: 64 }}>Pet not found</div>;

  const isOwner = user?.email === pet.ownerEmail;

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '32px 24px' }}>
      <button onClick={() => navigate('/pets')} style={{
        marginBottom: 20, padding: '7px 16px', borderRadius: 8, fontSize: 13,
        fontWeight: 600, background: '#f0ebe4', color: 'var(--text2)', border: 'none', cursor: 'pointer'
      }}>← Back to Pets</button>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 32 }}>
        {/* Image */}
        <div>
          <div style={{
            width: '100%', height: 380, borderRadius: 16, overflow: 'hidden',
            background: 'var(--surface2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 120
          }}>
            {pet.imageURL
              ? <img src={pet.imageURL} alt={pet.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              : <span>{pet.species === 'Dog' ? '🐕' : pet.species === 'Cat' ? '🐈' : pet.species === 'Bird' ? '🦜' : '🐰'}</span>
            }
          </div>
          <div style={{ marginTop: 16, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {[pet.species, pet.gender, pet.status].map((t, i) => (
              <span key={i} style={{
                padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 500,
                background: i === 2 ? (pet.status === 'available' ? 'var(--accent-light)' : '#F3E8FF') : (i === 0 ? 'var(--primary-light)' : '#E6F4FF'),
                color: i === 2 ? (pet.status === 'available' ? 'var(--accent)' : '#7C3AED') : (i === 0 ? 'var(--primary)' : '#1565C0'),
              }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <h1 style={{ fontSize: 36, marginBottom: 4 }}>{pet.name}</h1>
          <p style={{ color: 'var(--text2)', marginBottom: 20 }}>{pet.breed}</p>

          <div style={{ marginBottom: 20 }}>
            {[['Age', pet.age], ['Gender', pet.gender], ['Health', pet.healthStatus], ['Vaccination', pet.vaccinationStatus], ['Location', pet.location], ['Adoption Fee', '৳' + pet.adoptionFee?.toLocaleString()]].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontSize: 13, color: 'var(--text3)' }}>{k}</span>
                <span style={{ fontSize: 14, fontWeight: 500 }}>{v}</span>
              </div>
            ))}
          </div>

          <p style={{ lineHeight: 1.7, color: 'var(--text2)', marginBottom: 20 }}>{pet.description}</p>

          {pet.status === 'adopted' ? (
            <div style={{ padding: '12px 20px', background: '#F3E8FF', borderRadius: 10, color: '#7C3AED', fontWeight: 600 }}>
              This pet has already been adopted 💜
            </div>
          ) : isOwner ? (
            <div style={{ padding: '12px 20px', background: '#FFF3CD', borderRadius: 10, color: '#856404', fontWeight: 600 }}>
              You own this listing — you cannot adopt your own pet.
            </div>
          ) : (
            <button
              onClick={() => setShowForm(!showForm)}
              style={{
                padding: '13px 28px', borderRadius: 12, fontSize: 15, fontWeight: 600,
                background: 'var(--primary)', color: '#fff', border: 'none', cursor: 'pointer'
              }}
            >🐾 {showForm ? 'Cancel' : 'Request Adoption'}</button>
          )}

          {/* Adoption Form */}
          {showForm && (
            <form onSubmit={handleSubmit} style={{
              background: 'var(--surface2)', borderRadius: 14, padding: 20,
              marginTop: 16, border: '1px solid var(--border)'
            }}>
              <h4 style={{ marginBottom: 16 }}>Adoption Request</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div><label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text2)', display: 'block', marginBottom: 6 }}>Pet Name</label>
                  <input value={pet.name} readOnly style={{ width: '100%', background: 'var(--bg)', color: 'var(--text3)' }} /></div>
                <div><label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text2)', display: 'block', marginBottom: 6 }}>Your Name</label>
                  <input value={user.name} readOnly style={{ width: '100%', background: 'var(--bg)', color: 'var(--text3)' }} /></div>
                <div><label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text2)', display: 'block', marginBottom: 6 }}>Your Email</label>
                  <input value={user.email} readOnly style={{ width: '100%', background: 'var(--bg)', color: 'var(--text3)' }} /></div>
                <div><label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text2)', display: 'block', marginBottom: 6 }}>Preferred Pickup Date *</label>
                  <input type="date" value={form.pickupDate} onChange={e => setForm(f => ({ ...f, pickupDate: e.target.value }))} min={new Date().toISOString().split('T')[0]} style={{ width: '100%' }} /></div>
                <div><label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text2)', display: 'block', marginBottom: 6 }}>Message to Owner *</label>
                  <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="Tell the owner why you want to adopt this pet..." style={{ width: '100%' }} /></div>
                <button type="submit" disabled={submitting} style={{
                  padding: '12px', borderRadius: 10, fontWeight: 600, fontSize: 14,
                  background: 'var(--primary)', color: '#fff', border: 'none', cursor: 'pointer',
                  opacity: submitting ? .7 : 1
                }}>{submitting ? 'Submitting...' : 'Submit Request 🐾'}</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default PetDetailPage;
