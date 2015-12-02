(function() {
  'use strict';

  b3e.nodes.Sequence = b3e.node.create('Sequence', b3e.COMPOSITE, {
    description: 'The sequence task is similar to an "and" operation. '+
                 'It will return failure as soon as one of its child tasks '+
                 'return failure. If a child task returns success then it '+
                 'will sequentially run the next task. If all child tasks '+
                 'return success then it will return success.',
  });
})();