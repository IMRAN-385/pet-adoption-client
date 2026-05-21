import { Link } from 'react-router-dom';

const Footer = () => (
  <footer style={{ background: '#1A1208', color: '#e8d9cc', padding: '56px 24px 28px' }}>
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 36, marginBottom: 44 }}>

       
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <span style={{ fontSize: 22 }}>🐾</span>
            <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 20, color: '#fff' }}>PawsHome</span>
          </div>
          <p style={{ fontSize: 13, lineHeight: 1.8, color: '#a8937a', maxWidth: 220 }}>
            Connecting loving pets with caring families across Bangladesh. Every pet deserves a forever home.
          </p>

          <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
            {['Facebook', 'Instagram', 'Twitter', 'YouTube'].map(s => (
              <a
                key={s}
                href="#"
                title={s}
                style={{
                  width: 34, height: 34, borderRadius: '50%',
                  background: '#2A1E12',
                  border: '1px solid #3A2E22',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14, textDecoration: 'none', transition: 'all 0.2s',
                  color: '#a8937a',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#F0866A'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#F0866A'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#2A1E12'; e.currentTarget.style.color = '#a8937a'; e.currentTarget.style.borderColor = '#3A2E22'; }}
              >
                {s === 'Facebook' ? 'f' : s === 'Instagram' ? '📸' : s === 'Twitter' ? 'x' : '▶'}
              </a>
            ))}
          </div>
        </div>

      
        <div>
          <h4 style={{ color: '#fff', fontSize: 13, fontWeight: 700, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '.06em' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[['/', 'Home'], ['/pets', 'All Pets'], ['/pet-care', 'Pet Care Tips'], ['/dashboard', 'Dashboard']].map(([to, label]) => (
              <li key={to}>
                <Link
                  to={to}
                  style={{ fontSize: 13, color: '#a8937a', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#F0866A'}
                  onMouseLeave={e => e.currentTarget.style.color = '#a8937a'}
                >→ {label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 style={{ color: '#fff', fontSize: 13, fontWeight: 700, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '.06em' }}>Pet Categories</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[['🐕 Dogs', 'Dog'], ['🐈 Cats', 'Cat'], ['🦜 Birds', 'Bird'], ['🐰 Rabbits', 'Rabbit']].map(([label, species]) => (
              <li key={species}>
                <Link
                  to={`/pets?species=${species}`}
                  style={{ fontSize: 13, color: '#a8937a', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#F0866A'}
                  onMouseLeave={e => e.currentTarget.style.color = '#a8937a'}
                >{label}</Link>
              </li>
            ))}
          </ul>
        </div>

     
        <div>
          <h4 style={{ color: '#fff', fontSize: 13, fontWeight: 700, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '.06em' }}>Contact Us</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              ['📧', 'hello@pawshome.com'],
              ['📞', '+880 1234-567890'],
              ['📍', 'Chittagong, Bangladesh'],
              ['🕐', 'Mon–Sat, 9am–6pm'],
            ].map(([icon, text]) => (
              <li key={text} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <span style={{ flexShrink: 0 }}>{icon}</span>
                <span style={{ fontSize: 13, color: '#a8937a', lineHeight: 1.5 }}>{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      
      <div style={{ borderTop: '1px solid #2a2010', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
        <p style={{ fontSize: 12, color: '#6b5b47' }}>
          © {new Date().getFullYear()} PawsHome. All rights reserved. Made with 🧡 for pets everywhere.
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