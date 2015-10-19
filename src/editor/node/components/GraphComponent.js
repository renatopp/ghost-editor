(function() {
  "use strict";

  /**
   * This class represents a node in a graph, providing the mechnisms for 
   * graph manipulation.
   *
   * @class GraphComponent
   * @constructor
   */
  var GraphComponent = function(node) {
    this.inConnections = [];
    this.outConnections = [];

    this.node = node;
  };
  var p = GraphComponent.prototype;

  /**
   * Runs a traversal over the subtree which this block is root.
   *
   *     block.traversal(function(block) {
   *       console.log(block);
   *     })
   * 
   * @method traversal
   * @param {Function} callback The callback called for each block in the 
   *                            subtree. The current block will be passed as 
   *                            argument to the callback.
   * @param {Object} thisarg The object for `this` reference.
   */
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


  b3e.node.GraphComponent = GraphComponent;
})();