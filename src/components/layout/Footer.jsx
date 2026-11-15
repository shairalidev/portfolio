import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { NAV_LINKS, profile, projects, whatsappUrl } from '../../lib/content';

const Footer = () => (
  <footer className="site-footer">
    <div className="container">
      <div className="site-footer__top">
        <div className="site-footer__brand">
          <Link to="/" className="logo" aria-label={`${profile.name}, home`}>
            <span className="logo__mark" aria-hidden="true">SA</span>
            <span className="logo__text">
              {profile.name}
              <small>{profile.role}</small>
            </span>
          </Link>
          <p>{profile.intro}</p>
          <span className="status-pill"><i aria-hidden="true" />{profile.availability}</span>
        </div>

        <div className="site-footer__col">
          <h3>Pages</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            {NAV_LINKS.map(({ to, label }) => (
              <li key={to}><Link to={to}>{label}</Link></li>
            ))}
            <li><Link to="/credentials">Education & references</Link></li>
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
