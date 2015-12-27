(function() {
  'use strict';

  b3e.nodes.SetSharedColor = b3e.node.create('SetSharedColor', b3e.MODULATOR, {
    properties: [
      ['variable', b3e.properties.String, {title: 'Variable name'}]
    ],
  });
})();