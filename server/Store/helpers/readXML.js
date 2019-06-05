const path = require('path');
const fileExists = require('./fileExists');
const getAppParent = require('./getAppParent');
const readFile = require('./readFile');
const readJSON = require('./readJSON');
const STORE_CONSTANTS = require('../STORE_CONSTANTS');

const STORE_PATH = STORE_CONSTANTS.path;
/**
 * Reads a XML file into text file, throws an error if the file doesn't exist or
 *   if the file is malformed
 * @module server/Store/helpers/readXML
 * @param {string} path - the path of the file to read and parse
 * @param {App} [parentAppMetadata] - metadata for the parent app (if this
 *   app has one)
 * @return {string} the text of the XML file
 */
module.exports = async (pathToFile, parentAppMetadata) => {
  // If the path doesn't end with ".json", append ".json" first
  const fixedPath = `${pathToFile}${pathToFile.endsWith('.xml') ? '' : '.xml'}`;

  // if file does not exist but has parent
  if (!await fileExists(fixedPath)) {
    if (parentAppMetadata) {
      return parentAppMetadata.installXML;
    }
    // file does not exist and does not have a parent
    throw new Error(`We couldn't load the app store metadata because the file ${fixedPath} does not exist`);
  }
  // read the file as text
  try {
    const fileContent = await readFile(fixedPath);
    return fileContent;
  } catch (err) {
    // throw an error if the file cannot be read properly
    throw new Error(`We couldn't load the app store metadata because the file ${fixedPath} is not formatted properly`);
  }
};
