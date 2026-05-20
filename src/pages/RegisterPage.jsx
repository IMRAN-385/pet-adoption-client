import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const StrengthBar = ({ password }) => {
  const checks = [
    password.length >= 6,
    /[A-Z]/.test(password),
    /[a-z]/.test(password),
    /[0-9!@#$%^&*]/.test(password),
  ];
  const score = checks.filter(Boolean).length;
  const colors = ['#E85A5A', '#E8B84A', '#F0866A', '#4CAF82'];
  const labels = ['Weak', 'Fair', 'Good', 'Strong'];
  if (!password) return null;
  return (
    <div style={{ marginTop: 8 }}>
      <div style={{ display: 'flex', gap: 4, marginBottom: 5 }}>
        {[0,1,2,3].map(i => (
          <div key={i} style={{
            flex: 1, height: 3, borderRadius: 2,
            background: i < score ? colors[score - 1] : 'rgba(255,255,255,.08)',
            transition: 'background .3s',
          }}/>
        ))}
      </div>
      <span style={{ fontSize: 11, color: score > 0 ? colors[score - 1] : '#4A3C2E', fontWeight: 600 }}>
        {password ? labels[score - 1] || 'Weak' : ''}
      </span>
    </div>
  );
};

const CheckItem = ({ ok, text }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
    <div style={{
      width: 16, height: 16, borderRadius: '50%', flexShrink: 0,
      background: ok ? 'rgba(76,175,130,.15)' : 'rgba(255,255,255,.06)',
      border: `1px solid ${ok ? '#4CAF82' : 'rgba(255,255,255,.1)'}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      transition: 'all .2s',
    }}>
      {ok && <span style={{ color: '#4CAF82', fontSize: 9, fontWeight: 700 }}>✓</span>}
    </div>
    <span style={{ color: ok ? '#B8A898' : '#4A3C2E', transition: 'color .2s' }}>{text}</span>
  </div>
);

const RegisterPage = () => {
  const [form, setForm] = useState({ name: '', email: '', photoURL: '', password: '', confirm: '' });
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const { registerUser } = useAuth();
  const navigate = useNavigate();
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const checks = {
    length: form.password.length >= 6,
    upper: /[A-Z]/.test(form.password),
    lower: /[a-z]/.test(form.password),
    match: form.password === form.confirm && form.confirm.length > 0,
  };

  const validate = () => {
    const errs = [];
    if (!form.name.trim()) errs.push('Name is required');
    if (!form.email.trim()) errs.push('Email is required');
    if (!checks.length) errs.push('Password must be at least 6 characters');
    if (!checks.upper) errs.push('Password must contain an uppercase letter');
    if (!checks.lower) errs.push('Password must contain a lowercase letter');
    if (!checks.match) errs.push('Passwords do not match');
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (errs.length) { setErrors(errs); return; }
    setErrors([]);
    setLoading(true);
    try {
      await registerUser(form.name, form.email, form.password, form.photoURL);
      toast.success('Welcome to PawsHome! 🐾');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally { setLoading(false); }
  };

  const inputStyle = {
    width: '100%', padding: '13px 14px 13px 42px',
    background: '#242018', border: '1.5px solid rgba(255,255,255,.08)',
    borderRadius: 12, fontSize: 14, color: '#F5F0EA',
    transition: 'all .2s', outline: 'none',
  };

  const labelStyle = {
    fontSize: 12, fontWeight: 600, color: '#B8A898',
    display: 'block', marginBottom: 7, letterSpacing: '.04em',
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
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
        <span style={{ fontSize: 22 }}>🐾</span>
        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: '#F5F0EA' }}>PawsHome</span>
      </div>

      {/* Card */}
      <div style={{
        width: '100%', maxWidth: 440,
        background: '#1C1814', borderRadius: 24,
        border: '1px solid rgba(255,255,255,.07)',
        overflow: 'hidden',
        boxShadow: '0 32px 80px rgba(0,0,0,.6)',
      }}>
        {/* Top accent bar */}
        <div style={{ height: 3, background: 'linear-gradient(90deg, #F0866A, #E8724E, #A07AE8)' }} />

        <div style={{ padding: '32px 28px' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div style={{
              width: 52, height: 52, borderRadius: 16,
              background: 'rgba(240,134,106,.12)',
              border: '1px solid rgba(240,134,106,.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 24, margin: '0 auto 14px',
            }}>🐾</div>
            <h2 style={{
              fontFamily: "'Syne', sans-serif", fontSize: 26, fontWeight: 700,
              color: '#F5F0EA', marginBottom: 6,
            }}>Join PawsHome</h2>
            <p style={{ fontSize: 13, color: '#7A6858' }}>
              Create an account and start your adoption journey
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Name */}
            <div>
              <label style={labelStyle}>FULL NAME</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 15, color: '#4A3C2E' }}>👤</span>
                <input
                  type="text" value={form.name} onChange={e => set('name', e.target.value)}
                  placeholder="John Doe" style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'rgba(240,134,106,.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,.08)'}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label style={labelStyle}>EMAIL ADDRESS</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 15, color: '#4A3C2E' }}>✉</span>
                <input
                  type="email" value={form.email} onChange={e => set('email', e.target.value)}
                  placeholder="you@example.com" style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'rgba(240,134,106,.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,.08)'}
                />
              </div>
            </div>

            {/* Photo URL */}
            <div>
              <label style={labelStyle}>PHOTO URL <span style={{ color: '#4A3C2E', fontWeight: 400 }}>(optional)</span></label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 15, color: '#4A3C2E' }}>🖼</span>
                <input
                  type="url" value={form.photoURL} onChange={e => set('photoURL', e.target.value)}
                  placeholder="https://i.ibb.co/your-photo" style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'rgba(240,134,106,.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,.08)'}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label style={labelStyle}>PASSWORD</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 15, color: '#4A3C2E' }}>🔒</span>
                <input
                  type={showPass ? 'text' : 'password'} value={form.password}
                  onChange={e => set('password', e.target.value)}
                  placeholder="Min. 6 characters"
                  style={{ ...inputStyle, paddingRight: 44 }}
                  onFocus={e => e.target.style.borderColor = 'rgba(240,134,106,.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,.08)'}
                />
                <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 15, color: '#4A3C2E', padding: 0 }}>
                  {showPass ? '🙈' : '👁'}
                </button>
              </div>
              <StrengthBar password={form.password} />

              {/* Password checklist */}
              {form.password.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginTop: 10, padding: '10px 12px', background: 'rgba(255,255,255,.03)', borderRadius: 10, border: '1px solid rgba(255,255,255,.05)' }}>
                  <CheckItem ok={checks.length} text="At least 6 characters" />
                  <CheckItem ok={checks.upper} text="One uppercase letter (A-Z)" />
                  <CheckItem ok={checks.lower} text="One lowercase letter (a-z)" />
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label style={labelStyle}>CONFIRM PASSWORD</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 15, color: '#4A3C2E' }}>🔐</span>
                <input
                  type={showConfirm ? 'text' : 'password'} value={form.confirm}
                  onChange={e => set('confirm', e.target.value)}
                  placeholder="Re-enter your password"
                  style={{
                    ...inputStyle,
                    paddingRight: 44,
                    borderColor: form.confirm.length > 0
                      ? checks.match ? 'rgba(76,175,130,.4)' : 'rgba(232,90,90,.4)'
                      : 'rgba(255,255,255,.08)',
                  }}
                  onFocus={e => {
                    e.target.style.borderColor = form.confirm.length > 0
                      ? checks.match ? 'rgba(76,175,130,.6)' : 'rgba(232,90,90,.6)'
                      : 'rgba(240,134,106,.5)';
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = form.confirm.length > 0
                      ? checks.match ? 'rgba(76,175,130,.4)' : 'rgba(232,90,90,.4)'
                      : 'rgba(255,255,255,.08)';
                  }}
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 15, color: '#4A3C2E', padding: 0 }}>
                  {showConfirm ? '🙈' : '👁'}
                </button>
              </div>
              {form.confirm.length > 0 && (
                <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 12 }}>{checks.match ? '✅' : '❌'}</span>
                  <span style={{ fontSize: 12, color: checks.match ? '#4CAF82' : '#E85A5A', fontWeight: 500 }}>
                    {checks.match ? 'Passwords match' : 'Passwords do not match'}
                  </span>
                </div>
              )}
            </div>

            {/* Errors */}
            {errors.length > 0 && (
              <div style={{
                background: 'rgba(232,90,90,.1)', border: '1px solid rgba(232,90,90,.25)',
                borderRadius: 12, padding: '12px 14px',
              }}>
                {errors.map((err, i) => (
                  <p key={i} style={{ fontSize: 12.5, color: '#E85A5A', marginBottom: i < errors.length - 1 ? 4 : 0 }}>
                    • {err}
                  </p>
                ))}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit" disabled={loading}
              style={{
                width: '100%', padding: '14px',
                background: loading ? '#4A3C2E' : 'linear-gradient(135deg, #F0866A 0%, #E8724E 100%)',
                color: '#fff', border: 'none', borderRadius: 50,
                fontSize: 15, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
                marginTop: 4, letterSpacing: '.02em',
                boxShadow: loading ? 'none' : '0 8px 24px rgba(240,134,106,.3)',
                transition: 'all .2s', fontFamily: "'Syne', sans-serif",
              }}
            >
              {loading ? 'Creating account...' : 'Create Account 🐾'}
            </button>

            <p style={{ textAlign: 'center', fontSize: 13, color: '#7A6858' }}>
              Already have an account?{' '}
              <Link to="/login" style={{ color: '#F0866A', fontWeight: 600, textDecoration: 'none' }}>Login</Link>
            </p>
          </form>
        </div>
      </div>

      <p style={{ fontSize: 12, color: '#2C261E', marginTop: 20 }}>
        © {new Date().getFullYear()} PawsHome. All rights reserved.
      </p>
    </div>
  );
};

export default RegisterPage;
