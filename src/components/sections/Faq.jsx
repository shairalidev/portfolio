import { Icon } from '@iconify/react';
import Reveal from '../ui/Reveal';
import { faq } from '../../data/services.json';

const Faq = () => (
  <div className="faq">
    {faq.map((f, i) => (
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

export default Faq;
