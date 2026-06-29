import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { createPet } from '../../api/pets.api';
import toast from 'react-hot-toast';

const T = {
  bg:      '#080612',
  surface: 'rgba(255,255,255,0.04)',
  surface2:'rgba(255,255,255,0.07)',
  border:  'rgba(255,255,255,0.08)',
  text:    '#f0eeff',
  text2:   'rgba(240,238,255,0.55)',
  text3:   'rgba(240,238,255,0.3)',
  accent:  '#7c5cfc',
  accentGlow: 'rgba(124,92,252,0.25)',
};

const INITIAL = {
  name: '', species: 'Dog', breed: '', age: '', gender: 'Male',
  imageURL: '', healthStatus: 'Good', vaccinationStatus: 'Up to date',
  location: '', adoptionFee: '', description: '',
};

const InfoIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
  </svg>
);
const HealthIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
  </svg>
);
const PhotoIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
  </svg>
);

const Label = ({ text, required }) => (
  <label style={{ fontSize:10, fontWeight:700, color:T.text3, display:'block', marginBottom:6, textTransform:'uppercase', letterSpacing:'.08em' }}>
    {text}{required && <span style={{ color:'#a78bfa', marginLeft:3 }}>*</span>}
  </label>
);

const SectionHeader = ({ Icon, title }) => (
  <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:20, paddingBottom:14, borderBottom:`1px solid ${T.border}` }}>
    <div style={{
      width:34, height:34, borderRadius:10,
      background:'rgba(124,92,252,0.1)', border:'1px solid rgba(124,92,252,0.2)',
      display:'flex', alignItems:'center', justifyContent:'center', color:'#a78bfa', flexShrink:0,
    }}><Icon /></div>
    <span style={{ fontSize:13, fontWeight:700, color:T.text, letterSpacing:'.03em' }}>{title}</span>
  </div>
);

