import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';

const SinglePortfolio = ({ data, onSelect }) => {
  const { imgLink, title, subTitle, effect, duration, delay, imageAlt } = data;

  return (
    <div
      className="col-lg-4 col-md-6"
      data-aos={effect}
      data-aos-duration={duration}
      data-aos-delay={delay}
    >
      <button
        type="button"
        className="st-portfolio-single st-style1"
        onClick={() => onSelect(data)}
        aria-label={`Open project details for ${title}`}
      >
        <div className="st-portfolio-item">
          <div className="st-portfolio st-zoom">
            <div className="st-portfolio-img st-zoom-in">
              <img
                src={imgLink}
                alt={imageAlt || title}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="st-portfolio-item-hover">
              <Icon icon="mdi:plus-circle" />
              <h5>{title}</h5>
              <p>{subTitle}</p>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
};

SinglePortfolio.propTypes = {
  data: PropTypes.shape({
    imgLink: PropTypes.string,
    title: PropTypes.string,
    subTitle: PropTypes.string,
    effect: PropTypes.string,
    duration: PropTypes.string,
    delay: PropTypes.string,
    imageAlt: PropTypes.string,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default SinglePortfolio;
