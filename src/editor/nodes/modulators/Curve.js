(function() {
  'use strict';

  b3e.nodes.Curve = b3e.node.create('Curve', b3e.MODULATOR, {
    maxInConnections: 1,
    properties: [
      ['curve', b3e.properties.Curve, {}],
    ]
  });
})();