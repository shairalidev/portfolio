import PropTypes from 'prop-types';
import { useCallback, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import { startScroll, stopScroll } from '../../hooks/useSmoothScroll';

/** Full-screen image viewer built on <dialog>: Esc closes, arrow keys navigate. */
const Lightbox = ({ images, index, onClose, onChange }) => {
  const dialogRef = useRef(null);
  const open = index !== null;

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      stopScroll();
    }
    if (!open && d.open) d.close();
    if (!open) startScroll();
  }, [open]);

  useEffect(() => startScroll, []);

  const go = useCallback(
    (dir) => onChange((index + dir + images.length) % images.length),
    [index, images.length, onChange]
  );

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, go]);

  const current = open ? images[index] : null;

  return (
    <dialog
      ref={dialogRef}
      className="lightbox"
      data-lenis-prevent
      onClose={onClose}
      onClick={(e) => e.target === dialogRef.current && onClose()}
      aria-label="Image viewer"
    >
      {current && (
        <figure className="lightbox__figure">
          <img src={current.src} alt={current.alt ? `${current.alt}, by Shair Ali` : ''} />
          <figcaption>
            <span>{current.alt}</span>
            <span className="lightbox__count">{index + 1} / {images.length}</span>
          </figcaption>
        </figure>
      )}
      <button type="button" className="lightbox__btn lightbox__close" onClick={onClose} aria-label="Close">
        <Icon icon="solar:close-circle-linear" />
      </button>
      {images.length > 1 && (
        <>
          <button type="button" className="lightbox__btn lightbox__prev" onClick={() => go(-1)} aria-label="Previous image">
            <Icon icon="solar:alt-arrow-left-linear" />
          </button>
          <button type="button" className="lightbox__btn lightbox__next" onClick={() => go(1)} aria-label="Next image">
            <Icon icon="solar:alt-arrow-right-linear" />
          </button>
        </>
      )}
    </dialog>
  );
};

Lightbox.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({ src: PropTypes.string, alt: PropTypes.string })).isRequired,
  index: PropTypes.number,
  onClose: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Lightbox;
