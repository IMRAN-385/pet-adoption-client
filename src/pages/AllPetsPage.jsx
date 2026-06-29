import { useEffect, useState } from 'react';
import PetCard from '../components/pets/PetCard';
import { getAllPets } from '../api/pets.api';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import { FaPaw, FaDog, FaCat, FaFeatherAlt, FaDove } from 'react-icons/fa';
import { FiSearch, FiX } from 'react-icons/fi';
import { BsSliders } from 'react-icons/bs';

const SPECIES = ['All', 'Dog', 'Cat', 'Bird', 'Rabbit', 'Other'];

const SPECIES_ICONS = {
  All:    <FaPaw size={13} />,
  Dog:    <FaDog size={13} />,
  Cat:    <FaCat size={13} />,
  Bird:   <FaFeatherAlt size={12} />,
  Rabbit: <FaDove size={13} />,
  Other:  <FaPaw size={13} />,
};

const AllPetsPage = () => {
  const [pets, setPets]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch]   = useState('');
  const [species, setSpecies] = useState('All');
  const [sort, setSort]       = useState('');

  const fetchPets = () => {
    setLoading(true);
    const params = {};
    if (search)            params.search  = search;
    if (species !== 'All') params.species = species;
    if (sort)              params.sort    = sort;
    getAllPets(params)
      .then(res => setPets(res.data.pets))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchPets(); }, [species, sort]);

  const handleSearch = (e) => { e.preventDefault(); fetchPets(); };
  const clearFilters = () => { setSearch(''); setSpecies('All'); };
  const hasFilters = search || species !== 'All';

  return (
    <div style={{
      padding: '80px 24px 80px',
      maxWidth: 1200, margin: '0 auto',
      fontFamily: "'DM Sans', sans-serif",
    }}>

      {/* Header */}
      <div style={{ marginBottom: 44 }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.1em', color: '#a78bfa', textTransform: 'uppercase', marginBottom: 10 }}>
          Browse
        </p>
        <h2 style={{
          fontSize: 'clamp(28px,4vw,44px)',
          fontFamily: "'Playfair Display', serif",
          fontWeight: 700, color: '#f0eeff',
          lineHeight: 1.1, marginBottom: 10,
        }}>
          All available pets
        </h2>
        <p style={{ color: 'rgba(240,238,255,0.45)', fontSize: 15, maxWidth: 480 }}>
          Find your perfect companion from our wide selection of loving pets waiting for a home.
        </p>
      </div>

      {/* Search + Sort */}
      <form
        onSubmit={handleSearch}
        style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center', marginBottom: 16 }}
      >
        {/* Search input */}
        <div style={{
          flex: 1, minWidth: 240,
          display: 'flex', alignItems: 'center', gap: 10,
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 10, padding: '0 14px',
          backdropFilter: 'blur(12px)',
          transition: 'border-color 0.2s',
        }}
          onFocusCapture={e => e.currentTarget.style.borderColor = 'rgba(124,92,252,0.5)'}
          onBlurCapture={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
        >
          <span style={{ color: 'rgba(167,139,250,0.5)', display: 'flex', flexShrink: 0 }}><FiSearch size={15} /></span>
          <input
            placeholder="Search by name or breed..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              flex: 1, border: 'none', background: 'transparent',
              padding: '12px 0', fontSize: 14, color: '#f0eeff',
              outline: 'none',
            }}
          />
          {search && (
            <button type="button" onClick={() => setSearch('')} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'rgba(240,238,255,0.3)', display: 'flex', padding: 2,
            }}>
              <FiX size={14} />
            </button>
          )}
        </div>

        {/* Sort */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 10, padding: '0 14px',
          backdropFilter: 'blur(12px)',
        }}>
          <span style={{ color: 'rgba(167,139,250,0.5)', display: 'flex' }}><BsSliders size={14} /></span>
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            style={{
              border: 'none', background: 'transparent',
              padding: '12px 0', fontSize: 14,
              color: '#f0eeff', outline: 'none',
              cursor: 'pointer', minWidth: 140,
            }}
          >
            <option value="" style={{ background: '#0e0c1a' }}>Sort by</option>
            <option value="fee-asc" style={{ background: '#0e0c1a' }}>Fee: Low to High</option>
            <option value="fee-desc" style={{ background: '#0e0c1a' }}>Fee: High to Low</option>
            <option value="name" style={{ background: '#0e0c1a' }}>Name A–Z</option>
          </select>
        </div>

        {/* Search button */}
        <button
          type="submit"
          style={{
            padding: '12px 24px', borderRadius: 10,
            fontWeight: 600, fontSize: 14,
            background: 'linear-gradient(135deg, #7c5cfc, #9b7dfd)',
            color: '#fff', border: 'none', cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(124,92,252,0.3)',
            transition: 'all 0.2s', whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(124,92,252,0.45)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(124,92,252,0.3)'; }}
        >
          Search
        </button>
      </form>

      {/* Species filter chips */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 32 }}>
        {SPECIES.map(s => {
          const active = species === s;
          return (
            <button
              key={s}
              onClick={() => setSpecies(s)}
              style={{
                padding: '7px 16px', borderRadius: 8,
                border: `1px solid ${active ? 'rgba(124,92,252,0.5)' : 'rgba(255,255,255,0.08)'}`,
                background: active ? 'rgba(124,92,252,0.15)' : 'rgba(255,255,255,0.04)',
                color: active ? '#a78bfa' : 'rgba(240,238,255,0.45)',
                fontSize: 13, fontWeight: active ? 700 : 500,
                cursor: 'pointer', transition: 'all 0.15s ease',
                display: 'flex', alignItems: 'center', gap: 6,
                backdropFilter: 'blur(8px)',
              }}
              onMouseEnter={e => { if (!active) { e.currentTarget.style.borderColor = 'rgba(124,92,252,0.3)'; e.currentTarget.style.color = 'rgba(240,238,255,0.7)'; }}}
              onMouseLeave={e => { if (!active) { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(240,238,255,0.45)'; }}}
            >
              <span style={{ display: 'flex', color: active ? '#a78bfa' : 'rgba(167,139,250,0.5)' }}>{SPECIES_ICONS[s]}</span>
              {s === 'All' ? 'All pets' : s + 's'}
            </button>
          );
        })}

        {hasFilters && (
          <button
            onClick={clearFilters}
            style={{
              padding: '7px 14px', borderRadius: 8,
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'transparent',
              color: 'rgba(240,238,255,0.3)',
              fontSize: 13, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 5,
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(248,113,113,0.3)'; e.currentTarget.style.color = '#f87171'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(240,238,255,0.3)'; }}
          >
            <FiX size={13} /> Clear filters
          </button>
        )}
      </div>

      {/* Results count */}
      {!loading && pets.length > 0 && (
        <p style={{ fontSize: 13, color: 'rgba(240,238,255,0.3)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 6 }}>
          <strong style={{ color: '#a78bfa' }}>{pets.length}</strong>
          {pets.length === 1 ? 'pet' : 'pets'} found
          {species !== 'All' && <><span style={{ opacity: 0.3 }}>·</span><span>{species}s</span></>}
          {search && <><span style={{ opacity: 0.3 }}>·</span><span>"{search}"</span></>}
        </p>
      )}

      {/* Content */}
      {loading ? (
        <LoadingSpinner />
      ) : pets.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <div style={{ color: 'rgba(124,92,252,0.25)', marginBottom: 4 }}>
            <FaPaw size={40} />
          </div>
          <h3 style={{ fontSize: 20, fontFamily: "'Playfair Display', serif", fontWeight: 700, color: '#f0eeff' }}>No pets found</h3>
          <p style={{ fontSize: 14, color: 'rgba(240,238,255,0.35)', maxWidth: 300 }}>
            Try adjusting your search or filters to find more pets.
          </p>
          {hasFilters && (
            <button
              onClick={clearFilters}
              style={{
                marginTop: 8, padding: '10px 22px', borderRadius: 10,
                fontWeight: 600, fontSize: 13,
                background: 'rgba(255,255,255,0.04)',
                color: 'rgba(240,238,255,0.7)',
                border: '1px solid rgba(255,255,255,0.1)',
                cursor: 'pointer', transition: 'all 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(124,92,252,0.4)'; e.currentTarget.style.color = '#a78bfa'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(240,238,255,0.7)'; }}
            >
              Clear all filters
            </button>
          )}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
          {pets.map((pet, i) => <PetCard key={pet._id} pet={pet} index={i} />)}
        </div>
      )}
    </div>
  );
};

export default AllPetsPage;