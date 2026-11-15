import PropTypes from 'prop-types';
import Reveal from './Reveal';

const PageHeader = ({ eyebrow, title, text, children }) => (
  <section className="page-header">
    <div className="container">
      <Reveal>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="page-header__title">{title}</h1>
        {text && <p className="page-header__text">{text}</p>}
        {children}
      </Reveal>
    </div>
  </section>
);

PageHeader.propTypes = {
  eyebrow: PropTypes.string,
  title: PropTypes.node.isRequired,
  text: PropTypes.node,
  children: PropTypes.node,
};

export default PageHeader;
