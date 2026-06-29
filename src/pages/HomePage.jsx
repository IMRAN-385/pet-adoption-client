import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PetCard from '../components/pets/PetCard';
import { getAllPets } from '../api/pets.api';
import { useAuth } from '../context/AuthContext';
import { FaSearch, FaHeart, FaClipboardCheck, FaHome, FaDog, FaCat, FaFeatherAlt, FaDove, FaPaw, FaHandshake, FaSyringe, FaUtensils, FaDumbbell, FaHospital, FaStar, FaMapMarkerAlt, FaUsers } from "react-icons/fa";
import { FaShield } from "react-icons/fa6";

const useReveal = (threshold = 0.12) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
};

const PLACEHOLDER_PETS = [
  { name: 'Cooper', breed: 'Pembroke Welsh Corgi', age: '2 Years', species: 'Dog', img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80', badge: 'New Arrival' },
  { name: 'Luna', breed: 'Domestic Shorthair', age: '1 Year', species: 'Cat', img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&q=80', badge: 'Staff Fav' },
  { name: 'Max', breed: 'French Bulldog', age: '3 Years', species: 'Dog', img: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&q=80' },
  { name: 'Bear', breed: 'German Shepherd', age: '4 Years', species: 'Dog', img: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=400&q=80' },
  { name: 'Mango', breed: 'Persian Cat', age: '8 Months', species: 'Cat', img: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=400&q=80', badge: 'Gentle' },
  { name: 'Rio', breed: 'African Grey Parrot', age: '3 Years', species: 'Bird', img: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&q=80' },
];

const SPECIES_ICON = { Dog: <FaDog size={11} />, Cat: <FaCat size={11} />, Bird: <FaFeatherAlt size={11} />, Rabbit: <FaDove size={11} />, Other: <FaPaw size={11} /> };
const SPECIES_LABEL = { Dog: 'Dog', Cat: 'Cat', Bird: 'Bird', Rabbit: 'Rabbit', Other: 'Other' };

// Dark theme tokens — matching the reference images
const T = {
  bg:        '#080612',      // near-black with deep violet undertone
  surface:   '#0e0c1a',      // card base
  surface2:  '#15122a',      // slightly lighter
  border:    'rgba(255,255,255,0.08)',
  borderHov: 'rgba(255,255,255,0.18)',
  text:      '#f0eeff',
  text2:     'rgba(240,238,255,0.55)',
  text3:     'rgba(240,238,255,0.3)',
  accent:    '#7c5cfc',      // violet/indigo glow — the signature tint from the crystals
  accentGlow:'rgba(124,92,252,0.25)',
  glass:     'rgba(255,255,255,0.04)',
  glassHov:  'rgba(255,255,255,0.08)',
};

const GlassCard = ({ children, style = {}, onMouseEnter, onMouseLeave }) => (
  <div
    style={{
      background: T.glass,
      border: `1px solid ${T.border}`,
      borderRadius: 20,
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      transition: 'all 0.3s ease',
      ...style,
    }}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    {children}
  </div>
);

const HomePage = () => {
  const [pets, setPets] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  const [heroRef, heroVisible] = useReveal(0.1);
  const [petsRef, petsVisible] = useReveal(0.1);
  const [whyRef, whyVisible] = useReveal(0.1);
  const [storiesRef, storiesVisible] = useReveal(0.1);
  const [careRef, careVisible] = useReveal(0.1);
  const [statsRef, statsVisible] = useReveal(0.1);
  const [adoptRef, adoptVisible] = useReveal(0.1);

  useEffect(() => {
    getAllPets()
      .then(res => setPets((res.data.pets || []).slice(0, 6)))
      .catch(() => {});
  }, []);

  const handleAdoptNow = () => {
    if (!user) { navigate('/login'); return; }
    navigate('/pets');
  };

  const vis = (visible, delay = '0s') => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'none' : 'translateY(28px)',
    transition: `all 0.7s ease ${delay}`,
  });

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: T.bg, color: T.text, minHeight: '100vh' }}>
      <style>{`
        @keyframes floatA { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-18px) rotate(6deg)} }
        @keyframes floatB { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-12px) rotate(-8deg)} }
        @keyframes pulse  { 0%,100%{opacity:0.6} 50%{opacity:1} }
        .pet-card-dark:hover { transform: translateY(-8px) !important; border-color: rgba(124,92,252,0.3) !important; box-shadow: 0 20px 50px rgba(124,92,252,0.15) !important; }
        .step-card:hover { transform: translateY(-8px) !important; border-color: rgba(124,92,252,0.3) !important; }
        .care-card:hover { background: rgba(255,255,255,0.07) !important; transform: translateY(-4px) !important; }
        .btn-primary-dark:hover { background: rgba(124,92,252,0.9) !important; transform: translateY(-2px) !important; box-shadow: 0 12px 36px rgba(124,92,252,0.45) !important; }
        .btn-ghost-dark:hover { background: rgba(255,255,255,0.08) !important; border-color: rgba(255,255,255,0.2) !important; }
      `}</style>

      {/* ── HERO ── */}
      <section ref={heroRef} style={{
        position: 'relative', minHeight: '100vh',
        display: 'flex', alignItems: 'center', overflow: 'hidden',
        paddingTop: 64,
      }}>
        {/* Ambient orbs */}
        <div style={{ position: 'absolute', top: '15%', left: '55%', width: 480, height: 480, borderRadius: '50%', background: 'radial-gradient(circle, rgba(100,60,220,0.22) 0%, transparent 70%)', pointerEvents: 'none', filter: 'blur(2px)' }} />
        <div style={{ position: 'absolute', bottom: '10%', left: '30%', width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(80,40,180,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

        {/* Floating crystal decorations */}
        <div style={{ position: 'absolute', top: '18%', right: '8%', width: 120, height: 120, animation: 'floatA 6s ease-in-out infinite', pointerEvents: 'none', opacity: 0.75 }}>
          <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, rgba(160,120,255,0.7), rgba(80,40,200,0.4))', clipPath: 'polygon(50% 0%, 80% 20%, 100% 60%, 70% 100%, 30% 100%, 0% 60%, 20% 20%)', borderRadius: 8, backdropFilter: 'blur(4px)', boxShadow: '0 0 40px rgba(140,100,255,0.3)' }} />
        </div>
        <div style={{ position: 'absolute', bottom: '22%', right: '14%', width: 70, height: 70, animation: 'floatB 7s ease-in-out infinite', pointerEvents: 'none', opacity: 0.6 }}>
          <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, rgba(200,160,255,0.6), rgba(100,60,220,0.3))', clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)', borderRadius: 4, boxShadow: '0 0 24px rgba(160,120,255,0.25)' }} />
        </div>
        <div style={{ position: 'absolute', top: '55%', right: '4%', width: 50, height: 50, animation: 'floatA 5s ease-in-out infinite 1s', pointerEvents: 'none', opacity: 0.5 }}>
          <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, rgba(180,140,255,0.5), rgba(80,40,180,0.3))', clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', boxShadow: '0 0 18px rgba(140,100,255,0.2)' }} />
        </div>

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1200, margin: '0 auto', padding: '0 48px', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>

          {/* LEFT — text */}
          <div>
            {/* Eyebrow */}
            <div style={{ ...vis(heroVisible), display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(124,92,252,0.12)', border: '1px solid rgba(124,92,252,0.25)', borderRadius: 50, padding: '6px 16px', marginBottom: 32 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: T.accent, display: 'inline-block', animation: 'pulse 2s ease-in-out infinite' }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: '#b8a0ff', letterSpacing: '.05em', textTransform: 'uppercase' }}>Trusted by 10k+ families across Bangladesh</span>
            </div>

            <h1 style={{ ...vis(heroVisible, '0.1s'), fontSize: 'clamp(40px,5vw,76px)', fontFamily: "'Playfair Display', serif", fontWeight: 700, lineHeight: 1.05, marginBottom: 28 }}>
              Find Your New{' '}
              <span style={{ background: 'linear-gradient(135deg, #a78bfa, #7c5cfc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontStyle: 'italic' }}>
                Best<br />Friend
              </span>
            </h1>

            <p style={{ ...vis(heroVisible, '0.2s'), fontSize: 16, color: T.text2, lineHeight: 1.75, maxWidth: 420, marginBottom: 44 }}>
              Connecting loving homes with pets in need across Bangladesh. Start your journey to pet parenthood today.
            </p>

            <div style={{ ...vis(heroVisible, '0.3s'), display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <button
                onClick={handleAdoptNow}
                className="btn-primary-dark"
                style={{ padding: '15px 32px', borderRadius: 50, background: T.accent, color: '#fff', fontSize: 14, fontWeight: 700, border: 'none', cursor: 'pointer', boxShadow: `0 8px 28px ${T.accentGlow}`, transition: 'all 0.25s' }}
              >Adopt Now →</button>
              <Link
                to="/pets"
                className="btn-ghost-dark"
                style={{ padding: '15px 32px', borderRadius: 50, background: T.glass, color: T.text, fontSize: 14, fontWeight: 600, textDecoration: 'none', border: `1px solid ${T.border}`, backdropFilter: 'blur(10px)', transition: 'all 0.25s' }}
              >View All Pets</Link>
            </div>

            {/* Stats row */}
            <div style={{ ...vis(heroVisible, '0.4s'), display: 'flex', gap: 36, marginTop: 56, flexWrap: 'wrap' }}>
              {[['5,000+', 'Pets Adopted'], ['1,200+', 'Happy Families'], ['50+', 'Cities Covered']].map(([num, label]) => (
                <div key={label}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 900, background: 'linear-gradient(135deg, #a78bfa, #7c5cfc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{num}</div>
                  <div style={{ fontSize: 12, color: T.text3, marginTop: 2, letterSpacing: '.03em' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — pet visual */}
          <div style={{ ...vis(heroVisible, '0.25s'), position: 'relative', display: 'flex', justifyContent: 'center' }}>
            {/* Main pet card */}
            <div style={{
              width: 320, borderRadius: 28, overflow: 'hidden',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(124,92,252,0.1)',
              animation: 'floatA 7s ease-in-out infinite',
            }}>
              <div style={{ position: 'relative', height: 280, overflow: 'hidden' }}>
                <img
                  src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80"
                  alt="Cooper"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,6,18,0.7) 0%, transparent 55%)' }} />
                <span style={{ position: 'absolute', top: 14, left: 14, background: 'rgba(124,92,252,0.85)', backdropFilter: 'blur(8px)', color: '#fff', padding: '4px 12px', borderRadius: 50, fontSize: 11, fontWeight: 700 }}>Available</span>
              </div>
              <div style={{ padding: '18px 20px 22px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: T.text }}>Cooper</h3>
                  <span style={{ fontSize: 12, color: T.text3 }}>2 Years</span>
                </div>
                <p style={{ fontSize: 13, color: T.text2, marginBottom: 16 }}>Pembroke Welsh Corgi</p>
                <div style={{ display: 'flex', gap: 6, marginBottom: 18 }}>
                  <span style={{ display:'flex', alignItems:'center', gap:4, padding: '4px 10px', borderRadius: 50, fontSize: 11, background: 'rgba(255,255,255,0.05)', color: T.text2, border: `1px solid ${T.border}` }}><FaDog size={11}/> Dog</span>
                  <span style={{ display:'flex', alignItems:'center', gap:4, padding: '4px 10px', borderRadius: 50, fontSize: 11, background: 'rgba(255,255,255,0.05)', color: T.text2, border: `1px solid ${T.border}` }}><FaSyringe size={11}/> Vaccinated</span>
                  <span style={{ display:'flex', alignItems:'center', gap:4, padding: '4px 10px', borderRadius: 50, fontSize: 11, background: 'rgba(255,255,255,0.05)', color: T.text2, border: `1px solid ${T.border}` }}><FaHeart size={11}/> Friendly</span>
                </div>
                <button onClick={handleAdoptNow} style={{
                  width: '100%', padding: '11px', borderRadius: 50, border: '1px solid rgba(124,92,252,0.35)',
                  color: '#a78bfa', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                  background: 'rgba(124,92,252,0.1)', transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(124,92,252,0.22)'; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(124,92,252,0.1)'; e.currentTarget.style.color = '#a78bfa'; }}
                >Meet Cooper →</button>
              </div>
            </div>

            {/* Small floating card — second pet */}
            <div style={{
              position: 'absolute', bottom: -20, left: -20,
              width: 160, borderRadius: 18, overflow: 'hidden',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
              animation: 'floatB 6s ease-in-out infinite 1s',
            }}>
              <div style={{ height: 100, overflow: 'hidden' }}>
                <img
                  src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&q=80"
                  alt="Luna"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '10px 12px' }}>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, color: T.text, marginBottom: 2 }}>Luna</p>
                <p style={{ fontSize: 11, color: T.text3 }}>Domestic Shorthair</p>
              </div>
            </div>

            {/* Online badge */}
            <div style={{
              position: 'absolute', top: -16, right: 10,
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(124,92,252,0.25)',
              backdropFilter: 'blur(12px)',
              borderRadius: 50, padding: '8px 14px',
              display: 'flex', alignItems: 'center', gap: 6,
              boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ade80', display: 'inline-block', boxShadow: '0 0 8px rgba(74,222,128,0.6)' }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: T.text }}>12 new today</span>
            </div>
          </div>

        </div>
      </section>

      {/* ── FEATURED PETS ── */}
      <section ref={petsRef} style={{ padding: '100px 48px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, flexWrap: 'wrap', gap: 12 }}>
          <div style={vis(petsVisible)}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.1em', color: '#a78bfa', textTransform: 'uppercase', marginBottom: 10 }}>Available Now</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,4vw,42px)', marginBottom: 8 }}>Meet Our Residents</h2>
            <p style={{ color: T.text2, fontSize: 15 }}>Lovable companions waiting for their forever homes.</p>
          </div>
          <Link to="/pets" style={{ fontSize: 13, fontWeight: 600, color: '#a78bfa', textDecoration: 'none', ...vis(petsVisible, '0.2s'), padding: '8px 20px', border: '1px solid rgba(124,92,252,0.25)', borderRadius: 50, background: 'rgba(124,92,252,0.08)', transition: 'all 0.2s' }}>
            See all pets →
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 20 }}>
          {pets.length > 0
            ? pets.map((pet, i) => <PetCard key={pet._id} pet={pet} index={i} />)
            : PLACEHOLDER_PETS.map((pet, i) => (
              <div
                key={pet.name}
                className="pet-card-dark"
                style={{
                  background: T.glass,
                  borderRadius: 20, overflow: 'hidden',
                  border: `1px solid ${T.border}`,
                  backdropFilter: 'blur(16px)',
                  transition: 'all 0.3s ease',
                  ...vis(petsVisible, `${i * 0.08}s`),
                }}
              >
                <div style={{ position: 'relative', height: 220, overflow: 'hidden' }}>
                  <img src={pet.img} alt={pet.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'none'}
                  />
                  {/* Gradient overlay */}
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,6,18,0.6) 0%, transparent 50%)' }} />
                  {pet.badge && (
                    <span style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(124,92,252,0.85)', backdropFilter: 'blur(8px)', color: '#fff', padding: '4px 12px', borderRadius: 50, fontSize: 11, fontWeight: 700 }}>{pet.badge}</span>
                  )}
                </div>
                <div style={{ padding: '18px 20px 22px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: T.text }}>{pet.name}</h3>
                    <span style={{ fontSize: 12, color: T.text3 }}>{pet.age}</span>
                  </div>
                  <p style={{ fontSize: 13, color: T.text2, marginBottom: 16 }}>{pet.breed}</p>
                  <div style={{ display: 'flex', gap: 6, marginBottom: 18, flexWrap: 'wrap' }}>
                    <span style={{ display:'flex', alignItems:'center', gap:4, padding: '4px 12px', borderRadius: 50, fontSize: 11, background: 'rgba(255,255,255,0.05)', color: T.text2, border: `1px solid ${T.border}` }}>{SPECIES_ICON[pet.species]} {SPECIES_LABEL[pet.species]}</span>
                    <span style={{ display:'flex', alignItems:'center', gap:4, padding: '4px 12px', borderRadius: 50, fontSize: 11, background: 'rgba(255,255,255,0.05)', color: T.text2, border: `1px solid ${T.border}` }}><FaSyringe size={10}/> Vaccinated</span>
                  </div>
                  <button onClick={handleAdoptNow} style={{
                    display: 'block', width: '100%', textAlign: 'center',
                    padding: '11px', borderRadius: 50,
                    border: '1px solid rgba(124,92,252,0.3)',
                    color: '#a78bfa', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                    background: 'rgba(124,92,252,0.08)', transition: 'all 0.2s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(124,92,252,0.2)'; e.currentTarget.style.color = '#fff'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(124,92,252,0.08)'; e.currentTarget.style.color = '#a78bfa'; }}
                  >View Details</button>
                </div>
              </div>
            ))
          }
        </div>
      </section>

      {/* ── WHY ADOPT ── */}
      <section ref={whyRef} style={{ padding: '100px 48px', borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 72, alignItems: 'center' }}>
          {/* Image side */}
          <div style={vis(whyVisible)}>
            <div style={{ borderRadius: 24, overflow: 'hidden', height: 420, position: 'relative', border: `1px solid ${T.border}` }}>
              <img src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=700&q=80" alt="Happy pet adoption" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,6,18,0.5) 0%, transparent 60%)' }} />
            </div>
            {/* Floating stat card */}
            <GlassCard style={{ padding: '20px 24px', marginTop: -52, marginLeft: 24, position: 'relative', zIndex: 1, display: 'inline-block', boxShadow: `0 20px 50px rgba(0,0,0,0.4)` }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 34, fontWeight: 900, background: 'linear-gradient(135deg, #a78bfa, #7c5cfc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>5,000+</div>
              <div style={{ fontSize: 12, color: T.text2, lineHeight: 1.5, marginTop: 4 }}>Happy pets adopted<br />this year alone.</div>
            </GlassCard>
          </div>

          {/* Text side */}
          <div style={vis(whyVisible, '0.15s')}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.1em', color: '#a78bfa', textTransform: 'uppercase', marginBottom: 16 }}>Why Choose Us</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,4vw,44px)', marginBottom: 8, lineHeight: 1.15 }}>Why Adopt from</h2>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,4vw,44px)', background: 'linear-gradient(135deg, #a78bfa, #7c5cfc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 40, lineHeight: 1.15 }}>PawsHome?</h2>

            {[
              { icon: <FaHandshake size={20}/>, title: 'Community Impact', text: "By adopting, you're giving a second chance to a deserving animal and freeing up space in shelters." },
              { icon: <FaShield size={20}/>, title: 'Professional Screening', text: 'Our matching process ensures that every pet goes to a home that fits their unique personality and needs.' },
              { icon: <FaSyringe size={20}/>, title: 'Health Guarantee', text: 'All PawsHome residents are fully vaccinated, microchipped, and come with full medical history.' },
            ].map(item => (
              <div key={item.title} style={{ display: 'flex', gap: 18, marginBottom: 28 }}>
                <div style={{ width: 46, height: 46, borderRadius: 14, flexShrink: 0, background: 'rgba(124,92,252,0.1)', border: `1px solid rgba(124,92,252,0.2)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
                  {item.icon}
                </div>
                <div>
                  <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 5, color: T.text }}>{item.title}</h4>
                  <p style={{ fontSize: 14, color: T.text2, lineHeight: 1.65 }}>{item.text}</p>
                </div>
              </div>
            ))}

            <button onClick={handleAdoptNow} className="btn-primary-dark" style={{
              marginTop: 8, padding: '14px 32px', borderRadius: 50,
              background: T.accent, color: '#fff', fontSize: 14, fontWeight: 700,
              border: 'none', cursor: 'pointer', boxShadow: `0 6px 24px ${T.accentGlow}`, transition: 'all 0.25s',
            }}>Start Adopting</button>
          </div>
        </div>
      </section>

      {/* ── SUCCESS STORIES ── */}
      <section ref={storiesRef} style={{ padding: '100px 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 72, ...vis(storiesVisible) }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.1em', color: '#a78bfa', textTransform: 'uppercase', marginBottom: 12 }}>Real Families</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,4vw,44px)' }}>Success Stories</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>
            {[
              { align: 'left', family: 'Rahman Family • Chittagong', quote: '"Buddy found his tribe, and we found our missing piece."', img: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=800&q=80' },
              { align: 'right', family: 'Karim & Ginger • Dhaka', quote: '"Pure companionship at its finest."', img: 'https://images.unsplash.com/photo-1548247416-ec66f4900b2e?w=800&q=80' },
            ].map(({ align, family, quote, img }, i) => (
              <div key={family} style={{ display: 'flex', alignItems: 'center', gap: 40, flexDirection: align === 'right' ? 'row-reverse' : 'row', ...vis(storiesVisible, `${i * 0.15}s`) }}>
                <div style={{ width: 400, height: 300, borderRadius: 24, overflow: 'hidden', flexShrink: 0, border: `1px solid ${T.border}` }}>
                  <img src={img} alt={family} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1, textAlign: align === 'right' ? 'left' : 'right' }}>
                  <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.08em', color: '#a78bfa', textTransform: 'uppercase', marginBottom: 16 }}>{family}</p>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, lineHeight: 1.45, color: T.text }}>{quote}</p>
                </div>
              </div>
            ))}

            {/* Third story — quote card */}
            <GlassCard style={{ padding: '40px 48px', textAlign: 'center', ...vis(storiesVisible, '0.3s') }}>
              <div style={{ fontSize: 64, color: T.accent, fontFamily: 'serif', lineHeight: 1, marginBottom: 8, opacity: 0.5 }}>"</div>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.08em', color: '#a78bfa', textTransform: 'uppercase', marginBottom: 16 }}>Nadia & Duke • Sylhet</p>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, lineHeight: 1.6, color: T.text, maxWidth: 600, margin: '0 auto' }}>
                The team at PawsHome truly cares about where their animals go. We felt supported every step of the way.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* ── PET CARE GUIDE ── */}
      <section ref={careRef} style={{ padding: '100px 48px', borderTop: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 52, flexWrap: 'wrap', gap: 16, ...vis(careVisible) }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.1em', color: '#a78bfa', textTransform: 'uppercase', marginBottom: 10 }}>Learn</p>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,4vw,40px)' }}>Pet Care Guide</h2>
            </div>
            <Link to="/pet-care" style={{
              padding: '11px 24px', borderRadius: 50,
              background: T.glass, color: T.text,
              border: `1px solid ${T.border}`,
              fontSize: 13, fontWeight: 600, textDecoration: 'none',
              backdropFilter: 'blur(10px)', transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = T.glassHov; e.currentTarget.style.borderColor = T.borderHov; }}
              onMouseLeave={e => { e.currentTarget.style.background = T.glass; e.currentTarget.style.borderColor = T.border; }}
            >Browse All Guides</Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20 }}>
            {[
              { icon: <FaUtensils size={22}/>, title: 'Nutrition 101', text: 'Learn the best diets for different breeds and life stages to keep your pet healthy and energetic.', delay: '0s' },
              { icon: <FaDumbbell size={22}/>, title: 'Activity & Play', text: 'Keep your furry friend mentally stimulated and physically fit with our creative play ideas.', delay: '0.1s' },
              { icon: <FaHospital size={22}/>, title: 'Wellness Visits', text: 'A guide to essential vaccinations, check-ups, and preventative care for your new companion.', delay: '0.2s' },
            ].map(card => (
              <div key={card.title} className="care-card" style={{
                background: T.glass, borderRadius: 20, padding: 28,
                border: `1px solid ${T.border}`, transition: 'all 0.25s', backdropFilter: 'blur(12px)',
                ...vis(careVisible, card.delay),
              }}>
                <div style={{ width: 50, height: 50, borderRadius: 15, background: 'rgba(124,92,252,0.1)', border: '1px solid rgba(124,92,252,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginBottom: 20 }}>{card.icon}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, marginBottom: 10, color: T.text }}>{card.title}</h3>
                <p style={{ fontSize: 14, color: T.text2, lineHeight: 1.7, marginBottom: 20 }}>{card.text}</p>
                <Link to="/pet-care" style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 700, color: '#a78bfa', textDecoration: 'none' }}>Read more →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section ref={adoptRef} style={{ padding: '100px 48px', borderTop: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64, ...vis(adoptVisible) }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.1em', color: '#a78bfa', textTransform: 'uppercase', marginBottom: 12 }}>The Process</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(30px,4vw,44px)', marginBottom: 12 }}>How It Works</h2>
            <p style={{ color: T.text2, fontSize: 15, maxWidth: 520, margin: '0 auto', ...vis(adoptVisible, '0.1s') }}>
              A simple, transparent adoption process — designed for pets and the families who love them.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 20 }}>
            {[
              { step: '01', icon: <FaSearch />, title: 'Discover Pets', text: 'Explore verified pets from trusted shelters and responsible owners.' },
              { step: '02', icon: <FaHeart />, title: 'Find Your Match', text: 'Choose a companion that fits your lifestyle and preferences.' },
              { step: '03', icon: <FaClipboardCheck />, title: 'Submit Request', text: 'Send an adoption request and connect directly with the owner.' },
              { step: '04', icon: <FaHome />, title: 'Bring Them Home', text: 'Complete the process and welcome your new best friend.' },
            ].map(({ step, icon, title, text }, i) => (
              <div key={step} className="step-card" style={{
                background: T.glass, borderRadius: 20, padding: '32px 24px', textAlign: 'center',
                border: `1px solid ${T.border}`, backdropFilter: 'blur(12px)',
                transition: 'all 0.3s ease',
                ...vis(adoptVisible, `${i * 0.1}s`),
              }}>
                <div style={{ width: 72, height: 72, borderRadius: 18, background: 'rgba(124,92,252,0.1)', border: '1px solid rgba(124,92,252,0.2)', color: '#a78bfa', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, margin: '0 auto 20px' }}>
                  {icon}
                </div>
                <div style={{ display: 'inline-block', padding: '5px 14px', borderRadius: 999, background: 'rgba(124,92,252,0.15)', color: '#b8a0ff', fontSize: 10, fontWeight: 700, letterSpacing: '.08em', marginBottom: 18, border: '1px solid rgba(124,92,252,0.25)' }}>
                  STEP {step}
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 21, marginBottom: 12, color: T.text }}>{title}</h3>
                <p style={{ color: T.text2, fontSize: 14, lineHeight: 1.75 }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS BANNER ── */}
      <section ref={statsRef} style={{ padding: '72px 48px', borderTop: `1px solid ${T.border}`, background: 'rgba(124,92,252,0.05)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 32, textAlign: 'center' }}>
          {[
            { num: '5,000+', label: 'Pets Adopted', icon: <FaPaw size={26}/> },
            { num: '1,200+', label: 'Happy Families', icon: <FaUsers size={26}/> },
            { num: '50+',    label: 'Cities Covered', icon: <FaMapMarkerAlt size={26}/> },
            { num: '98%',    label: 'Satisfaction Rate', icon: <FaStar size={26}/> },
          ].map(({ num, label, icon }, i) => (
            <div key={label} style={vis(statsVisible, `${i * 0.1}s`)}>
              <div style={{ marginBottom: 10, color: '#a78bfa' }}>{icon}</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 38, fontWeight: 900, background: 'linear-gradient(135deg, #a78bfa, #7c5cfc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1 }}>{num}</div>
              <div style={{ fontSize: 13, color: T.text2, marginTop: 8 }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '96px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden', borderTop: `1px solid ${T.border}` }}>
        {/* Glow bg */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 300, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(124,92,252,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.1em', color: '#a78bfa', textTransform: 'uppercase', marginBottom: 16 }}>Join The Community</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,4vw,52px)', color: T.text, marginBottom: 16 }}>Ready to change a life?</h2>
          <p style={{ color: T.text2, fontSize: 16, marginBottom: 40, maxWidth: 480, margin: '0 auto 40px' }}>
            Your perfect companion is just a few clicks away.
          </p>
          <button onClick={handleAdoptNow} className="btn-primary-dark" style={{
            display: 'inline-block', padding: '17px 44px', borderRadius: 50,
            background: T.accent, color: '#fff', fontSize: 15, fontWeight: 700,
            border: 'none', cursor: 'pointer',
            boxShadow: `0 8px 32px ${T.accentGlow}`, transition: 'all 0.25s',
          }}>Adopt Now →</button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;