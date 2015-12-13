(function() {
  'use strict';

  b3e.nodes.Parallel = b3e.node.create('Parallel', b3e.COMPOSITE, {
    description: 'Similar to the sequence task, the parallel task will run '+
                 'each child task until a child task returns failure. The '+
                 'difference is that the parallel task will run all of its '+
                 'children tasks simultaneously versus running each task one '+
                 'at a time. Like the sequence class, the paralllel task '+
                 'will return success once all of its children tasks have '+
                 'return success. If one task returns failure the paralllel '+
                 'task will end all of the child tasks and return failure.',
  });
})();