/** @module b3e */

(function () {
  'use strict';

  b3e.node.create = function(name, category, kwargs) {
    kwargs = kwargs || {};

    // Default
    var title = kwargs.title || null;
    var description = kwargs.description || null;
    var properties = kwargs.properties || [];
    var maxInConnections = -1;
    var maxOutConnections = -1;

    if (typeof kwargs.maxInConnections !== 'undefined')
      maxInConnections = kwargs.maxInConnections;

    if (typeof kwargs.maxOutConnections !== 'undefined')
      maxOutConnections = kwargs.maxOutConnections;

    // Static
    var _static = {
      title: title,
      category: category,
      description: description,
      properties: properties,
      maxInConnections: maxInConnections,
      maxOutConnections: maxOutConnections,
    };

    // Prototype
    var _prototype = {
      name: name,
      title: title,
      category: category,
      description: description,
      maxInConnections: maxInConnections,
      maxOutConnections: maxOutConnections,
    };

    if (kwargs.onAdd) _prototype.onAdd = kwargs.onAdd;
    if (kwargs.onLoad) _prototype.onLoad = kwargs.onLoad;
    if (kwargs.onSelect) _prototype.onSelect = kwargs.onSelect;
    if (kwargs.onDeselect) _prototype.onDeselect = kwargs.onDeselect;
    if (kwargs.onConnected) _prototype.onConnected = kwargs.onConnected;
    if (kwargs.onInConnected) _prototype.onInConnected = kwargs.onInConnected;
    if (kwargs.onOutConnected) _prototype.onOutConnected = kwargs.onOutConnected;
    if (kwargs.onDisconnected) _prototype.onDisconnected = kwargs.onDisconnected;
    if (kwargs.onInDisconnected) _prototype.onInDisconnected = kwargs.onInDisconnected;
    if (kwargs.onOutDisconnected) _prototype.onOutDisconnected = kwargs.onOutDisconnected;
    if (kwargs.onPropertyChange) _prototype.onPropertyChange = kwargs.onPropertyChange;
    if (kwargs.onRemove) _prototype.onRemove = kwargs.onRemove;

    var Cls = new JS.Class(name, b3e.node.Node, _prototype);
    Cls.extend(_static);
    return Cls;
  };
})();