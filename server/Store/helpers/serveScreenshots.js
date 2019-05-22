const express = require('express');

/**
 * Serves the screenshots for each app
 * @module server/Store/helpers/serveScreenshots
 * @param {object} opts - the object holding all args
 * @param {express app} opts.expressApp - the express app to adds routes to
 * @param {string} opts.catalogId - the id of the catalog holding this app
 * @param {string} opts.appId - the id of the app we're loading
 * @param {App} opts.app - an app that was just loaded
 * @return {App} new app object with a
 *   new app.screenshots[i].url field for each screenshot (the screenshot's url)
 */

module.exports = async (opts) => {
  // TODO: serve the app's screenshots individually
  // use app.screenshots[i].fullPath
  const {
    expressApp,
    catalogId,
    appId,
    app,
  } = opts;

  // Checks if app object has screenshot property
  if (Object.prototype.hasOwnProperty.call(app, 'screenshots')) {
    for (let i = 0; i < app.screenshots.length; i++) {
      const path = `/public/${catalogId}/${appId}/screenshots/`;
      try {
        expressApp.use(path, express.static(app.screenshots[i].fullPath,
          { fallthrough: false })); // Will throw 404 if file doesn't exist
      } catch (err) {
        const errMessage = `The app ${appId} in catalog ${catalogId} listed a screenshot with filename ${app.screenshots[i].filename}, but that file does not exist`;
        throw new Error(errMessage);
      }
      app.screenshots[i].url = `${path}${app.screenshots[i].filename}`; // Add url property to each screenshot
    }
  }


  // Use this path: /public/<catalogId>/<appId>/screenshots/<filename>
  return app;
};
