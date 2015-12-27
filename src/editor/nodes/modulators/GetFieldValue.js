(function() {
  'use strict';

  b3e.nodes.GetFieldValue = b3e.node.create('GetFieldValue', b3e.MODULATOR, {
    properties: [
      ['field', b3e.properties.String, {title: 'Field'}],
    ],
  });
})();
