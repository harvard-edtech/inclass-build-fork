const assert = require('assert');
const path = require('path');
const proxyquire = require('proxyquire');

// use proxiquire to redirect store path to testing folder
const dummyPath = path.join(__dirname, '../../../dummy-data/store/medium');
const loadCatalogMetadata = proxyquire('../../../../server/Store/helpers/loadCatalogMetadata', {
  '../STORE_CONSTANTS': {
    path: dummyPath,
  },
});

describe('server > Store > helpers > loadCatalogMetadata', function () {
  it('contains all the required fields', async function () {
    const testMetadata = await loadCatalogMetadata('dce');
    const requiredKeys = ['title', 'accounts', 'tagsToShow', 'defaultSupportEmail'];
    const testKeys = Object.keys(testMetadata);
    Object.keys(testMetadata).forEach((testKey) => {
      // check that key is populated
      assert(testMetadata[testKey], `the key: ${testKey} is not populated`);
      assert(requiredKeys.includes(testKey), `the key ${testKey} is not read in correctly`);
    });
    // check that file has all fields
    assert(requiredKeys.length === testKeys.length, 'number of keys read in does not match in the metadata file');
  });
});
