(function() {
  'use strict';

  b3e.properties.IntegerSlider = b3e.property.create('IntegerSlider', {
    value       : 0,
    minValue    : 0,
    maxValue    : 10,
    step        : 1,
    enforceStep : true,
  });
})();