import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPetById } from '../api/pets.api';
import { submitRequest } from '../api/requests.api';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import toast from 'react-hot-toast';

const SPECIES_EMOJI = { Dog: '🐕', Cat: '🐈', Bird: '🦜', Rabbit: '🐰' };

const InfoRow = ({ label, value }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 0', borderBottom: '1px solid var(--border)' }}>
    <span style={{ fontSize: 13, color: 'var(--text3)' }}>{label}</span>
    <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--text)' }}>{value}</span>
  </div>
);

const PetDetailPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [pet, setPet]             = useState(null);
  const [loading, setLoading]     = useState(true);
  const [showForm, setShowForm]   = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm]           = useState({ pickupDate: '', message: '' });

  useEffect(() => {
    getPetById(id)
      .then(r => setPet(r.data.pet))
      .catch(() => { toast.error('Pet not found'); navigate('/pets'); })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) { toast.error('Please login first'); navigate('/login'); return; }
    if (!form.pickupDate) { toast.error('Please select a pickup date'); return; }
    if (!form.message.trim()) { toast.error('Please write a message'); return; }
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
  const today   = new Date().toISOString().split('T')[0];

  return (
    <div className="page-enter" style={{ maxWidth: 1000, margin: '0 auto', padding: '32px 24px' }}>

      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: 24, padding: '7px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600,
          background: 'var(--surface2)', color: 'var(--text2)', border: '1px solid var(--border)', cursor: 'pointer',
          transition: 'all 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'var(--primary-light)'; e.currentTarget.style.color = 'var(--primary)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'var(--surface2)'; e.currentTarget.style.color = 'var(--text2)'; }}
      >← Back</button>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 36 }}>

        {/* LEFT — image */}
        <div className="animate-slideLeft">
          <div style={{
            width: '100%', height: 380, borderRadius: 18, overflow: 'hidden',
            background: 'var(--surface2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 120,
            boxShadow: 'var(--shadow-lg)',
          }}>
            {pet.imageURL
              ? <img src={pet.imageURL} alt={pet.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              : <span>{SPECIES_EMOJI[pet.species] || '🐾'}</span>
            }
          </div>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 16 }}>
            {[
              { v: pet.species, bg: 'var(--primary-light)', c: 'var(--primary)' },
              { v: pet.gender,  bg: '#E6F4FF',              c: '#1565C0'        },
              { v: pet.status,  bg: pet.status === 'available' ? 'var(--accent-light)' : '#F3E8FF', c: pet.status === 'available' ? 'var(--accent)' : '#7C3AED' },
            ].map(({ v, bg, c }) => (
              <span key={v} style={{ padding: '5px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600, background: bg, color: c }}>{v}</span>
            ))}
          </div>
        </div>

        {/* RIGHT — details */}
        <div className="animate-slideRight">
          <h1 style={{ fontSize: 38, marginBottom: 4 }}>{pet.name}</h1>
          <p style={{ color: 'var(--text2)', marginBottom: 6, fontSize: 16 }}>{pet.breed}</p>
          <p style={{ color: 'var(--text3)', fontSize: 13, marginBottom: 24 }}>📍 {pet.location}</p>

          {/* Info table */}
          <div style={{ marginBottom: 20 }}>
            <InfoRow label="Age"               value={pet.age} />
            <InfoRow label="Gender"            value={pet.gender} />
            <InfoRow label="Health"            value={pet.healthStatus} />
            <InfoRow label="Vaccination"       value={pet.vaccinationStatus} />
            <InfoRow label="Location"          value={pet.location} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 0' }}>
              <span style={{ fontSize: 13, color: 'var(--text3)' }}>Adoption Fee</span>
              <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 900, color: 'var(--primary)' }}>
                ৳{pet.adoptionFee?.toLocaleString() || 0}
              </span>
            </div>
          </div>

          {/* Description */}
          <p style={{ lineHeight: 1.8, color: 'var(--text2)', marginBottom: 24, fontSize: 14 }}>
            {pet.description}
          </p>

          {/* CTA */}
          {pet.status === 'adopted' ? (
            <div style={{ padding: '14px 20px', background: '#F3E8FF', borderRadius: 12, color: '#7C3AED', fontWeight: 600 }}>
              💜 This pet has already found a forever home!
            </div>
          ) : isOwner ? (
            <div style={{ padding: '14px 20px', background: '#FFF3CD', borderRadius: 12, color: '#856404', fontWeight: 600 }}>
              ℹ️ You own this listing — you cannot adopt your own pet.
            </div>
          ) : (
            <button
              onClick={() => setShowForm(f => !f)}
              className="btn-primary"
              style={{
                padding: '14px 32px', borderRadius: 50, fontSize: 15, fontWeight: 700,
                background: showForm ? '#e53e3e' : 'var(--primary)',
                color: '#fff', border: 'none', cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(232,97,42,.3)',
                transition: 'all 0.2s',
              }}
            >
              {showForm ? '✕ Cancel Request' : '🐾 Request Adoption'}
            </button>
          )}

          {/* Adoption Request Form */}
          {showForm && (
            <form
              onSubmit={handleSubmit}
              className="animate-slideDown"
              style={{ background: 'var(--surface2)', borderRadius: 14, padding: 22, marginTop: 20, border: '1px solid var(--border)' }}
            >
              <h4 style={{ marginBottom: 16, fontSize: 16 }}>📋 Adoption Request</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

                {/* Read-only pet + user fields */}
                {[
                  { label: 'Pet',   value: pet.name },
                  { label: 'Your Name',  value: user?.name || user?.displayName || '' },
                  { label: 'Your Email', value: user?.email || '' },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text2)', display: 'block', marginBottom: 5 }}>{label}</label>
                    <input value={value} readOnly style={{ width: '100%', background: 'var(--bg)', color: 'var(--text3)' }} />
                  </div>
                ))}

                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text2)', display: 'block', marginBottom: 5 }}>
                    Preferred Pickup Date <span style={{ color: 'var(--primary)' }}>*</span>
                  </label>
                  <input
                    type="date" value={form.pickupDate} min={today}
                    onChange={e => setForm(f => ({ ...f, pickupDate: e.target.value }))}
                    style={{ width: '100%' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text2)', display: 'block', marginBottom: 5 }}>
                    Message to Owner <span style={{ color: 'var(--primary)' }}>*</span>
                  </label>
                  <textarea
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    placeholder="Tell the owner why you want to adopt this pet and about your home environment..."
                    rows={4} style={{ width: '100%' }}
                  />
                </div>

                <button
                  type="submit" disabled={submitting}
                  className="btn-primary"
                  style={{
                    padding: '12px', borderRadius: 10, fontWeight: 700, fontSize: 14,
                    background: 'var(--primary)', color: '#fff', border: 'none',
                    cursor: submitting ? 'not-allowed' : 'pointer', opacity: submitting ? .7 : 1,
                  }}
                >{submitting ? '⏳ Submitting...' : '🐾 Submit Request'}</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default PetDetailPage;