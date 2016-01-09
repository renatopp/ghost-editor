(function() {
  'use strict';

  b3e.nodes.SetSharedObject = b3e.node.create('SetSharedObject', b3e.MODULATOR, {
    group: 'sharedVariables',
    properties: [
      ['variable', b3e.properties.String, {title: 'Variable name'}]
    ],
  });
})();