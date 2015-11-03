b3e.tree.EditManager = function(editor, project, tree) {
  'use strict';

  this._selectionToClipboard = function() {
    var clipboard = {nodes:{}, connections:[]};
    var nodes = tree._selectedNodes;
    var i, j, node, other;

    // Copy nodes
    for (i=0; i<nodes.length; i++) {
      node = nodes[i];
      if (node.category === b3e.ROOT) continue;
    
      clipboard.nodes[node.id] = node;
    }

    // Copy connections
    for (i=0; i<nodes.length; i++) {
      node = nodes[i];
      if (node.category === b3e.ROOT) continue;
      
      for (j=0; j<node.outConnections.length; j++) {
        other = node.outConnections[j].outNode;
        
        if (clipboard.nodes[other.id]) {
          clipboard.connections.push([node.id, other.id]);
        }
      }
    }

    project._clipboard = clipboard;
  };

  this.copy = function() {
    this._selectionToClipboard();
  };

  this.cut = function() {
    this._selectionToClipboard();
    this.remove();
    tree.selection.deselectAll();
  };

  this.paste = function() {
    if (project._clipboard === null) return;

    var i;
    var table = {};
    var nodes = [];

    project.history._beginBatch();

    // copy nodes
    for (var key in project._clipboard.nodes) {
      var base = project._clipboard.nodes[key];
      var node = base.copy();

      node.display.x += 50;
      node.display.y += 50;

      tree.nodes.add(node);
      table[key] = node;
      nodes.push(node);
    }

    // copy connections
    for (i=0; i<project._clipboard.connections.length; i++) {
      var connection = project._clipboard.connections[i];
      var inNode = table[connection[0]];
      var outNode = table[connection[1]];
      tree.connections.add(inNode, outNode);
    }

    // select the new nodes    
    tree.selection.deselectAll();
    for (i=0; i<nodes.length; i++) {
      tree.selection.select(nodes[i]);
    }

    project.history._endBatch();
  };

  this.duplicate = function() {
    project.history._beginBatch();
    var tempClipboard = project._clipboard;
    this.copy();
    this.paste();
    project._clipboard = tempClipboard;
    project.history._endBatch();
  };

  this.remove = function() {
    project.history._beginBatch();
    
    for (var i=tree._selectedNodes.length-1; i>=0; i--) {
      if (tree._selectedNodes[i].category === b3e.ROOT) continue;
      
      tree.nodes.remove(tree._selectedNodes[i]);
    }

    project.history._endBatch();
  };

  this.removeConnections = function() {
    project.history._beginBatch();
    for (var i=0; i<tree._selectedNodes.length; i++) {
      var node = tree._selectedNodes[i];

      var j;
      if (node.inConnections.length > 0) {
        for (j=node.outConnections.length-1; j>=0; j--) {
          tree.connections.remove(node.outConnections[j]);
        }
      }

      if (node.outConnections.length > 0) {
        for (j=node.outConnections.length-1; j>=0; j--) {
          tree.connections.remove(node.outConnections[j]);
        }
      }
    }
    project.history._endBatch();
  };

  this.removeInConnections = function() {
    project.history._beginBatch();
    for (var i=0; i<tree._selectedNodes.length; i++) {
      var node = tree._selectedNodes[i];

      if (node.inConnections.length > 0) {
        for (var j=node.outConnections.length-1; j>=0; j--) {
          tree.connections.remove(node.outConnections[j]);
        }
      }
    }
    project.history._endBatch();
  };

  this.removeOutConnections = function() {
    project.history._beginBatch();
    for (var i=0; i<tree._selectedNodes.length; i++) {
      var node = tree._selectedNodes[i];

      if (node.outConnections.length > 0) {
        for (var j=node.outConnections.length-1; j>=0; j--) {
          tree.connections.remove(node.outConnections[j]);
        }
      }
    }
    project.history._endBatch();
  };

  this._applySettings = function(settings) {};
};
