import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Seo from '../components/ui/Seo';
import Reveal from '../components/ui/Reveal';
import TiltCard from '../components/ui/TiltCard';
import Button from '../components/ui/Button';
import SectionHeader from '../components/ui/SectionHeader';
import CtaBand from '../components/ui/CtaBand';
import Stats from '../components/sections/Stats';
import TechStack from '../components/sections/TechStack';
import Testimonials from '../components/sections/Testimonials';
import { experience, education } from '../data/experience.json';
import { credentials, personJsonLd, profile, whatsappUrl } from '../lib/content';

const { award, references } = credentials;

const Timeline = ({ items }) => (
  <ol className="timeline">
    {items.map((item, i) => (
      <Reveal as="li" key={`${item.title}-${item.period}`} delay={i * 70} className="timeline__item">
        <span className="timeline__period">{item.period}</span>
        <div className="timeline__body">
          <h3>{item.title}</h3>
          <p className="timeline__org">{item.org}</p>
          <p>{item.text}</p>
          {item.slug && (
            <Link to={`/work/${item.slug}`} className="link-arrow">
              See the project <Icon icon="solar:arrow-right-linear" aria-hidden="true" />
            </Link>
          )}
        </div>
      </Reveal>
    ))}
  </ol>
);

Timeline.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      period: PropTypes.string,
      title: PropTypes.string,
      org: PropTypes.string,
      text: PropTypes.string,
      slug: PropTypes.string,
    })
  ).isRequired,
};

const About = () => (
  <>
    <Seo
      title="About Shair Ali – Full-Stack & AI Developer from Pakistan"
      description="About Shair Ali: a full-stack and AI developer from Pakistan who builds, deploys and maintains live web platforms for clients in the USA and Europe."
      image={profile.portraitJpg}
      imageAlt={profile.portraitAlt}
      path="/about"
      jsonLd={[{ '@context': 'https://schema.org', '@type': 'ProfilePage', mainEntity: personJsonLd() }]}
    />

    <section className="about-hero">
      <div className="container about-hero__inner">
        <Reveal className="about-hero__text">
          <p className="eyebrow">About me</p>
          <h1 className="page-header__title">
            Hi, I&apos;m Shair. I turn ideas into <span className="text-gradient">software that runs a business.</span>
          </h1>
          {profile.bio.map((p) => <p key={p.slice(0, 24)} className="about-hero__bio">{p}</p>)}
          <ul className="about-hero__facts">
            <li><Icon icon="solar:map-point-linear" aria-hidden="true" />{profile.location}</li>
            <li><Icon icon="solar:chat-round-line-linear" aria-hidden="true" />{profile.languages.join(' & ')}</li>
            <li><Icon icon="solar:verified-check-linear" aria-hidden="true" />Fiverr Level 1 Seller</li>
          </ul>
          <div className="hero__actions">
            <Button href={whatsappUrl()} variant="whatsapp" iconLeft="ic:baseline-whatsapp">Chat on WhatsApp</Button>
            <Button href={profile.cv} variant="outline" iconLeft="solar:download-minimalistic-linear">Download résumé</Button>
          </div>
        </Reveal>

        <Reveal variant="scale" delay={150} className="about-hero__portrait">
          <TiltCard max={7}>
            <div className="portrait">
              <div className="portrait__ring" aria-hidden="true" />
              <img src={profile.portrait} alt={profile.portraitAlt} width="720" height="720" />
            </div>
          </TiltCard>
        </Reveal>
      </div>
    </section>

    <Stats />

    <section className="section">
      <div className="container two-col">
        <div>
          <SectionHeader eyebrow="Experience" title="Recent work" />
          <Timeline items={experience} />
        </div>
        <div>
          <SectionHeader eyebrow="Education" title="Foundations" />
          <Timeline items={education} />
          <Reveal as="figure" className="about-award">
            <img
              src={award.imageSmall}
              alt={award.alt}
              width="900"
              height="544"
              loading="lazy"
              decoding="async"
            />
            <figcaption>
              <strong><Icon icon="solar:cup-star-linear" aria-hidden="true" />{award.title}</strong>
              <span>{award.event} · Riphah School of Computing & Innovation</span>
              <Link to="/achievements" className="link-arrow">
                Degree, award & {references.length} reference letters <Icon icon="solar:arrow-right-linear" aria-hidden="true" />
              </Link>
            </figcaption>
          </Reveal>
          <Reveal className="principles">
            <h3>How I work</h3>
            <ul className="check-list">
              <li><Icon icon="solar:check-circle-bold" aria-hidden="true" />Own the outcome, not just the tickets</li>
              <li><Icon icon="solar:check-circle-bold" aria-hidden="true" />Ship small, visible increments every week</li>
              <li><Icon icon="solar:check-circle-bold" aria-hidden="true" />Security and reliability are features</li>
              <li><Icon icon="solar:check-circle-bold" aria-hidden="true" />Clear, honest communication, especially about trade-offs</li>
            </ul>
          </Reveal>
        </div>
      </div>
    </section>

    <section className="section section--alt">
      <div className="container">
        <SectionHeader eyebrow="Toolbox" title="Technologies I use in production" />
        <TechStack />
      </div>
    </section>

    <section className="section">
      <div className="container">
        <SectionHeader eyebrow="Client feedback" title="What clients say" />
        <Testimonials />
      </div>
    </section>

    <CtaBand />
  </>
);

export default About;
