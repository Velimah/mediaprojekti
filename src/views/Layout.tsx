import {Outlet} from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
const Layout = () => {

  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Layout;