(function() {
  'use strict';

  b3e.nodes.SetSharedInteger = b3e.node.create('SetSharedInteger', b3e.MODULATOR, {
    properties: [
      ['variable', b3e.properties.String, {title: 'Variable name'}]
    ],
  });
})();