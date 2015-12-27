(function() {
  'use strict';

  b3e.nodes.RestartBehaviorTree = b3e.node.create('RestartBehaviorTree', b3e.MODULATOR, {
    properties: [
      ['treeName', b3e.properties.String, {title: 'Tree name'}],
    ],
  });
})();