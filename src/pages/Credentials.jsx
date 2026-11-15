import { Icon } from '@iconify/react';
import Seo from '../components/ui/Seo';
import Reveal from '../components/ui/Reveal';
import PageHeader from '../components/ui/PageHeader';
import SectionHeader from '../components/ui/SectionHeader';
import Button from '../components/ui/Button';
import CtaBand from '../components/ui/CtaBand';
import { SITE_URL, absoluteUrl, credentials, personJsonLd, profile } from '../lib/content';

const { award, degree, references, documents } = credentials;

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url: absoluteUrl('/credentials'),
    name: `Education, award & references | ${profile.name}`,
    mainEntity: personJsonLd(),
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    contentUrl: absoluteUrl(award.imageJpg),
    name: `${profile.name} receiving the ${award.title.toLowerCase()} at the ${award.event}`,
    description: award.alt,
    creditText: award.issuer,
    creator: { '@type': 'Organization', name: award.issuer },
    copyrightNotice: award.issuer,
    acquireLicensePage: absoluteUrl('/contact'),
    about: { '@id': `${SITE_URL}/#person` },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Documents and reference letters for ${profile.name}`,
    itemListElement: [...documents, ...references.map((r) => ({ title: `Reference letter from ${r.name}`, description: r.role, url: r.doc }))].map(
      (d, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'DigitalDocument',
          name: `${d.title} | ${profile.name}`,
          description: d.description,
          url: absoluteUrl(d.url),
          encodingFormat: 'application/pdf',
          about: { '@id': `${SITE_URL}/#person` },
        },
      })
    ),
  },
];

const Credentials = () => (
  <>
    <Seo
      title="Education, award & references"
      description={`${profile.name}: BS Computer Science (CGPA ${degree.cgpa}) from Riphah International University, ${award.title.toLowerCase()} at the ${award.event}, and reference letters from three professors.`}
      path="/credentials"
      image={award.imageJpg}
      jsonLd={jsonLd}
    />

    <PageHeader
      eyebrow="Credentials"
      title="Education, recognition and references"
      text="The academic side of my work: the degree behind the code, the award I received for it, and what my professors wrote about me. Every document is available to read."
    />

    <section className="section section--tight">
      <div className="container">
        <Reveal as="figure" className="award">
          <div className="award__media">
            <img
              src={award.image}
              srcSet={`${award.imageSmall} 900w, ${award.image} 1600w`}
              sizes="(min-width: 1024px) 62vw, 100vw"
              alt={award.alt}
              width={award.width}
              height={award.height}
              loading="lazy"
              decoding="async"
            />
          </div>
          <figcaption className="award__body">
            <p className="eyebrow"><Icon icon="solar:cup-star-linear" aria-hidden="true" />Award</p>
            <h2>{award.title}</h2>
            <p className="award__meta">{award.event} · {award.issuer}</p>
            <p>{award.text}</p>
          </figcaption>
        </Reveal>
      </div>
    </section>

    <section className="section section--alt">
      <div className="container degree">
        <Reveal className="degree__photo">
          <img src={degree.image} alt={degree.alt} width={degree.width} height={degree.height} loading="lazy" decoding="async" />
        </Reveal>
        <Reveal className="degree__body" delay={100}>
          <SectionHeader eyebrow="Education" title={degree.title} />
          <p className="degree__school">{degree.school} · {degree.period}</p>
          <dl className="degree__facts">
            <div><dt>CGPA</dt><dd>{degree.cgpa}</dd></div>
            <div><dt>Completed</dt><dd>{degree.credits}</dd></div>
          </dl>
          <p className="degree__text">{degree.text}</p>
          <div className="hero__actions">
            {documents.map((d) => (
              <Button key={d.url} href={d.url} variant="outline" iconLeft={d.icon}>
                {d.title} (PDF)
              </Button>
            ))}
          </div>
        </Reveal>
      </div>
    </section>

    <section className="section">
      <div className="container">
        <SectionHeader
          eyebrow="References"
          title="What my professors wrote"
          text="Letters from faculty at the Riphah School of Computing & Innovation. Contact details and student identifiers are redacted."
        />
        <div className="references">
          {references.map((r, i) => (
            <Reveal as="figure" key={r.name} delay={i * 90} className="reference">
              <a href={r.doc} className="reference__preview" aria-label={`Read the reference letter from ${r.name} (PDF)`}>
                <img src={r.preview} alt={`First page of the reference letter for ${profile.name} from ${r.name}`} width="720" height="1030" loading="lazy" decoding="async" />
              </a>
              <blockquote>“{r.quote}”</blockquote>
              <figcaption>
                <strong>{r.name}</strong>
                <small>{r.role}</small>
                <a href={r.doc} className="link-arrow">
                  Read the letter (PDF) <Icon icon="solar:arrow-right-up-linear" aria-hidden="true" />
                </a>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    <CtaBand />
  </>
);

export default Credentials;
