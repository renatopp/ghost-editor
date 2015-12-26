(function() {
  'use strict';

  b3e.properties.Vector2 = b3e.property.create('Vector2', {
    x: 0,
    y: 0,

    fromJson: function(data) {
      this.x = data[0];
      this.y = data[1];
    },

    toJson: function() {
      return [this.x||0, this.y||0];
    },

    toValue: function() {
      return '('+this.x||0+', '+this.y||0+')';
    },
  });
})();