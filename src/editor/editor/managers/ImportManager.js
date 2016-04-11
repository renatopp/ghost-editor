b3e.editor.ImportManager = function(editor) {
  "use strict";

  this.parametersAsData = function(data) {
    var project = editor.project.get();
    if (!project) return;

    var f = function(name) {
      node.properties[name].fromJson(_node.properties[name]);
    };

    for (var i=0; i<data.length; i++) {
      var _tree = data[i];
      var tree = project.trees.get(_tree.id);

      for (var j=0; j<_tree.nodes.length; j++) {
        var _node = _tree.nodes[j];
        var node = tree.nodes.get(_node.id);

        Object.keys(_node.properties).forEach(f);
        node.display.redraw();
      }
    }
  };

  this.projectAsData = function(data) {
    var project = editor.project.get();
    if (!project) return;

    if (data.trees) {
      for (var i=0; i<data.trees.length; i++) {
        this.treeAsData(data.trees[i]);
      }
    }

    if (data.selectedTree) {
      project.trees.select(data.selectedTree);
    }
    editor.trigger('projectimported');
  };

  this.treeAsData = function(data) {
    var project = editor.project.get();
    if (!project) return;

    var tree = project.trees.add(data.id);
    var root = tree.nodes.getRoot();
    var first = null;

    // Tree data
    var display      = data.display||{};
    tree.x           = display.x || 0;
    tree.y           = display.y || 0;
    tree.scaleX      = display.z || 1;
    tree.scaleY      = display.z || 1;

    // Nodes
    var node;
    var spec;
    var i;
    var _func = function(key) {
      node.properties[key].fromJson(spec.properties[key]);
    };
    for (i=0; i<data.nodes.length; i++) {
      spec = data.nodes[i];
      display = spec.display || {};

      if (spec.id === data.root) {
        node = root;
        root.x = display.x || 0;
        root.y = display.y || 0;
      } else {
        node = tree.nodes.add(spec.name, spec.display.x, spec.display.y);
      } 
      node.id = spec.id;
      node.title = spec.title;
      node.description = spec.description;
      Object.keys(spec.properties).forEach(_func);
      node.display.redraw();

      if (!spec.enabled) {
        node.display.disable();
      }
    }

    // Connections
    for (i=0; i<data.nodes.length; i++) {
      spec = data.nodes[i];

      var inNode = tree.nodes.get(spec.id);

      if (!spec.children) continue;
      for (var j=0; j<spec.children.length; j++) {
        var outNode = tree.nodes.get(spec.children[j]);
        tree.connections.add(inNode, outNode);
      }
    }

    tree.selection.deselectAll();
    tree.selection.select(root);
    project.history.clear();

    editor.trigger('treeimported');
  };

  this._applySettings = function(settings) {};
};