import { useNavigate } from 'react-router-dom';

const SPECIES_ICON = {
  Dog: (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2 .336-3.5 2-3.5 4 0 .085.002.17.005.253C3.162 8.639 4 10.695 4 13c0 3.314 2.686 6 6 6h4c3.314 0 6-2.686 6-6 0-2.305.838-4.361.995-5.747A4.5 4.5 0 0 0 17.5 3c-1.923-.321-3.5.782-3.5 2.172V8H10V5.172z"/>
      <path d="M9 13h.01M15 13h.01"/>
    </svg>
  ),
  Cat: (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5c-1 0-2 .5-2.5 1.5L8 4l-2 3c-.5 1-.5 2 0 3 .3.6.7 1.1 1.2 1.5C7.5 12.6 8 14 8 15c0 2.2 1.8 4 4 4s4-1.8 4-4c0-1-.5-2.4-.8-3.5.5-.4.9-.9 1.2-1.5.5-1 .5-2 0-3L14.5 4 13 6.5C12.5 5.5 12 5 12 5z"/>
      <path d="M9.5 13h.01M14.5 13h.01"/>
      <path d="M9 17c1 .5 2 .5 3 0"/>
    </svg>
  ),
  Bird: (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 7h.01"/>
      <path d="M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20"/>
      <path d="m20 7 2 .5-2 .5"/>
      <path d="M10 18v3"/>
      <path d="M14 17.75V21"/>
      <path d="M7 18a6 6 0 0 0 3.84-10.61"/>
    </svg>
  ),
  Rabbit: (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 16a3 3 0 0 1 2.24 5H8.76A3 3 0 0 1 11 16h2z"/>
      <path d="M6.03 11.3A5 5 0 0 1 8 5.1V3a1 1 0 0 1 2 0v1.22a5 5 0 0 1 4 0V3a1 1 0 0 1 2 0v2.1a5 5 0 0 1 1.97 6.2"/>
      <path d="M9 11h.01M15 11h.01"/>
    </svg>
  ),
  Other: (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20a1 1 0 0 0 2 0v-1a1 1 0 0 0-2 0v1z"/>
      <ellipse cx="7.5" cy="14.5" rx="2.5" ry="2.5"/>
      <ellipse cx="16.5" cy="14.5" rx="2.5" ry="2.5"/>
      <ellipse cx="5" cy="9" rx="2" ry="2"/>
      <ellipse cx="19" cy="9" rx="2" ry="2"/>
      <ellipse cx="12" cy="8" rx="2" ry="2"/>
    </svg>
  ),
};

const LocationIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const PetCard = ({ pet, index = 0 }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`pet-card animate-fadeInUp delay-${(index % 6) + 1}`}
      onClick={() => navigate(`/pets/${pet._id}`)}
      style={{
        background: 'var(--surface)',
        borderRadius: 12,
        border: '1px solid var(--border)',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'box-shadow 0.2s ease, transform 0.2s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
        e.currentTarget.style.transform = 'translateY(-3px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.transform = 'none';
      }}
    >
      {/* Image */}
      <div className="pet-card-img" style={{
        height: 200,
        background: 'var(--surface2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        color: 'var(--border)',
      }}>
        {pet.imageURL
          ? <img src={pet.imageURL} alt={pet.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          : <div style={{ opacity: 0.5, color: 'var(--text3)' }}>
              {SPECIES_ICON[pet.species] || SPECIES_ICON.Other}
            </div>
        }

        {/* Status */}
        <span style={{
          position: 'absolute', top: 12, left: 12,
          fontSize: 11, fontWeight: 600, letterSpacing: '0.04em',
          padding: '3px 9px', borderRadius: 6,
          background: pet.status === 'available' ? 'var(--accent-light)' : 'var(--primary-light)',
          color: pet.status === 'available' ? 'var(--accent)' : 'var(--primary)',
        }}>
          {pet.status === 'available' ? 'Available' : 'Adopted'}
        </span>

        {/* Fee */}
        <span style={{
          position: 'absolute', top: 12, right: 12,
          fontSize: 13, fontWeight: 700,
          padding: '3px 9px', borderRadius: 6,
          background: 'var(--surface)',
          color: 'var(--text)',
          border: '1px solid var(--border)',
        }}>
          ৳{pet.adoptionFee?.toLocaleString() || 0}
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: '16px 18px 18px' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 }}>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', fontFamily: "'Playfair Display', serif" }}>
            {pet.name}
          </h3>
          <span style={{ fontSize: 12, color: 'var(--text3)' }}>{pet.age}</span>
        </div>

        <p style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 14 }}>{pet.breed}</p>

        {/* Tags */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
          {[pet.species, pet.gender].filter(Boolean).map(tag => (
            <span key={tag} style={{
              fontSize: 11, padding: '3px 10px', borderRadius: 6,
              background: 'var(--surface2)', color: 'var(--text2)',
              border: '1px solid var(--border)',
            }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          paddingTop: 14, borderTop: '1px solid var(--border)',
        }}>
          <span style={{ fontSize: 12, color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 4 }}>
            <LocationIcon /> {pet.location}
          </span>
          <button
            onClick={e => { e.stopPropagation(); navigate(`/pets/${pet._id}`); }}
            style={{
              padding: '6px 14px', borderRadius: 8,
              fontSize: 12, fontWeight: 600,
              background: 'var(--text)', color: 'var(--bg)',
              border: 'none', cursor: 'pointer', transition: 'background 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--primary)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--text)'}
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetCard;