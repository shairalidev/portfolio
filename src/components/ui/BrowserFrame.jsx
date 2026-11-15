import PropTypes from 'prop-types';

/** Minimal browser chrome around a screenshot or video, showing the site's address. */
const BrowserFrame = ({ url, className = '', children }) => {
  const host = url ? url.replace(/^https?:\/\//, '').replace(/\/$/, '') : '';
  return (
    <div className={`browser ${className}`.trim()}>
      <div className="browser__bar" aria-hidden="true">
        <span className="browser__dots"><i /><i /><i /></span>
        {host && <span className="browser__url">{host}</span>}
      </div>
      <div className="browser__view">{children}</div>
    </div>
  );
};

BrowserFrame.propTypes = {
  url: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default BrowserFrame;
