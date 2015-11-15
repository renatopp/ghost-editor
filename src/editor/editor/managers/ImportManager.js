b3e.editor.ImportManager = function(editor) {
  "use strict";

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
    tree.x           = display.camera_x || 0;
    tree.y           = display.camera_y || 0;
    tree.scaleX      = display.camera_z || 1;
    tree.scaleY      = display.camera_z || 1;

    // Nodes
    var node;
    var spec;
    var i;
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
      node.properties = tine.merge({}, node.properties, spec.properties);
      node.display.redraw();
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