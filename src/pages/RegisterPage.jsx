import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { FaPaw } from "react-icons/fa";

// Dark theme tokens — same as Navbar & LoginPage
const T = {
  bg:        '#080612',
  border:    'rgba(255,255,255,0.08)',
  text:      '#f0eeff',
  text2:     'rgba(240,238,255,0.55)',
  text3:     'rgba(240,238,255,0.3)',
  accent:    '#7c5cfc',
  accentGlow:'rgba(124,92,252,0.25)',
  glass:     'rgba(255,255,255,0.04)',
};

const RegisterPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', photo: '' });
  const [showPass, setShowPass]       = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading]         = useState(false);

  const { registerUser, googleLogin } = useAuth();
  const navigate = useNavigate();

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    const { name, email, password, confirm, photo } = form;
    if (!name.trim() || !email.trim() || !password.trim()) { toast.error('Please fill all required fields'); return; }
    if (password !== confirm) { toast.error('Passwords do not match'); return; }
    if (password.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    try {
      setLoading(true);
      await registerUser(email, password, name, photo);
      toast.success('Welcome to PawsHome! 🐾');
      navigate('/');
    } catch (err) {
      toast.error(err?.response?.data?.message || err?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await googleLogin();
    } catch (err) {
      setLoading(false);
      toast.error(err?.message || 'Google login failed');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: T.bg,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '104px 20px 40px',
      fontFamily: "'DM Sans', sans-serif",
      position: 'relative', overflow: 'hidden',
    }}>
      <style>{`
        @keyframes floatA { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-14px) rotate(6deg)} }
        @keyframes floatB { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-9px) rotate(-8deg)} }
        @keyframes pulse  { 0%,100%{opacity:0.55} 50%{opacity:1} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:none} }
        .reg-inp {
          width: 100%; padding: 13px 14px 13px 42px;
          background: rgba(255,255,255,0.04);
          border: 1.5px solid rgba(255,255,255,0.09);
          border-radius: 12px; font-size: 14px; color: #f0eeff;
          outline: none; transition: border-color .25s;
          font-family: 'DM Sans', sans-serif; box-sizing: border-box;
        }
        .reg-inp:focus { border-color: rgba(124,92,252,0.55); }
        .reg-inp::placeholder { color: rgba(240,238,255,0.28); }
        .reg-inp-no-icon {
          width: 100%; padding: 13px 14px;
          background: rgba(255,255,255,0.04);
          border: 1.5px solid rgba(255,255,255,0.09);
          border-radius: 12px; font-size: 14px; color: #f0eeff;
          outline: none; transition: border-color .25s;
          font-family: 'DM Sans', sans-serif; box-sizing: border-box;
        }
        .reg-inp-no-icon:focus { border-color: rgba(124,92,252,0.55); }
        .reg-inp-no-icon::placeholder { color: rgba(240,238,255,0.28); }
        .reg-btn-primary {
          width: 100%; padding: 14px 0; border: none; border-radius: 50px;
          background: linear-gradient(135deg, #7c5cfc, #9b7dfd);
          color: #fff; font-size: 15px; font-weight: 700;
          cursor: pointer; transition: all .25s; font-family: 'DM Sans', sans-serif;
          box-shadow: 0 8px 28px rgba(124,92,252,0.35);
        }
        .reg-btn-primary:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 12px 36px rgba(124,92,252,0.5); }
        .reg-btn-primary:disabled { background: rgba(124,92,252,0.3); color: rgba(240,238,255,0.4); cursor: not-allowed; box-shadow: none; }
        .reg-btn-google {
          width: 100%; padding: 13px 0;
          background: rgba(255,255,255,0.04);
          border: 1.5px solid rgba(255,255,255,0.09);
          border-radius: 50px; color: #f0eeff; font-weight: 600;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          gap: 10px; transition: all .25s; font-family: 'DM Sans', sans-serif; font-size: 14px;
        }
        .reg-btn-google:hover:not(:disabled) { border-color: rgba(124,92,252,0.3); background: rgba(124,92,252,0.08); }
        .show-btn {
          position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
          background: none; border: none; color: #a78bfa; cursor: pointer;
          font-weight: 700; font-size: 11px; letter-spacing: .06em;
          font-family: 'DM Sans', sans-serif;
        }
      `}</style>

      {/* Ambient orbs */}
      <div style={{ position:'absolute', top:'8%', left:'58%', width:360, height:360, borderRadius:'50%', background:'radial-gradient(circle,rgba(100,60,220,0.2) 0%,transparent 70%)', pointerEvents:'none', filter:'blur(2px)' }} />
      <div style={{ position:'absolute', bottom:'6%', left:'15%', width:260, height:260, borderRadius:'50%', background:'radial-gradient(circle,rgba(80,40,180,0.12) 0%,transparent 70%)', pointerEvents:'none' }} />

      {/* Floating crystals */}
      <div style={{ position:'absolute', top:'10%', right:'5%', width:90, height:90, animation:'floatA 6s ease-in-out infinite', pointerEvents:'none', opacity:0.65 }}>
        <div style={{ width:'100%', height:'100%', background:'linear-gradient(135deg,rgba(160,120,255,0.7),rgba(80,40,200,0.4))', clipPath:'polygon(50% 0%,80% 20%,100% 60%,70% 100%,30% 100%,0% 60%,20% 20%)', borderRadius:6, boxShadow:'0 0 30px rgba(140,100,255,0.25)' }} />
      </div>
      <div style={{ position:'absolute', bottom:'15%', right:'8%', width:52, height:52, animation:'floatB 7s ease-in-out infinite', pointerEvents:'none', opacity:0.5 }}>
        <div style={{ width:'100%', height:'100%', background:'linear-gradient(135deg,rgba(200,160,255,0.6),rgba(100,60,220,0.3))', clipPath:'polygon(50% 0%,100% 38%,82% 100%,18% 100%,0% 38%)', borderRadius:3, boxShadow:'0 0 18px rgba(160,120,255,0.2)' }} />
      </div>
      <div style={{ position:'absolute', top:'55%', left:'4%', width:40, height:40, animation:'floatA 5s ease-in-out infinite 1s', pointerEvents:'none', opacity:0.4 }}>
        <div style={{ width:'100%', height:'100%', background:'linear-gradient(135deg,rgba(180,140,255,0.5),rgba(80,40,180,0.3))', clipPath:'polygon(50% 0%,100% 50%,50% 100%,0% 50%)', boxShadow:'0 0 14px rgba(140,100,255,0.18)' }} />
      </div>

      {/* Content */}
      <div style={{ position:'relative', zIndex:2, width:'100%', maxWidth:440, animation:'fadeUp 0.6s ease both' }}>

        {/* Logo — same as Navbar */}
        <div style={{ textAlign:'center', marginBottom:28 }}>
          <Link to="/" style={{ display:'inline-flex', alignItems:'center', gap:10, textDecoration:'none' }}>
            <div style={{
              width:36, height:36, borderRadius:10,
              background:'linear-gradient(135deg, #7c5cfc, #a78bfa)',
              display:'flex', alignItems:'center', justifyContent:'center',
              boxShadow:'0 4px 16px rgba(124,92,252,0.4)', flexShrink:0,
            }}>
              <FaPaw size={17} color="#fff" />
            </div>
            <span style={{ fontFamily:"'Playfair Display', serif", fontWeight:700, fontSize:22, color:T.text, letterSpacing:'-0.01em' }}>
              PawsHome
            </span>
          </Link>
        </div>

        {/* Glass card */}
        <div style={{
          background: T.glass,
          border: `1px solid ${T.border}`,
          borderRadius: 24,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          overflow: 'hidden',
          boxShadow: '0 30px 70px rgba(0,0,0,0.5), 0 0 0 1px rgba(124,92,252,0.08)',
        }}>

          {/* Banner */}
          <div style={{
            height: 130,
            background:'linear-gradient(160deg,rgba(60,20,120,0.6) 0%,rgba(100,50,200,0.35) 60%,rgba(40,10,80,0.5) 100%)',
            display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
            position:'relative', overflow:'hidden',
            borderBottom:`1px solid rgba(255,255,255,0.06)`,
          }}>
            <div style={{ position:'absolute', width:220, height:220, borderRadius:'50%', background:'rgba(124,92,252,0.12)', top:-60, right:-40, pointerEvents:'none' }} />
            <div style={{ position:'relative', zIndex:1, textAlign:'center' }}>
              <div style={{
                width:46, height:46, background:'linear-gradient(135deg, #7c5cfc, #a78bfa)',
                borderRadius:13, display:'flex', alignItems:'center', justifyContent:'center',
                margin:'0 auto 10px', boxShadow:'0 6px 20px rgba(124,92,252,0.4)',
              }}>
                <FaPaw size={20} color="#fff" />
              </div>
              <div style={{ display:'inline-flex', alignItems:'center', gap:6, background:'rgba(124,92,252,0.15)', border:'1px solid rgba(124,92,252,0.25)', borderRadius:50, padding:'4px 14px' }}>
                <span style={{ width:5, height:5, borderRadius:'50%', background:'#a78bfa', display:'inline-block', animation:'pulse 2s ease-in-out infinite' }} />
                <span style={{ fontSize:10, fontWeight:700, color:'#b8a0ff', letterSpacing:'.08em', textTransform:'uppercase' }}>Join PawsHome Today</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div style={{ padding:'28px 28px 26px' }}>
            <div style={{ textAlign:'center', marginBottom:24 }}>
              <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:26, color:T.text, margin:'0 0 6px', fontWeight:700 }}>Create Account</h2>
              <p style={{ fontSize:13, color:T.text2, margin:0 }}>Find your perfect companion today.</p>
            </div>

            <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:14 }}>

              {/* Name */}
              <div>
                <label style={{ fontSize:10, fontWeight:700, color:T.text3, display:'block', marginBottom:6, letterSpacing:'.1em', textTransform:'uppercase' }}>Full Name</label>
                <div style={{ position:'relative' }}>
                  <span style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', color:'rgba(124,92,252,0.6)', fontSize:14 }}>✦</span>
                  <input className="reg-inp" type="text" placeholder="Your full name" value={form.name} required onChange={set('name')} />
                </div>
              </div>

              {/* Email */}
              <div>
                <label style={{ fontSize:10, fontWeight:700, color:T.text3, display:'block', marginBottom:6, letterSpacing:'.1em', textTransform:'uppercase' }}>Email</label>
                <div style={{ position:'relative' }}>
                  <span style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', color:'rgba(124,92,252,0.6)', fontWeight:600, fontSize:15 }}>@</span>
                  <input className="reg-inp" type="email" placeholder="name@example.com" value={form.email} required onChange={set('email')} />
                </div>
              </div>

              {/* Photo URL */}
              <div>
                <label style={{ fontSize:10, fontWeight:700, color:T.text3, display:'block', marginBottom:6, letterSpacing:'.1em', textTransform:'uppercase' }}>Photo URL <span style={{ fontWeight:400, textTransform:'none', letterSpacing:0, color:'rgba(240,238,255,0.2)' }}>(optional)</span></label>
                <input className="reg-inp-no-icon" type="url" placeholder="https://..." value={form.photo} onChange={set('photo')} />
              </div>

              {/* Password */}
              <div>
                <label style={{ fontSize:10, fontWeight:700, color:T.text3, display:'block', marginBottom:6, letterSpacing:'.1em', textTransform:'uppercase' }}>Password</label>
                <div style={{ position:'relative' }}>
                  <span style={{ position:'absolute', left:15, top:'50%', transform:'translateY(-50%)', color:'rgba(124,92,252,0.6)', fontWeight:600, fontSize:17, lineHeight:1 }}>*</span>
                  <input className="reg-inp" type={showPass ? 'text' : 'password'} placeholder="Min. 6 characters" value={form.password} required onChange={set('password')} style={{ paddingRight:60 }} />
                  <button type="button" className="show-btn" onClick={() => setShowPass(p => !p)}>{showPass ? 'HIDE' : 'SHOW'}</button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label style={{ fontSize:10, fontWeight:700, color:T.text3, display:'block', marginBottom:6, letterSpacing:'.1em', textTransform:'uppercase' }}>Confirm Password</label>
                <div style={{ position:'relative' }}>
                  <span style={{ position:'absolute', left:15, top:'50%', transform:'translateY(-50%)', color:'rgba(124,92,252,0.6)', fontWeight:600, fontSize:17, lineHeight:1 }}>*</span>
                  <input className="reg-inp" type={showConfirm ? 'text' : 'password'} placeholder="Repeat password" value={form.confirm} required onChange={set('confirm')} style={{ paddingRight:60 }} />
                  <button type="button" className="show-btn" onClick={() => setShowConfirm(p => !p)}>{showConfirm ? 'HIDE' : 'SHOW'}</button>
                </div>
              </div>

              {/* Submit */}
              <button type="submit" className="reg-btn-primary" disabled={loading} style={{ marginTop:6 }}>
                {loading ? 'Creating account...' : 'Create Account →'}
              </button>

              {/* Divider */}
              <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                <div style={{ flex:1, height:1, background:'rgba(255,255,255,0.07)' }} />
                <span style={{ fontSize:11, color:T.text3, fontWeight:700 }}>OR</span>
                <div style={{ flex:1, height:1, background:'rgba(255,255,255,0.07)' }} />
              </div>

              {/* Google */}
              <button type="button" className="reg-btn-google" onClick={handleGoogle} disabled={loading}>
                <svg width="17" height="17" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>

              <p style={{ textAlign:'center', fontSize:13, color:T.text2, margin:0 }}>
                Already have an account?{' '}
                <Link to="/login" style={{ color:'#a78bfa', textDecoration:'none', fontWeight:700 }}>Login</Link>
              </p>
            </form>
          </div>
        </div>

        <p style={{ textAlign:'center', marginTop:20, fontSize:11, color:'rgba(240,238,255,0.15)' }}>
          © {new Date().getFullYear()} PawsHome
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;