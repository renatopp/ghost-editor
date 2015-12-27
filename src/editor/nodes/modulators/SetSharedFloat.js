(function() {
  'use strict';

  b3e.nodes.SetSharedFloat = b3e.node.create('SetSharedFloat', b3e.MODULATOR, {
    properties: [
      ['variable', b3e.properties.String, {title: 'Variable name'}]
    ],
  });
})();