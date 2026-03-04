import { Link, useLocation } from 'react-router-dom';
import './Header.scss';
import PropTypes from 'prop-types';
import { Link as ScrollLink } from 'react-scroll';
import { useState } from 'react';

const NAV_ITEMS = [
  { to: 'home',      label: 'Home' },
  { to: 'about',     label: 'About' },
  { to: 'resume',    label: 'Resume' },
  { to: 'portfolio', label: 'Portfolio' },
  { to: 'contact',   label: 'Contact' },
];

const NavItem = ({ to, label, isHome, onClose }) => {
  if (isHome) {
    return (
      <ScrollLink to={to} spy={true} smooth={true} offset={-80} duration={500} onClick={onClose}>
        {label}
      </ScrollLink>
    );
  }
  return (
    <Link to={`/#${to}`} onClick={onClose}>
      {label}
    </Link>
  );
};

NavItem.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isHome: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

const Header = () => {
  const [mobileToggle, setMobileToggle] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  const handleToggleMenu = () => setMobileToggle((v) => !v);
  const handleClose = () => setMobileToggle(false);

  return (
    <header className="st-site-header st-style1 st-sticky-header">
      <div className="st-main-header">
        <div className="container">
          <div className="st-main-header-in">
            <div className="st-main-header-left">
              <Link className="st-site-branding" to="/" id="hero">
                <img src="/images/logo.png" alt="Shair Ali – Full Stack Developer Pakistan" fetchpriority="high" decoding="async" />
              </Link>
            </div>
            <div className="st-main-header-right">
              <div className="st-nav">
                <ul
                  className="st-nav-list st-onepage-nav"
                  style={{ display: mobileToggle ? 'block' : 'none' }}
                >
                  {NAV_ITEMS.map(({ to, label }) => (
                    <li key={to}>
                      <NavItem to={to} label={label} isHome={isHome} onClose={handleClose} />
                    </li>
                  ))}
                </ul>
                <div
                  className={`st-munu-toggle ${mobileToggle ? 'st-toggle-active' : ''}`}
                  onClick={handleToggleMenu}
                >
                  <span></span>
                </div>
                <div className="sp-phone">
                  <svg viewBox="0 0 513.64 513.64">
                    <path d="M499.66,376.96l-71.68-71.68c-25.6-25.6-69.12-15.359-79.36,17.92c-7.68,23.041-33.28,35.841-56.32,30.72c-51.2-12.8-120.32-79.36-133.12-133.12c-7.68-23.041,7.68-48.641,30.72-56.32c33.28-10.24,43.52-53.76,17.92-79.36l-71.68-71.68c-20.48-17.92-51.2-17.92-69.12,0l-48.64,48.64c-48.64,51.2,5.12,186.88,125.44,307.2c120.32,120.32,256,176.641,307.2,125.44l48.64-48.64C517.581,425.6,517.581,394.88,499.66,376.96z" />
                  </svg>
                  <a href="https://wa.me/923074734113" target="_blank" rel="noopener noreferrer" className="sp-phone-no">
                    +923074734113
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  data: PropTypes.object,
};

export default Header;
