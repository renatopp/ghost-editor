(function() {
  'use strict';

  b3e.nodes.Property = b3e.node.create('Property', b3e.COMPOSITE, {
    properties: [
      ['teste', b3e.properties.String],
      ['string', b3e.properties.String]
    ]
  });
})();