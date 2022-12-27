/** An inky loader to convert html files that use inky elements */
const { bodyHeader, bodyFooter } = require("../src/wrappers.js");
const { Inky } = require("inky");
const converter = new Inky({});

module.exports = function (source) {
  const html = converter.releaseTheKraken(source);
  return `${bodyHeader}${html}${bodyFooter}`;
};
