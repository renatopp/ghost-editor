b3e.editor.DragSystem = function(editor) {
  "use strict";

  var isDragging = false;
  var dragX0 = 0;
  var dragY0 = 0;
  var ctrl = false;
  var shift = false;
  var alt = false;

  this.update = function(delta) {};

  this.onMouseDown = function(e) {
    if (e.nativeEvent.which !== 1 || 
        e.nativeEvent.ctrlKey || 
        isDragging) return;

    ctrl = e.nativeEvent.ctrlKey;
    shift = e.nativeEvent.shiftKey;
    alt = e.nativeEvent.altKey;

    var project = editor.project.get();
    if (!project) return;

    var tree = project.trees.getSelected();
    if (!tree) return;

    var point = tree.view.getLocalPoint();
    var x = point.x;
    var y = point.y;
    var node = tree.nodes.getUnderPoint(x, y);

    // if mouse not on node
    if (!node) return;

    // if no node selected
    if (!node.display.isSelected) return;

    // if mouse in anchor
    if (shift) return;

    // if mouse in anchor
    if (!node.display.hitBody(x, y)) return;

    // start dragging
    isDragging = true;
    dragX0 = x;
    dragY0 = y;

    for (var i=0; i<tree._selectedNodes.length; i++) {
      node = tree._selectedNodes[i];
      node.display.isDragging = true;
      node.display.dragOffsetX = x - node.display.x;
      node.display.dragOffsetY = y - node.display.y;
    }
  };

  this.onMouseMove = function(e) {
    if (!isDragging) return;

    var project = editor.project.get();
    if (!project) return;

    var tree = project.trees.getSelected();
    if (!tree) return;

    var point = tree.view.getLocalPoint();
    var x = point.x;
    var y = point.y;

    for (var i=0; i<tree._selectedNodes.length; i++) {
      var node = tree._selectedNodes[i];

      var dx = x - node.display.dragOffsetX;
      var dy = y - node.display.dragOffsetY;

      node.display.x = dx;
      node.display.y = dy;
      node.display.snap();

      // redraw connections linked to the entity
      var j;
      for (j=0; j<node.inConnections.length; j++) {
        node.inConnections[j].display.redraw();
      }
      for (j=0; j<node.outConnections.length; j++) {
        node.outConnections[j].display.redraw();
      }
    }
  };

  this.onMouseUp = function(e) {
    if (e.nativeEvent.which !== 1 || !isDragging) return;

    var project = editor.project.get();
    if (!project) return;

    var tree = project.trees.getSelected();
    if (!tree) return;

    isDragging = false;
    var point = tree.view.getLocalPoint();
    var x = point.x;
    var y = point.y;


    project.history._beginBatch();
    for (var i=0; i<tree._selectedNodes.length; i++) {
      var node = tree._selectedNodes[i];
      node.display.isDragging = false;

      var _old = [node, dragX0-node.display.dragOffsetX, 
                        dragY0-node.display.dragOffsetY];
      var _new = [node, node.display.x, node.display.y];

      if (_old[1] === _new[1] && _old[2] === _new[2]) break;

      project.history._add(new b3e.Command(
        [tree.nodes, tree.nodes._move, _old],
        [tree.nodes, tree.nodes._move, _new]
      ));
    }
    project.history._endBatch();
  };

  editor._game.stage.on('stagemousedown', this.onMouseDown, this);
  editor._game.stage.on('stagemousemove', this.onMouseMove, this);
  editor._game.stage.on('stagemouseup', this.onMouseUp, this);
};
