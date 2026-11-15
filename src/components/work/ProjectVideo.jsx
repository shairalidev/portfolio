import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import useInView from '../../hooks/useInView';
import useReducedMotion from '../../hooks/useReducedMotion';

/**
 * Muted homepage loop that only plays while visible (and never for reduced-motion users).
 * If the video file is missing or fails to load, the fallback image is shown instead,
 * so a video slot can be filled later by dropping the file into public/videos/.
 */
const ProjectVideo = ({ video, title, fallback, fallbackAlt }) => {
  const [wrapRef, inView] = useInView({ once: false, threshold: 0.25, rootMargin: '0px' });
  const videoRef = useRef(null);
  const reduced = useReducedMotion();
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || failed) return;
    if (inView && !reduced) v.play().catch(() => {});
    else v.pause();
  }, [inView, reduced, failed]);

  if (failed) {
    return <img src={fallback} alt={fallbackAlt} width="1600" height="1000" />;
  }

  return (
    <div ref={wrapRef} className="project-video">
      <video
        ref={videoRef}
        poster={video.poster || fallback}
        muted
        loop
        playsInline
        preload="none"
        controls={reduced}
        aria-label={`Scrolling tour of the ${title} homepage`}
        width="1280"
        height="800"
        onError={() => setFailed(true)}
      >
        <source src={video.mp4} type="video/mp4" onError={() => setFailed(true)} />
      </video>
    </div>
  );
};

ProjectVideo.propTypes = {
  video: PropTypes.shape({ mp4: PropTypes.string.isRequired, poster: PropTypes.string }).isRequired,
  title: PropTypes.string.isRequired,
  fallback: PropTypes.string.isRequired,
  fallbackAlt: PropTypes.string,
};

export default ProjectVideo;
