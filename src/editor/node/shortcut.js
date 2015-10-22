/** @module b3e */

(function () {
  "use strict";

  /**
   * Shortcut to create new nodes.
   */
  b3e.node.create = function(name, category, kwargs) {
    function factory() {
      kwargs = kwargs || {};

      var node = new b3e.node.Node();

      node.attributes.name        = name;
      node.attributes.category    = category;
      node.attributes.title       = kwargs.title || null;
      node.attributes.description = kwargs.description || null;
      node.attributes.properties  = kwargs.properties || {};
      
      node.maxInConnections  = kwargs.maxInConnections || node.maxInConnections;
      node.maxOutConnections = kwargs.maxOutConnections || node.maxOutConnections;
      
      node.onAdd             = kwargs.onAdd || node.onAdd;
      node.onLoad            = kwargs.onLoad || node.onLoad;
      node.onSelect          = kwargs.onSelect || node.onSelect;
      node.onDeselect        = kwargs.onDeselect || node.onDeselect;
      node.onConnected       = kwargs.onConnected || node.onConnected;
      node.onInConnected     = kwargs.onInConnected || node.onInConnected;
      node.onOutConnected    = kwargs.onOutConnected || node.onOutConnected;
      node.onDisconnected    = kwargs.onDisconnected || node.onDisconnected;
      node.onInDisconnected  = kwargs.onInDisconnected || node.onInDisconnected;
      node.onOutDisconnected = kwargs.onOutDisconnected || node.onOutDisconnected;
      node.onRemove          = kwargs.onRemove || node.onRemove;

      return node;
    }

    return factory;
  };
})();