export default function compound() {
  var scales = [].slice.call(arguments);
  if (scales.length === 0) {
    return null;
  }

  function scale(x) {
    for (var i = 0; i < scales.length; i++) {
      var value = scales[i](x);
      var range = scales[i].range();
      if (!isNaN(value) && Math.min.apply(null, range) <= value &&
          value <= Math.max.apply(null, range)) {
        return value;
      }
    }
    return value;
  }

  scale.domain = function() {
    if (arguments.length) {
      throw 'Setting a domain is not supported on compound scales';
    }
    var values = [].concat.apply([], scales.map(function(s) { return s.domain(); }));
    return [
      Math.min.apply(null, values),
      Math.max.apply(null, values)
    ];
  };

  scale.range = function() {
    if (arguments.length) {
      throw 'Setting a range is not supported on compound scales';
    }
    var values = [].concat.apply([], scales.map(function(s) { return s.range(); }));
    return [
      Math.min.apply(null, values),
      Math.max.apply(null, values)
    ];
  };

  scale.copy = function() {
    return compound.apply(null, scales.map(function(s) { return s.copy(); }));
  };

  return scale;
}
