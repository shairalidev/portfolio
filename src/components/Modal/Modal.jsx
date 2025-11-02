import PropTypes from 'prop-types';
import { useEffect } from 'react';
import './Modal.scss';

const Modal = ({ project, modalClose }) => {
  const {
    imgLinkLg,
    imgLink,
    title,
    subTitle,
    description,
    videoUrl,
    technologies,
    projectUrl,
    imageAlt,
  } = project;

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        modalClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalClose]);

  const modalStyle = {
    backgroundColor: 'rgba(0,0,0,0.8)',
    display: 'block',
  };

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      modalClose();
    }
  };

  const renderVideo = () => {
    if (!videoUrl) {
      return null;
    }

    const isEmbed = /youtube|vimeo|dailymotion/.test(videoUrl);
    const isVideoFile = /\.mp4$|\.webm$|\.ogg$/i.test(videoUrl);

    if (isEmbed) {
      return (
        <div className="st-modal-video">
          <iframe
            src={videoUrl}
            title={`${title} demo video`}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      );
    }

    if (isVideoFile) {
      return (
        <div className="st-modal-video">
          <video controls preload="metadata">
            <source src={videoUrl} />
            Your browser does not support the video tag.
          </video>
        </div>
      );
    }

    return null;
  };

  const imageSource = imgLinkLg || imgLink;

  return (
    <div
      className="modal show fade bd-example-modal-lg"
      style={modalStyle}
      role="dialog"
      aria-modal="true"
      aria-labelledby="portfolioModalTitle"
      onClick={handleOverlayClick}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-heading">
              <h4 className="modal-title" id="portfolioModalTitle">{title}</h4>
              {subTitle && <p className="modal-subtitle">{subTitle}</p>}
            </div>
            <button
              type="button"
              className="btn-close"
              onClick={modalClose}
              aria-label="Close project details"
            ></button>
          </div>
          <div className="modal-body">
            <div className="st-modal-media">
              {renderVideo()}
              {imageSource && (
                <img
                  src={imageSource}
                  alt={imageAlt || title}
                  loading="lazy"
                  decoding="async"
                />
              )}
            </div>
            <div className="st-modal-content">
              {description && <p>{description}</p>}
              {Array.isArray(technologies) && technologies.length > 0 && (
                <div className="st-modal-tags" aria-label="Technologies used">
                  {technologies.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
              )}
              {projectUrl && (
                <a
                  href={projectUrl}
                  className="st-btn st-style1 st-color1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View live project
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  project: PropTypes.shape({
    imgLinkLg: PropTypes.string,
    imgLink: PropTypes.string,
    title: PropTypes.string,
    subTitle: PropTypes.string,
    description: PropTypes.string,
    videoUrl: PropTypes.string,
    technologies: PropTypes.arrayOf(PropTypes.string),
    projectUrl: PropTypes.string,
    imageAlt: PropTypes.string,
  }).isRequired,
  modalClose: PropTypes.func.isRequired,
};

export default Modal;
