b3e.tree.NodeManager = function(editor, project, tree) {
  'use strict';

  this._move = function(node, x, y) {
    node.display.x = x;
    node.display.y = y;
    node.display.redraw();

    // redraw connections linked to the entity
    for (var i=0; i<node.inConnections.length; i++) {
      node.inConnections[i].display.redraw();
    }
    for (var j=0; j<node.outConnections.length; j++) {
      node.outConnections[j].display.redraw();
    }
  };

  /**
   * Add a node.
   */
  this.add = function(name, x, y) {
    var node;

    // If name is a node
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

      var Cls = b3e.nodes[name];
      node = new Cls();
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
    var j;
    for (j=0; j<node.inConnections.length; j++) {
      node.inConnections[j]._redraw();
    }
    for (j=0; j<node.outConnections.length; j++) {
      node.outConnections[j]._redraw();
    }
    
    if (!mustSave) project.history._lock();

    project.history._beginBatch();

    if (node.category === b3e.ROOT) {
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
    tree._nodes.remove(node);
    tree._nodesLayer.removeChild(node.display);

    var i;
    if (node.inConnections.length > 0) {
      for (i=node.inConnections.length-1; i>=0; i--) {
        tree.connections.remove(node.inConnections[i]);
      }
    }

    if (node.outConnections.length > 0) {
      for (i=node.outConnections.length-1; i>=0; i--) {
        tree.connections.remove(node.outConnections[i]);
      }
    }

    if (node.isSelected) {
      tree.selection.deselect(node);
    }

    var _old = [this, this.add, [node, node.x, node.y]];
    var _new = [this, this.remove, [node]];
    project.history._add(new b3e.Command(_old, _new));

    project.history._endBatch();
    editor.trigger('noderemoved', node);
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