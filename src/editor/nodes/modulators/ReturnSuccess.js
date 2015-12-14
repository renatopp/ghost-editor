(function() {
  'use strict';

  b3e.nodes.ReturnSuccess = b3e.node.create('ReturnSuccess', b3e.MODULATOR, {
    title: 'Return Success',
    description: 'The return success task will always return success except '+
                 'when the child task is running.',
  });
})();
