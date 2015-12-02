(function() {
  'use strict';

  b3e.nodes.Selector = b3e.node.create('Selector', b3e.COMPOSITE, {
    description: 'The selector task is similar to an "or" operation. It will '+
                 'return success as soon as one of its child tasks return '+
                 'success. If a child task returns failure then it will '+
                 'sequentially run the next task. If no child task returns '+
                 'success then it will return failure.',
  });
})();