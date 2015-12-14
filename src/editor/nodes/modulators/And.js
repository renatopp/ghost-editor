(function() {
  'use strict';

  b3e.nodes.And = b3e.node.create('And', b3e.MODULATOR, {
    description: 'A logical AND.',
    properties: [
      ['negate', b3e.properties.Boolean, {
        title: 'Negate',
        description: 'Sets node to be a NAND',
        value: false
      }]
    ],
    getTitle: function() {
      if (this.title) {
        return this.callSuper();
      }

      var title = 'AND';
      if (this.properties.negate.value) {
        title = 'N'+title;
      }

      if (b3e.ENV === b3e.DEVELOPMENT) {
        title += ' <'+this.id+'>';
      }

      return title;
    },
  });
})();