(function() {
  'use strict';

  b3e.properties.FloatRange = b3e.property.create('FloatRange', {
    startValue    : 0,
    endValue      : 1,
    minStartValue : null,
    maxStartValue : null,
    minEndValue   : null,
    maxEndValue   : null,

    fromJson: function(data) {
      this.startValue = data[0];
      this.endValue = data[1];
    },

    toJson: function() {
      return [this.startValue, this.endValue];
    },

    toValue: function() {
      return this.startValue+'...'+this.endValue;
    },
  });
})();