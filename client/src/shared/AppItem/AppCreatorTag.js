import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './AppCreatorTag.css';

class AppCreatorTag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
  }

  async componentDidMount() {
    const { creator } = this.props;
    if (creator.length === 1) {
      this.setState({
        message: `By ${creator[0]}`,
      });
    } else if (creator.length === 2) {
      this.setState({
        message: `By ${creator[0]} and ${creator[1]}`,
      });
    } else {
      let newMessage = `By ${creator[0]}`;
      for (let i = 1; i < creator.length; i++) {
        newMessage = newMessage.concat(
          (i === creator.length - 1)
            ? `, and ${creator[i]}`
            : `, ${creator[i]}`
        );
      }
      this.setState({
        message: newMessage,
      });
    }
  }

  render() {
    const { message } = this.state;
    return (
      <span className="creator-label">
        {message}
      </span>
    );
  }
}

AppCreatorTag.propTypes = {
  creator: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default AppCreatorTag;
