import { useEffect, useState } from 'react';
import PetCard from '../components/pets/PetCard';
import { getAllPets } from '../api/pets.api';
import LoadingSpinner from '../components/shared/LoadingSpinner';

const AllPetsPage = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [species, setSpecies] = useState('All');
  const [sort, setSort] = useState('');

  const fetchPets = () => {
    setLoading(true);
    const params = {};
    if (search) params.search = search;
    if (species !== 'All') params.species = species;
    if (sort) params.sort = sort;
    getAllPets(params)
      .then(res => setPets(res.data.pets))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchPets(); }, [species, sort]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchPets();
  };

  const SPECIES = ['All', 'Dog', 'Cat', 'Bird', 'Rabbit', 'Other'];

  return (
    <div style={{ padding: '48px 24px', maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <h2 style={{ fontSize: 'clamp(28px,4vw,40px)', marginBottom: 12 }}>All Available Pets</h2>
        <p style={{ color: 'var(--text2)' }}>Find your perfect companion from our wide selection of loving pets</p>
      </div>

      {/* Search & Sort */}
      <form onSubmit={handleSearch} style={{
        background: 'var(--surface)', borderRadius: 14, border: '1px solid var(--border)',
        padding: '20px 24px', marginBottom: 24, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center'
      }}>
        <input
          placeholder="🔍 Search by name or breed..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ flex: 1, minWidth: 200 }}
        />
        <select value={sort} onChange={e => setSort(e.target.value)} style={{ maxWidth: 200 }}>
          <option value="">Sort by...</option>
          <option value="fee-asc">Fee: Low to High</option>
          <option value="fee-desc">Fee: High to Low</option>
          <option value="name">Name A-Z</option>
        </select>
        <button type="submit" style={{
          padding: '10px 22px', borderRadius: 10, fontWeight: 600, fontSize: 14,
          background: 'var(--primary)', color: '#fff', border: 'none', cursor: 'pointer'
        }}>Search</button>
      </form>

      {/* Species Filter */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 24 }}>
        {SPECIES.map(s => (
          <button key={s} onClick={() => setSpecies(s)} style={{
            padding: '7px 16px', borderRadius: 20,
            border: `1.5px solid ${species === s ? 'var(--primary)' : 'var(--border)'}`,
            background: species === s ? 'var(--primary-light)' : 'var(--surface)',
            color: species === s ? 'var(--primary)' : 'var(--text2)',
            fontSize: 13, fontWeight: 500, cursor: 'pointer', transition: '.2s',
          }}>{s}</button>
        ))}
      </div>

      {loading ? <LoadingSpinner /> : pets.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '64px 24px', color: 'var(--text3)' }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>🐾</div>
          <h3 style={{ fontSize: 20, color: 'var(--text2)' }}>No pets found</h3>
          <p>Try adjusting your search or filters</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 24 }}>
          {pets.map(pet => <PetCard key={pet._id} pet={pet} />)}
        </div>
      )}
    </div>
  );
};

export default AllPetsPage;
