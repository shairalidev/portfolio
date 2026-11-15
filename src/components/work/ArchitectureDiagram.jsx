import PropTypes from 'prop-types';
import Reveal from '../ui/Reveal';

/** Layered request-flow diagram: each layer talks to the one below it. */
const ArchitectureDiagram = ({ layers }) => (
  <ol className="arch" aria-label="System architecture, from the user down to data and services">
    {layers.map((layer, i) => (
      <Reveal as="li" key={layer.layer} delay={i * 90} className="arch__layer">
        <div className="arch__label">
          <span className="arch__step">{String(i + 1).padStart(2, '0')}</span>
          <span>{layer.layer}</span>
        </div>
        <ul className="arch__items">
          {layer.items.map((item) => (
            <li key={item} className="arch__chip">{item}</li>
          ))}
        </ul>
      </Reveal>
    ))}
  </ol>
);

ArchitectureDiagram.propTypes = {
  layers: PropTypes.arrayOf(
    PropTypes.shape({ layer: PropTypes.string, items: PropTypes.arrayOf(PropTypes.string) })
  ).isRequired,
};

export default ArchitectureDiagram;
