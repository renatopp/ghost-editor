(function() {
  'use strict';

  b3e.nodes.Timer = b3e.node.create('Timer', b3e.MODULATOR, {
    properties: [
      ['value', b3e.properties.Float, {
        title: 'Timer value',
        value: 1,
      }],
    ],
  });
})();
