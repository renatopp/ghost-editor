(function() {
  'use strict';

  b3e.nodes.UntilSuccess = b3e.node.create('UntilSuccess', b3e.MODULATOR, {
    title: 'Until Success',
    description: 'The until success task, will keep executing its child task '+
                 'until the child task returns success.',
  });
})();
