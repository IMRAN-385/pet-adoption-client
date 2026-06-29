import { Link } from 'react-router-dom';
import { FaDog, FaCat, FaFeatherAlt, FaDove } from 'react-icons/fa';
import { FaFacebookF, FaXTwitter, FaYoutube } from 'react-icons/fa6';
import { MdEmail, MdPhone, MdLocationOn, MdAccessTime } from 'react-icons/md';
import { BsArrowRight } from 'react-icons/bs';

const SPECIES_LINKS = [
  { label: 'Dogs',    species: 'Dog',    icon: <FaDog size={13} /> },
  { label: 'Cats',    species: 'Cat',    icon: <FaCat size={13} /> },
  { label: 'Birds',   species: 'Bird',   icon: <FaFeatherAlt size={13} /> },
  { label: 'Rabbits', species: 'Rabbit', icon: <FaDove size={13} /> },
];

const CONTACT = [
  { icon: <MdEmail size={15} />,      text: 'hello@pawshome.com' },
  { icon: <MdPhone size={15} />,      text: '+880 1234-567890' },
  { icon: <MdLocationOn size={15} />, text: 'Chittagong, Bangladesh' },
  { icon: <MdAccessTime size={15} />, text: 'Mon–Sat, 9am–6pm' },
];

const SOCIALS = [
  { label: 'Facebook', icon: <FaFacebookF size={13} /> },
  { label: 'Twitter',  icon: <FaXTwitter size={13} /> },
  { label: 'YouTube',  icon: <FaYoutube size={14} /> },
];

// Logo mark matching Navbar
const LogoMark = () => (
  <div style={{
    width: 34, height: 34, borderRadius: 9,
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.12)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  }}>
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1" y="2" width="14" height="3" rx="1" fill="white"/>
      <rect x="6.5" y="5" width="3" height="9" rx="1" fill="white"/>
    </svg>
  </div>
);

const Footer = () => (
  <footer style={{
    background: '#06040f',
    borderTop: '1px solid rgba(255,255,255,0.07)',
    color: 'rgba(240,238,255,0.55)',
    padding: '60px 24px 28px',
  }}>
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>

      {/* Main grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40, marginBottom: 48 }}>

        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <LogoMark />
            <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 18, color: '#f0eeff', letterSpacing: '-0.01em' }}>PawsHome</span>
          </div>
          <p style={{ fontSize: 13, lineHeight: 1.8, color: 'rgba(240,238,255,0.4)', maxWidth: 220 }}>
            Connecting loving pets with caring families across Bangladesh. Every pet deserves a forever home.
          </p>
          <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
            {SOCIALS.map(({ label, icon }) => (
              <a key={label} href="#" title={label} style={{
                width: 34, height: 34, borderRadius: '50%',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                textDecoration: 'none', transition: 'all 0.2s', color: 'rgba(240,238,255,0.4)',
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(124,92,252,0.2)';
                  e.currentTarget.style.color = '#a78bfa';
                  e.currentTarget.style.borderColor = 'rgba(124,92,252,0.35)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                  e.currentTarget.style.color = 'rgba(240,238,255,0.4)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                }}
              >{icon}</a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ color: 'rgba(240,238,255,0.9)', fontSize: 11, fontWeight: 700, marginBottom: 18, textTransform: 'uppercase', letterSpacing: '.08em' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[['/', 'Home'], ['/pets', 'All Pets'], ['/pet-care', 'Pet Care Tips'], ['/dashboard', 'Dashboard'], ['/my-requests', 'My Requests']].map(([to, label]) => (
              <li key={to}>
                <Link to={to} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'rgba(240,238,255,0.4)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#a78bfa'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(240,238,255,0.4)'}
                >
                  <BsArrowRight size={11} /> {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Pet Categories */}
        <div>
          <h4 style={{ color: 'rgba(240,238,255,0.9)', fontSize: 11, fontWeight: 700, marginBottom: 18, textTransform: 'uppercase', letterSpacing: '.08em' }}>Pet Categories</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {SPECIES_LINKS.map(({ label, species, icon }) => (
              <li key={species}>
                <Link to={`/pets?species=${species}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 13, color: 'rgba(240,238,255,0.4)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#a78bfa'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(240,238,255,0.4)'}
                >
                  {icon} {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 style={{ color: 'rgba(240,238,255,0.9)', fontSize: 11, fontWeight: 700, marginBottom: 18, textTransform: 'uppercase', letterSpacing: '.08em' }}>Contact Us</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {CONTACT.map(({ icon, text }) => (
              <li key={text} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ flexShrink: 0, color: '#7c5cfc', marginTop: 1 }}>{icon}</span>
                <span style={{ fontSize: 13, color: 'rgba(240,238,255,0.4)', lineHeight: 1.5 }}>{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Newsletter strip */}
      <div style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
        backdropFilter: 'blur(12px)',
        borderRadius: 16, padding: '24px 28px', marginBottom: 36,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 16,
      }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#f0eeff', marginBottom: 4 }}>
            Stay updated with new arrivals
          </div>
          <div style={{ fontSize: 13, color: 'rgba(240,238,255,0.4)' }}>Get notified when new pets are available for adoption.</div>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <input
            type="email"
            placeholder="Your email address"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 9, padding: '10px 16px',
              fontSize: 13, color: '#f0eeff',
              minWidth: 210, outline: 'none',
              backdropFilter: 'blur(8px)',
            }}
            onFocus={e => e.currentTarget.style.borderColor = 'rgba(124,92,252,0.4)'}
            onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
          />
          <button style={{
            padding: '10px 22px',
            background: '#7c5cfc', color: '#fff',
            border: 'none', borderRadius: 9,
            fontSize: 13, fontWeight: 700, cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: '0 4px 16px rgba(124,92,252,0.3)',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = '#6a4ae0'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#7c5cfc'; e.currentTarget.style.transform = 'none'; }}
          >Subscribe</button>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        paddingTop: 24,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: 10,
      }}>
        <p style={{ fontSize: 12, color: 'rgba(240,238,255,0.25)' }}>
          © {new Date().getFullYear()} PawsHome. All rights reserved.
        </p>
        <div style={{ display: 'flex', gap: 20 }}>
          {['Privacy Policy', 'Terms of Service'].map(t => (
            <a key={t} href="#" style={{ fontSize: 12, color: 'rgba(240,238,255,0.25)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#a78bfa'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(240,238,255,0.25)'}
            >{t}</a>
          ))}
        </div>
      </div>

    </div>
  </footer>
);

export default Footer;