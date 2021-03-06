import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import FontAwesome Icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExternalLinkSquareAlt,
} from '@fortawesome/free-solid-svg-icons';

/**
 * Renders the individual screenshot with an image and a header
 */
class Screenshot extends Component {
  render() {
    // Deconstruct props
    const { screenshot, storeHost, index } = this.props;
    const { title, url } = screenshot;

    // the complete URL for each screenshot
    const fullURL = `https://${storeHost}${url}`;
    return (
      // Screenshot is displayed with a header and the image
      <div className="card border-secondary mb-3">
        <div className="card-header bg-secondary text-light border-secondary">
          <h5 className="card-title mb-0">
            {title}
            <a
              className="float-right text-light"
              target="_blank"
              rel="noopener noreferrer"
              href={`/screenshot?i=${url}`}
              style={{
                textDecoration: 'none !important',
              }}
            >
              <FontAwesomeIcon
                icon={faExternalLinkSquareAlt}
                alt="Open this screenshot in a new window"
                title="Open this screenshot in a new window"
              />
            </a>
          </h5>
        </div>
        <img
          className="card-img-top"
          id={`screenshot-${index}`}
          src={fullURL}
          alt={title}
        />
      </div>
    );
  }
}

Screenshot.propTypes = {
  // The screenshot to display
  screenshot: PropTypes.shape({
    // The header for the screenshot
    title: PropTypes.string.isRequired,
    // URL to grab the screenshot
    url: PropTypes.string.isRequired,
  }).isRequired,
  // Host for the URL
  storeHost: PropTypes.string.isRequired,
  // Provide individual index for id to screenshot
  index: PropTypes.number.isRequired,
};

export default Screenshot;
