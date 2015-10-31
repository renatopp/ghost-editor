/** @module b3e */

(function () {
  "use strict";

  /**
   * The Node class provides base variables and methods for all nodes in 
   * the editor. These variables and methods are organized into different 
   * components:
   *
   * - display: the CreateJS container, which will be used to render the node 
   *   in the canvas. This component also provides methods to verify hit tests
   *   and other visual effects.
   * - graph: provides the mechanisms of a graph node, including a list of 
   *   parents and children (by using connection objects), and methods for 
   *   traversal.
   * - attribute: the attributes of the node in the editor. 
   *
   * It is recommended the use of the shortcut `b3e.node.create` instead of
   * this class directly.
   *
   * @class Node
   * @constructor
   */
  var Node = function() {
    this.id = b3.createUUID();
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
    return s.replace(/(<\w+>)/g, function(match, key) {
      var attr = key.substring(1, key.length-1);
      if (self.properties.hasOwnProperty(attr)) {
        return self.properties[attr];
      } else {
        return match;
      }
    });
  };

  p.traversal = function(callback, thisarg) {
    var blocks = [this.node];
    while (blocks.length > 0) {
      var block = blocks.pop();
      if (callback.call(thisarg, block) === false) return;

      for (var i=block.graph.outConnections.length-1; i>=0; i--) {
        var c = block.graph.outConnections[i];
        if (c._outBlock) blocks.push(c._outBlock);
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