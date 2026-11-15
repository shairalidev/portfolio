import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import Reveal from '../ui/Reveal';
import { faq as defaultFaq } from '../../data/services.json';

const Faq = ({ items = defaultFaq }) => (
  <div className="faq">
    {items.map((f, i) => (
      <Reveal key={f.q} delay={i * 60}>
        <details className="faq__item">
          <summary>
            <span>{f.q}</span>
            <Icon icon="solar:add-circle-linear" aria-hidden="true" />
          </summary>
          <p>{f.a}</p>
        </details>
      </Reveal>
    ))}
  </div>
);

Faq.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({ q: PropTypes.string, a: PropTypes.string })),
};

export default Faq;
