import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PetCard from '../components/pets/PetCard';
import { getAllPets } from '../api/pets.api';

const HomePage = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    getAllPets().then(res => setPets(res.data.pets.slice(0, 6))).catch(() => {});
  }, []);

  return (
    <div>
      {/* HERO */}
      <section style={{
        background: 'linear-gradient(135deg,#FFF3E6 0%,#FDEADF 50%,#FCE4D3 100%)',
        padding: '80px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ maxWidth: 700, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontSize: 'clamp(36px,6vw,64px)', lineHeight: 1.1, marginBottom: 20 }}>
            Find Your <span style={{ color: 'var(--primary)' }}>Perfect</span><br />Companion Today
          </h1>
          <p style={{ fontSize: 18, color: 'var(--text2)', marginBottom: 36, lineHeight: 1.7 }}>
            Thousands of loving pets are waiting for a forever home. Open your heart and make a difference in a life — and yours.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/pets" style={{
              padding: '13px 32px', borderRadius: 12, fontSize: 16, fontWeight: 600,
              background: 'var(--primary)', color: '#fff', textDecoration: 'none'
            }}>🐾 Adopt Now</Link>
            <Link to="/dashboard/add-pet" style={{
              padding: '13px 32px', borderRadius: 12, fontSize: 16, fontWeight: 600,
              background: 'transparent', color: 'var(--primary)',
              border: '2px solid var(--primary)', textDecoration: 'none'
            }}>Add a Pet Listing</Link>
          </div>
          <div style={{ display: 'flex', gap: 40, justifyContent: 'center', marginTop: 48, flexWrap: 'wrap' }}>
            {[['1,200+', 'Happy Adoptions'], ['350+', 'Pets Available'], ['80+', 'Trusted Shelters']].map(([n, l]) => (
              <div key={l} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 36, fontWeight: 900, color: 'var(--primary)' }}>{n}</div>
                <div style={{ fontSize: 13, color: 'var(--text3)', marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PETS */}
      <section style={{ padding: '64px 24px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontSize: 'clamp(28px,4vw,40px)', marginBottom: 12 }}>Featured Pets</h2>
          <p style={{ color: 'var(--text2)' }}>Meet some of our adorable pets waiting for their forever homes</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 24 }}>
          {pets.map(pet => <PetCard key={pet._id} pet={pet} />)}
        </div>
        <div style={{ textAlign: 'center', marginTop: 36 }}>
          <Link to="/pets" style={{
            padding: '11px 28px', borderRadius: 10, fontSize: 14, fontWeight: 600,
            border: '2px solid var(--primary)', color: 'var(--primary)', textDecoration: 'none'
          }}>View All Pets →</Link>
        </div>
      </section>

      {/* WHY ADOPT */}
      <section style={{ background: 'var(--surface2)', padding: '64px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 'clamp(28px,4vw,40px)', marginBottom: 12 }}>Why Adopt a Pet?</h2>
            <p style={{ color: 'var(--text2)' }}>Adopting is one of the most rewarding decisions you will ever make</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 24 }}>
            {[
              { icon: '💖', title: 'Save a Life', text: 'Every adoption gives a pet a second chance at a happy, healthy life.' },
              { icon: '🏠', title: 'Gain a Friend', text: 'Pets offer unconditional love and fill your home with joy every day.' },
              { icon: '💰', title: 'Affordable', text: 'Adoption fees are much lower than breeder prices, pets often come vaccinated.' },
              { icon: '🌱', title: 'Fight Overpopulation', text: 'Adopting reduces demand from breeders and helps control stray populations.' },
            ].map(({ icon, title, text }) => (
              <div key={title} style={{ background: 'var(--surface)', borderRadius: 16, padding: '28px 24px', border: '1px solid var(--border)', textAlign: 'center' }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>{icon}</div>
                <h3 style={{ fontSize: 18, marginBottom: 8 }}>{title}</h3>
                <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.7 }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUCCESS STORIES */}
      <section style={{ padding: '64px 24px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontSize: 'clamp(28px,4vw,40px)', marginBottom: 12 }}>Success Stories</h2>
          <p style={{ color: 'var(--text2)' }}>Real families, real love — hear from our happy adopters</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 24 }}>
          {[
            { quote: "Adopting Luna changed our entire family. She's so gentle with our kids. Best decision we ever made!", name: 'Rahim & Fatema', pet: 'Adopted: Mochi the Cat 🐱', avatar: '👨‍👩‍👧' },
            { quote: "We were nervous first-time pet owners. The PawsHome team guided us perfectly. Buddy is our baby now.", name: 'Karim Ahmed', pet: 'Adopted: Bruno the Dog 🐕', avatar: '👨‍💼' },
            { quote: "I never thought a rabbit could be such a loving companion. Coco follows me everywhere!", name: 'Nadia Islam', pet: 'Adopted: Fluffy the Rabbit 🐰', avatar: '👩‍🦱' },
          ].map(s => (
            <div key={s.name} style={{ background: 'var(--surface)', borderRadius: 16, padding: 28, border: '1px solid var(--border)' }}>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text2)', marginBottom: 16, fontStyle: 'italic' }}>"{s.quote}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 30 }}>{s.avatar}</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{s.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text3)' }}>{s.pet}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--primary-light)', padding: '64px 24px', textAlign: 'center' }}>
        <h2 style={{ marginBottom: 12 }}>New to Pet Ownership?</h2>
        <p style={{ color: 'var(--text2)', marginBottom: 28 }}>We have expert tips to help you prepare for your new family member.</p>
        <Link to="/pet-care" style={{
          padding: '13px 32px', borderRadius: 12, fontSize: 16, fontWeight: 600,
          background: 'var(--primary)', color: '#fff', textDecoration: 'none'
        }}>Explore Pet Care Tips 🐾</Link>
      </section>
    </div>
  );
};

export default HomePage;
