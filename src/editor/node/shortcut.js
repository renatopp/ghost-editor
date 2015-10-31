/** @module b3e */

(function () {
  'use strict';

  b3e.node.create = function(name, category, kwargs) {
    kwargs = kwargs || {};
    var cls = function() {
      b3e.node.Node.call(this);
    };

    cls.prototype = Object.create(b3e.node.Node.prototype);
    cls.prototype.constructor = cls;

    cls.prototype.name = name;
    cls.prototype.category = category;
    cls.prototype.title = kwargs.title || null;
    cls.prototype.description = kwargs.description || null;
    cls.prototype.properties = kwargs.properties || null;

    if (kwargs.maxInConnections) {
      cls.prototype.maxInConnections = kwargs.maxInConnections;
    }

    if (kwargs.maxOutConnections) {
      cls.prototype.maxOutConnections = kwargs.maxOutConnections;
    }

    if (kwargs.onAdd) {
      cls.prototype.onAdd = kwargs.onAdd;
    }

    if (kwargs.onLoad) {
      cls.prototype.onLoad = kwargs.onLoad;
    }

    if (kwargs.onSelect) {
      cls.prototype.onSelect = kwargs.onSelect;
    }

    if (kwargs.onDeselect) {
      cls.prototype.onDeselect = kwargs.onDeselect;
    }

    if (kwargs.onConnected) {
      cls.prototype.onConnected = kwargs.onConnected;
    }

    if (kwargs.onInConnected) {
      cls.prototype.onInConnected = kwargs.onInConnected;
    }

    if (kwargs.onOutConnected) {
      cls.prototype.onOutConnected = kwargs.onOutConnected;
    }

    if (kwargs.onDisconnected) {
      cls.prototype.onDisconnected = kwargs.onDisconnected;
    }

    if (kwargs.onInDisconnected) {
      cls.prototype.onInDisconnected = kwargs.onInDisconnected;
    }

    if (kwargs.onOutDisconnected) {
      cls.prototype.onOutDisconnected = kwargs.onOutDisconnected;
    }

    if (kwargs.onPropertyChange) {
      cls.prototype.onPropertyChange = kwargs.onPropertyChange;
    }

    if (kwargs.onRemove) {
      cls.prototype.onRemove = kwargs.onRemove;
    }

    return cls;
  };

  // /**
  //  * Shortcut to create new nodes.
  //  */
  // b3e.node.create = function(name, category, kwargs) {
  //   function factory() {
  //     kwargs = kwargs || {};

  //     var node = new b3e.node.Node();

  //     node.attributes.name        = name;
  //     node.attributes.category    = category;
  //     node.attributes.title       = kwargs.title || null;
  //     node.attributes.description = kwargs.description || null;
  //     node.attributes.properties  = kwargs.properties || {};
      
  //     node.maxInConnections  = kwargs.maxInConnections || node.maxInConnections;
  //     node.maxOutConnections = kwargs.maxOutConnections || node.maxOutConnections;
      
  //     node.onAdd             = kwargs.onAdd || node.onAdd;
  //     node.onLoad            = kwargs.onLoad || node.onLoad;
  //     node.onSelect          = kwargs.onSelect || node.onSelect;
  //     node.onDeselect        = kwargs.onDeselect || node.onDeselect;
  //     node.onConnected       = kwargs.onConnected || node.onConnected;
  //     node.onInConnected     = kwargs.onInConnected || node.onInConnected;
  //     node.onOutConnected    = kwargs.onOutConnected || node.onOutConnected;
  //     node.onDisconnected    = kwargs.onDisconnected || node.onDisconnected;
  //     node.onInDisconnected  = kwargs.onInDisconnected || node.onInDisconnected;
  //     node.onOutDisconnected = kwargs.onOutDisconnected || node.onOutDisconnected;
  //     node.onRemove          = kwargs.onRemove || node.onRemove;

  //     return node;
  //   }

  //   return factory;
  // };
})();