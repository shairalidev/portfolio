import { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Icon } from '@iconify/react';
import { profile, whatsappUrl } from '../../lib/content';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const PROJECT_TYPES = ['New web app / SaaS', 'Marketplace or real-time app', 'Payments integration', 'AI assistant / automation', 'Take over an existing project', 'Something else'];
const BUDGETS = ['Under $1,000', '$1,000 – $5,000', '$5,000 – $15,000', '$15,000+', 'Not sure yet'];
const INITIAL = { name: '', email: '', type: PROJECT_TYPES[0], budget: BUDGETS[4], message: '', website: '' };

const ContactForm = () => {
  const [fields, setFields] = useState(INITIAL);
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [error, setError] = useState('');
  const successRef = useRef(null);

  // The form is replaced by the success message: move focus there so screen readers announce it.
  useEffect(() => {
    if (status === 'success') successRef.current?.focus();
  }, [status]);

  const update = (e) => {
    e.target.setCustomValidity('');
    setFields((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Honeypot: bots fill hidden fields. Pretend it worked so they don't retry.
    if (fields.website) {
      setStatus('success');
      return;
    }
    const form = e.currentTarget;
    const trimmed = { ...fields, name: fields.name.trim(), email: fields.email.trim(), message: fields.message.trim() };
    setFields(trimmed);
    form.elements.namedItem('name').setCustomValidity(trimmed.name ? '' : 'Please enter your name.');
    form.elements.namedItem('message').setCustomValidity(trimmed.message.length >= 10 ? '' : 'Please tell me a little about the project.');
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus('error');
      setError('The form is temporarily unavailable. Please email me or use WhatsApp.');
      return;
    }
    setStatus('sending');
    setError('');
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: trimmed.name,
          email: trimmed.email,
          subject: `${fields.type} (${fields.budget})`,
          message: `${trimmed.message}\n\nProject type: ${fields.type}\nBudget: ${fields.budget}`,
        },
        { publicKey: PUBLIC_KEY }
      );
      setStatus('success');
      setFields(INITIAL);
    } catch (err) {
      setStatus('error');
      setError(err?.text || 'Something went wrong. Please try again, or email me directly.');
    }
  };

  if (status === 'success') {
    return (
      <div className="form-success" role="status">
        <Icon icon="solar:check-circle-bold-duotone" aria-hidden="true" />
        <h3 ref={successRef} tabIndex={-1}>Thanks, your message is on its way.</h3>
        <p>I&apos;ll reply within one business day. Need a faster answer? Message me on WhatsApp.</p>
        <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn btn--whatsapp btn--md">
          <Icon icon="ic:baseline-whatsapp" className="btn__icon" aria-hidden="true" />
          <span>Open WhatsApp</span>
        </a>
      </div>
    );
  }

  const sending = status === 'sending';

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="field-row">
        <label className="field">
          <span>Your name</span>
          <input name="name" type="text" autoComplete="name" required value={fields.name} onChange={update} disabled={sending} />
        </label>
        <label className="field">
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" required value={fields.email} onChange={update} disabled={sending} />
        </label>
      </div>

      <div className="field-row">
        <label className="field">
          <span>What do you need?</span>
          <select name="type" value={fields.type} onChange={update} disabled={sending}>
            {PROJECT_TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
        </label>
        <label className="field">
          <span>Budget</span>
          <select name="budget" value={fields.budget} onChange={update} disabled={sending}>
            {BUDGETS.map((b) => <option key={b}>{b}</option>)}
          </select>
        </label>
      </div>

      <label className="field">
        <span>Tell me about the project</span>
        <textarea
          name="message"
          rows="6"
          required
          minLength={10}
          placeholder="Goals, users, timeline and any links that help."
          value={fields.message}
          onChange={update}
          disabled={sending}
        />
      </label>

      <label className="visually-hidden" aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" value={fields.website} onChange={update} />
      </label>

      {status === 'error' && (
        <p className="form-error" role="alert">
          <Icon icon="solar:danger-triangle-linear" aria-hidden="true" /> {error}{' '}
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </p>
      )}

      <button type="submit" className="btn btn--primary btn--lg" disabled={sending}>
        {sending ? <span className="spinner" aria-hidden="true" /> : <Icon icon="solar:plane-2-linear" className="btn__icon" aria-hidden="true" />}
        <span>{sending ? 'Sending…' : 'Send message'}</span>
      </button>
    </form>
  );
};

export default ContactForm;
