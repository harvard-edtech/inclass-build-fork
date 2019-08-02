import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import EmailSubject from './EmailSubject';

describe('client > src > shared > EmailForm > EmailSubject', () => {
  it('Displays the EmailSubject', async () => {
    const driver = new Driver(
      <EmailSubject subject="this is a test subject" />
    );
    // check if add on is rendered on page
    assert(driver.elementExists('#basic-addon3'), 'did not render correctly');
    assert.equal(driver.getText('#basic-addon3'), 'Subject:', 'did not render the correct text');
    // check if input tag is rendered on page
    const inputGroupHTML = driver.getHTML('.input-group');
    assert(inputGroupHTML.includes('<input'), 'did not render input tag');
    assert.equal(driver.getAttributes('.form-control').value, 'this is a test subject', 'input field does not display the correct subject passed in');
    // check if copy button is rendered on page
    assert.equal(driver.getText('.input-group-append'), 'Copy', 'did not render copy button correctly');
  });
});
