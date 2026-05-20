import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const PetCard = ({ pet }) => {
  const { user } = useAuth();

  const handleViewClick = (e) => {
    if (!user) {
      e.preventDefault();
      toast.error('Please login to view pet details');
    }
  };

  return (
    <div style={{
      background: 'var(--surface)', borderRadius: 'var(--radius)',
      border: '1px solid var(--border)', overflow: 'hidden',
      transition: '.3s', boxShadow: 'var(--shadow)',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,.12)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'var(--shadow)'; }}
    >
      <div style={{
        width: '100%', height: 220,
        background: 'var(--surface2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 80, overflow: 'hidden',
      }}>
        {pet.imageURL
          ? <img src={pet.imageURL} alt={pet.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : <span>{pet.species === 'Dog' ? '🐕' : pet.species === 'Cat' ? '🐈' : pet.species === 'Bird' ? '🦜' : '🐰'}</span>
        }
      </div>
      <div style={{ padding: 20 }}>
        <h3 style={{ fontSize: 20, marginBottom: 4 }}>{pet.name}</h3>
        <p style={{ fontSize: 13, color: 'var(--text3)', marginBottom: 12 }}>{pet.breed} · {pet.age}</p>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
          <span style={{ padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 500, background: 'var(--primary-light)', color: 'var(--primary)' }}>{pet.species}</span>
          <span style={{ padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 500, background: '#E6F4FF', color: '#1565C0' }}>{pet.gender}</span>
          <span style={{ padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 500, background: pet.status === 'available' ? 'var(--accent-light)' : '#F3E8FF', color: pet.status === 'available' ? 'var(--accent)' : '#7C3AED' }}>
            {pet.status === 'available' ? 'Available' : 'Adopted'}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: 'var(--primary)', fontWeight: 700 }}>
            ৳{pet.adoptionFee?.toLocaleString()}
          </span>
          <Link
            to={user ? `/pets/${pet._id}` : '/login'}
            onClick={handleViewClick}
            style={{
              padding: '7px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600,
              background: 'var(--primary)', color: '#fff', textDecoration: 'none',
            }}
          >View Details</Link>
        </div>
      </div>
    </div>
  );
};

export default PetCard;
