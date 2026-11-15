import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import { absoluteUrl, profile } from '../../lib/content';

/** Trims to ~155 characters at a word boundary, the length search engines display. */
const clip = (text, max = 155) => {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[,.;:\s]+$/, '')}…`;
};

const Seo = ({ title, description, path = '/', image = profile.ogImage, imageAlt, type = 'website', jsonLd = [], noindex = false }) => {
  // Titles that already name me are used as written; others get the "| Shair Ali" suffix.
  const fullTitle = !title
    ? `${profile.name} – ${profile.role} (React, Node.js, AI)`
    : title.includes(profile.name)
      ? title
      : `${title} | ${profile.name}`;
  const alt = imageAlt || fullTitle;
  const url = absoluteUrl(path);
  const imageUrl = /^https?:/.test(image) ? image : absoluteUrl(image);
  const desc = clip(description);

  return (
    <Helmet prioritizeSeoTags>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta name="robots" content={noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'} />
      {!noindex && <link rel="canonical" href={url} />}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={alt} />
      <meta property="og:locale" content="en_US" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={alt} />
      {jsonLd.map((data, i) => (
        <script type="application/ld+json" key={i}>{JSON.stringify(data)}</script>
      ))}
    </Helmet>
  );
};

Seo.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string.isRequired,
  path: PropTypes.string,
  image: PropTypes.string,
  imageAlt: PropTypes.string,
  type: PropTypes.string,
  jsonLd: PropTypes.arrayOf(PropTypes.object),
  noindex: PropTypes.bool,
};

export default Seo;
