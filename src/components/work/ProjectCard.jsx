import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import TiltCard from '../ui/TiltCard';
import BrowserFrame from '../ui/BrowserFrame';
import Reveal from '../ui/Reveal';

/** Project teaser. `feature` = large alternating row (home), `grid` = compact card (work index). */
const ProjectCard = ({ project, index, variant = 'grid' }) => {
  const videoRef = useRef(null);
  // A video slot whose file hasn't been added yet just keeps showing the cover image.
  const [videoFailed, setVideoFailed] = useState(false);
  const href = `/work/${project.slug}`;
  const { video } = project;

  const play = () => {
    const v = videoRef.current;
    if (!v || !window.matchMedia('(hover: hover)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || navigator.connection?.saveData) return;
    v.play().catch(() => {});
  };
  const stop = () => {
    const v = videoRef.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
  };

  return (
    <Reveal
      as="article"
      className={`project-card project-card--${variant}`}
      style={{ '--project': project.accent }}
      onPointerEnter={play}
      onPointerLeave={stop}
    >
      <Link to={href} className="project-card__media" tabIndex={-1} aria-hidden="true">
        <TiltCard max={variant === 'feature' ? 6 : 8}>
          <BrowserFrame url={project.liveUrl}>
            <img
              src={project.cover}
              srcSet={project.hero !== project.cover ? `${project.cover} 900w, ${project.hero} 1600w` : undefined}
              sizes={variant === 'feature' ? '(min-width: 1024px) 690px, 100vw' : '(min-width: 768px) 50vw, 100vw'}
              alt={`${project.coverAlt}, built by Shair Ali`}
              width="1600"
              height="1000"
              loading="lazy"
              decoding="async"
            />
            {video && !videoFailed && (
              <video
                ref={videoRef}
                className="project-card__video"
                src={video.mp4}
                muted
                loop
                playsInline
                preload="none"
                onError={() => setVideoFailed(true)}
              />
            )}
          </BrowserFrame>
        </TiltCard>
      </Link>

      <div className="project-card__body">
        <p className="project-card__meta">
          {typeof index === 'number' && <span className="project-card__index">{String(index + 1).padStart(2, '0')}</span>}
          <span>{project.category}</span>
          <span aria-hidden="true">·</span>
          <span>{project.year}</span>
        </p>
        <h3 className="project-card__title">
          <Link to={href}>{project.title}</Link>
        </h3>
        <p className="project-card__tagline">{project.tagline}</p>
        {variant === 'feature' && project.metrics?.length > 0 && (
          <dl className="project-card__metrics">
            {project.metrics.slice(0, 3).map((m) => (
              <div key={m.label}>
                <dt>{m.label}</dt>
                <dd>{m.value}</dd>
              </div>
            ))}
          </dl>
        )}
        <ul className="tag-list">
          {project.tags.map((tag) => <li key={tag} className="tag">{tag}</li>)}
        </ul>
        <Link to={href} className="link-arrow">
          Read case study <Icon icon="solar:arrow-right-linear" aria-hidden="true" />
        </Link>
      </div>
    </Reveal>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.object.isRequired,
  index: PropTypes.number,
  variant: PropTypes.oneOf(['grid', 'feature']),
};

export default ProjectCard;