const AddPetPage = () => {
  const [form, setForm]       = useState(INITIAL);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState('');
  const { user } = useAuth();
  const navigate  = useNavigate();

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleImageChange = (v) => {
    set('imageURL', v);
    setPreview(v.startsWith('http') ? v : '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.breed || !form.location || !form.adoptionFee || !form.description) {
      toast.error('Please fill all required fields'); return;
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

  const inp = {
    width:'100%', padding:'11px 14px',
    background:'rgba(255,255,255,0.04)',
    border:`1.5px solid ${T.border}`,
    borderRadius:10, fontSize:14, color:T.text,
    outline:'none', transition:'border-color .2s',
    fontFamily:"'DM Sans', sans-serif", boxSizing:'border-box',
  };

  const section = {
    background: T.surface,
    borderRadius:16, border:`1px solid ${T.border}`,
    padding:24, marginBottom:16,
    backdropFilter:'blur(12px)',
    WebkitBackdropFilter:'blur(12px)',
  };

  return (
    <div style={{ maxWidth:700, fontFamily:"'DM Sans', sans-serif",paddingTop:"63px" }}>
      <style>{`
        @keyframes fadeInUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:none} }
        .add-inp:focus { border-color: rgba(124,92,252,0.55) !important; }
        .add-inp::placeholder { color: rgba(240,238,255,0.22); }
        .add-inp option { background: #0e0c1a; color: #f0eeff; }
        .btn-submit:hover:not(:disabled) { transform: translateY(-2px) !important; box-shadow: 0 10px 28px rgba(124,92,252,0.45) !important; }
        .btn-cancel:hover { border-color: rgba(255,255,255,0.18) !important; color: #f0eeff !important; }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom:28, animation:'fadeInUp 0.5s ease both' }}>
        <p style={{ fontSize:10, fontWeight:700, letterSpacing:'.1em', color:'#a78bfa', marginBottom:10, textTransform:'uppercase' }}>Dashboard</p>
        <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:32, fontWeight:700, color:T.text, marginBottom:6 }}>
          Add new pet
        </h2>
        <p style={{ color:T.text2, fontSize:14, margin:0 }}>List a pet for adoption to help them find a loving home.</p>
      </div>

      <form onSubmit={handleSubmit}>

        {/* Basic Info */}
        <div style={{ ...section, animation:'fadeInUp 0.5s ease 0.05s both' }}>
          <SectionHeader Icon={InfoIcon} title="Basic information" />
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
            {[
              { label:'Pet name', key:'name', placeholder:'e.g. Buddy', required:true },
              { label:'Breed',    key:'breed', placeholder:'e.g. Golden Retriever', required:true },
              { label:'Age',      key:'age',   placeholder:'e.g. 2 years', required:true },
              { label:'Location', key:'location', placeholder:'e.g. Chittagong', required:true },
            ].map(({ label, key, placeholder, required }) => (
              <div key={key}>
                <Label text={label} required={required} />
                <input
                  className="add-inp"
                  value={form[key]}
                  onChange={e => set(key, e.target.value)}
                  placeholder={placeholder}
                  style={inp}
                />
              </div>
            ))}
            <div>
              <Label text="Species" required />
              <select className="add-inp" value={form.species} onChange={e => set('species', e.target.value)} style={inp}>
                {['Dog','Cat','Bird','Rabbit','Other'].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <Label text="Gender" />
              <select className="add-inp" value={form.gender} onChange={e => set('gender', e.target.value)} style={inp}>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
          </div>
        </div>

        {/* Health */}
        <div style={{ ...section, animation:'fadeInUp 0.5s ease 0.1s both' }}>
          <SectionHeader Icon={HealthIcon} title="Health & details" />
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
            <div>
              <Label text="Health status" />
              <select className="add-inp" value={form.healthStatus} onChange={e => set('healthStatus', e.target.value)} style={inp}>
                {['Excellent','Good','Fair','Needs Care'].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <Label text="Vaccination status" />
              <select className="add-inp" value={form.vaccinationStatus} onChange={e => set('vaccinationStatus', e.target.value)} style={inp}>
                {['Up to date','Partial','Not vaccinated','N/A'].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <Label text="Adoption fee (৳)" required />
              <input
                className="add-inp"
                type="number" min="0"
                value={form.adoptionFee}
                onChange={e => set('adoptionFee', e.target.value)}
                placeholder="e.g. 2500"
                style={inp}
              />
            </div>
            <div>
              <Label text="Owner email" />
              <input
                className="add-inp"
                value={user?.email || ''}
                readOnly
                style={{ ...inp, color:T.text3, cursor:'default' }}
              />
            </div>
          </div>
        </div>

        {/* Photo & Description */}
        <div style={{ ...section, animation:'fadeInUp 0.5s ease 0.15s both' }}>
          <SectionHeader Icon={PhotoIcon} title="Photo & description" />

          <div style={{ display:'grid', gridTemplateColumns: preview ? '1fr 1fr' : '1fr', gap:16, marginBottom:16 }}>
            <div>
              <Label text="Image URL" />
              <input
                className="add-inp"
                value={form.imageURL}
                onChange={e => handleImageChange(e.target.value)}
                placeholder="https://..."
                style={inp}
              />
              <p style={{ fontSize:11, color:T.text3, marginTop:6, lineHeight:1.5 }}>
                Upload to imgbb.com first, then paste the link here.
              </p>
            </div>
            {preview && (
              <div style={{ borderRadius:12, overflow:'hidden', height:130, background:T.surface2, border:`1px solid ${T.border}` }}>
                <img src={preview} alt="Preview" style={{ width:'100%', height:'100%', objectFit:'cover' }} onError={() => setPreview('')} />
              </div>
            )}
          </div>

          <div>
            <Label text="Description" required />
            <textarea
              className="add-inp"
              value={form.description}
              onChange={e => set('description', e.target.value)}
              placeholder="Describe the pet's personality, habits, and any special needs..."
              rows={4}
              style={{ ...inp, resize:'vertical', lineHeight:1.65 }}
            />
          </div>
        </div>

        {/* Actions */}
        <div style={{ display:'flex', gap:10, animation:'fadeInUp 0.5s ease 0.2s both' }}>
          <button
            type="submit"
            disabled={loading}
            className="btn-submit"
            style={{
              padding:'13px 32px', borderRadius:50, fontWeight:700, fontSize:14,
              background:T.accent, color:'#fff',
              border:'none', cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1,
              boxShadow:`0 6px 20px ${T.accentGlow}`,
              transition:'all 0.2s', fontFamily:"'DM Sans', sans-serif",
            }}
          >
            {loading ? 'Adding...' : 'Add pet listing →'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="btn-cancel"
            style={{
              padding:'13px 24px', borderRadius:50, fontWeight:600, fontSize:14,
              background:T.surface, color:T.text2,
              border:`1px solid ${T.border}`, cursor:'pointer',
              transition:'all 0.15s', fontFamily:"'DM Sans', sans-serif",
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPetPage;