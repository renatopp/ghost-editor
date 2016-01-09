(function() {
  'use strict';

  b3e.nodes.RandomInteger = b3e.node.create('RandomInteger', b3e.MODULATOR, {
    group: 'integers',
    properties: [
      ['min', b3e.properties.Integer, {value:0}],
      ['max', b3e.properties.Integer, {value:100}]
    ]
  });
})();