import { Suspense, lazy, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Button from '../ui/Button';
import useReducedMotion from '../../hooks/useReducedMotion';
import useInView from '../../hooks/useInView';
import { scrollToElement } from '../../hooks/useSmoothScroll';
import { profile, projects, whatsappUrl } from '../../lib/content';

const Hero3D = lazy(() => import('./Hero3D'));

// True only for hardware-accelerated WebGL. Software renderers (SwiftShader, llvmpipe, headless test
// machines, PCs without a GPU) can technically run the scene but block the main thread for seconds.
const supportsFastWebGL = () => {
  try {
    const canvas = document.createElement('canvas');
    const gl = window.WebGLRenderingContext && (canvas.getContext('webgl2') || canvas.getContext('webgl'));
    if (!gl) return false;
    const info = gl.getExtension('WEBGL_debug_renderer_info');
    const renderer = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : '';
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return !/swiftshader|llvmpipe|softpipe|software|basic render/i.test(renderer);
  } catch {
    return false;
  }
};

const INTERACTION_EVENTS = ['pointermove', 'pointerdown', 'wheel', 'scroll', 'keydown', 'touchstart'];

/** CSS-3D stack of project screens: shown on phones, without WebGL, or while the 3D scene loads. */
const HeroStack = () => (
  <div className="hero-stack" aria-hidden="true">
    {projects.slice(0, 3).map((p, i) => (
      <div key={p.slug} className={`hero-stack__card hero-stack__card--${i}`} style={{ '--project': p.accent }}>
        <img src={p.cover} alt={`${p.coverAlt}, built by Shair Ali`} width="800" height="500" loading={i === 1 ? 'eager' : 'lazy'} decoding="async" />
      </div>
    ))}
  </div>
);

const Hero = () => {
  const navigate = useNavigate();
  const reduced = useReducedMotion();
  const [use3D, setUse3D] = useState(false);
  const [ref, inView] = useInView({ once: false, threshold: 0, rootMargin: '0px' });

  // The WebGL scene (~220 KB gzipped) is only requested after the visitor first interacts (moves the
  // mouse, scrolls, presses a key), so it never competes with page load; the CSS stack shows until then.
  // Its textures are preloaded first, so the screens appear together with the canvas.
  useEffect(() => {
    const saveData = navigator.connection?.saveData;
    const lowEnd = (navigator.hardwareConcurrency || 4) <= 2;
    if (reduced || saveData || lowEnd || window.innerWidth < 1024 || !supportsFastWebGL()) {
      setUse3D(false);
      return undefined;
    }
    let cancelled = false;
    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      INTERACTION_EVENTS.forEach((e) => window.removeEventListener(e, start));
      const textures = projects.slice(0, 3).map((p) => {
        const img = new Image();
        img.src = p.cover;
        return img.decode().catch(() => {});
      });
      Promise.all([import('./Hero3D'), ...textures]).then(() => !cancelled && setUse3D(true));
    };
    INTERACTION_EVENTS.forEach((e) => window.addEventListener(e, start, { once: true, passive: true }));
    return () => {
      cancelled = true;
      INTERACTION_EVENTS.forEach((e) => window.removeEventListener(e, start));
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
          <h1 className="hero__title">
            <span className="hero__name">{profile.name} · Full-stack &amp; AI developer</span>{' '}
            From idea to a <span className="text-gradient">live product</span>, built and kept running.
          </h1>
          <p className="hero__lead">{profile.intro}</p>
          <div className="hero__actions">
            <Button to="/work" size="lg" icon="solar:arrow-right-linear">See my work</Button>
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
