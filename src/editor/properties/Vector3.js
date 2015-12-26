(function() {
  'use strict';

  b3e.properties.Vector3 = b3e.property.create('Vector3', {
    x: 0,
    y: 0,
    z: 0,

    fromJson: function(data) {
      this.x = data[0];
      this.y = data[1];
      this.z = data[2];
    },

    toJson: function() {
      return [this.x||0, this.y||0, this.z||0];
    },

    toValue: function() {
      return '('+this.x||0+', '+this.y||0+', '+this.z||0+')';
    },
  });
})();