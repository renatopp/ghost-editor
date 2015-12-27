(function() {
  'use strict';

  b3e.nodes.StartBehaviorTree = b3e.node.create('StartBehaviorTree', b3e.MODULATOR, {
    properties: [
      ['treeName', b3e.properties.String, {title: 'Tree name'}],
    ],
  });
})();