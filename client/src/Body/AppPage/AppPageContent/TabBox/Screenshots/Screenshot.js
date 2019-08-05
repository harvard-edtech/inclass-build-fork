import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Screenshot extends Component {
  render() {
    // Deconstruct props
    const { screenshot, index } = this.props;
    const { title, url } = screenshot;

    // Current URL for testing purposes
    const fakeURL = `https://localhost${url}`;
    return (
      // Screenshot is displayed with a header and the image
      <div className="card border-dark mb-3">
        <div className="card-header bg-secondary text-light border-secondary">
          <h5 className="card-title mb-0">{title}</h5>
        </div>
        <img
          className="card-img-top"
          id={`screenshot-${index}`}
          src={fakeURL}
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
  // Provide individual id to screenshot
  index: PropTypes.number.isRequired,
};

export default Screenshot;
