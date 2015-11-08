b3e.editor.SelectionSystem = function(editor) {
  "use strict";

  var isSelecting = false;
  var ctrl = false;
  var shift = false;
  var alt = false;
  var x0 = 0;
  var y0 = 0;

  this.update = function(delta) {};

  this.onMouseDown = function(e) {
    var project = editor.project.get();
    if (!project) return;

    var tree = project.trees.getSelected();
    if (!tree) return;

    // mouse left
    if (e.nativeEvent.which !== 1) return;
    ctrl = e.nativeEvent.ctrlKey;
    shift = e.nativeEvent.shiftKey;
    alt = e.nativeEvent.altKey;

    // if clicked on node
    var point = tree.view.getLocalPoint();
    var x = point.x;
    var y = point.y;
    var node = tree.nodes.getUnderPoint(x, y);
    var connection = tree.connections.getUnderPoint(x, y);

    if (connection) return;

    if (node && node.display.isSelected && ctrl) {
      if (shift) {
        tree.selection.deselectSubtree(node);
      } else {
        tree.selection.deselect(node);
      }
    }

    else if (node && !node.display.isSelected && node.display.hitBody(x, y)) {
      if (!ctrl) tree.selection.deselectAll();
      if (shift) {
        tree.selection.selectSubtree(node);
      } else {
        tree.selection.select(node);
      }
    }
    else if (node && node.display.hitBody(x, y)) {
      if (shift) {
        tree.selection.selectSubtree(node);
      }
    }

    else if (!node) {
      isSelecting = true;
      x0 = x;
      y0 = y;

      if (!ctrl) tree.selection.deselectAll();
    }
  };

  this.onMouseMove = function(e) {
    if (!isSelecting) return;

    var project = editor.project.get();
    if (!project) return;

    var tree = project.trees.getSelected();
    if (!tree) return;

    var point = tree.view.getLocalPoint();
    var x = point.x;
    var y = point.y;

    tree._selectionBox.visible = true;
    tree._selectionBox._redraw(x0, y0, x, y);
  };

  this.onMouseUp = function(e) {
    if (e.nativeEvent.which !== 1 || !isSelecting) return;

    var project = editor.project.get();
    if (!project) return;

    var tree = project.trees.getSelected();
    if (!tree) return;

    var point = tree.view.getLocalPoint();
    var x = point.x;
    var y = point.y;

    var x1 = Math.min(x0, x);
    var y1 = Math.min(y0, y);
    var x2 = Math.max(x0, x);
    var y2 = Math.max(y0, y);

    tree.nodes.each(function(node) {
      if (node.display.isContainedIn(x1, y1, x2, y2)) {
        tree.selection.select(node);
      }
    });

    tree._selectionBox.visible = false;
    isSelecting = false;
  };

  editor._game.stage.on('stagemousedown', this.onMouseDown, this);
  editor._game.stage.on('stagemousemove', this.onMouseMove, this);
  editor._game.stage.on('stagemouseup', this.onMouseUp, this);
};
