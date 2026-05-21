import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import PetCard from '../components/pets/PetCard';
import { getAllPets } from '../api/pets.api';

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

const HomePage = () => {
  const [pets, setPets] = useState([]);
  const [heroRef, heroVisible] = useReveal(0.1);
  const [petsRef, petsVisible] = useReveal(0.1);
  const [whyRef, whyVisible] = useReveal(0.1);
  const [storiesRef, storiesVisible] = useReveal(0.1);
  const [careRef, careVisible] = useReveal(0.1);

  useEffect(() => {
    getAllPets().then(res => setPets((res.data.pets || []).slice(0, 4))).catch(() => {});
  }, []);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#f5f3f0', color: '#1a1008' }}>

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        style={{
          position: 'relative',
          minHeight: '88vh',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          background: '#f0ece6',
        }}
      >
        {/* Background image */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1600&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center right',
          opacity: 0.55,
        }} />
        {/* Gradient overlay left */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'linear-gradient(to right, #f0ece6 45%, transparent 80%)',
        }} />

        <div style={{
          position: 'relative', zIndex: 2,
          maxWidth: 1200, margin: '0 auto', padding: '0 48px',
          width: '100%',
        }}>
          {/* Badge */}
          <div
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(180,60,30,0.1)',
              border: '1px solid rgba(180,60,30,0.2)',
              borderRadius: 50, padding: '6px 16px', marginBottom: 28,
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'none' : 'translateY(20px)',
              transition: 'all 0.6s ease',
            }}
          >
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#b43c1e', display: 'inline-block' }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: '#b43c1e', letterSpacing: '.04em' }}>
              Trusted by 10k+ families
            </span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: 'clamp(48px,6vw,80px)',
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700, lineHeight: 1.1,
            marginBottom: 24, maxWidth: 640,
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? 'none' : 'translateY(30px)',
            transition: 'all 0.7s ease 0.1s',
          }}>
            Find Your New <span style={{ color: '#b43c1e', fontStyle: 'italic' }}>Best<br />Friend</span>
          </h1>

          <p style={{
            fontSize: 17, color: '#5a4a3a', lineHeight: 1.7,
            maxWidth: 480, marginBottom: 40,
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? 'none' : 'translateY(20px)',
            transition: 'all 0.7s ease 0.2s',
          }}>
            Connecting loving homes with pets in need. Start your journey to pet parenthood today with our curated adoption experience.
          </p>

          <div style={{
            display: 'flex', gap: 14, flexWrap: 'wrap',
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? 'none' : 'translateY(20px)',
            transition: 'all 0.7s ease 0.3s',
          }}>
            <Link to="/pets" style={{
              padding: '16px 32px', borderRadius: 50,
              background: '#b43c1e', color: '#fff',
              fontSize: 15, fontWeight: 700,
              textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8,
              boxShadow: '0 8px 28px rgba(180,60,30,0.35)',
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#8f2e14'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#b43c1e'; e.currentTarget.style.transform = 'none'; }}
            >Adopt Now →</Link>
            <Link to="/pets" style={{
              padding: '16px 32px', borderRadius: 50,
              background: 'rgba(255,255,255,0.85)', color: '#1a1008',
              fontSize: 15, fontWeight: 600,
              textDecoration: 'none', border: '1.5px solid rgba(0,0,0,0.12)',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.85)'; }}
            >View All Pets</Link>
          </div>
        </div>
      </section>

      {/* ── MEET OUR RESIDENTS ── */}
      <section ref={petsRef} style={{ padding: '88px 48px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 12 }}>
          <div style={{
            opacity: petsVisible ? 1 : 0,
            transform: petsVisible ? 'none' : 'translateY(20px)',
            transition: 'all 0.6s ease',
          }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,4vw,40px)', marginBottom: 8 }}>
              Meet Our Residents
            </h2>
            <p style={{ color: '#7a6858', fontSize: 15 }}>Discover the lovable companions waiting for their forever homes.</p>
          </div>
          <Link to="/pets" style={{
            fontSize: 14, fontWeight: 600, color: '#b43c1e',
            textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4,
            opacity: petsVisible ? 1 : 0, transition: 'opacity 0.6s ease 0.2s',
          }}>See all pets →</Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 24 }}>
          {pets.length > 0
            ? pets.map((pet, i) => <PetCard key={pet._id} pet={pet} index={i} />)
            : [
                { name: 'Cooper', breed: 'Pembroke Welsh Corgi', age: '2 Years', tags: ['Playful', 'Vaccinated'], badge: 'New Arrival', badgeColor: '#1a7a4a', img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80' },
                { name: 'Luna', breed: 'Domestic Shorthair', age: '1 Year', tags: ['Calm', 'Cuddly'], badge: 'Staff Favorite', badgeColor: '#b43c1e', img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&q=80' },
                { name: 'Max', breed: 'French Bulldog', age: '3 Years', tags: ['Friendly', 'Social'], img: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&q=80' },
                { name: 'Bear', breed: 'German Shepherd', age: '4 Years', tags: ['Protective', 'Trained'], img: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=400&q=80' },
              ].map((pet, i) => (
                <div key={pet.name} style={{
                  background: '#fff', borderRadius: 20, overflow: 'hidden',
                  border: '1px solid #e8ddd4',
                  boxShadow: '0 4px 20px rgba(0,0,0,.06)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  opacity: petsVisible ? 1 : 0,
                  transform: petsVisible ? 'none' : 'translateY(30px)',
                  transitionDelay: `${i * 0.08}s`,
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,.13)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,.06)'; }}
                >
                  <div style={{ position: 'relative', height: 240, overflow: 'hidden' }}>
                    <img src={pet.img} alt={pet.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }} />
                    {pet.badge && (
                      <span style={{
                        position: 'absolute', top: 14, left: 14,
                        background: pet.badgeColor, color: '#fff',
                        padding: '4px 12px', borderRadius: 50, fontSize: 12, fontWeight: 700,
                      }}>{pet.badge}</span>
                    )}
                  </div>
                  <div style={{ padding: '20px 20px 24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22 }}>{pet.name}</h3>
                      <span style={{ fontSize: 13, color: '#7a6858' }}>{pet.age}</span>
                    </div>
                    <p style={{ fontSize: 13, color: '#a89078', marginBottom: 14 }}>{pet.breed}</p>
                    <div style={{ display: 'flex', gap: 6, marginBottom: 18 }}>
                      {pet.tags.map(t => (
                        <span key={t} style={{ padding: '4px 12px', borderRadius: 50, fontSize: 12, background: '#f5f0eb', color: '#5a4a3a', border: '1px solid #e8ddd4' }}>{t}</span>
                      ))}
                    </div>
                    <Link to="/pets" style={{
                      display: 'block', textAlign: 'center',
                      padding: '11px', borderRadius: 50,
                      border: '1.5px solid #d8c8bc', color: '#5a4a3a',
                      fontSize: 13, fontWeight: 600, textDecoration: 'none',
                      transition: 'all 0.2s',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = '#b43c1e'; e.currentTarget.style.color = '#b43c1e'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = '#d8c8bc'; e.currentTarget.style.color = '#5a4a3a'; }}
                    >View Profile</Link>
                  </div>
                </div>
              ))
          }
        </div>
      </section>

      {/* ── WHY ADOPT FROM PAWSHOME ── */}
      <section ref={whyRef} style={{ background: '#fff', padding: '88px 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 64, alignItems: 'center' }}>
          {/* Left: Image with stats badge */}
          <div style={{
            position: 'relative',
            opacity: whyVisible ? 1 : 0,
            transform: whyVisible ? 'none' : 'translateX(-30px)',
            transition: 'all 0.7s ease',
          }}>
            <div style={{ borderRadius: 24, overflow: 'hidden', height: 420 }}>
              <img
                src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=700&q=80"
                alt="Happy pet adoption"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            {/* Stats badge */}
            <div style={{
              position: 'absolute', bottom: -20, right: -20,
              background: '#fff', borderRadius: 16, padding: '20px 24px',
              boxShadow: '0 12px 40px rgba(0,0,0,.14)',
              minWidth: 180,
            }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 900, color: '#b43c1e' }}>5,000+</div>
              <div style={{ fontSize: 13, color: '#7a6858', lineHeight: 1.4, marginTop: 4 }}>Happy pets adopted<br />this year alone.</div>
            </div>
          </div>

          {/* Right: Content */}
          <div style={{
            opacity: whyVisible ? 1 : 0,
            transform: whyVisible ? 'none' : 'translateX(30px)',
            transition: 'all 0.7s ease 0.15s',
          }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,4vw,44px)', marginBottom: 8, lineHeight: 1.15 }}>
              Why Adopt from
            </h2>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,4vw,44px)', color: '#b43c1e', marginBottom: 36, lineHeight: 1.15 }}>
              PawsHome?
            </h2>

            {[
              { icon: '🤝', title: 'Community Impact', text: "By adopting, you're giving a second chance to a deserving animal and freeing up space in shelters." },
              { icon: '🛡️', title: 'Professional Screening', text: 'Our matching process ensures that every pet goes to a home that fits their unique personality.' },
              { icon: '💊', title: 'Health Guarantee', text: 'All PawsHome residents are fully vaccinated, microchipped, and come with full medical history.' },
            ].map((item, i) => (
              <div key={item.title} style={{ display: 'flex', gap: 18, marginBottom: 28 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 14, flexShrink: 0,
                  background: 'rgba(180,60,30,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
                }}>
                  {item.icon}
                </div>
                <div>
                  <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{item.title}</h4>
                  <p style={{ fontSize: 14, color: '#7a6858', lineHeight: 1.6 }}>{item.text}</p>
                </div>
              </div>
            ))}

            <Link to="/pets" style={{
              display: 'inline-block', marginTop: 8,
              padding: '14px 32px', borderRadius: 50,
              background: '#b43c1e', color: '#fff',
              fontSize: 14, fontWeight: 700, textDecoration: 'none',
              boxShadow: '0 6px 20px rgba(180,60,30,0.3)',
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#8f2e14'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#b43c1e'; e.currentTarget.style.transform = 'none'; }}
            >Our Mission</Link>
          </div>
        </div>
      </section>

      {/* ── SUCCESS STORIES ── */}
      <section ref={storiesRef} style={{ padding: '88px 48px', background: '#f5f3f0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(28px,4vw,44px)',
            textAlign: 'center', marginBottom: 48,
            opacity: storiesVisible ? 1 : 0,
            transform: storiesVisible ? 'none' : 'translateY(20px)',
            transition: 'all 0.6s ease',
          }}>Success Stories</h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 20 }}>
            {/* Big card */}
            <div style={{
              position: 'relative', borderRadius: 24, overflow: 'hidden', height: 480,
              opacity: storiesVisible ? 1 : 0,
              transform: storiesVisible ? 'none' : 'translateY(30px)',
              transition: 'all 0.7s ease 0.1s',
            }}>
              <img src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=800&q=80" alt="The Miller Family"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 50%, transparent)' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 32 }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.7)', letterSpacing: '.1em', marginBottom: 10, textTransform: 'uppercase' }}>The Miller Family</p>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: '#fff', lineHeight: 1.5 }}>
                  "Buddy found his tribe, and we found our missing piece. The process was seamless and truly heartwarming."
                </p>
              </div>
            </div>

            {/* Right column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Small dark card */}
              <div style={{
                borderRadius: 24, overflow: 'hidden', flex: 1, position: 'relative',
                opacity: storiesVisible ? 1 : 0,
                transform: storiesVisible ? 'none' : 'translateY(30px)',
                transition: 'all 0.7s ease 0.2s',
              }}>
                <img src="https://images.unsplash.com/photo-1548247416-ec66f4900b2e?w=600&q=80" alt="Arthur"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(20,15,10,0.55)' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 24 }}>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', marginBottom: 6 }}>Arthur & Ginger</p>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, color: '#fff', fontStyle: 'italic' }}>"Pure companionship at its finest."</p>
                </div>
              </div>

              {/* Terracotta quote card */}
              <div style={{
                borderRadius: 24, background: '#b43c1e', padding: 28, flex: 1,
                opacity: storiesVisible ? 1 : 0,
                transform: storiesVisible ? 'none' : 'translateY(30px)',
                transition: 'all 0.7s ease 0.3s',
              }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 48, color: 'rgba(255,255,255,0.25)', lineHeight: 1, marginBottom: 12 }}>"</div>
                <p style={{ fontSize: 15, color: '#fff', lineHeight: 1.7, marginBottom: 20 }}>
                  "The team at PawsHome truly cares about where their animals go. We felt supported every single step of the way."
                </p>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>Sarah & Duke</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PET CARE GUIDE ── */}
      <section ref={careRef} style={{ background: '#fff', padding: '88px 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 48, flexWrap: 'wrap', gap: 16,
            opacity: careVisible ? 1 : 0, transform: careVisible ? 'none' : 'translateY(20px)', transition: 'all 0.6s ease',
          }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,4vw,40px)' }}>Pet Care Guide</h2>
            <Link to="/pet-care" style={{
              padding: '12px 24px', borderRadius: 50,
              background: '#1a1008', color: '#fff',
              fontSize: 13, fontWeight: 600, textDecoration: 'none',
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = '#b43c1e'}
              onMouseLeave={e => e.currentTarget.style.background = '#1a1008'}
            >Browse All Guides</Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 20 }}>
            {[
              { icon: '🍽️', title: 'Nutrition 101', text: 'Learn the best diets for different breeds and life stages to keep your pet healthy and energetic.', delay: '0s' },
              { icon: '🎾', title: 'Activity & Play', text: 'Keep your furry friend mentally stimulated and physically fit with our creative play ideas.', delay: '0.1s' },
              { icon: '🏥', title: 'Wellness Visits', text: 'A guide to essential vaccinations, check-ups, and preventative care for your new companion.', delay: '0.2s' },
            ].map(card => (
              <div key={card.title} style={{
                background: '#f8f5f1', borderRadius: 20, padding: 28,
                border: '1px solid #ece5dc',
                transition: 'all 0.25s',
                opacity: careVisible ? 1 : 0,
                transform: careVisible ? 'none' : 'translateY(30px)',
                transitionDelay: card.delay,
              }}
                onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,.1)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#f8f5f1'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; }}
              >
                <div style={{
                  width: 52, height: 52, borderRadius: 16, background: 'rgba(180,60,30,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, marginBottom: 20,
                }}>{card.icon}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, marginBottom: 10 }}>{card.title}</h3>
                <p style={{ fontSize: 14, color: '#7a6858', lineHeight: 1.7, marginBottom: 20 }}>{card.text}</p>
                <Link to="/pet-care" style={{
                  display: 'flex', alignItems: 'center', gap: 4,
                  fontSize: 13, fontWeight: 700, color: '#b43c1e', textDecoration: 'none',
                }}>Read more →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{
        background: '#1a1008',
        padding: '80px 48px', textAlign: 'center',
      }}>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(28px,4vw,48px)',
          color: '#f5f0ea', marginBottom: 16,
        }}>Ready to change a life?</h2>
        <p style={{ color: '#a89078', fontSize: 16, marginBottom: 36, maxWidth: 520, margin: '0 auto 36px' }}>
          Your perfect companion is just a few clicks away. Join our community of pet parents and discover the joy of adoption.
        </p>
        <Link to="/pets" style={{
          display: 'inline-block',
          padding: '16px 40px', borderRadius: 50,
          background: '#f0c040', color: '#1a1008',
          fontSize: 16, fontWeight: 800, textDecoration: 'none',
          boxShadow: '0 8px 28px rgba(240,192,64,0.3)',
          transition: 'all 0.2s',
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 36px rgba(240,192,64,0.4)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(240,192,64,0.3)'; }}
        >Adopt Now</Link>
      </section>

    </div>
  );
};

export default HomePage;