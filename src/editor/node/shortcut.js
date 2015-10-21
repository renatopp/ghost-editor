/** @module b3e */

(function () {
  "use strict";

  /**
   * Shortcut to create new nodes.
   */
  b3e.node.create = function(name, category, kwargs) {
    kwargs = kwargs || {};

    var node = new b3e.node.BaseNode();

    node.attributes.name = name;
    node.attributes.category = category;
    node.attributes.title = kwargs.title || null;
    node.attributes.description = kwargs.description || null;
    node.attributes.properties = kwargs.properties || [];

    return node;
  };
})();