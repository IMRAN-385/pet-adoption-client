const LoadingSpinner = ({ text = 'Loading...' }) => (
  <div style={{
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    justifyContent: 'center', minHeight: '60vh', gap: 16,
  }}>
    <div style={{ position: 'relative', width: 60, height: 60 }}>
  
      <div style={{
        position: 'absolute', inset: 0,
        border: '3px solid var(--primary-light)',
        borderTopColor: 'var(--primary)',
        borderRadius: '50%',
        animation: 'spin 0.9s linear infinite',
      }} />
     
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 22,
      }}>🐾</div>
    </div>
    <p style={{ color: 'var(--text2)', fontSize: 14, fontWeight: 500 }}>{text}</p>
    <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
  </div>
);

export default LoadingSpinner;