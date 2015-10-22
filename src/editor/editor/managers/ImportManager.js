b3e.editor.ImportManager = function(editor) {
  "use strict";

  this.projectAsData = function(data) {
    var project = editor.project.get();
    if (!project) return;

    if (data.trees) this.treesAsData(data.trees);
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

    root.title       = data.title;
    root.description = data.description;
    root.properties  = data.properties;
    root.x           = display.x || 0;
    root.y           = display.y || 0;

    var id, spec;

    // Add nodes
    for (id in data.nodes) {
      spec = data.nodes[id];
      var node = null;
      display = spec.display || {};

      node = tree.nodes.add(spec.name, spec.display.x, spec.display.y);
      node.id = spec.id;
      node.attributes.title = spec.title;
      node.attributes.description = spec.description;
      node.attributes.properties = tine.merge({}, node.attributes.properties, spec.properties);
      node.display.redraw();
      
      if (spec.id === data.root) {
        first = node;
      }
    }

    // Add connections
    for (id in data.nodes) {
      spec = data.nodes[id];
      var inBlock = tree.nodes.get(id);

      var children = null;
      if (inBlock.category === 'composite' && spec.children) {
        children = spec.children;
      }
      else if (spec.child && (inBlock.category == 'decorator' ||
                              inBlock.category == 'root')) {
        children = [spec.child];
      }
      
      if (children) {
        for (var i=0; i<children.length; i++) {
          var outBlock = tree.nodes.get(children[i]);
          tree.connections.add(inBlock, outBlock);
        }
      }
    }

    // Finish
    if (first) {
      tree.connections.add(root, first);
    }

    if (!data.display) {
      tree.organize.organize(true);
    }

    tree.selection.deselectAll();
    tree.selection.select(root);
    project.history.clear();

    editor.trigger('treeimported');
  };

  this.treesAsData = function(data) {
    for (var i=0; i<data.length; i++) {
      this.treeAsData(data[i]);
    }
  };

  this._applySettings = function(settings) {};
};