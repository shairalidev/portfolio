import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { NAV_LINKS, profile, projects, whatsappUrl } from '../../lib/content';
import servicePages from '../../data/service-pages.json';

const Footer = () => (
  <footer className="site-footer">
    <div className="container">
      <div className="site-footer__top">
        <div className="site-footer__brand">
          <Link to="/" className="logo" aria-label={`${profile.name}, home`}>
            {profile.name}<span className="logo__dot" aria-hidden="true">.</span>
          </Link>
          <p>{profile.intro}</p>
        </div>

        <div className="site-footer__col">
          <h3>Pages</h3>
          <ul>
            {NAV_LINKS.map(({ to, label }) => (
              <li key={to}><Link to={to}>{label}</Link></li>
            ))}
          </ul>
        </div>

        <div className="site-footer__col">
          <h3>Services</h3>
          <ul>
            {servicePages.map((p) => (
              <li key={p.slug}><Link to={`/services/${p.slug}`}>{p.eyebrow}</Link></li>
            ))}
          </ul>
        </div>

        <div className="site-footer__col">
          <h3>Case studies</h3>
          <ul>
            {projects.map((p) => (
              <li key={p.slug}><Link to={`/work/${p.slug}`}>{p.title}</Link></li>
            ))}
          </ul>
        </div>

        <div className="site-footer__col">
          <h3>Get in touch</h3>
          <ul>
            <li>
              <a href={`mailto:${profile.email}`}><Icon icon="solar:letter-linear" aria-hidden="true" /> Email</a>
            </li>
            <li>
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                <Icon icon="ic:baseline-whatsapp" aria-hidden="true" /> WhatsApp
              </a>
            </li>
            <li>
              <a href={profile.cv} target="_blank" rel="noopener noreferrer">
                <Icon icon="solar:document-text-linear" aria-hidden="true" /> Résumé (PDF)
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="site-footer__bottom">
        <p>© {new Date().getFullYear()} {profile.name}. Designed &amp; built by me.</p>
        <div className="social-row">
          {profile.socials.map((s) => (
            <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
              <Icon icon={s.icon} />
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
