import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const inputBase = {
  width: '100%',
  padding: '13px 14px 13px 42px',
  background: '#242018',
  border: '1.5px solid rgba(255,255,255,.08)',
  borderRadius: 12,
  fontSize: 14,
  color: '#F5F0EA',
  outline: 'none',
  transition: 'border-color .2s',
  fontFamily: "'Inter', sans-serif",
};

export default function LoginPage() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const { loginUser, googleLogin } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();
  const from = location.state?.from?.pathname || '/';

  const focus = e => { e.target.style.borderColor = 'rgba(240,134,106,.55)'; };
  const blur  = e => { e.target.style.borderColor = 'rgba(255,255,255,.08)'; };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) { toast.error('Please fill all fields'); return; }
    setLoading(true);
    try {
      await loginUser(email, password);
      toast.success('Welcome back!');
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid email or password');
    } finally { setLoading(false); }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      await googleLogin();
      toast.success('Logged in with Google!');
      navigate(from, { replace: true });
    } catch { toast.error('Google login failed. Try again.'); }
    finally { setLoading(false); }
  };

  // 🔁 নতুন ফিচার: ফরগট পাসওয়ার্ড
  const handleForgotPassword = () => {
    toast('Password reset feature coming soon! 🔜', { icon: '🔐' });
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0E0C0A',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '32px 16px',
      fontFamily: "'Inter', sans-serif",
    }}>

      {/* Logo */}
      <div style={{ display:'flex', alignItems:'center', gap: 8, marginBottom: 24 }}>
        <div style={{
          width: 32, height: 32, background: '#F0866A', borderRadius: 9,
          display:'flex', alignItems:'center', justifyContent:'center', fontSize: 16,
        }}>🐾</div>
        <span style={{
          fontFamily:"'Syne', sans-serif", fontWeight: 800,
          fontSize: 20, color:'#F5F0EA', letterSpacing:'-.01em',
        }}>PawsHome</span>
      </div>

      {/* Card */}
      <div style={{
        width:'100%', maxWidth: 420,
        background:'#1C1814',
        borderRadius: 24,
        border:'1px solid rgba(255,255,255,.07)',
        boxShadow:'0 32px 80px rgba(0,0,0,.55), 0 0 0 1px rgba(255,255,255,.03)',
        overflow:'hidden',
      }}>

        {/* Hero area */}
        <div style={{
          height: 180,
          background: 'linear-gradient(160deg, #2A1208 0%, #4A1E0C 60%, #3D1A18 100%)',
          position: 'relative',
          display:'flex', alignItems:'center', justifyContent:'center',
          overflow:'hidden',
        }}>
          {/* Background circles */}
          <div style={{ position:'absolute', width: 260, height: 260, borderRadius:'50%', background:'rgba(240,134,106,.06)', top:-60, right:-60 }}/>
          <div style={{ position:'absolute', width: 180, height: 180, borderRadius:'50%', background:'rgba(240,134,106,.04)', bottom:-50, left:-40 }}/>

          {/* Fade overlay */}
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, transparent 50%, #1C1814 100%)', zIndex: 2 }}/>

          {/* Content */}
          <div style={{ position:'relative', zIndex: 3, textAlign:'center' }}>
            <div style={{ fontSize: 48, marginBottom: 10, filter:'drop-shadow(0 4px 12px rgba(0,0,0,.4))' }}>🐕 🐈</div>
            <div style={{
              display:'inline-flex', alignItems:'center', gap: 6,
              background:'rgba(240,134,106,.12)',
              border:'1px solid rgba(240,134,106,.22)',
              borderRadius: 20, padding:'5px 14px',
            }}>
              <div style={{ width: 6, height: 6, borderRadius:'50%', background:'#F0866A' }}/>
              <span style={{ fontSize: 11, color:'#F0866A', fontWeight: 700, letterSpacing:'.1em', textTransform:'uppercase' }}>
                Pet Adoption Platform
              </span>
            </div>
          </div>
        </div>

        {/* Form */}
        <div style={{ padding:'28px 28px 32px' }}>

          <div style={{ textAlign:'center', marginBottom: 28 }}>
            <h2 style={{
              fontFamily:"'Syne', sans-serif", fontWeight: 800,
              fontSize: 26, color:'#F5F0EA', marginBottom: 6, letterSpacing:'-.02em',
            }}>Welcome Back</h2>
            <p style={{ fontSize: 13, color:'#5C4A38' }}>
              Ready to find your new best friend?
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap: 14 }}>

            {/* Email */}
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color:'#7A6858', display:'block', marginBottom: 7, letterSpacing:'.08em' }}>
                EMAIL
              </label>
              <div style={{ position:'relative' }}>
                <span style={{
                  position:'absolute', left: 14, top:'50%', transform:'translateY(-50%)',
                  fontSize: 13, color:'#4A3C2E', lineHeight: 1, fontWeight: 500,
                }}>@</span>
                <input
                  type="email" value={email} placeholder="name@example.com" required
                  onChange={e => setEmail(e.target.value)}
                  style={inputBase} onFocus={focus} onBlur={blur}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom: 7 }}>
                <label style={{ fontSize: 11, fontWeight: 700, color:'#7A6858', letterSpacing:'.08em' }}>PASSWORD</label>
                <span
                  onClick={handleForgotPassword}
                  style={{ fontSize: 12, color:'#F0866A', cursor:'pointer', fontWeight: 600 }}
                >
                  Forgot?
                </span>
              </div>
              <div style={{ position:'relative' }}>
                <span style={{
                  position:'absolute', left: 14, top:'50%', transform:'translateY(-50%)',
                  fontSize: 13, color:'#4A3C2E', lineHeight: 1, fontWeight: 500,
                }}>*</span>
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password} placeholder="••••••••" required
                  onChange={e => setPassword(e.target.value)}
                  style={{ ...inputBase, paddingRight: 60 }}
                  onFocus={focus} onBlur={blur}
                />
                <button
                  type="button" onClick={() => setShowPass(p => !p)}
                  style={{
                    position:'absolute', right: 14, top:'50%', transform:'translateY(-50%)',
                    background:'none', border:'none', cursor:'pointer',
                    color:'#4A3C2E', fontSize: 13, fontWeight: 700,
                    fontFamily:"'Inter',sans-serif", padding: 0, letterSpacing:'.04em',
                  }}
                >{showPass ? 'HIDE' : 'SHOW'}</button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit" disabled={loading}
              style={{
                width:'100%', padding:'14px 0', marginTop: 6,
                background: loading
                  ? '#2C261E'
                  : 'linear-gradient(135deg, #F0866A 0%, #D9623E 100%)',
                color: loading ? '#5C4A38' : '#fff',
                border:'none', borderRadius: 50,
                fontSize: 15, fontWeight: 700,
                fontFamily:"'Syne', sans-serif",
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: loading ? 'none' : '0 8px 28px rgba(240,134,106,.3)',
                transition:'all .2s', letterSpacing:'.01em',
              }}
            >
              {loading ? 'Logging in...' : 'Login →'}
            </button>

            {/* Divider */}
            <div style={{ display:'flex', alignItems:'center', gap: 10 }}>
              <div style={{ flex:1, height:1, background:'rgba(255,255,255,.06)' }}/>
              <span style={{ fontSize: 11, color:'#3C2E22', fontWeight: 700, letterSpacing:'.08em' }}>OR</span>
              <div style={{ flex:1, height:1, background:'rgba(255,255,255,.06)' }}/>
            </div>

            {/* Google */}
            <button
              type="button" onClick={handleGoogle} disabled={loading}
              style={{
                width:'100%', padding:'13px 0',
                background:'#242018',
                border:'1.5px solid rgba(255,255,255,.09)',
                borderRadius: 50,
                fontSize: 14, fontWeight: 600, color:'#F5F0EA',
                cursor:'pointer',
                display:'flex', alignItems:'center', justifyContent:'center', gap: 10,
                transition:'all .2s', fontFamily:"'Inter', sans-serif",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(240,134,106,.3)'; e.currentTarget.style.background='#2C261E'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,.09)'; e.currentTarget.style.background='#242018'; }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            <p style={{ textAlign:'center', fontSize: 13, color:'#5C4A38', paddingTop: 2 }}>
              New to PawsHome?{' '}
              <Link to="/register" style={{ color:'#F0866A', fontWeight: 700, textDecoration:'none' }}>
                Create an account
              </Link>
            </p>

          </form>
        </div>
      </div>

      <p style={{ fontSize: 11, color:'#2C1E14', marginTop: 20, letterSpacing:'.02em' }}>
        © {new Date().getFullYear()} PawsHome · All rights reserved
      </p>
    </div>
  );
}