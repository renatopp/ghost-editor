(function() {
  'use strict';

  b3e.nodes.InvokeMethod = b3e.node.create('InvokeMethod', b3e.MODULATOR, {
    properties: [
      ['method', b3e.properties.String, {title: 'Method'}],
    ],
  });
})();
