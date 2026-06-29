import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyRequests, cancelRequest } from '../api/requests.api';
import LoadingSpinner from '../components/shared/LoadingSpinner';
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

const STATUS_STYLE = {
  pending:  { background: 'rgba(250,200,80,0.12)',  color: '#f5c842', border: '1px solid rgba(250,200,80,0.2)' },
  approved: { background: 'rgba(74,222,128,0.1)',   color: '#4ade80', border: '1px solid rgba(74,222,128,0.2)' },
  rejected: { background: 'rgba(248,113,113,0.1)',  color: '#f87171', border: '1px solid rgba(248,113,113,0.2)' },
};

const MyRequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading]   = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getMyRequests()
      .then(res => setRequests(res.data.requests))
      .catch(() => toast.error('Failed to load requests'))
      .finally(() => setLoading(false));
  }, []);

  const handleCancel = async (id) => {
    if (!window.confirm('Cancel this adoption request?')) return;
    try {
      await cancelRequest(id);
      toast.success('Request cancelled');
      setRequests(prev => prev.filter(r => r._id !== id));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to cancel');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div style={{
      background: T.bg, minHeight: '100vh',
      fontFamily: "'DM Sans', sans-serif",
      paddingTop: 64,
      position: 'relative', overflow: 'hidden',
    }}>
      <style>{`
        @keyframes fadeInUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:none} }
        @keyframes pulse { 0%,100%{opacity:0.55} 50%{opacity:1} }
        .req-row:hover { background: rgba(255,255,255,0.05) !important; }
        .btn-view:hover { background: rgba(124,92,252,0.15) !important; color: #a78bfa !important; border-color: rgba(124,92,252,0.3) !important; }
        .btn-cancel:hover { opacity: 0.8; }
        .btn-browse:hover { transform: translateY(-2px) !important; box-shadow: 0 12px 32px rgba(124,92,252,0.45) !important; }
      `}</style>

      {/* Ambient orbs */}
      <div style={{ position:'fixed', top:'8%', right:'8%', width:380, height:380, borderRadius:'50%', background:'radial-gradient(circle,rgba(100,60,220,0.16) 0%,transparent 70%)', pointerEvents:'none', zIndex:0, filter:'blur(2px)' }} />
      <div style={{ position:'fixed', bottom:'10%', left:'5%', width:260, height:260, borderRadius:'50%', background:'radial-gradient(circle,rgba(80,40,180,0.1) 0%,transparent 70%)', pointerEvents:'none', zIndex:0 }} />

      <div style={{ maxWidth: 1020, margin: '0 auto', padding: '48px 28px', position:'relative', zIndex:1 }}>

        {/* Header */}
        <div style={{ marginBottom: 36, animation: 'fadeInUp 0.5s ease both' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(124,92,252,0.12)', border:'1px solid rgba(124,92,252,0.25)', borderRadius:50, padding:'5px 14px', marginBottom:18 }}>
            <span style={{ width:5, height:5, borderRadius:'50%', background:'#a78bfa', display:'inline-block', animation:'pulse 2s ease-in-out infinite' }} />
            <span style={{ fontSize:10, fontWeight:700, color:'#b8a0ff', letterSpacing:'.08em', textTransform:'uppercase' }}>Your Requests</span>
          </div>
          <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:'clamp(26px,4vw,38px)', fontWeight:700, color:T.text, marginBottom:8 }}>
            My Adoption Requests
          </h2>
          <p style={{ color:T.text2, fontSize:14, margin:0 }}>Track all your adoption requests in one place.</p>
        </div>

        {requests.length === 0 ? (
          /* Empty state */
          <div style={{
            textAlign:'center', padding:'72px 24px',
            background:T.surface, border:`1px solid ${T.border}`,
            borderRadius:20, backdropFilter:'blur(12px)',
            animation:'fadeInUp 0.5s ease both',
          }}>
            <div style={{ fontSize:64, marginBottom:20 }}>📋</div>
            <h3 style={{ fontFamily:"'Playfair Display', serif", fontSize:22, color:T.text, marginBottom:10 }}>No requests yet</h3>
            <p style={{ color:T.text2, fontSize:14, marginBottom:32 }}>Browse our pets and submit your first adoption request!</p>
            <button
              onClick={() => navigate('/pets')}
              className="btn-browse"
              style={{
                padding:'13px 32px', borderRadius:50, fontWeight:700, fontSize:14,
                background:T.accent, color:'#fff', border:'none', cursor:'pointer',
                boxShadow:`0 8px 24px ${T.accentGlow}`, transition:'all 0.25s',
                fontFamily:"'DM Sans', sans-serif",
              }}
            >Browse Pets 🐾</button>
          </div>
        ) : (
          <>
            {/* Summary chips */}
            <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:20, animation:'fadeInUp 0.5s ease 0.05s both' }}>
              {['pending','approved','rejected'].map(s => {
                const count = requests.filter(r => r.status === s).length;
                if (!count) return null;
                return (
                  <span key={s} style={{
                    padding:'5px 14px', borderRadius:50, fontSize:12, fontWeight:700,
                    textTransform:'capitalize', ...(STATUS_STYLE[s] || {}),
                  }}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}: {count}
                  </span>
                );
              })}
            </div>

            {/* Table card */}
            <div style={{
              background:T.surface, border:`1px solid ${T.border}`,
              borderRadius:20, overflow:'hidden',
              backdropFilter:'blur(12px)',
              boxShadow:'0 20px 50px rgba(0,0,0,0.3)',
              animation:'fadeInUp 0.5s ease 0.1s both',
            }}>
              <div style={{ overflowX:'auto' }}>
                <table style={{ width:'100%', borderCollapse:'collapse', minWidth:580 }}>
                  <thead>
                    <tr style={{ background:'rgba(255,255,255,0.04)', borderBottom:`1px solid ${T.border}` }}>
                      {['Pet Name','Request Date','Pickup Date','Status','Actions'].map(h => (
                        <th key={h} style={{
                          padding:'14px 18px', textAlign:'left',
                          fontSize:10, fontWeight:700, color:T.text3,
                          textTransform:'uppercase', letterSpacing:'.08em', whiteSpace:'nowrap',
                        }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map((req, i) => (
                      <tr
                        key={req._id}
                        className="req-row"
                        style={{
                          borderTop:`1px solid ${T.border}`,
                          background:'transparent',
                          transition:'background 0.15s',
                          animation:`fadeInUp 0.4s ${i * 0.05}s both`,
                        }}
                      >
                        <td style={{ padding:'15px 18px', fontWeight:600, fontSize:14, color:T.text }}>{req.petName}</td>
                        <td style={{ padding:'15px 18px', fontSize:13, color:T.text2, whiteSpace:'nowrap' }}>
                          {new Date(req.createdAt).toLocaleDateString('en-BD', { day:'numeric', month:'short', year:'numeric' })}
                        </td>
                        <td style={{ padding:'15px 18px', fontSize:13, color:T.text2, whiteSpace:'nowrap' }}>{req.pickupDate}</td>
                        <td style={{ padding:'15px 18px' }}>
                          <span style={{
                            padding:'4px 12px', borderRadius:50, fontSize:11,
                            fontWeight:700, textTransform:'capitalize',
                            ...(STATUS_STYLE[req.status] || {}),
                          }}>{req.status}</span>
                        </td>
                        <td style={{ padding:'15px 18px' }}>
                          <div style={{ display:'flex', gap:6 }}>
                            {req.petId && (
                              <button
                                className="btn-view"
                                onClick={() => navigate(`/pets/${req.petId?._id || req.petId}`)}
                                style={{
                                  padding:'6px 14px', borderRadius:50, fontSize:12, fontWeight:600,
                                  background:'rgba(255,255,255,0.05)', color:T.text2,
                                  border:`1px solid ${T.border}`, cursor:'pointer', transition:'all 0.15s',
                                  fontFamily:"'DM Sans', sans-serif",
                                }}
                              >View Pet</button>
                            )}
                            {req.status === 'pending' && (
                              <button
                                className="btn-cancel"
                                onClick={() => handleCancel(req._id)}
                                style={{
                                  padding:'6px 14px', borderRadius:50, fontSize:12, fontWeight:600,
                                  background:'rgba(248,113,113,0.1)', color:'#f87171',
                                  border:'1px solid rgba(248,113,113,0.2)', cursor:'pointer',
                                  transition:'opacity 0.2s', fontFamily:"'DM Sans', sans-serif",
                                }}
                              >Cancel</button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyRequestsPage;