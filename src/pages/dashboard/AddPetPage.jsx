import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { createPet } from '../../api/pets.api';
import toast from 'react-hot-toast';

const INITIAL = { name: '', species: 'Dog', breed: '', age: '', gender: 'Male', imageURL: '', healthStatus: 'Good', vaccinationStatus: 'Up to date', location: '', adoptionFee: '', description: '' };

const AddPetPage = () => {
  const [form, setForm] = useState(INITIAL);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.breed || !form.location || !form.adoptionFee || !form.description) {
      toast.error('Please fill all required fields'); return;
    }
    setLoading(true);
    try {
      await createPet({ ...form, adoptionFee: Number(form.adoptionFee) });
      toast.success('Pet listing created successfully! 🐾');
      navigate('/dashboard/my-listings');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create listing');
    } finally {
      setLoading(false);
    }
  };

  const label = (text) => (
    <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text2)', display: 'block', marginBottom: 6 }}>{text}</label>
  );

  return (
    <div style={{ maxWidth: 700 }}>
      <h2 style={{ marginBottom: 8 }}>Add New Pet</h2>
      <p style={{ color: 'var(--text2)', marginBottom: 28 }}>List a pet for adoption to help them find a loving home</p>

      <form onSubmit={handleSubmit} style={{ background: 'var(--surface)', borderRadius: 14, border: '1px solid var(--border)', padding: 28 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div><label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text2)', display: 'block', marginBottom: 6 }}>Pet Name *</label><input value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Buddy" style={{ width: '100%' }} /></div>
          <div><label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text2)', display: 'block', marginBottom: 6 }}>Species *</label>
            <select value={form.species} onChange={e => set('species', e.target.value)} style={{ width: '100%' }}>
              {['Dog', 'Cat', 'Bird', 'Rabbit', 'Other'].map(s => <option key={s}>{s}</option>)}
            </select></div>
          <div><label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text2)', display: 'block', marginBottom: 6 }}>Breed *</label><input value={form.breed} onChange={e => set('breed', e.target.value)} placeholder="e.g. Golden Retriever" style={{ width: '100%' }} /></div>
          <div><label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text2)', display: 'block', marginBottom: 6 }}>Age *</label><input value={form.age} onChange={e => set('age', e.target.value)} placeholder="e.g. 2 years" style={{ width: '100%' }} /></div>
          <div><label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text2)', display: 'block', marginBottom: 6 }}>Gender</label>
            <select value={form.gender} onChange={e => set('gender', e.target.value)} style={{ width: '100%' }}>
              <option>Male</option><option>Female</option>
            </select></div>
          <div><label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text2)', display: 'block', marginBottom: 6 }}>Health Status</label>
            <select value={form.healthStatus} onChange={e => set('healthStatus', e.target.value)} style={{ width: '100%' }}>
              {['Excellent', 'Good', 'Fair', 'Needs Care'].map(s => <option key={s}>{s}</option>)}
            </select></div>
          <div><label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text2)', display: 'block', marginBottom: 6 }}>Vaccination Status</label>
            <select value={form.vaccinationStatus} onChange={e => set('vaccinationStatus', e.target.value)} style={{ width: '100%' }}>
              {['Up to date', 'Partial', 'Not vaccinated', 'N/A'].map(s => <option key={s}>{s}</option>)}
            </select></div>
          <div><label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text2)', display: 'block', marginBottom: 6 }}>Location *</label><input value={form.location} onChange={e => set('location', e.target.value)} placeholder="e.g. Chittagong" style={{ width: '100%' }} /></div>
          <div><label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text2)', display: 'block', marginBottom: 6 }}>Adoption Fee (৳) *</label><input type="number" value={form.adoptionFee} onChange={e => set('adoptionFee', e.target.value)} placeholder="e.g. 2500" style={{ width: '100%' }} /></div>
          <div><label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text2)', display: 'block', marginBottom: 6 }}>Image URL (imgbb)</label><input value={form.imageURL} onChange={e => set('imageURL', e.target.value)} placeholder="https://..." style={{ width: '100%' }} /></div>
          <div style={{ gridColumn: '1/-1' }}><label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text2)', display: 'block', marginBottom: 6 }}>Owner Email</label><input value={user?.email} readOnly style={{ width: '100%', background: 'var(--bg)', color: 'var(--text3)' }} /></div>
          <div style={{ gridColumn: '1/-1' }}><label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text2)', display: 'block', marginBottom: 6 }}>Description *</label><textarea value={form.description} onChange={e => set('description', e.target.value)} placeholder="Describe the pet's personality, habits, and any special needs..." rows={4} style={{ width: '100%' }} /></div>
        </div>
        <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
          <button type="submit" disabled={loading} style={{ padding: '11px 28px', borderRadius: 10, fontWeight: 600, fontSize: 14, background: 'var(--primary)', color: '#fff', border: 'none', cursor: 'pointer', opacity: loading ? .7 : 1 }}>
            {loading ? 'Adding...' : 'Add Pet Listing 🐾'}
          </button>
          <button type="button" onClick={() => navigate('/dashboard')} style={{ padding: '11px 24px', borderRadius: 10, fontWeight: 600, fontSize: 14, background: '#f0ebe4', color: 'var(--text2)', border: 'none', cursor: 'pointer' }}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddPetPage;
