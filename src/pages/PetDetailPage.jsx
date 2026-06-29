import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPetById } from '../api/pets.api';
import { submitRequest } from '../api/requests.api';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import toast from 'react-hot-toast';
import { FaPaw, FaMapMarkerAlt, FaSyringe, FaHeart, FaDog, FaCat, FaFeatherAlt, FaDove } from 'react-icons/fa';

const T = {
  bg:        '#080612',
  surface:   'rgba(255,255,255,0.04)',
  surface2:  'rgba(255,255,255,0.07)',
  border:    'rgba(255,255,255,0.08)',
  borderHov: 'rgba(255,255,255,0.18)',
  text:      '#f0eeff',
  text2:     'rgba(240,238,255,0.55)',
  text3:     'rgba(240,238,255,0.3)',
  accent:    '#7c5cfc',
  accentGlow:'rgba(124,92,252,0.25)',
};

const SPECIES_EMOJI = { Dog: '🐕', Cat: '🐈', Bird: '🦜', Rabbit: '🐰' };
const SPECIES_ICON  = { Dog: <FaDog size={11}/>, Cat: <FaCat size={11}/>, Bird: <FaFeatherAlt size={11}/>, Rabbit: <FaDove size={11}/> };

const Pill = ({ children, icon }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: 5,
    fontSize: 11, padding: '5px 13px', borderRadius: 50,
    background: 'rgba(124,92,252,0.08)',
    color: T.text2,
    border: '1px solid rgba(124,92,252,0.18)',
  }}>{icon}{children}</span>
);

const InfoRow = ({ label, value }) => (
  <div style={{
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '13px 0', borderBottom: `1px solid ${T.border}`,
  }}>
    <span style={{ fontSize: 13, color: T.text3 }}>{label}</span>
    <span style={{ fontSize: 13, fontWeight: 600, color: T.text }}>{value || '—'}</span>
  </div>
);

const SuccessScreen = ({ petName, onDone }) => {
  const [scale, setScale]       = useState(0);
  const [showText, setShowText] = useState(false);
  const [showBtn, setShowBtn]   = useState(false);

  useEffect(() => {
    setTimeout(() => setScale(1), 50);
    setTimeout(() => setShowText(true), 400);
    setTimeout(() => setShowBtn(true), 700);
  }, []);

  return (
    <div style={{
      padding: '40px 24px', borderRadius: 20, textAlign: 'center',
      background: T.surface, border: `1px solid ${T.border}`,
      backdropFilter: 'blur(16px)',
    }}>
      <div style={{
        width: 72, height: 72, borderRadius: '50%',
        background: 'rgba(124,92,252,0.15)',
        border: '1px solid rgba(124,92,252,0.25)',
        margin: '0 auto 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transform: scale ? 'scale(1)' : 'scale(0)',
        transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path
            d="M7 16.5L13 22.5L25 10"
            stroke="#a78bfa"
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
        transform: showText ? 'none' : 'translateY(10px)',
        transition: 'all 0.4s ease',
      }}>
        <h3 style={{ fontFamily:"'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: T.text, marginBottom: 8 }}>
          Request sent!
        </h3>
        <p style={{ fontSize: 14, color: T.text2, lineHeight: 1.75, marginBottom: 24 }}>
          Your adoption request for <strong style={{ color: T.text }}>{petName}</strong> has been submitted.
          The owner will review and get back to you.
        </p>
      </div>

      <div style={{
        opacity: showBtn ? 1 : 0,
        transform: showBtn ? 'none' : 'translateY(8px)',
        transition: 'all 0.35s ease',
      }}>
        <button
          onClick={onDone}
          style={{
            padding: '12px 32px', borderRadius: 50,
            background: T.accent, color: '#fff',
            fontSize: 13, fontWeight: 700, border: 'none', cursor: 'pointer',
            boxShadow: `0 6px 20px ${T.accentGlow}`, transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 28px rgba(124,92,252,0.45)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = `0 6px 20px ${T.accentGlow}`; }}
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

  const [pet, setPet]           = useState(null);
  const [loading, setLoading]   = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted]   = useState(false);
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
  if (!pet) return <div style={{ textAlign: 'center', padding: 64, color: T.text }}>Pet not found</div>;

  const isOwner = user?.email === pet.ownerEmail;
  const today   = new Date().toISOString().split('T')[0];

  return (
    <div style={{
      background: T.bg, minHeight: '100vh',
      fontFamily: "'DM Sans', sans-serif",
      paddingTop: 64,
    }}>
      <style>{`
        @keyframes fadeInUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:none} }
        @keyframes pulse { 0%,100%{opacity:0.55} 50%{opacity:1} }
        .detail-inp {
          width: 100%; padding: 11px 14px;
          background: rgba(255,255,255,0.04);
          border: 1.5px solid rgba(255,255,255,0.09);
          border-radius: 10px; font-size: 13px; color: #f0eeff;
          outline: none; transition: border-color .2s;
          font-family: 'DM Sans', sans-serif; box-sizing: border-box;
        }
        .detail-inp:focus { border-color: rgba(124,92,252,0.5); }
        .detail-inp::placeholder { color: rgba(240,238,255,0.25); }
        .detail-inp[readonly] { color: rgba(240,238,255,0.35); cursor: default; }
        .detail-textarea {
          width: 100%; padding: 11px 14px;
          background: rgba(255,255,255,0.04);
          border: 1.5px solid rgba(255,255,255,0.09);
          border-radius: 10px; font-size: 13px; color: #f0eeff;
          outline: none; transition: border-color .2s; resize: vertical;
          font-family: 'DM Sans', sans-serif; box-sizing: border-box;
          line-height: 1.6;
        }
        .detail-textarea:focus { border-color: rgba(124,92,252,0.5); }
        .detail-textarea::placeholder { color: rgba(240,238,255,0.25); }
        input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(0.6); }
      `}</style>

      {/* Ambient orbs */}
      <div style={{ position:'fixed', top:'5%', right:'10%', width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle,rgba(100,60,220,0.15) 0%,transparent 70%)', pointerEvents:'none', zIndex:0 }} />
      <div style={{ position:'fixed', bottom:'10%', left:'5%', width:280, height:280, borderRadius:'50%', background:'radial-gradient(circle,rgba(80,40,180,0.1) 0%,transparent 70%)', pointerEvents:'none', zIndex:0 }} />

      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '40px 28px', position:'relative', zIndex:1 }}>

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          style={{
            marginBottom: 36, background: 'none', border: 'none',
            fontSize: 13, color: T.text3, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 6, padding: 0,
            transition: 'color 0.15s', fontFamily:"'DM Sans', sans-serif",
          }}
          onMouseEnter={e => e.currentTarget.style.color = T.text}
          onMouseLeave={e => e.currentTarget.style.color = T.text3}
        >
          ← Back to listings
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 52, alignItems: 'start' }}>

          {/* ── LEFT ── */}
          <div style={{ animation: 'fadeInUp 0.5s ease both' }}>
            {/* Image */}
            <div style={{
              width: '100%', aspectRatio: '1 / 1',
              borderRadius: 22, overflow: 'hidden',
              background: T.surface2,
              border: `1px solid ${T.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 96, position: 'relative',
              boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
            }}>
              {pet.imageURL
                ? <img src={pet.imageURL} alt={pet.name} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                : <span style={{ opacity:0.3 }}>{SPECIES_EMOJI[pet.species] || '🐾'}</span>
              }
              {/* Gradient overlay */}
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(8,6,18,0.45) 0%,transparent 50%)', pointerEvents:'none' }} />
              <span style={{
                position:'absolute', top:14, left:14,
                fontSize:11, fontWeight:700, padding:'5px 13px', borderRadius:50,
                background: pet.status === 'available' ? 'rgba(124,92,252,0.85)' : 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(8px)',
                color: '#fff',
              }}>
                {pet.status === 'available' ? 'Available' : 'Adopted'}
              </span>
            </div>

            {/* Pills */}
            <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginTop:16 }}>
              {pet.species && <Pill icon={SPECIES_ICON[pet.species]}>{pet.species}</Pill>}
              {pet.gender  && <Pill>{pet.gender}</Pill>}
              {pet.breed   && <Pill>{pet.breed}</Pill>}
              {pet.vaccinationStatus === 'vaccinated' && <Pill icon={<FaSyringe size={10}/>}>Vaccinated</Pill>}
            </div>

            {/* Info rows */}
            <div style={{
              marginTop:24, background:T.surface, border:`1px solid ${T.border}`,
              borderRadius:16, padding:'4px 20px',
              backdropFilter:'blur(12px)',
            }}>
              <InfoRow label="Age"         value={pet.age} />
              <InfoRow label="Health"      value={pet.healthStatus} />
              <InfoRow label="Vaccination" value={pet.vaccinationStatus} />
              <InfoRow label="Location"    value={pet.location} />
            </div>
          </div>

          {/* ── RIGHT ── */}
          <div style={{ animation: 'fadeInUp 0.5s ease 0.1s both' }}>

            {/* Name */}
            <div style={{ marginBottom:24 }}>
              <p style={{ fontSize:11, fontWeight:700, letterSpacing:'.1em', color:'#a78bfa', textTransform:'uppercase', marginBottom:10 }}>
                {pet.species} · {pet.location || 'Bangladesh'}
              </p>
              <h1 style={{
                fontFamily:"'Playfair Display', serif",
                fontSize: 44, fontWeight:700, color:T.text,
                lineHeight:1.1, marginBottom:6,
              }}>{pet.name}</h1>
              <p style={{ fontSize:14, color:T.text3 }}>{pet.breed}</p>
            </div>

            {/* Fee */}
            <div style={{
              display:'flex', alignItems:'center', justifyContent:'space-between',
              padding:'18px 22px', borderRadius:16,
              background:T.surface, border:`1px solid ${T.border}`,
              backdropFilter:'blur(12px)',
              marginBottom:24,
            }}>
              <span style={{ fontSize:13, color:T.text3 }}>Adoption fee</span>
              <span style={{
                fontFamily:"'Playfair Display', serif",
                fontSize:30, fontWeight:700,
                background:'linear-gradient(135deg,#a78bfa,#7c5cfc)',
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
              }}>
                ৳{pet.adoptionFee?.toLocaleString() || 0}
              </span>
            </div>

            {/* Description */}
            <p style={{ fontSize:14, color:T.text2, lineHeight:1.85, marginBottom:28 }}>
              {pet.description || 'No description provided.'}
            </p>

            {/* Owner */}
            {pet.ownerName && (
              <div style={{
                display:'flex', alignItems:'center', gap:12,
                padding:'14px 18px', borderRadius:14,
                border:`1px solid ${T.border}`,
                background:T.surface,
                backdropFilter:'blur(12px)',
                marginBottom:24,
              }}>
                <div style={{
                  width:40, height:40, borderRadius:'50%',
                  background:'rgba(124,92,252,0.15)',
                  border:'1px solid rgba(124,92,252,0.25)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:15, fontWeight:700, color:'#a78bfa', flexShrink:0,
                }}>
                  {pet.ownerName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div style={{ fontSize:13, fontWeight:600, color:T.text }}>{pet.ownerName}</div>
                  <div style={{ fontSize:11, color:T.text3 }}>Owner</div>
                </div>
                <div style={{
                  marginLeft:'auto', display:'flex', alignItems:'center', gap:5,
                  fontSize:11, color:'#4ade80',
                }}>
                  <span style={{ width:6, height:6, borderRadius:'50%', background:'#4ade80', display:'inline-block', boxShadow:'0 0 6px rgba(74,222,128,0.5)', animation:'pulse 2s ease-in-out infinite' }} />
                  Active
                </div>
              </div>
            )}

            {/* CTA */}
            {submitted ? (
              <SuccessScreen petName={pet.name} onDone={() => setSubmitted(false)} />
            ) : pet.status === 'adopted' ? (
              <div style={{
                padding:'16px 20px', borderRadius:14,
                background:'rgba(255,255,255,0.03)',
                border:`1px solid ${T.border}`,
                fontSize:14, color:T.text2, fontWeight:500,
              }}>
                This pet has already found a forever home. 🏠
              </div>
            ) : isOwner ? (
              <div style={{
                padding:'16px 20px', borderRadius:14,
                background:T.surface, border:`1px solid ${T.border}`,
                fontSize:14, color:T.text2, fontWeight:500,
              }}>
                You own this listing — you cannot adopt your own pet.
              </div>
            ) : (
              <>
                <button
                  onClick={() => setShowForm(f => !f)}
                  style={{
                    width:'100%', padding:'15px', borderRadius:50,
                    fontSize:14, fontWeight:700,
                    background: showForm ? T.surface : T.accent,
                    color: showForm ? T.text2 : '#fff',
                    border: showForm ? `1px solid ${T.border}` : 'none',
                    cursor:'pointer', transition:'all 0.2s',
                    marginBottom: showForm ? 14 : 0,
                    boxShadow: showForm ? 'none' : `0 8px 24px ${T.accentGlow}`,
                    fontFamily:"'DM Sans', sans-serif",
                  }}
                  onMouseEnter={e => { if (!showForm) { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 12px 32px rgba(124,92,252,0.45)'; } }}
                  onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow=showForm?'none':`0 8px 24px ${T.accentGlow}`; }}
                >
                  {showForm ? 'Cancel' : 'Request Adoption →'}
                </button>

                {showForm && (
                  <form
                    onSubmit={handleSubmit}
                    style={{
                      padding:'22px', borderRadius:18,
                      border:`1px solid ${T.border}`,
                      background:T.surface,
                      backdropFilter:'blur(16px)',
                      display:'flex', flexDirection:'column', gap:16,
                      animation:'fadeInUp 0.25s ease both',
                    }}
                  >
                    <p style={{ fontSize:13, fontWeight:700, color:T.text, margin:0, letterSpacing:'.02em' }}>
                      Adoption request
                    </p>

                    {[
                      { label:'Pet',        value: pet.name },
                      { label:'Your name',  value: user?.name || user?.displayName || '' },
                      { label:'Your email', value: user?.email || '' },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <label style={{ fontSize:10, color:T.text3, display:'block', marginBottom:6, textTransform:'uppercase', letterSpacing:'.08em' }}>{label}</label>
                        <input className="detail-inp" value={value} readOnly />
                      </div>
                    ))}

                    <div>
                      <label style={{ fontSize:10, color:T.text3, display:'block', marginBottom:6, textTransform:'uppercase', letterSpacing:'.08em' }}>Preferred pickup date</label>
                      <input
                        className="detail-inp"
                        type="date" value={form.pickupDate} min={today}
                        onChange={e => setForm(f => ({ ...f, pickupDate: e.target.value }))}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize:10, color:T.text3, display:'block', marginBottom:6, textTransform:'uppercase', letterSpacing:'.08em' }}>Message to owner</label>
                      <textarea
                        className="detail-textarea"
                        value={form.message}
                        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                        placeholder="Tell the owner about yourself and your home..."
                        rows={4}
                      />
                    </div>

                    <button
                      type="submit" disabled={submitting}
                      style={{
                        padding:'13px', borderRadius:50, fontWeight:700, fontSize:14,
                        background: T.accent, color:'#fff', border:'none',
                        cursor: submitting ? 'not-allowed' : 'pointer',
                        opacity: submitting ? 0.6 : 1, transition:'all 0.2s',
                        boxShadow:`0 6px 20px ${T.accentGlow}`,
                        fontFamily:"'DM Sans', sans-serif",
                      }}
                      onMouseEnter={e => { if (!submitting) e.currentTarget.style.transform='translateY(-1px)'; }}
                      onMouseLeave={e => { e.currentTarget.style.transform='none'; }}
                    >
                      {submitting ? 'Submitting...' : 'Submit Request'}
                    </button>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetailPage;