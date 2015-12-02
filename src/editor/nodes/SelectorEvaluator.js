(function() {
  'use strict';

  b3e.nodes.SelectorEvaluator = b3e.node.create('SelectorEvaluator', b3e.COMPOSITE, {
    description: 'The selector evaluator is a selector task which '+
                 'reevaluates its children every tick. It will run the '+
                 'lowest priority child which returns a task status of '+
                 'running. This is done each tick. If a higherpriority child '+
                 'is running and the next frame a lower priority child wants '+
                 'to run it will interrupt the higher priority child. The '+
                 'selector evaluator will return success as soon as the '+
                 'first child returns success other wise it will keep trying '+
                 'higher priority children. This task mimics the conditional '+
                 'abort functionality except the child taskss don\'t always '+
                 'have to be conditional tasks.',
  });
})();