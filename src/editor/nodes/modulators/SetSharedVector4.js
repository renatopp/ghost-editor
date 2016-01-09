(function() {
  'use strict';

  b3e.nodes.SetSharedVector4 = b3e.node.create('SetSharedVector4', b3e.MODULATOR, {
    group: 'sharedVariables',
    properties: [
      ['variable', b3e.properties.String, {title: 'Variable name'}]
    ],
  });
})();