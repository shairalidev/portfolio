import PropTypes from 'prop-types';
import Button from './Button';
import Reveal from './Reveal';
import { whatsappUrl } from '../../lib/content';

const CtaBand = ({
  title = 'Have a product in mind? Let’s build it properly.',
  text = 'Tell me what you’re building. I usually reply within a few hours with questions, a rough timeline and next steps.',
}) => (
  <section className="section">
    <div className="container">
      <Reveal variant="scale" className="cta-band">
        <div className="cta-band__glow" aria-hidden="true" />
        <h2 className="cta-band__title">{title}</h2>
        <p className="cta-band__text">{text}</p>
        <div className="cta-band__actions">
          <Button to="/contact" size="lg" icon="solar:arrow-right-linear">Start a project</Button>
          <Button href={whatsappUrl()} variant="whatsapp" size="lg" iconLeft="logos:whatsapp-icon">
            Chat on WhatsApp
          </Button>
        </div>
      </Reveal>
    </div>
  </section>
);

CtaBand.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
};

export default CtaBand;
