import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Contact.scss';
import SectionHeading from '../SectionHeading/SectionHeading';
import { Icon } from '@iconify/react';
import SocialLinks from '../SocialLinks/SocialLinks';

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const INITIAL = { name: '', email: '', subject: '', message: '' };

const Contact = ({ data, socialData }) => {
  const { title, text, subTitle, formTitle } = data;
  const formRef = useRef(null);
  const [fields, setFields]   = useState(INITIAL);
  const [status, setStatus]   = useState(null); // 'sending' | 'success' | 'error'
  const [errMsg, setErrMsg]   = useState('');

  const handleChange = (e) => {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus('error');
      setErrMsg('Email service is not configured. Please contact me directly.');
      return;
    }
    setStatus('sending');
    setErrMsg('');
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, { publicKey: PUBLIC_KEY });
      setStatus('success');
      setFields(INITIAL);
    } catch (err) {
      setStatus('error');
      setErrMsg(err?.text || 'Something went wrong. Please try again or email me directly.');
    }
  };

  return (
    <section id="contact" className="st-dark-bg">
      <div className="st-height-b100 st-height-lg-b80"></div>
      <SectionHeading title="Contact" />
      <div className="container" data-aos="fade-up" data-aos-duration="800" data-aos-delay="500">
        <div className="row d-flex">
          <div className="col-lg-6">
            <h3 className="st-contact-title">{formTitle}</h3>

            {/* Status feedback */}
            {status === 'success' && (
              <div className="st-form-alert st-form-alert--success" role="alert">
                <Icon icon="mdi:check-circle-outline" />
                <span>Message sent! I&apos;ll get back to you soon.</span>
              </div>
            )}
            {status === 'error' && (
              <div className="st-form-alert st-form-alert--error" role="alert">
                <Icon icon="mdi:alert-circle-outline" />
                <span>{errMsg}</span>
              </div>
            )}

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="st-contact-form"
              id="contact-form"
              noValidate
            >
              <div className="st-form-field">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  value={fields.name}
                  onChange={handleChange}
                  required
                  disabled={status === 'sending'}
                />
              </div>
              <div className="st-form-field">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your Email"
                  value={fields.email}
                  onChange={handleChange}
                  required
                  disabled={status === 'sending'}
                />
              </div>
              <div className="st-form-field">
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Your Subject"
                  value={fields.subject}
                  onChange={handleChange}
                  required
                  disabled={status === 'sending'}
                />
              </div>
              <div className="st-form-field">
                <textarea
                  cols="30"
                  rows="10"
                  id="message"
                  name="message"
                  placeholder="Your Message"
                  value={fields.message}
                  onChange={handleChange}
                  required
                  disabled={status === 'sending'}
                />
              </div>
              <button
                className="st-btn st-style1 st-color1 st-contact-submit"
                type="submit"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? (
                  <>
                    <span className="st-spinner" aria-hidden="true" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Icon icon="mdi:send-outline" />
                    Send Message
                  </>
                )}
              </button>
            </form>
            <div className="st-height-b0 st-height-lg-b30"></div>
          </div>
          <div className="col-lg-6">
            <div className="st-height-b0 st-height-lg-b40"></div>
            <h3 className="st-contact-title">{title}</h3>
            <div className="st-contact-text">{text}</div>
            <div className="st-contact-info-wrap">
              <div className="st-single-contact-info">
                <div className="st-icon-wrap">
                  <Icon icon="fa-regular:envelope" />
                </div>
                <div className="st-single-info-details">
                  <h4>Email</h4>
                  <Link to="mailto:shair6470@gmail.com">shair6470@gmail.com</Link>
                </div>
              </div>
              <div className="st-single-contact-info">
                <div className="st-icon-wrap">
                  <Icon icon="fa-solid:phone-alt" />
                </div>
                <div className="st-single-info-details">
                  <h4>Phone</h4>
                  <a href="https://wa.me/923074734113" target="_blank" rel="noopener noreferrer">+923074734113</a>
                </div>
              </div>
              <div className="st-social-info">
                <div className="st-social-text">{subTitle}</div>
                <SocialLinks data={socialData} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="st-height-b100 st-height-lg-b80"></div>
    </section>
  );
};

Contact.propTypes = {
  data: PropTypes.object,
  socialData: PropTypes.array,
};

export default Contact;
