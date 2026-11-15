import { Suspense, useEffect, useRef } from 'react';
import { Outlet, useLocation, useNavigationType } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import useSmoothScroll, { scrollToTop } from '../../hooks/useSmoothScroll';

const PageLoader = () => (
  <div className="page-loader" role="status" aria-label="Loading page">
    <span />
  </div>
);

const Layout = () => {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();
  const firstRender = useRef(true);
  useSmoothScroll();

  // On navigation: start new pages at the top (back/forward keeps its position) and move focus
  // to the main region so keyboard and screen-reader users land on the new content.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (navigationType !== 'POP') scrollToTop();
    document.getElementById('main')?.focus({ preventScroll: true });
  }, [pathname, navigationType]);

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <div className="backdrop" aria-hidden="true" />
      <Header />
      <main id="main" key={pathname} className="page" tabIndex={-1}>
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default Layout;
