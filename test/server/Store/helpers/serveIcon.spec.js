const path = require('path');
const assert = require('assert');
const ExpressApp = require('../../../dummy-objects/ExpressApp');
const serveIcon = require('../../../../server/Store/helpers/serveIcon');
const appWithNoFile = require('../../../dummy-data/store/medium/pe/swipein/metadata');

const myExpressApp = new ExpressApp();

describe.only('server > Store > helpers > serveIcon', function () {
  it('does nothing if no icon property', async function () {
    const opts = {
      expressApp: new ExpressApp(),
      catalogId: 'dce',
      appId: 'gradeup',
      app: { title: 'GradeUp', creator: 'dce' },
    };
    const app = await serveIcon(opts);
    assert.deepEqual(opts.app, app, 'The app returned is not the same app');
  });

  it('throws error for non-existing icon', async function () {
    const opts = {
      expressApp: myExpressApp,
      catalogId: 'pe',
      appId: 'swipein',
      app: appWithNoFile,
    };
    let errorOccurred = false;
    try {
      await serveIcon(opts);
    } catch (err) {
      if (
        err.message.startsWith('The app')
        && err.message.includes('but that icon does not exist')
      ) {
        // The correct error occurred
        errorOccurred = true;
      } else {
        // Another error occurred (we didn't expect this!)
        throw err;
      }
    }

    if (!errorOccurred) {
      throw new Error('This test should have thrown error for a non-existant file');
    }
  });

  // it('returns updated app if there is an icon', async function () {
  //   appWithIcon.icon.fullPath = path.join(__dirname, '../../../dummy-data/images/question_mark.png');
  //   const myExpressApp = new ExpressApp();
  //   const opts = {
  //     expressApp: myExpressApp,
  //     catalogId: 'dce',
  //     appId: 'swipein',
  //     app: appWithIcon,
  //   };
  //   const app = await serveIcon(opts);
  //   assert(app.icon.url, 'URL property does not exist for the icon');
  // });

  // it('checks correct url added to icon\'s property', async function () {
  //   appWithIcon.icon.fullPath = path.join(__dirname, '../../../dummy-data/images/question_mark.png');
  //   const myExpressApp = new ExpressApp();
  //   const opts = {
  //     expressApp: myExpressApp,
  //     catalogId: 'dce',
  //     appId: 'swipein',
  //     app: appWithIcon,
  //   };
  //   const app = await serveIcon(opts);
  //   console.log('URL: ', app.icon.url);
  //   assert.equal(app.icon.url, '/public/dce/swipein/icon/question_mark.png', 'The URL does not match the format ');
  // });
});
