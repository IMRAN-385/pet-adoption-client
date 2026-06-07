import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { createPet } from '../../api/pets.api';
import toast from 'react-hot-toast';

const INITIAL = {
  name: '', species: 'Dog', breed: '', age: '', gender: 'Male',
  imageURL: '', healthStatus: 'Good', vaccinationStatus: 'Up to date',
  location: '', adoptionFee: '', description: '',
};

const InfoIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
  </svg>
);

const HealthIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
  </svg>
);

const PhotoIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
  </svg>
);

const Label = ({ text, required }) => (
  <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text3)', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
    {text}{required && <span style={{ color: 'var(--primary)', marginLeft: 2 }}>*</span>}
  </label>
);

const SectionHeader = ({ Icon, title }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, paddingBottom: 14, borderBottom: '1px solid var(--border)' }}>
    <div style={{ color: 'var(--primary)' }}><Icon /></div>
    <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', letterSpacing: '0.04em' }}>{title}</span>
  </div>
);

const AddPetPage = () => {
  const [form, setForm] = useState(INITIAL);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleImageChange = (v) => {
    set('imageURL', v);
    if (v.startsWith('http')) setPreview(v);
    else setPreview('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.breed || !form.location || !form.adoptionFee || !form.description) {
      toast.error('Please fill all required fields');
      return;
    }
    setLoading(true);
    try {
      await createPet({ ...form, adoptionFee: Number(form.adoptionFee) });
      toast.success('Pet listing created!');
      navigate('/dashboard/my-listings');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create listing');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = { width: '100%' };
  const sectionStyle = {
    background: 'var(--surface)',
    borderRadius: 12,
    border: '1px solid var(--border)',
    padding: 24,
    marginBottom: 16,
  };

  return (
    <div className="page-enter" style={{ maxWidth: 680 }}>

      {/* Header */}
      <div className="animate-fadeInUp" style={{ marginBottom: 28 }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text3)', marginBottom: 8, textTransform: 'uppercase' }}>Dashboard</p>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>Add new pet</h2>
        <p style={{ color: 'var(--text2)', fontSize: 14 }}>List a pet for adoption to help them find a loving home.</p>
      </div>

      <form onSubmit={handleSubmit}>

        {/* Basic Info */}
        <div className="animate-fadeInUp delay-1" style={sectionStyle}>
          <SectionHeader Icon={InfoIcon} title="Basic information" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <Label text="Pet name" required />
              <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Buddy" style={inputStyle} />
            </div>
            <div>
              <Label text="Species" required />
              <select value={form.species} onChange={e => set('species', e.target.value)} style={inputStyle}>
                {['Dog', 'Cat', 'Bird', 'Rabbit', 'Other'].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <Label text="Breed" required />
              <input value={form.breed} onChange={e => set('breed', e.target.value)} placeholder="e.g. Golden Retriever" style={inputStyle} />
            </div>
            <div>
              <Label text="Age" required />
              <input value={form.age} onChange={e => set('age', e.target.value)} placeholder="e.g. 2 years" style={inputStyle} />
            </div>
            <div>
              <Label text="Gender" />
              <select value={form.gender} onChange={e => set('gender', e.target.value)} style={inputStyle}>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
            <div>
              <Label text="Location" required />
              <input value={form.location} onChange={e => set('location', e.target.value)} placeholder="e.g. Chittagong" style={inputStyle} />
            </div>
          </div>
        </div>

        {/* Health */}
        <div className="animate-fadeInUp delay-2" style={sectionStyle}>
          <SectionHeader Icon={HealthIcon} title="Health & details" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <Label text="Health status" />
              <select value={form.healthStatus} onChange={e => set('healthStatus', e.target.value)} style={inputStyle}>
                {['Excellent', 'Good', 'Fair', 'Needs Care'].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <Label text="Vaccination status" />
              <select value={form.vaccinationStatus} onChange={e => set('vaccinationStatus', e.target.value)} style={inputStyle}>
                {['Up to date', 'Partial', 'Not vaccinated', 'N/A'].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <Label text="Adoption fee (৳)" required />
              <input type="number" min="0" value={form.adoptionFee} onChange={e => set('adoptionFee', e.target.value)} placeholder="e.g. 2500" style={inputStyle} />
            </div>
            <div>
              <Label text="Owner email" />
              <input value={user?.email || ''} readOnly style={{ ...inputStyle, background: 'var(--surface2)', color: 'var(--text3)' }} />
            </div>
          </div>
        </div>

        {/* Photo & Description */}
        <div className="animate-fadeInUp delay-3" style={sectionStyle}>
          <SectionHeader Icon={PhotoIcon} title="Photo & description" />

          <div style={{ display: 'grid', gridTemplateColumns: preview ? '1fr 1fr' : '1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <Label text="Image URL" />
              <input value={form.imageURL} onChange={e => handleImageChange(e.target.value)} placeholder="https://..." style={inputStyle} />
              <p style={{ fontSize: 11, color: 'var(--text3)', marginTop: 5 }}>
                Upload to imgbb.com first, then paste the link here.
              </p>
            </div>
            {preview && (
              <div style={{ borderRadius: 10, overflow: 'hidden', height: 130, background: 'var(--surface2)', border: '1px solid var(--border)' }}>
                <img src={preview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={() => setPreview('')} />
              </div>
            )}
          </div>

          <div>
            <Label text="Description" required />
            <textarea
              value={form.description}
              onChange={e => set('description', e.target.value)}
              placeholder="Describe the pet's personality, habits, and any special needs..."
              rows={4} style={inputStyle}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="animate-fadeInUp delay-4" style={{ display: 'flex', gap: 10 }}>
          <button
            type="submit" disabled={loading}
            style={{
              padding: '12px 28px', borderRadius: 10, fontWeight: 700, fontSize: 14,
              background: 'var(--text)', color: 'var(--bg)',
              border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1, transition: 'background 0.15s',
            }}
            onMouseEnter={e => { if (!loading) e.currentTarget.style.background = 'var(--primary)'; }}
            onMouseLeave={e => { if (!loading) e.currentTarget.style.background = 'var(--text)'; }}
          >
            {loading ? 'Adding...' : 'Add pet listing'}
          </button>
          <button
            type="button" onClick={() => navigate('/dashboard')}
            style={{
              padding: '12px 24px', borderRadius: 10, fontWeight: 600, fontSize: 14,
              background: 'var(--surface2)', color: 'var(--text2)',
              border: '1px solid var(--border)', cursor: 'pointer', transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--text3)'; e.currentTarget.style.color = 'var(--text)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text2)'; }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPetPage;