import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

/** One button style for internal links, external links and form buttons. */
const Button = ({ to, href, variant = 'primary', size = 'md', icon, iconLeft, children, className = '', ...rest }) => {
  const classes = `btn btn--${variant} btn--${size} ${className}`.trim();
  const content = (
    <>
      {iconLeft && <Icon icon={iconLeft} className="btn__icon" aria-hidden="true" />}
      <span>{children}</span>
      {icon && <Icon icon={icon} className="btn__icon btn__icon--end" aria-hidden="true" />}
    </>
  );

  if (to) {
    return <Link to={to} className={classes} {...rest}>{content}</Link>;
  }
  if (href) {
    const external = /^https?:/.test(href);
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {content}
      </a>
    );
  }
  return <button type="button" className={classes} {...rest}>{content}</button>;
};

Button.propTypes = {
  to: PropTypes.string,
  href: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'ghost', 'outline', 'whatsapp']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  icon: PropTypes.string,
  iconLeft: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Button;
