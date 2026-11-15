import Seo from '../components/ui/Seo';
import PageHeader from '../components/ui/PageHeader';
import SectionHeader from '../components/ui/SectionHeader';
import Button from '../components/ui/Button';
import CtaBand from '../components/ui/CtaBand';
import ServicesGrid from '../components/sections/ServicesGrid';
import ProcessSteps from '../components/sections/ProcessSteps';
import Faq from '../components/sections/Faq';
import { SITE_URL, absoluteUrl, faqJsonLd } from '../lib/content';
import { services } from '../data/services.json';

const Services = () => (
  <>
    <Seo
      title="Services"
      description="Full-stack development services: SaaS and web platforms, Stripe payments and billing, real-time chat and video, AI assistants, cloud deployment and legacy modernization."
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
