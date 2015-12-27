(function() {
  'use strict';

  b3e.nodes.LerpAngle = b3e.node.create('LerpAngle', b3e.MODULATOR, {
    properties: [
      ['min', b3e.properties.Float, {value:0}],
      ['max', b3e.properties.Float, {value:360}]
    ]
  });
})();