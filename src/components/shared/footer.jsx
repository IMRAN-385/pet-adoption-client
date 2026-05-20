import { Link } from 'react-router-dom';

const Footer = () => (
  <footer style={{ background: '#1A1208', color: '#e8d9cc', padding: '48px 24px 24px' }}>
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 32, marginBottom: 32
      }}>
        <div>
          <h3 style={{ color: '#fff', fontFamily: "'Playfair Display', serif", marginBottom: 8, fontSize: 20 }}>🐾 PawsHome</h3>
          <p style={{ fontSize: 13, lineHeight: 1.7, color: '#a8937a' }}>
            Connecting loving pets with caring families. Every pet deserves a forever home.
          </p>
        </div>
        <div>
          <h4 style={{ color: '#fff', fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[['/', 'Home'], ['/pets', 'All Pets'], ['/pet-care', 'Pet Care Tips']].map(([to, label]) => (
              <li key={to}><Link to={to} style={{ fontSize: 13, color: '#a8937a', textDecoration: 'none' }}>{label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={{ color: '#fff', fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Contact</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <li style={{ fontSize: 13, color: '#a8937a' }}>📧 hello@pawshome.com</li>
            <li style={{ fontSize: 13, color: '#a8937a' }}>📞 +880 1234-567890</li>
            <li style={{ fontSize: 13, color: '#a8937a' }}>📍 Chittagong, Bangladesh</li>
          </ul>
        </div>
        <div>
          <h4 style={{ color: '#fff', fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Follow Us</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
            {['Facebook', 'Instagram', 'Twitter', 'YouTube'].map(s => (
              <li key={s}><a href="#" style={{ fontSize: 13, color: '#a8937a', textDecoration: 'none' }}>{s}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div style={{ borderTop: '1px solid #2a2010', paddingTop: 20, textAlign: 'center', fontSize: 13, color: '#6b5b47' }}>
        © {new Date().getFullYear()} PawsHome. All rights reserved. Made with 🧡 for pets everywhere.
      </div>
    </div>
  </footer>
);

export default Footer;
