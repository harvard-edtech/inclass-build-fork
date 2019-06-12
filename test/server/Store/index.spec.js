const assert = require('assert');
const ExpressApp = require('../../dummy-objects/ExpressApp');
const Store = require('../../../server/Store/index');

const expressApp = new ExpressApp();

describe('server > Store > index', function () {
  it('Checks metatdata objects untouched when error occurs', async function () {
    const store = new Store(expressApp);
    
  });

  it('Checks metadata objects are accurate', async function () {
    // Check app has url property now
    // Check app doesn't have XML etc
  });

  it('Checks getCatalogAndPermissions returns expected item', async function () {

  });

  it('Checks getInstallData when has no data for a catalog or app', async function () {

  });

  it('Checks getStoreMetadata returns expected item', async function () {

  });
});
