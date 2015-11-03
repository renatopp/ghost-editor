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
})();