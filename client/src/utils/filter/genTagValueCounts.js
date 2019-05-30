const filterByTags = require('./filterByTags');
const excludeTagName = require('./excludeTagName');

/**
 * Generates the counts to show on each tagItem
 * @param {object[]} apps - the list of apps after they are already filtered by
 *   the query
 * @param {object} tags - tag mapping that stores whether values are checked:
 *   { tagName => { color, tagValues: { tagValue: isChecked }}}
 * @return {object} mapping { tagName => tagItem => count } where count is
 *   the number of apps that have that tagItem while all the other tagNames are
 *   applied as filters
 */
module.exports = (apps, tags) => {
  // Duplicate before changing
  let newTags = tags;

  // Go through each tagName, and call filterByTags with the app list and every
  // tag name EXCEPT the one we are currently in
  Object.keys(newTags).forEach((tagName) => {
    console.log('Tag name', tagName);
    // The apps that match based on other filter categories' checks
    const filteredApps = filterByTags(apps, excludeTagName(tagName));
    // Now we go through each tagValue in this tagName and count how many of
    // those apps have it checked -> filter? And that number is the count for
    // that tagValue

    // array of tag values for a given tag name ex. 'free' or 'expensive'
    const tagValues = tagName.tagValues;
    // Go through each tagValue in this current tag
    tagValues.forEach((tagValue) => {
      const countedApps = filteredApps.filter((app) => {
        // Will return the app if the given tagValue exists, false if not
        return app.tags[tagName][tagValue];
      });
    });
  });
};
