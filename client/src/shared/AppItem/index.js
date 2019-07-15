import React, { Component } from 'react';
import PropTypes from 'prop-types';

import path from 'path';

// Import other components
import AppCreatorTag from './AppCreatorTag';
import AppIcon from './AppIcon';
import AppTitle from './AppTitle';
import AppSubtitle from './AppSubtitle';
import AppTags from './AppTags';

import './style.css';

class AppItem extends Component {
  render() {
    // deconstruct props object
    const {
      app,
      tagColors,
      storeHost,
    } = this.props;

    // Deconstruct the app
    const {
      title,
      subtitle,
      creator,
      tags,
      icon,
    } = app;
    const iconURL = `https://${path.join(storeHost, icon.url)}`;

    return (
      <div className="alert alert-secondary pr-3 pl-3 pt-2 pb-2">
        <div className="appitem-container">
          <AppIcon iconURL={iconURL} />
          <div className="appitem-right-container">
            <div className="appitem-title-and-creator-container">
              <AppTitle title={title} />
              <AppCreatorTag creator={creator} />
            </div>
            <AppSubtitle subtitle={subtitle} />
            <AppTags tags={tags} tagColors={tagColors} />
          </div>
        </div>
      </div>
    );
  }
}

AppItem.propTypes = {
  // the app to show
  app: PropTypes.objectOf(PropTypes.any).isRequired,
  // the tagColors
  tagColors: PropTypes.objectOf(PropTypes.object).isRequired,
  // the hostname of the store server
  storeHost: PropTypes.string.isRequired,
};

export default AppItem;
