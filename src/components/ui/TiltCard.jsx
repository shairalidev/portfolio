import PropTypes from 'prop-types';
import { useRef } from 'react';
import useReducedMotion from '../../hooks/useReducedMotion';

/**
 * 3D perspective tilt that follows the pointer, with a soft light glare.
 * Disabled for touch devices and reduced-motion users.
 */
const TiltCard = ({ max = 8, className = '', children, ...rest }) => {
  const ref = useRef(null);
  const frame = useRef(0);
  const reduced = useReducedMotion();

  const handleMove = (e) => {
    if (reduced || e.pointerType !== 'mouse') return;
    const el = ref.current;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      el.style.setProperty('--tilt-x', `${(0.5 - y) * max}deg`);
      el.style.setProperty('--tilt-y', `${(x - 0.5) * max}deg`);
      el.style.setProperty('--glare-x', `${x * 100}%`);
      el.style.setProperty('--glare-y', `${y * 100}%`);
    });
  };

  const handleLeave = () => {
    cancelAnimationFrame(frame.current);
    const el = ref.current;
    el.style.setProperty('--tilt-x', '0deg');
    el.style.setProperty('--tilt-y', '0deg');
  };

  return (
    <div
      ref={ref}
      className={`tilt ${className}`.trim()}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      {...rest}
    >
      <div className="tilt__inner">
        {children}
        <span className="tilt__glare" aria-hidden="true" />
      </div>
    </div>
  );
};

TiltCard.propTypes = {
  max: PropTypes.number,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default TiltCard;
