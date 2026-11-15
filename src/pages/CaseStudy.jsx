import { Link, useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Seo from '../components/ui/Seo';
import Button from '../components/ui/Button';
import Reveal from '../components/ui/Reveal';
import TiltCard from '../components/ui/TiltCard';
import BrowserFrame from '../components/ui/BrowserFrame';
import SectionHeader from '../components/ui/SectionHeader';
import CtaBand from '../components/ui/CtaBand';
import ProjectVideo from '../components/work/ProjectVideo';
import Gallery from '../components/work/Gallery';
import JourneySlider from '../components/work/JourneySlider';
import ArchitectureDiagram from '../components/work/ArchitectureDiagram';
import NotFound from './NotFound';
import { SITE_URL, absoluteUrl, getAdjacentProjects, getProject, whatsappUrl } from '../lib/content';

const CaseStudy = () => {
  const { slug } = useParams();
  const project = getProject(slug);
  if (!project) return <NotFound />;

  const { prev, next } = getAdjacentProjects(slug);
  const host = project.liveUrl.replace(/^https?:\/\//, '');
  const highlights = project.highlights.filter((h) => h.image);
  const extraHighlights = project.highlights.filter((h) => !h.image);

  return (
    <article className="case" style={{ '--project': project.accent }}>
      <Seo
        title={`${project.title} case study by Shair Ali`}
        description={`${project.title}, built by Shair Ali: ${project.tagline}`}
        imageAlt={project.coverAlt}
        path={`/work/${project.slug}`}
        image={project.ogImage || project.hero}
        type="article"
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'CreativeWork',
            name: project.title,
            headline: project.tagline,
            description: project.summary,
            url: absoluteUrl(`/work/${project.slug}`),
            image: absoluteUrl(project.hero),
            author: { '@type': 'Person', '@id': `${SITE_URL}/#person`, name: 'Shair Ali', url: `${SITE_URL}/` },
            creator: { '@id': `${SITE_URL}/#person` },
            inLanguage: 'en',
            dateCreated: project.year.slice(0, 4),
            keywords: Object.values(project.stack).flat().join(', '),
            sameAs: project.liveUrl,
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
              { '@type': 'ListItem', position: 2, name: 'Work', item: absoluteUrl('/work') },
              { '@type': 'ListItem', position: 3, name: project.title, item: absoluteUrl(`/work/${project.slug}`) },
            ],
          },
        ]}
      />

      {/* Intro */}
      <header className="case-hero">
        <div className="case-hero__glow" aria-hidden="true" />
        <div className="container">
          <Reveal>
            <Link to="/work" className="back-link">
              <Icon icon="solar:arrow-left-linear" aria-hidden="true" /> All case studies
            </Link>
            <p className="eyebrow">{project.category} · {project.year}</p>
            <h1 className="case-hero__title">{project.title}</h1>
            <p className="case-hero__tagline">{project.tagline}</p>
          </Reveal>

          <Reveal delay={120} className="case-hero__meta">
            <dl>
              <div><dt>Client</dt><dd>{project.client}</dd></div>
              <div><dt>My role</dt><dd>{project.role}</dd></div>
              <div><dt>Timeline</dt><dd>{project.timeline}</dd></div>
              <div>
                <dt>Live</dt>
                <dd>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    {host} <Icon icon="solar:arrow-right-up-linear" aria-hidden="true" />
                  </a>
                </dd>
              </div>
            </dl>
            <div className="case-hero__actions">
              <Button href={project.liveUrl} icon="solar:arrow-right-up-linear">Visit live site</Button>
              <Button
                href={whatsappUrl(`Hi Shair, I saw your ${project.title} case study and I'd like to discuss a similar project.`)}
                variant="ghost"
                iconLeft="ic:baseline-whatsapp"
              >
                Discuss a similar project
              </Button>
            </div>
          </Reveal>
        </div>
      </header>

      {/* Showcase */}
      <section className="case-showcase">
        <div className="container">
          <Reveal variant="scale" className="case-showcase__stage">
            <TiltCard max={3}>
              <BrowserFrame url={project.liveUrl}>
                {project.video ? (
                  <ProjectVideo
                    video={project.video}
                    title={project.title}
                    fallback={project.hero}
                    fallbackAlt={project.coverAlt}
                  />
                ) : (
                  <img src={project.hero} alt={project.coverAlt} width="1600" height="1000" />
                )}
              </BrowserFrame>
            </TiltCard>
            {project.mobile && (
              <div className="phone" aria-hidden="true">
                <div className="phone__screen">
                  <img src={project.mobile} alt={`${project.title} mobile view, built by Shair Ali`} loading="lazy" decoding="async" />
                </div>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* Metrics */}
      {project.metrics?.length > 0 && (
        <section className="section section--tight">
          <div className="container">
            <dl className="stats stats--case" style={{ '--cols': project.metrics.length }}>
              {project.metrics.map((m, i) => (
                <Reveal key={m.label} delay={i * 80} className="stats__item">
                  <dt className="stats__label">{m.label}</dt>
                  <dd className="stats__value">{m.value}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </section>
      )}

      {/* Challenge & solution */}
      <section className="section">
        <div className="container case-story">
          <Reveal className="case-story__block">
            <h2 className="eyebrow">The challenge</h2>
            <p className="case-story__text">{project.challenge}</p>
          </Reveal>
          <Reveal delay={120} className="case-story__block case-story__block--solution">
            <h2 className="eyebrow">The solution</h2>
            <p className="case-story__text">{project.solution}</p>
          </Reveal>
        </div>
      </section>

      {/* Highlights */}
      <section className="section section--alt">
        <div className="container">
          <SectionHeader eyebrow="What I built" title="Key features" />
          <div className="highlights">
            {highlights.map((h, i) => (
              <div key={h.title} className={`highlight${i % 2 ? ' highlight--reverse' : ''}`}>
                <Reveal variant={i % 2 ? 'left' : 'right'} className="highlight__media">
                  <TiltCard max={4}>
                    <BrowserFrame>
                      <img src={h.image} alt={h.alt} width={h.width} height={h.height} loading="lazy" decoding="async" />
                    </BrowserFrame>
                  </TiltCard>
                </Reveal>
                <Reveal delay={100} className="highlight__body">
                  <span className="highlight__num">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{h.title}</h3>
                  <p>{h.text}</p>
                </Reveal>
              </div>
            ))}
          </div>
          {extraHighlights.length > 0 && (
            <div className="feature-boxes">
              {extraHighlights.map((h, i) => (
                <Reveal key={h.title} delay={i * 80} className="feature-box">
                  <Icon icon="solar:widget-add-bold-duotone" aria-hidden="true" />
                  <h3>{h.title}</h3>
                  <p>{h.text}</p>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Journey */}
      {project.journey?.length > 0 && (
        <section className="section">
          <div className="container">
            <SectionHeader
              eyebrow="User journey"
              title="The product, step by step"
              text="The client-facing walkthrough. Screens are from the live Italian product; captions are translated."
            />
            <JourneySlider steps={project.journey} />
          </div>
        </section>
      )}

      {/* Architecture & engineering */}
      <section className={`section${project.journey?.length ? ' section--alt' : ''}`}>
        <div className="container case-tech">
          <div>
            <SectionHeader eyebrow="Under the hood" title="Architecture" />
            <ArchitectureDiagram layers={project.architecture} />
          </div>
          <div>
            <SectionHeader eyebrow="Engineering" title="Details that matter" />
            <ul className="check-list check-list--lg">
              {project.engineering.map((e, i) => (
                <Reveal as="li" key={e} delay={i * 60}>
                  <Icon icon="solar:check-circle-bold" aria-hidden="true" />
                  {e}
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Stack */}
      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="Tech stack" title="Technologies used" />
          <div className="stack-grid">
            {Object.entries(project.stack).map(([group, items], i) => (
              <Reveal key={group} delay={i * 70} className="stack-grid__group">
                <h3>{group}</h3>
                <ul className="tag-list">
                  {items.map((item) => <li key={item} className="tag">{item}</li>)}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      {project.gallery?.length > 0 && (
        <section className="section section--alt">
          <div className="container">
            <SectionHeader eyebrow="Gallery" title="More screens" text="Click any screen to enlarge it." />
            <Gallery images={project.gallery} />
          </div>
        </section>
      )}

      {/* Prev / next */}
      <nav className="section case-nav" aria-label="More case studies">
        <div className="container case-nav__inner">
          {[{ p: prev, label: 'Previous project', dir: 'prev' }, { p: next, label: 'Next project', dir: 'next' }].map(({ p, label, dir }) => (
            <Link key={dir} to={`/work/${p.slug}`} className={`case-nav__card case-nav__card--${dir}`} style={{ '--project': p.accent }}>
              <img src={p.cover} alt={`${p.title} by Shair Ali`} width="900" height="563" loading="lazy" decoding="async" />
              <span className="case-nav__text">
                <small>
                  {dir === 'prev' && <Icon icon="solar:arrow-left-linear" aria-hidden="true" />}
                  {label}
                  {dir === 'next' && <Icon icon="solar:arrow-right-linear" aria-hidden="true" />}
                </small>
                <strong>{p.title}</strong>
              </span>
            </Link>
          ))}
        </div>
      </nav>

      <CtaBand title={`Want results like ${project.title}?`} />
    </article>
  );
};

export default CaseStudy;
