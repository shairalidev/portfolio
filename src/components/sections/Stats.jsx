import Reveal from '../ui/Reveal';
import { profile } from '../../lib/content';

const Stats = () => (
  <section className="section section--tight" aria-label="At a glance">
    <div className="container">
      <dl className="stats">
        {profile.stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 80} className="stats__item">
            <dt className="stats__label">{s.label}</dt>
            <dd className="stats__value">{s.value}</dd>
          </Reveal>
        ))}
      </dl>
    </div>
  </section>
);

export default Stats;
