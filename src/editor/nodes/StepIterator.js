(function() {
  'use strict';

  b3e.nodes.StepIterator = b3e.node.create('StepIterator', b3e.COMPOSITE, {
    description: 'Executes and immediately returns children node status, '+
                 'one-by-one. Step iterator always moves forward by one and '+
                 'loops it\'s index.',
  });
})();