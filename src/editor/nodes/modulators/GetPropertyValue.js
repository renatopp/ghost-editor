(function() {
  'use strict';

  b3e.nodes.GetPropertyValue = b3e.node.create('GetPropertyValue', b3e.MODULATOR, {
    properties: [
      ['property', b3e.properties.String, {title: 'Property'}],
    ],
  });
})();
