import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import AppItem from '.';

describe('client > src > shared > AppItem', () => {
  // fake app to pass into appItem
  const fakeApp = {
    title: 'GradeUp',
    subtitle: 'greade up is a great tool',
    creator: ['dce'],
    icon: {
      url: '/public/dce/gradeup/icon',
    },
    appId: 'gradeup',
    supportEmail: 'example@harvard.edu',
    tags: {
      cost: ['free'],
      type: ['grading'],
    },
  };
  // fake tagColor to pass into appItem
  const fakeTagColor = {
    cost: {
      color: 'blue',
    },
    type: {
      color: 'red',
    },
  };
  // fake StoreHost to pass into appItem
  const fakeStoreHost = 'localhost';

  it('Displays the AppItem', async () => {
    const driver = new Driver(
      <AppItem
        app={fakeApp}
        tagColors={fakeTagColor}
        storeHost={fakeStoreHost}
      />
    );
    // displays the app title
    assert(driver.elementExists('.app-title'), 'did not render app title');
    // displays the app subtitle
    assert(driver.elementExists('.app-subtitle'), 'did not render app subtitle');
    // displays the app tags
    assert(driver.elementExists('.apptags-tags-list'), 'did not render app tags');
    const appTagsHTML = driver.getHTML('.apptags-tags-list');
    const tagsCount = (appTagsHTML.match(/apptag-single-tag/g) || []).length;
    assert.equal(tagsCount, 2, 'app tags did not render correctly');
    // displays the app icon
    assert(driver.elementExists('.app-icon'), 'did not render app icon');
    const appIconHTML = driver.getHTML('.app-icon');
    assert(appIconHTML.includes('<img'), 'app icon did not render correctly');
    // displays the app creator tag
    assert(driver.elementExists('.appcreatortag-box'), 'did not render app creator tag');
  });
});
