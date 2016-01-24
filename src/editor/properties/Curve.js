(function() {
  'use strict';

  b3e.properties.Curve = b3e.property.create('Curve', {
    type           : 'linear',
    data           : [],
    xDomain        : [0, 1],
    yDomain        : [0, 1],
    lockXDomain    : false,
    lockYDomain    : false,
    lockXAxis      : false,
    lockYAxis      : false,
    disabledTypes  : null,
    disableNew     : false,
    disableEdition : false,
    disableSnap    : false,
    hidePointers   : false,

    fromJson: function(data) {
      this.type = data.type;
      this.data = data.data;
      this.xDomain = data.xDomain;
      this.yDomain = data.yDomain;
    },

    toJson: function() {
      return {
        type: this.type||'linear',
        data: this.data||[],
        xDomain: this.xDomain||[0, 1],
        yDomain: this.yDomain||[0, 1],
      };
    },

    toValue: function() {
      return '<Curve "'+this.type+'">';
    },
  });
})();