import { Outlet } from 'react-router-dom';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';

const MainLayout = () => (
  <>
    <Navbar />
    <main style={{ minHeight: 'calc(100vh - 64px)' }}>
      <Outlet />
    </main>
    <Footer />
  </>
);

export default MainLayout;