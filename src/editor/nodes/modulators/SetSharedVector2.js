(function() {
  'use strict';

  b3e.nodes.SetSharedVector2 = b3e.node.create('SetSharedVector2', b3e.MODULATOR, {
    group: 'sharedVariables',
    properties: [
      ['variable', b3e.properties.String, {title: 'Variable name'}]
    ],
  });
})();