import Seo from '../components/ui/Seo';
import Hero from '../components/home/Hero';
import Stats from '../components/sections/Stats';
import { TechMarquee } from '../components/sections/TechStack';
import ProjectCard from '../components/work/ProjectCard';
import ServicesGrid from '../components/sections/ServicesGrid';
import ProcessSteps from '../components/sections/ProcessSteps';
import Testimonials from '../components/sections/Testimonials';
import SectionHeader from '../components/ui/SectionHeader';
import Button from '../components/ui/Button';
import CtaBand from '../components/ui/CtaBand';
import { SITE_URL, absoluteUrl, personJsonLd, profile, projects } from '../lib/content';

const Home = () => (
  <>
    <Seo
      description="Shair Ali is a full-stack developer who designs, builds and runs production web platforms: SaaS, marketplaces, payments, real-time apps and AI assistants for clients in the USA and Europe."
      path="/"
      jsonLd={[
        personJsonLd(),
        {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          url: `${SITE_URL}/`,
          name: `${profile.name} | ${profile.role}`,
          publisher: { '@id': `${SITE_URL}/#person` },
        },
        {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'Case studies',
          itemListElement: projects.map((p, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: absoluteUrl(`/work/${p.slug}`),
            name: p.title,
          })),
        },
      ]}
    />

    <Hero />
    <TechMarquee />
    <Stats />

    <section id="featured-work" className="section">
      <div className="container">
        <SectionHeader
          eyebrow="Selected work"
          title="Platforms I've built and run in production"
          text="Every project below was planned, designed, coded and deployed by me, and every one is live."
        />
        <div className="feature-list">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} variant="feature" />
          ))}
        </div>
      </div>
    </section>

    <section className="section section--alt">
      <div className="container">
        <SectionHeader
          eyebrow="What I do"
          title="One engineer, from idea to uptime"
          text="I cover the whole stack, so nothing gets lost between designers, developers and DevOps."
        >
          <Button to="/services" variant="outline" icon="solar:arrow-right-linear">All services</Button>
        </SectionHeader>
        <ServicesGrid limit={6} />
      </div>
    </section>

    <section className="section">
      <div className="container">
        <SectionHeader eyebrow="How we'll work" title="A simple, transparent process" />
        <ProcessSteps />
      </div>
    </section>

    <section className="section section--alt">
      <div className="container">
        <SectionHeader eyebrow="Client feedback" title="What clients say" />
        <Testimonials />
      </div>
    </section>

    <CtaBand />
  </>
);

export default Home;
