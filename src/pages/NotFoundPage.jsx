import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div style={{
    minHeight: '100vh',
    background: '#080612',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    textAlign: 'center', padding: 24,
    fontFamily: "'DM Sans', sans-serif",
    position: 'relative', overflow: 'hidden',
  }}>
    <style>{`
      @keyframes floatA { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-14px) rotate(6deg)} }
      @keyframes floatB { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-9px) rotate(-8deg)} }
      @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:none} }
      @keyframes pawBounce { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-12px) scale(1.08)} }
      .btn-home:hover { transform: translateY(-2px) !important; box-shadow: 0 12px 36px rgba(124,92,252,0.45) !important; }
    `}</style>

    {/* Ambient orbs */}
    <div style={{ position:'absolute', top:'15%', left:'55%', width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle,rgba(100,60,220,0.2) 0%,transparent 70%)', pointerEvents:'none', filter:'blur(2px)' }} />
    <div style={{ position:'absolute', bottom:'10%', left:'15%', width:280, height:280, borderRadius:'50%', background:'radial-gradient(circle,rgba(80,40,180,0.13) 0%,transparent 70%)', pointerEvents:'none' }} />

    {/* Floating crystals */}
    <div style={{ position:'absolute', top:'12%', right:'8%', width:80, height:80, animation:'floatA 6s ease-in-out infinite', pointerEvents:'none', opacity:0.6 }}>
      <div style={{ width:'100%', height:'100%', background:'linear-gradient(135deg,rgba(160,120,255,0.7),rgba(80,40,200,0.4))', clipPath:'polygon(50% 0%,80% 20%,100% 60%,70% 100%,30% 100%,0% 60%,20% 20%)', borderRadius:6, boxShadow:'0 0 28px rgba(140,100,255,0.25)' }} />
    </div>
    <div style={{ position:'absolute', bottom:'20%', right:'12%', width:48, height:48, animation:'floatB 7s ease-in-out infinite', pointerEvents:'none', opacity:0.45 }}>
      <div style={{ width:'100%', height:'100%', background:'linear-gradient(135deg,rgba(200,160,255,0.6),rgba(100,60,220,0.3))', clipPath:'polygon(50% 0%,100% 38%,82% 100%,18% 100%,0% 38%)', borderRadius:3, boxShadow:'0 0 16px rgba(160,120,255,0.2)' }} />
    </div>
    <div style={{ position:'absolute', top:'60%', left:'6%', width:36, height:36, animation:'floatA 5s ease-in-out infinite 1s', pointerEvents:'none', opacity:0.4 }}>
      <div style={{ width:'100%', height:'100%', background:'linear-gradient(135deg,rgba(180,140,255,0.5),rgba(80,40,180,0.3))', clipPath:'polygon(50% 0%,100% 50%,50% 100%,0% 50%)', boxShadow:'0 0 12px rgba(140,100,255,0.18)' }} />
    </div>

    {/* Content */}
    <div style={{ position:'relative', zIndex:2, animation:'fadeUp 0.6s ease both' }}>

      {/* Paw icon */}
      <div style={{ fontSize:72, marginBottom:24, display:'inline-block', animation:'pawBounce 3s ease-in-out infinite' }}>🐾</div>

      {/* 404 */}
      <h1 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: 'clamp(80px,15vw,140px)',
        fontWeight: 700, lineHeight: 1,
        background: 'linear-gradient(135deg,#a78bfa,#7c5cfc)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        marginBottom: 8,
      }}>404</h1>

      {/* Heading */}
      <h3 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: 'clamp(20px,3vw,28px)',
        fontWeight: 700, color: '#f0eeff',
        marginBottom: 12,
      }}>
        Oops! Page not found
      </h3>

      {/* Subtext */}
      <p style={{ color:'rgba(240,238,255,0.5)', fontSize:15, marginBottom:40, maxWidth:360, margin:'0 auto 40px', lineHeight:1.7 }}>
        Looks like this page wandered off like a curious puppy!
      </p>

      {/* Button */}
      <Link
        to="/"
        className="btn-home"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '14px 32px', borderRadius: 50,
          background: '#7c5cfc', color: '#fff',
          fontSize: 14, fontWeight: 700, textDecoration: 'none',
          boxShadow: '0 8px 28px rgba(124,92,252,0.35)',
          transition: 'all 0.25s',
        }}
      >
         Back to Home....
      </Link>
    </div>
  </div>
);

export default NotFoundPage;