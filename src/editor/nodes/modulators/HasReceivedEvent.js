(function() {
  'use strict';

  b3e.nodes.HasReceivedEvent = b3e.node.create('HasReceivedEvent', b3e.MODULATOR, {
    description: 'Returns success as soon as the event specified by '+
                 'eventName has been received.',
    properties: [
      ['eventName', b3e.properties.String, {title: 'Event Name'}],
    ],
  });
})();