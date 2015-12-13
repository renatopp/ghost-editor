(function() {
  'use strict';

  b3e.properties.FloatSlider = b3e.property.create('FloatSlider', {
    value       : 0,
    minValue    : 0,
    maxValue    : 1,
    step        : 0.1,
    enforceStep : true,
  });
})();