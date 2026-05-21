import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import PetCard from '../components/pets/PetCard';
import { getAllPets } from '../api/pets.api';

/* ── simple intersection-observer hook ── */
const useReveal = (threshold = 0.15) => {
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

/* ── animated counter ── */
const AnimatedNumber = ({ target, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [ref, visible] = useReveal(0.5);
  useEffect(() => {
    if (!visible) return;
    const num = parseInt(target.replace(/\D/g, ''), 10);
    const step = Math.ceil(num / 40);
    let cur = 0;
    const t = setInterval(() => {
      cur = Math.min(cur + step, num);
      setCount(cur);
      if (cur >= num) clearInterval(t);
    }, 30);
    return () => clearInterval(t);
  }, [visible, target]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

const HomePage = () => {
  const [pets, setPets] = useState([]);
  const [heroRef, heroVisible] = useReveal(0.1);
  const [petsRef, petsVisible] = useReveal(0.1);
  const [whyRef, whyVisible]   = useReveal(0.1);
  const [storiesRef, storiesVisible] = useReveal(0.1);

  useEffect(() => {
    getAllPets().then(res => setPets(res.data.pets.slice(0, 6))).catch(() => {});
  }, []);

  return (
    <div className="page-enter">

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        style={{
          background: 'linear-gradient(135deg, #FFF3E6 0%, #FDEADF 50%, #FCE4D3 100%)',
          padding: '88px 24px 72px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Floating decorative blobs */}
        <div className="hero-float" style={{
          position: 'absolute', top: 40, left: '8%', fontSize: 56, opacity: 0.18, pointerEvents: 'none',
        }}>🐕</div>
        <div className="hero-float-slow" style={{
          position: 'absolute', top: 60, right: '10%', fontSize: 48, opacity: 0.15, pointerEvents: 'none',
        }}>🐈</div>
        <div className="hero-float" style={{
          position: 'absolute', bottom: 30, left: '20%', fontSize: 36, opacity: 0.12, pointerEvents: 'none',
          animationDelay: '2s',
        }}>🦜</div>
        <div className="hero-float-slow" style={{
          position: 'absolute', bottom: 40, right: '18%', fontSize: 40, opacity: 0.1, pointerEvents: 'none',
        }}>🐰</div>

        <div style={{ maxWidth: 700, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div
            className={heroVisible ? 'animate-fadeInUp' : ''}
            style={{ opacity: heroVisible ? undefined : 0 }}
          >
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 20,
              background: 'var(--primary-light)', border: '1px solid rgba(232,97,42,.2)',
              borderRadius: 20, padding: '6px 16px',
            }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--primary)', display: 'inline-block', animation: 'borderPulse 2s infinite' }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--primary)', letterSpacing: '.08em' }}>
                TRUSTED PET ADOPTION PLATFORM
              </span>
            </div>

            <h1 style={{ fontSize: 'clamp(36px,6vw,64px)', lineHeight: 1.1, marginBottom: 20 }}>
              Find Your{' '}
              <span style={{ color: 'var(--primary)', position: 'relative' }}>
                Perfect
                <svg style={{ position: 'absolute', bottom: -4, left: 0, width: '100%', height: 8, opacity: 0.5 }} viewBox="0 0 100 8" preserveAspectRatio="none">
                  <path d="M0 6 Q25 0 50 5 Q75 10 100 4" stroke="#E8612A" strokeWidth="3" fill="none" strokeLinecap="round"/>
                </svg>
              </span>
              <br />Companion Today
            </h1>
            <p style={{ fontSize: 18, color: 'var(--text2)', marginBottom: 36, lineHeight: 1.7 }}>
              Thousands of loving pets are waiting for a forever home. Open your heart and make a difference in a life — and yours.
            </p>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/pets" className="btn-primary" style={{
                padding: '14px 36px', borderRadius: 50, fontSize: 16, fontWeight: 700,
                background: 'var(--primary)', color: '#fff', textDecoration: 'none',
                boxShadow: '0 8px 28px rgba(232,97,42,.32)',
              }}>🐾 Adopt Now</Link>
              <Link to="/dashboard/add-pet" style={{
                padding: '14px 32px', borderRadius: 50, fontSize: 16, fontWeight: 700,
                background: 'transparent', color: 'var(--primary)',
                border: '2px solid var(--primary)', textDecoration: 'none',
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--primary-light)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
              >List a Pet</Link>
            </div>
          </div>

          {/* Stats */}
          <div className={heroVisible ? 'animate-fadeInUp delay-3' : ''} style={{
            display: 'flex', gap: 48, justifyContent: 'center', marginTop: 56,
            flexWrap: 'wrap', opacity: heroVisible ? undefined : 0,
          }}>
            {[
              { value: '1200', suffix: '+', label: 'Happy Adoptions' },
              { value: '350',  suffix: '+', label: 'Pets Available'  },
              { value: '80',   suffix: '+', label: 'Trusted Shelters'},
            ].map(({ value, suffix, label }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 40, fontWeight: 900, color: 'var(--primary)', lineHeight: 1 }}>
                  <AnimatedNumber target={value} suffix={suffix} />
                </div>
                <div style={{ fontSize: 13, color: 'var(--text3)', marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PETS ── */}
      <section ref={petsRef} style={{ padding: '72px 24px', maxWidth: 1200, margin: '0 auto' }}>
        <div
          className={petsVisible ? 'animate-fadeInUp' : ''}
          style={{ textAlign: 'center', marginBottom: 48, opacity: petsVisible ? undefined : 0 }}
        >
          <h2 style={{ fontSize: 'clamp(28px,4vw,40px)', marginBottom: 12 }}>Featured Pets</h2>
          <p style={{ color: 'var(--text2)' }}>Meet some of our adorable pets waiting for their forever homes</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 24 }}>
          {pets.map((pet, i) => <PetCard key={pet._id} pet={pet} index={i} />)}
        </div>
        <div className={petsVisible ? 'animate-fadeInUp delay-5' : ''} style={{ textAlign: 'center', marginTop: 36, opacity: petsVisible ? undefined : 0 }}>
          <Link to="/pets" style={{
            padding: '12px 32px', borderRadius: 50, fontSize: 14, fontWeight: 600,
            border: '2px solid var(--primary)', color: 'var(--primary)', textDecoration: 'none',
            display: 'inline-block', transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--primary)'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--primary)'; }}
          >View All Pets →</Link>
        </div>
      </section>

      {/* ── WHY ADOPT ── */}
      <section ref={whyRef} style={{ background: 'var(--surface2)', padding: '72px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div
            className={whyVisible ? 'animate-fadeInUp' : ''}
            style={{ textAlign: 'center', marginBottom: 48, opacity: whyVisible ? undefined : 0 }}
          >
            <h2 style={{ fontSize: 'clamp(28px,4vw,40px)', marginBottom: 12 }}>Why Adopt a Pet?</h2>
            <p style={{ color: 'var(--text2)' }}>Adopting is one of the most rewarding decisions you will ever make</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 20 }}>
            {[
              { icon: '💖', title: 'Save a Life',         text: 'Every adoption gives a pet a second chance at a happy, healthy life.',          delay: 'delay-1' },
              { icon: '🏠', title: 'Gain a Friend',       text: 'Pets offer unconditional love and fill your home with joy every day.',           delay: 'delay-2' },
              { icon: '💰', title: 'Affordable',          text: 'Adoption fees are much lower than breeder prices — pets often come vaccinated.', delay: 'delay-3' },
              { icon: '🌱', title: 'Fight Overpopulation',text: 'Adopting reduces demand from breeders and helps control stray populations.',     delay: 'delay-4' },
            ].map(({ icon, title, text, delay }) => (
              <div
                key={title}
                className={whyVisible ? `animate-fadeInUp ${delay}` : ''}
                style={{
                  background: 'var(--surface)', borderRadius: 16, padding: '32px 24px',
                  border: '1px solid var(--border)', textAlign: 'center',
                  transition: 'transform 0.25s, box-shadow 0.25s',
                  opacity: whyVisible ? undefined : 0,
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{ fontSize: 44, marginBottom: 16 }}>{icon}</div>
                <h3 style={{ fontSize: 18, marginBottom: 8 }}>{title}</h3>
                <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.7 }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SUCCESS STORIES ── */}
      <section ref={storiesRef} style={{ padding: '72px 24px', maxWidth: 1200, margin: '0 auto' }}>
        <div
          className={storiesVisible ? 'animate-fadeInUp' : ''}
          style={{ textAlign: 'center', marginBottom: 48, opacity: storiesVisible ? undefined : 0 }}
        >
          <h2 style={{ fontSize: 'clamp(28px,4vw,40px)', marginBottom: 12 }}>Success Stories</h2>
          <p style={{ color: 'var(--text2)' }}>Real families, real love — hear from our happy adopters</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 24 }}>
          {[
            { quote: "Adopting Luna changed our entire family. She's so gentle with our kids. Best decision we ever made!", name: 'Rahim & Fatema', pet: 'Adopted: Mochi the Cat 🐱', avatar: '👨‍👩‍👧', delay: 'delay-1' },
            { quote: "We were nervous first-time pet owners. The PawsHome team guided us perfectly. Buddy is our baby now.", name: 'Karim Ahmed',    pet: 'Adopted: Bruno the Dog 🐕', avatar: '👨‍💼',     delay: 'delay-2' },
            { quote: "I never thought a rabbit could be such a loving companion. Coco follows me everywhere!",             name: 'Nadia Islam',    pet: 'Adopted: Fluffy the Rabbit 🐰', avatar: '👩‍🦱', delay: 'delay-3' },
          ].map(s => (
            <div
              key={s.name}
              className={storiesVisible ? `animate-fadeInUp ${s.delay}` : ''}
              style={{
                background: 'var(--surface)', borderRadius: 16, padding: 28,
                border: '1px solid var(--border)',
                borderTop: '3px solid var(--primary)',
                transition: 'transform 0.25s, box-shadow 0.25s',
                opacity: storiesVisible ? undefined : 0,
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div style={{ fontSize: 28, color: 'var(--primary)', marginBottom: 12, opacity: 0.5 }}>"</div>
              <p style={{ fontSize: 15, lineHeight: 1.8, color: 'var(--text2)', marginBottom: 20, fontStyle: 'italic' }}>
                {s.quote}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 32 }}>{s.avatar}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{s.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text3)' }}>{s.pet}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{
        background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
        padding: '72px 24px', textAlign: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,.06)' }} />
        <div style={{ position: 'absolute', bottom: -60, left: -20, width: 260, height: 260, borderRadius: '50%', background: 'rgba(255,255,255,.04)' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ color: '#fff', marginBottom: 12, fontSize: 'clamp(24px,4vw,36px)' }}>New to Pet Ownership?</h2>
          <p style={{ color: 'rgba(255,255,255,.8)', marginBottom: 32, fontSize: 16 }}>
            We have expert tips to help you prepare for your new family member.
          </p>
          <Link to="/pet-care" style={{
            padding: '14px 36px', borderRadius: 50, fontSize: 16, fontWeight: 700,
            background: '#fff', color: 'var(--primary)', textDecoration: 'none',
            display: 'inline-block', boxShadow: '0 8px 28px rgba(0,0,0,.2)',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 36px rgba(0,0,0,.28)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,.2)'; }}
          >Explore Pet Care Tips 🐾</Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;