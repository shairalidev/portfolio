import { Icon } from '@iconify/react';
import { whatsappUrl } from '../../lib/content';

const WhatsAppButton = () => (
  <a
    href={whatsappUrl()}
    className="whatsapp-fab"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat with Shair on WhatsApp"
  >
    <Icon icon="ic:baseline-whatsapp" aria-hidden="true" />
    <span className="whatsapp-fab__label">Chat on WhatsApp</span>
  </a>
);

export default WhatsAppButton;
