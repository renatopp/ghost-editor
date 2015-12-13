(function() {
  'use strict';

  b3e.nodes.ParallelSelector = b3e.node.create('ParallelSelector', b3e.COMPOSITE, {
    description: 'Similar to the selector task, the paralllel selector task '+
                 'will return success as soon as a child task returns '+
                 'success. The difference is that the parallel task will run '+
                 'all of its children tasks simultaneously versus running '+
                 'each task one at a time. If one task returns success the '+
                 'parallel selector task will end all of the child tasks and '+
                 'return success. If every child task returns failure then '+
                 'the paralllel selector task will return failure.',
  });
})();