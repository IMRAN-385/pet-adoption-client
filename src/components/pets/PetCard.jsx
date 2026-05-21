import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const SPECIES_EMOJI = { Dog: '🐕', Cat: '🐈', Bird: '🦜', Rabbit: '🐰' };

const PetCard = ({ pet, index = 0 }) => {
  const { user } = useAuth();

  const handleViewClick = (e) => {
    if (!user) {
      e.preventDefault();
      toast.error('Please login to view pet details');
    }
  };

  const delayClass = ['delay-1','delay-2','delay-3','delay-4','delay-5','delay-6'][index % 6];

  return (
    <div
      className={`pet-card animate-fadeInUp ${delayClass}`}
      style={{
        background: 'var(--surface)',
        borderRadius: 'var(--radius)',
        border: '1px solid var(--border)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow)',
      }}
    >
      {/* Image */}
      <div
        className="pet-card-img"
        style={{
          width: '100%', height: 220,
          background: 'var(--surface2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 80, position: 'relative',
        }}
      >
        {pet.imageURL
          ? <img src={pet.imageURL} alt={pet.name} />
          : <span>{SPECIES_EMOJI[pet.species] || '🐾'}</span>
        }
        {/* Status badge on image */}
        <span style={{
          position: 'absolute', top: 12, right: 12,
          padding: '4px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700,
          background: pet.status === 'available' ? 'var(--accent)' : '#7C3AED',
          color: '#fff',
          boxShadow: '0 2px 8px rgba(0,0,0,.2)',
          textTransform: 'uppercase', letterSpacing: '.5px',
        }}>
          {pet.status === 'available' ? '✓ Available' : 'Adopted'}
        </span>
      </div>

      {/* Content */}
      <div style={{ padding: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
          <h3 style={{ fontSize: 20 }}>{pet.name}</h3>
          <span style={{ fontSize: 13, color: 'var(--text3)' }}>📍 {pet.location}</span>
        </div>
        <p style={{ fontSize: 13, color: 'var(--text3)', marginBottom: 12 }}>
          {pet.breed} · {pet.age} · {pet.gender}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
          <span style={{ padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 500, background: 'var(--primary-light)', color: 'var(--primary)' }}>
            {pet.species}
          </span>
          <span style={{ padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 500, background: '#E6F4FF', color: '#1565C0' }}>
            {pet.healthStatus || 'Good'}
          </span>
        </div>

        {/* Footer row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 19, color: 'var(--primary)', fontWeight: 700 }}>
            ৳{pet.adoptionFee?.toLocaleString()}
          </span>
          <Link
            to={user ? `/pets/${pet._id}` : '/login'}
            onClick={handleViewClick}
            className="btn-primary"
            style={{
              padding: '8px 18px', borderRadius: 10, fontSize: 13, fontWeight: 600,
              background: 'var(--primary)', color: '#fff', textDecoration: 'none',
              display: 'inline-block',
            }}
          >View Details →</Link>
        </div>
      </div>
    </div>
  );
};

export default PetCard;