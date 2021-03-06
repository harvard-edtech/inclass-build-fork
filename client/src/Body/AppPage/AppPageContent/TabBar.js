import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TAB_NAMES from './TAB_NAMES';

/**
 * Renders the tab bar and which tab is active,
 *  if screenshots or guides don't exist, the
 *  tab will not show
 */
class TabBar extends Component {
  render() {
    // Deconstruct props
    const {
      onTabChanged,
      currentTab,
      screenshotsExist,
      guidesExist,
    } = this.props;


    let screenshotsTabElem;
    let guidesTabElem;

    if (screenshotsExist) {
      screenshotsTabElem = (
        <li className="nav-item">
          <a
            href="#screenshots"
            id="screenshots-tab-button"
            // shows screenshots if currentTab equals screenshots
            className={
              `nav-link${
                (currentTab === TAB_NAMES.SCREENSHOTS) ? ' active' : ''
              }`
            }
            onClick={() => { onTabChanged(TAB_NAMES.SCREENSHOTS); }}
          >
            Screenshots
          </a>
        </li>
      );
    }
    if (guidesExist) {
      guidesTabElem = (
        <li className="nav-item">
          <a
            href="#guides"
            id="guides-tab-button"
            // shows guides if currentTab equals guides
            className={
              `nav-link${
                (currentTab === TAB_NAMES.GUIDES) ? ' active' : ''
              }`
            }
            onClick={() => { onTabChanged(TAB_NAMES.GUIDES); }}
          >
            Guides
          </a>
        </li>
      );
    }

    return (
      <ul className="nav nav-tabs">
        {screenshotsTabElem}
        {guidesTabElem}
        <li className="nav-item">
          <a
            href="#info"
            id="info-tab-button"
            // shows info if currentTab equals info
            className={`nav-link${
              (currentTab === TAB_NAMES.INFO) ? ' active' : ''
            }`}
            onClick={() => { onTabChanged(TAB_NAMES.INFO); }}
          >
            Info
          </a>
        </li>
      </ul>
    );
  }
}

TabBar.propTypes = {
  // Sets current tab to the one clicked
  onTabChanged: PropTypes.func.isRequired,
  // The tab currently displayed
  currentTab: PropTypes.string.isRequired,
  // Boolean value for showing screenshot tab
  screenshotsExist: PropTypes.bool.isRequired,
  // Boolean value for showing guides tab
  guidesExist: PropTypes.bool.isRequired,
};

export default TabBar;
