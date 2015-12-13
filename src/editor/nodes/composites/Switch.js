(function() {
  'use strict';

  b3e.nodes.Switch = b3e.node.create('Switch', b3e.COMPOSITE, {
    description: 'Executes ONE child based on the provided INT or ENUM and '+
                 'return it\'s status. If "case" change while a child is '+
                 'running, that child will be interrupted before the new '+
                 'child is executed.',
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