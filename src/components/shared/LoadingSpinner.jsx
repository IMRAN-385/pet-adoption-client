const LoadingSpinner = ({ text = 'Loading...' }) => (
  <div style={{
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    justifyContent: 'center', minHeight: '60vh', gap: 16
  }}>
    <div style={{ fontSize: 48, animation: 'spin 1s linear infinite' }}>🐾</div>
    <p style={{ color: 'var(--text2)', fontFamily: "'DM Sans', sans-serif" }}>{text}</p>
    <style>{`@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}`}</style>
  </div>
);

export default LoadingSpinner;
