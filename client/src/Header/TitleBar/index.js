import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import other components
import StoreTitle from './StoreTitle';

// Import stylesheet
import './style.css';

class TitleBar extends Component {
  render() {
    // Deconstruct any props needed by titlebar or its children
    const {
      storeTitle,
    } = this.props;

    return (
      <div className="titlebar-container row">
        <div className="col text-right">
          <StoreTitle storeTitle={storeTitle} />
        </div>
        <div className="col text-left">
          Fake Div
        </div>
      </div>
    );
  }
}

TitleBar.propTypes = {
  storeTitle: PropTypes.string.isRequired,
};

export default TitleBar;
