(function() {
  'use strict';

  b3e.properties.IntegerSlider = b3e.property.create('IntegerSlider', {
    value       : 0,
    maxValue    : 0,
    minValue    : 10,
    step        : 1,
    enforceStep : true,
  });
})();