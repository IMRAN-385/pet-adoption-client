import { Link } from 'react-router-dom';
import { FaPaw, FaDog, FaCat, FaFeatherAlt, FaDove } from 'react-icons/fa';
import { FaFacebookF, FaXTwitter, FaYoutube } from 'react-icons/fa6';
import { MdEmail, MdPhone, MdLocationOn, MdAccessTime } from 'react-icons/md';
import { BsArrowRight } from 'react-icons/bs';

const SPECIES_LINKS = [
  { label: 'Dogs',    species: 'Dog',    icon: <FaDog size={13} /> },
  { label: 'Cats',    species: 'Cat',    icon: <FaCat size={13} /> },
  { label: 'Birds',   species: 'Bird',   icon: <FaFeatherAlt size={13} /> },
  { label: 'Rabbits', species: 'Rabbit', icon: <FaDove size={13} /> },
  { label: 'Others',  species: 'Other',  icon: <FaPaw size={13} /> },
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

const Footer = () => (
  <footer style={{ background: '#1A1208', color: '#e8d9cc', padding: '56px 24px 28px' }}>
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 36, marginBottom: 44 }}>

        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <div style={{ width: 34, height: 34, background: '#F0866A', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FaPaw size={16} color="#fff" />
            </div>
            <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 20, color: '#fff' }}>PawsHome</span>
          </div>
          <p style={{ fontSize: 13, lineHeight: 1.8, color: '#a8937a', maxWidth: 220 }}>
            Connecting loving pets with caring families across Bangladesh. Every pet deserves a forever home.
          </p>
          <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
            {SOCIALS.map(({ label, icon }) => (
              <a key={label} href="#" title={label} style={{
                width: 34, height: 34, borderRadius: '50%',
                background: '#2A1E12', border: '1px solid #3A2E22',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                textDecoration: 'none', transition: 'all 0.2s', color: '#a8937a',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = '#F0866A'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#F0866A'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#2A1E12'; e.currentTarget.style.color = '#a8937a'; e.currentTarget.style.borderColor = '#3A2E22'; }}
              >{icon}</a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ color: '#fff', fontSize: 13, fontWeight: 700, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '.06em' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              ['/', 'Home'],
              ['/pets', 'All Pets'],
              ['/pet-care', 'Pet Care Tips'],
              ['/dashboard', 'Dashboard'],
              ['/my-requests', 'My Requests'],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#a8937a', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#F0866A'}
                  onMouseLeave={e => e.currentTarget.style.color = '#a8937a'}
                >
                  <BsArrowRight size={12} /> {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Pet Categories */}
        <div>
          <h4 style={{ color: '#fff', fontSize: 13, fontWeight: 700, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '.06em' }}>Pet Categories</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {SPECIES_LINKS.map(({ label, species, icon }) => (
              <li key={species}>
                <Link to={`/pets?species=${species}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 13, color: '#a8937a', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#F0866A'}
                  onMouseLeave={e => e.currentTarget.style.color = '#a8937a'}
                >
                  {icon} {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 style={{ color: '#fff', fontSize: 13, fontWeight: 700, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '.06em' }}>Contact Us</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {CONTACT.map(({ icon, text }) => (
              <li key={text} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <span style={{ flexShrink: 0, color: '#F0866A', marginTop: 1 }}>{icon}</span>
                <span style={{ fontSize: 13, color: '#a8937a', lineHeight: 1.5 }}>{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Newsletter strip */}
      <div style={{ background: '#2A1E12', borderRadius: 14, padding: '24px 28px', marginBottom: 32, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 4 }}>
            <FaPaw size={15} color="#F0866A" /> Stay updated with new arrivals
          </div>
          <div style={{ fontSize: 13, color: '#a8937a' }}>Get notified when new pets are available for adoption.</div>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <input
            type="email"
            placeholder="Your email address"
            style={{
              background: '#1A1208', border: '1px solid #3A2E22', borderRadius: 8,
              padding: '10px 14px', fontSize: 13, color: '#F5F0EA',
              minWidth: 200, outline: 'none',
            }}
          />
          <button style={{
            padding: '10px 20px', background: '#F0866A', color: '#fff',
            border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer',
            transition: 'background 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = '#D9623E'}
            onMouseLeave={e => e.currentTarget.style.background = '#F0866A'}
          >Subscribe</button>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid #2a2010', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
        <p style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#6b5b47' }}>
          © {new Date().getFullYear()} PawsHome. All rights reserved. Made with <FaPaw size={11} color="#F0866A" /> for pets everywhere.
        </p>
        <div style={{ display: 'flex', gap: 20 }}>
          {['Privacy Policy', 'Terms of Service'].map(t => (
            <a key={t} href="#" style={{ fontSize: 12, color: '#6b5b47', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#F0866A'}
              onMouseLeave={e => e.currentTarget.style.color = '#6b5b47'}
            >{t}</a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;