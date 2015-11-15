b3e.editor.ExportManager = function(editor) {
  "use strict";

  function getBlockChildrenIds(node) {
    var conns = node.outConnections.slice(0);
    if (editor._settings.get('layout') === 'horizontal') {
      conns.sort(function(a, b) {
        return a.outNode.y - 
               b.outNode.y;
      });
    } else {
      conns.sort(function(a, b) {
        return a.outNode.x - 
               b.outNode.x;
      });
    }

    var nodes = [];
    for (var i=0; i<conns.length; i++) {
      nodes.push(conns[i].outNode.id);
    }

    return nodes;
  }

  this.projectToData = function() {
    var project = editor.project.get();
    if (!project) return;

    var tree = project.trees.getSelected();
    var data = {
      version      : b3e.VERSION,
      selectedTree : (tree?tree._id:null),
      trees        : []
    };

    var self = this;
    project.trees.each(function(tree) {
      data.trees.push(self.treeToData(tree));
    }, this);

    return data;
  };
  
  this.treeToData = function(tree) {
    var saveVersion = false;
    if (!tree) {
      var project = editor.project.get();
      if (!project) return;
      tree = project.trees.getSelected();
      saveVersion = true;
    }

    var root = tree.nodes.getRoot();
    var data = {
      id          : tree._id,
      root        : root.id,
      nodes       : [],
      display     : {
        camera_x : tree.x,
        camera_y : tree.y,
        camera_z : tree.scaleX,
        x        : root.x,
        y        : root.y,
      },
    };

    if (saveVersion) {
      data.version = b3e.VERSION;
    }

    var self = this;
    tree.nodes.each(function(node) {
      data.nodes.push(self.nodeToData(node));
    });

    return data;
  };

  this.nodeToData = function(node) {
    var data = {
      id          : node.id,
      name        : node.name,
      category    : node.category,
      title       : node.title,
      description : node.description,
      properties  : node.properties,
      children    : getBlockChildrenIds(node),
      display: {
        x: node.display.x,
        y: node.display.y
      }
    };

    return data;
  };

  this.nodesToJavascript = function() {};

  this._applySettings = function(settings) {};
};