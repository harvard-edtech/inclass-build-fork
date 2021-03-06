// Import React
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Modal extends Component {
  /**
   * Render the Modal
   */
  render() {
    const {
      title,
      footer,
      onClose,
      children,
      titleBackgroundColor,
      noX,
    } = this.props;

    let xButton;
    if (!noX) {
      xButton = (
        <button
          type="button"
          className="close"
          onClick={onClose}
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      );
    }

    return (
      <div>
        {/* Grey out background under modal */}
        <div
          className="modal-backdrop"
          style={{
            opacity: 0.5,
          }}
        />
        <div className="modal d-block" id="modal" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              {/* Enable customized header color for different modals */}
              <div
                className="modal-header"
                style={{
                  backgroundColor: titleBackgroundColor,
                }}
              >
                <h5 className="modal-title">{title}</h5>
                {xButton}
              </div>
              <div
                className="modal-body border-bottom-0"
                style={{
                  maxHeight: '70vh',
                  overflowY: 'scroll',
                  overflowX: 'hidden',
                }}
              >
                {children}
              </div>
              {/* Optional footer */}
              {footer && (
                <div className="modal-footer border-top-0">
                  {footer}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  /* The title of the modal */
  title: PropTypes.node.isRequired,
  /* The color of the title */
  titleBackgroundColor: PropTypes.string,
  /* The footer of the modal */
  footer: PropTypes.node,
  /* Function to call when the modal is closed */
  onClose: PropTypes.func,
  /* the children contains the body */
  children: PropTypes.node.isRequired,
  /* If true, no X button is shown */
  noX: PropTypes.bool,
};

Modal.defaultProps = {
  /* the default modal does not have a footer */
  footer: null,
  /* By default, nothing happens when onClose is clicked */
  onClose: () => {},
  /* the default title background is transparent */
  titleBackgroundColor: '#eee',
  /* By default, the X button is shown */
  noX: false,
};

export default Modal;
