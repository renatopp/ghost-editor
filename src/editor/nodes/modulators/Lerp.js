(function() {
  'use strict';

  b3e.nodes.Lerp = b3e.node.create('Lerp', b3e.MODULATOR, {
    properties: [
      ['min', b3e.properties.Float, {value:0}],
      ['max', b3e.properties.Float, {value:1}]
    ]
  });
})();