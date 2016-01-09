(function() {
  'use strict';

  b3e.nodes.IntegerClamp = b3e.node.create('IntegerClamp', b3e.MODULATOR, {
    group: 'integers',
    properties: [
      ['min', b3e.properties.Integer, {value:0}],
      ['max', b3e.properties.Integer, {value:100}]
    ]
  });
})();