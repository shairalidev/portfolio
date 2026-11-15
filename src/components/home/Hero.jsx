import { Suspense, lazy, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Button from '../ui/Button';
import useReducedMotion from '../../hooks/useReducedMotion';
import useInView from '../../hooks/useInView';
import { scrollToElement } from '../../hooks/useSmoothScroll';
import { profile, projects, whatsappUrl } from '../../lib/content';

const Hero3D = lazy(() => import('./Hero3D'));

const supportsWebGL = () => {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl2') || canvas.getContext('webgl')));
  } catch {
    return false;
  }
};

/** CSS-3D stack of project screens: shown on phones, without WebGL, or while the 3D scene loads. */
const HeroStack = () => (
  <div className="hero-stack" aria-hidden="true">
    {projects.slice(0, 3).map((p, i) => (
      <div key={p.slug} className={`hero-stack__card hero-stack__card--${i}`} style={{ '--project': p.accent }}>
        <img src={p.cover} alt="" width="800" height="500" loading={i === 1 ? 'eager' : 'lazy'} decoding="async" />
      </div>
    ))}
  </div>
);

const Hero = () => {
  const navigate = useNavigate();
  const reduced = useReducedMotion();
  const [use3D, setUse3D] = useState(false);
  const [ref, inView] = useInView({ once: false, threshold: 0, rootMargin: '0px' });

  // The WebGL scene (~220 KB gzipped) is only requested once the page is idle, so it never delays
  // first paint. Its textures are preloaded first, so the screens appear together with the canvas.
  useEffect(() => {
    const saveData = navigator.connection?.saveData;
    if (reduced || saveData || window.innerWidth < 1024 || !supportsWebGL()) {
      setUse3D(false);
      return undefined;
    }
    let cancelled = false;
    const start = () => {
      const textures = projects.slice(0, 3).map((p) => {
        const img = new Image();
        img.src = p.cover;
        return img.decode().catch(() => {});
      });
      Promise.all([import('./Hero3D'), ...textures]).then(() => !cancelled && setUse3D(true));
    };
    const idle = window.requestIdleCallback
      ? window.requestIdleCallback.bind(window)
      : (cb) => window.setTimeout(cb, 800);
    const cancelIdle = window.cancelIdleCallback
      ? window.cancelIdleCallback.bind(window)
      : window.clearTimeout.bind(window);
    const id = idle(start, { timeout: 2500 });
    return () => {
      cancelled = true;
      cancelIdle(id);
    };
  }, [reduced]);

  const featured = projects.slice(0, 3);

  return (
    <section ref={ref} className="hero">
      <div className="hero__visual">
        {use3D ? (
          <Suspense fallback={<HeroStack />}>
            <Hero3D projects={featured} onSelect={(slug) => navigate(`/work/${slug}`)} active={inView} />
          </Suspense>
        ) : (
          <HeroStack />
        )}
      </div>

      <div className="container hero__inner">
        <div className="hero__content">
          <span className="status-pill hero__status">
            <i aria-hidden="true" />
            {profile.availability}
          </span>
          <h1 className="hero__title">
            I design, build &amp; run <span className="text-gradient">production web platforms</span>, end to end.
          </h1>
          <p className="hero__lead">{profile.intro}</p>
          <div className="hero__actions">
            <Button to="/work" size="lg" icon="solar:arrow-right-linear">View case studies</Button>
            <Button href={whatsappUrl()} variant="ghost" size="lg" iconLeft="ic:baseline-whatsapp">
              Chat on WhatsApp
            </Button>
          </div>
          <div className="hero__proof">
            <span className="hero__proof-label">Live in production</span>
            <ul>
              {projects.map((p) => (
                <li key={p.slug}>
                  <Link to={`/work/${p.slug}`} style={{ '--project': p.accent }}>
                    <i aria-hidden="true" />
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <a
        href="#featured-work"
        className="hero__scroll"
        aria-label="Scroll to featured work"
        onClick={(e) => {
          e.preventDefault();
          scrollToElement(document.getElementById('featured-work'));
        }}
      >
        <Icon icon="solar:mouse-minimalistic-linear" aria-hidden="true" />
      </a>
    </section>
  );
};

export default Hero;
