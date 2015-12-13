(function() {
  'use strict';

  b3e.nodes.PrioritySelector = b3e.node.create('PrioritySelector', b3e.COMPOSITE, {
    description: 'Similar to the selector task, the priority selector task '+
                 'will return success as soon as a child task returns '+
                 'success. Instead of running tasks sequentially from left '+
                 'to right within the tree, the priority selector will ask '+
                 'the task what its priority is to determine the order. The '+
                 'higher priority tasks have a higher chance at beign run '+
                 'first.',
  });
})();