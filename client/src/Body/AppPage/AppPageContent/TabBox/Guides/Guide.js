import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Step from './Step';

/**
 * Renders the individual guide from store metadata
 */
class Guide extends Component {
  render() {
    // deconstruct props
    const { guide } = this.props;
    const { title, steps } = guide;

    const greaterTen = (steps.length >= 10);
    // Maps the steps to stepsToRender with styling and number
    const stepsToRender = steps.map((step, index) => {
      const keyName = `step-${index}`;
      return (
        <div key={keyName} className="steps-container">
          <Step step={step} greaterTen={greaterTen} stepNum={index + 1} />
        </div>
      );
    });

    return (
      <div className="card border-secondary mb-1">
        <div className="card-header bg-secondary text-light border-secondary">
          <h5 className="card-title mb-0">{title}</h5>
        </div>
        <div className="steps-container p-2">
          {stepsToRender}
        </div>
      </div>
    );
  }
}

Guide.propTypes = {
  // A guide to display
  guide: PropTypes.shape({
    // Header for the guide
    title: PropTypes.string.isRequired,
    // String of steps to display
    steps: PropTypes.arrayOf(
      PropTypes.string
    ).isRequired,
  }).isRequired,
};

export default Guide;
