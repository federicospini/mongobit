
/**
 * range
 */

var range = function (from, to) {
  if (to === undefined) {
    to = from;
    from = 0;
  }
  var len = to - from;
  var result = new Array(len);
  var i = len;
  while (i--) {
    result[i] = --to;
  }

  return result;
};

/**
 * Module exports
 */

module.exports = {
  range: range
};


/**
 * addAll
 * Set prototype augmentation
 */

Set.prototype.addAll = function (array) {
  array.forEach(function (item) {
    this.add(item);
  }, this);

  return this;
};
