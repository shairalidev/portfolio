import PropTypes from 'prop-types';
import './Portfolio.scss';
import SectionHeading from '../SectionHeading/SectionHeading';
import { useState, useCallback, useEffect } from 'react';
import SinglePortfolio from './SinglePortfolio';
import Modal from '../Modal/Modal';

const PortfolioSection = ({ data }) => {
  const { portfolioItems = [] } = data;
  const itemsPerPage = 6;

  const [visibleItems, setVisibleItems] = useState(
    portfolioItems.slice(0, itemsPerPage),
  );
  const [showLoadMore, setShowLoadMore] = useState(portfolioItems.length > itemsPerPage);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const initialItems = portfolioItems.slice(0, itemsPerPage);
    setVisibleItems(initialItems);
    setShowLoadMore(portfolioItems.length > initialItems.length);
  }, [portfolioItems]);

  const loadMoreItems = useCallback(() => {
    setVisibleItems(prevItems => {
      const nextIndex = prevItems.length;
      const nextChunk = portfolioItems.slice(nextIndex, nextIndex + itemsPerPage);
      const updatedItems = [...prevItems, ...nextChunk];

      if (updatedItems.length >= portfolioItems.length) {
        setShowLoadMore(false);
      }

      if (nextChunk.length === 0) {
        setShowLoadMore(false);
        return prevItems;
      }

      return updatedItems;
    });
  }, [portfolioItems]);

  const handleProjectSelect = useCallback((project) => {
    setSelectedProject(project);
  }, []);

  const modalClose = useCallback(() => {
    setSelectedProject(null);
  }, []);

  return (
    <>
      <section id="portfolio">
        <div className="st-height-b100 st-height-lg-b80"></div>
        <SectionHeading title={'Portfolio'} />
        <div className="container">
          <div className="row">
            {visibleItems.map((element) => (
              <SinglePortfolio data={element} key={element.title} onSelect={handleProjectSelect} />
            ))}
            <div className="col-lg-12 text-center">
              <div className="st-portfolio-btn">
                {showLoadMore && (
                  <button
                    className="st-btn st-style1 st-color1"
                    onClick={loadMoreItems}
                    type="button"
                    aria-label="Load more portfolio projects"
                  >
                    Load more
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="st-height-b100 st-height-lg-b80"></div>
      </section>
      {selectedProject && (
        <Modal project={selectedProject} modalClose={modalClose} />
      )}
    </>
  );
};

PortfolioSection.propTypes = {
  data: PropTypes.object,
};

export default PortfolioSection;


