import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import other components
import AppItem from '../../shared/AppItem';
import AppListStatusBar from './AppListStatusBar';

class AppList extends Component {
  render() {
    const {
      storeHost,
      apps,
      tagColors,
      onAppSelected,
      isFiltering,
    } = this.props;

    // display or hide the status bar depending on if it's being filtered
    const statusBarElement = (
      isFiltering
        ? <AppListStatusBar appCount={apps.length} />
        : null
    );

    // map each app to AppItem element to render
    const appElements = Object.keys(apps).map((appId) => {
      return (
        <AppItem
          key={appId}
          app={apps[appId]}
          tagColors={tagColors}
          storeHost={storeHost}
          onClick={onAppSelected}
          dark
        />
      );
    });

    return (
      <div className="app-list-container d-flex flex-column">
        {statusBarElement}
        {appElements}
      </div>
    );
  }
}

AppList.propTypes = {
  // The hostname of the store
  storeHost: PropTypes.string.isRequired,
  // The apps we need to display
  apps: PropTypes.objectOf(PropTypes.object).isRequired,
  // The tags color information for the app
  tagColors: PropTypes.objectOf(PropTypes.object).isRequired,
  // Function called when specific app in app list is clicked
  onAppSelected: PropTypes.func.isRequired,
  // Bool that determines if apps are being filtered
  isFiltering: PropTypes.bool,
};

AppList.defaultProps = {
  // By default, the apps are not being filtered
  isFiltering: false,
};

export default AppList;
