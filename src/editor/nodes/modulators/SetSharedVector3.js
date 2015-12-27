(function() {
  'use strict';

  b3e.nodes.SetSharedVector3 = b3e.node.create('SetSharedVector3', b3e.MODULATOR, {
    properties: [
      ['variable', b3e.properties.String, {title: 'Variable name'}]
    ],
  });
})();