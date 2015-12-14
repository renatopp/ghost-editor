(function() {
  'use strict';

  b3e.nodes.Wait = b3e.node.create('Wait', b3e.MODULATOR, {
    title: 'Wait <delay> seconds.',
    description: 'Wait a specified amount of time. The task will return '+
                 'running until the task is done waiting. It will return '+
                 'until the task is done waiting. It will return success '+
                 'after the wait time has elapsed.',
    properties: [
      ['delay', b3e.properties.Float, {
        title: 'Wait time',
        value: 1,
      }],
    ],
  });
})();
