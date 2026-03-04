import './Review.scss';
import PropTypes from 'prop-types';

const Stars = ({ rating = 5 }) => (
  <div className="st-testimonial-stars">
    {Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? 'st-star filled' : 'st-star'}>★</span>
    ))}
  </div>
);

Stars.propTypes = { rating: PropTypes.number };

const SingleReview = ({ element }) => {
  const { imgLink, title, designation, text, rating } = element;
  return (
    <div className="st-testimonial st-style1" data--duration="0.8s" data--delay="0.2s">
      <div className="st-testimonial-text">
        <p>{text}</p>
        <div className="st-quote"><img src="/images/icon/quote.png" alt="quote" /></div>
      </div>
      <div className="st-testimonial-info">
        <div className="st-testimonial-img"><img src={imgLink} alt={title} /></div>
        <div className="st-testimonial-meta">
          <h4 className="st-testimonial-name">{title}</h4>
          <div className="st-testimonial-designation">{designation}</div>
          <Stars rating={rating} />
        </div>
      </div>
    </div>
  );
};

SingleReview.propTypes = {
  element: PropTypes.object
};

export default SingleReview;
