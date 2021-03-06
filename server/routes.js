const Store = require('./Store');
const writeLog = require('./writeLog');

module.exports = (expressApp) => {
  // Create an instance of the store
  const store = new Store(expressApp);

  /**
   * Endpoint to shows a screenshot image
   */
  expressApp.get('/screenshot', async (req, res) => {
    // respond with an error if req.api or req.session.launchInfo does not exist
    if (!req.api || !req.session.launchInfo) {
      return res.send('We couldn\'t load that screenshot because we could not connect to Canvas. Please re-launch the app store from Canvsa. If this error continues to occur, contact an admin.');
    }

    if (!req.query.i || !req.query.i.startsWith('/public/')) {
      // Invalid screenshot
      return res.send('We couldn\'t load that screenshot because an error occurred. If this error continues to occur, please contact an admin.');
    }

    return res.send(`
      <body>
        <img
          src="${req.query.i}"
          style="text-align: center; position: fixed; top: 0; bottom: 0; left: 0; right: 0; marin: auto; overflow: auto; max-width: 100%; max-height: 100%;"
        />
      </body>
    `);
  });

  /**
   * Endpoint that returns the store metadata
   * @return {object} store metadata response of the form:
   * {
   *   success: <true/false>,
   *   message: <error message if success is false>,
   *   store: <store metadata if success is true>,
   * }
   */
  expressApp.get('/store', async (req, res) => {
    // Get the store metadata using the getStoreMetadata function
    // If that doesn't work, we throw an error
    try {
      const storeMetadata = store.getStoreMetadata();
      // If storeMetadata 'exists' but is empty, we want to show an error
      if (!storeMetadata || Object.keys(storeMetadata).length === 0) {
        return res.json({
          success: false,
          message: 'Store metadata is not ready. If this error continues after a few minutes, please contact an admin.',
        });
      }

      return res.json({
        success: true,
        store: storeMetadata,
        host: req.hostname,
      });
    } catch (err) {
      if (!err.code && !process.env.SILENT) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
      return res.json({
        success: false,
        message: (
          err.code
            ? err.message
            : 'An unknown error occurred while getting store metadata. If this error continues after a few minutes, please contact an admin.'
        ),
      });
    }
  });

  /**
   * Endpoint that determines the correct catalog for a user and returns the
   *   catalog metadata and also whether or not the user is an admin
   * @return {object} catalog metadata response of the form:
   * {
   *   success: <true/false>,
   *   message: <error message if success is false>,
   *   catalog: <catalog metadata if success is true>,
   *   isAdmin: <included if success is true>,
   * }
   */
  expressApp.get('/catalog', async (req, res) => {
    // respond with an error if req.api or req.session.launchInfo does not exist
    if (!req.api || !req.session.launchInfo) {
      return res.json({
        success: false,
        message: 'We couldn\'t load your list of apps because we could not connect to Canvas. Please re-launch the app store from Canvsa. If this error continues to occur, contact an admin.',
      });
    }

    try {
      const {
        catalog,
        catalogId,
        isAdmin,
      } = await store.getCatalogAndPermissions(
        req.api,
        req.session.launchInfo
      );

      // Store the catalogId to the user's session
      req.session.catalogId = catalogId;

      // Store isAdmin to the user's session
      req.session.isAdmin = isAdmin;

      // Save the session
      await new Promise((resolve, reject) => {
        req.session.save((err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });

      // Log that user loaded the app store
      writeLog({
        req,
        type: 'load',
        data: {
          catalogId,
          isAdmin,
        },
      });

      return res.json({
        catalog,
        isAdmin,
        success: true,
      });
    } catch (err) {
      if (err.message === 'There is no catalog for this course') {
        return res.json({
          success: false,
          message: 'Unfortunately, your course is not yet supported by the app store: there is no app catalog associated with your course.',
        });
      }
      if (err.code) {
        return res.json({
          success: false,
          message: `An error occurred while getting the list of apps in the current catalog: ${err.message}`,
        });
      }
      // if error does not have code, log the error into console
      if (!process.env.SILENT) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
      return res.json({
        success: false,
        message: 'An unknown error occurred while getting the list of apps in the current catalog. Please contact an admin.',
      });
    }
  });

  /**
   * Endpoint that installs an app into the current course
   * @return {object} success description response of the form:
   * {
   *   success: <true/false>,
   *   message: <error message if success is false>,
   * }
   */
  expressApp.post('/install/:appId', async (req, res) => {
    try {
      const { appId } = req.params;
      const { catalogId } = req.session;
      const installData = store.getInstallData(catalogId, appId);

      let courseId;
      // Try to get courseId from the request, if it's absent, return an error
      try {
        // Make sure launchInfo exists
        ({ courseId } = req.session.launchInfo);
        // We have to check if courseId is undefined
        if (courseId === undefined) {
          return res.json({
            success: false,
            message: 'We could not install this app because we could not determine your launch course. Please contact an admin.',
          });
        }
      } catch (err) {
        return res.json({
          success: false,
          message: 'We could not install this app because we could not determine your launch course. Please contact an admin.',
        });
      }

      // If getInstallData returns null
      // return success is false and error message
      if (!installData) {
        return res.json({
          success: false,
          message: 'We cannot find this app\'s installation details. Please contact an admin.',
        });
      }
      const {
        name,
        description,
        key,
        secret,
        xml,
        launchPrivacy,
      } = installData;

      // Log that user installed an app
      writeLog({
        req,
        type: 'install',
        data: {
          appId,
          appName: name,
        },
      });

      // Installs the app
      await req.api.course.app.add({
        courseId,
        name,
        key,
        secret,
        xml,
        description,
        launchPrivacy,
      });
      return res.json({ success: true });
    } catch (err) {
      // If error has code then return success is false
      // And what the error message is
      if (err.code) {
        return res.json({
          success: false,
          message: `An error occurred while getting the list of apps in the current catalog: ${err.message}`,
        });
      }
      // If error doesn't have code
      if (!process.env.SILENT) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
      return res.json({
        success: false,
        message: 'An unknown error occurred while installing this app. Please contact an admin.',
      });
    }
  });

  /**
   * Endpoint that uninstalls an app from the current course
   * @param {string} ltiIds - the JSONified list of lti app ids from Canvas to
   * @param {string} appName - the name of the app being uninstalled
   * @param {string} appId - the id of the app being uninstalled
   *   uninstall (once parsed, type should be string[])
   * @return {object} success description response of the form:
   * {
   *   success: <true/false>,
   *   message: <error message if success is false>,
   * }
   */
  expressApp.post('/uninstall', async (req, res) => {
    let courseId;
    // Try to get courseId from the request, if it's not there, return an error
    try {
      // Make sure launchInfo exists
      ({ courseId } = req.session.launchInfo);
      // We have to check if courseId is undefined
      if (courseId === undefined) {
        return res.json({
          success: false,
          message: 'We could not uninstall this app because we could not determine your launch course. Please contact an admin.',
        });
      }
    } catch (err) {
      return res.json({
        success: false,
        message: 'We could not uninstall this app because we could not determine your launch course. Please contact an admin.',
      });
    }
    // We get the ltiIds out of the request body and these are our apps
    // that we want to uninstall
    let ltiIds;
    try {
      ltiIds = JSON.parse(req.body.ltiIds);
      if (!Array.isArray(ltiIds)) {
        ltiIds = [ltiIds];
      }
    } catch (err) {
      return res.json({
        success: false,
        message: 'We could not uninstall this app because we couldn\'t understand the request from the client. Please contact an admin.',
      });
    }

    // Get app info
    const { appId, appName } = req.body;

    // Log that user uninstalled an app
    writeLog({
      req,
      type: 'uninstall',
      data: {
        appId,
        appName,
      },
    });

    // go through the list of apps to delete
    for (let i = 0; i < ltiIds.length; i++) {
      try {
        await req.api.course.app.remove({
          courseId,
          appId: ltiIds[i],
        });
      } catch (err) {
        if (!err.code && !process.env.SILENT) {
          // eslint-disable-next-line no-console
          console.log(err);
        }
        return res.json({
          success: false,
          message: err.code
            ? `An error occurred while attempting to uninstall an app: ${err.message}`
            : 'An unknown error occurred while attemping to uninstall an app. Please contact an admin.',
        });
      }
    }
    // All apps were deleted without an error occurring
    return res.json({
      success: true,
    });
  });

  /**
   * Client-side logging endpoint
   * @param {string} type - the type of log object
   * @param {object} data - the data in the log object
   */
  expressApp.post('/log', async (req, res) => {
    // Log that user loaded the app store
    writeLog({
      req,
      type: req.body.type,
      data: req.body.data,
    });

    return res.json({
      success: true,
    });
  });

  /**
   * Endpoint that returns a list of installed apps
   * @return {object} success description response of the form:
   * {
   *   success: <true/false>,
   *   message: <error message if success is false>,
   *   apps: [
   *     {
   *       ltiIds: array of the lti ids that match this appId,
   *       appId: the app's app store id,
   *     },
   *     ...
   *   ],
   * }
   */
  expressApp.get('/installed-apps', async (req, res) => {
    // the initRoutesWithInstallableStore function replaces this with fake store
    const currentCatalog = store.getCatalog(req.session.catalogId);
    // if no catalog returned, throw an error
    if (!currentCatalog || currentCatalog === null) {
      return res.json({
        success: false,
        message: 'We could not get your list of currently installed apps because your session has expired. Please re-launch from Canvas. If this issue continues to occur, please contact an admin.',
      });
    }
    try {
      const { courseId } = req.session.launchInfo;
      // get a list of apps under the courseId
      const ltiApps = await req.api.course.app.list({ courseId });
      // initiate object to return
      const matchingApps = [];
      // find matches between catalogApps and LTI Apps
      Object.keys(currentCatalog.apps).forEach((catalogAppId) => {
        const catalogApp = currentCatalog.apps[catalogAppId];
        const { key, xml } = store.getInstallData(
          req.session.catalogId,
          catalogAppId
        );
        let matchingApp = {};
        ltiApps.forEach((ltiApp) => {
          if (
            ltiApp.consumer_key === key
            && ltiApp.name === catalogApp.title
            && xml.includes(ltiApp.url)
          ) {
            if (!matchingApp.ltiIds) {
              matchingApp.ltiIds = [];
            }
            matchingApp.ltiIds.push(ltiApp.id);
            matchingApp.appId = catalogAppId;
          }
        });
        // if matchingApp is not empty
        if (Object.keys(matchingApp).length !== 0) {
          matchingApps.push(matchingApp);
        }
        matchingApp = {};
      });
      return res.json({
        success: true,
        apps: matchingApps,
      });
    } catch (err) {
      return res.json({
        success: false,
        message: 'Please re-launch this app from Canvas to continue. If this continues to occur, please contact an admin',
      });
    }
  });

  return store;
};
