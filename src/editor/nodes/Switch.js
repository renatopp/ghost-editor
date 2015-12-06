(function() {
  'use strict';

  b3e.nodes.Switch = b3e.node.create('Switch', b3e.COMPOSITE, {
    description: 'Executes and immediately returns children node status, '+
                 'one-by-one. Step iterator always moves forward by one and '+
                 'loops it\'s index.',
    properties: [
      ['selection_mode', b3e.properties.Choice, {
        value: 'enum',
        title: 'Selection Mode',
        allowNull: false,
        options: [['enum', 'ENUM'], ['int', 'INT']]
      }],
      ['variable', b3e.properties.String, {
        title: 'Variable name',
      }]
    ]
  });
})();