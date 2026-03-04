import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Icon } from '@iconify/react';
import data from '../HomePageData.json';
import './ProjectDetail.scss';

const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const projects = data.portfolioData?.portfolioItems ?? [];
  const project = projects.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  if (!project) {
    return (
      <div className="st-project-not-found">
        <div className="container text-center">
          <div className="st-project-not-found-icon">
            <Icon icon="mdi:folder-off-outline" />
          </div>
          <h2>Project Not Found</h2>
          <p>This project doesn&apos;t exist or may have been moved.</p>
          <Link to="/#portfolio" className="st-btn st-style1 st-color1">
            <Icon icon="mdi:arrow-left" />
            Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  const {
    title,
    subTitle,
    description,
    videoUrl,
    technologies,
    projectUrl,
    imgLink,
    imgLinkLg,
    imageAlt,
  } = project;

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length];

  const renderVideo = () => {
    if (!videoUrl) return null;
    const isEmbed = /youtube|vimeo|dailymotion/.test(videoUrl);
    const isVideoFile = /\.mp4$|\.webm$|\.ogg$/i.test(videoUrl);

    if (isEmbed) {
      return (
        <div className="st-pdetail-video">
          <iframe
            src={videoUrl}
            title={`${title} demo video`}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      );
    }
    if (isVideoFile) {
      return (
        <div className="st-pdetail-video">
          <video controls preload="metadata">
            <source src={videoUrl} />
            Your browser does not support the video tag.
          </video>
        </div>
      );
    }
    return null;
  };

  const heroImage = imgLinkLg || imgLink;
  const metaDesc = subTitle || (description ? description.slice(0, 160) : `Project details for ${title}`);

  return (
    <>
      <Helmet>
        <title>{title} | Shair Ali Portfolio</title>
        <meta name="description" content={metaDesc} />
        <meta property="og:title" content={`${title} | Shair Ali Portfolio`} />
        <meta property="og:description" content={metaDesc} />
        {heroImage && <meta property="og:image" content={heroImage} />}
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://shairali.com/project/${slug}`} />
      </Helmet>

      <div className="st-project-detail">

        {/* ── Hero Banner ── */}
        <div
          className="st-pdetail-hero"
          style={{ backgroundImage: `url(${heroImage})` }}
          role="img"
          aria-label={imageAlt || title}
        >
          <div className="st-pdetail-hero-overlay">
            <div className="container">
              <button
                type="button"
                className="st-pdetail-back"
                onClick={() => navigate(-1)}
                aria-label="Go back"
              >
                <Icon icon="mdi:arrow-left" />
                <span>Back</span>
              </button>
              <div className="st-pdetail-hero-content">
                {technologies?.length > 0 && (
                  <div className="st-pdetail-hero-tags">
                    {technologies.slice(0, 3).map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>
                )}
                <h1>{title}</h1>
                {subTitle && <p className="st-pdetail-hero-sub">{subTitle}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* ── Main Content ── */}
        <div className="st-pdetail-body">
          <div className="container">

            {/* Video */}
            {videoUrl && (
              <div className="st-pdetail-video-section">
                <div className="st-pdetail-section-label">
                  <Icon icon="mdi:play-circle-outline" />
                  <span>Project Demo</span>
                </div>
                {renderVideo()}
              </div>
            )}

            {/* Details grid */}
            <div className="st-pdetail-grid">

              {/* Left – About */}
              <div className="st-pdetail-main">
                <div className="st-pdetail-section-label">
                  <Icon icon="mdi:information-outline" />
                  <span>About This Project</span>
                </div>
                {description && (
                  <p className="st-pdetail-description">{description}</p>
                )}

                {/* Screenshot (shown below description on desktop) */}
                {heroImage && !videoUrl && (
                  <div className="st-pdetail-screenshot">
                    <img src={heroImage} alt={imageAlt || title} loading="lazy" decoding="async" />
                  </div>
                )}
                {heroImage && videoUrl && (
                  <div className="st-pdetail-screenshot">
                    <img src={heroImage} alt={imageAlt || title} loading="lazy" decoding="async" />
                  </div>
                )}
              </div>

              {/* Right – Sidebar */}
              <aside className="st-pdetail-sidebar">
                {technologies?.length > 0 && (
                  <div className="st-pdetail-info-card">
                    <h3>
                      <Icon icon="mdi:code-tags" />
                      Tech Stack
                    </h3>
                    <div className="st-pdetail-tags">
                      {technologies.map((tech) => (
                        <span key={tech}>{tech}</span>
                      ))}
                    </div>
                  </div>
                )}

                {projectUrl && (
                  <div className="st-pdetail-info-card st-pdetail-cta-card">
                    <h3>
                      <Icon icon="mdi:rocket-launch-outline" />
                      Live Project
                    </h3>
                    <a
                      href={projectUrl}
                      className="st-btn st-style1 st-color1 st-pdetail-cta-btn"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon icon="mdi:open-in-new" />
                      View Live Project
                    </a>
                  </div>
                )}

                <div className="st-pdetail-info-card">
                  <h3>
                    <Icon icon="mdi:folder-outline" />
                    Portfolio
                  </h3>
                  <Link to="/#portfolio" className="st-pdetail-portfolio-link">
                    <Icon icon="mdi:arrow-left" />
                    All Projects
                  </Link>
                </div>
              </aside>
            </div>

            {/* ── Project Navigation ── */}
            <div className="st-pdetail-nav">
              {prevProject && prevProject.slug !== slug && (
                <Link
                  to={`/project/${prevProject.slug}`}
                  className="st-pdetail-nav-card st-pdetail-nav-prev"
                >
                  <div className="st-pdetail-nav-img">
                    <img src={prevProject.imgLink} alt={prevProject.imageAlt || prevProject.title} loading="lazy" />
                    <div className="st-pdetail-nav-img-overlay" />
                  </div>
                  <div className="st-pdetail-nav-info">
                    <span className="st-pdetail-nav-label">
                      <Icon icon="mdi:arrow-left" />
                      Previous
                    </span>
                    <span className="st-pdetail-nav-title">{prevProject.title}</span>
                  </div>
                </Link>
              )}

              {nextProject && nextProject.slug !== slug && (
                <Link
                  to={`/project/${nextProject.slug}`}
                  className="st-pdetail-nav-card st-pdetail-nav-next"
                >
                  <div className="st-pdetail-nav-img">
                    <img src={nextProject.imgLink} alt={nextProject.imageAlt || nextProject.title} loading="lazy" />
                    <div className="st-pdetail-nav-img-overlay" />
                  </div>
                  <div className="st-pdetail-nav-info">
                    <span className="st-pdetail-nav-label">
                      Next
                      <Icon icon="mdi:arrow-right" />
                    </span>
                    <span className="st-pdetail-nav-title">{nextProject.title}</span>
                  </div>
                </Link>
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetail;
