/** @module b3e */

(function () {
  "use strict";

  /**
   * The BaseNode class provides base variables and methods for all nodes in 
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
   * @class BaseNode
   * @constructor
   */
  var BaseNode = function() {
    this.id = b3.createUUID();
    
    this.display = new b3e.node.DisplayComponent(this);
    this.attributes = new b3e.node.AttributeComponent(this);
    this.graph = new b3e.node.GraphComponent(this);
  };
  var p = BaseNode.prototype;
  
  b3e.node.BaseNode = BaseNode;
})();