(function() {
  'use strict';

  b3e.nodes.FloatClamp = b3e.node.create('FloatClamp', b3e.MODULATOR, {
    group: 'floats',
    properties: [
      ['min', b3e.properties.Float, {value:0}],
      ['max', b3e.properties.Float, {value:1}]
    ]
  });
})();