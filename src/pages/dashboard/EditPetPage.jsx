import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPetById, updatePet } from '../../api/pets.api';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
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

const Label = ({ text, required }) => (
  <label style={{ fontSize:10, fontWeight:700, color:T.text3, display:'block', marginBottom:6, textTransform:'uppercase', letterSpacing:'.08em' }}>
    {text}{required && <span style={{ color:'#a78bfa', marginLeft:3 }}>*</span>}
  </label>
);

const EditPetPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  useEffect(() => {
    getPetById(id)
      .then(r => setForm(r.data.pet))
      .catch(() => { toast.error('Pet not found'); navigate('/dashboard/my-listings'); })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.breed || !form.location || !form.adoptionFee) {
      toast.error('Please fill all required fields'); return;
    }
    setSaving(true);
    try {
      await updatePet(id, { ...form, adoptionFee: Number(form.adoptionFee) });
      toast.success('Pet updated successfully! 🐾');
      navigate('/dashboard/my-listings');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !form) return <LoadingSpinner />;

  const inp = {
    width:'100%', padding:'11px 14px',
    background:'rgba(255,255,255,0.04)',
    border:`1.5px solid ${T.border}`,
    borderRadius:10, fontSize:14, color:T.text,
    outline:'none', transition:'border-color .2s',
    fontFamily:"'DM Sans', sans-serif", boxSizing:'border-box',
  };

  const textFields = [
    { k:'name',        l:'Pet Name',         t:'text',   required:true  },
    { k:'breed',       l:'Breed',            t:'text',   required:true  },
    { k:'age',         l:'Age',              t:'text',   required:true  },
    { k:'location',    l:'Location',         t:'text',   required:true  },
    { k:'adoptionFee', l:'Adoption Fee (৳)', t:'number', required:true  },
    { k:'imageURL',    l:'Image URL',        t:'url',    required:false },
  ];

  return (
    <div style={{ maxWidth:720, fontFamily:"'DM Sans', sans-serif" ,paddingTop:"63px"}}>
      <style>{`
        @keyframes fadeInUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:none} }
        .edit-inp:focus { border-color: rgba(124,92,252,0.55) !important; }
        .edit-inp::placeholder { color: rgba(240,238,255,0.22); }
        .edit-inp option { background: #0e0c1a; color: #f0eeff; }
        .btn-save:hover:not(:disabled) { transform: translateY(-2px) !important; box-shadow: 0 10px 28px rgba(124,92,252,0.45) !important; }
        .btn-cancel-edit:hover { border-color: rgba(255,255,255,0.18) !important; color: #f0eeff !important; }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom:28, animation:'fadeInUp 0.5s ease both' }}>
        <p style={{ fontSize:10, fontWeight:700, letterSpacing:'.1em', color:'#a78bfa', marginBottom:10, textTransform:'uppercase' }}>Dashboard</p>
        <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:30, fontWeight:700, color:T.text, marginBottom:6 }}>
          Edit Pet: <span style={{ background:'linear-gradient(135deg,#a78bfa,#7c5cfc)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>{form.name}</span>
        </h2>
        <p style={{ color:T.text2, fontSize:14, margin:0 }}>Update the listing information below.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{
          background:T.surface, borderRadius:16, border:`1px solid ${T.border}`,
          padding:26, marginBottom:18, backdropFilter:'blur(12px)',
          animation:'fadeInUp 0.5s ease 0.05s both',
        }}>
          {/* Section header */}
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:20, paddingBottom:14, borderBottom:`1px solid ${T.border}` }}>
            <div style={{ width:34, height:34, borderRadius:10, background:'rgba(124,92,252,0.1)', border:'1px solid rgba(124,92,252,0.2)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:16 }}>📋</div>
            <span style={{ fontSize:13, fontWeight:700, color:T.text, letterSpacing:'.03em' }}>Basic Information</span>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
            {textFields.map(({ k, l, t, required }) => (
              <div key={k}>
                <Label text={l} required={required} />
                <input
                  className="edit-inp"
                  type={t}
                  value={form[k] || ''}
                  onChange={e => set(k, e.target.value)}
                  style={inp}
                />
              </div>
            ))}

            <div>
              <Label text="Species" />
              <select className="edit-inp" value={form.species} onChange={e => set('species', e.target.value)} style={inp}>
                {['Dog','Cat','Bird','Rabbit','Other'].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <Label text="Gender" />
              <select className="edit-inp" value={form.gender} onChange={e => set('gender', e.target.value)} style={inp}>
                <option>Male</option><option>Female</option>
              </select>
            </div>

            <div>
              <Label text="Health Status" />
              <select className="edit-inp" value={form.healthStatus} onChange={e => set('healthStatus', e.target.value)} style={inp}>
                {['Excellent','Good','Fair','Needs Care'].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <Label text="Vaccination" />
              <select className="edit-inp" value={form.vaccinationStatus} onChange={e => set('vaccinationStatus', e.target.value)} style={inp}>
                {['Up to date','Partial','Not vaccinated','N/A'].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>

            <div style={{ gridColumn:'1/-1' }}>
              <Label text="Description" />
              <textarea
                className="edit-inp"
                value={form.description || ''}
                onChange={e => set('description', e.target.value)}
                rows={4}
                style={{ ...inp, resize:'vertical', lineHeight:1.65 }}
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display:'flex', gap:10, animation:'fadeInUp 0.5s ease 0.1s both' }}>
          <button
            type="submit" disabled={saving}
            className="btn-save"
            style={{
              padding:'13px 32px', borderRadius:50, fontWeight:700, fontSize:14,
              background:T.accent, color:'#fff', border:'none',
              cursor: saving ? 'not-allowed' : 'pointer',
              opacity: saving ? 0.6 : 1,
              boxShadow:`0 6px 20px ${T.accentGlow}`,
              transition:'all 0.2s', fontFamily:"'DM Sans', sans-serif",
            }}
          >{saving ? '⏳ Saving...' : '💾 Save Changes'}</button>
          <button
            type="button"
            onClick={() => navigate('/dashboard/my-listings')}
            className="btn-cancel-edit"
            style={{
              padding:'13px 24px', borderRadius:50, fontWeight:600, fontSize:14,
              background:T.surface, color:T.text2,
              border:`1px solid ${T.border}`, cursor:'pointer',
              transition:'all 0.15s', fontFamily:"'DM Sans', sans-serif",
            }}
          >Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditPetPage;