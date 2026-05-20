import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { loginUser, googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) { toast.error('Please fill all fields'); return; }
    setLoading(true);
    try {
      await loginUser(email, password);
      toast.success('Welcome back! 🐾');
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

  return (
    <div style={{
      minHeight: '100vh', background: '#0E0C0A',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '24px 16px',
      fontFamily: "'Inter', sans-serif",
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 28 }}>
        <span style={{ fontSize: 22 }}>🐾</span>
        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: '#F5F0EA' }}>PawsHome</span>
      </div>

      {/* Card */}
      <div style={{
        width: '100%', maxWidth: 420,
        background: '#1C1814',
        borderRadius: 24,
        border: '1px solid rgba(255,255,255,.07)',
        overflow: 'hidden',
        boxShadow: '0 32px 80px rgba(0,0,0,.6)',
      }}>
        {/* Hero Image */}
        <div style={{
          height: 200, overflow: 'hidden', position: 'relative',
          background: 'linear-gradient(135deg, #3D1E10 0%, #5C2E18 50%, #7A3A1E 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, transparent 40%, #1C1814 100%)',
            zIndex: 1,
          }}/>
          <div style={{ fontSize: 100, opacity: .25, userSelect: 'none', filter: 'blur(1px)' }}>🐕🐈</div>
          <div style={{
            position: 'absolute', bottom: 20, left: 0, right: 0,
            textAlign: 'center', zIndex: 2,
          }}>
            <div style={{
              display: 'inline-flex', gap: 6, background: 'rgba(240,134,106,.15)',
              border: '1px solid rgba(240,134,106,.25)', borderRadius: 20,
              padding: '5px 14px',
            }}>
              <span style={{ fontSize: 11, color: '#F0866A', fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase' }}>
                Pet Adoption Platform
              </span>
            </div>
          </div>
        </div>

        {/* Form */}
        <div style={{ padding: '28px 28px 32px' }}>
          <h2 style={{
            fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 700,
            color: '#F5F0EA', marginBottom: 6, textAlign: 'center',
          }}>Welcome Back</h2>
          <p style={{ fontSize: 13, color: '#7A6858', textAlign: 'center', marginBottom: 28 }}>
            Ready to find your new best friend?
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Email */}
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#B8A898', display: 'block', marginBottom: 7, letterSpacing: '.04em' }}>
                EMAIL
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 15, color: '#4A3C2E' }}>✉</span>
                <input
                  type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="name@example.com" required
                  style={{
                    width: '100%', padding: '13px 14px 13px 42px',
                    background: '#242018', border: '1.5px solid rgba(255,255,255,.08)',
                    borderRadius: 12, fontSize: 14, color: '#F5F0EA',
                    transition: 'all .2s', outline: 'none',
                  }}
                  onFocus={e => e.target.style.borderColor = 'rgba(240,134,106,.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,.08)'}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#B8A898', letterSpacing: '.04em' }}>PASSWORD</label>
                <span style={{ fontSize: 12, color: '#F0866A', cursor: 'pointer', fontWeight: 500 }}>Forgot?</span>
              </div>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 15, color: '#4A3C2E' }}>🔒</span>
                <input
                  type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••" required
                  style={{
                    width: '100%', padding: '13px 44px 13px 42px',
                    background: '#242018', border: '1.5px solid rgba(255,255,255,.08)',
                    borderRadius: 12, fontSize: 14, color: '#F5F0EA',
                    transition: 'all .2s', outline: 'none',
                  }}
                  onFocus={e => e.target.style.borderColor = 'rgba(240,134,106,.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,.08)'}
                />
                <button
                  type="button" onClick={() => setShowPass(!showPass)}
                  style={{
                    position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: '#4A3C2E',
                    padding: 0, lineHeight: 1,
                  }}
                >{showPass ? '🙈' : '👁'}</button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit" disabled={loading}
              style={{
                width: '100%', padding: '14px',
                background: loading ? '#B8A898' : 'linear-gradient(135deg, #F0866A 0%, #E8724E 100%)',
                color: '#fff', border: 'none', borderRadius: 50,
                fontSize: 15, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
                marginTop: 4, letterSpacing: '.02em',
                boxShadow: loading ? 'none' : '0 8px 24px rgba(240,134,106,.35)',
                transition: 'all .2s', fontFamily: "'Syne', sans-serif",
              }}
            >
              {loading ? 'Logging in...' : 'Login →'}
            </button>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '2px 0' }}>
              <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,.07)' }} />
              <span style={{ fontSize: 11, color: '#4A3C2E', fontWeight: 600, letterSpacing: '.06em' }}>OR</span>
              <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,.07)' }} />
            </div>

            {/* Google */}
            <button
              type="button" onClick={handleGoogle} disabled={loading}
              style={{
                width: '100%', padding: '13px',
                background: '#242018', border: '1.5px solid rgba(255,255,255,.1)',
                borderRadius: 50, fontSize: 14, fontWeight: 600, color: '#F5F0EA',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                transition: 'all .2s', fontFamily: "'Inter', sans-serif",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(240,134,106,.3)'; e.currentTarget.style.background = '#2C261E'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,.1)'; e.currentTarget.style.background = '#242018'; }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            <p style={{ textAlign: 'center', fontSize: 13, color: '#7A6858', marginTop: 4 }}>
              New to PawsHome?{' '}
              <Link to="/register" style={{ color: '#F0866A', fontWeight: 600, textDecoration: 'none' }}>Create an account</Link>
            </p>
          </form>
        </div>
      </div>

      {/* Footer note */}
      <p style={{ fontSize: 12, color: '#2C261E', marginTop: 20 }}>
        © {new Date().getFullYear()} PawsHome. All rights reserved.
      </p>
    </div>
  );
};

export default LoginPage;
