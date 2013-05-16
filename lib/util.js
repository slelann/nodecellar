var me = {DEFAULT_LIMIT: 1000};

/*
** extend(target, src1, src2, ...)
**
** Extend a given object by copying each property of the following object(s) to it.
** The last object in the list wins if there is a name conflict. This is more or less
** the same as Underscore extend().
*/
me.extend = function(obj) {
  var args = Array.prototype.slice.call(arguments, 1);

  if (!obj) {
    return obj;
  }

  args.forEach(function(source) {
    for (var prop in source) {
      obj[prop] = source[prop];
    }
  });
  return obj;
};

module.exports = me;
