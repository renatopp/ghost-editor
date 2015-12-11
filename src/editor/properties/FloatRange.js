(function() {
  'use strict';

  b3e.properties.FloatRange = b3e.property.create('FloatRange', {
    value       : 0,
    maxValue    : 0,
    minValue    : 1,
    step        : 0.1,
    enforceStep : true,
  });
})();