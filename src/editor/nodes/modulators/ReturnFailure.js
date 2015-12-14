(function() {
  'use strict';

  b3e.nodes.ReturnFailure = b3e.node.create('ReturnFailure', b3e.MODULATOR, {
    title: 'Return Failure',
    description: 'The return failure task will always return failure except '+
                 'when the child task is running.',
  });
})();
