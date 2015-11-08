/** @module b3e */

(function () {
  "use strict";

  /**
   * The Node class provides base variables and methods for all nodes in 
   * the editor. 
   *
   * This class has a display component, which is in fact a CreateJS container
   * that will be used to render the node in the canvas. This component also 
   * provides methods to verify hit tests and other visual effects.
   *
   * It is recommended the use of the shortcut `b3e.node.create` instead of
   * this class directly.
   *
   * @class Node
   * @constructor
   */
  var Node = function() {
    this.id = b3e.createID();
    this.display = new b3e.node.DisplayComponent(this);

    this.properties = tine.merge({}, this.properties||{});
    this.inConnections = [];
    this.outConnections = [];
    this.maxInConnections = 0;
    this.maxOutConnections = 0;
  };
  var p = Node.prototype;

  // Attributes (are accessible on class)
  p.name = null;
  p.category = null;
  p.description = null;
  p.title = null;
  p.properties = null;

  // Methods
  p.getTitle = function() {
    var s = this.title || this.name;

    var self = this;
    var title = s.replace(/(<\w+>)/g, function(match, key) {
      var attr = key.substring(1, key.length-1);
      if (self.properties.hasOwnProperty(attr)) {
        return self.properties[attr];
      } else {
        return match;
      }
    });

    if (b3e.ENV === 'DEVELOPMENT') {
      title += ' <'+this.id+'>';
    }
    return title;
  };

  p.traversal = function(callback, thisarg) {
    var nodes = [this];
    while (nodes.length > 0) {
      var node = nodes.pop();
      if (callback.call(thisarg, node) === false) return;

      for (var i=node.outConnections.length-1; i>=0; i--) {
        var c = node.outConnections[i];
        if (c.outNode) nodes.push(c.outNode);
      }
    }
  };

  p.copy = function() {
    var other = new this.constructor();
    other._applySettings(this.display._settings);

    other.title = this.title;
    other.description = this.description;
    other.properties = tine.merge({}, this.properties);
    other.display.x = this.display.x;
    other.display.y = this.display.y;

    return other;
  };
  
  // Callbacks
  p.onAdd = function(e) {};
  p.onLoad = function(e) {};
  p.onRemove = function(e) {};
  p.onSelect = function(e) {};
  p.onDeselect = function(e) {};
  p.onConnected = function(e) {};
  p.onInConnected = function(e) {};
  p.onOutConnected = function(e) {};
  p.onDisconnected = function(e) {};
  p.onInDisconnected = function(e) {};
  p.onOutDisconnected = function(e) {};
  p.onPropertyChange = function(e) {};

  p._applySettings = function(settings) {
    this.display._applySettings(settings);
  };

  b3e.node.Node = Node;
})();