import PropTypes from 'prop-types';
import Reveal from './Reveal';

const SectionHeader = ({ eyebrow, title, text, align = 'left', as: Heading = 'h2', children }) => (
  <Reveal className={`section-header section-header--${align}`}>
    {eyebrow && <p className="eyebrow">{eyebrow}</p>}
    <Heading className="section-header__title">{title}</Heading>
    {text && <p className="section-header__text">{text}</p>}
    {children}
  </Reveal>
);

SectionHeader.propTypes = {
  eyebrow: PropTypes.string,
  title: PropTypes.node.isRequired,
  text: PropTypes.node,
  align: PropTypes.oneOf(['left', 'center']),
  as: PropTypes.elementType,
  children: PropTypes.node,
};

export default SectionHeader;
