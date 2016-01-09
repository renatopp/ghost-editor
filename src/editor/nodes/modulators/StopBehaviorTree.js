(function() {
  'use strict';

  b3e.nodes.StopBehaviorTree = b3e.node.create('StopBehaviorTree', b3e.MODULATOR, {
    group: 'behaviorTrees',
    properties: [
      ['treeName', b3e.properties.String, {title: 'Tree name'}],
    ],
  });
})();