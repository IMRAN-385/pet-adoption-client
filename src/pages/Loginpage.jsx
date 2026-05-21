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
  transition: 'all .25s ease',
  fontFamily: "'Inter', sans-serif",
};

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const { loginUser, googleLogin } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const focus = (e) => {
    e.target.style.borderColor = 'rgba(240,134,106,.55)';
  };

  const blur = (e) => {
    e.target.style.borderColor = 'rgba(255,255,255,.08)';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (!email.trim() || !password.trim()) {
      toast.error('Please fill all fields');
      return;
    }

    try {
      setLoading(true);

      await loginUser(email, password);

      toast.success('Welcome back!');

      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);

      toast.error(
        err?.response?.data?.message ||
        'Invalid email or password'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    if (loading) return;

    try {
      setLoading(true);

      await googleLogin();

      toast.success('Logged in with Google!');

      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);

      toast.error(
        err?.response?.data?.message ||
        err?.message ||
        'Google login failed'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0E0C0A',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 16px',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 24,
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            background: '#F0866A',
            borderRadius: 9,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 16,
          }}
        >
          🐾
        </div>

        <span
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: 20,
            color: '#F5F0EA',
          }}
        >
          PawsHome
        </span>
      </div>

      {/* Card */}
      <div
        style={{
          width: '100%',
          maxWidth: 420,
          background: '#1C1814',
          borderRadius: 24,
          border: '1px solid rgba(255,255,255,.07)',
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0,0,0,.45)',
        }}
      >
        {/* Hero */}
        <div
          style={{
            height: 180,
            background:
              'linear-gradient(160deg, #2A1208 0%, #4A1E0C 60%, #3D1A18 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 48 }}>🐕 🐈</div>

            <p
              style={{
                color: '#F0866A',
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '.1em',
                marginTop: 10,
              }}
            >
              PET ADOPTION PLATFORM
            </p>
          </div>
        </div>

        {/* Form */}
        <div style={{ padding: '28px' }}>
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <h2
              style={{
                fontSize: 28,
                color: '#F5F0EA',
                fontWeight: 800,
                marginBottom: 6,
              }}
            >
              Welcome Back
            </h2>

            <p
              style={{
                fontSize: 13,
                color: '#7A6858',
              }}
            >
              Ready to find your new best friend?
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}
          >
            {/* Email */}
            <div>
              <label
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: '#7A6858',
                  display: 'block',
                  marginBottom: 7,
                  letterSpacing: '.08em',
                }}
              >
                EMAIL
              </label>

              <div style={{ position: 'relative' }}>
                <span
                  style={{
                    position: 'absolute',
                    left: 14,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#4A3C2E',
                  }}
                >
                  @
                </span>

                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  style={inputBase}
                  onFocus={focus}
                  onBlur={blur}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: '#7A6858',
                  display: 'block',
                  marginBottom: 7,
                  letterSpacing: '.08em',
                }}
              >
                PASSWORD
              </label>

              <div style={{ position: 'relative' }}>
                <span
                  style={{
                    position: 'absolute',
                    left: 14,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#4A3C2E',
                  }}
                >
                  *
                </span>

                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    ...inputBase,
                    paddingRight: 60,
                  }}
                  onFocus={focus}
                  onBlur={blur}
                />

                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  style={{
                    position: 'absolute',
                    right: 14,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: '#F0866A',
                    cursor: 'pointer',
                    fontWeight: 700,
                  }}
                >
                  {showPass ? 'HIDE' : 'SHOW'}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '14px 0',
                marginTop: 4,
                background: loading
                  ? '#2C261E'
                  : 'linear-gradient(135deg, #F0866A 0%, #D9623E 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: 50,
                fontSize: 15,
                fontWeight: 700,
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all .25s ease',
              }}
            >
              {loading ? 'Logging in...' : 'Login →'}
            </button>

            {/* Divider */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <div
                style={{
                  flex: 1,
                  height: 1,
                  background: 'rgba(255,255,255,.08)',
                }}
              />

              <span
                style={{
                  fontSize: 11,
                  color: '#5C4A38',
                  fontWeight: 700,
                }}
              >
                OR
              </span>

              <div
                style={{
                  flex: 1,
                  height: 1,
                  background: 'rgba(255,255,255,.08)',
                }}
              />
            </div>

            {/* Google Login */}
            <button
              type="button"
              onClick={handleGoogle}
              disabled={loading}
              style={{
                width: '100%',
                padding: '13px 0',
                background: '#242018',
                border: '1.5px solid rgba(255,255,255,.09)',
                borderRadius: 50,
                color: '#F5F0EA',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                transition: 'all .25s ease',
              }}
            >
              Continue with Google
            </button>

            {/* Register */}
            <p
              style={{
                textAlign: 'center',
                fontSize: 13,
                color: '#7A6858',
              }}
            >
              New to PawsHome?{' '}
              <Link
                to="/register"
                style={{
                  color: '#F0866A',
                  textDecoration: 'none',
                  fontWeight: 700,
                }}
              >
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>

      <p
        style={{
          marginTop: 20,
          fontSize: 11,
          color: '#2C1E14',
        }}
      >
        © {new Date().getFullYear()} PawsHome
      </p>
    </div>
  );
}