b3e.tree.SelectionManager = function(editor, project, tree) {
  "use strict";

  this.select = function(node) {
    if (!node || node.display.isSelected) return;

    node.display.select();
    tree._selectedNodes.push(node);

    editor.trigger('nodeselected', node);
  };

  this.deselect = function(node) {
    if (!node.display.isSelected) return;

    node.display.deselect();
    tree._selectedNodes.remove(node);

    editor.trigger('nodedeselected', node);
  };

  this.selectAll = function() {
    tree.nodes.each(function(node) {
      this.select(node);
    }, this);
  };

  this.deselectAll = function() {
    for (var i=tree._selectedNodes.length-1; i>=0; i--) {
      this.deselect(tree._selectedNodes[i]);
    }
  };

  this.invertSelection = function(node) {
    var nodes = (node)?[node]:tree.nodes.getAll();

    nodes.forEach(function(node) {
      if (node.display.isSelected) {
        this.deselect(node);
      } else {
        this.select(node);
      }
    }, this);
  };

  this.selectSubtree = function(node) {
    var nodes = (node)?[node]:tree._selectedNodes;
    var fSelect = function(node) {
      nodes.remove(node);
      this.select(node);
    };

    while (nodes.length > 0) {
      nodes.pop().traversal(fSelect, this);
    }
  };

  this.deselectSubtree = function(node) {
    var nodes = (node)?[node]:tree._selectedNodes;

    var fDeselect = function(node) {
      nodes.remove(node);
      this.deselect(node);
    };

    while (nodes.length > 0) {
      nodes.pop().traversal(fDeselect, this);
    }
  };

  this._applySettings = function(settings) {};

};
