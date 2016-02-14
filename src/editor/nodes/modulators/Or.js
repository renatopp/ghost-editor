(function() {
  'use strict';

  b3e.nodes.Or = b3e.node.create('Or', b3e.MODULATOR, {
    description: 'A logical OR.',
    properties: [
      ['negate', b3e.properties.Boolean, {
        title: 'Negate',
        description: 'Sets node to be a NOR',
        value: false
      }],
      ['exclusive', b3e.properties.Boolean, {
        title: 'Exclusive',
        description: 'Sets node to be a XOR',
        value: false
      }]
    ],
    getTitle: function() {
      if (this.title) {
        return this.callSuper();
      }

      var title = 'OR';
      if (this.properties.negate.value) {
        title = 'N'+title;
      }
      if (this.properties.exclusive.value) {
        title = 'X'+title;
      }

      return title;
    },
  });
})();