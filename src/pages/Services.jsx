import Seo from '../components/ui/Seo';
import PageHeader from '../components/ui/PageHeader';
import SectionHeader from '../components/ui/SectionHeader';
import Button from '../components/ui/Button';
import CtaBand from '../components/ui/CtaBand';
import ServicesGrid from '../components/sections/ServicesGrid';
import ProcessSteps from '../components/sections/ProcessSteps';
import Faq from '../components/sections/Faq';
import { SITE_URL, absoluteUrl, faqJsonLd } from '../lib/content';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Reveal from '../components/ui/Reveal';
import { services } from '../data/services.json';
import servicePages from '../data/service-pages.json';

const Services = () => (
  <>
    <Seo
      title="Full-Stack & AI Development Services | Shair Ali"
      description="Hire Shair Ali for SaaS builds, AI app rescue, AI chatbots and automation, Stripe payments, real-time video apps and deployment to AWS or your own server."
      path="/services"
      jsonLd={[
        {
          '@context': 'https://schema.org',
          '@type': 'Service',
          serviceType: 'Full-stack web development',
          provider: { '@type': 'Person', '@id': `${SITE_URL}/#person`, name: 'Shair Ali', url: `${SITE_URL}/` },
          areaServed: 'Worldwide',
          url: absoluteUrl('/services'),
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Development services',
            itemListElement: services.map((s) => ({
              '@type': 'Offer',
              itemOffered: { '@type': 'Service', name: s.title, description: s.text },
            })),
          },
        },
        faqJsonLd(),
      ]}
    />

    <PageHeader
      eyebrow="Services"
      title="Everything your product needs, from one developer"
      text="Strategy, design, development, payments, real-time features, AI and the servers it all runs on. Pick one service or hand me the whole product."
    >
      <div className="hero__actions">
        <Button to="/contact" icon="solar:arrow-right-linear">Get a quote</Button>
        <Button to="/work" variant="ghost">See case studies</Button>
      </div>
    </PageHeader>

    <section className="section section--flush-top">
      <div className="container">
        <h2 className="visually-hidden">All services</h2>
        <ServicesGrid detailed />
      </div>
    </section>

    <section className="section section--alt">
      <div className="container">
        <SectionHeader
          eyebrow="Most requested"
          title="Specialist services"
          text="The jobs clients hire me for most often right now, each with real projects behind it."
        />
        <div className="specialist-grid">
          {servicePages.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 90}>
              <Link to={`/services/${p.slug}`} className="specialist-card">
                <span className="service-card__icon"><Icon icon={p.icon} aria-hidden="true" /></span>
                <strong>{p.title}</strong>
                <span>{p.description.replace(/^Shair Ali /, '').replace(/^./, (c) => c.toUpperCase())}</span>
                <span className="link-arrow">Learn more <Icon icon="solar:arrow-right-linear" aria-hidden="true" /></span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    <section className="section">
      <div className="container">
        <SectionHeader eyebrow="Process" title="How a project runs" text="Predictable steps, weekly progress and no surprises." />
        <ProcessSteps />
      </div>
    </section>

    <section className="section">
      <div className="container narrow">
        <SectionHeader eyebrow="FAQ" title="Common questions" align="center" />
        <Faq />
      </div>
    </section>

    <CtaBand />
  </>
);

export default Services;
