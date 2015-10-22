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
    
    // components
    this.display = new b3e.node.DisplayComponent(this);
    this.attributes = new b3e.node.AttributeComponent(this);
    this.graph = new b3e.node.GraphComponent(this);

    // control
    this.maxInConnections = 0;
    this.maxOutConnections = 0;
  };
  var p = Node.prototype;
  
  p.onAdd = function(e) {};
  p.onLoad = function(e) {};
  p.onSelect = function(e) {};
  p.onDeselect = function(e) {};
  p.onConnected = function(e) {};
  p.onInConnected = function(e) {};
  p.onOutConnected = function(e) {};
  p.onDisconnected = function(e) {};
  p.onInDisconnected = function(e) {};
  p.onOutDisconnected = function(e) {};
  p.onRemove = function(e) {};

  p._applySettings = function(settings) {
    this.display._applySettings(settings);
  };

  b3e.node.Node = Node;
})();