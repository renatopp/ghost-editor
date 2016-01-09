(function() {
  'use strict';

  b3e.nodes.SetSharedRect = b3e.node.create('SetSharedRect', b3e.MODULATOR, {
    group: 'sharedVariables',
    properties: [
      ['variable', b3e.properties.String, {title: 'Variable name'}]
    ],
  });
})();