import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPetById } from '../api/pets.api';
import { submitRequest } from '../api/requests.api';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import toast from 'react-hot-toast';

const SPECIES_EMOJI = { Dog: '🐕', Cat: '🐈', Bird: '🦜', Rabbit: '🐰' };

const Pill = ({ children }) => (
  <span style={{
    fontSize: 11, padding: '4px 12px', borderRadius: 20,
    background: 'var(--surface2)', color: 'var(--text2)',
    border: '1px solid var(--border)', display: 'inline-block',
  }}>{children}</span>
);

const InfoRow = ({ label, value }) => (
  <div style={{
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '12px 0', borderBottom: '1px solid var(--border)',
  }}>
    <span style={{ fontSize: 13, color: 'var(--text3)' }}>{label}</span>
    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{value || '—'}</span>
  </div>
);

const SuccessScreen = ({ petName, onDone }) => {
  const [scale, setScale] = useState(0);
  const [showText, setShowText] = useState(false);
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    setTimeout(() => setScale(1), 50);
    setTimeout(() => setShowText(true), 400);
    setTimeout(() => setShowBtn(true), 700);
  }, []);

  return (
    <div style={{
      padding: '40px 20px', borderRadius: 16,
      border: '1px solid var(--border)',
      background: 'var(--surface)',
      textAlign: 'center',
    }}>
      <div style={{
        width: 72, height: 72, borderRadius: '50%',
        background: 'var(--accent-light)',
        margin: '0 auto 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transform: scale ? 'scale(1)' : 'scale(0)',
        transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path
            d="M7 16.5L13 22.5L25 10"
            stroke="var(--accent)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: 30,
              strokeDashoffset: scale ? 0 : 30,
              transition: 'stroke-dashoffset 0.4s ease 0.2s',
            }}
          />
        </svg>
      </div>

      <div style={{
        opacity: showText ? 1 : 0,
        transform: showText ? 'translateY(0)' : 'translateY(10px)',
        transition: 'all 0.4s ease',
      }}>
        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 22, fontWeight: 700,
          color: 'var(--text)', marginBottom: 8,
        }}>
          Request sent!
        </h3>
        <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 24 }}>
          Your adoption request for <strong style={{ color: 'var(--text)' }}>{petName}</strong> has been submitted.
          The owner will review and get back to you.
        </p>
      </div>

      <div style={{
        opacity: showBtn ? 1 : 0,
        transform: showBtn ? 'translateY(0)' : 'translateY(8px)',
        transition: 'all 0.35s ease',
      }}>
        <button
          onClick={onDone}
          style={{
            padding: '11px 28px', borderRadius: 10,
            background: 'var(--text)', color: 'var(--bg)',
            fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer',
            transition: 'background 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--primary)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--text)'}
        >
          Back to listing
        </button>
      </div>
    </div>
  );
};

const PetDetailPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ pickupDate: '', message: '' });

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
      setSubmitted(true);
      setShowForm(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit request');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!pet) return <div style={{ textAlign: 'center', padding: 64 }}>Pet not found</div>;

  const isOwner = user?.email === pet.ownerEmail;
  const today = new Date().toISOString().split('T')[0];

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '40px 24px' }}>

      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: 32, background: 'none', border: 'none',
          fontSize: 13, color: 'var(--text3)', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 6, padding: 0,
          transition: 'color 0.15s',
        }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--text3)'}
      >
        ← Back to listings
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>

        {/* ── LEFT ── */}
        <div>
          <div style={{
            width: '100%', aspectRatio: '1 / 1',
            borderRadius: 16, overflow: 'hidden',
            background: 'var(--surface2)',
            border: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 96, position: 'relative',
          }}>
            {pet.imageURL
              ? <img src={pet.imageURL} alt={pet.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              : <span style={{ opacity: 0.3 }}>{SPECIES_EMOJI[pet.species] || '🐾'}</span>
            }
            <span style={{
              position: 'absolute', top: 14, left: 14,
              fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 20,
              background: pet.status === 'available' ? 'var(--accent-light)' : 'var(--primary-light)',
              color: pet.status === 'available' ? 'var(--accent)' : 'var(--primary)',
            }}>
              {pet.status === 'available' ? 'Available' : 'Adopted'}
            </span>
          </div>

          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 14 }}>
            {[pet.species, pet.gender, pet.breed].filter(Boolean).map(t => <Pill key={t}>{t}</Pill>)}
          </div>

          <div style={{ marginTop: 24 }}>
            <InfoRow label="Age" value={pet.age} />
            <InfoRow label="Health" value={pet.healthStatus} />
            <InfoRow label="Vaccination" value={pet.vaccinationStatus} />
            <InfoRow label="Location" value={pet.location} />
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 40, fontWeight: 700, color: 'var(--text)',
            lineHeight: 1.1, marginBottom: 6,
          }}>{pet.name}</h1>
          <p style={{ fontSize: 14, color: 'var(--text3)', marginBottom: 24 }}>{pet.breed}</p>

          {/* Fee */}
          <div style={{
            display: 'flex', alignItems: 'baseline', gap: 8,
            padding: '18px 20px', borderRadius: 12,
            background: 'var(--surface2)', border: '1px solid var(--border)',
            marginBottom: 24,
          }}>
            <span style={{ fontSize: 13, color: 'var(--text3)' }}>Adoption fee</span>
            <span style={{
              fontSize: 28, fontWeight: 700, color: 'var(--text)',
              fontFamily: "'Playfair Display', serif", marginLeft: 'auto',
            }}>
              ৳{pet.adoptionFee?.toLocaleString() || 0}
            </span>
          </div>

          {/* Description */}
          <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.8, marginBottom: 28 }}>
            {pet.description || 'No description provided.'}
          </p>

          {/* Owner */}
          {pet.ownerName && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '14px 16px', borderRadius: 10,
              border: '1px solid var(--border)', marginBottom: 24,
              background: 'var(--surface)',
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'var(--surface2)',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: 13, fontWeight: 700,
                color: 'var(--text2)',
              }}>
                {pet.ownerName.charAt(0).toUpperCase()}
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{pet.ownerName}</div>
                <div style={{ fontSize: 11, color: 'var(--text3)' }}>Owner</div>
              </div>
            </div>
          )}

          {/* CTA */}
          {submitted ? (
            <SuccessScreen petName={pet.name} onDone={() => setSubmitted(false)} />
          ) : pet.status === 'adopted' ? (
            <div style={{
              padding: '16px 20px', borderRadius: 12,
              background: 'var(--primary-light)',
              border: '1px solid var(--border)',
              fontSize: 14, color: 'var(--primary)', fontWeight: 500,
            }}>
              This pet has already found a forever home.
            </div>
          ) : isOwner ? (
            <div style={{
              padding: '16px 20px', borderRadius: 12,
              background: 'var(--surface2)', border: '1px solid var(--border)',
              fontSize: 14, color: 'var(--text2)', fontWeight: 500,
            }}>
              You own this listing — you cannot adopt your own pet.
            </div>
          ) : (
            <>
              <button
                onClick={() => setShowForm(f => !f)}
                style={{
                  width: '100%', padding: '14px', borderRadius: 10,
                  fontSize: 14, fontWeight: 700,
                  background: showForm ? 'var(--surface2)' : 'var(--text)',
                  color: showForm ? 'var(--text2)' : 'var(--bg)',
                  border: '1px solid var(--border)',
                  cursor: 'pointer', transition: 'all 0.2s',
                  marginBottom: showForm ? 12 : 0,
                }}
                onMouseEnter={e => { if (!showForm) e.currentTarget.style.background = 'var(--primary)'; }}
                onMouseLeave={e => { if (!showForm) e.currentTarget.style.background = 'var(--text)'; }}
              >
                {showForm ? 'Cancel' : 'Request adoption'}
              </button>

              {showForm && (
                <form onSubmit={handleSubmit} style={{
                  padding: 20, borderRadius: 12,
                  border: '1px solid var(--border)',
                  background: 'var(--surface)',
                  display: 'flex', flexDirection: 'column', gap: 14,
                  animation: 'fadeInUp 0.25s ease both',
                }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>Adoption request</p>

                  {[
                    { label: 'Pet', value: pet.name },
                    { label: 'Your name', value: user?.name || user?.displayName || '' },
                    { label: 'Your email', value: user?.email || '' },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <label style={{ fontSize: 11, color: 'var(--text3)', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</label>
                      <input value={value} readOnly style={{ width: '100%', background: 'var(--surface2)', color: 'var(--text2)', borderColor: 'var(--border)' }} />
                    </div>
                  ))}

                  <div>
                    <label style={{ fontSize: 11, color: 'var(--text3)', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Preferred pickup date</label>
                    <input
                      type="date" value={form.pickupDate} min={today}
                      onChange={e => setForm(f => ({ ...f, pickupDate: e.target.value }))}
                      style={{ width: '100%' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: 11, color: 'var(--text3)', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Message to owner</label>
                    <textarea
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      placeholder="Tell the owner about yourself and your home..."
                      rows={4}
                      style={{ width: '100%' }}
                    />
                  </div>

                  <button
                    type="submit" disabled={submitting}
                    style={{
                      padding: '12px', borderRadius: 10, fontWeight: 700, fontSize: 14,
                      background: 'var(--text)', color: 'var(--bg)', border: 'none',
                      cursor: submitting ? 'not-allowed' : 'pointer',
                      opacity: submitting ? 0.6 : 1, transition: 'background 0.15s',
                    }}
                    onMouseEnter={e => { if (!submitting) e.currentTarget.style.background = 'var(--primary)'; }}
                    onMouseLeave={e => { if (!submitting) e.currentTarget.style.background = 'var(--text)'; }}
                  >
                    {submitting ? 'Submitting...' : 'Submit request'}
                  </button>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PetDetailPage;