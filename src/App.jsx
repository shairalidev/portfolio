import { lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/layout/Layout';
import Home from './pages/Home';

const Work = lazy(() => import('./pages/Work'));
const CaseStudy = lazy(() => import('./pages/CaseStudy'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const ServicePage = lazy(() => import('./pages/ServicePage'));
const Contact = lazy(() => import('./pages/Contact'));
const Achievements = lazy(() => import('./pages/Achievements'));
const NotFound = lazy(() => import('./pages/NotFound'));

/** Old /project/:slug links keep working. */
const LegacyProjectRedirect = () => {
  const { slug } = useParams();
  return <Navigate to={`/work/${slug}`} replace />;
};

/** Route table, shared by the browser app and the build-time prerenderer (entry-server.jsx). */
export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="work" element={<Work />} />
      <Route path="work/:slug" element={<CaseStudy />} />
      <Route path="about" element={<About />} />
      <Route path="services" element={<Services />} />
      <Route path="services/:slug" element={<ServicePage />} />
      <Route path="contact" element={<Contact />} />
      <Route path="achievements" element={<Achievements />} />
      <Route path="credentials" element={<Navigate to="/achievements" replace />} />
      <Route path="project/:slug" element={<LegacyProjectRedirect />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
