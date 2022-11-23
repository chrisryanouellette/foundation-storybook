/** An inky loader to convert html files that use inky elements */

const { Inky } = require("inky");
const converter = new Inky({});

module.exports = function (source) {
  return converter.releaseTheKraken(source);
};
