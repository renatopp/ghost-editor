(function() {
  'use strict';

  b3e.nodes.Idle = b3e.node.create('Idle', b3e.MODULATOR, {
    description: 'Returns a task status of running. Will only stop when '+
                 'interrupeted or conditional abort is triggered.',
    properties: [
      ['condition', b3e.properties.String, {title: 'Conditional Variable'}],
    ],
  });
})();