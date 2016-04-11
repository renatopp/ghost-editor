b3e.tree.OrganizeManager = function(editor, project, tree) {
  "use strict";

  this.alignVertically = function() {
    project.history._beginBatch();
    var nodes = tree.nodes.getSelected();
    var i, j, x;
    if (!nodes.length) return;

    x = 0;
    for (i=0; i<nodes.length; i++) {
      x += nodes[i].display.x;
    }

    x = x/nodes.length;
    for (i=0; i<nodes.length; i++) {
      var node = nodes[i];
      var xOld = node.display.x;
      node.display.x = x;
      node.display.snap();

      // redraw connections linked to the node
      for (j=0; j<node.inConnections.length; j++) {
        node.inConnections[j].display.redraw();
      }
      for (j=0; j<node.outConnections.length; j++) {
        node.outConnections[j].display.redraw();
      }

      // history
      var _old = [node, tree.nodes._move, [node, xOld, node.display.y]];
      var _new = [node, tree.nodes._move, [node, node.display.x, node.display.y]];
      project.history._add(new b3e.Command(_old, _new));
    }
    project.history._endBatch();
  };

  this.alignHorizontally = function() {
    project.history._beginBatch();
    var nodes = tree.nodes.getSelected();
    var i, j, y;
    if (!nodes.length) return;

    y = 0;
    for (i=0; i<nodes.length; i++) {
      y += nodes[i].display.y;
    }

    y = y/nodes.length;
    for (i=0; i<nodes.length; i++) {
      var node = nodes[i];
      var yOld = node.display.y;
      node.display.y = y;
      node.display.snap();

      // redraw connections linked to the node
      for (j=0; j<node.inConnections.length; j++) {
        node.inConnections[j].display.redraw();
      }
      for (j=0; j<node.outConnections.length; j++) {
        node.outConnections[j].display.redraw();
      }

      // history
      var _old = [node, tree.nodes._move, [node, node.display.x, yOld]];
      var _new = [node, tree.nodes._move, [node, node.display.x, node.display.y]];
      project.history._add(new b3e.Command(_old, _new));
    }
    project.history._endBatch();
  };

  this.distributeVertically = function() {
    project.history._beginBatch();
    var nodes = tree.nodes.getSelected();
    var i, j, minY, maxY, step, y;
    if (!nodes.length) return;

    minY = nodes[0].display.y;
    maxY = nodes[0].display.y;

    for (i=0; i<nodes.length; i++) {
      minY = Math.min(minY, nodes[i].display.y);
      maxY = Math.max(maxY, nodes[i].display.y);
    }

    step = (maxY-minY)/(nodes.length-1);
    y = minY;

    for (i=0; i<nodes.length; i++) {
      var node = nodes[i];
      var yOld = node.display.y;
      node.display.y = y;
      node.display.snap();
      y += step;

      // redraw connections linked to the node
      for (j=0; j<node.inConnections.length; j++) {
        node.inConnections[j].display.redraw();
      }
      for (j=0; j<node.outConnections.length; j++) {
        node.outConnections[j].display.redraw();
      }
      
      // history
      var _old = [node, tree.nodes._move, [node, node.display.x, yOld]];
      var _new = [node, tree.nodes._move, [node, node.display.x, node.display.y]];
      project.history._add(new b3e.Command(_old, _new));
    }
    project.history._endBatch();
  };

  this.distributeHorizontally = function() {
    project.history._beginBatch();
    var nodes = tree.nodes.getSelected();
    var i, j, minX, maxX, step, x;
    if (!nodes.length) return;

    minX = nodes[0].display.x;
    maxX = nodes[0].display.x;

    for (i=0; i<nodes.length; i++) {
      minX = Math.min(minX, nodes[i].display.x);
      maxX = Math.max(maxX, nodes[i].display.x);
    }

    step = (maxX-minX)/(nodes.length-1);
    x = minX;

    for (i=0; i<nodes.length; i++) {
      var node = nodes[i];
      var xOld = node.display.x;
      node.display.x = x;
      node.display.snap();
      x += step;

      // redraw connections linked to the node
      for (j=0; j<node.inConnections.length; j++) {
        node.inConnections[j].display.redraw();
      }
      for (j=0; j<node.outConnections.length; j++) {
        node.outConnections[j].display.redraw();
      }
      
      // history
      var _old = [node, tree.nodes._move, [node, xOld, node.display.y]];
      var _new = [node, tree.nodes._move, [node, node.display.x, node.display.y]];
      project.history._add(new b3e.Command(_old, _new));
    }
    project.history._endBatch();
  };


  this.organize = function(root, byIndex) {
    root = root || tree.blocks.getRoot();

    depth        = 0;
    leafCount     = 0;
    connections  = [];
    blocks       = [];
    orderByIndex = orderByIndex;

    var offsetX = root.x;
    var offsetY = root.y;

    var _olds = [];
    root.traversal(function(block) {
      _olds.push([block, block.x, block.y]);
    });

    if (editor._settings.get('layout') === 'horizontal') {
      stepH(root);
    } else {
      stepV(root);
    }

    offsetX -= root.x;
    offsetY -= root.y;

    var i;
    for (i=0; i<blocks.length; i++) {
      blocks[i].x += offsetX;
      blocks[i].y += offsetY;
      blocks[i]._snap();
    }

    for (i=0; i<connections.length; i++) {
      connections[i]._redraw();
    }

    var _news = [];
    root.traversal(function(block) {
      _news.push([block, block.x, block.y]);
    });

    project.history._beginBatch();
    for (i=0; i<blocks.length; i++) {
      var _old = [tree.blocks, tree.blocks._move, _olds[i]];
      var _new = [tree.blocks, tree.blocks._move, _news[i]];
      project.history._add(new b3e.Command(_old, _new));
    }
    project.history._endBatch();
  };

  this._applySettings = function(settings) {
    // var layout = settings.get('layout');
    // if (lastLayout && layout !== lastLayout) {
    //   this.organize();
    // }
    // lastLayout = layout;
  };
};
