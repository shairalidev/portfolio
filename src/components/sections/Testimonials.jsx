import { Icon } from '@iconify/react';
import Reveal from '../ui/Reveal';
import testimonials from '../../data/testimonials.json';
import { profile } from '../../lib/content';

const fiverr = profile.socials.find((s) => s.label === 'Fiverr');

const Testimonials = () => (
  <div className="testimonials">
    {testimonials.map((t, i) => (
      <Reveal as="figure" key={t.name} delay={i * 90} className="testimonial">
        <div className="testimonial__stars" role="img" aria-label={`${t.rating} out of 5 stars`}>
          {Array.from({ length: t.rating }).map((_, s) => <Icon key={s} icon="solar:star-bold" aria-hidden="true" />)}
        </div>
        <blockquote>“{t.text}”</blockquote>
        <figcaption>
          <span className="testimonial__avatar" aria-hidden="true">{t.name.charAt(0).toUpperCase()}</span>
          <span>
            <strong>{t.name}</strong>
            <small>{t.source}</small>
          </span>
        </figcaption>
      </Reveal>
    ))}
    {fiverr && (
      <Reveal delay={300} className="testimonials__more">
        <a href={fiverr.url} target="_blank" rel="noopener noreferrer" className="link-arrow">
          Read all reviews on Fiverr <Icon icon="solar:arrow-right-up-linear" aria-hidden="true" />
        </a>
      </Reveal>
    )}
  </div>
);

export default Testimonials;
