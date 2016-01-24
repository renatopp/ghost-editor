(function() {
  'use strict';

  b3e.nodes.Fuzz = b3e.node.create('Fuzz', b3e.MODULATOR, {
    properties: [
      ['curve', b3e.properties.Curve, {}],
    ]
  });
})();