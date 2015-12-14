(function() {
  'use strict';

  b3e.nodes.UntilFailure = b3e.node.create('UntilFailure', b3e.MODULATOR, {
    title: 'Until Failure',
    description: 'The until failure task, will keep executing its child task '+
                 'until the child task returns failure.',
  });
})();
