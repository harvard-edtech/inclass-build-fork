import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import other components
import Screenshots from './TabBox/Screenshots';
import Info from './TabBox/Info';

import Guides from './TabBox/Guides';

// Names of tabs
import TAB_NAMES from './TAB_NAMES';
import TabBar from './TabBar';

/**
 * Renders the app page content with tab bar and information based off the
 *   active tab. Contains the logic that determines which tab and content to
 *   show
 */
class AppPageContent extends Component {
  constructor(props) {
    super(props);
    // Deconstruct Props
    const { app } = this.props;
    const {
      screenshots,
      guides,
    } = app;

    // Shows which tab to show depending on the tabs available
    let startTab;
    if (screenshots) {
      startTab = TAB_NAMES.SCREENSHOTS;
    } else if (guides) {
      startTab = TAB_NAMES.GUIDES;
    } else {
      startTab = TAB_NAMES.INFO;
    }
    this.state = {
      // the tab that is displayed
      currentTab: startTab,
    };

    this.tabChanged = this.tabChanged.bind(this);
  }

  // Changes the current tab to what is passed in
  tabChanged(newTabName) {
    this.setState({
      currentTab: newTabName,
    });
  }


  render() {
    // Deconstruct props
    const { app, storeHost } = this.props;
    // Deconstruct state
    const { currentTab } = this.state;
    // Deconstruct app
    const {
      screenshots,
      guides,
      description,
      requestInstallEmail,
      placement,
    } = app;

    let screenshotsExist = false;
    let guidesExist = false;

    if (screenshots) {
      screenshotsExist = true;
    }

    if (guides) {
      guidesExist = true;
    }

    // Changes display based on tabs
    let contentToDisplay;
    if (currentTab === TAB_NAMES.INFO) {
      contentToDisplay = (
        <Info
          description={description}
          requestInstallEmail={requestInstallEmail}
          placement={placement}
        />
      );
    } else if (currentTab === TAB_NAMES.GUIDES) {
      contentToDisplay = (
        <Guides app={app} />
      );
    } else {
      contentToDisplay = (
        <Screenshots app={app} storeHost={storeHost} />
      );
    }
    return (
      <div className="appPageContent-container p-2">
        <TabBar
          currentTab={currentTab}
          onTabChanged={this.tabChanged}
          screenshotsExist={screenshotsExist}
          guidesExist={guidesExist}
        />
        {contentToDisplay}
      </div>
    );
  }
}

AppPageContent.propTypes = {
  // The app to display
  app: PropTypes.shape({
    // Placements
    placement: PropTypes.arrayOf(PropTypes.string).isRequired,
    // Array of screenshots in the app (Note: what is currently needed)
    screenshots: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        url: PropTypes.string,
      })
    ),
    // Array of guides
    guides: PropTypes.arrayOf(
      PropTypes.shape({
        // a string for the title of the guide
        title: PropTypes.string,
        // array of strings to iterate the steps for each guide
        steps: PropTypes.arrayOf(
          PropTypes.string
        ),
      })
    ),
    // The description of the app
    description: PropTypes.string,
    // Defined if the app requires an install
    requestInstallEmail: PropTypes.string,
  }).isRequired,


  // The host for the URL
  storeHost: PropTypes.string.isRequired,
};

export default AppPageContent;
