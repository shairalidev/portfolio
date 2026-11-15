import PropTypes from 'prop-types';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import Reveal from '../ui/Reveal';
import Lightbox from './Lightbox';

const Gallery = ({ images }) => {
  const [active, setActive] = useState(null);

  return (
    <>
      <div className="gallery">
        {images.map((img, i) => (
          <Reveal key={img.src} delay={(i % 3) * 80} className={`gallery__item${i === 0 ? ' gallery__item--wide' : ''}`}>
            <button type="button" onClick={() => setActive(i)} aria-label={`Enlarge: ${img.alt}`}>
              <img src={img.src} alt={img.alt} loading="lazy" decoding="async" />
              <span className="gallery__zoom" aria-hidden="true"><Icon icon="solar:maximize-square-linear" /></span>
            </button>
          </Reveal>
        ))}
      </div>
      <Lightbox images={images} index={active} onClose={() => setActive(null)} onChange={setActive} />
    </>
  );
};

Gallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({ src: PropTypes.string, alt: PropTypes.string })).isRequired,
};

export default Gallery;
