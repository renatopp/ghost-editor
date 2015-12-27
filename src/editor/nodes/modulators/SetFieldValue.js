(function() {
  'use strict';

  b3e.nodes.SetFieldValue = b3e.node.create('SetFieldValue', b3e.MODULATOR, {
    properties: [
      ['field', b3e.properties.String, {title: 'Field'}],
    ],
  });
})();
