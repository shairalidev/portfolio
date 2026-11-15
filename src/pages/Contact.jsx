import { Icon } from '@iconify/react';
import Seo from '../components/ui/Seo';
import PageHeader from '../components/ui/PageHeader';
import Reveal from '../components/ui/Reveal';
import ContactForm from '../components/forms/ContactForm';
import { profile, whatsappUrl } from '../lib/content';

const Contact = () => (
  <>
    <Seo
      title="Contact"
      description="Start a project with Shair Ali. Send a message or chat on WhatsApp about your web app, SaaS, marketplace, payments or AI project."
      path="/contact"
    />

    <PageHeader
      eyebrow="Contact"
      title="Let's build something great"
      text="Tell me about your project. I reply within one business day, usually much sooner."
    />

    <section className="section section--flush-top">
      <div className="container contact-layout">
        <Reveal className="contact-card contact-card--form">
          <h2>Send a message</h2>
          <ContactForm />
        </Reveal>

        <div className="contact-side">
          <Reveal delay={100}>
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="contact-card contact-card--whatsapp">
              <Icon icon="ic:baseline-whatsapp" aria-hidden="true" />
              <span>
                <strong>Chat on WhatsApp</strong>
                <small>Fastest reply, usually within the hour</small>
              </span>
              <Icon icon="solar:arrow-right-up-linear" className="contact-card__arrow" aria-hidden="true" />
            </a>
          </Reveal>
          <Reveal delay={160}>
            <a href={`mailto:${profile.email}`} className="contact-card contact-card--link">
              <Icon icon="solar:letter-bold-duotone" aria-hidden="true" />
              <span>
                <strong>Email</strong>
                <small>{profile.email}</small>
              </span>
              <Icon icon="solar:arrow-right-up-linear" className="contact-card__arrow" aria-hidden="true" />
            </a>
          </Reveal>
          <Reveal delay={220} className="contact-card">
            <h3>Elsewhere</h3>
            <ul className="contact-socials">
              {profile.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer">
                    <Icon icon={s.icon} aria-hidden="true" />
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={280} className="contact-card contact-card--note">
            <p>Remote, working with clients in the USA and Europe, with several overlapping hours every day.</p>
          </Reveal>
        </div>
      </div>
    </section>
  </>
);

export default Contact;
