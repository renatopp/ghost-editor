(function() {
  'use strict';

  b3e.properties.IntegerRange = b3e.property.create('IntegerRange', {
    value       : 0,
    maxValue    : 0,
    minValue    : 10,
    step        : 1,
    enforceStep : true,
  });
})();