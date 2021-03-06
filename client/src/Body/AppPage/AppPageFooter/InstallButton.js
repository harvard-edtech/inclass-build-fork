import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './InstallButton.css';

/**
 * Renders the install button
 */
class InstallButton extends Component {
  render() {
    // Deconstruct props
    const { onClick } = this.props;
    return (
      // message: Install
      <button
        type="button"
        id="install-button"
        className="btn btn-warning btn-lg font-weight-bold pl-4 pr-4 ml-1"
        onClick={onClick}
      >
        Install
      </button>
    );
  }
}

InstallButton.propTypes = {
  // Function that installs the app
  onClick: PropTypes.func.isRequired,
};

export default InstallButton;
