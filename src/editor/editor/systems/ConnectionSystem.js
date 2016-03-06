b3e.editor.ConnectionSystem = function(editor) {
  "use strict";

  var ctrl = false;
  var shift = false;
  var alt = false;
  var connections = [];
  var redConnections = [];
  var lastOutNode = null;

  this.update = function(delta) {
    var project = editor.project.get();
    if (!project) return;

    var tree = project.trees.getSelected();
    if (!tree) return;

    // Update cut circle position
    var point = tree.view.getLocalPoint();
    var x = tree._cutCircle.x = point.x;
    var y = tree._cutCircle.y = point.y;

    // Verify shift creation
    var _class = editor._game.canvas.className;
    if (key.shift) {
      if ( _class.indexOf('cursor') < 0) {
        editor.setCursor('connecting');
      }
    } else {
      if (_class.indexOf('cursor-connecting') >= 0 && !connections.length) {
        editor.setCursor('none');
      }
    }

    // Verify cut tool
    if (key.isPressed('c') && !key.shift && !key.ctrl && !key.alt) {
      if (_class.indexOf('cursor') < 0) {
        editor.setCursor('erasing');
        tree._cutCircle.visible = true;
      } else if (_class.indexOf('cursor-erasing') >= 0) {
        // Verify collision and remove connections
        var step = Math.PI/40;
        var radius = tree._cutCircle.radius;
        for (var theta=0; theta<Math.PI*2; theta+=step) {
          // Check for all points in a circle
          var _x = x + radius*Math.cos(theta);
          var _y = y + radius*Math.sin(theta);
          
          var _connections = tree.connections.getAll().slice();
          for (var i=0; i<_connections.length; i++) {
            var shape = _connections[i].display;
            if (shape.hitTest(_x, _y)) {
              tree.connections.remove(_connections[i]);
            }
          }
        }
      }
    } else {
      if (_class.indexOf('cursor-erasing') >= 0) {
        tree._cutCircle.visible = false;
        editor.setCursor('none');
      }
    }
  };

  this._reconnectLastOutNode = function(connection) {
    if (!lastOutNode) return;
    connection.outNode = lastOutNode;
    lastOutNode.inConnections.push(connection);
  };

  this.onMouseDown = function(e) {
    lastOutNode = null;

    // Accepts only left click
    if (e.nativeEvent.which !== 1) return;
    ctrl = e.nativeEvent.ctrlKey;
    shift = e.nativeEvent.shiftKey;
    alt = e.nativeEvent.altKey;

    // Get current project
    var project = editor.project.get();
    if (!project) return;

    // Get selected tree
    var tree = project.trees.getSelected();
    if (!tree) return;

    // Get node under the click
    var point = tree.view.getLocalPoint();
    var x = point.x;
    var y = point.y;
    var node = tree.nodes.getUnderPoint(x, y);
    var connection = tree.connections.getUnderPoint(x, y);

    // User clicked on the node
    if (node) {
      // User left click on OUT anchor
      if (node.display.hitOutAnchor(x, y) || shift) {
        editor.setCursor('connecting');

        var availableNodes = [node];
        if (shift && ctrl) {
          availableNodes = tree._selectedNodes.slice();
        }

        for (var j=0; j<availableNodes.length; j++) {
          var _n = availableNodes[j];
          var max = _n.maxOutConnections;
          if (max >= 0 && _n.outConnections.length >= max) {
            continue;
          }
          var c = tree.connections.add(_n, null);
          connections.push(c);
        }

      // User left click on IN anchor
      } else if (node.display.hitInAnchor(x, y)) {
        if (!node.inConnections.length) return;

        connections = node.inConnections;
        node.inConnections = [];      
        lastOutNode = node;
        for (var i=0; i<connections.length; i++) {
          connections[i].outNode = null;
        }
      }
    }

    // User clicked on the connection
    else if (connection) {
      connections = [connection];
      lastOutNode = connection.outNode;

      connection.outNode = null;
      lastOutNode.inConnections.remove(connection);
    }
  };

  this.onMouseMove = function(e) {
    // Return if not draggin any connection
    if (!connections.length) return;

    // Get current project
    var project = editor.project.get();
    if (!project) return;

    // Get selected tree
    var tree = project.trees.getSelected();
    if (!tree) return;

    // Get current mouse position
    var point = tree.view.getLocalPoint();
    var x = point.x;
    var y = point.y;
    var i;

    // Redraw all dragging connections
    for (i=0; i<connections.length; i++) {
      connections[i].display.redraw(null, null, x, y);
    }

    // Remove all red connections
    if (redConnections.length) {
      for (i=0; i<redConnections.length; i++) {
        redConnections[i].display.markToRemove = false;
        redConnections[i].display.redraw();
      }
      redConnections = [];
    }

    // Verify if node has input limit and mark connections to be removed
    var node = tree.nodes.getUnderPoint(x, y);
    if (node) {
      var max = node.maxInConnections;
      var pool = node.inConnections.concat(connections);
      if (max >= 0 && node.inConnections.length >= max) {
        for (var k=0; k<(pool.length-max); k++) {
          var connection = pool[k];
          redConnections.push(connection);
          connection.display.markToRemove = true;
          connection.display.redraw();
        }
      }
    }

  };

  this.onMouseUp = function(e) {
    // Accepts only left click
    if (e.nativeEvent.which !== 1) return;

    // Return if there is no connection
    if (!connections.length) return;

    // Get current project
    var project = editor.project.get();
    if (!project) return;

    // Get selected tree
    var tree = project.trees.getSelected();
    if (!tree) return;

    // Get node under cursor, if any
    var point = tree.view.getLocalPoint();
    var x = point.x;
    var y = point.y;
    var node = tree.nodes.getUnderPoint(x, y);

    editor.setCursor('none');

    // Remove all red connections
    if (redConnections.length) {
      for (i=0; i<redConnections.length; i++) {
        redConnections[i].display.markToRemove = false;
        redConnections[i].display.redraw();
      }
      redConnections = [];
    }

    //
    project.history._beginBatch();

    for (var i=0; i<connections.length; i++) {
      var connection = connections[i];
      var inNode = connection.inNode;

      // Remove connection if there is no node
      if (!node) {
        // must return the original connection configuration in order to
        // register correctly on the history manager
        this._reconnectLastOutNode(connection); 
        tree.connections.remove(connection);
        continue;
      }

      // Remove connection if node is connecting itself
      if (node === inNode) {
        // must return the original connection configuration in order to
        // register correctly on the history manager
        this._reconnectLastOutNode(connection);
        tree.connections.remove(connection);
        continue;
      }

      // Remove connection if target node is an input
      if (node.category === 'input') {
        // must return the original connection configuration in order to
        // register correctly on the history manager
        this._reconnectLastOutNode(connection);
        tree.connections.remove(connection);
        continue;
      }

      // Remove connection if nodes are already connected
      var doubleConnection = false;
      for (var j=0; j<inNode.outConnections.length; j++) {
        var outNode = inNode.outConnections[j].outNode;
        if (outNode === node) {
          this._reconnectLastOutNode(connection);
          tree.connections.remove(connection);
          doubleConnection = true;
          break;
        }
      }
      if (doubleConnection) {
        continue;
      }

      // Remove connection if node can't have more inputs
      var max = node.maxInConnections;
      if (max >= 0 && node.inConnections.length >= max) {
        tree.connections.remove(node.inConnections[0]);
      }

      // Do the connection
      // but before return the original connection configuration in order to
      // register the correctly the action on the history manager
      this._reconnectLastOutNode(connection);
      tree.connections.remove(connection);
      tree.connections.add(inNode, node);
      
      connection.display.redraw();
    }

    project.history._endBatch();

    connections = [];
  };

  editor._game.stage.on('stagemousedown', this.onMouseDown, this);
  editor._game.stage.on('stagemousemove', this.onMouseMove, this);
  editor._game.stage.on('stagemouseup', this.onMouseUp, this);
};
