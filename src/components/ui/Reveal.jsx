import PropTypes from 'prop-types';
import useInView from '../../hooks/useInView';

/** Fades and lifts its children into view the first time they scroll on screen. */
const Reveal = ({ as: Tag = 'div', delay = 0, variant = 'up', className = '', children, ...rest }) => {
  const [ref, inView] = useInView();
  return (
    <Tag
      ref={ref}
      className={`reveal reveal--${variant}${inView ? ' is-visible' : ''} ${className}`.trim()}
      style={{ '--reveal-delay': `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

Reveal.propTypes = {
  as: PropTypes.elementType,
  delay: PropTypes.number,
  variant: PropTypes.oneOf(['up', 'fade', 'scale', 'left', 'right']),
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Reveal;
