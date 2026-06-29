import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyPets, deletePet } from '../../api/pets.api';
import { getPetRequests, updateRequestStatus } from '../../api/requests.api';
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

const REQ_STATUS = {
  pending:  { bg:'rgba(250,200,80,0.12)',  color:'#f5c842', border:'1px solid rgba(250,200,80,0.2)'  },
  approved: { bg:'rgba(74,222,128,0.1)',   color:'#4ade80', border:'1px solid rgba(74,222,128,0.2)' },
  rejected: { bg:'rgba(248,113,113,0.1)',  color:'#f87171', border:'1px solid rgba(248,113,113,0.2)'},
};

const MyListingsPage = () => {
  const [pets, setPets]           = useState([]);
  const [loading, setLoading]     = useState(true);
  const [reqModal, setReqModal]   = useState(null);
  const [requests, setRequests]   = useState([]);
  const [reqLoading, setReqLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getMyPets()
      .then(r => setPets(r.data.pets))
      .catch(() => toast.error('Failed to load listings'))
      .finally(() => setLoading(false));
  }, []);

  const openRequests = async (pet) => {
    setReqModal(pet); setRequests([]); setReqLoading(true);
    try {
      const res = await getPetRequests(pet._id);
      setRequests(res.data.requests);
    } catch { toast.error('Failed to load requests'); }
    finally { setReqLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this pet listing? This cannot be undone.')) return;
    try {
      await deletePet(id);
      toast.success('Pet listing deleted');
      setPets(prev => prev.filter(p => p._id !== id));
    } catch (err) { toast.error(err.response?.data?.message || 'Failed to delete'); }
  };

  const handleStatus = async (reqId, status) => {
    try {
      await updateRequestStatus(reqId, status);
      toast.success(`Request ${status} successfully`);
      if (status === 'approved') {
        setRequests(prev => prev.map(r => r._id === reqId ? { ...r, status:'approved' } : r.status === 'pending' ? { ...r, status:'rejected' } : r));
        setPets(prev => prev.map(p => p._id === reqModal._id ? { ...p, status:'adopted' } : p));
        setReqModal(prev => prev ? { ...prev, status:'adopted' } : prev);
      } else {
        setRequests(prev => prev.map(r => r._id === reqId ? { ...r, status } : r));
      }
    } catch (err) { toast.error(err.response?.data?.message || 'Failed to update status'); }
  };

  if (loading) return <LoadingSpinner />;

  const total     = pets.length;
  const available = pets.filter(p => p.status === 'available').length;
  const adopted   = pets.filter(p => p.status === 'adopted').length;

  const STATS = [
    { l:'Total',     v:total,     bg:'rgba(124,92,252,0.12)', color:'#a78bfa', border:'rgba(124,92,252,0.25)' },
    { l:'Available', v:available, bg:'rgba(74,222,128,0.1)',  color:'#4ade80', border:'rgba(74,222,128,0.2)'  },
    { l:'Adopted',   v:adopted,   bg:'rgba(244,114,182,0.1)', color:'#f472b6', border:'rgba(244,114,182,0.2)' },
  ];

  const petStatusStyle = (status) => status === 'available'
    ? { bg:'rgba(74,222,128,0.1)', color:'#4ade80', border:'1px solid rgba(74,222,128,0.2)' }
    : { bg:'rgba(124,92,252,0.12)', color:'#a78bfa', border:'1px solid rgba(124,92,252,0.2)' };

  return (
    <div style={{ fontFamily:"'DM Sans', sans-serif" ,paddingTop:"63px"}}>
      <style>{`
        @keyframes fadeInUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:none} }
        .listing-card:hover { border-color: rgba(124,92,252,0.25) !important; transform: translateY(-4px) !important; box-shadow: 0 16px 40px rgba(124,92,252,0.12) !important; }
        .btn-req:hover   { background: rgba(124,92,252,0.2) !important; color: #c4b0ff !important; }
        .btn-edit:hover  { background: rgba(255,255,255,0.1) !important; color: #f0eeff !important; }
        .btn-view2:hover { background: rgba(255,255,255,0.1) !important; color: #f0eeff !important; }
        .btn-del:hover   { background: rgba(248,113,113,0.2) !important; }
        .modal-close:hover { background: rgba(255,255,255,0.1) !important; }
        .req-card:hover { border-color: rgba(124,92,252,0.2) !important; }
        .btn-approve:hover { opacity: .85; }
        .btn-reject:hover  { opacity: .85; }
        .btn-add-new:hover { transform: translateY(-2px) !important; box-shadow: 0 10px 28px rgba(124,92,252,0.45) !important; }
      `}</style>

      {/* Header */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24, flexWrap:'wrap', gap:12, animation:'fadeInUp 0.5s ease both' }}>
        <div>
          <p style={{ fontSize:10, fontWeight:700, letterSpacing:'.1em', color:'#a78bfa', marginBottom:8, textTransform:'uppercase' }}>Dashboard</p>
          <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:28, fontWeight:700, color:T.text, marginBottom:4 }}>My Pet Listings</h2>
          <p style={{ color:T.text2, fontSize:14, margin:0 }}>Manage your listings and review adoption requests.</p>
        </div>
        <button
          onClick={() => navigate('/dashboard/add-pet')}
          className="btn-add-new"
          style={{
            padding:'11px 22px', borderRadius:50, fontWeight:700, fontSize:14,
            background:T.accent, color:'#fff', border:'none', cursor:'pointer',
            boxShadow:`0 6px 20px ${T.accentGlow}`, transition:'all 0.2s',
            fontFamily:"'DM Sans', sans-serif",
          }}
        >+ Add New Pet</button>
      </div>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(140px,1fr))', gap:14, marginBottom:28 }}>
        {STATS.map(({ l, v, bg, color, border }, i) => (
          <div key={l} style={{
            background:T.surface, borderRadius:16, border:`1px solid ${T.border}`,
            padding:'20px 18px', textAlign:'center',
            backdropFilter:'blur(12px)', animation:`fadeInUp 0.5s ease ${i*0.06}s both`,
          }}>
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:36, fontWeight:900, color, lineHeight:1, marginBottom:6 }}>{v}</div>
            <div style={{ fontSize:12, color:T.text3 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* Empty */}
      {pets.length === 0 ? (
        <div style={{
          textAlign:'center', padding:'64px 24px',
          background:T.surface, border:`1px solid ${T.border}`,
          borderRadius:20, backdropFilter:'blur(12px)',
        }}>
          <div style={{ fontSize:60, marginBottom:16 }}>🐾</div>
          <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:22, color:T.text, marginBottom:8 }}>No listings yet</h3>
          <p style={{ color:T.text2, marginBottom:24, fontSize:14 }}>Start by adding your first pet listing.</p>
          <button onClick={() => navigate('/dashboard/add-pet')} style={{
            padding:'12px 28px', borderRadius:50, fontWeight:700, fontSize:14,
            background:T.accent, color:'#fff', border:'none', cursor:'pointer',
            boxShadow:`0 6px 20px ${T.accentGlow}`, fontFamily:"'DM Sans',sans-serif",
          }}>Add First Pet</button>
        </div>
      ) : (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(270px,1fr))', gap:20 }}>
          {pets.map((pet, idx) => {
            const ss = petStatusStyle(pet.status);
            return (
              <div
                key={pet._id}
                className="listing-card"
                style={{
                  background:T.surface, borderRadius:18, border:`1px solid ${T.border}`,
                  overflow:'hidden', backdropFilter:'blur(12px)',
                  transition:'all 0.25s ease',
                  animation:`fadeInUp 0.5s ease ${(idx%6)*0.07}s both`,
                }}
              >
                {/* Image */}
                <div style={{ height:190, background:T.surface2, display:'flex', alignItems:'center', justifyContent:'center', fontSize:70, position:'relative', overflow:'hidden' }}>
                  {pet.imageURL
                    ? <img src={pet.imageURL} alt={pet.name} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                    : <span>{pet.species==='Dog'?'🐕':pet.species==='Cat'?'🐈':pet.species==='Bird'?'🦜':'🐰'}</span>
                  }
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(8,6,18,0.5) 0%,transparent 50%)', pointerEvents:'none' }} />
                  <span style={{
                    position:'absolute', top:12, right:12,
                    padding:'4px 12px', borderRadius:50, fontSize:11, fontWeight:700,
                    background:ss.bg, color:ss.color, border:ss.border,
                    backdropFilter:'blur(8px)',
                  }}>{pet.status}</span>
                </div>

                {/* Info */}
                <div style={{ padding:'16px 18px 18px' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:2 }}>
                    <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:18, color:T.text }}>{pet.name}</h3>
                    <span style={{
                      fontFamily:"'Playfair Display',serif", fontSize:14, fontWeight:700,
                      background:'linear-gradient(135deg,#a78bfa,#7c5cfc)',
                      WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
                    }}>৳{pet.adoptionFee?.toLocaleString()}</span>
                  </div>
                  <p style={{ fontSize:12, color:T.text3, marginBottom:14 }}>{pet.breed} · {pet.age}</p>

                  <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                    {[
                      { label:'📋 Requests', cls:'btn-req',   bg:'rgba(124,92,252,0.1)', color:'#a78bfa', border:'1px solid rgba(124,92,252,0.2)', action:()=>openRequests(pet) },
                      { label:'✏️ Edit',     cls:'btn-edit',  bg:T.surface2, color:T.text2, border:`1px solid ${T.border}`, action:()=>navigate(`/dashboard/edit-pet/${pet._id}`) },
                      { label:'👁 View',     cls:'btn-view2', bg:T.surface2, color:T.text2, border:`1px solid ${T.border}`, action:()=>navigate(`/pets/${pet._id}`) },
                      { label:'🗑 Delete',   cls:'btn-del',   bg:'rgba(248,113,113,0.1)', color:'#f87171', border:'1px solid rgba(248,113,113,0.2)', action:()=>handleDelete(pet._id) },
                    ].map(({ label, cls, bg, color, border, action }) => (
                      <button key={label} onClick={action} className={cls} style={{
                        padding:'6px 12px', borderRadius:50, fontSize:11, fontWeight:600,
                        background:bg, color, border, cursor:'pointer', transition:'all 0.15s',
                        fontFamily:"'DM Sans',sans-serif",
                      }}>{label}</button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Requests Modal */}
      {reqModal && (
        <div
          style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.7)', backdropFilter:'blur(6px)', zIndex:200, display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}
          onClick={() => setReqModal(null)}
        >
          <div
            style={{
              background:'#0e0c1a', borderRadius:22, width:'100%', maxWidth:560,
              maxHeight:'85vh', overflowY:'auto',
              border:`1px solid rgba(255,255,255,0.1)`,
              boxShadow:'0 32px 80px rgba(0,0,0,0.7)',
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Modal header */}
            <div style={{
              padding:'22px 26px', display:'flex', alignItems:'center', justifyContent:'space-between',
              borderBottom:`1px solid ${T.border}`, position:'sticky', top:0,
              background:'#0e0c1a', zIndex:1, borderRadius:'22px 22px 0 0',
            }}>
              <div>
                <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:20, color:T.text, marginBottom:3 }}>
                  Requests for <span style={{ background:'linear-gradient(135deg,#a78bfa,#7c5cfc)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>{reqModal.name}</span>
                </h3>
                <p style={{ fontSize:12, color:T.text3, margin:0 }}>
                  {reqLoading ? 'Loading...' : `${requests.length} request${requests.length !== 1 ? 's' : ''}`}
                </p>
              </div>
              <button
                className="modal-close"
                onClick={() => setReqModal(null)}
                style={{
                  background:T.surface2, border:`1px solid ${T.border}`,
                  width:36, height:36, borderRadius:'50%', fontSize:16,
                  cursor:'pointer', transition:'background 0.2s', color:T.text2,
                  display:'flex', alignItems:'center', justifyContent:'center',
                }}
              >✕</button>
            </div>

            <div style={{ padding:'20px 26px 28px' }}>
              {reqLoading ? (
                <div style={{ textAlign:'center', padding:'40px 0', color:T.text3, fontSize:32 }}>🐾</div>
              ) : requests.length === 0 ? (
                <div style={{ textAlign:'center', padding:'40px 0' }}>
                  <div style={{ fontSize:52, marginBottom:14 }}>📭</div>
                  <p style={{ fontWeight:600, color:T.text2, marginBottom:6 }}>No adoption requests yet</p>
                  <p style={{ fontSize:13, color:T.text3 }}>Share your listing to attract more interest.</p>
                </div>
              ) : (
                <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                  {requests.map(r => {
                    const rs = REQ_STATUS[r.status] || REQ_STATUS.pending;
                    return (
                      <div key={r._id} className="req-card" style={{
                        background:T.surface, borderRadius:14, padding:18,
                        border:`1px solid ${T.border}`, transition:'border-color 0.2s',
                      }}>
                        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
                          <div>
                            <div style={{ fontWeight:600, fontSize:15, color:T.text }}>{r.requesterName}</div>
                            <div style={{ fontSize:12, color:T.text3 }}>{r.requesterEmail}</div>
                          </div>
                          <span style={{ padding:'4px 12px', borderRadius:50, fontSize:11, fontWeight:700, textTransform:'capitalize', background:rs.bg, color:rs.color, border:rs.border }}>{r.status}</span>
                        </div>
                        <p style={{ fontSize:13, color:T.text2, marginBottom:6 }}>
                          📅 Pickup: <strong style={{ color:T.text }}>{r.pickupDate}</strong>
                        </p>
                        <p style={{ fontSize:13, color:T.text2, fontStyle:'italic', marginBottom:14, lineHeight:1.6 }}>
                          "{r.message}"
                        </p>
                        {r.status === 'pending' && reqModal.status !== 'adopted' && (
                          <div style={{ display:'flex', gap:8 }}>
                            <button
                              className="btn-approve"
                              onClick={() => handleStatus(r._id, 'approved')}
                              style={{
                                padding:'8px 20px', borderRadius:50, fontSize:13, fontWeight:700,
                                background:'rgba(74,222,128,0.15)', color:'#4ade80',
                                border:'1px solid rgba(74,222,128,0.3)', cursor:'pointer',
                                transition:'opacity 0.2s', fontFamily:"'DM Sans',sans-serif",
                              }}
                            >✓ Approve</button>
                            <button
                              className="btn-reject"
                              onClick={() => handleStatus(r._id, 'rejected')}
                              style={{
                                padding:'8px 20px', borderRadius:50, fontSize:13, fontWeight:700,
                                background:'rgba(248,113,113,0.12)', color:'#f87171',
                                border:'1px solid rgba(248,113,113,0.25)', cursor:'pointer',
                                transition:'opacity 0.2s', fontFamily:"'DM Sans',sans-serif",
                              }}
                            >✗ Reject</button>
                          </div>
                        )}
                        {reqModal.status === 'adopted' && r.status === 'pending' && (
                          <p style={{ fontSize:12, color:T.text3, fontStyle:'italic', margin:0 }}>Pet already adopted — cannot action this request.</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyListingsPage;