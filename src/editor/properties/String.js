(function() {
  'use strict';

  b3e.properties.String = b3e.property.create('String', {
    value: '',

    fromJson: function(data) {
      this.value = JSON3.parse(data);
    },

    toJson: function() {
      return JSON3.stringify(this.value);
    }
  });
})();