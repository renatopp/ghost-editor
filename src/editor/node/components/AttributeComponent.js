(function() {
  "use strict";

  /**
   * This class represents the attributes of nodes:
   *
   * - name: the class/function used to create this node in code (i.e. the node 
   *   name must be equal to the class/function name in code).
   * - category: the node category. Use the constants in `b3e.CATEGORY`.
   * - title: the node instance label. The node instances (blocks in the canvas)
   *   can customize this variable.
   * - description: the description of the node. Instances can customize this 
   *   field too.
   * - Properties: a list of node properties, which can be customized in the 
   *   editor per instance.
   *
   * @class AttributeComponent
   * @constructor
   */
  var AttributeComponent = function(node) {
    this.name = null;
    this.category = null;
    this.description = null;
    this.title = null;
    this.properties = null;

    this.node = node;
  };
  var p = AttributeComponent.prototype;

  /**
   * Get the compiled title of the block. You can use patterns like `<varname>`
   * in the block title and this method will look through block properties for 
   * the var name. For example.
   *
   *     block.title = 'A <thing> title';
   *     block.properties['thing'] = 'pretty';
   *     block.getTitle() === 'A pretty title';
   * 
   * @method getTitle
   * @returns {String} The compiled title.
   */
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
  
  b3e.node.AttributeComponent = AttributeComponent;
})();