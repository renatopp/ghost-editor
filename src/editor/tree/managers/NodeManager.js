b3e.tree.NodeManager = function(editor, project, tree) {
  "use strict";

  this._move = function(node, x, y) {
    node.display.x = x;
    node.display.y = y;
    node.display.redraw();

    // redraw connections linked to the entity
    for (var i=0; i<node.graph.outConnections.length; i++) {
      node.graph.inConnections[i]._redraw();
    }
    for (var j=0; j<node.graph.outConnections.length; j++) {
      node.graph.outConnections[j]._redraw();
    }
  };

  /**
   * Add a node.
   */
  this.add = function(name, x, y) {
    // If name is a node
    var node;

    if (name instanceof b3e.node.Node) {
      node = name;
      node.display.snap();
      tree._nodes.push(node);
      tree._nodesLayer.addChild(node.display);
      editor.trigger('nodeadded', node);
    }

    // Otherwise
    else {
      x = x||0;
      y = y||0;

      node = b3e.nodes[name]();
      node._applySettings(editor._settings);
      node.display.x = x;
      node.display.y = y;
      node.display.snap();
      tree._nodes.push(node);
      tree._nodesLayer.addChild(node.display);

      tree.selection.deselectAll();
      tree.selection.select(node);

      editor.trigger('nodeadded', node);
    }

    var _old = [this, this.remove, [node]];
    var _new = [this, this.add, [node, node.x, node.y]];
    project.history._add(new b3e.Command(_old, _new));

    return node;
  };

  this.get = function(node) {
    if (typeof node === 'string') {
      var nodes = tree._nodes;
      for (var i=0; i<nodes.length; i++) {
        if (nodes[i].id === node) {
          return nodes[i];
        }
      }
      return undefined;
    }

    return node;
  };
  this.getUnderPoint = function(x, y) {
    if (!x || !y) {
      var point = tree.view.getLocalPoint();
      x = point.x;
      y = point.y;
    }

    // Get node under the mouse
    var nodes = this.getAll();
    for (var i=nodes.length-1; i>=0; i--) {
      var node = nodes[i];

      if (node.display.hitTest(x, y)) return node;
    }
  };
  this.getSelected = function() {
    return tree._selectedNodes.slice();
  };
  this.getAll = function() {
    return tree._nodes;
  };
  this.getRoot = function() {
    return tree._root;
  };
  this.update = function(node, template, merge) {
    var mustSave = !!template;

    var _oldValues = {
      name        : node.name,
      title       : node.title,
      description : node.description,
      properties  : node.properties,
    };

    template = template || {};
    node = node.node;
    if (typeof template.name !== 'undefined') {
      node.name = template.name;
    } else {
      node.name = node.name || node.name;
    }
    if (typeof template.title !== 'undefined') {
      node.title = template.title;
    } else {
      node.title = node.title || node.title;
    }
    if (typeof template.description !== 'undefined') {
      node.description = template.description;
    } else {
      node.description = node.description || node.description;
    }
    if (typeof template.properties !== 'undefined') {
      node.properties = tine.merge({}, node.properties, template.properties);
    } else {
      node.properties = tine.merge({}, node.properties, node.properties);
    }
    node._redraw();

    var _newValues = {
      name        : node.name,
      title       : node.title,
      description : node.description,
      properties  : node.properties,
    };

    // redraw connections linked to the entity
    if (node._inConnection) {
      node._inConnection._redraw();
    }
    for (var j=0; j<node._outConnections.length; j++) {
      node._outConnections[j]._redraw();
    }
    
    if (!mustSave) project.history._lock();

    project.history._beginBatch();

    if (node.category === 'root') {
      project.nodes.update(tree._id, {title: node.title||'A behavior tree'});
    }

    var _old = [this, this.update, [node, _oldValues]];
    var _new = [this, this.update, [node, _newValues]];
    project.history._add(new b3e.Command(_old, _new));
    project.history._endBatch();
    
    if (!mustSave) project.history._unlock();

    editor.trigger('nodechanged', node);
  };
  this.remove = function(node) {
    project.history._beginBatch();
    tree._nodes.removeChild(node);

    if (node._inConnection) {
      tree.connections.remove(node._inConnection);
    }

    if (node._outConnections.length > 0) {
      for (var i=node._outConnections.length-1; i>=0; i--) {
        tree.connections.remove(node._outConnections[i]);
      }
    }

    if (node._isSelected) {
      tree.selection.deselect(node);
    }

    var _old = [this, this.add, [node, node.x, node.y]];
    var _new = [this, this.remove, [node]];
    project.history._add(new b3e.Command(_old, _new));

    project.history._endBatch();
    editor.trigger('noderemoved', node);
  };
  this.cut = function(node) {
    project.history._beginBatch();
    tree._nodes.removeChild(node);

    if (node._inConnection) {
      if (!node._inConnection._outnode._isSelected) {
        tree.connections.remove(node._inConnection);
      } else {
        node._inConnection.visible = false;
      }
    }

    if (node._outConnections.length > 0) {
      for (var i=node._outConnections.length-1; i>=0; i--) {
        if (!node._outConnections[i]._innode._isSelected) {
          tree.connections.remove(node._outConnections[i]);
        } else {
          node._outConnections[i].visible = false;
        }
      }
    }

    var _old = [this, this.add, [node, node.x, node.y]];
    var _new = [this, this.remove, [node]];
    project.history._add(new b3e.Command(_old, _new));

    editor.trigger('noderemoved', node);
    project.history._endBatch();
  };
  this.each = function(callback, thisarg) {
    tree._nodes.forEach(callback, thisarg);
  };

  this._applySettings = function(settings) {
    this.each(function(node) {
      node._applySettings(settings);
    });
  };
};