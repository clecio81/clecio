const abbrev = require("./abbrev.js");

const renderEmoji = require("./renderEmoji.js");

module.exports = class index {

  static toAbbrev(num) {

    return abbrev(num);

  }
  

  static renderEmoji(ctx, msg, x, y) {

    return renderEmoji(ctx, msg, x, y);

  }

};