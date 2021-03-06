import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './AppCreatorTag.css';

class AppCreatorTag extends Component {
  constructor(props) {
    super(props);

    // construct the message depending on the number of creator
    const { creator } = this.props;
    let message;
    if (creator.length === 1) {
      message = creator[0];
    } else if (creator.length === 2) {
      message = `${creator[0]} and ${creator[1]}`;
    } else {
      let newMessage = creator[0];
      for (let i = 1; i < creator.length; i++) {
        newMessage += (
          (i === creator.length - 1)
            ? `, and ${creator[i]}`
            : `, ${creator[i]}`
        );
      }
      message = newMessage;
    }

    this.state = {
      // the message to display in the creator box
      message,
    };
  }

  render() {
    // Deconstruct state
    const { message } = this.state;

    // Deconstruct props
    const { dark } = this.props;

    const className = `badge ${dark ? 'bg-secondary' : 'badge-light'} ${dark ? 'text-white' : 'text-dark'} p-2 appcreatortag-box`;
    return (
      <span className={className}>
        <span className="font-weight-light">
          by&nbsp;
        </span>
        {message}
      </span>
    );
  }
}

AppCreatorTag.propTypes = {
  // array of strings that are the creators for the app
  creator: PropTypes.arrayOf(PropTypes.string).isRequired,
  // whether the background is dark or light
  dark: PropTypes.bool,
};

AppCreatorTag.defaultProps = {
  // if not passed in, assume to render the appItem light
  dark: undefined,
};

export default AppCreatorTag;
