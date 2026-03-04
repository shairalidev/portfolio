import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

const SinglePortfolio = ({ data }) => {
  const { imgLink, imgLinkLg, title, subTitle, slug, technologies, effect, duration, delay, imageAlt } = data;

  return (
    <div
      className="col-lg-4 col-md-6"
      data-aos={effect}
      data-aos-duration={duration}
      data-aos-delay={delay}
    >
      <Link
        to={`/project/${slug}`}
        className="st-portfolio-single st-style1"
        aria-label={`View case study: ${title}`}
      >
        <div className="st-portfolio-item">
          <div className="st-portfolio st-zoom">
            <div className="st-portfolio-img st-zoom-in">
              <img
                src={imgLink}
                srcSet={imgLinkLg ? `${imgLink} 900w, ${imgLinkLg} 1600w` : undefined}
                sizes={imgLinkLg ? '(max-width: 576px) 100vw, (max-width: 992px) 50vw, 33vw' : undefined}
                alt={imageAlt || title}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="st-portfolio-item-hover">
              <div className="st-portfolio-hover-icon">
                <Icon icon="mdi:arrow-right" />
              </div>
              <h5>{title}</h5>
              <p>{subTitle}</p>
              {technologies?.length > 0 && (
                <div className="st-portfolio-hover-tags">
                  {technologies.slice(0, 3).map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
              )}
              <span className="st-portfolio-hover-cta">View Case Study</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

SinglePortfolio.propTypes = {
  data: PropTypes.shape({
    imgLink: PropTypes.string,
    imgLinkLg: PropTypes.string,
    title: PropTypes.string,
    subTitle: PropTypes.string,
    slug: PropTypes.string,
    technologies: PropTypes.arrayOf(PropTypes.string),
    effect: PropTypes.string,
    duration: PropTypes.string,
    delay: PropTypes.string,
    imageAlt: PropTypes.string,
  }).isRequired,
};

export default SinglePortfolio;
