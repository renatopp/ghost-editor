(function() {
  'use strict';

  b3e.nodes.Remap = b3e.node.create('Remap', b3e.MODULATOR, {
    description: 'A Remap node (or defuzz node) remaps a value in the range '+
                 '0 to 1, into a new range. For example, this node could be '+
                 'used to remap a normalized input value of `0.25` into a '+
                 'head rotation of 45 degrees.',
    properties: [
      ['bounds', b3e.properties.FloatRange, {
        title: 'Bounds',
        description: 'Initial and final value for remapping. If input is '+
                     'equal to 0, the output will assume the start value. '+
                     'Similarly, if input is equal to 1, the output will '+
                     'assume the final value.',
        startValue: 0,
        endValue: 1,
      }],
    ],
  });
})();