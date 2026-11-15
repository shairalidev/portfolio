import { Icon } from '@iconify/react';
import Reveal from '../ui/Reveal';
import TiltCard from '../ui/TiltCard';
import Button from '../ui/Button';
import { credentials, profile } from '../../lib/content';

const { award, degree, references } = credentials;

const AboutIntro = () => (
  <section className="section intro">
    <div className="container intro__inner">
      <Reveal variant="scale" className="intro__portrait">
        <TiltCard max={6}>
          <div className="portrait">
            <div className="portrait__ring" aria-hidden="true" />
            <img src={profile.portrait} alt={profile.portraitAlt} width="720" height="720" loading="lazy" decoding="async" />
          </div>
        </TiltCard>
      </Reveal>

      <Reveal className="intro__text" delay={100}>
        <p className="eyebrow">Who you&apos;ll work with</p>
        <h2 className="section-header__title">Hi, I&apos;m Shair: one developer, accountable from the first call to launch day.</h2>
        <p className="intro__lead">{profile.bio[0]}</p>
        <ul className="intro__creds">
          <li><Icon icon="solar:square-academic-cap-linear" aria-hidden="true" />{degree.title} · CGPA {degree.cgpa}</li>
          <li><Icon icon="solar:cup-star-linear" aria-hidden="true" />{award.title}, {award.event}</li>
          <li><Icon icon="solar:letter-linear" aria-hidden="true" />Reference letters from {references.length} professors</li>
        </ul>
        <div className="hero__actions">
          <Button to="/about" icon="solar:arrow-right-linear">More about me</Button>
          <Button to="/credentials" variant="outline">Education & references</Button>
        </div>
      </Reveal>
    </div>
  </section>
);

export default AboutIntro;
