import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import Reveal from '../ui/Reveal';
import TiltCard from '../ui/TiltCard';
import { services } from '../../data/services.json';

const ServicesGrid = ({ limit, detailed = false }) => (
  <div className={`services-grid${detailed ? ' services-grid--detailed' : ''}`}>
    {services.slice(0, limit || services.length).map((s, i) => (
      <Reveal key={s.title} delay={(i % 3) * 90}>
        <TiltCard max={5} className="service-card">
          <span className="service-card__icon"><Icon icon={s.icon} aria-hidden="true" /></span>
          <h3>{s.title}</h3>
          <p>{s.text}</p>
          {detailed && (
            <ul className="check-list">
              {s.points.map((p) => (
                <li key={p}><Icon icon="solar:check-circle-bold" aria-hidden="true" />{p}</li>
              ))}
            </ul>
          )}
        </TiltCard>
      </Reveal>
    ))}
  </div>
);

ServicesGrid.propTypes = {
  limit: PropTypes.number,
  detailed: PropTypes.bool,
};

export default ServicesGrid;
