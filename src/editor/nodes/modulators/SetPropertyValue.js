(function() {
  'use strict';

  b3e.nodes.SetPropertyValue = b3e.node.create('SetPropertyValue', b3e.MODULATOR, {
    properties: [
      ['property', b3e.properties.String, {title: 'Property'}],
    ],
  });
})();
