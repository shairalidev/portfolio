import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import Lightbox from './Lightbox';

/** Horizontally scrolling, snap-aligned walkthrough of a product flow. */
const JourneySlider = ({ steps }) => {
  const trackRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const [zoomed, setZoomed] = useState(null);

  // The current step comes from the scroll position: with two slides visible on desktop,
  // "most visible" is ambiguous, but "leftmost" (or the last one at the end) is not.
  useEffect(() => {
    const track = trackRef.current;
    let frame = 0;
    const update = () => {
      const [first, second] = track.children;
      const step = second ? second.offsetLeft - first.offsetLeft : track.clientWidth;
      const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
      setCurrent(atEnd ? track.children.length - 1 : Math.round(track.scrollLeft / step));
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener('scroll', onScroll);
    };
  }, []);

  const goTo = (i) => {
    const track = trackRef.current;
    const [first] = track.children;
    const target = track.children[Math.max(0, Math.min(steps.length - 1, i))];
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollTo({ left: target.offsetLeft - first.offsetLeft, behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <div className="journey">
      <div className="journey__controls">
        <p className="journey__counter" aria-live="polite">
          Step <strong>{String(current + 1).padStart(2, '0')}</strong> of {String(steps.length).padStart(2, '0')}
        </p>
        <div className="journey__progress" aria-hidden="true">
          <span style={{ width: `${((current + 1) / steps.length) * 100}%` }} />
        </div>
        <div className="journey__buttons">
          <button type="button" onClick={() => goTo(current - 1)} disabled={current === 0} aria-label="Previous step">
            <Icon icon="solar:alt-arrow-left-linear" />
          </button>
          <button type="button" onClick={() => goTo(current + 1)} disabled={current === steps.length - 1} aria-label="Next step">
            <Icon icon="solar:alt-arrow-right-linear" />
          </button>
        </div>
      </div>

      <ol ref={trackRef} className="journey__track" tabIndex={0} data-lenis-prevent-wheel aria-label="Product walkthrough">
        {steps.map((step, i) => (
          <li key={step.image} className={`journey__slide${i === current ? ' is-current' : ''}`}>
            <button type="button" className="journey__image" onClick={() => setZoomed(i)} aria-label={`Enlarge step ${i + 1}: ${step.title}`}>
              <img src={step.image} alt={`${step.title}: ${step.caption}`} loading="lazy" decoding="async" />
            </button>
            <div className="journey__text">
              <span className="journey__num">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.caption}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>

      <Lightbox
        images={steps.map((s) => ({ src: s.image, alt: `${s.title}: ${s.caption}` }))}
        index={zoomed}
        onClose={() => setZoomed(null)}
        onChange={setZoomed}
      />
    </div>
  );
};

JourneySlider.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({ image: PropTypes.string, title: PropTypes.string, caption: PropTypes.string })
  ).isRequired,
};

export default JourneySlider;
