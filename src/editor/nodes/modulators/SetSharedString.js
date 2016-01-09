(function() {
  'use strict';

  b3e.nodes.SetSharedString = b3e.node.create('SetSharedString', b3e.MODULATOR, {
    group: 'sharedVariables',
    properties: [
      ['variable', b3e.properties.String, {title: 'Variable name'}]
    ],
  });
})();