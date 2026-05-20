import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPetById, updatePet } from '../../api/pets.api';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import toast from 'react-hot-toast';

const EditPetPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  useEffect(() => {
    getPetById(id).then(r => setForm(r.data.pet)).catch(() => toast.error('Pet not found')).finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updatePet(id, form);
      toast.success('Pet updated successfully!');
      navigate('/dashboard/my-listings');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !form) return <LoadingSpinner />;

  return (
    <div style={{ maxWidth: 700 }}>
      <h2 style={{ marginBottom: 8 }}>Edit Pet: {form.name}</h2>
      <p style={{ color: 'var(--text2)', marginBottom: 28 }}>Update the pet listing information below</p>
      <form onSubmit={handleSubmit} style={{ background: 'var(--surface)', borderRadius: 14, border: '1px solid var(--border)', padding: 28 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {[['name', 'Pet Name *', 'text'], ['breed', 'Breed *', 'text'], ['age', 'Age *', 'text'], ['location', 'Location *', 'text'], ['adoptionFee', 'Adoption Fee (৳) *', 'number'], ['imageURL', 'Image URL', 'url']].map(([k, l, t]) => (
            <div key={k}><label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text2)', display: 'block', marginBottom: 6 }}>{l}</label><input type={t} value={form[k] || ''} onChange={e => set(k, e.target.value)} style={{ width: '100%' }} /></div>
          ))}
          <div><label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text2)', display: 'block', marginBottom: 6 }}>Species</label><select value={form.species} onChange={e => set('species', e.target.value)} style={{ width: '100%' }}>{['Dog', 'Cat', 'Bird', 'Rabbit', 'Other'].map(s => <option key={s}>{s}</option>)}</select></div>
          <div><label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text2)', display: 'block', marginBottom: 6 }}>Gender</label><select value={form.gender} onChange={e => set('gender', e.target.value)} style={{ width: '100%' }}><option>Male</option><option>Female</option></select></div>
          <div><label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text2)', display: 'block', marginBottom: 6 }}>Health Status</label><select value={form.healthStatus} onChange={e => set('healthStatus', e.target.value)} style={{ width: '100%' }}>{['Excellent', 'Good', 'Fair', 'Needs Care'].map(s => <option key={s}>{s}</option>)}</select></div>
          <div><label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text2)', display: 'block', marginBottom: 6 }}>Vaccination</label><select value={form.vaccinationStatus} onChange={e => set('vaccinationStatus', e.target.value)} style={{ width: '100%' }}>{['Up to date', 'Partial', 'Not vaccinated', 'N/A'].map(s => <option key={s}>{s}</option>)}</select></div>
          <div style={{ gridColumn: '1/-1' }}><label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text2)', display: 'block', marginBottom: 6 }}>Description</label><textarea value={form.description || ''} onChange={e => set('description', e.target.value)} rows={4} style={{ width: '100%' }} /></div>
        </div>
        <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
          <button type="submit" disabled={saving} style={{ padding: '11px 28px', borderRadius: 10, fontWeight: 600, fontSize: 14, background: 'var(--primary)', color: '#fff', border: 'none', cursor: 'pointer', opacity: saving ? .7 : 1 }}>{saving ? 'Saving...' : 'Save Changes'}</button>
          <button type="button" onClick={() => navigate('/dashboard/my-listings')} style={{ padding: '11px 24px', borderRadius: 10, fontWeight: 600, fontSize: 14, background: '#f0ebe4', color: 'var(--text2)', border: 'none', cursor: 'pointer' }}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditPetPage;
