import { Link, Navigate, useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Seo from '../components/ui/Seo';
import Reveal from '../components/ui/Reveal';
import PageHeader from '../components/ui/PageHeader';
import SectionHeader from '../components/ui/SectionHeader';
import Button from '../components/ui/Button';
import CtaBand from '../components/ui/CtaBand';
import Faq from '../components/sections/Faq';
import { SITE_URL, absoluteUrl, faqJsonLd, getProject, whatsappUrl } from '../lib/content';
import servicePages from '../data/service-pages.json';

const ServicePage = () => {
  const { slug } = useParams();
  const page = servicePages.find((p) => p.slug === slug);
  if (!page) return <Navigate to="/services" replace />;

  const path = `/services/${page.slug}`;
  const others = servicePages.filter((p) => p.slug !== page.slug);

  return (
    <>
      <Seo
        title={page.metaTitle}
        description={page.description}
        path={path}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: page.title,
            serviceType: page.eyebrow,
            description: page.description,
            url: absoluteUrl(path),
            provider: { '@type': 'Person', '@id': `${SITE_URL}/#person`, name: 'Shair Ali', url: `${SITE_URL}/` },
            areaServed: 'Worldwide',
            audience: { '@type': 'BusinessAudience', name: 'Founders, startups and small businesses' },
          },
          faqJsonLd(page.faq),
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
              { '@type': 'ListItem', position: 2, name: 'Services', item: absoluteUrl('/services') },
              { '@type': 'ListItem', position: 3, name: page.eyebrow, item: absoluteUrl(path) },
            ],
          },
        ]}
      />

      <PageHeader eyebrow={page.eyebrow} title={page.title} text={page.intro}>
        <div className="hero__actions">
          <Button to="/contact" icon="solar:arrow-right-linear">Get a quote</Button>
          <Button href={whatsappUrl(`Hi Shair, I'd like help with: ${page.title.toLowerCase()}.`)} variant="ghost" iconLeft="ic:baseline-whatsapp">
            Chat on WhatsApp
          </Button>
        </div>
      </PageHeader>

      <section className="section section--flush-top">
        <div className="container two-col service-detail">
          <Reveal className="service-detail__card">
            <h2><Icon icon="solar:danger-triangle-linear" aria-hidden="true" />Sound familiar?</h2>
            <ul className="service-detail__list">
              {page.problems.map((p) => <li key={p}>{p}</li>)}
            </ul>
          </Reveal>
          <Reveal className="service-detail__card service-detail__card--accent" delay={100}>
            <h2><Icon icon="solar:box-linear" aria-hidden="true" />What you get</h2>
            <ul className="check-list">
              {page.deliverables.map((d) => (
                <li key={d}><Icon icon="solar:check-circle-bold" aria-hidden="true" />{d}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <SectionHeader eyebrow="Proof" title="Where I've done this before" text="Real products, live in production, built by me." />
          <div className="service-proof">
            {page.proof.map((item, i) => {
              const project = getProject(item.slug);
              return (
                <Reveal key={item.slug} delay={i * 90}>
                  <Link to={`/work/${project.slug}`} className="service-proof__card">
                    <img
                      src={project.cover}
                      alt={`${project.title}, built by Shair Ali`}
                      width="900"
                      height="563"
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="service-proof__body">
                      <strong>{project.title}</strong>
                      <span>{item.text}</span>
                      <span className="link-arrow">
                        See how I built it <Icon icon="solar:arrow-right-linear" aria-hidden="true" />
                      </span>
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container narrow">
          <SectionHeader eyebrow="FAQ" title="Common questions" align="center" />
          <Faq items={page.faq} />
        </div>
      </section>

      <section className="section section--tight section--flush-top">
        <div className="container">
          <h2 className="service-more__title">Other services</h2>
          <ul className="service-more">
            {others.map((p) => (
              <li key={p.slug}>
                <Link to={`/services/${p.slug}`}>
                  <Icon icon={p.icon} aria-hidden="true" />
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
};

export default ServicePage;
