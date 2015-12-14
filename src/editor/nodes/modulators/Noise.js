(function() {
  'use strict';

  b3e.nodes.Noise = b3e.node.create('Noise', b3e.MODULATOR, {
    description: 'A general noise function.',
    maxInConnections: 1,
    properties: [
      ['type', b3e.properties.Choice, {
        title: 'Noise type',
        value: 'white',
        allowNull: false,
        options: [['white', 'White noise'], ['perlin', 'Perlin noise']]
      }],
      ['range', b3e.properties.FloatRange, {
        title: 'Range',
        description: 'Initial and final values for the output.',
        startValue: 0,
        endValue: 1,
      }],
    ],
  });
})();