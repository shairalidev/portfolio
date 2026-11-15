import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Button from '../ui/Button';
import { NAV_LINKS, profile } from '../../lib/content';

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const menuRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // The menu only exists below 768px: close it if the viewport grows past that (e.g. tablet rotation).
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // While open: lock page scroll, make the page behind inert (keeps focus inside the menu), Esc closes.
  useEffect(() => {
    if (!open) return undefined;
    const behind = document.querySelectorAll('#main, .site-footer, .whatsapp-fab');
    document.body.classList.add('menu-open');
    behind.forEach((el) => el.setAttribute('inert', ''));
    menuRef.current?.querySelector('a')?.focus();
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.classList.remove('menu-open');
      behind.forEach((el) => el.removeAttribute('inert'));
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
      <div className="container site-header__inner">
        <Link to="/" className="logo" aria-label={`${profile.name}, home`}>
          <span className="logo__mark" aria-hidden="true">SA</span>
          <span className="logo__text">
            {profile.name}
            <small>{profile.role}</small>
          </span>
        </Link>

        <nav className="site-nav" aria-label="Main">
          <ul>
            {NAV_LINKS.map(({ to, label }) => (
              <li key={to}>
                <NavLink to={to} className={({ isActive }) => `site-nav__link${isActive ? ' is-active' : ''}`}>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header__actions">
          <Button to="/contact" size="sm" className="site-header__cta" icon="solar:arrow-right-up-linear">
            Let&apos;s talk
          </Button>
          <button
            ref={toggleRef}
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span /><span />
          </button>
        </div>
      </div>

      <div id="mobile-menu" ref={menuRef} className="mobile-menu" hidden={!open}>
        <nav aria-label="Mobile">
          <ul>
            <li><NavLink to="/" end className="mobile-menu__link">Home</NavLink></li>
            {NAV_LINKS.map(({ to, label }) => (
              <li key={to}>
                <NavLink to={to} className="mobile-menu__link">{label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mobile-menu__footer">
          <a href={`mailto:${profile.email}`} className="mobile-menu__mail">
            <Icon icon="solar:letter-linear" aria-hidden="true" /> {profile.email}
          </a>
          <div className="social-row">
            {profile.socials.map((s) => (
              <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                <Icon icon={s.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
