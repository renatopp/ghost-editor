b3e.editor.ConnectionSystem = function(editor) {
  "use strict";

  var ctrl = false;
  var shift = false;
  var alt = false;
  var connections = [];
  var lastOutNode = null;

  this.update = function(delta) {};

  this._reconnectionLastOutNode = function(connection) {
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
      if (node.display.hitOutAnchor(x, y)) {
        var max = node.maxOutConnections;
        if (max >= 0 && node.outConnections.length >= max) {
          return;
        }
        var c = tree.connections.add(node, null);
        connections.push(c);

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

    // Redraw all dragging connections
    for (var i=0; i<connections.length; i++) {
      connections[i].display.redraw(null, null, x, y);
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

    //
    project.history._beginBatch();

    for (var i=0; i<connections.length; i++) {
      var connection = connections[i];
      var inNode = connection.inNode;

      // Remove connection if there is no node
      if (!node) {
        // must return the original connection configuration in order to
        // register correctly on the history manager
        this._reconnectionLastOutNode(connection); 
        tree.connections.remove(connection);
        continue;
      }

      // Remove connection if node is connecting itself
      if (node === inNode) {
        // must return the original connection configuration in order to
        // register correctly on the history manager
        this._reconnectionLastOutNode(connection);
        tree.connections.remove(connection);
        continue;
      }

      // Remove connection if target node is an input
      if (node.category === 'input') {
        // must return the original connection configuration in order to
        // register correctly on the history manager
        this._reconnectionLastOutNode(connection);
        tree.connections.remove(connection);
        continue;
      }

      // Remove connection if node can't have more inputs
      var max = node.maxInConnections;
      if (max >= 0 && node.inConnections.length >= max) {
        this._reconnectionLastOutNode(connection);
        tree.connections.remove(connection);
        continue;
      }

      // Remove connection if nodes are already connected
      var doubleConnection = false;
      for (var j=0; j<inNode.outConnections.length; j++) {
        var outNode = inNode.outConnections[j].outNode;
        if (outNode === node) {
          this._reconnectionLastOutNode(connection);
          tree.connections.remove(connection);
          doubleConnection = true;
          break;
        }
      }

      if (doubleConnection) {
        continue;
      }

      // Do the connection
      // but before return the original connection configuration in order to
      // register the correctly the action on the history manager
      this._reconnectionLastOutNode(connection);
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
