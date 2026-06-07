import { useEffect, useState } from 'react';
import PetCard from '../components/pets/PetCard';
import { getAllPets } from '../api/pets.api';
import LoadingSpinner from '../components/shared/LoadingSpinner';

const SPECIES = ['All', 'Dog', 'Cat', 'Bird', 'Rabbit', 'Other'];

const SPECIES_ICONS = {
  All:    '🐾',
  Dog:    '🐕',
  Cat:    '🐈',
  Bird:   '🦜',
  Rabbit: '🐰',
  Other:  '🐿️',
};

// Inline SVG icons (no emoji, no external lib needed)
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
  </svg>
);

const SortIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18M7 12h10M11 18h2"/>
  </svg>
);

const PawIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.25 }}>
    <path d="M11 20a1 1 0 0 0 2 0v-1a1 1 0 0 0-2 0v1z"/><ellipse cx="7.5" cy="14.5" rx="2.5" ry="2.5"/><ellipse cx="16.5" cy="14.5" rx="2.5" ry="2.5"/><ellipse cx="5" cy="9" rx="2" ry="2"/><ellipse cx="19" cy="9" rx="2" ry="2"/><ellipse cx="12" cy="8" rx="2" ry="2"/>
  </svg>
);

const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M18 6L6 18M6 6l12 12"/>
  </svg>
);

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
  // eslint-disable-next-line react-hooks/exhaustive-deps

  const handleSearch = (e) => {
    e.preventDefault();
    fetchPets();
  };

  const clearFilters = () => { setSearch(''); setSpecies('All'); };

  const hasFilters = search || species !== 'All';

  return (
    <div className="page-enter" style={{ padding: '48px 24px 80px', maxWidth: 1200, margin: '0 auto' }}>

      {/* ── Header ── */}
      <div className="animate-fadeInUp" style={{ marginBottom: 40 }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text3)', marginBottom: 10, textTransform: 'uppercase' }}>
          Browse
        </p>
        <h2 style={{
          fontSize: 'clamp(28px,4vw,42px)',
          fontFamily: "'Playfair Display', serif",
          fontWeight: 700, color: 'var(--text)',
          lineHeight: 1.1, marginBottom: 10,
        }}>
          All available pets
        </h2>
        <p style={{ color: 'var(--text2)', fontSize: 15, maxWidth: 480 }}>
          Find your perfect companion from our wide selection of loving pets waiting for a home.
        </p>
      </div>

      {/* ── Search + Sort ── */}
      <form
        onSubmit={handleSearch}
        className="animate-fadeInUp delay-1"
        style={{
          display: 'flex', gap: 10, flexWrap: 'wrap',
          alignItems: 'center', marginBottom: 16,
        }}
      >
        {/* Search input */}
        <div style={{
          flex: 1, minWidth: 240,
          display: 'flex', alignItems: 'center', gap: 10,
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 10, padding: '0 14px',
          transition: 'border-color 0.2s',
        }}
          onFocusCapture={e => e.currentTarget.style.borderColor = 'var(--primary)'}
          onBlurCapture={e => e.currentTarget.style.borderColor = 'var(--border)'}
        >
          <span style={{ color: 'var(--text3)', display: 'flex', flexShrink: 0 }}><SearchIcon /></span>
          <input
            placeholder="Search by name or breed..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              flex: 1, border: 'none', background: 'transparent',
              padding: '11px 0', fontSize: 14, color: 'var(--text)',
              outline: 'none', boxShadow: 'none',
            }}
          />
          {search && (
            <button type="button" onClick={() => setSearch('')} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--text3)', display: 'flex', padding: 2,
            }}>
              <XIcon />
            </button>
          )}
        </div>

        {/* Sort */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 10, padding: '0 14px',
        }}>
          <span style={{ color: 'var(--text3)', display: 'flex' }}><SortIcon /></span>
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            style={{
              border: 'none', background: 'transparent',
              padding: '11px 0', fontSize: 14, color: 'var(--text)',
              outline: 'none', cursor: 'pointer', minWidth: 140,
            }}
          >
            <option value="">Sort by</option>
            <option value="fee-asc">Fee: Low to High</option>
            <option value="fee-desc">Fee: High to Low</option>
            <option value="name">Name A–Z</option>
          </select>
        </div>

        {/* Search button */}
        <button
          type="submit"
          style={{
            padding: '11px 24px', borderRadius: 10,
            fontWeight: 600, fontSize: 14,
            background: 'var(--text)', color: 'var(--bg)',
            border: 'none', cursor: 'pointer', transition: 'background 0.15s',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--primary)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--text)'}
        >
          Search
        </button>
      </form>

      {/* ── Species filter chips ── */}
      <div
        className="animate-fadeInUp delay-2"
        style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 32 }}
      >
        {SPECIES.map(s => {
          const active = species === s;
          return (
            <button
              key={s}
              onClick={() => setSpecies(s)}
              style={{
                padding: '7px 16px', borderRadius: 8,
                border: `1px solid ${active ? 'var(--primary)' : 'var(--border)'}`,
                background: active ? 'var(--primary-light)' : 'var(--surface)',
                color: active ? 'var(--primary)' : 'var(--text2)',
                fontSize: 13, fontWeight: active ? 700 : 500,
                cursor: 'pointer', transition: 'all 0.15s ease',
                display: 'flex', alignItems: 'center', gap: 6,
              }}
            >
              <span style={{ fontSize: 15 }}>{SPECIES_ICONS[s]}</span>
              {s === 'All' ? 'All pets' : s + 's'}
            </button>
          );
        })}

        {hasFilters && (
          <button
            onClick={clearFilters}
            style={{
              padding: '7px 14px', borderRadius: 8,
              border: '1px solid var(--border)',
              background: 'transparent',
              color: 'var(--text3)',
              fontSize: 13, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 5,
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--text3)'; e.currentTarget.style.color = 'var(--text)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text3)'; }}
          >
            <XIcon /> Clear filters
          </button>
        )}
      </div>

      {/* ── Results count ── */}
      {!loading && pets.length > 0 && (
        <p className="animate-fadeIn" style={{
          fontSize: 13, color: 'var(--text3)', marginBottom: 20,
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <strong style={{ color: 'var(--text)' }}>{pets.length}</strong>
          {pets.length === 1 ? 'pet' : 'pets'} found
          {species !== 'All' && <span style={{ color: 'var(--border)' }}>·</span>}
          {species !== 'All' && <span>{species}s</span>}
          {search && <span style={{ color: 'var(--border)' }}>·</span>}
          {search && <span>"{search}"</span>}
        </p>
      )}

      {/* ── Content ── */}
      {loading ? (
        <LoadingSpinner />
      ) : pets.length === 0 ? (
        <div style={{
          textAlign: 'center', padding: '80px 24px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
        }}>
          <div style={{ color: 'var(--border)', marginBottom: 4 }}><PawIcon /></div>
          <h3 style={{
            fontSize: 20, fontFamily: "'Playfair Display', serif",
            fontWeight: 700, color: 'var(--text)',
          }}>No pets found</h3>
          <p style={{ fontSize: 14, color: 'var(--text3)', maxWidth: 300 }}>
            Try adjusting your search or filters to find more pets.
          </p>
          {hasFilters && (
            <button
              onClick={clearFilters}
              style={{
                marginTop: 8, padding: '9px 22px', borderRadius: 10,
                fontWeight: 600, fontSize: 13,
                background: 'var(--surface)', color: 'var(--text)',
                border: '1px solid var(--border)', cursor: 'pointer',
                transition: 'border-color 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--text)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
            >
              Clear all filters
            </button>
          )}
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 20,
        }}>
          {pets.map((pet, i) => <PetCard key={pet._id} pet={pet} index={i} />)}
        </div>
      )}
    </div>
  );
};

export default AllPetsPage;